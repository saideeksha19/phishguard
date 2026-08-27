import { EmailAnalyzerInput, EmailAnalysisResult, DetectedRedFlag, ThreatRiskLevel } from '../types';

// Common impersonated brands and their authentic domains
const BRAND_DOMAINS: Record<string, string[]> = {
  microsoft: ['microsoft.com', 'office.com', 'live.com', 'outlook.com', 'office365.com', 'azure.com', 'sharepoint.com'],
  google: ['google.com', 'gmail.com', 'googlemail.com', 'youtube.com'],
  apple: ['apple.com', 'icloud.com'],
  amazon: ['amazon.com', 'aws.amazon.com'],
  paypal: ['paypal.com'],
  docusign: ['docusign.com', 'docusign.net'],
  netflix: ['netflix.com'],
  dropbox: ['dropbox.com'],
  zoom: ['zoom.us', 'zoom.com'],
  chase: ['chase.com', 'jpmorganchase.com'],
  'bank of america': ['bankofamerica.com', 'bofa.com'],
  'wells fargo': ['wellsfargo.com'],
  fedex: ['fedex.com'],
  ups: ['ups.com'],
  dhl: ['dhl.com'],
  irs: ['irs.gov'],
  acme: ['acmecorp.com', 'acme.com']
};

const SUSPICIOUS_TLDS = [
  '.xyz', '.top', '.click', '.link', '.info', '.work', '.ru', '.cc', '.tk',
  '.live', '.loan', '.buzz', '.fit', '.surf', '.gq', '.cf', '.ml', '.ga',
  '.rest', '.country', '.stream', '.date', '.faith', '.racing', '.party', '.kim'
];

const URL_SHORTENERS = [
  'bit.ly', 'tinyurl.com', 't.co', 'ow.ly', 'is.gd', 'buff.ly', 'goo.gl', 'cutt.ly', 'shorturl.at'
];

const DANGEROUS_EXTENSIONS: Record<string, { severity: 'Critical' | 'High'; type: string }> = {
  '.exe': { severity: 'Critical', type: 'Windows Executable Binary' },
  '.scr': { severity: 'Critical', type: 'Screen Saver Executable' },
  '.vbs': { severity: 'Critical', type: 'VBScript Payload' },
  '.js': { severity: 'High', type: 'JavaScript Execution Script' },
  '.bat': { severity: 'Critical', type: 'Batch Command Script' },
  '.cmd': { severity: 'Critical', type: 'Command Shell Script' },
  '.ps1': { severity: 'Critical', type: 'PowerShell Automation Script' },
  '.hta': { severity: 'Critical', type: 'HTML Application Executable' },
  '.cpl': { severity: 'Critical', type: 'Control Panel Executable' },
  '.iso': { severity: 'Critical', type: 'Virtual Disk Image (Sandbox Bypass Payload)' },
  '.img': { severity: 'Critical', type: 'Raw Disk Image' },
  '.vhd': { severity: 'Critical', type: 'Virtual Hard Disk Container' },
  '.xlsm': { severity: 'High', type: 'Macro-Enabled Excel Spreadsheet' },
  '.docm': { severity: 'High', type: 'Macro-Enabled Word Document' },
  '.pptm': { severity: 'High', type: 'Macro-Enabled PowerPoint Presentation' },
  '.one': { severity: 'High', type: 'OneNote Notebook Payload' },
  '.lnk': { severity: 'Critical', type: 'Windows Shortcut Shell Launcher' }
};

const FREE_WEBMAIL_DOMAINS = [
  'gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'aol.com', 'protonmail.com', 'mail.com', 'yandex.com', 'zoho.com', 'icloud.com'
];

/**
 * Parses email string into friendly display name and email address.
 * E.g. "CEO John Doe <ceo@acme-corporat1on.com>" -> { name: "CEO John Doe", email: "ceo@acme-corporat1on.com", domain: "acme-corporat1on.com" }
 */
export function parseEmailAddress(input: string): { name: string; email: string; domain: string } {
  const trimmed = input.trim();
  const angleMatch = trimmed.match(/^(.*?)\s*<([^>]+)>/);
  
  if (angleMatch) {
    const name = angleMatch[1].replace(/^["']|["']$/g, '').trim();
    const email = angleMatch[2].trim().toLowerCase();
    const domain = email.includes('@') ? email.split('@')[1].trim().toLowerCase() : '';
    return { name, email, domain };
  }

  const email = trimmed.toLowerCase();
  const domain = email.includes('@') ? email.split('@')[1].trim().toLowerCase() : '';
  return { name: '', email, domain };
}

/**
 * Extracts domain name from a URL or hostname.
 */
export function extractDomainFromUrl(urlStr: string): string {
  try {
    let cleanUrl = urlStr.trim();
    if (!cleanUrl.startsWith('http://') && !cleanUrl.startsWith('https://')) {
      cleanUrl = 'https://' + cleanUrl;
    }
    const parsed = new URL(cleanUrl);
    return parsed.hostname.toLowerCase();
  } catch {
    // fallback basic regex
    const match = urlStr.match(/(?:https?:\/\/)?([a-zA-Z0-9.-]+)/);
    return match ? match[1].toLowerCase() : '';
  }
}

/**
 * Checks for typosquatting / lookalike characters in a domain.
 */
function detectTyposquattingPattern(domain: string): { isTyposquatted: boolean; details: string; targetBrand?: string } {
  const cleanDomain = domain.toLowerCase();
  
  // 1. Number digit substitutions for letters
  if (/([a-z]+)0([a-z]+)/.test(cleanDomain) && !cleanDomain.includes('100') && !cleanDomain.includes('360')) {
    return { isTyposquatted: true, details: `Zero ('0') substituted for letter 'o' in domain name (${domain})` };
  }
  if (cleanDomain.includes('corporat1on') || cleanDomain.includes('m1crosoft') || cleanDomain.includes('paypa1') || cleanDomain.includes('app1e')) {
    return { isTyposquatted: true, details: `Digit '1' substituted for letter 'l' or 'i' in brand domain (${domain})` };
  }
  if (cleanDomain.includes('microsrn') || cleanDomain.includes('arnazon')) {
    return { isTyposquatted: true, details: `'rn' character combination mimicking letter 'm' in brand domain (${domain})` };
  }
  if (cleanDomain.includes('vvire') || cleanDomain.includes('passvvord')) {
    return { isTyposquatted: true, details: `'vv' character combination mimicking letter 'w' in domain (${domain})` };
  }

  // 2. Hyphenated fake brand domains
  for (const [brand, officialDomains] of Object.entries(BRAND_DOMAINS)) {
    if (cleanDomain.includes(brand)) {
      const isOfficial = officialDomains.some(d => cleanDomain === d || cleanDomain.endsWith('.' + d));
      if (!isOfficial) {
        return { 
          isTyposquatted: true, 
          details: `Unregistered brand combination imitating '${brand.toUpperCase()}' on non-official domain (${domain})`,
          targetBrand: brand
        };
      }
    }
  }

  return { isTyposquatted: false, details: '' };
}

/**
 * Runs complete deterministic heuristic analysis over the email payload.
 */
export function analyzeEmailHeuristics(input: EmailAnalyzerInput): EmailAnalysisResult {
  const flags: DetectedRedFlag[] = [];
  const senderInfo = parseEmailAddress(input.senderEmail);
  const replyToInfo = parseEmailAddress(input.replyTo);
  
  const headersLower = input.headers.toLowerCase();
  const subjectLower = input.subject.toLowerCase();
  const bodyLower = input.body.toLowerCase();
  const combinedText = `${subjectLower}\n${bodyLower}`;

  // Gather all URLs
  const urlList: string[] = [];
  if (input.extractedUrls) {
    input.extractedUrls.split(/[\n,]+/).forEach(u => {
      const tr = u.trim();
      if (tr) urlList.push(tr);
    });
  }
  const bodyUrls = input.body.match(/https?:\/\/[^\s"'<>]+/gi) || [];
  bodyUrls.forEach(u => {
    if (!urlList.includes(u)) urlList.push(u);
  });

  // Track summary heuristics
  let senderMismatch = false;
  let replyToMismatch = false;
  let authFailures = false;
  let suspiciousUrls = false;
  let typosquattingDetected = false;
  let urgencyLanguage = false;
  let credentialRequests = false;
  let dangerousAttachments = false;

  // -------------------------------------------------------------
  // 1. SENDER / DOMAIN MISMATCH CHECK
  // -------------------------------------------------------------
  const displayNameLower = senderInfo.name.toLowerCase();
  
  // Check if display name claims a brand but sender domain does not belong to that brand
  for (const [brand, officialDomains] of Object.entries(BRAND_DOMAINS)) {
    if (displayNameLower.includes(brand)) {
      const senderMatchesBrand = officialDomains.some(d => 
        senderInfo.domain === d || senderInfo.domain.endsWith('.' + d)
      );
      if (!senderMatchesBrand && senderInfo.domain) {
        senderMismatch = true;
        flags.push({
          id: 'flag-sender-brand-mismatch',
          category: 'sender_mismatch',
          title: `Brand Identity Mismatch (${brand.toUpperCase()})`,
          severity: 'Critical',
          evidence: `Display Name: "${senderInfo.name}" | Actual Envelope From: <${senderInfo.email}>`,
          explanation: `The friendly display name claims to represent "${brand.toUpperCase()}", but the actual transmitting email domain is "${senderInfo.domain}". Threat actors exploit friendly display names because mail clients often hide the real envelope address.`
        });
      }
    }
  }

  // Check if display name claims executive / internal role but uses public webmail
  const isExecutiveClaim = /ceo|cfo|chief|executive|president|director|founder|payroll|hr department|it support|help desk|security center/i.test(displayNameLower);
  if (isExecutiveClaim && FREE_WEBMAIL_DOMAINS.includes(senderInfo.domain)) {
    senderMismatch = true;
    flags.push({
      id: 'flag-exec-webmail',
      category: 'sender_mismatch',
      title: 'Executive / Corporate Impersonation via Public Webmail',
      severity: 'Critical',
      evidence: `Display: "${senderInfo.name}" <${senderInfo.email}>`,
      explanation: `The sender claims an organizational authority or IT administrative title but is transmitting from a free public webmail domain (${senderInfo.domain}). Corporate communications are routed through registered corporate mailservers.`
    });
  }

  // -------------------------------------------------------------
  // 2. REPLY-TO MISMATCH CHECK
  // -------------------------------------------------------------
  if (replyToInfo.email && senderInfo.email) {
    if (replyToInfo.domain && senderInfo.domain && replyToInfo.domain !== senderInfo.domain) {
      replyToMismatch = true;
      flags.push({
        id: 'flag-replyto-diversion',
        category: 'reply_to_mismatch',
        title: 'Reply-To Address Rerouting Diversion',
        severity: 'Critical',
        evidence: `From: <${senderInfo.email}> | Reply-To: <${replyToInfo.email}>`,
        explanation: `When a victim replies to this message, the response will be silently diverted to an external address (<${replyToInfo.email}>) rather than the sender's stated domain. This is a trademark mechanism of Business Email Compromise (BEC) and whaling lures.`
      });
    }
  }

  // -------------------------------------------------------------
  // 3. SPF / DKIM / DMARC AUTHENTICATION FAILURES
  // -------------------------------------------------------------
  if (input.headers.trim().length > 0) {
    const hasSpfFail = headersLower.includes('spf=fail') || headersLower.includes('spf: fail') || headersLower.includes('spf=softfail') || headersLower.includes('spf=permerror');
    const hasDkimFail = headersLower.includes('dkim=fail') || headersLower.includes('dkim: fail');
    const hasDmarcFail = headersLower.includes('dmarc=fail') || headersLower.includes('dmarc: fail') || headersLower.includes('dmarc=none');

    if (hasSpfFail || hasDkimFail || hasDmarcFail) {
      authFailures = true;
      const failedProtocols: string[] = [];
      if (hasSpfFail) failedProtocols.push('SPF (Sender Policy Framework)');
      if (hasDkimFail) failedProtocols.push('DKIM (Cryptographic Signature)');
      if (hasDmarcFail) failedProtocols.push('DMARC Alignment');

      // Extract specific header line for evidence
      const headerLines = input.headers.split('\n');
      const authLine = headerLines.find(l => 
        l.toLowerCase().includes('authentication-results') || 
        l.toLowerCase().includes('spf=') || 
        l.toLowerCase().includes('dkim=') || 
        l.toLowerCase().includes('dmarc=')
      ) || input.headers.slice(0, 120);

      flags.push({
        id: 'flag-auth-failure',
        category: 'auth_failure',
        title: `Email Authentication Protocol Failure (${failedProtocols.join(', ')})`,
        severity: hasSpfFail && hasDmarcFail ? 'Critical' : 'High',
        evidence: authLine.trim(),
        explanation: `The receiving mail server failed cryptographic or IP policy verification (${failedProtocols.join(', ')}). This indicates the sending server was not authorized by the legitimate domain owner to transmit emails on their behalf.`
      });
    }
  }

  // -------------------------------------------------------------
  // 4. SUSPICIOUS URLS CHECK
  // -------------------------------------------------------------
  for (const url of urlList) {
    const urlDomain = extractDomainFromUrl(url);

    // IP address host
    if (/^https?:\/\/\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/i.test(url)) {
      suspiciousUrls = true;
      flags.push({
        id: `flag-url-ip-${urlDomain}`,
        category: 'suspicious_url',
        title: 'Direct IP Host Address in Link',
        severity: 'Critical',
        evidence: url,
        explanation: 'Legitimate enterprise services never use raw numeric IP addresses in user-facing links. Threat actors use direct IP hosts to bypass automated domain reputation blocklists.'
      });
    }

    // Punycode / IDN Homograph
    if (urlDomain.includes('xn--')) {
      suspiciousUrls = true;
      flags.push({
        id: `flag-url-punycode-${urlDomain}`,
        category: 'suspicious_url',
        title: 'Punycode / IDN Homograph Obfuscation',
        severity: 'Critical',
        evidence: urlDomain,
        explanation: 'The link utilizes Internationalized Domain Name (Punycode "xn--") Cyrillic or Greek lookalike characters to visually impersonate a trusted domain name.'
      });
    }

    // High risk TLDs
    const matchedTld = SUSPICIOUS_TLDS.find(tld => urlDomain.endsWith(tld));
    if (matchedTld) {
      suspiciousUrls = true;
      flags.push({
        id: `flag-url-tld-${urlDomain}`,
        category: 'suspicious_url',
        title: `High-Risk Top-Level Domain (${matchedTld})`,
        severity: 'High',
        evidence: url,
        explanation: `The link directs to a top-level domain (${matchedTld}) with elevated statistical abuse rates for phishing infrastructure and malicious payload hosting.`
      });
    }

    // URL Shortener
    const isShortener = URL_SHORTENERS.some(sh => urlDomain === sh || urlDomain.endsWith('.' + sh));
    if (isShortener) {
      suspiciousUrls = true;
      flags.push({
        id: `flag-url-shortener-${urlDomain}`,
        category: 'suspicious_url',
        title: 'URL Shortener Hiding True Destination',
        severity: 'Medium',
        evidence: url,
        explanation: 'URL shorteners obscure the real destination server, preventing standard mail gateways and recipients from verifying the target domain before clicking.'
      });
    }

    // Subdomain deception (e.g. microsoft.com.phishingsite.net)
    const knownBrandsList = ['microsoft', 'google', 'paypal', 'apple', 'amazon', 'docusign', 'netflix', 'chase'];
    for (const b of knownBrandsList) {
      if (urlDomain.includes(b) && !BRAND_DOMAINS[b]?.some(d => urlDomain === d || urlDomain.endsWith('.' + d))) {
        suspiciousUrls = true;
        flags.push({
          id: `flag-url-subdomain-deception-${urlDomain}`,
          category: 'suspicious_url',
          title: `Brand Impersonation in Link URL (${b.toUpperCase()})`,
          severity: 'Critical',
          evidence: url,
          explanation: `The domain (${urlDomain}) incorporates the brand name "${b}" into an unauthorized hostname or subdomain structure to deceive victims into believing it is an official portal.`
        });
      }
    }
  }

  // -------------------------------------------------------------
  // 5. TYPOSQUATTING CHECK
  // -------------------------------------------------------------
  const domainsToCheck = [senderInfo.domain, replyToInfo.domain, ...urlList.map(extractDomainFromUrl)].filter(Boolean);
  const checkedDomains = new Set<string>();

  for (const dom of domainsToCheck) {
    if (checkedDomains.has(dom)) continue;
    checkedDomains.add(dom);

    const typoResult = detectTyposquattingPattern(dom);
    if (typoResult.isTyposquatted) {
      typosquattingDetected = true;
      flags.push({
        id: `flag-typosquat-${dom}`,
        category: 'typosquatting',
        title: `Typosquatting & Lookalike Domain (${dom})`,
        severity: 'Critical',
        evidence: dom,
        explanation: `${typoResult.details}. Attackers register visually identical lookalike domains to bypass casual human visual inspection.`
      });
    }
  }

  // -------------------------------------------------------------
  // 6. URGENCY & PSYCHOLOGICAL COERCION LANGUAGE
  // -------------------------------------------------------------
  const urgencyPatterns: { pattern: RegExp; label: string; severity: 'Critical' | 'High' | 'Medium' }[] = [
    { pattern: /\b(urgent|urgently|immediate action required|act immediately|time sensitive)\b/i, label: 'Explicit Urgency Trigger', severity: 'High' },
    { pattern: /\b(within (?:24|48|12|6|2|1) hours?|by 2 pm|today only|immediate payment)\b/i, label: 'Artificial Time Limit / Deadline', severity: 'High' },
    { pattern: /\b(do not call|do not contact|strict nda|board session|confidential acquisition)\b/i, label: 'Isolation Coercion (Bypassing Standard Verification)', severity: 'Critical' },
    { pattern: /\b(account suspended|session expired|access terminated|certificate will terminate|disabled immediately)\b/i, label: 'Fear of Consequence / Access Loss Threat', severity: 'High' },
    { pattern: /\b(wire transfer|wire payment|transfer slip|direct deposit|escrow)\b/i, label: 'Financial Routing Manipulation', severity: 'High' }
  ];

  for (const u of urgencyPatterns) {
    const match = combinedText.match(u.pattern);
    if (match) {
      urgencyLanguage = true;
      flags.push({
        id: `flag-urgency-${u.label.toLowerCase().replace(/\s+/g, '-')}`,
        category: 'urgency_pressure',
        title: u.label,
        severity: u.severity,
        evidence: `"...${match[0]}..." in subject/body`,
        explanation: 'Attackers create acute emotional urgency or impose artificial secrecy rules to cause cognitive overload, compelling victims to bypass standard operational verification protocols.'
      });
    }
  }

  // -------------------------------------------------------------
  // 7. CREDENTIAL REQUESTS & HIGH-RISK LURES
  // -------------------------------------------------------------
  const credentialPatterns: { pattern: RegExp; label: string; severity: 'Critical' | 'High' }[] = [
    { pattern: /\b(qr code|scan the qr|scan the attached qr|mobile camera to authenticate|scan with your phone)\b/i, label: 'Quishing (QR Code Authentication Trap)', severity: 'Critical' },
    { pattern: /\b(password|credentials|enter your login|sign in to keep access|multi-factor|mfa|authenticator)\b/i, label: 'Credential Harvesting / SSO Interception Lure', severity: 'Critical' },
    { pattern: /\b(verify your account|confirm your identity|zero-trust session|security certificate)\b/i, label: 'Fake Security Verification Pretext', severity: 'High' }
  ];

  for (const c of credentialPatterns) {
    const match = combinedText.match(c.pattern);
    if (match) {
      credentialRequests = true;
      flags.push({
        id: `flag-cred-${c.label.toLowerCase().replace(/\s+/g, '-')}`,
        category: 'credential_lure',
        title: c.label,
        severity: c.severity,
        evidence: `"...${match[0]}..."`,
        explanation: 'The communication attempts to harvest authentication credentials, prompt out-of-band mobile QR scans, or intercept active multi-factor session tokens.'
      });
    }
  }

  // -------------------------------------------------------------
  // 8. DANGEROUS ATTACHMENTS
  // -------------------------------------------------------------
  const attachmentLower = input.attachedFileName.toLowerCase().trim();
  if (attachmentLower) {
    // Check for double extension (e.g. invoice.pdf.iso or document.pdf.exe)
    const doubleExtMatch = attachmentLower.match(/\.([a-z0-9]+)\.([a-z0-9]+)$/i);
    if (doubleExtMatch) {
      dangerousAttachments = true;
      flags.push({
        id: 'flag-double-ext',
        category: 'dangerous_attachment',
        title: `Double File Extension Concealment (${doubleExtMatch[0]})`,
        severity: 'Critical',
        evidence: input.attachedFileName,
        explanation: `The attachment filename disguises a high-risk executable payload (.${doubleExtMatch[2]}) behind a benign extension prefix (.${doubleExtMatch[1]}).`
      });
    }

    // Check specific dangerous extensions
    for (const [ext, info] of Object.entries(DANGEROUS_EXTENSIONS)) {
      if (attachmentLower.endsWith(ext)) {
        dangerousAttachments = true;
        flags.push({
          id: `flag-dangerous-ext-${ext.replace('.', '')}`,
          category: 'dangerous_attachment',
          title: `High-Risk Payload Format (${ext.toUpperCase()} - ${info.type})`,
          severity: info.severity,
          evidence: input.attachedFileName,
          explanation: `The attached file uses an executable container or macro-enabled script extension (${ext}) capable of executing arbitrary code or bypassing enterprise email sandboxes.`
        });
      }
    }
  }

  // -------------------------------------------------------------
  // COMPUTE OVERALL RISK LEVEL & DETERMINISTIC SCORE
  // -------------------------------------------------------------
  let riskScore = 0;
  flags.forEach(f => {
    if (f.severity === 'Critical') riskScore += 30;
    else if (f.severity === 'High') riskScore += 18;
    else if (f.severity === 'Medium') riskScore += 10;
    else riskScore += 5;
  });

  // Clamp risk score to max 100
  riskScore = Math.min(100, Math.max(0, riskScore));

  let riskLevel: ThreatRiskLevel = 'Clean';
  if (riskScore >= 70 || flags.some(f => f.severity === 'Critical')) {
    riskLevel = 'Critical';
  } else if (riskScore >= 45 || flags.some(f => f.severity === 'High')) {
    riskLevel = 'High';
  } else if (riskScore >= 25) {
    riskLevel = 'Medium';
  } else if (riskScore > 0) {
    riskLevel = 'Low';
  } else {
    riskLevel = 'Clean';
  }

  // Attack Vector Classification
  let attackVectorType = 'Legitimate / Unclassified';
  if (credentialRequests && combinedText.includes('qr')) {
    attackVectorType = 'Quishing (Malicious QR Code Attack)';
  } else if (replyToMismatch || (senderMismatch && urgencyLanguage && combinedText.includes('wire'))) {
    attackVectorType = 'Business Email Compromise (BEC) / Executive Whaling';
  } else if (credentialRequests || suspiciousUrls) {
    attackVectorType = 'Credential Harvesting / Adversary-in-the-Middle (AitM)';
  } else if (dangerousAttachments) {
    attackVectorType = 'Malicious Payload Delivery (Attachment Weaponization)';
  } else if (urgencyLanguage && senderMismatch) {
    attackVectorType = 'Spear Phishing / Social Engineering Lure';
  }

  // Short Explanation
  let shortExplanation = '';
  if (riskLevel === 'Critical') {
    shortExplanation = `This email exhibits strong indicators of a ${attackVectorType}. It contains ${flags.length} severe security violations including unauthorized sender spoofing, high-pressure coercion, or malicious credential harvesting mechanisms.`;
  } else if (riskLevel === 'High') {
    shortExplanation = `High phishing probability detected. The message presents multiple suspicious characteristics, including unverified domain origin, high-risk links, or urgency language designed to bypass rational skepticism.`;
  } else if (riskLevel === 'Medium') {
    shortExplanation = `Moderate risk identified. While not conclusively malicious, several heuristic indicators (such as external routing, masked links, or persuasive framing) require caution.`;
  } else if (riskLevel === 'Low') {
    shortExplanation = `Low risk. Few minor anomalies were observed, but no active exploitation or credential-harvesting vectors were identified.`;
  } else {
    shortExplanation = `No deterministic phishing indicators detected. The sender parameters, routing headers, and content structure conform to standard authentic email patterns.`;
  }

  // Recommended Action
  let recommendedAction = '';
  if (riskLevel === 'Critical' || riskLevel === 'High') {
    recommendedAction = 'DO NOT click any embedded links, scan attached QR codes, or download file attachments. Under no circumstances provide login credentials or execute financial transfers. Immediately submit this message to your organization\'s Security Operations Center (SOC) / IT Security Desk and quarantine the sender.';
  } else if (riskLevel === 'Medium') {
    recommendedAction = 'Verify the sender\'s identity through an independent, Out-of-Band (OOB) communication channel (e.g., dial their known internal extension). Avoid clicking links directly; navigate to the official portal via bookmarks or direct browser URL entry.';
  } else {
    recommendedAction = 'Standard operational vigilance. Proceed normally, ensuring that sensitive data is only ever shared across authenticated corporate channels.';
  }

  const verdict = riskLevel === 'Critical' 
    ? 'MALICIOUS THREAT DETECTED'
    : riskLevel === 'High'
    ? 'HIGH PROBABILITY PHISHING'
    : riskLevel === 'Medium'
    ? 'SUSPICIOUS COMMUNICATION'
    : riskLevel === 'Low'
    ? 'LOW RISK / MINOR ANOMALIES'
    : 'VERIFIED / CLEAN EMAIL';

  return {
    riskLevel,
    riskScore,
    verdict,
    attackVectorType,
    detectedFlags: flags,
    shortExplanation,
    recommendedAction,
    heuristicSummary: {
      senderMismatch,
      replyToMismatch,
      authFailures,
      suspiciousUrls,
      typosquattingDetected,
      urgencyLanguage,
      credentialRequests,
      dangerousAttachments
    },
    analyzedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
  };
}
