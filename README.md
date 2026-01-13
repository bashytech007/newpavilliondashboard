# LawPavillion Dashboard

A modern, production-grade SaaS dashboard built with **Next.js 15**, **React 19**, **Tailwind CSS**, and **Shadcn UI**.

![Dashboard Preview (light mode)](public/dashboard-preview.png)
![Dashboard Preview (Dark mode)](public/dashboard-preview-dark.png)

## Features

- ⚡ **Performance**: Highly optimized with lazy loading and skeleton states for a smooth user experience.
- 🎨 **Themeable**: Dark/Light mode support with persistent state.
- 📱 **Responsive**: Fully responsive sidebar and layout for mobile and desktop.
- 🔒 **Secure**: Authentication powered by Auth.js (NextAuth v5).
- 📊 **Data Viz**: Integrated charts using Recharts.

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Architecture**: Shadcn UI (Radix Primitives)
- **State Management**: React Suspense & Server Components
- **Database**: MongoDB (via Mongoose)

## Prerequisites

- Node.js 18+ installed
- MongoDB instance (local or Atlas)

## Getting Started

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-repo/pavillion-dashboard.git
    cd pavillion-dashboard
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    # or
    pnpm install
    # or
    yarn install
    ```

3.  **Environment Setup:**
    Create a `.env` file in the root directory and add the following variables:

    ```env
    # Authentication (Auth.js)
    AUTH_SECRET="your_generated_secret_here" # run `npx auth secret` to generate
    AUTH_URL="http://localhost:3000" # for local development

    # Database
    MONGODB_URI="mongodb://localhost:27017/lawpavillion" # or your Atlas connection string
    ```

4.  **Run the development server:**
    ```bash
    npm run dev
    ```

    Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## Project Structure

- `app/`: Next.js App Router pages and layouts.
- `components/`: Reusable UI components.
  - `ui/`: Shadcn UI primitives.
  - `dashboard-content.tsx`: Main dashboard logic (lazy loaded).
  - `sidebar.tsx`: Responsive navigation sidebar.
- `lib/`: Utility functions and database connections.
- `public/`: Static assets (logos, images).

## Key Implementation Details

### Hybrid Loading Strategy
The dashboard uses a hybrid approach to ensure optimal perceived performance:
- **Sidebar**: Renders statically on desktop (SSR) to prevent layout shift, while the interactive mobile menu hydrates on the client.
- **Dashboard Content**: Lazy loaded heavily using a custom `DashboardClientWrapper` to show immediate skeleton loading states, forcing a visible feedback loop for the user.

## Decisions & Trade-offs

### 1. Mock API for Authentication
- **Decision**: Implemented a local Mock API (`lib/db.ts` and `app/api/login/route.ts`) instead of a full database backend for the prototype phase.
- **Trade-off**: Data is not persistent across server restarts, but it allows for rapid UI/UX development and testing without setting up complex infrastructure.
- **Why**: Speeds up the development cycle and allows the frontend to be "production-ready" in terms of data fetching logic.

### 2. Client-Side User Navigation
- **Decision**: Extracted the User Profile dropdown into a dedicated Client Component (`UserNav`).
- **Trade-off**: Adds a small amount of JS bundle size for that specific component.
- **Why**: Resolves hydration mismatch errors caused by random ID generation in accessibility primitives (Radix UI) when rendered on the server versus the client.

### 3. Static/Dynamic Sidebar Split
- **Decision**: Kept the desktop sidebar static (SSR) while making the mobile sheet dynamic.
- **Why**: Eliminates layout shift on initial load for desktop users, which is critical for a dashboard application's perceived stability.

### 4. Mock API for Chart Data
- **Decision**: Implemented a mock API for chart data (`app/api/dashboard/chart/route.ts`).
- **Trade-off**: Data is hardcoded and simulates network delay, not real-time.
- **Why**: Allows development of the chart visualization (`Overview.tsx`) against a realistic async data source, verifying the loading skeleton and fetch logic.
