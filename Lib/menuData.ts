export type MenuChild = {
  id: string;
  title: string;
  method?: string;
  content?: string;
  url?: string;
  codesnippet?: string;
  children?: MenuChild[];
};

export interface MenuSection {
  id: string;
  title: string;
  content: string;
  url?: string;
  children?: MenuSection[];
}

export const menuData: MenuChild[] = [
  
   {
    id : "introduction",
    title: "Fast Credit APIs",
    content: `

Welcome to the Fast Credit API documentation.

The Fast Credit API provides a secure and scalable set of REST APIs that allow developers to integrate digital onboarding, identity verification, authentication, customer profile management, and account services into their applications.

Built on modern REST standards, the APIs are designed to simplify customer registration, verification, profile management, and validation workflows while maintaining enterprise-grade security and performance.

The APIs are grouped into logical services to make integration easier.

Our current API suite includes:

<br>User Management
Customer Profile Settings
Validation Services
Lookup Services
Accounting Services
Authentication Services<br>

Every request should include the required authorization token unless stated otherwise.`,
    url: "introduction-service",
    
  },
  {
    id: "User management",
    title: "User management",
    url: "authentication-service",
    content: "Manage customer registration and authentication",
    codesnippet: `// Example code snippet
`,
  },

  {
    id: "Register New User",
    title: "Register New User",
    method: "POST",
    content: "/user-management/api/v1/Users/register",
    url: "register-new-user",
  },

  {
    id: "Customer profile settings",
    title: "Customer Profile Settings",
    content: "Manage customer profile settings",
    url: "customer-profile-settings", 
  },

  {
    id: "Get Instant Payment Status",
    title: "Get Instant Payment Status",
    method: "GET",
    content: "/payment/api/v1/instant-payment-status",
    url: "get-instant-payment-status",
  },

  {
    id: "Update Instant Payment Status",
    title: "Update Instant Payment Status",
    method: "PUT",
    content: "/user-management/api/v1/CustomerProfileSettings/instant-payment",
    url: "update-instant-payment-status",
  },

  {
    id: "Update Email Address",
    title: "Update Email Address",
    method: "PUT",
    content: "/user-management/api/v1/CustomerProfileSettings/update-email",
    url: "update-email-address",
  },
  
 
  
  
]