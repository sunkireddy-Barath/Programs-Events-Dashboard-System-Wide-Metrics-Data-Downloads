Google Summer of Code 2026 Proposal

# Staff Dashboard - Wikimedia Programs & Events

A polished and professional React-based administrative dashboard for Wikimedia staff. This project provides a centralized interface for monitoring global program metrics and performing system-wide data exports.

## 🏗️ System Architecture (Top-to-Bottom)

The architecture is designed for modularity and scalability, following a clear data-down flow.

```mermaid
graph TD
    %% Main Entry
    Dashboard["🖥️ STAFF DASHBOARD (Container)"]
    
    %% Style the nodes
    style Dashboard fill:#3a6fa8,stroke:#1a1a1a,stroke-width:4px,color:#fff,font-weight:bold

    subgraph "User Interaction Layer"
        Filters["🔍 PROGRAM FILTERS"]
        Export["📥 CSV EXPORT SYSTEM"]
    end

    subgraph "Data Visualization Layer"
        Metrics["📊 KEY METRIC CARDS"]
        Charts["📈 TREND ANALYSIS CHARTS"]
    end

    %% Connections
    Dashboard ==>|State Management| Filters
    Dashboard ==>|Data Props| Metrics
    Dashboard ==>|Data Props| Charts
    Dashboard ==>|Action Trigger| Export

    %% Style Subgraphs
    style Filters fill:#fff,stroke:#3a6fa8,stroke-width:2px,font-weight:bold
    style Export fill:#fff,stroke:#3a6fa8,stroke-width:2px,font-weight:bold
    style Metrics fill:#fff,stroke:#3a6fa8,stroke-width:2px,font-weight:bold
    style Charts fill:#fff,stroke:#3a6fa8,stroke-width:2px,font-weight:bold
```

## 🚀 Quick Setup
1. **Clone & Install**: `npm install`
2. **Launch Dashboard**: `npm run dev`

## 📁 Repository Structure
- **`src/components/`**: Modular React components for a clean, maintainable interface.
- **`src/style.css`**: Centralized, human-crafted CSS following Wikipedia's design system.
- **`src/main.jsx`**: Main application entry point using React 18.

---
*Developed with a focus on simplicity, cleanliness, and performance for the WikiEdu GSoC 2026 proposal.*
