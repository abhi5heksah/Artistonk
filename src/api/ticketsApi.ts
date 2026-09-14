import type { Ticket, TicketStatus, Message } from '../types/ticket';

const STORAGE_KEY = 'support_tickets_v3';

const SEED_TICKETS: Ticket[] = [
  {
    id: 'TK-1001',
    subject: 'Unable to process payment via UPI / HDFC Credit Card',
    description:
      "I've been trying to upgrade our subscription to the Pro plan for the past two days, but every time I attempt to complete payment via UPI or my HDFC Corporate Credit card, I get a 'payment gateway timeout' error. I've verified my card details and netbanking limits, but the issue persists. We need the team collaboration features urgently for our Bengaluru sprint launch.",
    status: 'Open',
    priority: 'High',
    category: 'Billing',
    createdAt: '2026-09-12T08:15:00Z',
    updatedAt: '2026-09-12T08:15:00Z',
    tags: ['payment', 'upi', 'subscription', 'urgent'],
    assignedTo: 'Aarav Sharma',
    customer: {
      id: 'C-001',
      name: 'Aarav Verma',
      email: 'aarav.verma@tcs-digital.in',
      tier: 'Starter',
      accountRef: 'ACC-IND-78291',
      phone: '+91 98201 45678',
      company: 'Tata Consultancy Services',
      timezone: 'Asia/Kolkata',
    },
    messages: [
      {
        id: 'M-001',
        sender: 'customer',
        senderName: 'Aarav Verma',
        content:
          "Namaste, I've been unable to upgrade our plan for two days now. Both UPI autodebit and HDFC Corporate Mastercard are failing at the 3DS OTP step. Can you please check the gateway logs?",
        timestamp: '2026-09-12T08:15:00Z',
      },
      {
        id: 'M-002',
        sender: 'agent',
        senderName: 'Aarav Sharma',
        content:
          "Hello Aarav, apologies for the inconvenience caused with the payment. I've reviewed your account and can see the failed attempts on Razorpay/HDFC gateway. Could you please confirm if recurring e-mandate authentication was prompted during the OTP step?",
        timestamp: '2026-09-12T09:30:00Z',
      },
      {
        id: 'M-003',
        sender: 'customer',
        senderName: 'Aarav Verma',
        content:
          "The error code on the RBI e-mandate screen shows 'ERR_RBI_MANDATE_TIMEOUT'. We can also do a direct NEFT / RTGS transfer if corporate invoice details are provided.",
        timestamp: '2026-09-12T10:05:00Z',
      },
    ],
  },
  {
    id: 'TK-1002',
    subject: 'Mobile app crashes on startup after v3.2 update on Android 14',
    description:
      'After updating the support app to version 3.2 on OnePlus 12 and Samsung Galaxy S24, the application crashes immediately upon launch before the authentication screen appears. We have tried clearing cache and reinstalling from Google Play Store, but the crash still happens. Our delivery operations team relies on this for real-time tracking.',
    status: 'In Progress',
    priority: 'High',
    category: 'Technical',
    createdAt: '2026-09-11T14:22:00Z',
    updatedAt: '2026-09-13T11:00:00Z',
    tags: ['android', 'crash', 'play-store', 'urgent'],
    assignedTo: 'Kabir Joshi',
    customer: {
      id: 'C-002',
      name: 'Priya Patel',
      email: 'priya.patel@swiggy.in',
      tier: 'Pro',
      accountRef: 'ACC-IND-54129',
      phone: '+91 99801 87654',
      company: 'Swiggy Labs, Bengaluru',
      timezone: 'Asia/Kolkata',
    },
    messages: [
      {
        id: 'M-004',
        sender: 'customer',
        senderName: 'Priya Patel',
        content:
          'The app crashes instantly on Android 14 after the v3.2 Play Store update. Crash logs show java.lang.NullPointerException in NotificationChannelHelper. Please provide a hotfix APK ASAP!',
        timestamp: '2026-09-11T14:22:00Z',
      },
      {
        id: 'M-005',
        sender: 'agent',
        senderName: 'Kabir Joshi',
        content:
          "Hi Priya, thank you for sharing the crash stack trace. Our mobile engineering team in Bengaluru has pinpointed the Android 14 POST_NOTIFICATIONS permission issue. A patch v3.2.1 is currently in staging testing.",
        timestamp: '2026-09-11T16:45:00Z',
      },
      {
        id: 'M-006',
        sender: 'customer',
        senderName: 'Priya Patel',
        content:
          "Understood Kabir. Can you share an internal staging build APK so our 25-member dispatch team can test?",
        timestamp: '2026-09-12T09:10:00Z',
      },
      {
        id: 'M-007',
        sender: 'agent',
        senderName: 'Kabir Joshi',
        content:
          "Shared the signed test APK via our secure enterprise drive. Engineering is pushing the production build to Google Play Review today.",
        timestamp: '2026-09-13T11:00:00Z',
        isInternal: false,
      },
    ],
  },
  {
    id: 'TK-1003',
    subject: 'Request to migrate workspace data to Zomato enterprise tenant',
    description:
      'We recently upgraded to an Enterprise contract for Zomato Media and need to migrate all incident telemetry, dashboards, and historical ticket data from our pilot workspace (ORG-DEL-338) to our main enterprise tenant (ORG-ZOM-990). We want to ensure zero downtime and complete audit log retention.',
    status: 'Open',
    priority: 'Medium',
    category: 'Account',
    createdAt: '2026-09-13T07:45:00Z',
    updatedAt: '2026-09-13T07:45:00Z',
    tags: ['migration', 'enterprise', 'data-transfer'],
    assignedTo: undefined,
    customer: {
      id: 'C-003',
      name: 'Rohan Sharma',
      email: 'rohan.sharma@zomato.in',
      tier: 'Pro',
      accountRef: 'ACC-IND-33871',
      phone: '+91 98112 34567',
      company: 'Zomato Media, Gurugram',
      timezone: 'Asia/Kolkata',
    },
    messages: [
      {
        id: 'M-008',
        sender: 'customer',
        senderName: 'Rohan Sharma',
        content:
          "Hello, we need assistance migrating our pilot workspace data into the corporate Zomato tenant (ORG-ZOM-990). Please confirm if migration can be scheduled during low-traffic hours (Sunday 2:00 AM IST).",
        timestamp: '2026-09-13T07:45:00Z',
      },
    ],
  },
  {
    id: 'TK-1004',
    subject: 'Webhook rate limits and SEBI compliance data archival',
    description:
      "Our trading infrastructure team at Zerodha is configuring webhook integrations for trade notification alerts. The documentation states a cap of 1,000 requests/minute, but our latency telemetry observed 429 errors at 650 req/min. Furthermore, we require confirmation that webhook payload logs comply with 5-year data archival mandates under Indian financial regulatory guidelines.",
    status: 'Resolved',
    priority: 'Medium',
    category: 'Technical',
    createdAt: '2026-09-10T11:30:00Z',
    updatedAt: '2026-09-12T14:20:00Z',
    tags: ['api', 'webhooks', 'rate-limit', 'compliance'],
    assignedTo: 'Rhea Kapoor',
    customer: {
      id: 'C-004',
      name: 'Ananya Iyer',
      email: 'ananya.iyer@zerodha.in',
      tier: 'Enterprise',
      accountRef: 'ACC-IND-92017',
      phone: '+91 97401 23456',
      company: 'Zerodha Broking, Bengaluru',
      timezone: 'Asia/Kolkata',
    },
    messages: [
      {
        id: 'M-009',
        sender: 'customer',
        senderName: 'Ananya Iyer',
        content:
          "Webhook rate limiting triggered 429 Too Many Requests during morning market opening (9:15 AM IST). Please verify your bursting allowance and confirm compliance log retention.",
        timestamp: '2026-09-10T11:30:00Z',
      },
      {
        id: 'M-010',
        sender: 'agent',
        senderName: 'Rhea Kapoor',
        content:
          "Hi Ananya, thank you for reaching out. We have provisioned dedicated webhook throughput of 5,000 req/min for Zerodha's production cluster with automated failover in the AWS Mumbai (ap-south-1) zone. In addition, immutable audit logs are backed up to S3 Glacier with 7-year retention.",
        timestamp: '2026-09-11T10:15:00Z',
      },
      {
        id: 'M-011',
        sender: 'customer',
        senderName: 'Ananya Iyer',
        content:
          "The dedicated cluster configuration was verified during today's market open with zero 429 errors. Latency averaged under 42ms. Thank you for the swift resolution!",
        timestamp: '2026-09-12T14:10:00Z',
      },
      {
        id: 'M-012',
        sender: 'agent',
        senderName: 'Rhea Kapoor',
        content:
          "Delighted to hear that, Ananya! We are marking this ticket as resolved. Our enterprise technical support is on standby 24/7 for market hours assistance.",
        timestamp: '2026-09-12T14:20:00Z',
      },
    ],
  },
  {
    id: 'TK-1005',
    subject: 'Two-factor authentication SMS OTP delivery delays on Jio and Airtel',
    description:
      "Several team members across Mumbai and Bengaluru offices are facing 15-20 minute delays receiving SMS OTP verification codes on Jio and Airtel cellular networks. This has locked out engineers during critical production shifts. We need emergency email OTP fallback enabled.",
    status: 'In Progress',
    priority: 'High',
    category: 'Account',
    createdAt: '2026-09-13T13:00:00Z',
    updatedAt: '2026-09-14T08:30:00Z',
    tags: ['2fa', 'otp', 'authentication', 'jio-airtel'],
    assignedTo: 'Aarav Sharma',
    customer: {
      id: 'C-005',
      name: 'Vikram Malhotra',
      email: 'vikram.m@razorpay.in',
      tier: 'Enterprise',
      accountRef: 'ACC-IND-11542',
      phone: '+91 98450 11223',
      company: 'Razorpay Payments, Bengaluru',
      timezone: 'Asia/Kolkata',
    },
    messages: [
      {
        id: 'M-013',
        sender: 'customer',
        senderName: 'Vikram Malhotra',
        content:
          "Team is locked out due to DLT template registration delays on Indian telco networks. OTPs arrive 20 minutes late and expire. Please switch our tenant to Email OTP or Authenticator app immediately.",
        timestamp: '2026-09-13T13:00:00Z',
      },
      {
        id: 'M-014',
        sender: 'agent',
        senderName: 'Aarav Sharma',
        content:
          "Hi Vikram, I completely understand the criticality. I've enabled TOTP Authenticator (Google Authenticator / Microsoft Authenticator) and instant corporate email verification fallback for all Razorpay domain users. SMS gateway routing has also been switched to our backup Twilio / Route Mobile route.",
        timestamp: '2026-09-13T13:25:00Z',
      },
      {
        id: 'M-015',
        sender: 'customer',
        senderName: 'Vikram Malhotra',
        content:
          "TOTP authenticator app worked immediately for our team. The backup route SMS OTP is also delivering within 4 seconds now. Thanks Aarav!",
        timestamp: '2026-09-13T13:40:00Z',
      },
      {
        id: 'M-016',
        sender: 'agent',
        senderName: 'Aarav Sharma',
        content:
          "Great to hear, Vikram! Keeping this ticket monitored for another 24 hours to ensure 100% stability across all carrier circles in India.",
        timestamp: '2026-09-14T08:30:00Z',
      },
    ],
  },
  {
    id: 'TK-1006',
    subject: 'Request for INR (₹) billing currency and GSTIN invoicing on checkout',
    description:
      "Currently all billing tiers display in USD. For Indian corporate accounts, we require invoices issued in Indian Rupees (INR) with our GSTIN number (29AAACB9876P1Z1) prominently printed for Input Tax Credit (ITC) compliance. Please advise how to enable Indian domestic billing.",
    status: 'Open',
    priority: 'Low',
    category: 'Feature Request',
    createdAt: '2026-09-09T16:00:00Z',
    updatedAt: '2026-09-09T16:00:00Z',
    tags: ['gst', 'inr', 'billing', 'india-compliance'],
    assignedTo: undefined,
    customer: {
      id: 'C-006',
      name: 'Neha Gupta',
      email: 'neha.gupta@flipkart.in',
      tier: 'Pro',
      accountRef: 'ACC-IND-67234',
      phone: '+91 99400 33445',
      company: 'Flipkart Internet, Bengaluru',
      timezone: 'Asia/Kolkata',
    },
    messages: [
      {
        id: 'M-017',
        sender: 'customer',
        senderName: 'Neha Gupta',
        content:
          "We need B2B tax invoices with our 15-digit GSTIN number and SAC code for accounting audits. When can Indian domestic currency checkout be enabled?",
        timestamp: '2026-09-09T16:00:00Z',
      },
      {
        id: 'M-018',
        sender: 'agent',
        senderName: 'Aarav Sharma',
        content:
          "Hi Neha, thank you for your query. Our Indian entity onboarding is completing this quarter. In the interim, our finance team can manually issue an INR invoice with 18% GST and your GSTIN. I have passed your details to our enterprise finance desk.",
        timestamp: '2026-09-10T09:15:00Z',
      },
    ],
  },
  {
    id: 'TK-1007',
    subject: 'Incorrect GST calculation on September SaaS subscription invoice',
    description:
      "Our September billing shows a charge of ₹24,999 + ₹4,500 IGST, but our state of registration is Maharashtra (27AAACI1234F1Z5) while your billing entity shows Maharashtra as well, which should be CGST 9% + SGST 9% instead of IGST 18%. Our chartered accountant has flagged this discrepancy.",
    status: 'In Progress',
    priority: 'High',
    category: 'Billing',
    createdAt: '2026-09-13T09:00:00Z',
    updatedAt: '2026-09-14T10:00:00Z',
    tags: ['gst', 'tax', 'invoice', 'audit'],
    assignedTo: 'Rhea Kapoor',
    customer: {
      id: 'C-007',
      name: 'Aditya Nair',
      email: 'aditya.nair@infosys.com',
      tier: 'Pro',
      accountRef: 'ACC-IND-28934',
      phone: '+91 97110 55667',
      company: 'Infosys Technologies, Pune',
      timezone: 'Asia/Kolkata',
    },
    messages: [
      {
        id: 'M-019',
        sender: 'customer',
        senderName: 'Aditya Nair',
        content:
          "Invoice #INV-2026-0988 has incorrect GST classification (IGST applied instead of intra-state CGST/SGST). Please reissue with proper tax breakdown.",
        timestamp: '2026-09-13T09:00:00Z',
      },
      {
        id: 'M-020',
        sender: 'agent',
        senderName: 'Rhea Kapoor',
        content:
          "Hi Aditya, apologies for the tax classification oversight. Our automated billing portal mapped your place of supply based on IP rather than GSTIN master data. I have voided INV-2026-0988 and issued revised invoice INV-2026-0988-R1 reflecting 9% CGST + 9% SGST.",
        timestamp: '2026-09-13T11:30:00Z',
      },
      {
        id: 'M-021',
        sender: 'customer',
        senderName: 'Aditya Nair',
        content:
          "Revised invoice received and verified with our finance team. Thank you Rhea for resolving this in under two hours.",
        timestamp: '2026-09-14T09:30:00Z',
      },
      {
        id: 'M-022',
        sender: 'agent',
        senderName: 'Rhea Kapoor',
        content:
          "Glad to help Aditya! I have locked your account's tax master so all subsequent monthly invoices generate with intra-state CGST/SGST automatically.",
        timestamp: '2026-09-14T10:00:00Z',
      },
    ],
  },
  {
    id: 'TK-1008',
    subject: 'Quarterly financial report data export timed out during tax filing week',
    description:
      "Our compliance team at ClearTax requested a complete annual incident and SLA telemetry export containing ~85,000 records on September 12th. The job status has remained on 'Generating CSV' for over 18 hours. With quarterly tax filing deadlines approaching on September 15th, we need this data promptly.",
    status: 'Resolved',
    priority: 'Medium',
    category: 'Technical',
    createdAt: '2026-09-12T06:30:00Z',
    updatedAt: '2026-09-13T15:45:00Z',
    tags: ['export', 'data', 'compliance', 'cleartax'],
    assignedTo: 'Kabir Joshi',
    customer: {
      id: 'C-008',
      name: 'Sneha Kulkarni',
      email: 'sneha.k@cleartax.in',
      tier: 'Enterprise',
      accountRef: 'ACC-IND-45789',
      phone: '+91 98220 77889',
      company: 'ClearTax, Mumbai',
      timezone: 'Asia/Kolkata',
    },
    messages: [
      {
        id: 'M-023',
        sender: 'customer',
        senderName: 'Sneha Kulkarni',
        content:
          "Export job ID #EXP-88912 is stuck at 62% for 18 hours. We have a statutory compliance deadline tomorrow morning.",
        timestamp: '2026-09-12T06:30:00Z',
      },
      {
        id: 'M-024',
        sender: 'agent',
        senderName: 'Kabir Joshi',
        content:
          "Hi Sneha, I understand the time constraint with the statutory deadline. The query timed out due to complex JSON message parsing. I've partitioned the export into two chunks and executed it directly on our dedicated read replica. Both encrypted download links have been dispatched to your email.",
        timestamp: '2026-09-13T06:45:00Z',
      },
      {
        id: 'M-025',
        sender: 'customer',
        senderName: 'Sneha Kulkarni',
        content:
          "Both CSV files downloaded successfully. SHA-256 checksums verified. We were able to file the compliance documentation on schedule.",
        timestamp: '2026-09-13T07:20:00Z',
      },
      {
        id: 'M-026',
        sender: 'agent',
        senderName: 'Kabir Joshi',
        content:
          "Fantastic news Sneha! We've also upgraded the async worker memory allocation so future 100k+ record exports complete within 15 minutes. Marking this ticket as resolved.",
        timestamp: '2026-09-13T15:45:00Z',
      },
    ],
  },
  {
    id: 'TK-1009',
    subject: 'Slack integration webhook failing to trigger in #support-chennai channel',
    description:
      "The Slack incoming webhook integration connected to our Chennai support engineering channel stopped receiving ticket status change events today at 9:00 AM IST. OAuth permissions show active in the Slack app directory, but payload deliveries show HTTP 504 gateway timeout.",
    status: 'Open',
    priority: 'Medium',
    category: 'Technical',
    createdAt: '2026-09-14T06:00:00Z',
    updatedAt: '2026-09-14T06:00:00Z',
    tags: ['integration', 'slack', 'webhook', 'freshworks'],
    assignedTo: undefined,
    customer: {
      id: 'C-009',
      name: 'Karan Singhania',
      email: 'karan.s@freshworks.in',
      tier: 'Pro',
      accountRef: 'ACC-IND-76543',
      phone: '+91 98410 99887',
      company: 'Freshworks, Chennai',
      timezone: 'Asia/Kolkata',
    },
    messages: [
      {
        id: 'M-027',
        sender: 'customer',
        senderName: 'Karan Singhania',
        content:
          "Our Chennai ops room alert channel stopped receiving incident pings this morning. Webhook endpoint returns HTTP 504. Please investigate.",
        timestamp: '2026-09-14T06:00:00Z',
      },
    ],
  },
  {
    id: 'TK-1010',
    subject: 'SAML SSO integration setup with Azure AD / Microsoft Entra ID',
    description:
      "Our cybersecurity team at Wipro is implementing Single Sign-On (SSO) using Microsoft Entra ID (Azure AD) for 400+ support engineers across our Hyderabad and Pune centres. We are getting a 'SAML Signature Verification Failed' error during the test federation handshake.",
    status: 'In Progress',
    priority: 'Medium',
    category: 'Account',
    createdAt: '2026-09-11T10:00:00Z',
    updatedAt: '2026-09-13T16:30:00Z',
    tags: ['sso', 'azure-ad', 'wipro', 'enterprise'],
    assignedTo: 'Aarav Sharma',
    customer: {
      id: 'C-010',
      name: 'Divya Sundaram',
      email: 'divya.s@wipro.com',
      tier: 'Enterprise',
      accountRef: 'ACC-IND-10023',
      phone: '+91 98840 12398',
      company: 'Wipro Enterprise, Hyderabad',
      timezone: 'Asia/Kolkata',
    },
    messages: [
      {
        id: 'M-028',
        sender: 'customer',
        senderName: 'Divya Sundaram',
        content:
          "Test login returns 'AADSTS50011: The reply URL specified in the request does not match the reply URLs configured for the application'. Please verify the exact ACS URL expected for our tenant.",
        timestamp: '2026-09-11T10:00:00Z',
      },
      {
        id: 'M-029',
        sender: 'agent',
        senderName: 'Aarav Sharma',
        content:
          "Hi Divya, the reply URL in Entra ID must include your organization alias: https://auth.supportdesk.in/saml/sso/wipro-corp. Please also ensure the X.509 signing certificate is in PEM format with SHA-256 digest.",
        timestamp: '2026-09-11T13:00:00Z',
      },
      {
        id: 'M-030',
        sender: 'customer',
        senderName: 'Divya Sundaram',
        content:
          "Updated the reply URL and re-uploaded the X.509 cert. User attribute mapping for UPN and department is working in our staging sandbox.",
        timestamp: '2026-09-12T09:00:00Z',
      },
      {
        id: 'M-031',
        sender: 'agent',
        senderName: 'Aarav Sharma',
        content:
          "Confirmed from our auth logs! 12 test users authenticated seamlessly with JIT (Just-in-Time) user provisioning. Ready to promote to production whenever you're ready.",
        timestamp: '2026-09-13T16:30:00Z',
      },
    ],
  },
  {
    id: 'TK-1011',
    subject: 'Cannot download GST tax invoice PDF on Chrome browser',
    description:
      "When clicking 'Download Tax Invoice' in the billing section, the button triggers a blank page instead of downloading the signed PDF invoice for our accounts reconciliation at Ola Electric. Happens on Windows 11 Chrome and Edge browsers.",
    status: 'Resolved',
    priority: 'Low',
    category: 'Billing',
    createdAt: '2026-09-08T14:00:00Z',
    updatedAt: '2026-09-10T11:00:00Z',
    tags: ['billing', 'gst-invoice', 'download', 'pdf'],
    assignedTo: 'Rhea Kapoor',
    customer: {
      id: 'C-011',
      name: 'Arjun Reddy',
      email: 'arjun.reddy@olaelectric.in',
      tier: 'Starter',
      accountRef: 'ACC-IND-88321',
      phone: '+91 99001 54321',
      company: 'Ola Electric, Bengaluru',
      timezone: 'Asia/Kolkata',
    },
    messages: [
      {
        id: 'M-032',
        sender: 'customer',
        senderName: 'Arjun Reddy',
        content:
          "Clicking invoice download opens 'about:blank' tab. Need August and July invoices for audit.",
        timestamp: '2026-09-08T14:00:00Z',
      },
      {
        id: 'M-033',
        sender: 'agent',
        senderName: 'Rhea Kapoor',
        content:
          "Hi Arjun, this was caused by a Content-Disposition header issue on our CDN when serving digitally signed PDFs in Chrome. We pushed a fix to our storage service. You can now download directly, and I've also emailed both copies to your registered email.",
        timestamp: '2026-09-09T10:30:00Z',
      },
      {
        id: 'M-034',
        sender: 'customer',
        senderName: 'Arjun Reddy',
        content:
          "Both PDFs downloaded properly from the portal with digital signature intact. Thanks for the quick support Rhea.",
        timestamp: '2026-09-10T11:00:00Z',
      },
    ],
  },
  {
    id: 'TK-1012',
    subject: 'Enterprise plan inquiry for 500+ store operations across India',
    description:
      "We are evaluating your incident telemetry and ticketing console for rollout across 500+ Reliance Digital and Retail outlets pan-India. We need custom SLA tiers, multi-region failover between Mumbai and Hyderabad, and volume licensing in INR. Please arrange a call with your enterprise solutions lead.",
    status: 'Open',
    priority: 'Low',
    category: 'General',
    createdAt: '2026-09-14T11:00:00Z',
    updatedAt: '2026-09-14T11:00:00Z',
    tags: ['enterprise', 'pricing', 'retail', 'pan-india'],
    assignedTo: undefined,
    customer: {
      id: 'C-012',
      name: 'Pooja Deshmukh',
      email: 'pooja.d@reliance-retail.in',
      tier: 'Free',
      accountRef: 'ACC-IND-99812',
      phone: '+91 98200 45670',
      company: 'Reliance Retail, Mumbai',
      timezone: 'Asia/Kolkata',
    },
    messages: [
      {
        id: 'M-035',
        sender: 'customer',
        senderName: 'Pooja Deshmukh',
        content:
          "Namaste, we are looking for enterprise tier pricing for ~500 store locations pan-India with dedicated account manager. Could your enterprise team reach out for an architecture demo?",
        timestamp: '2026-09-14T11:00:00Z',
      },
    ],
  },
];

function loadTickets(): Ticket[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored);
  } catch {
    // ignore
  }
  return SEED_TICKETS;
}

function saveTickets(tickets: Ticket[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tickets));
  } catch {
    // ignore
  }
}

let _tickets: Ticket[] = loadTickets();

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

export async function fetchTickets(): Promise<Ticket[]> {
  await delay(400);
  _tickets = loadTickets();
  return [..._tickets];
}

export async function updateTicketStatus(
  id: string,
  status: TicketStatus
): Promise<Ticket> {
  await delay(200);
  const idx = _tickets.findIndex((t) => t.id === id);
  if (idx === -1) throw new Error(`Ticket ${id} not found`);
  _tickets[idx] = { ..._tickets[idx], status, updatedAt: new Date().toISOString() };
  saveTickets(_tickets);
  return { ..._tickets[idx] };
}

export async function addTicketMessage(
  id: string,
  content: string,
  isInternal = false
): Promise<Message> {
  await delay(200);
  const idx = _tickets.findIndex((t) => t.id === id);
  if (idx === -1) throw new Error(`Ticket ${id} not found`);
  const newMsg: Message = {
    id: `M-${Date.now()}`,
    sender: 'agent',
    senderName: 'Aarav Sharma (Support Lead)',
    content,
    timestamp: new Date().toISOString(),
    isInternal,
  };
  _tickets[idx] = {
    ..._tickets[idx],
    messages: [..._tickets[idx].messages, newMsg],
    updatedAt: new Date().toISOString(),
  };
  saveTickets(_tickets);
  return newMsg;
}
