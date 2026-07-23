import { menuData, type MenuChild } from "@/Lib/menuData";

/**
 * Adds a version level (V1 / V2) inside every service, e.g.
 *   Digital Services > User Management > V1 > <endpoints>
 *                                      > V2 > <endpoints>
 *
 * Endpoints keep their original objects (title, url, content, codesnippet …) —
 * only the grouping around them changes. Each direct child of a service is placed
 * in the V1 or V2 folder based on the API version found in its URLs, so endpoints
 * added to the raw data later are organised automatically.
 */

function collectUrls(node: MenuChild, acc: string[] = []): string[] {
  if (node.url) acc.push(node.url);
  node.children?.forEach((child) => collectUrls(child, acc));
  return acc;
}

function detectVersion(node: MenuChild): "v1" | "v2" {
  return collectUrls(node).some((url) => /\/api\/v2\b/i.test(url)) ? "v2" : "v1";
}

// A node like { id: "v2", title: "User Management V2" } is a redundant version
// wrapper — its children are lifted directly into the generated version folder.
function isVersionWrapper(node: MenuChild): boolean {
  return (
    !node.method &&
    (/^v\d+$/i.test(node.id) || /\bv\d+$/i.test((node.title ?? "").trim()))
  );
}

function contentChildren(service: MenuChild): MenuChild[] {
  const out: MenuChild[] = [];

  (service.children ?? []).forEach((child) => {
    if (isVersionWrapper(child) && child.children?.length) {
      out.push(...child.children);
    } else {
      out.push(child);
    }
  });

  return out;
}

function versionFolders(
  serviceId: string,
  serviceTitle: string,
  children: MenuChild[],
): MenuChild[] {
  const buckets: Record<"v1" | "v2", MenuChild[]> = { v1: [], v2: [] };

  children.forEach((child) => buckets[detectVersion(child)].push(child));

  return (["v1", "v2"] as const)
    .filter((version) => buckets[version].length > 0)
    .map((version) => {
      const n = version === "v1" ? 1 : 2;

      return {
        id: `${serviceId}-${version}`,
        title: `V${n}`,
        content: `Version ${n} (v${n}) endpoints for the ${serviceTitle}.`,
        children: buckets[version],
      };
    });
}

interface ServiceOverrides {
  id?: string;
  title?: string;
  content?: string;
  children?: MenuChild[];
}

function versionedService(
  service: MenuChild,
  overrides: ServiceOverrides = {},
): MenuChild {
  const id = overrides.id ?? service.id;
  const title = overrides.title ?? service.title;
  const children = overrides.children ?? contentChildren(service);

  return {
    id,
    title,
    content: overrides.content ?? service.content,
    url: service.url,
    children: versionFolders(id, title, children),
  };
}

function buildStructuredMenu(): MenuChild[] {
  const introduction = menuData[0];
  const digital = menuData[1];
  const services = digital.children ?? [];

  const find = (id: string) => services.find((service) => service.id === id);

  const userManagement = find("user-management")!;

  // Accounting Service is split across two source nodes — a wrapper holding the
  // v1 "Accounting Service" and a separate "Accounting Service V2". Merge them.
  const accountingWrapper = find("acc serv");
  const accountingV1 = accountingWrapper?.children?.[0];
  const accountingV2 = find("accounting-service-v2")!;
  const accountingChildren = [
    ...(accountingV1?.children ?? []),
    ...(accountingV2.children ?? []),
  ];

  // Authentication Service appears twice; keep the superset (the copy that also
  // carries the v2 endpoints) and drop the duplicate.
  const authNodes = services.filter((s) => s.id === "authentication-service");
  const authentication = authNodes.reduce((a, b) =>
    (b.children?.length ?? 0) > (a.children?.length ?? 0) ? b : a,
  );

  const payment = find("payment-service")!;
  const savings = find("savings-investment-service")!;
  const loan = find("loan-management-service")!;

  const restructuredServices: MenuChild[] = [
    versionedService(userManagement),
    versionedService(accountingV1 ?? accountingV2, {
      id: "accounting-service",
      title: "Accounting Service",
      content: accountingV1?.content ?? accountingV2.content,
      children: accountingChildren,
    }),
    versionedService(authentication),
    versionedService(payment),
    versionedService(savings),
    versionedService(loan),
  ];

  return [introduction, { ...digital, children: restructuredServices }];
}

export const structuredMenu: MenuChild[] = buildStructuredMenu();
