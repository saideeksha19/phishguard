import React, { useState } from 'react';
import { 
  SearchCode, 
  Terminal, 
  Trash2, 
  ShieldCheck, 
  Copy, 
  Check,
  AlertTriangle,
  AlertOctagon,
  ShieldAlert,
  ShieldX,
  FileCheck2,
  FileWarning,
  ExternalLink,
  ArrowRight,
  Sparkles,
  Layers,
  HelpCircle,
  Clock,
  Info
} from 'lucide-react';
import { EmailAnalyzerInput, EmailAnalysisResult } from '../types';
import { analyzeEmailHeuristics } from '../utils/emailHeuristics';

export const EmailAnalyzerSection: React.FC = () => {
  const [formData, setFormData] = useState<EmailAnalyzerInput>({
    senderEmail: '',
    replyTo: '',
    subject: '',
    headers: '',
    body: '',
    extractedUrls: '',
    attachedFileName: ''
  });

  const [activeTab, setActiveTab] = useState<'editor' | 'headers' | 'links'>('editor');
  const [copied, setCopied] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<EmailAnalysisResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const sampleEmails = [
    {
      label: 'Sample 1: BEC Wire Request',
      data: {
        senderEmail: 'CEO John Doe <ceo.john.doe@acme-corporat1on.com>',
        replyTo: 'john.doe.exec@gmail.com',
        subject: 'URGENT: Confidential Acquisition Wire Payment Required by 2 PM',
        headers: `Received: from mail-relay.adversary-vps.net (198.51.100.45)
Authentication-Results: mx.acmecorp.com;
  spf=fail (sender IP 198.51.100.45 is not in SPF record);
  dkim=none;
  dmarc=fail (p=quarantine) header.from=acme-corporat1on.com
Return-Path: <john.doe.exec@gmail.com>
Message-ID: <20260827.89231.spoof@adversary-vps.net>`,
        body: `Hi Team,

I am currently locked in a critical board session for our regional expansion. Please expedite an international wire transfer of $68,400.00 to our newly contracted escrow agent. 

Due to strict NDAs, do not call my office line. Reply directly to this email with confirmation once the transfer slip is generated.

Best regards,
John Doe
Chief Executive Officer`,
        extractedUrls: 'https://acme-corporat1on.com/escrow-docs/contract.pdf',
        attachedFileName: 'Wire_Invoice_AcmeCorp_Q3.pdf'
      }
    },
    {
      label: 'Sample 2: Quishing (QR Lure)',
      data: {
        senderEmail: 'Microsoft 365 Security Notice <no-reply@auth-m365-verify.info>',
        replyTo: 'no-reply@auth-m365-verify.info',
        subject: 'Action Required: Your Multi-Factor Authentication session expired',
        headers: `Received: from mailout.shared-hosting.eu (203.0.113.12)
Authentication-Results: mx.enterprise.org;
  spf=softfail;
  dkim=fail;
  dmarc=none;
Return-Path: <bounce@auth-m365-verify.info>
Message-ID: <msauth-warning-99812@auth-m365-verify.info>`,
        body: `Microsoft Security Center Notification

Your organization has enforced updated zero-trust session security. Your authentication certificate will terminate in 6 hours.

Scan the attached QR code with your mobile camera to authenticate your identity immediately and retain uninterrupted access.`,
        extractedUrls: 'https://auth-m365-verify.info/sso/login?challenge=4981',
        attachedFileName: 'MFA_Authenticator_Update.pdf'
      }
    },
    {
      label: 'Sample 3: AitM Login Harvester',
      data: {
        senderEmail: 'DocuSign Document Delivery <service@docusign-envelope-review.net>',
        replyTo: 'service@docusign-envelope-review.net',
        subject: 'URGENT: Review & Sign Pending Payroll Direct Deposit Form',
        headers: `Received: from relay01.adversary-proxy.top (185.220.101.5)
Authentication-Results: mx.corporate.com;
  spf=fail (IP 185.220.101.5 not authorized);
  dkim=fail;
  dmarc=fail
Return-Path: <drop@docusign-envelope-review.net>
Message-ID: <env-91823-sig@docusign-envelope-review.net>`,
        body: `DocuSign Electronic Signature Notification

Please review and confirm your quarterly salary reconciliation documents immediately. You must sign in with your corporate credentials before the payroll cutoff at 5 PM today.

Click the link below to access your secure document portal.`,
        extractedUrls: 'https://docusign-envelope-review.net/auth/sso?session=9821a',
        attachedFileName: ''
      }
    },
    {
      label: 'Sample 4: Weaponized Attachment',
      data: {
        senderEmail: 'Accounts Payable <ap-billing@vendor-supplies.com>',
        replyTo: 'ap-billing@vendor-supplies.com',
        subject: 'Overdue Invoice #INV-88902 - Immediate Action Required',
        headers: `Received: from mail.vendor-supplies.com (198.51.100.22)
Authentication-Results: mx.enterprise.org; spf=pass; dkim=pass; dmarc=pass`,
        body: `Attached please find the itemized overdue statement for last month's inventory supply order. 

Please inspect the attached container immediately to avoid late penalties and account suspension.`,
        extractedUrls: '',
        attachedFileName: 'Statement_August2026.pdf.iso'
      }
    },
    {
      label: 'Sample 5: Legitimate Clean Email',
      data: {
        senderEmail: 'GitHub Support <support@github.com>',
        replyTo: 'support@github.com',
        subject: 'Your weekly security digest for organization repository',
        headers: `Received: from mail.github.com (192.30.252.204)
Authentication-Results: mx.target.com;
  dkim=pass header.i=@github.com;
  spf=pass (sender IP is 192.30.252.204);
  dmarc=pass (p=reject) header.from=github.com
Return-Path: <support@github.com>
Message-ID: <digest-991204@github.com>`,
        body: `Hello Developer,

This is your automated weekly security summary. No critical vulnerabilities were detected across your repositories this week.

You can review your complete audit logs at your standard project settings page.

Best regards,
The GitHub Security Team`,
        extractedUrls: 'https://github.com/settings/security-log',
        attachedFileName: ''
      }
    }
  ];

  const handleLoadSample = (sample: typeof sampleEmails[0]) => {
    setFormData(sample.data);
    setAnalysisResult(null);
  };

  const handleClear = () => {
    setFormData({
      senderEmail: '',
      replyTo: '',
      subject: '',
      headers: '',
      body: '',
      extractedUrls: '',
      attachedFileName: ''
    });
    setAnalysisResult(null);
  };

  const handleCopy = () => {
    const textToCopy = `From: ${formData.senderEmail}
Reply-To: ${formData.replyTo}
Subject: ${formData.subject}
Attachment: ${formData.attachedFileName}
URLs: ${formData.extractedUrls}

Headers:
${formData.headers}

Body:
${formData.body}`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleAnalyzeEmail = () => {
    if (!formData.senderEmail && !formData.subject && !formData.body && !formData.headers && !formData.attachedFileName && !formData.extractedUrls) {
      alert('Please enter email details or select a sample lure to analyze.');
      return;
    }

    setIsAnalyzing(true);
    setTimeout(() => {
      const result = analyzeEmailHeuristics(formData);
      setAnalysisResult(result);
      setIsAnalyzing(false);

      // Scroll smoothly to results
      const resultsElem = document.getElementById('analyzer-results-view');
      if (resultsElem) {
        resultsElem.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 250);
  };

  const isFormEmpty = !formData.senderEmail && !formData.subject && !formData.body && !formData.headers && !formData.attachedFileName && !formData.extractedUrls;

  return (
    <div id="email-analyzer-container" className="space-y-6">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1 bg-blue-50 text-blue-800 border border-blue-200">
              <SearchCode className="w-4 h-4" />
            </span>
            <span className="text-xs font-mono uppercase text-blue-800 font-bold tracking-wide">
              Deterministic Threat Inspection Sandbox
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 tracking-tight">Email Threat Analyzer</h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 font-sans">
            Evaluate sender identities, MIME routing headers, typosquatting domains, urgency vectors, and attachment risks using rule-based phishing heuristics.
          </p>
        </div>

        {/* Quick Sample Selector */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-mono text-slate-500 mr-1">Load Lure:</span>
          {sampleEmails.map((sample, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleLoadSample(sample)}
              className="px-2.5 py-1.5 bg-white hover:bg-slate-50 text-xs font-mono text-slate-800 border border-slate-200 shadow-xs hover:border-slate-400 transition-colors"
            >
              {sample.label.split(':')[0]}
            </button>
          ))}
          {!isFormEmpty && (
            <button
              type="button"
              onClick={handleClear}
              className="px-2.5 py-1.5 bg-white hover:bg-red-50 text-xs font-mono text-red-700 border border-red-200 transition-colors inline-flex items-center gap-1"
            >
              <Trash2 className="w-3 h-3" />
              <span>Clear</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Workspace Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left / Center: Input Console (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="border border-slate-200 bg-white shadow-sm overflow-hidden">
            {/* Console Toolbar Tabs */}
            <div className="flex items-center justify-between border-b border-slate-200 px-4 py-2.5 bg-slate-50">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setActiveTab('editor')}
                  className={`px-3 py-1 text-xs font-mono transition-colors ${
                    activeTab === 'editor'
                      ? 'bg-white text-slate-900 font-semibold border border-slate-300 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Email Content & Meta
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('headers')}
                  className={`px-3 py-1 text-xs font-mono transition-colors ${
                    activeTab === 'headers'
                      ? 'bg-white text-slate-900 font-semibold border border-slate-300 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Raw MIME Headers
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('links')}
                  className={`px-3 py-1 text-xs font-mono transition-colors ${
                    activeTab === 'links'
                      ? 'bg-white text-slate-900 font-semibold border border-slate-300 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Extracted URLs & Files
                </button>
              </div>

              {!isFormEmpty && (
                <button
                  type="button"
                  onClick={handleCopy}
                  className="inline-flex items-center gap-1.5 text-xs font-mono text-slate-600 hover:text-slate-900 transition-colors"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-slate-500" />}
                  <span>{copied ? 'Copied' : 'Copy'}</span>
                </button>
              )}
            </div>

            {/* Tab 1: Email Content & Meta */}
            {activeTab === 'editor' && (
              <div className="p-5 space-y-4">
                {/* From / Display Name */}
                <div>
                  <label htmlFor="analyzer-from" className="block text-xs font-mono text-slate-600 mb-1.5 font-semibold">
                    From: Envelope & Display Name
                  </label>
                  <input
                    id="analyzer-from"
                    type="text"
                    placeholder="e.g. CEO John Doe <ceo.john.doe@acme-corporat1on.com>"
                    value={formData.senderEmail}
                    onChange={(e) => setFormData({ ...formData, senderEmail: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 text-xs font-mono text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-blue-600"
                  />
                </div>

                {/* Reply-To */}
                <div>
                  <label htmlFor="analyzer-reply-to" className="block text-xs font-mono text-slate-600 mb-1.5 font-semibold">
                    Reply-To: Header Address (Optional)
                  </label>
                  <input
                    id="analyzer-reply-to"
                    type="text"
                    placeholder="e.g. attacker.inbox@gmail.com (if different from From domain)"
                    value={formData.replyTo}
                    onChange={(e) => setFormData({ ...formData, replyTo: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 text-xs font-mono text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-blue-600"
                  />
                </div>

                {/* Subject */}
                <div>
                  <label htmlFor="analyzer-subject" className="block text-xs font-mono text-slate-600 mb-1.5 font-semibold">
                    Subject Line
                  </label>
                  <input
                    id="analyzer-subject"
                    type="text"
                    placeholder="e.g. URGENT: Wire authorization required immediately"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 text-xs font-mono text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-blue-600"
                  />
                </div>

                {/* Body */}
                <div>
                  <label htmlFor="analyzer-body" className="block text-xs font-mono text-slate-600 mb-1.5 font-semibold">
                    Email Body Content (Message Text)
                  </label>
                  <textarea
                    id="analyzer-body"
                    rows={6}
                    placeholder="Paste the plain-text or HTML email body here for review..."
                    value={formData.body}
                    onChange={(e) => setFormData({ ...formData, body: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 text-xs font-mono text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-blue-600 resize-y font-sans leading-relaxed"
                  />
                </div>
              </div>
            )}

            {/* Tab 2: Raw Headers */}
            {activeTab === 'headers' && (
              <div className="p-5 space-y-4">
                <div className="flex items-center justify-between text-xs text-slate-600">
                  <span className="font-mono font-semibold">Paste Full Email Headers (RFC 822 / MIME)</span>
                  <span className="text-[11px] text-slate-500 font-mono">Authentication-Results, Received, SPF, DKIM, DMARC</span>
                </div>
                <textarea
                  id="analyzer-headers-raw"
                  rows={13}
                  placeholder={`Received: from mail-relay.adversary-vps.net (198.51.100.45)
Authentication-Results: mx.corporate.com;
  spf=fail (sender IP not in SPF record);
  dkim=fail;
  dmarc=fail (p=quarantine) header.from=acme-corporat1on.com
Return-Path: <john.doe.exec@gmail.com>
Message-ID: <20260827.spoof@adversary-vps.net>`}
                  value={formData.headers}
                  onChange={(e) => setFormData({ ...formData, headers: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 text-xs font-mono text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-blue-600 resize-y"
                />
              </div>
            )}

            {/* Tab 3: Extracted URLs & Files */}
            {activeTab === 'links' && (
              <div className="p-5 space-y-4">
                <div>
                  <label htmlFor="analyzer-urls" className="block text-xs font-mono text-slate-600 mb-1.5 font-semibold">
                    Hyperlinks in Email (one per line)
                  </label>
                  <textarea
                    id="analyzer-urls"
                    rows={5}
                    placeholder="e.g. https://portal.mycompany-secur1ty.net/auth/login?challenge=4981"
                    value={formData.extractedUrls}
                    onChange={(e) => setFormData({ ...formData, extractedUrls: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 text-xs font-mono text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-blue-600 resize-y"
                  />
                </div>

                <div>
                  <label htmlFor="analyzer-attachments" className="block text-xs font-mono text-slate-600 mb-1.5 font-semibold">
                    Attachment Filename & File Extension
                  </label>
                  <input
                    id="analyzer-attachments"
                    type="text"
                    placeholder="e.g. Statement_August2026.pdf.iso or PaymentSlip.xlsm"
                    value={formData.attachedFileName}
                    onChange={(e) => setFormData({ ...formData, attachedFileName: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 text-xs font-mono text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-blue-600"
                  />
                </div>
              </div>
            )}

            {/* Form Footer with ANALYZE EMAIL button */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-4 bg-slate-50 border-t border-slate-200">
              <div className="text-xs font-mono text-slate-500">
                {formData.body.length > 0 ? `${formData.body.length} characters in payload` : 'No payload entered'}
              </div>
              <div className="flex items-center gap-2.5 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={handleClear}
                  className="px-3.5 py-2 bg-white hover:bg-slate-100 text-slate-700 text-xs font-mono border border-slate-200 transition-colors"
                >
                  Reset Form
                </button>
                <button
                  id="btn-analyze-email"
                  type="button"
                  onClick={handleAnalyzeEmail}
                  disabled={isAnalyzing}
                  className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-6 py-2 bg-blue-700 hover:bg-blue-800 text-white text-xs font-medium font-sans shadow-xs transition-colors cursor-pointer"
                >
                  {isAnalyzing ? (
                    <>
                      <div className="w-3.5 h-3.5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                      <span>ANALYZING...</span>
                    </>
                  ) : (
                    <>
                      <SearchCode className="w-4 h-4" />
                      <span className="font-bold tracking-wide">ANALYZE EMAIL</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Heuristic Checklist & Reference (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="border border-slate-200 bg-white p-5 shadow-sm space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-200">
              <ShieldCheck className="w-5 h-5 text-blue-700" />
              <h3 className="font-serif font-bold text-slate-900 text-base">
                Heuristic Defense Engine
              </h3>
            </div>

            <p className="text-xs text-slate-600 font-sans leading-relaxed">
              The analyzer applies 8 deterministic rule sets across envelope addresses, cryptographic SPF/DKIM headers, typosquatting databases, and social engineering lexicons:
            </p>

            <div className="space-y-2 text-xs">
              {[
                { name: 'Sender / Domain Mismatch', desc: 'Display name vs. actual envelope address' },
                { name: 'Reply-To Diversion', desc: 'Rerouting replies to external mailboxes' },
                { name: 'SPF/DKIM/DMARC Verification', desc: 'Cryptographic mailserver authentication' },
                { name: 'Suspicious Links & Host IP', desc: 'High-risk TLDs, IP hosts, shorteners, AitM' },
                { name: 'Typosquatting & Punycode', desc: 'Homographs (0 for o, 1 for l, rn for m)' },
                { name: 'Psychological Urgency', desc: 'Artificial deadlines & secrecy coercion' },
                { name: 'Credential Harvesting Lures', desc: 'Fake SSO logins, MFA codes, QR quishing' },
                { name: 'Dangerous Attachments', desc: 'Double extensions, ISOs, macro XLSM files' }
              ].map((h, i) => (
                <div key={i} className="flex items-start gap-2.5 p-2 bg-slate-50 border border-slate-200">
                  <span className="w-4 h-4 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center font-mono font-bold text-[10px] shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  <div>
                    <span className="font-mono font-bold text-slate-800 text-[11px] block">{h.name}</span>
                    <span className="text-slate-500 text-[11px] font-sans">{h.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Analysis Results Display Section */}
      {analysisResult && (
        <div id="analyzer-results-view" className="border-t-2 border-slate-300 pt-6 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="p-1 bg-slate-900 text-white">
                <Terminal className="w-4 h-4" />
              </span>
              <h3 className="text-lg font-serif font-bold text-slate-900">
                Threat Inspection Report
              </h3>
              <span className="text-xs font-mono text-slate-500">
                Analyzed at {analysisResult.analyzedAt}
              </span>
            </div>

            <button
              type="button"
              onClick={handleAnalyzeEmail}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-mono border border-slate-200 transition-colors w-fit"
            >
              <span>Re-run Inspection</span>
            </button>
          </div>

          {/* Top Level Verdict & Risk Level Card */}
          <div className={`p-6 border shadow-sm ${
            analysisResult.riskLevel === 'Critical'
              ? 'bg-red-50/60 border-red-300'
              : analysisResult.riskLevel === 'High'
              ? 'bg-amber-50/60 border-amber-300'
              : analysisResult.riskLevel === 'Medium'
              ? 'bg-blue-50/60 border-blue-300'
              : 'bg-emerald-50/60 border-emerald-300'
          }`}>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className={`p-3 border shrink-0 ${
                  analysisResult.riskLevel === 'Critical'
                    ? 'bg-red-100 border-red-300 text-red-800'
                    : analysisResult.riskLevel === 'High'
                    ? 'bg-amber-100 border-amber-300 text-amber-800'
                    : analysisResult.riskLevel === 'Medium'
                    ? 'bg-blue-100 border-blue-300 text-blue-800'
                    : 'bg-emerald-100 border-emerald-300 text-emerald-800'
                }`}>
                  {analysisResult.riskLevel === 'Critical' ? (
                    <AlertOctagon className="w-8 h-8" />
                  ) : analysisResult.riskLevel === 'High' ? (
                    <ShieldAlert className="w-8 h-8" />
                  ) : analysisResult.riskLevel === 'Medium' ? (
                    <AlertTriangle className="w-8 h-8" />
                  ) : (
                    <ShieldCheck className="w-8 h-8" />
                  )}
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`text-xs font-mono font-bold uppercase px-2 py-0.5 border ${
                      analysisResult.riskLevel === 'Critical'
                        ? 'bg-red-200 text-red-950 border-red-400'
                        : analysisResult.riskLevel === 'High'
                        ? 'bg-amber-200 text-amber-950 border-amber-400'
                        : analysisResult.riskLevel === 'Medium'
                        ? 'bg-blue-200 text-blue-950 border-blue-400'
                        : 'bg-emerald-200 text-emerald-950 border-emerald-400'
                    }`}>
                      Risk Level: {analysisResult.riskLevel.toUpperCase()} ({analysisResult.riskScore} / 100)
                    </span>
                    {analysisResult.attackVectorType && (
                      <span className="text-xs font-mono text-slate-700 bg-white/80 px-2 py-0.5 border border-slate-300">
                        {analysisResult.attackVectorType}
                      </span>
                    )}
                  </div>

                  <h4 className="text-xl font-serif font-bold text-slate-950">
                    {analysisResult.verdict}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-800 font-sans mt-1.5 leading-relaxed max-w-3xl">
                    {analysisResult.shortExplanation}
                  </p>
                </div>
              </div>
            </div>

            {/* Recommended Action Callout */}
            <div className="mt-5 pt-4 border-t border-slate-300/80 bg-white/90 p-4 border shadow-xs space-y-1">
              <span className="text-xs font-mono uppercase font-bold text-slate-900 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-blue-700" />
                Recommended Action Protocol
              </span>
              <p className="text-xs sm:text-sm text-slate-800 font-sans leading-relaxed">
                {analysisResult.recommendedAction}
              </p>
            </div>
          </div>

          {/* 8-Point Heuristic Check Matrix */}
          <div className="bg-white border border-slate-200 p-5 shadow-sm space-y-3">
            <h4 className="text-xs font-mono uppercase text-slate-700 font-bold tracking-wider">
              Heuristic Inspection Vector Summary
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {[
                { label: 'Sender Mismatch', flagged: analysisResult.heuristicSummary.senderMismatch },
                { label: 'Reply-To Mismatch', flagged: analysisResult.heuristicSummary.replyToMismatch },
                { label: 'SPF / DMARC Fail', flagged: analysisResult.heuristicSummary.authFailures },
                { label: 'Suspicious URLs', flagged: analysisResult.heuristicSummary.suspiciousUrls },
                { label: 'Typosquatting', flagged: analysisResult.heuristicSummary.typosquattingDetected },
                { label: 'Urgency Pressure', flagged: analysisResult.heuristicSummary.urgencyLanguage },
                { label: 'Credential Lure', flagged: analysisResult.heuristicSummary.credentialRequests },
                { label: 'Weaponized File', flagged: analysisResult.heuristicSummary.dangerousAttachments }
              ].map((item, idx) => (
                <div 
                  key={idx}
                  className={`p-2.5 border text-xs flex items-center justify-between gap-2 ${
                    item.flagged 
                      ? 'bg-red-50 border-red-200 text-red-950 font-medium' 
                      : 'bg-emerald-50/40 border-emerald-200 text-slate-800'
                  }`}
                >
                  <span className="font-mono text-[11px]">{item.label}</span>
                  <span className={`text-[10px] font-mono font-bold px-1.5 py-0.5 border ${
                    item.flagged
                      ? 'bg-red-100 text-red-800 border-red-300'
                      : 'bg-emerald-100 text-emerald-800 border-emerald-300'
                  }`}>
                    {item.flagged ? 'FLAGGED' : 'PASSED'}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Detected Red Flags Detailed Breakdown */}
          <div className="bg-white border border-slate-200 p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold uppercase text-slate-900">
                  Detected Red Flags ({analysisResult.detectedFlags.length})
                </span>
              </div>
              <span className="text-xs font-mono text-slate-500">
                Rule-Based Evidence & Explanations
              </span>
            </div>

            {analysisResult.detectedFlags.length > 0 ? (
              <div className="space-y-3">
                {analysisResult.detectedFlags.map((flag, fIdx) => (
                  <div 
                    key={fIdx}
                    className={`p-4 border text-xs space-y-2 ${
                      flag.severity === 'Critical'
                        ? 'bg-red-50/70 border-red-200 text-red-950'
                        : flag.severity === 'High'
                        ? 'bg-amber-50/70 border-amber-200 text-amber-950'
                        : 'bg-blue-50/60 border-blue-200 text-blue-950'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 flex items-center justify-center font-mono font-bold text-[10px] bg-slate-900 text-white">
                          0{fIdx + 1}
                        </span>
                        <span className="font-serif font-bold text-sm text-slate-900">
                          {flag.title}
                        </span>
                      </div>
                      <span className={`text-[10px] font-mono px-2 py-0.5 border font-bold w-fit ${
                        flag.severity === 'Critical'
                          ? 'bg-red-200 text-red-900 border-red-300'
                          : flag.severity === 'High'
                          ? 'bg-amber-200 text-amber-900 border-amber-300'
                          : 'bg-blue-200 text-blue-900 border-blue-300'
                      }`}>
                        {flag.severity.toUpperCase()} SEVERITY
                      </span>
                    </div>

                    <div className="p-2.5 bg-white border border-slate-200 font-mono text-[11px] text-slate-900 break-all">
                      <span className="text-slate-500 font-bold uppercase text-[10px] block mb-0.5">Extracted Evidence:</span>
                      {flag.evidence}
                    </div>

                    <p className="text-slate-700 font-sans leading-relaxed text-[11px]">
                      {flag.explanation}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-6 bg-emerald-50/50 border border-emerald-200 text-center space-y-2">
                <FileCheck2 className="w-8 h-8 text-emerald-700 mx-auto" />
                <h5 className="font-serif font-bold text-slate-900 text-sm">
                  No Security Red Flags Identified
                </h5>
                <p className="text-xs text-slate-600 font-sans max-w-md mx-auto">
                  The email passed all deterministic heuristic checks. The sender domain matches authentication headers, no suspicious link patterns or dangerous attachments were discovered, and no social engineering urgency was identified.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
