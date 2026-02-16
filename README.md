# The Device — Offline Adaptive Learning Kiosk

A full-stack Next.js application for managing solar-powered, offline adaptive learning kiosks in rural India.

## Project Overview

"The Device" is a robust platform designed to bridge the digital divide. It consists of:
1.  **Marketing Portal**: Public-facing pages to raise awareness and attract partners.
2.  **Management Dashboard**: Tools for teachers and admins to track student progress, device health, and sync logs.
3.  **Data Synchronization**: A system to ingest data from offline kiosks when they find connectivity.

## Tech Stack

-   **Framework**: Next.js 14+ (App Router)
-   **Language**: TypeScript
-   **Styling**: Tailwind CSS (v4) + Shadcn/ui (custom implementation)
-   **Database**: PostgreSQL (via Prisma)
-   **Auth**: NextAuth.js v5
-   **State**: Zustand + React Query
-   **Visualization**: Recharts + Framer Motion

## Getting Started

1.  **Install Dependencies**:
    ```bash
    npm install
    ```

2.  **Database Setup**:
    ```bash
    # Run migrations
    npx prisma migrate dev --name init

    # Seed the database (Essential for demo data)
    npx prisma db seed
    ```

3.  **Run Development Server**:
    ```bash
    npm run dev
    ```

4.  **Access the App**:
    -   **Landing Page**: `http://localhost:3000`
    -   **Dashboard**: `http://localhost:3000/dashboard`
    -   **Login**: `http://localhost:3000/login`

## Troubleshooting

### `EPERM: operation not permitted` when running `prisma generate`

This happens on Windows when another process (usually the Next.js dev server) has the Prisma query engine DLL loaded, so Prisma cannot replace it.

**Fix:**
1. Stop any running dev server (`npm run dev`) and other terminals that use this project.
2. Run `npx prisma generate` again.
3. If it still fails, remove the generated client and regenerate (with all Node processes stopped):
   ```bash
   Remove-Item -Recurse -Force node_modules\.prisma
   npx prisma generate
   ```

## Demo Credentials

Use these accounts to explore the dashboard:

| Role | Email | Password |
| :--- | :--- | :--- |
| **Admin** | `admin@project.org` | `admin123` |
| **Teacher** | `teacher@project.org` | `teacher123` |

## Key Features

-   **Skill Tree Visualization**: Interactive view of student mastery paths (`/students/[id]`).
-   **Device Telemetry**: Real-time power and battery monitoring charts (`/devices/[id]`).
-   **Offline Sync Simulation**: Dashboard to view logs from "offline" sync events.
-   **Moderation Queue**: Workflow for teachers to review visual/audio submissions.
-   **Responsive Design**: Mobile-friendly interface optimized for low-bandwidth environments.

## Design System

The UI uses a custom "Earth & Sun" theme:
-   **Ochre (`#C8893A`)**: Represents the sun and earth.
-   **Terracotta (`#B84C27`)**: Represents traditional craftsmanship.
-   **Forest (`#2D5016`)**: Represents growth and sustainability.
-   **Typography**: *Fraunces* for headings (human, grounded) and *DM Sans* for UI text (clean, legible).
