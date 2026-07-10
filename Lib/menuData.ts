export type MenuChild = {
  id: string;
  title: string;
  method?: string;
  content?: string;
  url?: string;
  codesnippet?: string;
  children?: MenuChild[];
};

// export interface MenuSection {
//   id: string;
//   title: string;
//   content: string;
//   url?: string;
//   children?: MenuSection[];
// }
  

export const menuData: MenuChild[] = [
  {
    id: "introduction",
    title: "Introduction",
    url: "introduction",
    content: `
# Fast Credit APIs

Welcome to the Fast Credit API documentation.

The Fast Credit API provides a secure and scalable suite of REST APIs that enable developers to integrate customer onboarding, identity verification, authentication, customer profile management and validation into their applications.

Built using modern REST standards, the APIs are secure, reliable and optimized for enterprise integrations.

Available Services

• User Management
• Customer Profile Settings
• Validation Services
• Lookup Services

Unless otherwise specified, every endpoint requires authentication.
`,
  },

  {
    id: "user-management",
    title: "User Management",
    content: "Endpoints for customer onboarding and registration.",
    children: [
      {
        id: "register-user",
        title: "Register User",
        method: "POST",
        url: "/user-management/api/v1/Users/register",
        content:
          "Registers a new customer account after successful identity verification. This endpoint accepts multipart/form-data containing customer information, facial verification images, security question, password and transaction PIN.",
        codesnippet: `{
  "RegistrationRequestId": "REQ12345",
  "Email": "john@example.com",
  "Password": "Password123",
  "ConfirmPassword": "Password123",
  "Pin": "1234",
  "ConfirmPin": "1234",
  "QuestionId": "1",
  "Answer": "Lagos"
}`,
      },
    ],
  },

  {
    id: "customer-profile",
    title: "Customer Profile Settings",
    content: "Manage customer profile preferences and settings.",
    children: [
      {
        id: "get-instant-payment",
        title: "Get Instant Payment Status",
        method: "GET",
        url: "/user-management/api/v1/CustomerProfileSettings/instant-payment",
        content:
          "Retrieves the current instant payment status for the authenticated customer.",
      },
      {
        id: "update-instant-payment",
        title: "Update Instant Payment Status",
        method: "PUT",
        url: "/user-management/api/v1/CustomerProfileSettings/instant-payment",
        content:
          "Enable or disable instant payment for fund transfers.",
        codesnippet: `{
  "status": true
}`,
      },
      {
        id: "update-email",
        title: "Update Email Address",
        method: "PUT",
        url: "/user-management/api/v1/CustomerProfileSettings/update/email",
        content:
          "Updates the customer's registered email address.",
        codesnippet: `{
  "email": "john@example.com",
  "emailValidationRequestId": "REQ12345"
}`,
      },
    ],
  },

  {
    id: "validation",
    title: "Validation Services",
    content: "Identity verification and OTP validation endpoints.",
    children: [
      {
        id: "fetch-bvn",
        title: "Fetch BVN Details",
        method: "POST",
        url: "/user-management/api/v1/Validation/fetchBVN",
        content:
          "Retrieves customer information associated with a supplied BVN.",
        codesnippet: `{
  "bvn": "22123456789"
}`,
      },
      {
        id: "validate-bvn",
        title: "Validate BVN",
        method: "POST",
        url: "/user-management/api/v1/Validation/validateBVN",
        content:
          "Validates a customer's BVN and returns the associated customer details.",
        codesnippet: `{
  "bvn": "22123456789"
}`,
      },
      {
        id: "send-otp",
        title: "Send OTP",
        method: "POST",
        url: "/user-management/api/v1/Validation/sendOTP",
        content:
          "Sends a one-time password (OTP) to the customer's registered phone number or email.",
        codesnippet: `{
  "registrationRequestId": "REQ12345"
}`,
      },
      {
        id: "validate-otp",
        title: "Validate OTP",
        method: "POST",
        url: "/user-management/api/v1/Validation/validateOTP",
        content:
          "Validates the OTP entered by the customer.",
        codesnippet: `{
  "registrationRequestId": "REQ12345",
  "otp": "123456"
}`,
      },
      {
        id: "send-email-otp",
        title: "Send Email OTP",
        method: "POST",
        url: "/user-management/api/v1/Validation/sendOTP/email",
        content:
          "Sends an email verification OTP.",
        codesnippet: `{
  "email": "john@example.com"
}`,
      },
      {
        id: "validate-email-otp",
        title: "Validate Email OTP",
        method: "POST",
        url: "/user-management/api/v1/Validation/validateOTP/email",
        content:
          "Validates an email verification OTP.",
        codesnippet: `{
  "email": "john@example.com",
  "otp": "123456"
}`,
      },
      {
        id: "existing-user-send-otp",
        title: "Send OTP (Existing User)",
        method: "POST",
        url: "/user-management/api/v1/Validation/sendOTP/existing-user",
        content:
          "Sends OTPs to existing users during migration.",
      },
      {
        id: "existing-user-validate-otp",
        title: "Validate OTP (Existing User)",
        method: "POST",
        url: "/user-management/api/v1/Validation/validateOTP/existing-user",
        content:
          "Validates migration OTP for existing users.",
        codesnippet: `{
  "otp": "123456"
}`,
      },
      {
        id: "validate-security-question",
        title: "Validate Security Questions",
        method: "POST",
        url: "/user-management/api/v1/Validation/validate/security-questions",
        content:
          "Validates the customer's answer to their security question.",
        codesnippet: `{
  "questionId": "1",
  "answer": "Lagos"
}`,
      },
    ],
  },

  {
    id: "lookup",
    title: "Lookup Services",
    content: "Read-only endpoints used for reference data.",
    children: [
      {
        id: "security-questions",
        title: "Security Questions",
        method: "GET",
        url: "/user-management/Lookup/security-questions",
        content:
          "Returns all available security questions.",
      },
      {
        id: "states",
        title: "States",
        method: "GET",
        url: "/user-management/Lookup/states",
        content:
          "Returns the list of supported states.",
      },
      {
        id: "bvn-status",
        title: "BVN Status",
        method: "GET",
        url: "/user-management/api/v1/lookup/User/bvn-status",
        content:
          "Returns the authenticated customer's BVN verification status.",
      },
      {
        id: "facial-status",
        title: "Facial Verification Status",
        method: "GET",
        url: "/user-management/api/v1/lookup/User/facialVerification/status",
        content:
          "Returns the authenticated customer's facial verification status.",
      },
      {
        id: "health",
        title: "Health Check",
        method: "GET",
        url: "/user-management/health",
        content:
          "Checks the availability of the User Management service.",
      },
    ],
  },
];