export interface StudentProfile {
  name: string;
  professionalTitle: string;
  studentRole: string;
  university: string;
  campus: string;
  degree: string;
  currentStatus: string;
  semester: string;
  section: string;
  heroPitch: string;
  biography: string;
  careerObjective: string;
  email: string;
  phone: string;
  location: string;
  languages: {
    language: string;
    proficiency: string;
  }[];
  linkedin?: string;
  github?: string;
}

export interface AnalyticsWorkflowStep {
  step: number;
  name: string;
  shortTitle: string;
  subtitle: string;
  description: string;
  techniques: string[];
  businessValue: string;
  deliverables: string;
  iconName: string;
}

export interface SkillItem {
  id: string;
  name: string;
  levelDescriptor?: string;
  category: 'core' | 'bi' | 'methodology';
  description: string;
  iconName: string;
}

export interface ProjectWorkflowTask {
  stepNumber: string;
  title: string;
  shortSummary: string;
  details: string[];
  rationale?: string;
  techniques?: string[];
  technicalHighlights?: string[];
}

export interface AcademicProject {
  id: string;
  title: string;
  category: string;
  semesterTag: string;
  courseName: string;
  projectType: 'Group Academic Project' | 'Individual Academic Project' | 'Academic Assignment';
  courseworkType?: string;
  subtitle?: string;
  tools: string[];
  tags: string[];
  description: string;
  points: string[];
  focus: string;
  businessProblem?: string;
  dataset?: {
    filename: string;
    datasetName: string;
    description: string;
    targetVariable?: string;
  };
  instructor?: string;
  groupMembers?: {
    name: string;
    regNo?: string;
  }[];
  myContribution?: string;
  showRegNumbers?: boolean;
  learningOutcomes?: string[];
  businessAnalyticsPerspective?: string;
  workflowSteps?: ProjectWorkflowTask[];
  disclaimer?: string;
  dataPeriod?: string;
  benchmark?: string;
  dataSources?: string;
}

export interface EducationInfo {
  institution: string;
  campus: string;
  degree: string;
  currentStatus: string;
  semester: string;
  section: string;
  overview: string;
}

export interface PortfolioData {
  profile: StudentProfile;
  workflow: AnalyticsWorkflowStep[];
  skills: SkillItem[];
  projects: AcademicProject[];
  education: EducationInfo;
  experienceStatement: string;
  certificationsNotice: string;
  achievementsNotice: string;
  creditRiskContribution?: string;
  showRegistrationNumbers?: boolean;
}
