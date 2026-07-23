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
 Fast Credit APIs

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
    id: "Digital Services",
    title: "Digital Services",
    content: "",
    children: [
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
                content: "Updates the customer's registered email address.",
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
                content: "Validates the OTP entered by the customer.",
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
                content: "Sends an email verification OTP.",
                codesnippet: `{
  "email": "john@example.com"
}`,
              },
              {
                id: "validate-email-otp",
                title: "Validate Email OTP",
                method: "POST",
                url: "/user-management/api/v1/Validation/validateOTP/email",
                content: "Validates an email verification OTP.",
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
                content: "Sends OTPs to existing users during migration.",
              },
              {
                id: "existing-user-validate-otp",
                title: "Validate OTP (Existing User)",
                method: "POST",
                url: "/user-management/api/v1/Validation/validateOTP/existing-user",
                content: "Validates migration OTP for existing users.",
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
                content: "Returns all available security questions.",
              },
              {
                id: "states",
                title: "States",
                method: "GET",
                url: "/user-management/Lookup/states",
                content: "Returns the list of supported states.",
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

          {
            id: "v2",
            title: "User Management V2",
            content:
              "Version 2 of the User Management API introduces referral management, enhanced customer registration with liveness verification, and tier limit management.",
            children: [
              {
                id: "register-user-v2",
                title: "Register User",
                method: "POST",
                url: "/user-management/api/v2/Users/register",
                content:
                  "Registers a new customer using selfie capture, liveness verification images and optional referral code.",
                codesnippet: `{
  "RegistrationRequestId": "REQ12345",
  "Email": "john@example.com",
  "EmailConfirmed": true,
  "QuestionId": "1",
  "Answer": "Lagos",
  "Password": "Password@123",
  "ConfirmPassword": "Password@123",
  "Pin": "1234",
  "ConfirmPin": "1234",
  "ReferralCode": "FAST100"
}`,
              },

              {
                id: "user-referral",
                title: "Get Referral Code",
                method: "GET",
                url: "/user-management/api/v2/Users/referral",
                content:
                  "Retrieves the authenticated user's referral code or automatically creates one if it does not already exist.",
                codesnippet: `{
  "statusCode": "00",
  "hasErrors": false,
  "message": "Successful",
  "data": {
    "userId": "12345",
    "referralCode": "FAST100",
    "inviteesCount": 5
  }
}`,
              },
            ],
          },

          {
            id: "limit-management",
            title: "Limit Management",
            content:
              "Endpoints for managing customer transaction limits and indemnity agreements.",
            children: [
              {
                id: "update-limit",
                title: "Update User Tier Limit",
                method: "POST",
                url: "/user-management/api/v2/LimitManagement/update",
                content:
                  "Initiates a request to update the customer's daily and per-transaction limits.",
                codesnippet: `{
  "dailyTransactionLimit": 500000,
  "perTransactionLimit": 100000,
  "indemnityVersionId": "IND001",
  "pin": "1234"
}`,
              },

              {
                id: "complete-limit-update",
                title: "Complete User Tier Limit Update",
                method: "POST",
                url: "/user-management/api/v2/LimitManagement/complete",
                content:
                  "Completes a previously initiated tier limit update request.",
                codesnippet: `{
  "requestId": "REQ-123456"
}`,
              },

              {
                id: "active-indemnity",
                title: "Get Active Indemnity Document",
                method: "GET",
                url: "/user-management/api/v2/LimitManagement/indemnity/active",
                content:
                  "Returns the active indemnity document that must be accepted before increasing transaction limits.",
                codesnippet: `{
  "statusCode": "00",
  "hasErrors": false,
  "message": "Successful",
  "data": {
    "version": 2,
    "title": "Transaction Limit Indemnity",
    "content": "<html>...</html>",
    "isActive": true
  }
}`,
              },
            ],
          },

          {
            id: "health-v2",
            title: "Health Check",
            url: "/user-management/health",
            content:
              "Checks whether the User Management API service is running and available.",
          },
        ],
      },

      {
        id: "acc serv",
        title: "",
        url: "",
        children: [
          {
            id: "accounting-service v1",
            title: "Accounting Service",
            content: `
The Accounting Service provides APIs for managing customer accounts,
retrieving account information, checking balances, viewing transactions,
generating account statements, and managing customer KYC upgrades.

These APIs allow applications to access account information and support
customer account management workflows in a secure and consistent way.

The service includes:

• Accounts
• Balance Enquiry
• Account Transactions
• Account Statements
• Account Summary
• KYC Management
• Account Upgrade
`,
            url: "accounting-service",

            children: [
              {
                id: "accounts",
                title: "Accounts",
                content:
                  "The Accounts service provides endpoints for retrieving account information, account balances, transactions, statements, and account summaries.",

                children: [
                  {
                    id: "fetch-accounts",
                    title: "Fetch Accounts",
                    method: "GET",
                    url: "/accounting-service/api/v1/Accounts",
                    content:
                      "Retrieves the accounts associated with the authenticated customer. The response includes account information such as account number, account name, account category, account type, and account status.",

                    codesnippet: `{
  "statusCode": "00",
  "hasErrors": false,
  "message": "Successful",
  "errors": [],
  "data": [
    {
      "accountNumber": "0123456789",
      "accountName": "John Doe",
      "category": 1,
      "accountType": "Savings",
      "status": 1
    }
  ]
}`,
                  },

                  {
                    id: "balance-enquiry",
                    title: "Balance Enquiry",
                    method: "GET",
                    url: "/accounting-service/api/v1/Accounts/balance",
                    content:
                      "Retrieves the current balance information for a customer account, including the account number, currency, and available working balance.",

                    codesnippet: `{
  "statusCode": "00",
  "hasErrors": false,
  "message": "Successful",
  "errors": [],
  "data": {
    "accountNumber": "0123456789",
    "currency": "NGN",
    "workingBalance": 250000.00
  }
}`,
                  },

                  {
                    id: "generate-account-statement",
                    title: "Generate Account Statement",
                    method: "POST",
                    url: "/accounting-service/api/v1/Accounts/statement",
                    content:
                      "Generates an account statement based on the information supplied in the request.",

                    codesnippet: `{
  "accountNumber": "0123456789",
  "startDate": "2026-01-01",
  "endDate": "2026-01-31"
}`,
                  },

                  {
                    id: "account-summary",
                    title: "Get Account Summary",
                    method: "GET",
                    url: "/accounting-service/api/v1/Accounts/summary/{accountNumber}",
                    content:
                      "Retrieves a summary of the specified account, including the customer's KYC tier, daily transaction limit, current transaction value, cumulative daily limit, and cooling period status.",

                    codesnippet: `{
  "statusCode": "00",
  "hasErrors": false,
  "message": "Successful",
  "errors": [],
  "data": {
    "kycTier": 2,
    "dailyTransactionLimit": 500000.00,
    "currentDayTransctionValue": 100000.00,
    "cummulativeDailyLimit": 500000.00,
    "isInCoolingPeriod": false
  }
}`,
                  },

                  {
                    id: "account-transactions",
                    title: "Get Account Transactions",
                    method: "GET",
                    url: "/accounting-service/api/v1/Accounts/transactions",
                    content:
                      "Retrieves transactions associated with a customer account. The account number is required, while start and end dates can be supplied to filter the transaction history.",

                    codesnippet: `{
  "accountNo": "0123456789",
  "startDate": "2026-01-01",
  "endDate": "2026-01-31"
}`,
                  },

                  {
                    id: "todays-transactions",
                    title: "Get Today's Transactions",
                    method: "GET",
                    url: "/accounting-service/api/v1/Accounts/transactions/today",
                    content:
                      "Retrieves the transactions performed on the customer's account for the current day.",

                    codesnippet: `{
  "statusCode": "00",
  "hasErrors": false,
  "message": "Successful",
  "errors": [],
  "data": []
}`,
                  },
                ],
              },

              {
                id: "kyc",
                title: "KYC",
                content:
                  "The KYC service provides endpoints for retrieving customer KYC information and managing account tier upgrade requests.",

                children: [
                  {
                    id: "fetch-kyc-details",
                    title: "Get KYC Details",
                    method: "GET",
                    url: "/accounting-service/api/v1/KYC/{accountNumber}",
                    content:
                      "Retrieves the KYC details of an account, including the customer's current KYC tier and the requirements available for upgrading the account.",

                    codesnippet: `{
  "statusCode": "00",
  "hasErrors": false,
  "message": "Successful",
  "errors": [],
  "data": {
    "existingUpgrade": null,
    "kycTierDetails": []
  }
}`,
                  },

                  {
                    id: "check-upgrade-request",
                    title: "Check Existing Upgrade Request",
                    method: "GET",
                    url: "/accounting-service/api/v1/KYC/upgrade",
                    content:
                      "Checks whether an existing account upgrade request is available for a specified account tier.",

                    codesnippet: `{
  "tier": 2
}`,
                  },

                  {
                    id: "upgrade-account",
                    title: "Upgrade Account",
                    method: "POST",
                    url: "/accounting-service/api/v1/KYC/upgrade",
                    content:
                      "Submits an account upgrade request by providing the required KYC information and supporting documents. The endpoint supports identity documents, utility bills, and liveness verification images.",

                    codesnippet: `{
  "accountNumber": "0123456789",
  "tier": 3,
  "documentType": 1,
  "documentIdNumber": "A12345678"
}`,
                  },

                  {
                    id: "review-nin-document",
                    title: "Review NIN Document",
                    method: "POST",
                    url: "/accounting-service/api/v1/KYC/review-nin",
                    content:
                      "Allows a NIN document verification request to be manually reviewed and either approved or rejected.",

                    codesnippet: `{
  "verificationCheckId": "VERIFICATION-12345",
  "failureReason": "",
  "decision": 1
}`,
                  },
                  {
                    id: "accounting-health",
                    title: "Health Check",
                    method: "GET",
                    url: "/accounting-service/health",
                    content:
                      "Checks whether the Accounting Service is available and responding to requests.",
                  },
                ],
              },
            ],
          },
        ],
      },

      {
        id: "accounting-service-v2",
        title: "Accounting Service V2",
        content: `
The Accounting Service V2 provides APIs for account summary management
and customer KYC verification and upgrade workflows.

The service includes:

• Account Summary
• KYC Account Upgrade
• Facial Verification

These APIs support account tier information, transaction limits,
customer KYC upgrades, and facial verification using selfie capture
and liveness images.
`,
        url: "accounting-service-v2",

        children: [
          {
            id: "account-summary-v2",
            title: "Account Summary",
            method: "GET",
            url: "/accounting-service/api/v2/Accounts/summary/{accountNumber}",
            content: `
Retrieves the account summary for a specified account number.

The response provides information about the customer's KYC tier,
transaction limits, current transaction value, cumulative daily limit,
and whether the account is currently in a cooling period.

The account number must contain exactly 10 numeric characters.
`,
            codesnippet: `{
  "statusCode": "00",
  "hasErrors": false,
  "message": "Successful",
  "errors": [],
  "data": {
    "kycTier": 2,
    "dailyTransactionLimit": 500000,
    "currentDayTransctionValue": 100000,
    "cummulativeDailyLimit": 500000,
    "customerDailyTransactionLimit": 500000,
    "customerPerTransactionLimit": 100000,
    "isInCoolingPeriod": false
  }
}`,
          },

          {
            id: "kyc-account-upgrade-v2",
            title: "Upgrade Customer Account",
            method: "POST",
            url: "/accounting-service/api/v2/KYC",
            content: `
Upgrades a customer's account by submitting the required KYC information
and verification documents.

The endpoint accepts multipart/form-data and supports account upgrades
between Tier 2 and Tier 3.

The request can include the customer's house address, NIN, utility bill,
selfie capture image, and liveness verification images.
`,
            codesnippet: `Tier: 3
HouseAddress: "12 Example Street, Lagos"
NIN: "12345678901"

UtilityBill.FrontPageBase64Image: "<base64-image>"
UtilityBill.BackPageBase64Image: "<base64-image>"
UtilityBill.DocumentType: 1
UtilityBill.DocumentIdNumber: "DOC123456"
UtilityBill.RequiresBackpage: true

SelfieCaptureImage: "<image-file>"
LivenessImages: [
  "<liveness-image-1>",
  "<liveness-image-2>"
]`,
          },

          {
            id: "initiate-facial-verification-v2",
            title: "Initiate Facial Verification",
            method: "POST",
            url: "/accounting-service/api/v2/KYC/facialVerification/initiate",
            content: `
Initiates facial verification for a customer using a selfie capture
image and liveness verification images.

Both SelfieCaptureImage and LivenessImages are required for this request.

The endpoint accepts multipart/form-data.
`,
            codesnippet: `SelfieCaptureImage: "<image-file>"

LivenessImages: [
  "<liveness-image-1>",
  "<liveness-image-2>"
]`,
          },
        ],
      },

      {
        id: "authentication-service",
        title: "Authentication Service",
        content: `
      Handles user authentication, including login, logout, password and PIN management, OTP verification, biometric enrollment, and token lifecycle operations.
      `,
        url: "authentication-service",
        children: [
          {
            id: "application-config",
            title: "Get application wide settings",
            method: "GET",
            url: "/authentication-service/api/v1/Authentication/application-config",
            content: `
      Endpoint to get application wide settings
      `,
          },
          {
            id: "biometric-ack",
            title: "Acknowledge a biometric auth",
            method: "POST",
            url: "/authentication-service/api/v1/Authentication/biometric/ack",
            content: `
      Endpoint to acknowledge a biometric auth
      `,
            codesnippet: `{
  "biometricPurpose": 1
}`,
          },
          {
            id: "biometric-complete",
            title: "Complete biometric authentication",
            method: "POST",
            url: "/authentication-service/api/v1/Authentication/biometric/complete",
            content: `
      Endpoint to complete biometric authentication
      `,
            codesnippet: `{
  "challenge": "string",
  "credentialId": "string",
  "signature": "string",
  "signCount": 0,
  "biometricPurpose": 1
}`,
          },
          {
            id: "biometric-disable",
            title: "Disable biometric  login",
            method: "POST",
            url: "/authentication-service/api/v1/Authentication/biometric/disable",
            content: `
      Endpoint to disable biometric  login
      `,
            codesnippet: `{
  "credentialHash": "string",
  "biometricPurpose": 1
}`,
          },
          {
            id: "biometric-options",
            title: "Retrieve biometric login options",
            method: "POST",
            url: "/authentication-service/api/v1/Authentication/biometric/options",
            content: `
      Endpoint to retrieve biometric login options
      `,
            codesnippet: `{
  "credentialHash": "string",
  "biometricPurpose": 1
}`,
          },
          {
            id: "biometric-setup-complete",
            title: "Complete biometric setup",
            method: "POST",
            url: "/authentication-service/api/v1/Authentication/biometric/setup/complete",
            content: `
      Endpoint to complete biometric setup
      `,
            codesnippet: `{
  "challenge": "string",
  "credentialId": "string",
  "publicKey": "string",
  "signature": "string",
  "algorithm": "string",
  "biometricPurpose": 1
}`,
          },
          {
            id: "biometric-setup-start",
            title: "Start biometric setup",
            method: "GET",
            url: "/authentication-service/api/v1/Authentication/biometric/setup/start",
            content: `
      Endpoint to start biometric setup
      `,
          },
          {
            id: "change-password",
            title: "Change user password",
            method: "PUT",
            url: "/authentication-service/api/v1/Authentication/change-password",
            content: `
      Endpoint to change user password
      `,
            codesnippet: `{
  "currentPassword": "string",
  "newPassword": "string",
  "confirmNewPassword": "string"
}`,
          },
          {
            id: "forgot-password",
            title: "Send forgot password email with reset password OTP",
            method: "POST",
            url: "/authentication-service/api/v1/Authentication/forgot-password",
            content: `
      Endpoint to send forgot password email with reset password OTP
      `,
            codesnippet: `{
  "phonenumber": "string",
  "purpose": 1
}`,
          },
          {
            id: "login",
            title: "Authenticate a registered user",
            method: "POST",
            url: "/authentication-service/api/v1/Authentication/login",
            content: `
      Endpoint to authenticate a registered user
      `,
            codesnippet: `{
  "phonenumber": "string",
  "password": "string"
}`,
          },
          {
            id: "logout",
            title: "Log a user out and clear session",
            method: "POST",
            url: "/authentication-service/api/v1/Authentication/logout",
            content: `
      Endpoint to log a user out and clear session
      `,
            codesnippet: `{}`,
          },
          {
            id: "refresh-token",
            title: "Refresh an expired token",
            method: "POST",
            url: "/authentication-service/api/v1/Authentication/refresh-token",
            content: `
      Endpoint to refresh an expired token
      `,
            codesnippet: `{
  "accessToken": "string",
  "refreshToken": "string"
}`,
          },
          {
            id: "reset-password",
            title: "Reset user password",
            method: "POST",
            url: "/authentication-service/api/v1/Authentication/reset-password",
            content: `
      Endpoint to reset user password
      `,
            codesnippet: `{
  "password": "string",
  "confirmPassword": "string"
}`,
          },
          {
            id: "reset-pin",
            title: "Reset user pin",
            method: "POST",
            url: "/authentication-service/api/v1/Authentication/reset-pin",
            content: `
      Endpoint to reset user pin
      `,
            codesnippet: `{
  "pin": "string",
  "confirmPin": "string",
  "pinResetToken": "string"
}`,
          },
          {
            id: "revoke-token",
            title: "Revoke a user refresh token",
            method: "POST",
            url: "/authentication-service/api/v1/Authentication/revoke-token",
            content: `
      Endpoint to revoke a user refresh token
      `,
          },
          {
            id: "send-otp",
            title: "Send reset OTP",
            method: "POST",
            url: "/authentication-service/api/v1/Authentication/send-otp",
            content: `
      Endpoint to send reset OTP
      `,
            codesnippet: `{
  "phonenumber": "string",
  "purpose": 1
}`,
          },
          {
            id: "send-otp-authenticated",
            title: "Send OTP for authenticated users with a purpose",
            method: "POST",
            url: "/authentication-service/api/v1/Authentication/send-otp/authenticated",
            content: `
      Endpoint to send OTP for authenticated users with a purpose
      `,
            codesnippet: `{
  "purpose": 1
}`,
          },
          {
            id: "send-otp-email-authenticated",
            title: "Send reset OTP to email for authenticated users",
            method: "POST",
            url: "/authentication-service/api/v1/Authentication/send-otp/email/authenticated",
            content: `
      Endpoint to send reset OTP to email for authenticated users
      `,
            codesnippet: `{
  "email": "string"
}`,
          },
          {
            id: "switch-device",
            title: "Switch device",
            method: "POST",
            url: "/authentication-service/api/v1/Authentication/switch-device",
            content: `
      Endpoint to switch device
      `,
            codesnippet: `{
  "command": {}
}`,
          },
          {
            id: "validate-otp-email-authenticated",
            title:
              "Validate reset OTP for authenticated users and get a reset token",
            method: "POST",
            url: "/authentication-service/api/v1/Authentication/validate-otp/email/authenticated",
            content: `
      Endpoint to validate reset OTP for authenticated users and get a reset token
      `,
            codesnippet: `{
  "email": "string",
  "otp": "string"
}`,
          },
          {
            id: "validate-pin",
            title:
              "Validate user pin and get an access token for a specific purpose",
            method: "POST",
            url: "/authentication-service/api/v1/Authentication/validate-pin",
            content: `
      Endpoint to validate user pin and get an access token for a specific purpose
      `,
            codesnippet: `{
  "pin": "string",
  "purpose": 1
}`,
          },
          {
            id: "validate-otp",
            title: "Validate Password reset OTP and get a password reset token",
            method: "POST",
            url: "/authentication-service/api/v1/Authentication/validateOTP",
            content: `
      Endpoint to validate Password reset OTP and get a password reset token
      `,
            codesnippet: `{
  "phonenumber": "string",
  "otp": "string"
}`,
          },
          {
            id: "verify-face",
            title: "Verify face",
            method: "POST",
            url: "/authentication-service/api/v1/Authentication/verify-face",
            content: `
      Endpoint to verify face
      `,
            codesnippet: `{
  "FrontImage": "binary",
  "LeftSideImage": "binary",
  "RightSideImage": "binary",
  "DownwardImage": "binary",
  "UpwardLookImage": "binary",
  "Purpose": 1
}`,
          },
        ],
      },

      {
        id: "authentication-service",
        title: "Authentication Service",
        content: `
      Handles user authentication, including login, logout, password and PIN management, OTP verification, biometric enrollment, and token lifecycle operations.
      `,
        url: "authentication-service",
        children: [
          {
            id: "application-config",
            title: "Get application wide settings",
            method: "GET",
            url: "/authentication-service/api/v1/Authentication/application-config",
            content: `
      Endpoint to get application wide settings
      `,
          },
          {
            id: "biometric-ack",
            title: "Acknowledge a biometric auth",
            method: "POST",
            url: "/authentication-service/api/v1/Authentication/biometric/ack",
            content: `
      Endpoint to acknowledge a biometric auth
      `,
            codesnippet: `{
  "biometricPurpose": 1
}`,
          },
          {
            id: "biometric-complete",
            title: "Complete biometric authentication",
            method: "POST",
            url: "/authentication-service/api/v1/Authentication/biometric/complete",
            content: `
      Endpoint to complete biometric authentication
      `,
            codesnippet: `{
  "challenge": "string",
  "credentialId": "string",
  "signature": "string",
  "signCount": 0,
  "biometricPurpose": 1
}`,
          },
          {
            id: "biometric-disable",
            title: "Disable biometric  login",
            method: "POST",
            url: "/authentication-service/api/v1/Authentication/biometric/disable",
            content: `
      Endpoint to disable biometric  login
      `,
            codesnippet: `{
  "credentialHash": "string",
  "biometricPurpose": 1
}`,
          },
          {
            id: "biometric-options",
            title: "Retrieve biometric login options",
            method: "POST",
            url: "/authentication-service/api/v1/Authentication/biometric/options",
            content: `
      Endpoint to retrieve biometric login options
      `,
            codesnippet: `{
  "credentialHash": "string",
  "biometricPurpose": 1
}`,
          },
          {
            id: "biometric-setup-complete",
            title: "Complete biometric setup",
            method: "POST",
            url: "/authentication-service/api/v1/Authentication/biometric/setup/complete",
            content: `
      Endpoint to complete biometric setup
      `,
            codesnippet: `{
  "challenge": "string",
  "credentialId": "string",
  "publicKey": "string",
  "signature": "string",
  "algorithm": "string",
  "biometricPurpose": 1
}`,
          },
          {
            id: "biometric-setup-start",
            title: "Start biometric setup",
            method: "GET",
            url: "/authentication-service/api/v1/Authentication/biometric/setup/start",
            content: `
      Endpoint to start biometric setup
      `,
          },
          {
            id: "change-password",
            title: "Change user password",
            method: "PUT",
            url: "/authentication-service/api/v1/Authentication/change-password",
            content: `
      Endpoint to change user password
      `,
            codesnippet: `{
  "currentPassword": "string",
  "newPassword": "string",
  "confirmNewPassword": "string"
}`,
          },
          {
            id: "forgot-password",
            title: "Send forgot password email with reset password OTP",
            method: "POST",
            url: "/authentication-service/api/v1/Authentication/forgot-password",
            content: `
      Endpoint to send forgot password email with reset password OTP
      `,
            codesnippet: `{
  "phonenumber": "string",
  "purpose": 1
}`,
          },
          {
            id: "login",
            title: "Authenticate a registered user",
            method: "POST",
            url: "/authentication-service/api/v1/Authentication/login",
            content: `
      Endpoint to authenticate a registered user
      `,
            codesnippet: `{
  "phonenumber": "string",
  "password": "string"
}`,
          },
          {
            id: "logout",
            title: "Log a user out and clear session",
            method: "POST",
            url: "/authentication-service/api/v1/Authentication/logout",
            content: `
      Endpoint to log a user out and clear session
      `,
            codesnippet: `{}`,
          },
          {
            id: "refresh-token",
            title: "Refresh an expired token",
            method: "POST",
            url: "/authentication-service/api/v1/Authentication/refresh-token",
            content: `
      Endpoint to refresh an expired token
      `,
            codesnippet: `{
  "accessToken": "string",
  "refreshToken": "string"
}`,
          },
          {
            id: "reset-password",
            title: "Reset user password",
            method: "POST",
            url: "/authentication-service/api/v1/Authentication/reset-password",
            content: `
      Endpoint to reset user password
      `,
            codesnippet: `{
  "password": "string",
  "confirmPassword": "string"
}`,
          },
          {
            id: "reset-pin",
            title: "Reset user pin",
            method: "POST",
            url: "/authentication-service/api/v1/Authentication/reset-pin",
            content: `
      Endpoint to reset user pin
      `,
            codesnippet: `{
  "pin": "string",
  "confirmPin": "string",
  "pinResetToken": "string"
}`,
          },
          {
            id: "revoke-token",
            title: "Revoke a user refresh token",
            method: "POST",
            url: "/authentication-service/api/v1/Authentication/revoke-token",
            content: `
      Endpoint to revoke a user refresh token
      `,
          },
          {
            id: "send-otp",
            title: "Send reset OTP",
            method: "POST",
            url: "/authentication-service/api/v1/Authentication/send-otp",
            content: `
      Endpoint to send reset OTP
      `,
            codesnippet: `{
  "phonenumber": "string",
  "purpose": 1
}`,
          },
          {
            id: "send-otp-authenticated",
            title: "Send OTP for authenticated users with a purpose",
            method: "POST",
            url: "/authentication-service/api/v1/Authentication/send-otp/authenticated",
            content: `
      Endpoint to send OTP for authenticated users with a purpose
      `,
            codesnippet: `{
  "purpose": 1
}`,
          },
          {
            id: "send-otp-email-authenticated",
            title: "Send reset OTP to email for authenticated users",
            method: "POST",
            url: "/authentication-service/api/v1/Authentication/send-otp/email/authenticated",
            content: `
      Endpoint to send reset OTP to email for authenticated users
      `,
            codesnippet: `{
  "email": "string"
}`,
          },
          {
            id: "switch-device",
            title: "Switch device",
            method: "POST",
            url: "/authentication-service/api/v1/Authentication/switch-device",
            content: `
      Endpoint to switch device
      `,
            codesnippet: `{
  "command": {}
}`,
          },
          {
            id: "validate-otp-email-authenticated",
            title:
              "Validate reset OTP for authenticated users and get a reset token",
            method: "POST",
            url: "/authentication-service/api/v1/Authentication/validate-otp/email/authenticated",
            content: `
      Endpoint to validate reset OTP for authenticated users and get a reset token
      `,
            codesnippet: `{
  "email": "string",
  "otp": "string"
}`,
          },
          {
            id: "validate-pin",
            title:
              "Validate user pin and get an access token for a specific purpose",
            method: "POST",
            url: "/authentication-service/api/v1/Authentication/validate-pin",
            content: `
      Endpoint to validate user pin and get an access token for a specific purpose
      `,
            codesnippet: `{
  "pin": "string",
  "purpose": 1
}`,
          },
          {
            id: "validate-otp",
            title: "Validate Password reset OTP and get a password reset token",
            method: "POST",
            url: "/authentication-service/api/v1/Authentication/validateOTP",
            content: `
      Endpoint to validate Password reset OTP and get a password reset token
      `,
            codesnippet: `{
  "phonenumber": "string",
  "otp": "string"
}`,
          },
          {
            id: "verify-face",
            title: "Verify face",
            method: "POST",
            url: "/authentication-service/api/v1/Authentication/verify-face",
            content: `
      Endpoint to verify face
      `,
            codesnippet: `{
  "FrontImage": "binary",
  "LeftSideImage": "binary",
  "RightSideImage": "binary",
  "DownwardImage": "binary",
  "UpwardLookImage": "binary",
  "Purpose": 1
}`,
          },
          {
            id: "biometric-setup-start-v2",
            title: "Start biometric registration based on purpose",
            method: "POST",
            url: "/authentication-service/api/v2/Authentication/biometric/setup/start",
            content: `
      Endpoint to start biometric registration based on purpose
      `,
            codesnippet: `{
  "biometricPurpose": 1
}`,
          },
          {
            id: "send-otp-v2",
            title: "Send OTP for various purposes",
            method: "POST",
            url: "/authentication-service/api/v2/Authentication/send-otp",
            content: `
      Endpoint to send OTP for various purposes
      `,
            codesnippet: `{
  "phonenumber": "string",
  "purpose": 1
}`,
          },
          {
            id: "switch-device-v2",
            title: "Switch device",
            method: "POST",
            url: "/authentication-service/api/v2/Authentication/switch-device",
            content: `
      Endpoint to switch device
      `,
            codesnippet: `{
  "command": {}
}`,
          },
          {
            id: "validate-otp-v2",
            title: "Validate OTP with a purpose",
            method: "POST",
            url: "/authentication-service/api/v2/Authentication/validateOTP",
            content: `
      Endpoint to validate OTP with a purpose
      `,
            codesnippet: `{
  "phonenumber": "string",
  "otp": "string",
  "purpose": 1
}`,
          },
          {
            id: "validate-otp-authenticated",
            title: "Validate OTP for authenticated users with a purpose",
            method: "POST",
            url: "/authentication-service/api/v2/Authentication/validateOTP/authenticated",
            content: `
      Endpoint to validate OTP for authenticated users with a purpose
      `,
            codesnippet: `{
  "phonenumber": "string",
  "otp": "string",
  "purpose": 1
}`,
          },
          {
            id: "verify-face-v2",
            title: "Verify face",
            method: "POST",
            url: "/authentication-service/api/v2/Authentication/verify-face",
            content: `
      Verify face
      `,
            codesnippet: `{
  "SelfieCaptureImage": "binary",
  "LivenessImages": [
    "binary"
  ],
  "Purpose": 1
}`,
          },
        ],
      },

      {
        id: "payment-service",
        title: "Payment Service",
        content: `
      Handles fund transfers, beneficiary and withdrawal account management, transaction fee calculation, bank/account lookups, and value-added services such as airtime, data, cable TV, and electricity vending.
      `,
        url: "payment-service",
        children: [
          {
            id: "banks",
            title:
              "Retrieves a list of all banks along with their corresponding codes",
            method: "GET",
            url: "/payment-service/api/v1/Lookup/banks",
            content: `
      Retrieves a list of all banks along with their corresponding codes.
      `,
          },
          {
            id: "mno-phone-number",
            title:
              "Check to mobile network operator / service id for a provided mobile number",
            method: "GET",
            url: "/payment-service/api/v1/Lookup/mno/{phoneNumber}",
            content: `
      Endpoint to check to mobile network operator / service id for a provided mobile number
      `,
          },
          {
            id: "name-enquiry",
            title:
              "Performs a name enquiry based on the provided account number and institution code",
            method: "POST",
            url: "/payment-service/api/v1/Lookup/name-enquiry",
            content: `
      Performs a name enquiry based on the provided account number and institution code.
      `,
            codesnippet: `{
  "destinationInstitutionCode": "string",
  "accountNumber": "string"
}`,
          },
          {
            id: "beneficiaries",
            title:
              "Retrieve beneficiaries with FCL ACCOUNT Value as 0 And other Bank Value as 1",
            method: "GET",
            url: "/payment-service/api/v1/Payment/beneficiaries",
            content: `
      Endpoint to retrieve beneficiaries with FCL ACCOUNT Value as 0 And other Bank Value as 1.
      `,
          },
          {
            id: "beneficiaries-post",
            title: "Save beneficiary",
            method: "POST",
            url: "/payment-service/api/v1/Payment/beneficiaries",
            content: `
      Endpoint to save beneficiary
      `,
            codesnippet: `{
  "accountNumber": "string",
  "accountName": "string",
  "destinationInstitutionCode": "string"
}`,
          },
          {
            id: "beneficiaries-delete",
            title: "Delete a beneficiary",
            method: "DELETE",
            url: "/payment-service/api/v1/Payment/beneficiaries",
            content: `
      Endpoint to delete a beneficiary
      `,
            codesnippet: `{
  "accountNumber": "string",
  "destinationInstitutionCode": "string"
}`,
          },
          {
            id: "beneficiaries-all",
            title: "Retrieve all beneficiaries",
            method: "GET",
            url: "/payment-service/api/v1/Payment/beneficiaries/all",
            content: `
      Endpoint to retrieve all beneficiaries
      `,
          },
          {
            id: "fee-amount",
            title: "Calculate transaction fee",
            method: "GET",
            url: "/payment-service/api/v1/Payment/Fee/{amount}",
            content: `
      Endpoint to calculate transaction fee
      `,
          },
          {
            id: "transfer",
            title: "Initiate a fund transfer",
            method: "POST",
            url: "/payment-service/api/v1/Payment/transfer",
            content: `
      Endpoint to initiate a fund transfer
      `,
            codesnippet: `{
  "debitAccountNumber": "string",
  "destinationInstitutionCode": "string",
  "destinationAccountNumber": "string",
  "destinationAccountName": "string",
  "amount": 0,
  "currencyCode": "string",
  "narration": "string",
  "pin": "string",
  "saveBeneficiary": false,
  "transactionType": "string"
}`,
          },
          {
            id: "transfer-biometric",
            title: "Authorize transaction using biometric",
            method: "POST",
            url: "/payment-service/api/v1/Payment/transfer/biometric",
            content: `
      Endpoint to authorize transaction using biometric
      `,
            codesnippet: `{
  "debitAccountNumber": "string",
  "destinationInstitutionCode": "string",
  "destinationAccountNumber": "string",
  "destinationAccountName": "string",
  "amount": 0,
  "currencyCode": "string",
  "narration": "string",
  "biometricCredential": {
    "challenge": "string",
    "credentialId": "string",
    "signature": "string",
    "signCount": 0
  },
  "saveBeneficiary": false,
  "transactionType": "string"
}`,
          },
          {
            id: "withdrawal-accounts",
            title: "Retrieve all withdrawal account",
            method: "GET",
            url: "/payment-service/api/v1/Payment/withdrawal-accounts",
            content: `
      Endpoint to retrieve all withdrawal account
      `,
          },
          {
            id: "withdrawal-accounts-post",
            title: "Add withdrawal account",
            method: "POST",
            url: "/payment-service/api/v1/Payment/withdrawal-accounts",
            content: `
      Endpoint to Add withdrawal account
      `,
            codesnippet: `{
  "accountNumber": "string",
  "accountName": "string",
  "destinationInstitutionCode": "string"
}`,
          },
          {
            id: "withdrawal-accounts-delete",
            title: "Delete a withdrawal account",
            method: "DELETE",
            url: "/payment-service/api/v1/Payment/withdrawal-accounts",
            content: `
      Endpoint to delete a withdrawal account
      `,
            codesnippet: `{
  "accountNumber": "string",
  "institutionCode": "string"
}`,
          },
          {
            id: "vend-airtime",
            title: "Performs a request to vend airtime",
            method: "POST",
            url: "/payment-service/api/v1/vas/airtime/vend-airtime",
            content: `
      Performs a request to vend airtime.
      `,
            codesnippet: `{
  "serviceId": "string",
  "amount": 0,
  "phoneNumber": "string",
  "debitAccountNumber": "string",
  "narration": "string",
  "pin": "string",
  "biometricCredential": {
    "challenge": "string",
    "credentialId": "string",
    "signature": "string",
    "signCount": 0
  }
}`,
          },
          {
            id: "fetch-startimes-products",
            title: "Performs a request to fetch startimes products",
            method: "GET",
            url: "/payment-service/api/v1/vas/cable-tv/fetch-startimes-products",
            content: `
      Performs a request to fetch startimes products.
      `,
          },
          {
            id: "selected",
            title: "Performs a request to fetch multichoice selected products",
            method: "POST",
            url: "/payment-service/api/v1/vas/cable-tv/multichoice/products/selected",
            content: `
      Performs a request to fetch multichoice selected products.
      `,
            codesnippet: `{
  "serviceId": "string"
}`,
          },
          {
            id: "standalone",
            title:
              "Performs a request to fetch multichoice standalone products",
            method: "POST",
            url: "/payment-service/api/v1/vas/cable-tv/multichoice/products/standalone",
            content: `
      Performs a request to fetch multichoice standalone products.
      `,
            codesnippet: `{
  "serviceId": "string"
}`,
          },
          {
            id: "multichoice",
            title: "Performs a request to vend multichoice account",
            method: "POST",
            url: "/payment-service/api/v1/vas/cable-tv/recharge/multichoice",
            content: `
      Performs a request to vend multichoice account.
      `,
            codesnippet: `{
  "serviceId": "string",
  "customerNo": "string",
  "customerName": "string",
  "productsCodes": [
    "string"
  ],
  "amount": 0,
  "invoicePeriod": "string",
  "debitAccountNumber": "string",
  "narration": "string",
  "pin": "string",
  "biometricCredential": {
    "challenge": "string",
    "credentialId": "string",
    "signature": "string",
    "signCount": 0
  }
}`,
          },
          {
            id: "startimes",
            title: "Performs a request to recharge smart card",
            method: "POST",
            url: "/payment-service/api/v1/vas/cable-tv/recharge/startimes",
            content: `
      Performs a request to recharge smart card.
      `,
            codesnippet: `{
  "smartCardCode": "string",
  "amount": 0,
  "debitAccountNumber": "string",
  "narration": "string",
  "pin": "string",
  "biometricCredential": {
    "challenge": "string",
    "credentialId": "string",
    "signature": "string",
    "signCount": 0
  }
}`,
          },
          {
            id: "customer",
            title: "Performs a request to validate multichoice customer number",
            method: "POST",
            url: "/payment-service/api/v1/vas/cable-tv/validate/multichoice/customer",
            content: `
      Performs a request to validate multichoice customer number.
      `,
            codesnippet: `{
  "customerNumber": "string",
  "serviceId": "string"
}`,
          },
          {
            id: "code",
            title: "Performs a request to validate smart card",
            method: "POST",
            url: "/payment-service/api/v1/vas/cable-tv/validate/startimes/code",
            content: `
      Performs a request to validate smart card.
      `,
            codesnippet: `{
  "smartCardCode": "string"
}`,
          },
          {
            id: "get-plans",
            title: "Performs a request to get  data",
            method: "POST",
            url: "/payment-service/api/v1/vas/data/get-plans",
            content: `
      Performs a request to get  data.
      `,
            codesnippet: `{
  "serviceId": "string"
}`,
          },
          {
            id: "vend-data",
            title: "Performs a request to vend data",
            method: "POST",
            url: "/payment-service/api/v1/vas/data/vend-data",
            content: `
      Performs a request to vend data.
      `,
            codesnippet: `{
  "serviceId": "string",
  "amount": 0,
  "phoneNumber": "string",
  "productId": "string",
  "debitAccountNumber": "string",
  "narration": "string",
  "pin": "string",
  "biometricCredential": {
    "challenge": "string",
    "credentialId": "string",
    "signature": "string",
    "signCount": 0
  }
}`,
          },
          {
            id: "buy",
            title: "Purchase electricity",
            method: "POST",
            url: "/payment-service/api/v1/vas/electricity/buy",
            content: `
      Endpoint to purchase electricity
      `,
            codesnippet: `{
  "serviceId": "string",
  "meterNumber": "string",
  "amount": 0,
  "customerName": "string",
  "customerAddress": "string",
  "minimumAmount": "string",
  "debitAccountNumber": "string",
  "narration": "string",
  "pin": "string",
  "biometricCredential": {
    "challenge": "string",
    "credentialId": "string",
    "signature": "string",
    "signCount": 0
  }
}`,
          },
          {
            id: "validate-meter",
            title: "Validate electricity meter details",
            method: "POST",
            url: "/payment-service/api/v1/vas/electricity/validate-meter",
            content: `
      Endpoint to validate electricity meter details
      `,
            codesnippet: `{
  "serviceId": "string",
  "meterNumber": "string"
}`,
          },
          {
            id: "service-providers",
            title: "Get all providers",
            method: "GET",
            url: "/payment-service/api/v1/vas/service-providers",
            content: `
      Endpoint that get all providers
      `,
          },
        ],
      },

      {
        id: "savings-investment-service",
        title: "Savings & Investment Service",
        content: `
      Handles fixed investment products, including placing and liquidating investments, viewing investment details and interest accruals, and retrieving available investment products.
      `,
        url: "savings-investment-service",
        children: [
          {
            id: "investments",
            title:
              "Retrieves a summary of total investment and interest accrued for the user",
            method: "GET",
            url: "/savings-investment-service/api/v1/Investments",
            content: `
      Retrieves a summary of total investment and interest accrued for the user.
      `,
          },
          {
            id: "investments-post",
            title: "Place a new investment",
            method: "POST",
            url: "/savings-investment-service/api/v1/Investments",
            content: `
      Endpoint to Place a new investment
      `,
            codesnippet: `{
  "description": "string",
  "productCode": "string",
  "principalAmount": 0,
  "tenorInDays": 0,
  "accountNumber": "string",
  "pin": "string"
}`,
          },
          {
            id: "arrangement-id-interest-accruals",
            title: "Get interest accruals for an investment",
            method: "GET",
            url: "/savings-investment-service/api/v1/Investments/{arrangementId}/interest-accruals",
            content: `
      Endpoint to get interest accruals for an investment
      `,
          },
          {
            id: "reference",
            title: "Get Investment details by ID",
            method: "GET",
            url: "/savings-investment-service/api/v1/Investments/{reference}",
            content: `
      Endpoint to get Investment details by ID
      `,
          },
          {
            id: "download-letter",
            title: "Download investment letter",
            method: "GET",
            url: "/savings-investment-service/api/v1/Investments/download-letter",
            content: `
      Endpoint to download investment letter
      `,
          },
          {
            id: "liquidate",
            title: "Liquidate an existing investment",
            method: "POST",
            url: "/savings-investment-service/api/v1/Investments/liquidate",
            content: `
      Endpoint to liquidate an existing investment
      `,
            codesnippet: `{
  "arrangementId": "string",
  "pin": "string"
}`,
          },
          {
            id: "liquidate-summary",
            title: "Get liquidation summary for an investment",
            method: "GET",
            url: "/savings-investment-service/api/v1/Investments/liquidate/summary",
            content: `
      Endpoint to get liquidation summary for an investment
      `,
          },
          {
            id: "products",
            title: "Retrieves all available investment products",
            method: "GET",
            url: "/savings-investment-service/api/v1/Investments/products",
            content: `
      Retrieves all available investment products.
      `,
          },
        ],
      },

      {
        id: "loan-management-service",
        title: "Loan Management Service",
        content: `
      Handles the loan lifecycle, including customer profile onboarding (personal information, guarantor, salary account, source of income), loan applications, offers, status updates, liquidation, and employer/employee lookups.
      `,
        url: "loan-management-service",
        children: [
          {
            id: "customer-information",
            title: "Update customer information for the user",
            method: "POST",
            url: "/loan-management-service/api/v1/CustomerProfile/customer-information",
            content: `
      Update customer information for the user
      `,
            codesnippet: `{
  "stateOfOrigin": "string",
  "lga": "string",
  "homeTown": "string",
  "religion": "string",
  "maritalStatus": "string"
}`,
          },
          {
            id: "guarantor",
            title: "Update guarantor details for the user",
            method: "POST",
            url: "/loan-management-service/api/v1/CustomerProfile/guarantor",
            content: `
      Update guarantor details for the user
      `,
            codesnippet: `{
  "phonenumber": "string",
  "fullname": "string",
  "address": "string"
}`,
          },
          {
            id: "salary-account",
            title: "Add a new salary account for the user",
            method: "POST",
            url: "/loan-management-service/api/v1/CustomerProfile/salary-account",
            content: `
      Add a new salary account for the user
      `,
            codesnippet: `{
  "destinationInstitutionCode": "string",
  "accountNumber": "string"
}`,
          },
          {
            id: "source-of-income",
            title: "Update customer source of income details for the user",
            method: "POST",
            url: "/loan-management-service/api/v1/CustomerProfile/source-of-income",
            content: `
      Update customer source of income details for the user
      `,
            codesnippet: `{
  "sector": 0,
  "employerCode": "string",
  "employeeSectorId": "string"
}`,
          },
          {
            id: "summary",
            title: "Get loan onboarding data for the user",
            method: "GET",
            url: "/loan-management-service/api/v1/CustomerProfile/summary",
            content: `
      Get loan onboarding data for the user
      `,
          },
          {
            id: "loans",
            title: "Get user existing loan history",
            method: "GET",
            url: "/loan-management-service/api/v1/Loans",
            content: `
      Endpoint to get user existing loan history
      `,
          },
          {
            id: "loans-post",
            title: "Create a new loan application",
            method: "POST",
            url: "/loan-management-service/api/v1/Loans",
            content: `
      Endpoint to create a new loan application
      `,
            codesnippet: `{
  "LoanAmount": 0,
  "LoanTenureInMonths": 0,
  "FrontImage": "binary",
  "LeftSideImage": "binary",
  "RightSideImage": "binary",
  "DownwardImage": "binary",
  "UpwardLookImage": "binary",
  "BankStatement.Base64PdfContent": "string",
  "BankStatement.DocumentType": 0
}`,
          },
          {
            id: "active",
            title: "Get the currently active loan",
            method: "GET",
            url: "/loan-management-service/api/v1/Loans/active",
            content: `
      Endpoint to get the currently active loan
      `,
          },
          {
            id: "liquidate",
            title: "Liquidate a loan",
            method: "POST",
            url: "/loan-management-service/api/v1/Loans/liquidate",
            content: `
      Endpoint to liquidate a loan
      `,
            codesnippet: `{
  "accountNumber": "string",
  "pin": "string"
}`,
          },
          {
            id: "offer",
            title: "View the loan offer for the user",
            method: "GET",
            url: "/loan-management-service/api/v1/Loans/offer",
            content: `
      Endpoint to view the loan offer for the user
      `,
          },
          {
            id: "offer-review",
            title: "Review a loan offer by the user",
            method: "POST",
            url: "/loan-management-service/api/v1/Loans/offer/review",
            content: `
      Endpoint to review a loan offer by the user
      `,
            codesnippet: `{
  "status": 0,
  "reason": "string",
  "loanId": "string"
}`,
          },
          {
            id: "requirements",
            title: "Get loan requirements for the user",
            method: "GET",
            url: "/loan-management-service/api/v1/Loans/requirements",
            content: `
      Endpoint to get loan requirements for the user
      `,
          },
          {
            id: "status",
            title: "Update the status of a loan application",
            method: "PUT",
            url: "/loan-management-service/api/v1/Loans/status",
            content: `
      Endpoint to update the status of a loan application
      `,
            codesnippet: `{
  "status": 0,
  "loanId": "string"
}`,
          },
          {
            id: "employee",
            title: "Lookup staff ID based on the provided query parameters",
            method: "GET",
            url: "/loan-management-service/api/v1/Lookup/employee",
            content: `
      Lookup staff ID based on the provided query parameters.
      `,
          },
          {
            id: "employers",
            title: "Lookup sectors and their requirements",
            method: "GET",
            url: "/loan-management-service/api/v1/Lookup/employers",
            content: `
      Endpoint to lookup sectors and their requirements
      `,
          },
          {
            id: "loans-v2",
            title: "Create a new loan application v2",
            method: "POST",
            url: "/loan-management-service/api/v2/Loans",
            content: `
      Endpoint to create a new loan application v2
      `,
            codesnippet: `{
  "LoanAmount": 0,
  "LoanTenureInMonths": 0,
  "SelfieCaptureImage": "binary",
  "LivenessImages": [
    "binary"
  ],
  "BankStatement.Base64PdfContent": "string",
  "BankStatement.DocumentType": 0
}`,
          },
        ],
      },
    ],
  },
];
