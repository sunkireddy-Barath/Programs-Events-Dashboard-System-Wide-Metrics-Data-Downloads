# Programs-Events-Dashboard-System-Wide-Metrics-Data-Downloads
This project improves the Programs &amp; Events Dashboard by adding a secure staff dashboard for viewing metrics and downloading program data. It automates reporting for the Wikimedia Foundation, replacing manual data requests with fast, self-service exports.


# GSoC 2026 — Programs & Events Dashboard: System-Wide Metrics & Data Downloads

[![GSoC 2026](https://img.shields.io/badge/GSoC-2026-red?logo=google&logoColor=white)](https://summerofcode.withgoogle.com/)
[![Organisation](https://img.shields.io/badge/Org-Wikimedia%20Foundation-blue)](https://www.wikimedia.org/)
[![Project Size](https://img.shields.io/badge/Size-350%20Hours-green)]()
[![Difficulty](https://img.shields.io/badge/Difficulty-Medium-orange)]()
[![Mentor](https://img.shields.io/badge/Mentor-Ragesoss-informational)]()

> **Contributor:** Sunkireddy Barath  
> **University:** Chennai Institute of Technology (B.E. Computer Science & Engineering, 2024–2028)  
> **GitHub:** [@sunkireddy-Barath](https://github.com/sunkireddy-Barath)  
> **Email:** sunkireddybarath07@gmail.com  
> **Mentors:** Ragesoss, Abishekdascs  
> **Organisation:** Wikimedia Foundation  
> **Phabricator Task:** [T415608](https://phabricator.wikimedia.org/T415608)

---

## 📌 Project Summary

The [Programs & Events Dashboard](https://outreachdashboard.wmflabs.org/) is a Ruby on Rails + React application that tracks thousands of Wikipedia editing programs — university courses, edit-a-thons, contests, and campaigns — across more than 100 language Wikis worldwide.

**The problem:** Wikimedia Foundation staff (point person: @FRomeo_WMF) need regular access to system-wide data across all programs to report impact. Today this data is generated manually upon request — a developer writes a SQL query, exports it, and sends the file. This repeats every month with no automated solution.

**This project builds that solution.**

---

## 🎯 Goals and Deliverables

### Goal 1 — Staff Data Export Endpoint

Build a secured, authenticated API endpoint (`POST /staff/export`) that enables WMF staff to download comprehensive data about all editing projects tracked in the Dashboard as a CSV file — without requiring developer intervention.

**Deliverables:**
- `StaffDataController` with `require_wmf_staff` role authentication
- `StaffDataExportJob` (Sidekiq background job) — queries DB in batches, streams CSV, emails download link
- Filters: date range, wiki language, program type
- CSV fields: program name, organiser, participants, edits, articles, bytes, wiki, dates

**Success criteria:** FRomeo_WMF can log in, select filters, click Download, and receive a CSV by email in minutes — zero developer involvement.

---

### Goal 2 — System-Wide Metrics Overhaul

Overhaul the global metrics available in the Dashboard so WMF staff can see a clear, data-driven picture of the impact Dashboard-tracked programs are making across all language Wikis worldwide.

**Deliverables:**
- `MetricsService` — computes 6 new aggregate metrics using optimised SQL with 1-hour caching
- React staff dashboard at `/staff/dashboard` — live charts, filter controls, Download button

**6 New Metrics:**
| Metric | SQL Approach |
|--------|-------------|
| Programs by type | `GROUP BY type` on courses table |
| Programs by wiki language | `GROUP BY wiki` on courses table |
| Monthly active editors | `COUNT DISTINCT` on revisions table |
| New programs per month | `GROUP BY start_date` |
| Geographic spread | `GROUP BY region` |
| Editor retention rate | Editors with > 5 edits per program |

**Success criteria:** WMF staff independently view system-wide impact by type, language, and time — page loads within 2 seconds due to caching.

---

## 🏗️ Proposed Architecture

```
┌──────────────────────────────────────────────────────┐
│                  WMF Staff Browser                   │
│   FilterPanel │ MetricsCards │ ChartsSection │ ExportPanel │
└────────────────────────┬─────────────────────────────┘
                         │ HTTP
                         ▼
┌──────────────────────────────────────────────────────┐
│              StaffDataController (Rails)             │
│   require_wmf_staff  │  metrics action  │  export action │
└──────────┬───────────────────────┬───────────────────┘
           │                       │ enqueue
           ▼                       ▼
┌──────────────────┐    ┌──────────────────────────────┐
│  MetricsService  │    │     StaffDataExportJob        │
│  Rails.cache TTL │    │  Sidekiq · find_each(500)     │
│  1-hour caching  │    │  Streaming CSV · ActionMailer │
└────────┬─────────┘    └──────────────┬───────────────┘
         │                             │
         ▼                             ▼
┌─────────────────────────────────────────────────────┐
│                      MySQL                          │
│  courses · courses_users · revisions · articles     │
└─────────────────────────────────────────────────────┘
```

---

## 🗓️ Timeline (350 Hours)

| Week | Phase | Key Work | Hours |
|------|-------|----------|-------|
| 1–2 | Community Bonding | Codebase study, finalise spec with Ragesoss | 25 |
| 3 | Design | API design, DB migration plan, UI wireframes | 25 |
| 4–5 | Auth & Controller | `wmf_staff` role, `StaffDataController`, routes, RSpec | 50 |
| 6–7 | Export Job & CSV | `StaffDataExportJob`, batching, ActionMailer, job specs | 50 |
| 8–9 | Metrics Overhaul | `MetricsService`, 6 metrics, caching, RSpec — **Mid-term** | 50 |
| 10–11 | React Frontend | Dashboard page, FilterPanel, ChartsSection, ExportPanel | 50 |
| 12 | Full Testing | RSpec + Jest, integration test, CI must pass | 25 |
| 13 | Documentation | API docs, README, CSV data dictionary | 25 |
| 14 | Buffer & Polish | Mentor feedback, edge cases, final PR submission | 25 |
| | **Total** | | **350** |

**Mid-term deliverable:** Working `/staff/metrics` endpoint — authenticated, cached, tested.  
**Final deliverable:** Full `/staff/dashboard` React page — metrics, charts, CSV export by email.

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Backend | Ruby on Rails |
| Background Jobs | Sidekiq |
| Metrics & Caching | ActiveRecord + Rails.cache |
| Frontend | React + JavaScript |
| Database | MySQL |
| Testing | RSpec (Ruby) + Jest (JavaScript) |

---

## 🤝 Prior Contributions

| PR | Status | Description |
|----|--------|-------------|
| [WikiEduDashboard #6705](https://github.com/WikiEducationFoundation/WikiEduDashboard/pull/6705) | ✅ Merged | Fixed image caption inclusion in `GetRevisionPlaintext` service |
| [WikiEduDashboard #6735](https://github.com/WikiEducationFoundation/WikiEduDashboard/pull/6735) | 🔄 Under Review | Fixed i18n deprecation warning in `fast_training_alert.jsx` |
| [FHIR Tabular Viewer #46](https://github.com/chicagopcdc/FHIR_resource_tabular_viewer/pull/46) | 🔄 Under Review | Unified `npm run dev` developer workflow |

---

## 📚 References

- [Programs & Events Dashboard](https://outreachdashboard.wmflabs.org/)
- [WikiEduDashboard GitHub](https://github.com/WikiEducationFoundation/WikiEduDashboard)
- [Phabricator Task T415608](https://phabricator.wikimedia.org/T415608)
- [CONTRIBUTING.md](https://github.com/WikiEducationFoundation/WikiEduDashboard/blob/master/CONTRIBUTING.md)
- [GSoC 2026](https://summerofcode.withgoogle.com/)

---

*This repository documents my GSoC 2026 proposal for the Wikimedia Foundation — Programs & Events Dashboard project.*
