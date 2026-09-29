import express from "express";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3000;

app.use(express.json());

// Initialize Gemini client if API key is provided
let aiClient: GoogleGenAI | null = null;
if (process.env.GEMINI_API_KEY) {
  try {
    aiClient = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  } catch (err) {
    console.warn("Could not initialize GoogleGenAI client:", err);
  }
}

// Fallback grounding responder in case API key is not available or offline
function generateGroundedFallbackResponse(userPrompt: string, data: any): string {
  const q = userPrompt.toLowerCase();
  const profile = data?.profile || {};

  if (q.includes("name") || q.includes("who is")) {
    return `${profile.name || "MUHAMMAD ABUBAKAR"} is a Business Data Analyst and 5th-Semester undergraduate studying Bachelor of Science (BS) – Business Data Analytics at COMSATS University Islamabad, Section C.`;
  }

  if (q.includes("degree") || q.includes("study") || q.includes("program") || q.includes("major")) {
    return `${profile.name || "MUHAMMAD ABUBAKAR"} is studying for a ${profile.degree || "Bachelor of Science (BS) – Business Data Analytics"} at ${profile.university || "COMSATS University Islamabad"} (${profile.campus || "Islamabad Campus"}). Current status: ${profile.currentStatus || "Currently Studying"} in the ${profile.semester || "5th Semester"}, Section ${profile.section || "C"}.`;
  }

  if (q.includes("university") || q.includes("college") || q.includes("comsats") || q.includes("campus")) {
    return `${profile.name || "MUHAMMAD ABUBAKAR"} is currently studying at ${profile.university || "COMSATS University Islamabad"} (${profile.campus || "Islamabad Campus"}), enrolled in the ${profile.semester || "5th Semester"}, Section ${profile.section || "C"}.`;
  }

  if (q.includes("objective") || q.includes("goal") || q.includes("career")) {
    return `Career Objective of ${profile.name || "MUHAMMAD ABUBAKAR"}:\n"${profile.careerObjective || "To secure an entry-level Data Analyst position where I can apply my knowledge of data analytics, business intelligence, and visualization tools to generate insights, solve business problems, and contribute to organizational growth while continuously improving my technical skills."}"`;
  }

  if (q.includes("tool") || q.includes("skill") || q.includes("python") || q.includes("sql") || q.includes("power bi") || q.includes("excel")) {
    return `Technical Skills of ${profile.name || "MUHAMMAD ABUBAKAR"}:\n• Microsoft Excel\n• SQL — Basic to Intermediate\n• Python — Pandas, NumPy\n• Power BI — Dashboards & Reporting\n• Data Cleaning & Preparation\n• Data Visualization\n• Statistical Analysis\n• Microsoft Office Suite\n(Note: In accordance with professional standards, no fabricated percentages or proficiency scores are displayed).`;
  }

  if (q.includes("credit risk") || q.includes("givemesomecredit") || q.includes("pca") || q.includes("logistic") || q.includes("ali usama") || q.includes("group project")) {
    return `Project 2: Credit Risk Analytics (Group Academic Project)
• Course & Semester: Business Data Analysis, 4th Semester (Machine Learning Coursework), COMSATS University Islamabad (Dept of Management Sciences)
• Instructor: Sir Ali Usama
• Group Members: Abdul Hadi Raja, Jeremiah Huang, Moaz Ali Taimoor, Muhammad Abubakar, Muhammad Sami Ullah
• Dataset: cs-training.csv (GiveMeSomeCredit), target SeriousDlqin2yrs (delinquency within 2 years)
• Business Problem: Exploring financial/behavioural indicators of repayment difficulty using statistical and ML techniques (academic analysis, not developed for a real lender).
• 10-Step Workflow:
  1. Data Loading & Inspection (Pandas, structure & column examination)
  2. Missing Value Handling (MonthlyIncome median, NumberOfDependents mode)
  3. Descriptive Statistics (Central tendency, spread [IQR, std], shape [skewness, kurtosis])
  4. Outlier Detection (Percentile clipping on income, IQR capping / winsorization across numerical variables)
  5. Data Visualization (Correlation heatmap, numerical boxplots, scatter plots: Age vs Income, Debt Ratio vs Income)
  6. Feature Preparation (Categorical encoding skipped for continuous schema)
  7. Linear Regression (Predicting MonthlyIncome, DebtRatio, Age; 80/20 split; R² & MSE in academic report)
  8. Logistic Regression (Binary classification on SeriousDlqin2yrs; academic ML exercise)
  9. PCA (StandardScaler standardization, n_components=0.95 explained variance)
  10. Confusion Matrix (True Positive, True Negative, False Positive, False Negative breakdown for imbalanced defaults)
• Perspective: Demonstrates analytical methods for exploring credit-risk data; not a commercial scoring system.`;
  }

  if (q.includes("time series") || q.includes("sales forecasting")) {
    return `Project 1: Time Series Data Preparation for Sales Forecasting (Individual Academic Project)
• Semester 4 • Business Data Analysis, COMSATS University Islamabad
• Tools: Python, Pandas, NumPy, Matplotlib, Seaborn
• Capabilities: Time Series • Data Preparation • Statistical Analysis • Visualization • Feature Engineering
• Focus: Structured and cleaned temporal sales data, treated missing timestamp intervals, smoothed anomalies, and engineered lag features for predictive forecasting readiness.`;
  }

  if (q.includes("financial") || q.includes("portfolio") || q.includes("fauji") || q.includes("lucky") || q.includes("kse-100") || q.includes("capm") || q.includes("sml") || q.includes("beta")) {
    return `Project 3: Diversified Portfolio Analysis Using Historical Market Data (Academic Assignment)
• Semester & Course: Semester 4 • Financial Management (Assignment #3), COMSATS University Islamabad
• Data Period: 1 January 2019 – 31 December 2025 (7-Year Historical Analysis)
• Benchmark: KSE-100 Index | Sources: Investing.com / PSX
• Companies Analyzed: Fauji Fertilizer (β=0.7010), Lucky Cement (β=1.1957), Pakistan Petroleum (β=1.4210), Habib Bank (β=1.0529)
• Academic Portfolio Allocation: FFC 30%, LUCK 30%, PPL 20%, HBL 10%, Cash 10% -> Portfolio Beta = 0.9585, Return = 19.2757%
• Combined Portfolio Beta: β = 1.0336
• CAPM Analysis: Rf = 12.0000%, Rm = 23.9366%, Market Risk Premium = 11.9366%, Required Return = 24.3373%
• Security Market Line (SML): Compares CAPM required return with reported actual return using neutral academic categories (Above SML / Below SML).
• Disclaimer: Academic financial analysis using historical market data for educational purposes. Does not constitute investment advice.`;
  }

  if (q.includes("database") || q.includes("ecommerce") || q.includes("e-commerce") || q.includes("erd") || q.includes("normalization") || q.includes("1nf") || q.includes("2nf") || q.includes("3nf") || q.includes("19 entities") || q.includes("cardinality")) {
    return `Project 4: E-Commerce Database Design & Normalization (Individual Academic Project)
• Semester & Course: Semester 3 · Database Systems, COMSATS University Islamabad
• Tools & Concepts: ERD, Relational Database Design, 1NF, 2NF, 3NF, Primary & Foreign Keys, Cardinality, Data Modeling
• Objective: Designed and normalized a relational database for a comprehensive e-commerce system covering customer management, product cataloging, inventory, orders, payments, and shipment logistics.
• Key Achievements:
  - Transformed 9 initial base tables into 19 normalized entities through the principles of 1NF, 2NF, and 3NF.
  - Resolved repeating groups, partial dependencies, and transitive dependencies.
  - Separated customer contact information and status history into dedicated entities.
  - Normalized product information by creating separate Category, Brand, and Product entities.
  - Separated order-level information from Order Items and Order Financials to improve data organization.
  - Created lookup entities for Payment Methods, Payment Statuses, Carriers, and Service Levels.
  - Defined relational cardinalities including 1:1, 1:M, and M:1 relationships.
  - Maintained 100% referential integrity with strict primary and foreign key mapping.
• 19 Normalized Entities: Customers, Customer Contact, Customer Status, Customer Status History, Address, Location, Customer Address, Category, Brand, Product, Inventory, Suppliers, Orders, Order Financials, Order Items, Payments, Payment Method, Payment Status, Shipments, Carriers, Service Levels.`;
  }

  if (q.includes("ogdc") || q.includes("mari") || q.includes("financial ratio") || q.includes("business finance") || q.includes("dupont") || q.includes("pestel") || q.includes("e&p") || (q.includes("ratio") && (q.includes("analysis") || q.includes("ppl")))) {
    return `Project 5: Financial Ratio Analysis — OGDC, PPL & MARI (Academic Assignment)
• Course & Institution: Business Finance, COMSATS University Islamabad (Department of Management Sciences)
• Period: FY 2021–2025 (Five-Year Comparative Analysis)
• Companies Analyzed: Oil & Gas Development Company Limited (OGDC), Pakistan Petroleum Limited (PPL), and Mari Petroleum Company Limited (MARI)
• Key Analytical Areas:
  1. FY2025 Snapshot:
     - Revenue: OGDC PKR 401,178m (scale leader) | PPL PKR 244,977m | MARI PKR 141,486m
     - Net Income: OGDC PKR 169,903m | PPL PKR 89,949m | MARI PKR 65,369m
     - Current Ratio: OGDC 8.97x (highest liquidity) | PPL 4.78x | MARI 2.97x
     - Return on Equity (ROE): MARI 23.87% (highest return) | PPL 12.76% | OGDC 12.60%
     - Return on Assets (ROA): MARI 15.36% | OGDC 10.27% | PPL 9.68%
     - Asset Turnover: MARI 0.33x | PPL 0.26x | OGDC 0.24x
     - Valuation: MARI trades at 9.18x P/E with PKR 54.45 EPS; OGDC trades at 4.56x P/E; PPL trades at 4.54x P/E
  2. DuPont Decomposition: ROE = Net Profit Margin × Asset Turnover × Equity Multiplier. Confirms MARI's ROE advantage stems from superior operating profit conversion (46.2% net margin) and higher asset velocity (0.33x) rather than aggressive leverage.
  3. Horizontal & Vertical Analysis: MARI expanded 5-year revenue by +122.1%; PPL holds 75.53% of its balance sheet in current assets; OGDC concentrates 57.53% in net PPE.
  4. Risk & PESTEL: 4-category risk evaluation (circular debt, depletion, oil price volatility, energy transition) and PESTEL review of Pakistan's E&P regulatory environment.
  5. Valuation Framework: Outlines a 7-step DCF framework (Historical FCF → Forecast FCF → WACC → Terminal Growth → Terminal Value → Present Value → Enterprise/Equity Value) alongside relative multiple benchmarking. Final DCF valuation requires projected cash flows and WACC assumptions.
• Skills Demonstrated: Financial Ratio Analysis, Comparative Financial Analysis, Horizontal Analysis, Vertical Analysis, DuPont Analysis, Corporate Finance, Valuation Framework, Risk Analysis, PESTEL Analysis, Financial Modeling, Market Analysis, Data Interpretation.
(Note: Per academic standards, findings are presented objectively as financial performance metrics and trade-offs, not personalized investment recommendations).`;
  }

  if (q.includes("project") || q.includes("academic project") || q.includes("work")) {
    return `Academic Projects by ${profile.name || "MUHAMMAD ABUBAKAR"}:
1. Time Series Data Preparation for Sales Forecasting (Individual Academic Project • Semester 4 • Business Data Analysis)
   - Time series preprocessing, temporal smoothing, exploratory analysis, and feature engineering for business forecasting.

2. Credit Risk Analytics (Group Academic Project • Semester 4 • Machine Learning Coursework)
   - Explored GiveMeSomeCredit dataset (cs-training.csv) using statistical analysis, visualization, Linear Regression, Logistic Regression, PCA, and confusion-matrix evaluation.
   - Team: Abdul Hadi Raja, Jeremiah Huang, Moaz Ali Taimoor, Muhammad Abubakar, Muhammad Sami Ullah. (Instructor: Sir Ali Usama).

3. Diversified Portfolio Analysis Using Historical Market Data (Academic Assignment • Semester 4 • Financial Management)
   - Evaluated 7 years of daily market returns (2019–2025) for Fauji Fertilizer, Lucky Cement, Pakistan Petroleum, and Habib Bank relative to KSE-100.
   - Covers return/risk metrics, beta estimation, portfolio construction, combined beta (1.0336), CAPM (24.3373%), and Security Market Line analysis.

4. E-Commerce Database Design & Normalization (Individual Academic Project • Semester 3 • Database Systems)
   - Conceptual and logical ERD modeling, transforming 9 initial base tables into 19 normalized 3NF entities across Customer Management, Catalog, Orders, Payments, and Shipping.

5. Financial Ratio Analysis — OGDC, PPL & MARI (Academic Assignment • Business Finance • FY2021–FY2025)
   - Five-year comparative financial analysis of Pakistan's E&P extractive majors, covering profitability, liquidity, solvency, operating efficiency, DuPont decomposition, horizontal/vertical analysis, risk, PESTEL, and valuation frameworks.`;
  }

  if (q.includes("language") || q.includes("speak") || q.includes("urdu") || q.includes("english")) {
    return `Languages:\n• English — Fluent\n• Urdu — Native`;
  }

  if (q.includes("mindset") || q.includes("workflow") || q.includes("process") || q.includes("stage")) {
    return `The analytics workflow practiced involves 7 structured stages:\n1. Collect (Data Ingestion)\n2. Clean (Data Cleaning & Preparation)\n3. Explore (Exploratory Data Analysis)\n4. Analyze (Statistical Analysis)\n5. Visualize (Data Visualization & Dashboards)\n6. Communicate (Decision-Making Clarity)\n7. Decide (Business Problem Solving).`;
  }

  if (q.includes("contact") || q.includes("email") || q.includes("phone") || q.includes("call") || q.includes("reach") || q.includes("hire") || q.includes("internship")) {
    return `You can contact ${profile.name || "MUHAMMAD ABUBAKAR"} directly via:\n• Email: ${profile.email || "aliraza954554@gmail.com"}\n• Phone: ${profile.phone || "+92 321 4719148"}\n• Location: ${profile.location || "Islamabad, Pakistan"}\nHe is actively seeking internship and entry-level opportunities in Data Analytics and Business Intelligence.`;
  }

  if (q.includes("experience") || q.includes("job") || q.includes("work experience")) {
    return `Experience Status: "Currently seeking internship and entry-level opportunities in Data Analytics and Business Intelligence." No fabricated employment history is claimed.`;
  }

  if (q.includes("certification") || q.includes("certificate")) {
    return `Certifications Status: "Certifications will be added as I complete relevant professional courses and credentials."`;
  }

  if (q.includes("gpa") || q.includes("grade") || q.includes("cgpa")) {
    return `In accordance with CV and privacy guidelines, specific GPA or grades are not published publicly. You can reach out directly via email (${profile.email || "aliraza954554@gmail.com"}) for official academic transcripts.`;
  }

  return `I am the portfolio assistant for ${profile.name || "MUHAMMAD ABUBAKAR"}. You can ask me about his degree (BS Business Data Analytics at COMSATS Islamabad, 5th Semester, Section C), career objective, technical skills (Excel, SQL [Basic to Intermediate], Python [Pandas, NumPy], Power BI [Dashboards & Reporting]), academic projects, languages (English — Fluent, Urdu — Native), or direct contact details.`;
}

// Portfolio Q&A Assistant Endpoint
app.post("/api/assistant", async (req, res) => {
  try {
    const { message, context } = req.body;

    if (!message || typeof message !== "string") {
      res.status(400).json({ error: "Missing message query" });
      return;
    }

    const trimmedMsg = message.trim();
    if (!trimmedMsg) {
      res.status(400).json({ error: "Empty message query" });
      return;
    }

    // If Gemini client is available, use server-side Gemini 3.8 Flash
    if (aiClient && process.env.GEMINI_API_KEY) {
      try {
        const profile = context?.profile || {};
        const systemPrompt = `You are "Portfolio Intelligence", the official AI portfolio guide for ${profile.name || "[Student Name]"}, a 5th-Semester Business Data Analytics student at COMSATS University Islamabad, Section C.
Your role is to answer questions from professors, recruiters, and visitors strictly and accurately based on the portfolio information provided below.

CRITICAL RULES:
1. Grounding Rule: Answer ONLY using the facts present in this context.
2. Anti-Hallucination: Do NOT invent personal details, employment history, grades/GPA, phone numbers, or achievements that are not explicitly stated.
3. Unlisted Info: If a visitor asks for information that is missing or kept as a placeholder (e.g., exact GPA, personal address, phone number), state politely that the student has not published this on the public website and recommend contacting them via email (${profile.email || "their provided email"}).
4. Persona: Professional, humble, intelligent, concise, and focused on business data analytics. Use clear bullet points when summarizing skills or projects.
5. Emphasize: Degree is BS Business Data Analytics at COMSATS University Islamabad, currently in 5th Semester, Section C.

PORTFOLIO CONTEXT:
${JSON.stringify(context || {}, null, 2)}`;

        const response = await aiClient.models.generateContent({
          model: "gemini-3.8-flash",
          contents: trimmedMsg,
          config: {
            systemInstruction: systemPrompt,
            temperature: 0.2,
          },
        });

        const reply = response.text || generateGroundedFallbackResponse(trimmedMsg, context);
        res.json({ reply, source: "gemini" });
        return;
      } catch (geminiError: any) {
        console.warn("Gemini API call failed, falling back to grounded responder:", geminiError?.message || geminiError);
      }
    }

    // Fallback grounded answer
    const fallbackAnswer = generateGroundedFallbackResponse(trimmedMsg, context);
    res.json({ reply: fallbackAnswer, source: "grounded-local" });
  } catch (error: any) {
    console.error("Assistant API error:", error);
    res.status(500).json({
      error: "Internal assistant error",
      reply: "An unexpected error occurred while processing your request. Please try asking again."
    });
  }
});

// Setup Vite in Dev or serve static in Prod
async function startServer() {
  const isProd = process.env.NODE_ENV === "production";

  if (!isProd) {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.resolve(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server listening on port ${PORT} (${isProd ? "production" : "development"})`);
  });
}

startServer().catch((err) => {
  console.error("Failed to start server:", err);
  process.exit(1);
});
