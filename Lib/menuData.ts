export type MenuChild = {
  id: string;
  title: string;
  method?: string;
  content?: string;
  children?: MenuChild[];
  codesnippet?: string;
};

export type MenuSection = {
  id: string;
  title: string;
  children: MenuChild[];
};

export const menuData: MenuSection[] = [
  {
    id: "auth-new",
    title: "Authentication- New APIs",
    children: [
      {
        id: "auth-new-register",
        title: "Register",
        content:
          "Register on RemitaConnect: Sign up at RemitaConnect to create your account and obtain your Public and Secret Keys. Important Note: You immediately have access to all our available new services on our test environment and you can access them using your keys. Activate Your Account: Once registered, activate your account as directed on the web application to access production credentials. Subscribe to Services: To enable a service, subscribe to it on the web application. After approval, you'll be ready to use the service in production.",
       codesnippet: "codesnp"
        },
    ],
  },
  {
    id: "auth-first",
    title: "Authentication- First Generation APIs",
    children: [
      {
        id: "auth-first-token",
        method: "POST",
        title: "Generate Token",
        content: "Generate an authentication token using your first generation API credentials.",
         codesnippet: "codee"
        
      },
    ],
   
  },
  {
    id: "accept-payments",
    title: "Accept Payments",
    children: [
      {
        id: "accept-online-payments",
        title: "Accept Online Payments",
        content: "Accept online payments through our secure payment gateway.",
        codesnippet: "Knoxon"
      },
      {
        id: "invoice-generation",
        title: "Invoice Generation",
        content: "Generate invoices for your customers.",
      },
      {
        id: "direct-debit-non-fi",
        title: "Direct Debit (For Non-Financial Institutions)",
        content: "Initiate direct debit transactions for non-financial institutions.",
        
      },
      {
        id: "direct-debit-fi",
        title: "Direct Debit (For Financial Institutions)",
        content: "Initiate direct debit transactions for financial institutions.",
      },
    ],
  },
  {
    id: "funds-transfer",
    title: "Funds Transfer",
    
    
    children: [
      {
        id: "ft-rest",
        title: "Rest Interface",
        content: "Access our REST API for seamless funds transfer operations.",
      },
      {
        id: "ft-soap",
        title: "SOAP Interface",
        content: "Utilize our SOAP API for enterprise-level funds transfer solutions.",
         codesnippet: "cokdee"
      },
    ],
   
  },
  {
    id: "collections",
    title: "Collections",
    children: [
      {
        id: "collections-overview",
        title: "Overview",
        content: "Streamlined processing of collections for a wide range of Billers - from Government institutions to other Businesses.",
      },
    ],
    
  },
  
  {
    id: "vending-bills",
    title: "Vending Bills",
    children: [
      {
        id: "vending-overview",
        title: "Overview",
        content: "A focused service for purchasing Airtime, Data, Electricity, and other utilities.",
      },
    ],
  },
  {
    id: "inflight-collections",
    title: "Inflight Collections",
    children: [
      {
        id: "inflight-overview",
        title: "Overview",
        content: "Manage and process inflight collection transactions in real time.",
      },
    ],
  },
  {
    id: "verification-service",
    title: "Verification Service",
    children: [
      {
        id: "verification-overview",
        title: "Overview",
        content: "Offering reliable data verification for individuals and businesses.",
      },
    ],
  },
  {
    id: "nrs-einvoice",
    title: "NRS e-Invoice",
    children: [
      {
        id: "nrs-overview",
        title: "Overview",
        content: "Generate and manage e-Invoices in compliance with NRS requirements.",
      },
    ],
  },
  {
    id: "general-reference",
    title: "General Reference",
    children: [
      {
        id: "general-overview",
        title: "Overview",
        content: "General reference material, error codes, and response formats used across all APIs.",
      },
    ],
  },
  
];