import { AcademyModule } from '../types';

export const ACADEMY_MODULES_FULL: AcademyModule[] = [
  {
    id: 'mod-1',
    title: 'What is Phishing? Foundations & Threat Taxonomy',
    category: 'Foundations',
    level: 'Beginner',
    duration: '25 min',
    lessonsCount: 3,
    description: 'Understand the fundamental architecture of phishing, how social engineering manipulates human trust, and the modern taxonomy from bulk spam to targeted spear phishing.',
    tagline: 'Deconstruct the world’s #1 initial access vector and modern attack lifecycle.',
    iconName: 'GraduationCap',
    keyConcepts: ['Social Engineering Core', 'The 4-Stage Attack Lifecycle', 'Spear Phishing vs Bulk Phishing', 'Initial Access Brokering'],
    status: 'available',
    overview: 'Phishing is not merely spam; it is a form of cognitive hacking designed to deceive individuals into divulging sensitive data, executing unauthorized payments, or downloading malware. Over 90% of all organizational cyber breaches begin with a phishing lure.',
    summaryTakeaways: [
      'Phishing targets the human cognitive layer rather than software vulnerabilities.',
      'Attacks follow a structured 4-stage lifecycle: Reconnaissance, Weaponization, Delivery, and Exploitation.',
      'Modern threat actors specialize: Initial Access Brokers (IABs) sell stolen credentials on dark web markets to ransomware syndicates.'
    ],
    lessons: [
      {
        id: 'les-1-1',
        title: '1.1 The Anatomy & Lifecycle of a Phishing Attack',
        duration: '8 min',
        summary: 'Explore why phishing remains the dominant attack vector and how threat actors execute attacks across four distinct phases.',
        sections: [
          {
            title: 'Why Threat Actors Target Humans',
            content: 'Modern enterprise networks deploy sophisticated firewalls, endpoint detection systems, and encrypted channels. Breaching these technical barriers directly requires expensive zero-day exploits. In contrast, manipulating an employee into clicking a link or providing their credentials requires only psychological coercion. Attackers recognize that humans are often the most accessible entry point into corporate infrastructure.',
            keyTakeaways: [
              'Technical defenses protect networks, but social engineering targets human psychology.',
              'A single compromised account can give adversaries initial access to an entire enterprise environment.'
            ]
          },
          {
            title: 'The 4-Stage Phishing Kill Chain',
            content: 'Phishing attacks follow a repeatable tactical sequence from initial intelligence gathering to final data exfiltration or financial theft.',
            exampleBox: {
              type: 'defense-steps',
              title: 'The 4 Stages of a Modern Phishing Campaign',
              steps: [
                {
                  step: 1,
                  title: 'Phase 1: Reconnaissance & OSINT',
                  desc: 'Adversaries gather public information from LinkedIn, company press releases, GitHub repositories, and social media to map out reporting hierarchies, software vendors, and employee names.'
                },
                {
                  step: 2,
                  title: 'Phase 2: Weaponization & Infrastructure Setup',
                  desc: 'The attacker registers typosquatted lookalike domains (e.g., cornpany.com), configures email delivery servers with valid SPF/DKIM records, and crafts pixel-perfect bait templates.'
                },
                {
                  step: 3,
                  title: 'Phase 3: Delivery & Psychological Triggering',
                  desc: 'Lures are dispatched using spoofed identities, urgent subject lines (e.g., "Immediate Action Required: Payroll Discrepancy"), and embedded malicious hyperlinks or attachments.'
                },
                {
                  step: 4,
                  title: 'Phase 4: Exploitation & Account Takeover',
                  desc: 'The victim clicks the link, enters credentials into a cloned portal, or downloads an executable payload. The attacker harvests the session tokens or establishes persistent lateral movement.'
                }
              ]
            },
            keyTakeaways: [
              'Attacks begin long before an email lands in your inbox.',
              'Interrupting any of the four stages halts the compromise completely.'
            ]
          }
        ],
        checkpointQuestion: {
          question: 'Why do sophisticated threat actors frequently choose phishing over direct network penetration?',
          options: [
            'Because modern networks lack firewalls or encryption mechanisms',
            'Because human cognitive manipulation is significantly cheaper and more reliable than developing expensive zero-day software exploits',
            'Because phishing only works during standard business hours',
            'Because email protocols cannot be monitored by security tools'
          ],
          correctIndex: 1,
          explanation: 'Social engineering exploits psychological biases (trust, urgency, fear), making it far more cost-effective for attackers than discovering zero-day vulnerabilities in hardened software.'
        }
      },
      {
        id: 'les-1-2',
        title: '1.2 The Phishing Taxonomy: From Bulk Spam to Quishing',
        duration: '9 min',
        summary: 'Differentiate between broad spray-and-pray campaigns and targeted attacks such as Spear Phishing, Whaling, Smishing, and Quishing.',
        sections: [
          {
            title: 'Understanding the Spectrum of Phishing Vectors',
            content: 'Phishing has evolved from generic "Nigerian Prince" spam into diverse, highly specialized attack types tailored to specific targets and communication channels.',
            exampleBox: {
              type: 'red-flags',
              title: 'The Primary Phishing Variants',
              items: [
                {
                  label: 'Bulk Phishing',
                  value: 'Spray-and-pray emails sent to millions simultaneously (e.g., fake Amazon delivery or Netflix payment failure). High volume, lower sophistication.'
                },
                {
                  label: 'Spear Phishing',
                  value: 'Customized attacks targeting specific individuals or organizations, referencing real names, projects, or vendors discovered via OSINT.'
                },
                {
                  label: 'Whaling & BEC',
                  value: 'Business Email Compromise targeting senior executives (CFOs, CEOs) or finance staff to authorize high-value fraudulent wire transfers.'
                },
                {
                  label: 'Smishing (SMS)',
                  value: 'Phishing delivered via SMS/text messages, often impersonating postal carriers, banks, or corporate IT 2FA alerts.'
                },
                {
                  label: 'Vishing (Voice)',
                  value: 'Voice phone calls from scammers impersonating IT Helpdesk technicians, law enforcement, or executives (increasingly using AI voice synthesis).'
                },
                {
                  label: 'Quishing (QR Codes)',
                  value: 'Malicious QR codes embedded in emails or posters that redirect mobile devices to credential-harvesting landing pages, bypassing gateway URL filters.'
                }
              ]
            },
            keyTakeaways: [
              'Attacks are no longer confined to traditional desktop email clients.',
              'Targeted spear phishing and BEC account for the majority of severe financial losses.'
            ]
          }
        ],
        checkpointQuestion: {
          question: 'What distinguishes Spear Phishing from traditional Bulk Phishing?',
          options: [
            'Spear phishing uses only audio phone calls',
            'Spear phishing is tailored with personalized research (names, roles, internal projects) to target specific individuals',
            'Spear phishing is only sent by automated advertising companies',
            'Bulk phishing is always sent to executives'
          ],
          correctIndex: 1,
          explanation: 'Spear phishing utilizes open-source intelligence (OSINT) to personalize the lure specifically to the victim’s job role, recent company events, or vendor relationships.'
        }
      },
      {
        id: 'les-1-3',
        title: '1.3 The Threat Ecosystem & Cybercrime Economics',
        duration: '8 min',
        summary: 'Understand the business model behind phishing: Initial Access Brokers, Phishing-as-a-Service (PaaS), and ransomware syndicates.',
        sections: [
          {
            title: 'The Industrialized Cybercrime Supply Chain',
            content: 'Phishing is rarely the work of a single lone actor. It is driven by an organized underground economy with specialized roles:\n\n1. **Phishing-as-a-Service (PaaS) Developers**: Create and sell turnkey phishing kits equipped with real-time proxy bypasses.\n2. **Initial Access Brokers (IABs)**: Specialize solely in sending lures and stealing corporate credentials, which they package and sell on dark web forums.\n3. **Ransomware Operators**: Purchase these verified enterprise credentials from IABs to deploy ransomware and exfiltrate corporate databases.',
            keyTakeaways: [
              'Phishing kits are commercially packaged and rented on dark web marketplaces for as little as $50/month.',
              'Your compromised credentials are often resold within hours to specialized extortion groups.'
            ]
          }
        ],
        checkpointQuestion: {
          question: 'What is the primary role of an Initial Access Broker (IAB) in the cybercrime ecosystem?',
          options: [
            'To fix software vulnerabilities in enterprise codebases',
            'To breach corporate accounts via phishing and sell those authenticated access credentials to ransomware gangs',
            'To provide customer support for legitimate software',
            'To write legal terms of service for phishing tools'
          ],
          correctIndex: 1,
          explanation: 'Initial Access Brokers specialize in gaining footholds via phishing and credential harvesting, then selling that enterprise access to ransomware groups.'
        }
      }
    ]
  },
  {
    id: 'mod-2',
    title: 'Suspicious Email Indicators (The Red Flag Matrix)',
    category: 'Email Red Flags',
    level: 'Beginner',
    duration: '30 min',
    lessonsCount: 4,
    description: 'Master the technical and visual red flags in suspicious communications: sender spoofing, Reply-To mismatches, authentication headers, and high-risk attachment types.',
    tagline: 'Learn to spot subtle email anomalies before clicking.',
    iconName: 'Mail',
    keyConcepts: ['Envelope vs Display Name Spoofing', 'Reply-To Rerouting', 'SPF/DKIM/DMARC Headers', 'Dangerous File Extensions'],
    status: 'available',
    overview: 'Attackers manipulate email presentation layers to deceive recipients. While an email might appear to arrive from "Microsoft Support" or your CEO, examining the raw metadata and language patterns reveals telltale discrepancies.',
    summaryTakeaways: [
      'Always inspect the sender email address inside the angle brackets <>, not just the friendly display name.',
      'Check if the Reply-To header diverts your message to an external, unrelated domain.',
      'Never open attachments with double extensions (.pdf.exe), disk images (.iso), or script files (.vbs, .js).'
    ],
    lessons: [
      {
        id: 'les-2-1',
        title: '2.1 Display Name Spoofing vs Envelope Sender',
        duration: '7 min',
        summary: 'Deconstruct how attackers manipulate friendly display names to disguise illegitimate sender domains.',
        sections: [
          {
            title: 'The Display Name Mirage',
            content: 'Email clients display a "Friendly Name" prominently (e.g., "CEO John Smith" or "IT Security Alert"). Attackers configure arbitrary display names in their email client headers. The true technical sender address is hidden inside the angle brackets `<>` or in the message envelope.',
            exampleBox: {
              type: 'email-breakdown',
              title: 'Anatomy of a Display Name Spoof',
              items: [
                {
                  label: 'Display Name (What you see)',
                  value: '"Microsoft 365 Security Team"',
                  annotation: 'Completely arbitrary; set by the sender without verification',
                  isSuspicious: false
                },
                {
                  label: 'Actual Email Address (In Angle Brackets)',
                  value: '<alert-admin@m1crosoft-auth-portal.net>',
                  annotation: 'Typosquatted domain (1 instead of i) hosted on adversary infrastructure',
                  isSuspicious: true
                },
                {
                  label: 'Subject Line',
                  value: 'CRITICAL: Account suspension scheduled in 2 hours',
                  annotation: 'High-pressure emotional trigger designed to bypass critical inspection',
                  isSuspicious: true
                }
              ]
            },
            keyTakeaways: [
              'Email clients prioritize showing display names, making it easy for attackers to masquerade as trusted entities.',
              'Always tap or hover over the sender name to reveal the full email address between `<>`.'
            ]
          }
        ],
        checkpointQuestion: {
          question: 'If you receive an email with the display name "Internal IT Help Desk <support@it-security-portal.co>", what is the most critical element to check?',
          options: [
            'Whether the display name uses proper capitalization',
            'The domain after the @ symbol (it-security-portal.co) to verify if it matches your official corporate domain',
            'The font size used in the subject line',
            'The time of day the email arrived'
          ],
          correctIndex: 1,
          explanation: 'The friendly display name can be easily faked; the true domain after the @ symbol reveals whether the message originated from your organization’s authorized servers.'
        }
      },
      {
        id: 'les-2-2',
        title: '2.2 The Reply-To Trap & Email Authentication (SPF, DKIM, DMARC)',
        duration: '8 min',
        summary: 'Learn how Reply-To rerouting functions and how SPF, DKIM, and DMARC headers protect email integrity.',
        sections: [
          {
            title: 'Reply-To Header Diversion',
            content: 'An attacker might forge a genuine From address (e.g., `ceo@company.com`). However, because they do not control the CEO’s inbox, they inject a hidden `Reply-To:` header pointing to their own webmail account (e.g., `ceo-secret-inbox@gmail.com`). When you hit "Reply", your email silently routes to the adversary.',
            exampleBox: {
              type: 'login-comparison',
              title: 'Header Comparison: Legitimate vs Compromised',
              legitimateVsMalicious: {
                legitimate: {
                  label: 'Legitimate Corporate Header',
                  details: 'From and Reply-To match the authenticated corporate domain.',
                  code: 'From: Sarah Connor <sarah@acme-corp.com>\nReply-To: sarah@acme-corp.com\nAuthentication-Results: spf=pass dkim=pass dmarc=pass'
                },
                malicious: {
                  label: 'Phishing Lure with Reply-To Divert',
                  details: 'From field is spoofed; Reply-To routes replies to an external attacker.',
                  code: 'From: Sarah Connor <sarah@acme-corp.com>\nReply-To: sarah-finance-replies@outlook.com\nAuthentication-Results: spf=softfail dmarc=fail'
                }
              }
            },
            keyTakeaways: [
              'When replying to sensitive requests, check the recipient field in your draft to confirm it matches the claimed sender.',
              'SPF checks the sender IP, DKIM provides cryptographic signatures, and DMARC instructs receiving servers how to handle failures.'
            ]
          }
        ],
        checkpointQuestion: {
          question: 'What is the purpose of an attacker specifying a separate Reply-To header in a phishing email?',
          options: [
            'To encrypt the email body with TLS',
            'To ensure that when the victim clicks Reply, the response routes to the attacker’s inbox rather than the spoofed sender',
            'To make the email download faster',
            'To bypass password requirements on the victim’s workstation'
          ],
          correctIndex: 1,
          explanation: 'The Reply-To header redirects victim responses to the attacker’s address, even if the From address was spoofed to show a legitimate colleague.'
        }
      },
      {
        id: 'les-2-3',
        title: '2.3 Dangerous Attachments & Payload Delivery',
        duration: '8 min',
        summary: 'Recognize risky file extensions, macro-enabled documents, archive wrappers, and disk image delivery tactics.',
        sections: [
          {
            title: 'How Attackers Disguise Malicious Files',
            content: 'Attackers rarely send raw `.exe` files because modern mail gateways block them automatically. Instead, they use evasive packaging formats:\n\n* **Double Extensions**: E.g., `Q3_Invoice.pdf.exe` (Windows often hides the trailing `.exe` if "Hide known extensions" is enabled).\n* **Disk Images (.iso, .img, .vhd)**: Disk image files mount like a virtual flash drive and bypass Windows Mark-of-the-Web (MOTW) security flags.\n* **Password-Protected Archives (.zip, .7z)**: Attackers include the password in the email body so antivirus scanners cannot inspect the contents.\n* **Macro-Enabled Documents (.docm, .xlsm)**: Prompt users to "Enable Editing" or "Enable Macros" to execute malicious Visual Basic scripts.',
            exampleBox: {
              type: 'red-flags',
              title: 'High-Risk File Extension Cheat Sheet',
              items: [
                { label: '.iso / .img', value: 'Disk images used to package malware and evade sandbox scanners.', isSuspicious: true },
                { label: '.xlsm / .docm', value: 'Office documents with executable VBA macros. Never enable macros from external senders.', isSuspicious: true },
                { label: '.vbs / .js / .bat / .ps1', value: 'Executable script files that run native code on your operating system.', isSuspicious: true },
                { label: '.one / .onepkg', value: 'OneNote files embedding hidden batch scripts behind clickable graphic buttons.', isSuspicious: true }
              ]
            },
            keyTakeaways: [
              'Legitimate vendors rarely send invoices as .iso disk images or macro-enabled documents.',
              'Never click "Enable Content" or "Enable Macros" on unexpected documents received via email.'
            ]
          }
        ],
        checkpointQuestion: {
          question: 'Why do attackers frequently distribute malware inside password-protected ZIP files or ISO disk images?',
          options: [
            'Because ZIP files cannot carry executable code',
            'To prevent automated email security gateways and sandbox scanners from analyzing the payload before delivery',
            'Because modern operating systems require all files to be zipped',
            'To save bandwidth on the mail server'
          ],
          correctIndex: 1,
          explanation: 'Password protection and disk image packaging prevent automated gateway filters from inspecting and detonating the malicious files.'
        }
      },
      {
        id: 'les-2-4',
        title: '2.4 Stylistic, Contextual & Psychological Red Flags',
        duration: '7 min',
        summary: 'Spot subtle contextual inconsistencies: artificial urgency, abnormal formatting, generic greetings, and unusual channel requests.',
        sections: [
          {
            title: 'Reading Between the Lines',
            content: 'Beyond technical headers, phishing emails exhibit distinct behavioral anomalies:\n\n* **Artificial Urgency & Ultimatums**: "Within 1 hour", "Immediate action mandatory", "Avoid legal penalty".\n* **Bypassing Normal Channels**: "I am in a meeting, do not call me, communicate only via this email".\n* **Generic or Mismatched Salutations**: "Dear Valued Customer" or "Dear Employee" when communicating with an internal team.\n* **Unusual Requests for Position**: An executive asking a junior accountant to buy gift cards or bypass wire authorization procedures.',
            keyTakeaways: [
              'Panic is the attacker’s greatest tool. Extreme urgency is designed to disable critical thinking.',
              'Any request asking you to disregard established standard operating procedures (SOPs) is a major red flag.'
            ]
          }
        ],
        checkpointQuestion: {
          question: 'What is the most effective immediate action when you receive an email from a supervisor demanding an urgent protocol bypass?',
          options: [
            'Comply immediately so your supervisor is not disappointed',
            'Perform an Out-of-Band verification by contacting the supervisor via phone, internal chat, or in-person before taking action',
            'Forward the email to the entire company',
            'Delete the email and ignore all future emails from the supervisor'
          ],
          correctIndex: 1,
          explanation: 'Verifying through a trusted, independent secondary channel (Out-of-Band) confirms whether the request is authentic without relying on the potentially compromised email chain.'
        }
      }
    ]
  },
  {
    id: 'mod-3',
    title: 'Fake Login Pages & Credential Harvesting',
    category: 'Credential Harvesting',
    level: 'Intermediate',
    duration: '35 min',
    lessonsCount: 4,
    description: 'Deconstruct how attackers clone single sign-on (SSO) portals, deploy real-time Adversary-in-the-Middle (AitM) reverse proxies (Evilginx), intercept 2FA tokens, and how FIDO2 WebAuthn stops them.',
    tagline: 'Understand how modern phishing captures passwords and MFA sessions.',
    iconName: 'Key',
    keyConcepts: ['Adversary-in-the-Middle (AitM)', 'Session Cookie Interception', 'Browser-in-the-Browser (BitB)', 'FIDO2 / WebAuthn Defense'],
    status: 'available',
    overview: 'Credential harvesting has evolved far beyond static fake login pages. Attackers now deploy dynamic reverse proxies that sit between the victim and legitimate services like Microsoft 365 or Google Workspace, intercepting passwords, TOTP codes, and authenticated session cookies in real time.',
    summaryTakeaways: [
      'Modern AitM proxies relay traffic to legitimate identity providers in real time, making SMS and TOTP codes vulnerable to relay theft.',
      'Check the browser address bar for the exact root domain before submitting credentials.',
      'FIDO2 / WebAuthn security keys and Passkeys provide cryptographic protection against AitM proxies through origin binding.'
    ],
    lessons: [
      {
        id: 'les-3-1',
        title: '3.1 How Attackers Clone Enterprise Login Portals',
        duration: '8 min',
        summary: 'Understand the mechanics of cloned login pages, automated branding scrapers, and lookalike SSO portals.',
        sections: [
          {
            title: 'Pixel-Perfect Visual Replicas',
            content: 'Attackers use open-source phishing frameworks (such as GoPhish or Modlishka) to automatically scrape logos, backgrounds, and styling from target corporate portals. When a user lands on the fake page, it appears indistinguishable from the authentic Microsoft 365, Google Workspace, or Okta login page. The only telltale distinction is the URL in the browser address bar.',
            exampleBox: {
              type: 'login-comparison',
              title: 'Visual Comparison: Legitimate Portal vs Phishing Clone',
              legitimateVsMalicious: {
                legitimate: {
                  label: 'Authentic Microsoft 365 Login',
                  details: 'Hosted on official, authenticated Microsoft infrastructure.',
                  code: 'https://login.microsoftonline.com/common/oauth2/authorize'
                },
                malicious: {
                  label: 'Cloned Phishing Landing Page',
                  details: 'Hosted on adversary server with lookalike subdomain.',
                  code: 'https://login.microsoftonline.com.auth-secure-verify.net/login'
                }
              }
            },
            keyTakeaways: [
              'Never trust a login page based on its visual branding, corporate logo, or clean styling.',
              'The address bar domain is the single authoritative source of truth for website identity.'
            ]
          }
        ],
        checkpointQuestion: {
          question: 'Why is visual inspection of logos and layout insufficient to verify a login page’s legitimacy?',
          options: [
            'Because modern browsers automatically redesign every website',
            'Because attackers can easily scrape and mirror genuine HTML, CSS, and corporate imagery with 100% fidelity',
            'Because legitimate login pages never use company logos',
            'Because login pages cannot be rendered on mobile screens'
          ],
          correctIndex: 1,
          explanation: 'Attackers easily replicate genuine front-end code and assets. Only the URL in the browser address bar reveals where your data will actually be submitted.'
        }
      },
      {
        id: 'les-3-2',
        title: '3.2 Adversary-in-the-Middle (AitM) Proxies & Session Cookie Theft',
        duration: '10 min',
        summary: 'Deconstruct how reverse proxy toolkits (e.g., Evilginx) intercept Multi-Factor Authentication (MFA) codes and session cookies.',
        sections: [
          {
            title: 'The Fall of Traditional 2FA Interception',
            content: 'Many users believe Multi-Factor Authentication (MFA) makes them immune to phishing. However, **Adversary-in-the-Middle (AitM)** proxies act as a live bridge between the user and the real authentication server:\n\n1. The victim visits `attacker-proxy.com`.\n2. The proxy fetches the real login page from `login.microsoftonline.com` and displays it to the victim.\n3. The victim enters their username, password, and 6-digit authenticator code (TOTP/SMS).\n4. The proxy forwards these credentials to the real server.\n5. The real server accepts the login and issues an **authenticated session cookie** (e.g., `ESTSAUTH`).\n6. The proxy intercepts and steals the session cookie before passing it to the victim.\n\nWith this session cookie, the attacker can access the victim’s account indefinitely without ever needing the password or 2FA again.',
            exampleBox: {
              type: 'defense-steps',
              title: 'The AitM Proxy Attack Flow',
              steps: [
                { step: 1, title: 'Victim clicks link', desc: 'Victim navigates to evil-proxy.com masquerading as company login.' },
                { step: 2, title: 'Real-time proxy relay', desc: 'Proxy requests genuine login challenge from legitimate identity provider.' },
                { step: 3, title: 'Victim inputs credentials & MFA', desc: 'Victim enters password and One-Time Code, which proxy relays immediately to the real server.' },
                { step: 4, title: 'Session cookie captured', desc: 'Real server issues auth token/cookie; proxy clones and stores it, granting full unauthorized access.' }
              ]
            },
            keyTakeaways: [
              'SMS codes, voice calls, and standard 6-digit TOTP app codes can all be intercepted by AitM proxies.',
              'The true target of modern credential harvesting is the authenticated session cookie.'
            ]
          }
        ],
        checkpointQuestion: {
          question: 'What is the primary asset an Adversary-in-the-Middle (AitM) phishing framework steals from a successful login?',
          options: [
            'The victim’s operating system license key',
            'The authenticated session token / cookie, allowing persistent account access without needing 2FA again',
            'The computer’s monitor refresh rate',
            'The local Wi-Fi router password'
          ],
          correctIndex: 1,
          explanation: 'AitM proxies intercept the valid session cookie returned by the authentic identity provider, bypassing subsequent password and MFA prompts.'
        }
      },
      {
        id: 'les-3-3',
        title: '3.3 Browser-in-the-Browser (BitB) Attacks',
        duration: '8 min',
        summary: 'Learn how attackers simulate realistic browser popups and OAuth single sign-on windows using HTML/CSS.',
        sections: [
          {
            title: 'Simulating Fake Browser Chrome',
            content: 'When logging into websites using "Sign in with Google" or "Sign in with Microsoft", a separate popup window normally appears. In a **Browser-in-the-Browser (BitB)** attack, the adversary uses HTML and JavaScript to render a fake browser window inside the existing webpage. This simulated window includes a fake URL address bar showing `https://accounts.google.com` and a fake SSL lock icon.\n\n**How to spot BitB attacks**:\n* Try to drag the popup window outside the boundaries of your browser tab. A real popup moves freely anywhere on your screen; a BitB fake is trapped inside the webpage content area.\n* Inspect the URL with a password manager: Password managers will refuse to autofill because they detect the parent page domain.'
            ,
            keyTakeaways: [
              'A fake popup rendered inside HTML cannot be dragged outside the boundary of the parent browser viewport.',
              'Password managers inspect true DOM origins and will not autofill into BitB fake windows.'
            ]
          }
        ],
        checkpointQuestion: {
          question: 'How can you quickly test if a "Sign in with Google" popup window is a Browser-in-the-Browser (BitB) simulated element?',
          options: [
            'Close your eyes for 10 seconds',
            'Attempt to drag the popup window outside the main browser viewport—if it cannot leave the webpage boundaries, it is a simulated HTML element',
            'Unplug your keyboard',
            'Turn down your monitor brightness'
          ],
          correctIndex: 1,
          explanation: 'Real OS browser windows can be dragged across screens and outside the browser window; BitB simulations are constrained within the parent webpage HTML canvas.'
        }
      },
      {
        id: 'les-3-4',
        title: '3.4 Cryptographic Defense: FIDO2, WebAuthn & Passkeys',
        duration: '9 min',
        summary: 'Explore why FIDO2 WebAuthn hardware keys and Passkeys provide true phishing-resistant authentication.',
        sections: [
          {
            title: 'The Power of Origin Binding',
            content: 'FIDO2 / WebAuthn standards (such as YubiKeys, Windows Hello, and Passkeys) are fundamentally **phishing-resistant** due to cryptographic **Origin Binding**.\n\nWhen a FIDO2 token signs an authentication challenge, it cryptographically embeds the exact domain name from the browser address bar into the signature:\n* If you are on `login.microsoftonline.com`, your security key signs the challenge for `login.microsoftonline.com`.\n* If an AitM proxy tricks you into visiting `evil-proxy.com`, your security key signs the challenge for `evil-proxy.com`.\n* When the proxy forwards this signature to the real Microsoft server, Microsoft immediately rejects it because the origin does not match!',
            keyTakeaways: [
              'FIDO2 / WebAuthn is the only authentication standard mathematically immune to credential relay proxies.',
              'Upgrading to hardware keys or passkeys eliminates the threat of AitM phishing.'
            ]
          }
        ],
        checkpointQuestion: {
          question: 'Why are FIDO2 / WebAuthn hardware security keys immune to Adversary-in-the-Middle (AitM) proxy attacks?',
          options: [
            'Because they require an internet connection to function',
            'Because the cryptographic signature is bound to the exact browser URL origin, causing the legitimate server to reject tokens signed for an attacker’s proxy domain',
            'Because they automatically scan incoming emails for viruses',
            'Because they only work with desktop computers'
          ],
          correctIndex: 1,
          explanation: 'Origin binding ensures that even if a proxy relays the signature, the cryptographic proof contains the attacker’s domain, which the legitimate identity provider rejects.'
        }
      }
    ]
  },
  {
    id: 'mod-4',
    title: 'Fraudulent Websites & Domain Spoofing',
    category: 'Domain Spoofing',
    level: 'Intermediate',
    duration: '30 min',
    lessonsCount: 4,
    description: 'Learn the anatomy of web URLs, typosquatting variants, subdomain nesting deception, IDN homograph / Punycode attacks, and debunk the SSL padlock myth.',
    tagline: 'Deconstruct how attackers manipulate web addresses to trick your eyes.',
    iconName: 'Globe',
    keyConcepts: ['URL Anatomy & Root Domains', 'Typosquatting & Combosquatting', 'IDN Homographs & Punycode (xn--)', 'The SSL Padlock Fallacy'],
    status: 'available',
    overview: 'URLs are the foundation of internet navigation, yet most users only glance at the beginning or end of a web address. Attackers exploit this cognitive blind spot using typosquatting, deceptive subdomains, and foreign character lookalikes.',
    summaryTakeaways: [
      'Read URLs backwards: start at the Top-Level Domain (.com, .org) and move left to identify the true root domain.',
      'A valid SSL lock icon (HTTPS) only means the connection is encrypted, NOT that the website is legitimate.',
      'Watch out for Punycode domains beginning with `xn--`, which indicate non-Latin international character substitutions.'
    ],
    lessons: [
      {
        id: 'les-4-1',
        title: '4.1 Anatomy of a URL & The "Read Backwards" Rule',
        duration: '7 min',
        summary: 'Deconstruct URL components: Protocol, Subdomain, Root Domain, TLD, Path, and Parameters.',
        sections: [
          {
            title: 'Dissecting a Web Address',
            content: 'To determine who owns a website, you must identify the **Root Domain**. Consider this address:\n\n`https://portal.microsoft.com.auth-security-update.net/login?session=982`\n\n* **Protocol**: `https://`\n* **Subdomain**: `portal.microsoft.com.` (Attackers can create any subdomain they want!)\n* **Root Domain & TLD**: `auth-security-update.net` (**This is the actual owner!**)\n* **Path**: `/login`\n\n**The Golden Rule**: Start at the first single forward slash (`/`), move left to find the domain extension (`.com`, `.net`, `.io`), and take the word immediately to the left of that dot. That is the true domain owner.',
            exampleBox: {
              type: 'url-breakdown',
              title: 'URL Deconstruction Anatomy',
              items: [
                { label: 'Deceptive Subdomain (Faked)', value: 'login.bankofamerica.com', annotation: 'Designed to fool people glancing at the beginning of the URL', isSuspicious: false },
                { label: 'Real Root Domain (Attacker)', value: '.account-verification-alert.com', annotation: 'The true server host controlling this page', isSuspicious: true },
                { label: 'Path & Query Payload', value: '/secure/login.php?ref=email', annotation: 'Destination path on the attacker’s web server', isSuspicious: false }
              ]
            },
            keyTakeaways: [
              'Never judge a website’s identity by the first words after `https://`.',
              'The true owner is determined by the root domain immediately preceding the Top-Level Domain.'
            ]
          }
        ],
        checkpointQuestion: {
          question: 'In the URL "https://paypal.com.account-update-login.org/index.html", who is the actual owner of the website?',
          options: [
            'PayPal Inc.',
            'account-update-login.org (an external third-party domain)',
            'The Google Chrome browser',
            'index.html'
          ],
          correctIndex: 1,
          explanation: 'The root domain preceding the TLD (.org) is "account-update-login.org". "paypal.com" is merely a deceptive subdomain configured by the domain owner.'
        }
      },
      {
        id: 'les-4-2',
        title: '4.2 Typosquatting, Combosquatting & Lookalike Domains',
        duration: '8 min',
        summary: 'Identify character swaps, omitted letters, keyboard proximity typos, and brand-keyword combinations.',
        sections: [
          {
            title: 'Deceptive Domain Strategies',
            content: 'Attackers register lookalike domains that mimic trusted brands through several techniques:\n\n* **Typosquatting (Character Swaps)**: `rn` instead of `m` (`arnazon.com` vs `amazon.com`), or `0` for `O` (`g00gle.com`).\n* **Combosquatting (Keyword Addition)**: Appending words like `-login`, `-security`, `-portal`, or `-verify` (`chase-secure-login.com`).\n* **TLD Swapping**: Registering `.co`, `.cm`, or `.security` instead of the genuine `.com` (`apple.cm`).',
            exampleBox: {
              type: 'red-flags',
              title: 'Common Deceptive Domain Patterns',
              items: [
                { label: 'Character Transposition', value: 'microsfot.com / goggle.com', isSuspicious: true },
                { label: 'Visual Glyph Substitution', value: 'cornpany.com (rn = m) / paypaI.com (capital i = l)', isSuspicious: true },
                { label: 'Keyword Pairing', value: 'okta-sso-login.net / docusign-document-view.com', isSuspicious: true }
              ]
            },
            keyTakeaways: [
              'Watch for visual letter blending like "rn" masquerading as "m".',
              'Legitimate companies host services on their own primary domains rather than registering hyphenated third-party sites.'
            ]
          }
        ],
        checkpointQuestion: {
          question: 'What type of domain spoofing is being used in "paypaI.com" (where the final letter is a capital "i" rather than a lowercase "L")?',
          options: [
            'Visual glyph substitution / typosquatting',
            'SQL Injection',
            'Cross-Site Scripting (XSS)',
            'Buffer overflow'
          ],
          correctIndex: 0,
          explanation: 'Visual glyph substitution replaces visually similar characters (such as uppercase "I" and lowercase "l") to deceive the eye.'
        }
      },
      {
        id: 'les-4-3',
        title: '4.3 Homograph & Punycode (xn--) Attacks',
        duration: '7 min',
        summary: 'Understand how non-Latin Internationalized Domain Names (IDN) create visually identical fake domains.',
        sections: [
          {
            title: 'Cyrillic & Unicode Lookalikes',
            content: 'The Domain Name System supports international character sets (Cyrillic, Greek, Arabic). However, some foreign characters look identical to standard Latin letters. For example, the Cyrillic letter "а" (U+0430) is indistinguishable to the human eye from the Latin letter "a" (U+0061).\n\nWhen a browser displays a domain containing mixed or international characters, it translates it to **Punycode**, which always begins with the prefix `xn--`.\n\n* Visual representation: `apple.com` (using Cyrillic `а`)\n* Actual technical URL: `https://xn--pple-43d.com`',
            keyTakeaways: [
              'If you ever see a domain starting with `xn--` in your address bar or email headers, treat it with extreme suspicion.',
              'Modern browsers attempt to flag homographs by displaying the raw Punycode string.'
            ]
          }
        ],
        checkpointQuestion: {
          question: 'What does the prefix "xn--" at the beginning of a domain in your browser address bar indicate?',
          options: [
            'That the website is encrypted by the government',
            'That the domain uses Punycode to represent non-Latin internationalized characters (IDN), possibly indicating a homograph attack',
            'That the website has an active SSL certificate',
            'That the domain is hosted on high-speed servers'
          ],
          correctIndex: 1,
          explanation: 'The `xn--` prefix indicates an Internationalized Domain Name (IDN) converted to ASCII Punycode, often used in homograph spoofing.'
        }
      },
      {
        id: 'les-4-4',
        title: '4.4 The SSL Padlock Fallacy (HTTPS Does Not Mean Safe)',
        duration: '8 min',
        summary: 'Debunk the common misconception that the browser padlock or HTTPS implies a legitimate, safe website.',
        sections: [
          {
            title: 'Why Padlocks Only Prove Encryption, Not Trust',
            content: 'For years, users were told: "Look for the green padlock before entering your password." **This advice is now obsolete and dangerous.**\n\n* **What HTTPS actually means**: Traffic between your browser and the web server is encrypted and cannot be intercepted by someone on the same Wi-Fi network.\n* **What HTTPS DOES NOT mean**: It does NOT mean the website is legitimate, trusted, or safe.\n\nOver **85% of all phishing websites today have valid SSL/TLS certificates and display the padlock icon** because automated certificate authorities (such as Let’s Encrypt) issue free certificates to any registered domain in seconds without verifying the owner’s intent.',
            keyTakeaways: [
              'The padlock icon means "encrypted connection", NOT "safe website".',
              'A phishing site with HTTPS is simply an encrypted phishing site.'
            ]
          }
        ],
        checkpointQuestion: {
          question: 'If a website displays a valid SSL padlock icon and uses HTTPS, can you be certain it is not a phishing site?',
          options: [
            'Yes, because certificate authorities thoroughly background-check every website owner',
            'No, because attackers easily obtain free SSL certificates for phishing domains; HTTPS only guarantees encryption, not legitimacy',
            'Yes, because phishing sites cannot obtain encryption certificates',
            'Yes, if the padlock is gray rather than green'
          ],
          correctIndex: 1,
          explanation: 'HTTPS only encrypts the transmission tunnel. Anyone can obtain a free SSL certificate for a malicious domain, so the padlock does not guarantee safety.'
        }
      }
    ]
  },
  {
    id: 'mod-5',
    title: 'Social Engineering & Psychological Manipulation',
    category: 'Social Engineering',
    level: 'Intermediate',
    duration: '35 min',
    lessonsCount: 4,
    description: 'Explore the psychological weapons of social engineering: authority coercion, artificial urgency, scarcity, curiosity traps, and modern MFA fatigue / push bombing.',
    tagline: 'Understand how attackers hack the human subconscious.',
    iconName: 'Users',
    keyConcepts: ['Cialdini’s 6 Principles of Influence', 'Executive Coercion & BEC Pretexts', 'MFA Fatigue & Push Bombing', 'Baiting & Curiosity Exploits'],
    status: 'available',
    overview: 'Social engineering is the art of manipulating people so they give up confidential information or bypass established security controls. Attackers systematically target specific human cognitive biases to trigger impulsive, emotional responses.',
    summaryTakeaways: [
      'Attackers leverage urgency, authority, fear, and curiosity to bypass logical evaluation.',
      'Never approve unexpected MFA push notifications on your phone—this is the hallmark of an MFA push bombing attack.',
      'Establish a culture where verifying requests through out-of-band channels is celebrated rather than discouraged.'
    ],
    lessons: [
      {
        id: 'les-5-1',
        title: '5.1 The 6 Psychological Levers of Social Engineering',
        duration: '9 min',
        summary: 'Discover how attackers apply Robert Cialdini’s core principles of influence to craft irresistible lures.',
        sections: [
          {
            title: 'The Cognitive Weapons',
            content: 'Attackers systematically exploit 6 core psychological triggers:\n\n1. **Authority**: Masquerading as executives, legal counsel, or law enforcement to demand compliance.\n2. **Urgency & Scarcity**: Imposing tight artificial deadlines ("Action required within 15 minutes") to prevent consultation.\n3. **Fear & Negative Consequences**: Threatening account termination, financial penalties, or reputational damage.\n4. **Greed & Opportunity**: Offering unexpected holiday bonuses, gift cards, or lottery payouts.\n5. **Curiosity**: Teasing confidential information (e.g., "Executive Salary Adjustments 2026.xlsx").\n6. **Helpfulness & Trust (Pretexting)**: Masquerading as an IT support technician trying to solve a network issue for you.',
            exampleBox: {
              type: 'social-scenario',
              title: 'Psychological Trigger Case Examples',
              items: [
                { label: 'Authority + Secrecy', value: '"I am in a confidential board meeting. I need you to purchase 10 Apple gift cards for client gifts immediately. Do not mention this to anyone."', isSuspicious: true },
                { label: 'Fear + Urgency', value: '"Your payroll deposit failed due to invalid tax documents. Update your profile within 2 hours or your paycheck will be withheld."', isSuspicious: true },
                { label: 'Curiosity + Greed', value: '"Attached is the revised 2026 company-wide bonus distribution and salary compensation grid."', isSuspicious: true }
              ]
            },
            keyTakeaways: [
              'When an email triggers a strong emotional response (fear, excitement, panic), pause immediately.',
              'High emotion is an indicator that your logical faculties are being intentionally bypassed.'
            ]
          }
        ],
        checkpointQuestion: {
          question: 'Why do phishing lures so frequently employ extreme urgency (e.g., "Account suspended in 30 minutes")?',
          options: [
            'Because email servers reject messages that do not specify a time limit',
            'To induce stress and panic, forcing the victim to act impulsively before their logical critical-thinking processes can engage',
            'Because cybercriminals have strict work hours',
            'To ensure the email complies with standard ISO regulations'
          ],
          correctIndex: 1,
          explanation: 'Artificial urgency induces cognitive overload and stress, causing victims to bypass caution and act before verifying authenticity.'
        }
      },
      {
        id: 'les-5-2',
        title: '5.2 Pretexting & Open-Source Intelligence (OSINT)',
        duration: '9 min',
        summary: 'Learn how attackers mine LinkedIn, GitHub, and corporate press releases to build convincing pretexts.',
        sections: [
          {
            title: 'The Art of the Pretext',
            content: 'A **pretext** is an invented scenario created by an attacker to build credibility with a victim. Attackers conduct extensive Open-Source Intelligence (OSINT) gathering before contacting a target:\n\n* They find who reports to whom on LinkedIn.\n* They identify the software stack used (e.g., Okta, Salesforce, Workday) from job postings.\n* They check vacation out-of-office messages to know when an executive is traveling.\n* They monitor company acquisitions or vendor contracts in the press.\n\nWith this context, the attacker crafts a hyper-convincing scenario: "Hi Dave, I saw you manage the marketing billing for Q3 vendor renewals. Could you confirm invoice #4928 from Acme Partners?"',
            keyTakeaways: [
              'Information posted publicly online can and will be weaponized against your organization.',
              'Never assume an email is legitimate just because the sender knows your name, boss, or internal project names.'
            ]
          }
        ],
        checkpointQuestion: {
          question: 'How do attackers make spear phishing emails appear so intimately familiar with internal company operations?',
          options: [
            'By tapping physical office phone lines with radio receivers',
            'By conducting Open-Source Intelligence (OSINT) research on public social media, LinkedIn, corporate job postings, and press releases',
            'By guessing completely randomly',
            'By accessing satellite imagery of company headquarters'
          ],
          correctIndex: 1,
          explanation: 'Attackers assemble rich profiles of target organizations from public data sources (LinkedIn, social media, job posts) to make their pretexts convincing.'
        }
      },
      {
        id: 'les-5-3',
        title: '5.3 MFA Fatigue & Push Bombing Tactics',
        duration: '8 min',
        summary: 'Deconstruct how attackers spam mobile authentication prompts to force accidental user approval.',
        sections: [
          {
            title: 'Wear-Down Authentication Attacks',
            content: 'When attackers already possess a user’s username and password, they face the secondary MFA challenge. If the organization uses push notification approvals (e.g., Microsoft Authenticator or Duo "Approve / Deny" prompts), attackers employ **MFA Fatigue (Push Bombing)**:\n\n1. The attacker repeatedly triggers login attempts at 2:00 AM.\n2. The victim’s phone buzzes dozens of times with authentication requests.\n3. The attacker might follow up with a WhatsApp message or phone call pretending to be IT: "We are receiving server errors; please tap Approve to stop the notifications."\n4. The exhausted victim taps "Approve" simply to silence the buzzing phone.\n5. The attacker gains full access.',
            keyTakeaways: [
              'Never tap "Approve" on an unexpected MFA push notification, especially when you are not actively logging in.',
              'Report repeated unsolicited MFA prompts to your security team immediately as an ongoing credential breach.'
            ]
          }
        ],
        checkpointQuestion: {
          question: 'What should you do if your phone suddenly receives 20 consecutive MFA push notification approval prompts while you are asleep?',
          options: [
            'Tap Approve on one prompt so your phone stops vibrating',
            'Deny the prompt, change your password immediately, and notify your security team that your primary credentials have been compromised',
            'Ignore it and check back in a week',
            'Turn off your Wi-Fi router'
          ],
          correctIndex: 1,
          explanation: 'Unexpected push prompts mean the attacker already knows your password and is trying to bypass MFA. Deny the request, reset credentials, and report the attack.'
        }
      },
      {
        id: 'les-5-4',
        title: '5.4 Vishing, Smishing & AI Voice Cloning Scams',
        duration: '9 min',
        summary: 'Explore voice phishing, SMS lures, and modern AI voice cloning impersonation.',
        sections: [
          {
            title: 'Expanding Beyond the Inbox',
            content: 'Attackers increasingly blend phone, SMS, and email:\n\n* **Vishing (Voice Phishing)**: Attackers call employees claiming to be the IT Help Desk troubleshooting VPN issues, asking users to read back One-Time Passwords.\n* **AI Voice Cloning (Deepfakes)**: Using as little as 3 seconds of audio from an executive’s conference speech or podcast, AI tools can synthesize their voice to order emergency financial transfers.\n* **Smishing (SMS Phishing)**: Text messages claiming your bank card is locked or your package cannot be delivered without address confirmation.',
            keyTakeaways: [
              'Never share OTP or MFA codes over the phone with anyone, even if they claim to be internal IT support.',
              'Establish verbal challenge-response passphrases within families or finance teams for emergency financial requests.'
            ]
          }
        ],
        checkpointQuestion: {
          question: 'If you receive a phone call from someone claiming to be your corporate IT Help Desk asking for the 6-digit MFA code on your screen, what should you do?',
          options: [
            'Read the code to them so they can fix your computer',
            'Refuse to share the code, hang up, and call the official IT Help Desk number from your company directory to verify',
            'Provide only the first 3 digits of the code',
            'Ask them to send the code in an email'
          ],
          correctIndex: 1,
          explanation: 'Legitimate IT support technicians will NEVER ask you for your personal MFA verification codes or passwords over the phone.'
        }
      }
    ]
  },
  {
    id: 'mod-6',
    title: 'Practical Ways to Avoid Phishing (The Defense Playbook)',
    category: 'Defense Protocols',
    level: 'Beginner',
    duration: '35 min',
    lessonsCount: 4,
    description: 'Master actionable personal and organizational defense protocols: Out-of-Band verification workflows, password manager protections, hardware keys, and guilt-free incident reporting.',
    tagline: 'Actionable, battle-tested habits to bulletproof your daily digital workflows.',
    iconName: 'ShieldCheck',
    keyConcepts: ['Out-of-Band (OOB) Verification', 'Password Manager Domain Protection', 'FIDO2 Hardware Keys', 'Guilt-Free Incident Reporting'],
    status: 'available',
    overview: 'Defending against phishing does not require paranoia; it requires disciplined, repeatable security habits and protocol adherence. By establishing clear verification routines and adopting phishing-resistant technology, you can neutralize even the most sophisticated campaigns.',
    summaryTakeaways: [
      'Mandate Out-of-Band (OOB) verification for all financial, credential, or sensitive data requests.',
      'Rely on password managers: they refuse to autofill on fake domains, serving as automatic phishing detectors.',
      'Report suspected phishing immediately: swift reporting enables SOC teams to protect your colleagues before a breach spreads.'
    ],
    lessons: [
      {
        id: 'les-6-1',
        title: '6.1 The 6-Pillar Personal Defense Framework',
        duration: '9 min',
        summary: 'Learn the six daily operational security habits that prevent 99% of phishing compromises.',
        sections: [
          {
            title: 'The 6 Core Defense Habits',
            content: 'Incorporate these foundational rules into your daily digital routine:',
            exampleBox: {
              type: 'defense-steps',
              title: 'The 6-Pillar Defense Playbook',
              steps: [
                {
                  step: 1,
                  title: '1. Out-of-Band (OOB) Verification',
                  desc: 'Whenever you receive an urgent request involving money, credentials, or sensitive data, verify it through a separate, trusted channel (phone, internal Slack/Teams, or in-person).'
                },
                {
                  step: 2,
                  title: '2. Read URLs from Right to Left',
                  desc: 'Start at the Top-Level Domain (.com, .net) and read backwards to locate the true root domain before clicking or entering credentials.'
                },
                {
                  step: 3,
                  title: '3. Use Password Managers as Phishing Detectors',
                  desc: 'Password managers autofill only on exact root domains. If your password manager does not auto-fill on a login page, the page is likely a phishing clone.'
                },
                {
                  step: 4,
                  title: '4. Upgrade to Phishing-Resistant MFA (FIDO2)',
                  desc: 'Enforce hardware security keys (YubiKeys, Passkeys, Windows Hello) that use origin binding to neutralize reverse proxy session theft.'
                },
                {
                  step: 5,
                  title: '5. Never Enable Macros or Run Unknown Attachments',
                  desc: 'Treat unexpected .iso, .xlsm, .vbs, or password-protected archives with extreme skepticism. Contact the claimed sender to verify.'
                },
                {
                  step: 6,
                  title: '6. Report Suspicious Emails Immediately',
                  desc: 'Use the official "Report Phishing" button. Deleting an email protects only you; reporting it protects the entire organization.'
                }
              ]
            },
            keyTakeaways: [
              'Security is a team sport: your fast reporting protects coworkers who might otherwise fall victim.',
              'Habitual out-of-band verification completely stops Business Email Compromise (BEC) attacks.'
            ]
          }
        ],
        checkpointQuestion: {
          question: 'Why is using a dedicated password manager considered an effective defense against phishing websites?',
          options: [
            'Because password managers disable your computer’s internet connection when an error occurs',
            'Because password managers match credentials strictly to the verified browser domain and will refuse to autofill on lookalike phishing domains',
            'Because password managers block all incoming spam emails',
            'Because password managers only work on verified bank websites'
          ],
          correctIndex: 1,
          explanation: 'Password managers match domains mathematically without human visual bias. If you are on `micros0ft.com`, the password manager will refuse to autofill credentials saved for `microsoft.com`.'
        }
      },
      {
        id: 'les-6-2',
        title: '6.2 Out-of-Band (OOB) Verification Protocols in Practice',
        duration: '9 min',
        summary: 'Establish strict verification protocols for wire transfers, vendor bank changes, and confidential requests.',
        sections: [
          {
            title: 'How to Execute Out-of-Band Verification',
            content: 'Out-of-Band (OOB) verification means verifying a transaction using a completely separate communication medium than the one used to deliver the request:\n\n* **The Golden Rule**: Never use the contact information (phone number, email, or link) provided inside the suspicious message itself!\n* **Look up the contact independently**: Use your corporate phone directory, the verified phone number on an original vendor contract, or existing internal chat channels.\n* **Standardized Call Script**: "Hi Sarah, I received an email from your address requesting a $50,000 wire transfer change. I am calling to verbally confirm the invoice number and routing details per our security policy."',
            keyTakeaways: [
              'Never call the phone number listed in the suspicious email signature—that number routes to the attacker.',
              'Dual-authorization (Four-Eye principle) must be required for all financial transfers above established thresholds.'
            ]
          }
        ],
        checkpointQuestion: {
          question: 'When performing an Out-of-Band phone verification for a suspicious email request, where should you find the phone number to call?',
          options: [
            'From the phone number written in the signature of the suspicious email',
            'From an independent, trusted source such as your internal employee directory or an original verified contract',
            'From a Google search query for customer support',
            'From the email header metadata'
          ],
          correctIndex: 1,
          explanation: 'Attackers include their own phone numbers in fraudulent email signatures. Always use an independently verified directory or known internal contact info.'
        }
      },
      {
        id: 'les-6-3',
        title: '6.3 What to Do If You Clicked: Immediate Incident Response',
        duration: '9 min',
        summary: 'Step-by-step emergency playbook if you accidentally clicked a malicious link or entered credentials.',
        sections: [
          {
            title: 'The Immediate 5-Step Containment Protocol',
            content: 'Mistakes happen. What matters most is how rapidly you contain the incident. If you clicked a link or entered your credentials, follow this sequence immediately:',
            exampleBox: {
              type: 'defense-steps',
              title: 'Emergency Incident Response Protocol',
              steps: [
                {
                  step: 1,
                  title: 'Step 1: Do Not Panic & Do Not Hide It',
                  desc: 'Security teams care about rapid containment, not blaming individuals. Hiding a mistake gives the adversary hours to move laterally.'
                },
                {
                  step: 2,
                  title: 'Step 2: Disconnect the Device If an Attachment Was Opened',
                  desc: 'If you ran an attachment, disconnect from Wi-Fi or unplug the Ethernet cable to prevent malware from spreading across the local network.'
                },
                {
                  step: 3,
                  title: 'Step 3: Reset Credentials from an Isolated Clean Device',
                  desc: 'Using a separate computer or phone, change your password immediately and click "Log out of all active sessions".'
                },
                {
                  step: 4,
                  title: 'Step 4: Revoke OAuth App Grants & Active Tokens',
                  desc: 'Check your account settings (e.g., Google or Microsoft account apps) and revoke any newly authorized third-party applications.'
                },
                {
                  step: 5,
                  title: 'Step 5: Notify IT Security / SOC Immediately',
                  desc: 'Contact your security team with the email details, timestamp, and what actions were taken so they can block indicators across the entire organization.'
                }
              ]
            },
            keyTakeaways: [
              'Speed of reporting is the single most important factor in preventing ransomware deployment.',
              'Never feel ashamed to report a clicked link: early warning protects the whole company.'
            ]
          }
        ],
        checkpointQuestion: {
          question: 'If you accidentally enter your corporate credentials into a suspected phishing landing page, what is your most critical immediate priority?',
          options: [
            'Restart your computer and wait to see if anything strange happens tomorrow',
            'Immediately notify your IT Security / SOC team and reset your password from a clean device, logging out of all active sessions',
            'Delete the email and keep the mistake to yourself',
            'Send an email to the phishing sender asking them not to use your password'
          ],
          correctIndex: 1,
          explanation: 'Immediate notification allows security analysts to revoke tokens, invalidate sessions, and block the attacker before they can access internal databases.'
        }
      },
      {
        id: 'les-6-4',
        title: '6.4 Building a Resilient Security Culture',
        duration: '8 min',
        summary: 'How organizations and individuals foster a zero-blame, highly vigilant security posture.',
        sections: [
          {
            title: 'Security is a Collective Shield',
            content: 'High-performing security organizations emphasize:\n\n* **Zero-Blame Reporting**: Rewarding employees who report suspicious emails, even if they accidentally clicked.\n* **Continuous Micro-Training**: Short, relevant interactive scenario training over boring once-a-year compliance lectures.\n* **Security As Protocol, Not Paranoia**: Making out-of-band checks a standard operational habit, like wearing a seatbelt.',
            keyTakeaways: [
              'A strong security culture empowers everyone to question suspicious requests regardless of who sent them.',
              'Security awareness transforms employees from targets into active defenders.'
            ]
          }
        ],
        checkpointQuestion: {
          question: 'What is the hallmark of a healthy enterprise cybersecurity culture regarding phishing reports?',
          options: [
            'Fining employees whenever they report a suspicious email',
            'Encouraging rapid, guilt-free reporting so threats are identified and mitigated in minutes',
            'Ignoring all reported emails',
            'Requiring employees to handle security incidents completely alone'
          ],
          correctIndex: 1,
          explanation: 'A zero-blame, rapid-reporting culture ensures employees report suspicious activities immediately, drastically reducing attacker dwell time.'
        }
      }
    ]
  }
];
