import type { AnnotatedNode } from "./tree";

export const BASE_URL = "https://omnichannelapiv2-test.fastcredit-ng.com";

export const LANGUAGES = [
  "JavaScript - Fetch",
  "cURL",
  "Python - Requests",
] as const;

export type Language = (typeof LANGUAGES)[number];

export interface FieldRow {
  field: string;
  type: string;
  description: string;
}

const CANNED: Record<string, string> = {
  statusCode: 'Response status code. "00" indicates a successful request.',
  status: 'Response status code. "00" indicates a successful request.',
  message: "Human-readable message describing the outcome of the request.",
  hasErrors: "Indicates whether the request returned any errors.",
  errors: "List of errors returned by the request, if any.",
  data: "The response payload.",
  pin: "The customer's 4-digit transaction PIN.",
  confirmPin: "Confirmation of the transaction PIN.",
  otp: "The one-time password sent to the customer.",
  email: "The customer's email address.",
  password: "The customer's account password.",
  confirmPassword: "Confirmation of the account password.",
  phonenumber: "The customer's registered phone number.",
  phoneNumber: "The customer's phone number.",
  amount: "The transaction amount.",
  accountNumber: "The account number, 10 numeric characters.",
  accountName: "The name on the account.",
  bvn: "The customer's Bank Verification Number.",
  narration: "A short description attached to the transaction.",
  purpose: "The purpose of the requested operation.",
  referralCode: "The referral code applied to the account.",
  destinationInstitutionCode: "The bank/institution code of the destination account.",
  destinationAccountNumber: "The account number of the destination account.",
  serviceId: "Identifier of the selected service or product.",
};

function humanize(key: string): string {
  const base = key
    .split(".")
    .pop()!
    .replace(/\[\]/g, "");

  const spaced = base
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/[_-]+/g, " ")
    .trim()
    .toLowerCase();

  return spaced.charAt(0).toUpperCase() + spaced.slice(1);
}

function describe(key: string): string {
  const leaf = key.split(".").pop()!.replace(/\[\]/g, "");

  return CANNED[leaf] ?? humanize(key);
}

function jsType(value: unknown): string {
  if (value === null) return "null";
  if (Array.isArray(value)) return "array";

  return typeof value;
}

// Flattens a parsed JSON value into Field / Type / Description rows, using dot and
// [] notation for nested objects and arrays, e.g. `transactions[].paymentIdentifier`.
function flattenJson(value: unknown, prefix: string, rows: FieldRow[]): void {
  if (Array.isArray(value)) {
    const first = value[0];

    if (first && typeof first === "object") {
      flattenJson(first, `${prefix}[]`, rows);
    }

    return;
  }

  if (value && typeof value === "object") {
    Object.entries(value as Record<string, unknown>).forEach(([key, val]) => {
      const path = prefix ? `${prefix}.${key}` : key;

      rows.push({ field: path, type: jsType(val), description: describe(path) });

      if (val && typeof val === "object") {
        flattenJson(val, path, rows);
      }
    });
  }
}

// Falls back to a `key: value` line parser for the multipart-style snippets
// (e.g. `Tier: 3`, `HouseAddress: "..."`) that are not valid JSON.
function parseKeyValueLines(snippet: string): FieldRow[] {
  const rows: FieldRow[] = [];

  snippet
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .forEach((line) => {
      const match = line.match(/^([A-Za-z0-9_.[\]]+)\s*:\s*(.+)$/);

      if (!match) return;

      const [, field, rawValue] = match;
      const value = rawValue.trim();

      let type = "string";

      if (value.startsWith("[")) type = "array";
      else if (/^-?\d+(\.\d+)?$/.test(value)) type = "number";
      else if (value === "true" || value === "false") type = "boolean";
      else if (value.startsWith("{")) type = "object";

      rows.push({ field, type, description: describe(field) });
    });

  return rows;
}

function parseSnippet(snippet?: string): { rows: FieldRow[]; parsed: unknown | null } {
  if (!snippet) return { rows: [], parsed: null };

  try {
    const parsed = JSON.parse(snippet);
    const rows: FieldRow[] = [];

    flattenJson(parsed, "", rows);

    return { rows, parsed };
  } catch {
    return { rows: parseKeyValueLines(snippet), parsed: null };
  }
}

// A snippet is treated as a response body when its top level looks like the
// standard API envelope; otherwise it is treated as a request body.
function isResponseShape(parsed: unknown): boolean {
  if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return false;

  const keys = Object.keys(parsed as Record<string, unknown>);

  return ["statusCode", "status", "hasErrors", "errors"].some((k) =>
    keys.includes(k),
  );
}

const STANDARD_RESPONSE_FIELDS: FieldRow[] = [
  { field: "statusCode", type: "string", description: CANNED.statusCode },
  { field: "hasErrors", type: "boolean", description: CANNED.hasErrors },
  { field: "message", type: "string", description: CANNED.message },
  { field: "errors", type: "array", description: CANNED.errors },
  { field: "data", type: "object", description: CANNED.data },
];

const STANDARD_RESPONSE_BODY = `{
  "statusCode": "00",
  "hasErrors": false,
  "message": "Successful",
  "errors": [],
  "data": {}
}`;

interface Examples {
  requestFields: FieldRow[];
  responseFields: FieldRow[];
  requestBody: string;
  responseBody: string;
}

// Path segments such as `{accountNumber}` become documented request parameters.
function pathParamFields(url?: string): FieldRow[] {
  if (!url) return [];

  const matches = url.match(/\{([^}]+)\}/g) ?? [];

  return matches.map((raw) => {
    const name = raw.slice(1, -1);

    return {
      field: name,
      type: "string",
      description: `Path parameter — ${describe(name).replace(/\.$/, "")}.`,
    };
  });
}

export function buildExamples(item: AnnotatedNode): Examples {
  const { rows, parsed } = parseSnippet(item.codesnippet);
  const snippetIsResponse = parsed !== null && isResponseShape(parsed);
  const pathFields = pathParamFields(item.url);

  if (snippetIsResponse) {
    return {
      requestFields: pathFields,
      responseFields: rows,
      requestBody: "",
      responseBody: item.codesnippet ?? STANDARD_RESPONSE_BODY,
    };
  }

  // The snippet (if any) is a request body.
  return {
    requestFields: [...pathFields, ...rows],
    responseFields: STANDARD_RESPONSE_FIELDS,
    requestBody: item.codesnippet && rows.length ? item.codesnippet : "",
    responseBody: STANDARD_RESPONSE_BODY,
  };
}

function isJsonBody(body: string): boolean {
  const trimmed = body.trim();

  if (!trimmed) return false;

  try {
    JSON.parse(trimmed);
    return true;
  } catch {
    return false;
  }
}

// Builds the "Example Request" code shown in the right panel for the selected language.
export function buildRequestCode(
  item: AnnotatedNode,
  requestBody: string,
  language: Language,
): { code: string; lang: string } {
  const method = (item.method ?? "GET").toUpperCase();
  const url = `${BASE_URL}${item.url ?? ""}`;
  const hasBody = Boolean(requestBody) && isJsonBody(requestBody);
  const body = hasBody ? requestBody : "";

  if (language === "cURL") {
    const lines = [
      `curl --location --request ${method} '${url}' \\`,
      `  --header 'Authorization: Bearer <access-token>' \\`,
      hasBody ? `  --header 'Content-Type: application/json' \\` : "  --header 'Accept: application/json'",
    ];

    if (hasBody) {
      lines.push(`  --data '${body}'`);
    }

    return { code: lines.join("\n"), lang: "bash" };
  }

  if (language === "Python - Requests") {
    const code = `import requests
import json

url = "${url}"

payload = ${hasBody ? `json.dumps(${body})` : "{}"}

headers = {
  "Authorization": "Bearer <access-token>",
  "Content-Type": "application/json"
}

response = requests.request("${method}", url, headers=headers, data=payload)

print(response.text)`;

    return { code, lang: "python" };
  }

  // Default: JavaScript - Fetch
  const code = `var myHeaders = new Headers();
myHeaders.append("Authorization", "Bearer <access-token>");
myHeaders.append("Content-Type", "application/json");

var raw = ${hasBody ? `JSON.stringify(${body})` : '""'};

var requestOptions = {
  method: '${method}',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch("${url}", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));`;

  return { code, lang: "javascript" };
}

export const RESPONSE_HEADERS: [string, string][] = [
  ["Content-Type", "application/json; charset=utf-8"],
  ["Date", "Wed, 22 Jul 2026 09:12:44 GMT"],
  ["Server", "Kestrel"],
  ["Transfer-Encoding", "chunked"],
  ["Cache-Control", "no-store, no-cache"],
  ["Pragma", "no-cache"],
  ["Vary", "Accept-Encoding"],
  ["X-Content-Type-Options", "nosniff"],
  ["X-Frame-Options", "DENY"],
  ["X-XSS-Protection", "1; mode=block"],
  ["Strict-Transport-Security", "max-age=31536000"],
  ["Referrer-Policy", "no-referrer"],
  ["Content-Security-Policy", "default-src 'self'"],
  ["Access-Control-Allow-Origin", "*"],
  ["Request-Context", "appId=cid-v1"],
  ["Connection", "keep-alive"],
];
