import { AcademyModule, RealWorldCase, SecurityTipCategory, QuizQuestion } from '../types';
import { ACADEMY_MODULES_FULL } from './academyData';

export const ACADEMY_MODULES: AcademyModule[] = ACADEMY_MODULES_FULL;

export const REAL_WORLD_CASES: RealWorldCase[] = [
  {
    id: 'case-1',
    title: 'The Ubiquiti Networks $46M Wire Transfer BEC',
    targetOrg: 'Ubiquiti Networks Inc.',
    year: '2015',
    vector: 'Executive Impersonation (BEC) & Lookalike Domains',
    impact: '$46.7 Million USD wire fraud loss across multinational accounts',
    summary: 'Attackers registered lookalike domains closely matching executive leadership and external legal counsel, requesting urgent overseas corporate acquisitions.',
    attackFlow: [
      'Reconnaissance on senior leadership travel and quarterly financial cycles',
      'Registration of typosquatted domain resembling internal corporate domains',
      'Targeted email sent to finance director mimicking the Chief Executive',
      'Request for confidential expedited wire transfers bypassing standard multi-signatory review'
    ],
    indicators: [
      'Sender domain had subtle character transposition (.corn vs .com)',
      'High urgency demanding secrecy due to "non-disclosure agreements"',
      'Direct order to bypass established ERP approval queues'
    ],
    defensiveLessons: [
      'Mandatory phone/video out-of-band verification on wire transfers above threshold',
      'Strict external email tagging and display name anti-spoofing filters (DMARC/DKIM/SPF)',
      'Four-eye dual signatory authorization protocols for capital movements'
    ],
    severity: 'Critical'
  },
  {
    id: 'case-2',
    title: 'The Twilio & Cloudflare Okta Credential Harvesting Campaign',
    targetOrg: 'Twilio / Cloudflare',
    year: '2022',
    vector: 'Targeted SMS Phishing (Smishing) + AitM Proxy',
    impact: 'Compromise of employee 2FA credentials at multiple technology companies',
    summary: 'Employees received urgent SMS messages claiming their schedule had changed or password expired with links pointing to typosquatted SSO portals.',
    attackFlow: [
      'Attackers scraped employee phone numbers from corporate directories and data dumps',
      'Automated mass SMS broadcast with lookalike SSO URL: "twilio-sso-okta.com"',
      'Victim visited landing page resembling genuine Okta login with AitM relay',
      'Real-time OTP captured and immediately utilized to establish session'
    ],
    indicators: [
      'SMS originated from unknown rotating VoIP shortcodes',
      'Domain was registered less than 24 hours prior to message transmission',
      'URL included unauthorized subdomains pairing corporate names with third-party identity providers'
    ],
    defensiveLessons: [
      'Transition from SMS/App OTP to hardware security keys (FIDO2 / WebAuthn)',
      'Certificate-bound Fast Identity Online tokens that cannot be relayed to attacker domains',
      'Proactive domain monitoring for brand and SSO provider keyword registrations'
    ],
    severity: 'High'
  },
  {
    id: 'case-3',
    title: 'The DNC Lookalike Google Security Warning Breach',
    targetOrg: 'Democratic National Committee',
    year: '2016',
    vector: 'Spear Phishing with Google Account Security Lure',
    impact: 'Unauthorized access to primary campaign mailboxes and data exfiltration',
    summary: 'A staffer received a forged Google security alert warning that someone had their password, containing a Bitly shortened link to a phishing landing page.',
    attackFlow: [
      'Carefully replicated Google account security warning template',
      'Bitly shortened link masking reverse proxy server in Eastern Europe',
      'Recipient consulted internal support, which accidentally confirmed link authenticity due to typo',
      'Password entered on phishing page granted immediate persistent OAuth app token'
    ],
    indicators: [
      'Shortened URL disguised the true destination hostname',
      'Sender address used subtle sub-domain routing masquerading as Google notifications',
      'Immediate prompt to change password on a non-accounts.google.com host'
    ],
    defensiveLessons: [
      'Ban shortened URLs in corporate inbox inspection policies',
      'Standardize strict IT triage verification workflows for reported security alerts',
      'Implement Advanced Protection Program enforcing physical security keys'
    ],
    severity: 'Critical'
  }
];

export const SECURITY_TIPS: SecurityTipCategory[] = [
  {
    id: 'tip-cat-1',
    title: 'Email Header & Sender Verification',
    iconName: 'MailCheck',
    tips: [
      {
        title: 'Inspect the Envelope Sender vs Display Name',
        description: 'Attackers frequently set the display name to "CEO Name" or "IT Security Team" while the underlying email address is a random free webmail account.',
        actionableRule: 'Always expand the sender details to inspect the actual address between the angle brackets <user@domain.com>.',
        level: 'Essential'
      },
      {
        title: 'Examine Reply-To Header Discrepancies',
        description: 'A phishing email might spoof a legitimate sender address in the From field, but set the Reply-To header to an attacker-controlled mailbox.',
        actionableRule: 'Check if the Reply-To domain differs from the From domain before responding to sensitive requests.',
        level: 'Pro'
      },
      {
        title: 'Understand SPF, DKIM, and DMARC Results',
        description: 'Authentication headers indicate whether the sending mail server was authorized by the domain owner to send mail on their behalf.',
        actionableRule: 'Look for "spf=pass", "dkim=pass", and "dmarc=pass" in raw headers. A fail or softfail indicates potential spoofing.',
        level: 'Protocol'
      }
    ]
  },
  {
    id: 'tip-cat-2',
    title: 'URL & Domain Analysis',
    iconName: 'Globe',
    tips: [
      {
        title: 'Hover Before Clicking (Inspect the Destination)',
        description: 'The hyperlink text you see on the screen can say "https://portal.mycompany.com" while the actual href destination leads to an adversary server.',
        actionableRule: 'Always hover your mouse or long-press on mobile to inspect the full destination URL before navigating.',
        level: 'Essential'
      },
      {
        title: 'Detect Typosquatting and Character Swaps',
        description: 'Threat actors purchase domains with deliberate typos (e.g., rn vs m, 0 vs O, or misplaced hyphens like pay-pal-verify.com).',
        actionableRule: 'Read the root domain from right to left, starting from the Top Level Domain (.com, .io, .net).',
        level: 'Pro'
      },
      {
        title: 'Beware of Punycode and Homograph Attacks',
        description: 'Internationalized domain names (IDN) can use Cyrillic or Greek characters that look identical to Latin letters (e.g., "а" vs "a").',
        actionableRule: 'Look for domains starting with "xn--" which indicates Punycode conversion of non-Latin characters.',
        level: 'Protocol'
      }
    ]
  },
  {
    id: 'tip-cat-3',
    title: 'Psychological Triggers & Social Engineering',
    iconName: 'ShieldAlert',
    tips: [
      {
        title: 'Artificial Urgency & Fear of Negative Consequences',
        description: 'Phishing lures often threaten account deactivation within 24 hours, missed payroll, or legal action to bypass critical thinking.',
        actionableRule: 'When an email induces panic or extreme urgency, pause for 5 minutes and verify through independent communication.',
        level: 'Essential'
      },
      {
        title: 'The "Authority Exemption" Trap',
        description: 'Scammers masquerading as executives will ask for secrecy or protocol bypass: "I am in a meeting, do not call me, just send the gift cards / transfer."',
        actionableRule: 'Never violate established security protocols for requests claiming executive authority.',
        level: 'Pro'
      },
      {
        title: 'Curiosity & Too-Good-To-Be-True Baits',
        description: 'Promised bonuses, unexpected package deliveries, or confidential salary review spreadsheets are common malware delivery lures.',
        actionableRule: 'Verify unexpected attachments by contacting the claimed sender through internal chat or phone.',
        level: 'Essential'
      }
    ]
  },
  {
    id: 'tip-cat-4',
    title: 'Incident Response & Reporting Rules',
    iconName: 'BellRing',
    tips: [
      {
        title: 'Report, Do Not Just Delete',
        description: 'Deleting a phishing email protects you, but reporting it allows your SOC team to block the campaign across the entire enterprise.',
        actionableRule: 'Use your email client’s official "Report Phishing" button or forward to the designated security team mailbox.',
        level: 'Essential'
      },
      {
        title: 'Immediate Remediation If You Clicked',
        description: 'If you clicked a link and entered credentials, immediate notification minimizes the attacker’s window of opportunity.',
        actionableRule: 'Change passwords immediately from an isolated clean device, revoke active sessions, and notify IT Security.',
        level: 'Pro'
      }
    ]
  }
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'q1',
    title: 'Sender Address Inspection',
    category: 'Header Analysis',
    difficulty: 'Easy',
    scenario: 'You receive an email with the display name "IT Support Desk <it-support@m1crosoft-security.net>" demanding you update your Office365 password immediately.',
    options: [
      'Click the password update link because the display name says IT Support Desk',
      'Inspect the domain "m1crosoft-security.net" and recognize it as a typosquatted, non-official domain',
      'Forward the email to all colleagues to test if their accounts also need updating',
      'Reply to the email asking if it is legitimate'
    ],
    explanation: 'The domain m1crosoft-security.net uses character substitution (1 for i) and is an unauthorized domain. Legitimate Microsoft communications come from official domains like microsoft.com.',
    hint: 'Look closely at the characters in the domain name after the @ symbol.'
  },
  {
    id: 'q2',
    title: 'Urgent Wire Transfer Request',
    category: 'Business Email Compromise',
    difficulty: 'Medium',
    scenario: 'You work in Accounts Payable. You receive an email from the CEO saying: "I am in a closed-door meeting and need you to execute a confidential wire transfer of $75,000 to vendor AlphaTech right away. Do not call me, reply here."',
    options: [
      'Process the wire transfer immediately to avoid upsetting the executive',
      'Reply with company banking credentials so the CEO can complete it directly',
      'Follow standard out-of-band verification procedure by calling the CEO or CFO on a known internal number before processing',
      'Transfer half the amount to mitigate risk'
    ],
    explanation: 'This is a textbook Business Email Compromise (BEC) scenario featuring artificial urgency, authority pressure, and an explicit instruction to avoid out-of-band verification.',
    hint: 'Protocols for financial transactions must always require secondary verification regardless of claimed authority.'
  },
  {
    id: 'q3',
    title: 'QR Code in PDF Invoice',
    category: 'Quishing',
    difficulty: 'Medium',
    scenario: 'You open a PDF attachment labeled "Vendor_Invoice_9821.pdf". Inside is a large QR code with the instructions: "Scan with your personal phone camera to complete multi-factor authentication to view this document."',
    options: [
      'Scan the QR code on your personal device since mobile devices are immune to malware',
      'Refuse to scan the QR code and report the email because QR codes in documents frequently bypass email gateway scanners and route to AitM phishing portals',
      'Print the PDF and share it with teammates to see if their phones can open it',
      'Scan the QR code using a public scanner app'
    ],
    explanation: 'Quishing (QR Phishing) lures users to switch from secured corporate workstations to mobile devices where endpoint protection and link inspection are often less rigorous.',
    hint: 'Why would a standard invoice require scanning a QR code with a personal mobile device?'
  },
  {
    id: 'q4',
    title: 'Reverse Proxy & Session Interception',
    category: 'Advanced Threats',
    difficulty: 'Hard',
    scenario: 'An attacker sets up an Adversary-in-the-Middle (AitM) proxy (e.g. Evilginx). Which form of Multi-Factor Authentication provides the highest cryptographic protection against session token theft through this proxy?',
    options: [
      'SMS text message 6-digit verification code',
      'Time-based One-Time Password (TOTP) from an authenticator app',
      'FIDO2 / WebAuthn hardware security key with origin binding',
      'Email-based verification magic link'
    ],
    explanation: 'FIDO2 / WebAuthn keys bind the cryptographic challenge directly to the verified browser domain (origin). If the browser is on evil-domain.com, the token will not match what the genuine identity provider expects.',
    hint: 'Look for the authentication protocol that relies on cryptographic domain/origin binding.'
  }
];
