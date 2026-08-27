# PhishGuard

## Phishing Awareness & Security Training Platform

PhishGuard is an interactive cybersecurity awareness platform designed to help users recognize, analyze, and respond to phishing threats.

The platform combines structured security education with practical phishing analysis, scenario-based quizzes, real-world incident studies, and actionable security guidelines.

## Features

### Phishing Academy
- Interactive phishing awareness lessons
- Suspicious email identification
- Fake login page awareness
- Fraudulent website and domain detection
- Social engineering education
- Practical phishing defense techniques
- Knowledge checkpoints
- Learning progress tracking

### Email Threat Analyzer
A deterministic rule-based phishing inspection sandbox that analyzes:

- Sender and display-name mismatches
- Reply-To diversion
- SPF/DKIM/DMARC indicators
- Suspicious URLs
- Typosquatting and Punycode
- Psychological urgency
- Credential harvesting indicators
- Dangerous attachments

The analyzer provides:
- Risk level
- Threat classification
- Detected red flags
- Evidence extracted from the email
- Recommended security actions

### Security Quiz
- Scenario-based phishing questions
- Multiple difficulty levels
- Immediate answer feedback
- Progress tracking
- Security knowledge scoring

### Real-World Cases
Interactive post-mortems covering real phishing and social-engineering incidents, including:
- Attack vectors
- Threat techniques
- Kill-chain analysis
- Enterprise security lessons

### Security Tips
Actionable security guidelines covering:
- Email verification
- URL and domain analysis
- Social engineering defenses
- Incident reporting
- Credential protection

## Technology Stack

- React
- TypeScript
- Vite
- HTML5
- CSS3
- Deterministic security heuristics
- Local browser storage for learning progress

## Project Structure

```text
phishguard/
├── src/
│   ├── components/
│   │   ├── AcademySection.tsx
│   │   ├── CasesSection.tsx
│   │   ├── EmailAnalyzerSection.tsx
│   │   ├── HomeSection.tsx
│   │   ├── QuizSection.tsx
│   │   ├── Sidebar.tsx
│   │   └── TipsSection.tsx
│   ├── data/
│   ├── utils/
│   │   └── emailHeuristics.ts
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts