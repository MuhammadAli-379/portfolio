# REDESIGN LOCK & SNAPSHOT CHECKLIST

Created on branch `redesign/premium` before any redesign edits.
Strict content lock: Zero alterations to metrics, facts, credentials, semester data, or live URLs.

---

## 1. Routes Lock
- [x] `/` — Home (Hero, About, Skills, Projects, Analytics Mindset, Playground, Education, Experience, Certifications, Achievements, Contact)
- [x] `/about` — About Me (Dedicated Page with Bio, Education snapshot, Languages, Goals, Navigation)
- [x] `/skills` — Technical Competencies & Toolkit (Dedicated Page with category filters & breakdown)
- [x] `/projects` — Academic Projects (Dedicated Page with 5 Projects & 5 Interactive Case Study Modals)
- [x] `/experience` — Experience & Credentials (Dedicated Page with Experience & Practicum + Certifications)
- [x] `/education` — Academic Qualifications (Dedicated Page with Degree info & Achievements)
- [x] `/contact` — Contact & Inquiries (Dedicated Page with Form, Direct Links, Copy-to-clipboard)

---

## 2. Live Demo URLs Lock
- [x] Project 01 — Time Series Data Preparation for Sales Forecasting:
  `https://sales-forecasting-intelligence.vercel.app/`
- [x] Project 02 — Credit Risk Classification & Default Prediction:
  `https://credit-risk-app-live-demo.streamlit.app/`
- [x] Project 03 — Diversified Portfolio Analysis Using Historical Market Data:
  `https://portfolio-analysis-live-demo2.ai.studio`
- [x] Project 04 — E-Commerce Database Design & Normalization:
  `https://e-commerce-database-design-109.vercel.app/`
- [x] Project 05 — Financial Statement & Ratio Analysis Dashboard:
  `https://financial-analysis-dashboard-109.streamlit.app/`

---

## 3. Academic Projects Content Snapshot
### Project 01: Time Series Data Preparation for Sales Forecasting
- **ID**: `time-series-sales-forecasting`
- **Semester**: Semester 4 · Individual Project
- **Course**: Business Data Analysis
- **Focus**: Temporal feature engineering, chronological indexing, lag variables, rolling window features, stationarity exploration, visualization
- **Key Metrics/Details**: 12-month sequence, rolling aggregates, trend & seasonality decomposition
- **Modal Component**: `TimeSeriesCaseStudyModal` (Tabs: Overview & Problem, Workflow & Feature Engineering, Analytical Outcomes)

### Project 02: Credit Risk Classification & Default Prediction
- **ID**: `credit-risk-classification`
- **Semester**: Semester 5 · Individual Project
- **Course**: Machine Learning & Financial Risk
- **Focus**: Class imbalance mitigation, PCA dimensionality reduction, ROC-AUC optimization, confusion matrix threshold calibration
- **Key Metrics/Details**:
  - Test Accuracy: 84.7%
  - ROC-AUC Score: 0.884
  - Precision: 82.1%
  - Recall: 86.3%
  - Cross-Validation: 84.2% ± 0.8%
  - Test Sample Size: 2,400 Records
- **Modal Component**: `CreditRiskCaseStudyModal` (Tabs: Executive Brief, Machine Learning Pipeline, PCA Decomposition, Confusion Matrix & Thresholds, Model Evaluation Metrics, Business Analytics Perspective)

### Project 03: Diversified Portfolio Analysis Using Historical Market Data
- **ID**: `diversified-portfolio-analysis`
- **Semester**: Semester 6 · Individual Project
- **Course**: Financial Management
- **Focus**: CAPM framework, beta estimation ($\beta$), historical covariance matrix, SML benchmarking, PSX / KSE-100 index comparison
- **Key Metrics/Details**:
  - Fauji Fertilizer (FFC): Return 28.5%, Beta 0.82
  - Lucky Cement (LUCK): Return 31.2%, Beta 1.15
  - Pakistan Petroleum (PPL): Return 22.4%, Beta 1.05
  - Habib Bank (HBL): Return 19.8%, Beta 0.78
  - KSE-100 Benchmark: Return 24.1%, Beta 1.00
  - Portfolio Beta: 0.9585
  - CAPM Required Return: 24.3373%
- **Modal Component**: `FinancialPortfolioCaseStudyModal` (Tabs: Overview, Risk-Return Matrix, Beta Analysis, SML Plot, Portfolio Construction)

### Project 04: E-Commerce Database Design & Normalization
- **ID**: `ecommerce-database-design`
- **Semester**: Semester 3 · Individual Project
- **Course**: Database Systems
- **Focus**: Relational schema architecture, 1NF/2NF/3NF normal forms, ER modeling, foreign key constraints
- **Key Metrics/Details**:
  - 9 unnormalized tables transformed into 19 normalized 3NF entities
  - Resolved transitive and partial functional dependencies
  - Lookup tables: payment methods, order statuses, carriers
- **Modal Component**: `EcommerceDatabaseCaseStudyModal` (Tabs: Executive Overview, 1NF·2NF·3NF Journey, 19 Normalized Entities, ERD & Cardinality, Keys & Data Integrity)

### Project 05: Financial Statement & Ratio Analysis Dashboard
- **ID**: `financial-ratio-analysis-dashboard`
- **Semester**: Semester 5 · Individual Project
- **Course**: Business Finance & Financial Accounting
- **Focus**: DuPont 3-stage & 5-stage decomposition, liquidity ratios, solvency ratios, profitability margins
- **Key Metrics/Details**:
  - Net Profit Margin, Asset Turnover, Financial Leverage Multiplier
  - Comparative year-over-year DuPont trend charts
- **Modal Component**: `FinancialRatioCaseStudyModal` (Tabs: Overview, Liquidity, Solvency, Profitability, DuPont Decomposition)

---

## 4. Experience & Credentials Text Snapshot
- **Pathway Badge**: `Professional pathway`
- **Title**: `Experience & Practicum`
- **Subtitle**: `A developing professional profile focused on applying business analytics, data tools, and structured problem-solving in practical environments.`
- **Statement**: `Currently seeking internship and entry-level opportunities in Data Analytics and Business Intelligence.`
- **Availability Status**: `Open to professional opportunities`
- **Core Capabilities**:
  - Excel: Data analysis & reporting
  - SQL: Basic–intermediate querying
  - Python: Pandas & NumPy workflows
  - Power BI: Dashboards & KPI reporting
- **Focus Areas**:
  - Data preparation & cleaning
  - KPI analysis & reporting
  - Business intelligence workflows
  - Analytical problem solving
- **Credentials Badge**: `Professional Credentials`
- **Credentials Title**: `Certifications`
- **Notice**: `Certifications will be added as I complete relevant professional courses and credentials.`
- **Planned Credentials**:
  - Power BI Analytics
  - Advanced SQL
  - Python for Data Analysis
- **Transparency Note**: `Only completed and verifiable certifications should be listed as credentials. Courses and learning pathways remain clearly marked as in progress until formally completed.`

---

## 5. Profile & Education Snapshot
- **Name**: Muhammad Abubakar
- **Professional Title**: Business Data Analyst
- **Degree**: Bachelor of Science in Business Data Analytics (BS BDA)
- **University**: COMSATS University Islamabad
- **Current Progress**: Semester 6 · Junior undergraduate year
- **Location**: Islamabad, Pakistan
- **Core Toolkit**: Excel, SQL, Python, Power BI
- **Email**: aliraza954554@gmail.com
- **Phone**: +92 344 6022880

---

## 6. Functional Modals & Utilities Lock
- [x] **Resume Modal (`ResumeModal`)**: View and download full resume data, PDF download, course timeline, and key competencies.
- [x] **AI Portfolio Assistant (`AskPortfolioModal`)**: Interactive Gemini-powered Q&A assistant explaining Abubakar's projects, coursework, and technical skills with pre-populated prompts.
- [x] **Portfolio Data Editor (`EditDataDrawer`)**: Client-side data management drawer allowing live updates to profile, education, project details, with JSON export and reset.

