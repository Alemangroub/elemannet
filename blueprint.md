
# Blueprint: El Eman Company Website

## Overview

This project is a modern, content-focused website for El Eman Company for Real Estate Development, built with Astro.js. The primary goal is to create a fast, highly-performant, and scalable static-first site. It includes a public-facing informational site and a private admin dashboard for managing content like projects and installments.

## Project Documentation

### Styles & Design
*   **Framework:** Tailwind CSS for utility-first styling.
*   **Fonts:** `Cairo` for general text and UI, `Almarai` and `Kalam` for specific design elements.
*   **Direction:** The site is designed for Arabic (Right-to-Left).
*   **Admin Dashboard:** A clean, card-based layout for easy navigation. It uses a color palette of `#f0f2f5` (background), `#1f2937` (headings), and `#6b7280` (text).

### Features Implemented
*   **Static Pages:** Home, About, Services, and Contact pages.
*   **File-based Routing:** Standard Astro routing is used for all pages.
*   **Dynamic Services Pages:** Service detail pages are generated dynamically from slugs.
*   **Firebase Integration:**
    *   Firebase Authentication is used to protect the `/admin` route.
    *   Firestore is used as the database.
*   **Admin Panel:**
    *   Protected route at `/admin`.
    *   Displays a login form (`AdminLogin.astro` component).
    *   Upon successful login, it shows a dashboard with links to manage "Installments" and "Projects".
    *   Includes a logout functionality.
*   **Search Functionality:** A basic search page at `/search`.

## Current Task: Fix Admin Login Page

**Objective:** The `/admin` page is stuck on a "Checking authentication..." message and never shows the login form or the dashboard.

**Plan:**
1.  **Initial Diagnosis (Completed):** Identified and removed a duplicate Firebase configuration file (`src/firebase/config.js`) that was causing an initialization conflict.
2.  **Current Hypothesis:** The root cause is likely missing or incorrect Firebase environment variables. The Firebase configuration (`src/firebase/client.ts`) depends on `import.meta.env` variables, and if they are not defined, Firebase initialization will fail silently, preventing the `onAuthStateChanged` callback from ever firing.
3.  **Action Step 1 (Current):** Create this `blueprint.md` file.
4.  **Action Step 2:** Verify the existence and content of the `.env` file in the project's root directory.
5.  **Action Step 3:** Report the findings to the user. If the variables are missing, provide instructions on how to create the `.env` file and populate it with their Firebase project credentials.
6.  **Action Step 4:** Once the environment variables are confirmed to be in place, re-test the `/admin` page to ensure the login form appears as expected.
