
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
    -   Features navigation to "Daily Reports", "Expense Reports", "Project Installments", and "Items".

-   **Project Items (البنود) Management (`/admin/projects/[id]/items`):**
    -   A comprehensive page for managing project items (expenses, materials, etc.).
    -   **Client-Side Form Submission:** Item creation is handled entirely on the client-side using JavaScript to prevent server-side CSRF (Cross-Site Request Forgery) errors. The form data is sent directly to Firebase Firestore from the browser.
    -   **Seamless Page Update:** Upon successful submission, the page automatically reloads (`window.location.reload()`) to instantly display the new item in the list without an intermediary success message, providing a smooth user experience.
    -   **Full CRUD (Create, Read, Update, Delete):** Allows admins to add, view, edit (inline), and delete items with confirmation modals for safety.
    -   **Data Filtering & Summaries:** Features dynamic filtering by main and sub-category, with real-time updates to filtered totals and the grand total.
    -   **Data Export:** Provides options to print, export to PDF, or export to Excel for individual items.

-   **Project Suppliers (الواردات) Management (`/admin/projects/[id]/suppliers`):**
    -   A page to track project supplies and purchases.
    -   **Client-Side Data Handling:** All operations (add, edit, delete, view) are handled on the client-side using JavaScript and direct interaction with the Firebase Firestore database, ensuring a fast and responsive user experience.

#### 2.2.2. Customer Contract & Standalone Installment Management

-   **Installments Dashboard (`/admin/installments`):**
    -   Provides a summary of total contracts, total installment amounts, and total paid amounts.
    -   Lists all customer contracts with key details, linking to a detailed view for each.

-   **Contract Details Page (`/admin/contract-details`):**
    -   Displays a complete summary of a single contract, including all associated installments with their status.
    -   Allows admins to toggle the status of each installment (with confirmation) and provides options to edit, delete, or print the contract.

-   **Installment Notifications (`/admin/notifications`):**
    -   A dedicated page that automatically categorizes and displays unpaid installments that are either overdue or due within the next 7 days.

#### 2.2.3. Security & Authentication

-   **Role-Based Access Control:** A robust authentication system is implemented across all `/admin/...` sections, restricting access to `admin` users only.
-   **Secure Admin Login (`/admin`):** The generic `/admin` route serves as the primary login portal for administrators.
-   **Logout Functionality:** A "Logout" button is available on all admin pages for secure session termination.

## 3. Previous Task: Fix "Items" Page Form Submission Error

### Problem Description

The initial implementation of the "Items" page used a standard Astro server-side form (`<form method="POST">`). During deployment, this caused a "Forbidden" error when submitting the form, indicating a Cross-Site Request Forgery (CSRF) protection issue.

### Plan & Steps for the Fix

The solution was to refactor the page to handle form submissions on the client-side, mirroring the successful implementation of the "Suppliers" page.

1.  **[Analyze Working Page]** Compared the failing `items.astro` page with the working `suppliers.astro` page.
2.  **[Refactor Form]** Removed the `method="POST"` attribute from the `<form>` tag in `items.astro`.
3.  **[Remove Server-Side Logic]** Deleted the server-side `POST` handling logic from the frontmatter.
4.  **[Implement Client-Side Logic]** Added a JavaScript event listener to the `<script>` section. This script intercepts the form submission, gathers the data, and sends it directly to Firestore using the client-side SDK.

## 4. Current Task: Refine User Experience on "Items" Page

### Plan & Steps for the requested change:

1.  **[Identify Issue]** After successfully adding a new item, a success message was displayed via a URL query parameter (`?success=true`). The user requested to remove this message for a smoother experience.
2.  **[Remove Success Message Logic]** Deleted the code responsible for displaying the success message from the HTML template and the frontmatter of `src/pages/admin/projects/[id]/items.astro`.
3.  **[Change Page Update Method]** Modified the client-side form submission script. Instead of redirecting to a URL with a query parameter, the script now calls `window.location.reload()` upon successful submission. This action refreshes the page, displaying the newly added item in the list immediately and seamlessly.
4.  **[Update Blueprint]** Updated this `blueprint.md` file to document this user experience refinement.
