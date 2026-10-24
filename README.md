# NextGen AICTE Approval Workflow & Compliance Monitoring Platform
### Smart India Hackathon (SIH 2025/2026) Submission

[![Live Demo](https://img.shields.io/badge/Live%20Demo-aicte--sentinel.vercel.app-2ea44f?style=for-the-badge&logo=vercel)](https://aicte-sentinel.vercel.app)
[![GitHub Repo](https://img.shields.io/badge/GitHub-Legend--1s--here%2FSentinel-181717?style=for-the-badge&logo=github)](https://github.com/Legend-1s-here/Sentinel)

> **A GIGW 3.0-compliant, bilingual (English ⟷ हिन्दी) web platform modernizing the All India Council for Technical Education (AICTE) Approval Process Handbook (APH 2024–27) workflow, regional SLA monitoring, 30-year statutory land lease continuous compliance, and tamper-proof SHA-256 audit trails.**

---

### 🌐 Live Production URL: **[https://aicte-sentinel.vercel.app](https://aicte-sentinel.vercel.app)**
### 📂 GitHub Repository: **[https://github.com/Legend-1s-here/Sentinel](https://github.com/Legend-1s-here/Sentinel)**

---

## 🏛️ Executive Summary

Every year, AICTE evaluates over 10,000 engineering, management, and polytechnic institutions for **New Institution Approvals, Extension of Approval (EoA), Intake Variations, and Closure**. 

This platform solves the core bottlenecks in current administrative processes:
1. **Multi-Stage Automated Workflow Routing:** Transitions applications through Scrutiny ➔ Expert Visit Committee (EVC) ➔ Standing Appellate Committee (SAC) without human email bottlenecks or manual dispatch delays.
2. **Interactive SVG Pan-India Regional Heatmap:** Real-time geospatial oversight across all 8 AICTE Regional Offices (RO Kanpur, Mumbai, Chennai, Bengaluru, Bhopal, Kolkata, Chandigarh, Guwahati) with automated Level-2 escalation alerts when regional backlogs breach 10-day NeSDA SLAs.
3. **Continuous 30-Year Land Lease Compliance Sentinel:** Proactive background tracking with automated cascading triggers at **T-90, T-60, T-30, and T-7 Days** preventing silent lapse of institutional legal validity.
4. **Tamper-Proof SHA-256 Cryptographic Audit Ledger:** Immutable, append-only blockchain-style transaction trail preserving every scrutiny observation, deficiency revert, and digital signature under DPDP Act 2023.
5. **Official Printable AICTE Approval Order (EoA):** Instant generation of authentic Government of India decrees with Ashoka Stambh, AICTE Human Figure Emblem, sanctioned intake matrix, and verifiable cryptographic QR code.
6. **Bilingual Rajbhasha Hindi & English Support:** Full GIGW 3.0 accessibility standard with live font size scaling (A- / A / A+) and complete bilingual UI parity.

---

## 👥 Role-Based Access Control (RBAC) Architecture

| Role Persona | Portal Interface | Core Capabilities |
| :--- | :--- | :--- |
| **🏛️ Technical Institution** | Principal / Registrar Portal | View 4-stage application progress, review formal scrutiny deficiency reverts, upload state-endorsed rectified certificates, manage 30-year registered lease vault, and download printable EoA order. |
| **📋 Regional Scrutiny Officer** | RO Kanpur Workbench | Review institutional submissions against APH Chapter 1 & 2 checklists, issue formal deficiency reverts citing specific regulatory clauses, and digitally approve applications with Aadhaar e-Sign to auto-forward to EVC. |
| **🔍 EVC Inspection Panel** | Expert Committee Portal | Inspect physical campus infrastructure, simulate geo-tagged timestamped photo uploads, evaluate 6-point compliance checklist, and submit digitally authenticated inspection reports. |
| **📊 Bureau Head / Apex Authority** | New Delhi HQ Console | Pan-India command oversight, interactive SVG regional pendency heatmap, hierarchical Level-2 SLA breach escalation directives, and statutory show-cause dispatches. |
| **⚙️ System Admin & Policy Desk** | APH JSON Rule Configurator | Dynamic zero-downtime policy rule configurator to update yearly handbook parameters (SLA days, inspection triggers) and inspect immutable SHA-256 audit ledger. |

---

## 🚀 Quick Start Guide

### Prerequisites
- Node.js (v18.0.0 or higher recommended)
- npm or yarn

### Installation & Run

```bash
# 1. Clone repository & navigate to portal directory
cd aicte-portal

# 2. Install dependencies
npm install

# 3. Start local development server
npm run dev

# 4. Open in browser
http://localhost:5173/
```

### Production Build
```bash
npm run build
npm run preview
```

---

## ⏱️ 4-Minute Winning SIH Demo Script (Judge Walkthrough)

The application includes a built-in **"One-Click Guided Demo Tour"** HUD (bottom-right button) that guides presenters step-by-step with a 4:00 timer, talking points, and automated action buttons:

- **Minute 1: GIGW 3.0 Compliance & Institution Intake**
  - Demonstrate authentic AICTE header with Ashoka Stambh, human figure emblem, and tricolor national stripe.
  - Switch language to **हिन्दी** to demonstrate complete bilingual capability.
  - Review Aryavart Institute of Technology (`APP-2025-0842`) and its 4-stage progress tracker.

- **Minute 2: Dynamic Deficiency Loop & Auto-Leap to EVC**
  - Switch to **Regional Scrutiny Officer (RO Kanpur)**.
  - Flag an expired Fire Safety NOC citing **APH Chapter 2, Clause 4.1**.
  - Switch to **Institution** portal: witness the immediate urgent red deficiency alert banner. Upload certified renewal copy.
  - Switch to **Officer**: approve with Aadhaar e-Sign. The application **automatically leaps to the EVC Inspection Panel** without manual routing.

- **Minute 3: Interactive SVG Pan-India Heatmap & Bureau Escalation**
  - Switch to **Bureau Head (HQ New Delhi)**.
  - Hover over the **Northern Region (RO Kanpur)** on the SVG map: it glows in vivid red with **14 SLA breaches** exceeding the 10-day benchmark.
  - Hover over the **Western Region (RO Mumbai)**: glows in emerald green with **0 breaches**.
  - Click *"Trigger Apex Bureau Escalation"* to dispatch automated Level-2 hierarchical warnings via SMS and official email.

- **Minute 4: 30-Year Lease Sentinel, Audit Ledger & Official EoA Order**
  - Open **Compliance Sentinel**: Kashi Institute has only 28 days remaining on its 30-year lease with seat expansion locked.
  - Click *"Simulate Renewal Upload"*: validity extends to 2056 and automated sanction lock is revoked.
  - Open **Tamper-Proof Audit Trail**: every action taken during the demo is cryptographically stamped with parent hash linkage.
  - Click **[📄 Official EoA Letter]**: present the authentic Government of India Extension of Approval order with Ashoka Stambh, sanctioned intake table, and interactive verifiable QR Code!

---

## 🛡️ Statutory Compliance & Technology Stack

- **Frontend:** React 19, Vite, Tailwind CSS v4, Lucide Icons
- **Cryptographic Security:** SHA-256 chained state digest with parent hash validation
- **Standards:** GIGW 3.0 (Guidelines for Indian Government Websites), DPDP Act 2023, IT Act 2000 Section 43A
- **Regulatory Framework:** AICTE Approval Process Handbook (APH 2024–27), National e-Governance Service Delivery Assessment (NeSDA)
