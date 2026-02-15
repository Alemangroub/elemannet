
# Blueprint: Elemannet - Project & Installment Management Dashboard

## 1. Overview

This application is a web-based project management dashboard named "Elemannet". It is designed for administrators to create, monitor, and manage various construction or contracting projects, as well as handle customer contracts and installment plans. The platform provides a centralized view of all projects and contracts, with detailed pages for tracking work progress, expenses, and payment schedules. Supervisors can submit daily reports and expense claims, while administrators manage the financial and contractual aspects.

## 2. Core Features & Design

### 2.1. General Style & Aesthetics

-   **Layout:** Modern, clean, and intuitive right-to-left (RTL) layout suitable for Arabic.
-   **Color Palette:** Primarily uses a professional combination of blues for primary actions, greens for success states, reds for danger/deletion, and varying shades of gray for backgrounds and text.
-   **Typography:** Utilizes the 'Cairo' font for a modern and readable Arabic interface.
-   **Components:** Features card-based design for projects and reports, clear navigation, and responsive layouts for both desktop and mobile.
-   **Interactivity:** Smooth transitions, hover effects, and custom-designed modals for confirmations to enhance user experience.

### 2.2. Implemented Features

#### 2.2.1. Project & Supervisor Management

-   **Admin Dashboard (`/admin/projects`):**
    -   Displays a list of all current projects in a grid of cards.
    -   Each project card shows the project name, client name, and city.
    -   Includes a prominent button to "Add a New Project".

-   **Add New Project (`/admin/add-project`):**
    -   A user-friendly form to create a new project.
    -   Upon successful submission, the admin is redirected back to the main project dashboard.

-   **Project Details Page (`/admin/projects/[id]`):**
    -   Provides a central hub for a single project, displaying its main information.
    -   Features navigation to "Daily Reports" and "Expense Reports".

-   **Daily & Expense Reports (`/admin/projects/[id]/...`):**
    -   Admins can view all daily work and expense reports submitted for a project.
    -   Features include inline editing and safe deletion (with a confirmation modal) for all reports.

-   **Supervisor Submission Form (`/`):**
    -   A comprehensive form for supervisors to submit "Daily Reports" or an "Expense Reports" for their assigned projects, including image uploads.

#### 2.2.2. Installment & Contract Management

-   **Installments Dashboard (`/admin/installments`):**
    -   Provides a summary of total contracts, total installment amounts, and total paid amounts.
    -   Lists all customer contracts with key details, linking to a detailed view for each.
    -   Includes a link to the notifications page and an action to add a new contract.

-   **Contract & Installment Creation (`/admin/add-installment`):**
    -   A guided form to create a new customer contract.
    -   Automatically generates an installment schedule based on the total amount and number of installments.
    -   Allows customization of individual installment amounts and due dates before saving.

-   **Contract Details Page (`/admin/contract-details`):**
    -   Displays a complete summary of a single contract.
    -   Lists all associated installments with their status (paid/unpaid), amount, and due date.
    -   Allows admins to toggle the status of each installment (with confirmation).
    -   Provides options to edit the entire contract, delete it (which also deletes all its installments), or print it.
    -   Includes a link to edit each individual installment.

-   **Installment Editing (`/admin/edit-installment`):**
    -   A dedicated page to modify the amount, due date, or status of a single installment.

-   **Contract Editing (`/admin/edit-contract`):**
    -   Allows modification of core contract details.
    -   Recalculates the schedule for *unpaid* installments if the total amount or number of installments is changed, preserving the records of already paid installments.

-   **Installment Notifications (`/admin/notifications`):**
    -   A dedicated page that automatically categorizes and displays unpaid installments that are either overdue or due within the next 7 days, helping admins track urgent payments.

#### 2.2.3. Security & Authentication

-   **Role-Based Access Control:** A robust authentication system has been implemented across all administrative sections.
    -   Access to all pages under `/admin/...` is restricted to logged-in users.
    -   Users with a `supervisor` role are redirected away from admin pages to their dashboard.
    -   Only users with an `admin` role can view and interact with the project and installment management pages.
-   **Secure Admin Login (`/admin`):** The generic `/admin` route now serves as the primary login portal for administrators. Unauthorized users are shown the login form.
-   **Logout Functionality:** A "تسجيل الخروج" (Logout) button has been added to all admin pages, allowing for a secure session termination.

## 3. Current Task: Secure the Installment Management System

### Plan & Steps for the requested change:

1.  **[Completed] Identify Target Pages:** Located all pages related to installment and contract management: `installments`, `add-installment`, `edit-installment`, `contract-details`, `edit-contract`, and `notifications`.
2.  **[Completed] Implement Authentication Wrapper:** On each target page, implemented a unified authentication check.
    -   The page content is hidden by default.
    -   An `onAuthStateChanged` listener verifies the user's login status and role.
    -   If the user is a logged-in `admin`, the main content is displayed.
    -   If the user is not an `admin` or is not logged in, they are shown the `AdminLogin` component or redirected.
3.  **[Completed] Add Logout Functionality:** Added a "Logout" button to the header of each secured page to allow admins to sign out easily.
4.  **[Completed] Update Navigation & Links:** Added "Edit Installment" links to the contract details page and ensured all navigation remains consistent.
5.  **[Completed] Update Blueprint:** Finalized the task by updating this `blueprint.md` file to document the new security architecture and the full suite of installment management features.
