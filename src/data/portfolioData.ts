import { PortfolioData } from '../types/portfolio';

export const INITIAL_PORTFOLIO_DATA: PortfolioData = {
  profile: {
    name: "MUHAMMAD ABUBAKAR",
    professionalTitle: "Business Data Analyst",
    studentRole: "Business Data Analytics Student",
    university: "COMSATS University Islamabad",
    campus: "Islamabad Campus",
    degree: "Bachelor of Science (BS) – Business Data Analytics",
    currentStatus: "Currently Studying",
    semester: "5th Semester",
    section: "C",
    heroPitch: "Turning structured data into meaningful business insights through analysis, visualization, and statistical methods.",
    biography: "Business Data Analytics undergraduate focused on Excel, SQL, Python, and Power BI. Interested in transforming business data into actionable insights through analysis, visualization, and statistical methods.",
    careerObjective: "To secure an entry-level Data Analyst position where I can apply my knowledge of data analytics, business intelligence, and visualization tools to generate insights, solve business problems, and contribute to organizational growth while continuously improving my technical skills.",
    email: "aliraza954554@gmail.com",
    phone: "+92 321 4719148",
    location: "Islamabad, Pakistan",
    languages: [
      { language: "English", proficiency: "Fluent" },
      { language: "Urdu", proficiency: "Native" }
    ],
    linkedin: "https://linkedin.com/in/[your-profile]",
    github: "https://github.com/[your-handle]"
  },

  workflow: [
    {
      step: 1,
      name: "Collect",
      shortTitle: "01. Intake",
      subtitle: "Data Ingestion & Sourcing",
      description: "Gathering and querying internal business records, relational databases, and transactional tables with structured schemas.",
      techniques: ["SQL Queries", "Database Connections", "Tabular Extraction"],
      businessValue: "Establishes a single source of verifiable truth from raw systems.",
      deliverables: "Validated raw data extracts & schema mappings.",
      iconName: "Database"
    },
    {
      step: 2,
      name: "Clean",
      shortTitle: "02. Hygiene",
      subtitle: "Data Cleaning & Preparation",
      description: "Treating missing records, reconciling inconsistent formats, standardizing columns, and removing anomalies.",
      techniques: ["Median/Mode Imputation", "Percentile Clipping", "Data Type Normalization"],
      businessValue: "Prevents dirty data from corrupting downstream management insights.",
      deliverables: "Pristine, preprocessed datasets ready for analysis.",
      iconName: "Filter"
    },
    {
      step: 3,
      name: "Explore",
      shortTitle: "03. Discovery",
      subtitle: "Exploratory Data Analysis",
      description: "Examining distribution shapes, correlation matrices, central tendencies, and identifying initial business patterns.",
      techniques: ["Correlation Heatmaps", "Boxplots & Scatter Plots", "Descriptive Summaries"],
      businessValue: "Surfaces hidden operational behaviors before formal modeling.",
      deliverables: "EDA exploratory deck & preliminary distributions.",
      iconName: "Search"
    },
    {
      step: 4,
      name: "Analyze",
      shortTitle: "04. Modeling",
      subtitle: "Statistical Analysis & Methods",
      description: "Applying quantitative and statistical methods to test assumptions and evaluate business performance metrics.",
      techniques: ["Regression Analysis", "Classification Modeling", "Dimensionality Reduction (PCA)"],
      businessValue: "Provides objective empirical backing for managerial decisions.",
      deliverables: "Analytical calculations and model evaluation tables.",
      iconName: "Cpu"
    },
    {
      step: 5,
      name: "Visualize",
      shortTitle: "05. Synthesis",
      subtitle: "Data Visualization & Dashboards",
      description: "Translating analytical tables into intuitive visual dashboards, KPI cards, and clear visual representations.",
      techniques: ["Power BI Dashboards", "Excel Charts", "Interactive Slicers"],
      businessValue: "Enables fast visual pattern recognition for decision-makers.",
      deliverables: "Interactive executive dashboard & KPI cards.",
      iconName: "BarChart3"
    },
    {
      step: 6,
      name: "Communicate",
      shortTitle: "06. Narrative",
      subtitle: "Decision-Making Clarity",
      description: "Presenting analytical insights in plain business terms to clarify trade-offs, operational priorities, and findings.",
      techniques: ["Clear Reporting", "Executive Summaries", "Visual Storytelling"],
      businessValue: "Bridges the gap between quantitative analysis and organizational stakeholders.",
      deliverables: "Concise summary report & visual briefings.",
      iconName: "MessageSquareQuote"
    },
    {
      step: 7,
      name: "Decide",
      shortTitle: "07. Action",
      subtitle: "Business Problem Solving",
      description: "Translating data insights into informed operational decisions and measurable organizational growth.",
      techniques: ["Actionable Recommendations", "KPI Tracking", "Continuous Monitoring"],
      businessValue: "Delivers concrete business value by resolving bottlenecks.",
      deliverables: "Data-backed strategic recommendations.",
      iconName: "CheckCircle2"
    }
  ],

  skills: [
    {
      id: "excel",
      name: "Microsoft Excel",
      category: "core",
      description: "Advanced spreadsheet modeling, formulas, pivot tables, data organization, and visual reporting.",
      iconName: "FileSpreadsheet"
    },
    {
      id: "sql",
      name: "SQL",
      levelDescriptor: "Basic to Intermediate",
      category: "core",
      description: "Querying relational databases, filtering, aggregations, JOINs, and extracting structured data for analysis.",
      iconName: "Database"
    },
    {
      id: "python",
      name: "Python",
      levelDescriptor: "Pandas, NumPy",
      category: "core",
      description: "Data manipulation, automated tabular processing, numerical operations, and exploratory workflows.",
      iconName: "Code2"
    },
    {
      id: "power-bi",
      name: "Power BI",
      levelDescriptor: "Dashboards & Reporting",
      category: "bi",
      description: "Designing interactive business intelligence dashboards, KPI scorecards, visual analytics, and reports.",
      iconName: "BarChart3"
    },
    {
      id: "data-cleaning",
      name: "Data Cleaning & Preparation",
      category: "methodology",
      description: "Treating missing values, removing anomalies, normalizing records, and structuring raw data for interpretation.",
      iconName: "Filter"
    },
    {
      id: "data-viz",
      name: "Data Visualization",
      category: "methodology",
      description: "Simplifying complex datasets into clear visual encodings, interactive charts, and decision-ready dashboards.",
      iconName: "PieChart"
    },
    {
      id: "statistics",
      name: "Statistical Analysis",
      category: "methodology",
      description: "Applying quantitative and statistical methods to uncover trends, validate patterns, and extract business insights.",
      iconName: "TrendingUp"
    },
    {
      id: "ms-office",
      name: "Microsoft Office Suite",
      category: "core",
      description: "Creating professional documentation, presentations, executive summaries, and collaborative business reports.",
      iconName: "Layers"
    }
  ],

  projects: [
    {
      id: "time-series-sales",
      title: "Time Series Data Preparation for Sales Forecasting",
      category: "Time Series Analytics",
      semesterTag: "Semester 4 · Business Data Analysis · Individual Project",
      courseName: "Business Data Analysis",
      projectType: "Individual Academic Project",
      courseworkType: "Applied Data Analytics Coursework",
      tools: ["Python", "Pandas", "NumPy", "Matplotlib"],
      tags: ["Time Series Analysis", "Data Preparation", "Feature Engineering", "Statistical Analysis", "Data Visualization"],
      description: "Prepared and transformed daily sales data into a structured time-series dataset suitable for forecasting analysis. Applied time-based preprocessing, statistical techniques, visualization, and feature engineering to identify trends and prepare historical sales data for predictive modeling.",
      points: [
        "Converted transaction dates to datetime format and established a time-based index.",
        "Resampled daily sales into monthly sales data to identify broader trends.",
        "Calculated 3-month moving averages to smooth short-term fluctuations.",
        "Applied rolling mean and rolling standard deviation to examine trends and variability.",
        "Engineered lag-1 and lag-2 features for forecasting model preparation.",
        "Visualized monthly sales and rolling trends using Matplotlib."
      ],
      focus: "Time series preprocessing, temporal smoothing, exploratory analysis, and feature construction for business forecasting.",
      businessProblem: "Understanding cyclical trends and seasonal shifts in commercial sales data requires rigorous data cleansing and temporal structuring before reliable statistical or predictive models can be applied.",
      learningOutcomes: [
        "Time series data ingestion and timestamp parsing",
        "Handling missing temporal intervals and smoothing",
        "Exploratory trend and seasonality decomposition",
        "Feature engineering using lag variables and rolling windows",
        "Visualizing temporal variance for decision-makers"
      ],
      businessAnalyticsPerspective: "Demonstrates how raw operational sales logs are transformed into model-ready time-series inputs, ensuring managerial projections rest on mathematically validated data foundations."
    },
    {
      id: "credit-risk-analytics",
      title: "Credit Risk Analytics",
      category: "Machine Learning & Risk Analytics",
      semesterTag: "Semester 4 · Business Data Analysis · Group Project",
      courseName: "Business Data Analysis",
      projectType: "Group Academic Project",
      courseworkType: "Machine Learning Coursework",
      instructor: "Sir Ali Usama",
      tools: ["Python", "Pandas", "NumPy", "Scikit-learn", "Matplotlib", "Seaborn"],
      tags: [
        "EDA",
        "Statistical Analysis",
        "Data Cleaning",
        "Regression",
        "Classification",
        "PCA",
        "Data Visualization"
      ],
      description: "Analyzed credit-risk data through exploratory data analysis, descriptive statistics, visualization, regression, classification, and dimensionality reduction to investigate financial and credit-related patterns.",
      points: [
        "Inspected dataset structure, variables, and statistical characteristics.",
        "Handled missing values using median and mode imputation.",
        "Calculated mean, median, mode, variance, standard deviation, IQR, skewness, and kurtosis.",
        "Detected and capped extreme values using percentile clipping and IQR-based methods.",
        "Created correlation heatmaps, boxplots, and scatter plots to explore relationships between variables.",
        "Applied Linear Regression to investigate multiple continuous target variables.",
        "Applied Logistic Regression to classify the SeriousDlqin2yrs target.",
        "Standardized numerical features before applying PCA.",
        "Performed PCA while retaining 95% of the explained variance.",
        "Evaluated classification predictions using a confusion matrix."
      ],
      focus: "Structured credit-risk data preparation, statistical exploratory analysis, classification, and dimensionality reduction.",
      businessProblem: "Credit risk analysis involves understanding financial and behavioural characteristics that may be associated with repayment difficulties. This project used the GiveMeSomeCredit dataset to explore financial variables, identify patterns, prepare data for modelling, and examine classification and regression approaches. (Academic analysis — not developed for a real bank or commercial lender).",
      dataset: {
        filename: "cs-training.csv",
        datasetName: "GiveMeSomeCredit",
        description: "The dataset contains financial and credit-related variables and includes SeriousDlqin2yrs as a binary target representing serious delinquency within two years.",
        targetVariable: "SeriousDlqin2yrs (Binary: 0 / 1)"
      },
      groupMembers: [
        { name: "Abdul Hadi Raja", regNo: "FA22-BDA-***" },
        { name: "Jeremiah Huang", regNo: "FA22-BDA-***" },
        { name: "Moaz Ali Taimoor", regNo: "FA22-BDA-***" },
        { name: "Muhammad Abubakar", regNo: "FA22-BDA-***" },
        { name: "Muhammad Sami Ullah", regNo: "FA22-BDA-***" }
      ],
      myContribution: "Add my specific contribution here.",
      learningOutcomes: [
        "Data cleaning",
        "Missing-value treatment",
        "Descriptive statistics",
        "Outlier analysis",
        "Exploratory data analysis",
        "Data visualization",
        "Correlation analysis",
        "Linear regression",
        "Logistic regression",
        "Classification evaluation",
        "PCA",
        "Feature standardization",
        "Confusion matrix interpretation",
        "Python-based analytics workflow"
      ],
      businessAnalyticsPerspective: "The project demonstrates analytical techniques that can support exploration of credit-risk data. It does not represent a production credit-scoring system or real lending decision.",
      workflowSteps: [
        {
          stepNumber: "01",
          title: "Data Loading & Initial Inspection",
          shortSummary: "Loaded cs-training.csv with Pandas, examined structure, shapes, column names, and initial summaries.",
          details: [
            "Loaded cs-training.csv using Pandas",
            "Inspected the first rows to understand record structure",
            "Examined dataset shape to verify total features and row dimensions",
            "Reviewed column names and verified feature data types",
            "Generated preliminary descriptive summaries using .describe()"
          ],
          rationale: "Initial inspection helps understand the dataset structure, available variables, data types, and potential data-quality issues before analysis.",
          technicalHighlights: ["pd.read_csv()", "df.head()", "df.shape", "df.info()", "df.describe()"]
        },
        {
          stepNumber: "02",
          title: "Missing Value Handling",
          shortSummary: "Handled MonthlyIncome missing values with median and NumberOfDependents with mode; validated with isnull().sum().",
          details: [
            "MonthlyIncome missing values were handled using the median to mitigate skew from extreme income observations.",
            "NumberOfDependents missing values were handled using the mode, reflecting the discrete nature of household counts.",
            "Remaining missing values were verified across all columns using isnull().sum()."
          ],
          rationale: "Replacing missing income with the median prevents heavy upper-tail outliers from distorting typical income, while the mode preserves realistic integer household distributions.",
          technicalHighlights: ["df['MonthlyIncome'].fillna(median)", "df['NumberOfDependents'].fillna(mode)", "df.isnull().sum()"]
        },
        {
          stepNumber: "03",
          title: "Descriptive Statistics",
          shortSummary: "Calculated central tendency (mean, median, mode), spread (variance, std, Q1, Q3, IQR), and distribution shape (skewness, kurtosis).",
          details: [
            "Central Tendency: Computed Mean, Median, and Mode for numerical attributes.",
            "Measures of Spread: Calculated Variance, Standard Deviation, First Quartile (Q1), Third Quartile (Q3), and Interquartile Range (IQR).",
            "Distribution Shape: Evaluated Skewness and Kurtosis to quantify asymmetry and tail heaviness across credit variables."
          ],
          rationale: "These techniques were used to understand the center, spread, distribution shape, and potential unusual observations in numerical variables.",
          technicalHighlights: ["Central Tendency", "Spread (IQR, Std Dev)", "Shape (Skewness, Kurtosis)"]
        },
        {
          stepNumber: "04",
          title: "Outlier Detection & Capping",
          shortSummary: "Employed percentile clipping for MonthlyIncome and IQR-based capping for numerical variables.",
          details: [
            "Percentile clipping was used to limit extreme MonthlyIncome values.",
            "IQR approach (Q1 - 1.5*IQR to Q3 + 1.5*IQR) was used to identify and cap extreme values across numerical variables.",
            "Utilized disciplined capping / clipping / winsorization rather than blind record deletion to preserve observational weight."
          ],
          rationale: "Percentile clipping was used to limit extreme MonthlyIncome values, while the IQR approach was used to identify and cap extreme values across numerical variables.",
          technicalHighlights: ["Percentile Clipping", "IQR Boundary Capping", "Winsorization Discipline"]
        },
        {
          stepNumber: "05",
          title: "Data Visualization",
          shortSummary: "Constructed Correlation Heatmap, numerical Boxplots, and scatter plots (Age vs Monthly Income, Debt Ratio vs Monthly Income).",
          details: [
            "Correlation Heatmap: Assessed multi-variable linear associations across financial indicators.",
            "Boxplots of Numerical Variables: Visualized quartiles, whiskers, and distribution spread across features.",
            "Age vs Monthly Income Scatter Plot: Investigated age-dependent earnings distribution and leverage points.",
            "Debt Ratio vs Monthly Income Scatter Plot: Examined leverage and debt accumulation behaviors across income brackets."
          ],
          rationale: "Visualizations provide essential qualitative intuition on distributions, collinearity, and co-movements prior to statistical modeling.",
          technicalHighlights: ["sns.heatmap()", "sns.boxplot()", "plt.scatter(Age, Income)", "plt.scatter(DebtRatio, Income)"]
        },
        {
          stepNumber: "06",
          title: "Feature Preparation",
          shortSummary: "Evaluated feature encoding requirements; categorical encoding was intentionally skipped for numerical attributes.",
          details: [
            "Evaluated the schema for potential categorical variables requiring dummy encoding or one-hot transformations.",
            "In this project, encoding was skipped because the analysed variables were numerical and no meaningful categorical encoding was required for the described modelling workflow."
          ],
          rationale: "Avoiding unnecessary encoding transformations preserved mathematical interpretability and avoided artificial dimensional expansion.",
          technicalHighlights: ["Numerical Schema Validation", "Direct Continuous Pass-Through"]
        },
        {
          stepNumber: "07",
          title: "Linear Regression Analysis",
          shortSummary: "Trained linear regression models for predicting MonthlyIncome, DebtRatio, and Age with 80/20 train-test splits.",
          details: [
            "Target A: Predicting MonthlyIncome based on associated financial features.",
            "Target B: Predicting DebtRatio based on credit utilization and balance metrics.",
            "Target C: Predicting age based on credit history length and related attributes.",
            "Methodology: Conducted feature/target separation, partitioned data with an 80/20 train-test split, trained models, and evaluated predictions using R² Score and Mean Squared Error (MSE)."
          ],
          rationale: "Linear Regression was used to investigate relationships between numerical target variables and other available features. Evaluation results available in the original academic report.",
          technicalHighlights: ["Train/Test Split (80/20)", "LinearRegression()", "R² Score & MSE Evaluation"]
        },
        {
          stepNumber: "08",
          title: "Logistic Regression (Classification)",
          shortSummary: "Modelled binary credit default risk target SeriousDlqin2yrs with train/test validation.",
          details: [
            "Target Variable: SeriousDlqin2yrs (binary classification for serious delinquency within two years).",
            "Methodology: Separated features from target class, applied train/test splitting, fitted Logistic Regression, and evaluated binary predictions.",
            "Academic Context: Logistic Regression was used as a binary classification approach to examine whether the target class could be predicted from the available financial and credit-related features. This is an academic machine-learning exercise."
          ],
          rationale: "Logistic regression models the log-odds of delinquency as a linear combination of financial predictors, providing a classic benchmark for credit risk classification.",
          technicalHighlights: ["LogisticRegression()", "Binary Classification", "Academic Validation Benchmark"]
        },
        {
          stepNumber: "09",
          title: "Principal Component Analysis (PCA)",
          shortSummary: "Applied StandardScaler standardization and PCA configured to retain 95% cumulative explained variance.",
          details: [
            "Feature Standardization: Applied StandardScaler before decomposition to ensure equal variance weighting.",
            "PCA Decomposition: Configured PCA with n_components=0.95 to capture 95% of total dataset variance.",
            "Evaluated cumulative explained variance curve across orthogonal principal components.",
            "Standardization rationale: Standardization is critical before PCA so that features measured in large units (such as income) do not artificially dominate principal directions."
          ],
          rationale: "Principal Component Analysis (PCA) was used as a dimensionality-reduction technique to reduce multicollinearity while retaining 95% of information.",
          technicalHighlights: ["StandardScaler()", "PCA(n_components=0.95)", "Cumulative Explained Variance"]
        },
        {
          stepNumber: "10",
          title: "Confusion Matrix & Evaluation",
          shortSummary: "Structured True Positive, True Negative, False Positive, and False Negative matrix analysis for imbalanced classes.",
          details: [
            "Detailed classification breakdown across True Positive (TP), True Negative (TN), False Positive (FP), and False Negative (FN).",
            "Evaluated the asymmetric business cost of Type I (false alarm) versus Type II (missed default) credit errors.",
            "Emphasized why a confusion matrix provides more granular insight than overall accuracy alone when credit delinquency target classes are heavily imbalanced."
          ],
          rationale: "In credit risk, accuracy can be misleading due to low default incidence; confusion matrices reveal true sensitivity and precision.",
          technicalHighlights: ["confusion_matrix()", "TP / TN / FP / FN Diagnostics", "Imbalanced Class Evaluation"]
        }
      ]
    },
    {
      id: "financial-portfolio-analysis",
      title: "Diversified Portfolio Analysis Using Historical Market Data",
      subtitle: "Portfolio Analysis — Fauji Fertilizer, Lucky Cement, Pakistan Petroleum & Habib Bank",
      category: "Financial Analytics & Portfolio Management",
      semesterTag: "Semester 4 • Financial Management",
      courseName: "Financial Management",
      projectType: "Academic Assignment",
      courseworkType: "Financial Management — Assignment #3",
      dataPeriod: "1 January 2019 – 31 December 2025 (7-Year Historical Analysis)",
      benchmark: "KSE-100",
      dataSources: "Investing.com / PSX",
      disclaimer: "Academic financial analysis using historical market data. This project is for educational purposes and does not constitute investment advice.",
      tools: ["Excel", "Financial Modeling", "CAPM", "Statistical Analysis", "Regression Analysis", "Data Visualization"],
      tags: [
        "Financial Data Analysis",
        "Return Calculation",
        "Risk Measurement",
        "Standard Deviation",
        "Coefficient of Variation",
        "Beta Estimation",
        "Regression Analysis",
        "R² Analysis",
        "Portfolio Construction",
        "Portfolio Weighting",
        "CAPM",
        "Security Market Line",
        "Excel Financial Analysis",
        "Historical Market Data Analysis",
        "Data Visualization"
      ],
      description: "Analyzed historical stock returns, risk measures, beta, portfolio weights, CAPM, and Security Market Line relationships using seven years of market data.",
      points: [
        "Analyzed historical return and risk characteristics of Fauji Fertilizer, Lucky Cement, Pakistan Petroleum, and Habib Bank relative to the KSE-100.",
        "Estimated individual stock betas, alphas, and R² metrics using Excel SLOPE, INTERCEPT, and RSQ regression functions.",
        "Constructed an academic portfolio allocation (FFC 30%, LUCK 30%, PPL 20%, HBL 10%, Cash 10%) yielding a weighted beta of 0.9585 and return of 19.2757%.",
        "Calculated combined portfolio beta (1.0336), CAPM required returns (24.3373%), and conducted Security Market Line (SML) comparison."
      ],
      focus: "Historical equity returns, regression beta estimation, portfolio weighting, CAPM required returns, and Security Market Line analysis.",
      businessProblem: "Understanding the empirical relationship between historical market risk (beta) and expected return allows structured assessment of portfolio diversification benefits in emerging equity markets.",
      learningOutcomes: [
        "Financial Data Analysis",
        "Return Calculation",
        "Risk Measurement",
        "Standard Deviation",
        "Coefficient of Variation",
        "Beta Estimation",
        "Regression Analysis",
        "R² Analysis",
        "Portfolio Construction",
        "Portfolio Weighting",
        "CAPM",
        "Security Market Line",
        "Excel Financial Analysis",
        "Historical Market Data Analysis",
        "Data Visualization"
      ],
      businessAnalyticsPerspective: "Through this academic assignment, I applied quantitative techniques to examine historical stock returns, market sensitivity, portfolio composition, and CAPM-based required returns. The project strengthened my understanding of how financial data can be transformed into quantitative measures that support structured portfolio analysis."
    },
    {
      id: "ecommerce-database-design",
      title: "Project 04 — E-Commerce Database Design & Normalization",
      subtitle: "Relational Database Design & 3NF Normalization for Comprehensive E-Commerce System",
      category: "Database Systems & Data Architecture",
      semesterTag: "Semester 3 · Database Systems · Individual Academic Project",
      courseName: "Database Systems",
      projectType: "Individual Academic Project",
      courseworkType: "Database Systems Coursework",
      tools: ["ERD", "Relational Database Design", "1NF", "2NF", "3NF", "Primary & Foreign Keys", "Cardinality", "Data Modeling"],
      tags: [
        "Database Design",
        "ER Modeling",
        "Relational Data Modeling",
        "Database Normalization",
        "1NF",
        "2NF",
        "3NF",
        "Primary & Foreign Keys",
        "Cardinality",
        "Data Integrity",
        "E-Commerce Data Architecture"
      ],
      description: "Designed and normalized a relational database for a comprehensive e-commerce system covering customer management, product cataloging, inventory, orders, payments, and shipment logistics.",
      points: [
        "Designed a conceptual and logical Entity-Relationship Diagram (ERD) for an e-commerce business.",
        "Transformed 9 initial base tables into 19 normalized entities through the principles of 1NF, 2NF, and 3NF.",
        "Identified and resolved repeating groups, partial dependencies, and transitive dependencies.",
        "Separated customer contact information and status history into dedicated entities.",
        "Normalized product information by creating separate Category, Brand, and Product entities.",
        "Designed relationships for customers, addresses, products, inventory, suppliers, orders, payments, and shipments.",
        "Separated order-level information from Order Items and Order Financials to improve data organization.",
        "Created lookup entities for Payment Methods, Payment Statuses, Carriers, and Service Levels.",
        "Defined relational cardinalities including 1:1, 1:M, and M:1 relationships.",
        "Applied primary and foreign key concepts to maintain referential integrity and structured relationships.",
        "Documented the normalization process from the original database structure through the final logical model."
      ],
      focus: "Relational schema architecture, eliminating functional and transitive dependencies, ER modeling, and 3NF database normalization.",
      businessProblem: "Monolithic, un-normalized transactional databases suffer from severe update, insertion, and deletion anomalies, data redundancy, and weak referential integrity. Transforming flat tables into structured 3NF entities ensures reliable transaction processing, auditable financials, and scalable business data operations.",
      learningOutcomes: [
        "Database Design",
        "ER Modeling",
        "Relational Data Modeling",
        "Database Normalization",
        "1NF",
        "2NF",
        "3NF",
        "Primary & Foreign Keys",
        "Cardinality",
        "Data Integrity",
        "E-Commerce Data Architecture"
      ],
      businessAnalyticsPerspective: "Designing and normalizing a relational database for a comprehensive e-commerce system covering customer management, product cataloging, inventory, orders, payments, and shipment logistics. Demonstrates mastery of database architecture, relational normal forms, cardinality rules, and referential constraints."
    },
    {
      id: "financial-ratio-analysis",
      title: "Financial Ratio Analysis — OGDC, PPL & MARI",
      subtitle: "Five-Year Comparative Financial Analysis, DuPont Decomposition & Valuation Framework",
      category: "Corporate Finance & Financial Analysis",
      semesterTag: "Business Finance · FY 2021–2025 · Academic Assignment",
      courseName: "Business Finance",
      projectType: "Academic Assignment",
      courseworkType: "Business Finance Coursework",
      dataPeriod: "FY 2021–2025 (5-Year Comparative Analysis)",
      benchmark: "Exploration & Production (E&P) Sector Benchmark",
      dataSources: "OGDC, PPL & MARI Annual Reports / PSX",
      disclaimer: "Academic financial analysis using historical annual report data (FY2021–FY2025). This project is for educational purposes and does not constitute investment advice.",
      tools: [
        "Financial Ratio Analysis",
        "Comparative Financial Analysis",
        "Horizontal Analysis",
        "Vertical Analysis",
        "DuPont Analysis",
        "Corporate Finance",
        "Valuation",
        "Risk Analysis",
        "PESTEL Analysis",
        "Financial Modeling",
        "Market Analysis",
        "Data Interpretation"
      ],
      tags: [
        "Financial Ratio Analysis",
        "Comparative Financial Analysis",
        "Horizontal Analysis",
        "Vertical Analysis",
        "DuPont Analysis",
        "Corporate Finance",
        "Valuation",
        "Risk Analysis",
        "PESTEL Analysis",
        "Financial Modeling",
        "Market Analysis",
        "Data Interpretation"
      ],
      description: "Conducted five-year comparative financial ratio analysis, horizontal and vertical common-size decomposition, DuPont analysis, and valuation benchmarking across Pakistan's major E&P companies: OGDC, PPL, and MARI.",
      points: [
        "Evaluated 5 years of financial performance (FY2021–FY2025) across liquidity, solvency, operating efficiency, profitability, and market multiples for OGDC, PPL, and MARI.",
        "Constructed an interactive FY2025 benchmark dashboard distinguishing firm scale (OGDC PKR 401B revenue) from return efficiency (MARI 23.87% ROE).",
        "Conducted three-step DuPont analysis decomposing Return on Equity into Net Profit Margin, Asset Turnover, and Equity Multiplier across all five years.",
        "Executed horizontal growth analysis (+122.1% MARI revenue growth) and vertical common-size analysis across income statement and balance sheet structures.",
        "Formulated a 4-category financial and industry risk assessment along with a structured PESTEL analysis of Pakistan's E&P energy sector.",
        "Synthesized a 7-step DCF valuation framework alongside relative multiple benchmarking (P/E, EPS, Dividend Yield) without fabricating unsupported forecasts."
      ],
      focus: "Comparative financial ratios, DuPont decomposition, horizontal/vertical financial statement analysis, risk analysis, PESTEL framework, and DCF methodology.",
      businessProblem: "Assessing enterprise performance in capital-intensive extractive industries requires distinguishing raw operational scale from capital efficiency, liquidity buffers, and commodity-price sensitivity.",
      learningOutcomes: [
        "Financial Ratio Analysis",
        "Comparative Financial Analysis",
        "Horizontal Analysis",
        "Vertical Analysis",
        "DuPont Analysis",
        "Corporate Finance",
        "Valuation Framework",
        "Risk Analysis",
        "PESTEL Analysis",
        "Financial Modeling",
        "Market Multiples",
        "Data Interpretation"
      ],
      businessAnalyticsPerspective: "Applied structured corporate finance methodologies to compare multi-year audited statements across different corporate scales in Pakistan's energy sector. Demonstrates competency in ratio analysis, balance sheet decomposition, operational risk evaluation, and neutral financial reporting."
    }
  ],

  education: {
    institution: "COMSATS University Islamabad",
    campus: "Islamabad Campus",
    degree: "Bachelor of Science (BS) – Business Data Analytics",
    currentStatus: "Currently Studying",
    semester: "5th Semester",
    section: "C",
    overview: "Undergraduate curriculum bridging business management, quantitative statistical techniques, database systems, and data analytics tools."
  },

  experienceStatement: "Currently seeking internship and entry-level opportunities in Data Analytics and Business Intelligence.",

  certificationsNotice: "Certifications will be added as I complete relevant professional courses and credentials.",

  achievementsNotice: "Achievements and academic milestones will be added as they are attained.",

  creditRiskContribution: "Add my specific contribution here.",

  showRegistrationNumbers: false
};

const STORAGE_KEY = "abubakar_bda_portfolio_v6";

export function loadSavedPortfolioData(): PortfolioData {
  if (typeof window === "undefined") {
    return INITIAL_PORTFOLIO_DATA;
  }
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      return {
        ...INITIAL_PORTFOLIO_DATA,
        ...parsed,
        profile: { ...INITIAL_PORTFOLIO_DATA.profile, ...(parsed.profile || {}) },
        education: { ...INITIAL_PORTFOLIO_DATA.education, ...(parsed.education || {}) },
        projects: INITIAL_PORTFOLIO_DATA.projects.map((proj) => {
          if (proj.id === "credit-risk-analytics") {
            return {
              ...proj,
              myContribution: parsed.creditRiskContribution || proj.myContribution,
              showRegNumbers: parsed.showRegistrationNumbers ?? false
            };
          }
          return proj;
        })
      };
    }
  } catch (err) {
    console.warn("Failed to load saved portfolio data", err);
  }
  return INITIAL_PORTFOLIO_DATA;
}

export function savePortfolioData(data: PortfolioData): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (err) {
    console.error("Failed to save portfolio data", err);
  }
}

export function resetPortfolioData(): PortfolioData {
  if (typeof window !== "undefined") {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
  }
  return INITIAL_PORTFOLIO_DATA;
}
