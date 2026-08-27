export type TabSection = 
  | 'home'
  | 'academy'
  | 'analyzer'
  | 'quiz'
  | 'cases'
  | 'tips';

export interface LessonSection {
  title: string;
  content: string;
  badge?: string;
  exampleBox?: {
    type: 'email-breakdown' | 'url-breakdown' | 'login-comparison' | 'social-scenario' | 'defense-steps' | 'red-flags';
    title: string;
    subtitle?: string;
    items?: {
      label: string;
      value: string;
      annotation?: string;
      isSuspicious?: boolean;
    }[];
    details?: string;
    legitimateVsMalicious?: {
      legitimate: { label: string; details: string; code?: string };
      malicious: { label: string; details: string; code?: string };
    };
    steps?: { step: number; title: string; desc: string; tip?: string }[];
  };
  keyTakeaways: string[];
}

export interface AcademyLesson {
  id: string;
  title: string;
  duration: string;
  summary: string;
  sections: LessonSection[];
  checkpointQuestion?: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  };
}

export interface AcademyModule {
  id: string;
  title: string;
  category: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  lessonsCount: number;
  description: string;
  keyConcepts: string[];
  status: 'available' | 'in-progress' | 'completed';
  tagline?: string;
  iconName?: string;
  overview?: string;
  lessons?: AcademyLesson[];
  summaryTakeaways?: string[];
}

export interface QuizQuestion {
  id: string;
  title: string;
  category: string;
  scenario: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  options: string[];
  explanation: string;
  hint: string;
}

export interface RealWorldCase {
  id: string;
  title: string;
  targetOrg: string;
  year: string;
  vector: string;
  impact: string;
  summary: string;
  attackFlow: string[];
  indicators: string[];
  defensiveLessons: string[];
  severity: 'Critical' | 'High' | 'Medium';
}

export interface SecurityTipCategory {
  id: string;
  title: string;
  iconName: string;
  tips: {
    title: string;
    description: string;
    actionableRule: string;
    level: 'Essential' | 'Pro' | 'Protocol';
  }[];
}

export interface EmailAnalyzerInput {
  senderEmail: string;
  replyTo: string;
  subject: string;
  headers: string;
  body: string;
  extractedUrls: string;
  attachedFileName: string;
}

export type ThreatRiskLevel = 'Critical' | 'High' | 'Medium' | 'Low' | 'Clean';

export interface DetectedRedFlag {
  id: string;
  category: 'sender_mismatch' | 'reply_to_mismatch' | 'auth_failure' | 'suspicious_url' | 'typosquatting' | 'urgency_pressure' | 'credential_lure' | 'dangerous_attachment';
  title: string;
  severity: 'Critical' | 'High' | 'Medium' | 'Low';
  evidence: string;
  explanation: string;
}

export interface EmailAnalysisResult {
  riskLevel: ThreatRiskLevel;
  riskScore: number;
  verdict: string;
  attackVectorType?: string;
  detectedFlags: DetectedRedFlag[];
  shortExplanation: string;
  recommendedAction: string;
  heuristicSummary: {
    senderMismatch: boolean;
    replyToMismatch: boolean;
    authFailures: boolean;
    suspiciousUrls: boolean;
    typosquattingDetected: boolean;
    urgencyLanguage: boolean;
    credentialRequests: boolean;
    dangerousAttachments: boolean;
  };
  analyzedAt: string;
}
