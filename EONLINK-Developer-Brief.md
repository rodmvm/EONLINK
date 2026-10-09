# EONLINK — Product and Development Scope Brief

**Purpose:** Enable a developer to understand the product, propose an implementation plan, and provide an itemized estimate. This brief describes the intended product direction; open decisions should be priced as assumptions or options.

## 1. Product overview

EONLINK is a business operations application for construction and project-based businesses. It brings project organization, quotations, documents, expenses, cash allocation, and financial visibility into one interface.

The central relationship is the **project**: users should be able to understand a project's progress, quotations, supporting files, expenses, and pending actions without switching between disconnected systems.

The interface is organized into two work areas:

- **Organize:** overview, projects, files, quotations, and project assistance.
- **Calculate:** financial overview, transactions, petty cash, expenses, and financial assistance.

The initial interface language is Spanish, with MXN as the reference currency. Deployment geography, tax requirements, and additional languages or currencies need confirmation.

## 2. Current prototype and implementation baseline

A working browser prototype and visual references are available. The prototype demonstrates navigation, quotation editing, local records, account replacement, project thumbnails, and document uploads.

It currently uses browser storage and example data. It does **not** yet provide a production backend, real authentication, bank connectivity, connected WhatsApp or Google Drive, or a live AI service. Existing assistant responses and price examples demonstrate intended workflows.

The developer should assess which frontend components can be reused and identify any rebuilding required. A functioning production product, including reliable persistence and permissions, is the target of the estimate.

## 3. Core functional scope

### A. Projects and operational overview

- Create, edit, and maintain projects with a client, name, status, progress percentage, delivery date, and identifying image.
- Provide a business overview and project-specific views linking quotations, files, expenses, and next steps.
- Track pending actions and items requiring review.
- Let users replace each project's thumbnail through the small translucent white **+** in the image's lower-left corner.
- Use a shared project identity across all modules so updates remain consistent.

### B. Quotations

- Create a quotation manually or start from a plain-language description supported by an assistant.
- Capture project/client details, scope, line items, quantities, units, unit prices, applicable taxes, payment terms, and validity.
- Calculate subtotals, tax, and totals consistently; tax rates must be configurable rather than assumed from sample data.
- Support draft, awaiting authorization, and authorized states, with an explicit review and approval workflow.
- Restrict authorization to the designated owner/approver role.
- Show quotations as **horizontal sliding cards** in all quotation listing contexts, including global tracking and project views. Include touch scrolling, previous/next controls, a position counter, and keyboard access.
- Preserve quotation history and trace changes and approvals. Specify the proposed versioning approach.
- Price PDF generation and client sharing as explicit deliverables, including the proposed delivery channels.

AI-generated wording, quantities, or prices must remain editable suggestions. Approval requires a human decision. Price changes should flag affected drafts for review rather than silently alter approved or previously shared quotations.

### C. Files and documents

- Upload, organize, retrieve, and download files linked to projects and relevant records.
- Support PDFs, spreadsheets, images, and Word documents, subject to agreed file-size limits.
- Display file name, project, category, date, and source, with consistent file-type color accents.
- Provide a clear add-file action and project-level navigation between summary, quotations, files, and expenses.
- Track files awaiting classification or review.

### D. Expenses and financial visibility

- Register expenses with supplier, date, project or business-wide allocation, category, amount, tax details where applicable, and a supporting receipt.
- Cover materials, operations, equipment rental, and restricted payroll records.
- Support review status and linking an expense or receipt to a transaction.
- Show financial summaries and transaction lists, with filtering by project, account, category, and period.
- Distinguish cash flow from profit: inflows minus outflows should not be presented as a profitability calculation.

### E. Business accounts and petty cash

- Maintain designated accounts for business purposes such as operating funds, project reserves, and the business card.
- The circular-arrow action means **replace or update the account/card assigned to that purpose**. Updated details must propagate across financial screens through a stable internal account identity.
- Preserve historical transaction ownership when account assignments change; propose how replacement and effective dates should work.
- Store only the account metadata needed for identification, such as a display name and masked final digits. Decorative card visuals do not imply payment-card processing.
- Track petty-cash funds, allocations, movements, and available balances for projects or operating purposes.
- Petty cash is internal recordkeeping. Money transfers, payment execution, or custody are outside the currently described scope.

### F. Roles, search, and notifications

- Implement real authentication and server-enforced permissions.
- Translate the prototype's named users into configurable roles. The owner/approver can authorize quotations and access restricted payroll data; other users receive appropriate operational access.
- Apply restrictions to search results, files, exports, and assistant responses as well as visible screens.
- Provide search across accessible projects and records, plus notifications for relevant reviews, approvals, and pending actions.
- Maintain an audit trail for approvals and material financial changes.

## 4. Planned integrations — quote separately

### WhatsApp Business and Google Drive

Intended intake workflow: **receive a file through the business WhatsApp → suggest a project and category → user confirms → save to the appropriate Drive folder and link it in EONLINK.**

Estimate WhatsApp Business API setup, incoming attachments, review queues, Google authorization, folder mapping, storage ownership, duplicate handling, and failed-upload recovery. State any platform or account prerequisites and recurring charges. Outbound messaging should be a separately defined option.

### AI assistance

Intended capabilities include quotation drafting and wording assistance, receipt extraction and expense classification, suggested transaction matching, project summaries and pending actions, and suggested file classification.

Responses should respect permissions and link to supporting records where available. Users confirm proposed record changes. Estimate model usage, document/image processing, and operating costs separately.

### Supplier price monitoring

Compare authorized supplier price lists over time, accounting for units, currency, tax treatment, source, and date. Identify changes and affected quotation drafts for review. Confirm how lists will be supplied; automated supplier sourcing or scraping is not assumed.

### Banking

The initial intended route is importing account statements from CSV. Direct bank connections can be evaluated later according to supported institutions, availability, and cost. Quote manual entry/CSV import and live banking integration separately, including reconciliation and duplicate prevention.

## 5. Design and interaction requirements

- Responsive, mobile-oriented web interface with usable desktop layouts. Native mobile applications should be quoted separately if proposed.
- Dark surfaces, fine borders, and a softly animated blue/violet background, with support for reduced motion.
- Semantic accents: blue for organization/projects/files, mint for finance, amber for quotations/review, and violet for assistance/operations.
- Linear icons for navigation and small controls; 3D illustrations for selected primary actions and headers. The final icon system will be supplied separately.
- Consistent cards, status labels, typography, spacing, and interactions across repeated screens.
- Bottom navigation and mobile sheets, with suitable desktop panels; accessible focus, contrast, labels, and keyboard navigation.
- Reference images and the current prototype establish the visual direction. Remaining screens should extend the same component system.

## 6. Production deliverables and acceptance

Please include frontend implementation, backend/API, database, authentication, permission enforcement, document storage, deployment, backups, error handling, and relevant automated tests in the proposed architecture.

Acceptance should demonstrate persistent data across sessions and authorized users, consistent updates across modules, correct financial calculations, restricted access enforcement, working file workflows, responsive layouts, and recoverable integration failures. Include source code handover, setup documentation, and an agreed post-launch support period.

## 7. Requested quotation format

Please provide:

1. An itemized estimate by module and integration, with assumptions and exclusions.
2. A proposed MVP and subsequent phases, identifying which workflows each phase delivers.
3. Timeline, milestones, dependencies, and required input from our team.
4. The proposed technology stack and assessment of prototype reuse.
5. One-time development costs and recurring hosting, storage, AI, integration, and maintenance costs.
6. Testing, deployment, warranty/support, and change-request terms.
7. Separate optional pricing for native apps, live banking, outbound messaging, and any other scope extensions.

Before final pricing, please flag decisions concerning user counts, business/workspace structure, detailed role permissions, hosting ownership, data migration, quotation exports/sharing, supported CSV formats, supplier data sources, integration accounts, and expected document volume. Full accounting, tax filing, automated payroll processing, and payment execution are not implied by the financial views described here.
