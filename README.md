# MDT-FrontEnd
Updates / Changelog

Date: 2025-11-28
Version: 1.1

1️⃣ License Lookup System

Updated the license lookup page to improve user interaction.

Added a modal pop-up for the “Add New Ticket Violation” form:

Previously, the form was embedded in the page and required scrolling.

Now, the form appears in a centered modal, improving UX and accessibility.

Modal includes a close (×) button and auto-close on submit.

Removed the old in-page form toggle function (toggleViolationForm()).

Dynamically injects the modal HTML when a license is searched, keeping the main page clean.

License information, personal info, violation history table, and add violation modal are all dynamically generated within the lookupLicense() function.

2️⃣ Vehicle Lookup System

Maintained vehicle lookup functionality:

Searches by Plate Number or MV File Number (case-insensitive).

Displays vehicle information, registered owner, and insurance info.

Includes clickable Owner License Number to quickly jump to the license lookup modal.

Minor code cleanups to keep vehicle lookup consistent with updated license lookup system.

3️⃣ Violation History

Violations can now be added through the modal form.

Violation history table dynamically refreshes after adding a new violation.

Status of violations (Paid / Unsettled) highlighted with color coding:

Green for Paid

Red for Unsettled

4️⃣ UI / Landing Page Design Updates

Redesigned landing page interface for better clarity and readability:

Improved card layout for vehicle and license information using rounded containers and shadows.

Added responsive grid layout for vehicle and license details.

Button styles enhanced with gradient colors, hover effects, and rounded corners.

Error messages styled prominently in red and displayed dynamically above content box.

Ensured all dynamic content appears cleanly in the #infoBox without cluttering the main page.

5️⃣ Terms & Conditions Page

Updated layout to match the overall design theme (rounded cards, shadows, spacing).

Improved readability with proper spacing and typography.

Ensured buttons and links are visually consistent with landing page design.

6️⃣ Check Vehicle & Check License Cards

Redesigned cards for both pages:

Check Vehicle card displays vehicle info clearly in a rounded, shadowed container.

Check License card displays license info, personal info, and violations neatly.

Added responsive design for mobile and desktop screens.

Enhanced hover and focus effects for buttons and interactive elements.

Consistent color palette and typography across all info cards.

7️⃣ JavaScript / UX Enhancements

Introduced helper function toggleViolationModal() for modal visibility.

Simplified DOM structure by removing old in-page form toggle logic.

Improved user feedback and error handling for empty inputs or missing license searches.

All dynamic content inserted into #infoBox to avoid clutter in HTML.

💡 Notes for Users / Developers:

Modal functionality relies on dynamic JS injection. Ensure #infoBox exists in the HTML for proper rendering.

When adding new violations, the table refreshes automatically and inputs are cleared after submission.

Design improvements ensure consistent user experience across landing page, check vehicle, check license, and terms & conditions pages.

## Changelog / Updates

**Date:** 2025-12-04  
**Version:** 1.2

### What's new — Violation Actions (Edit / Delete / Print)
- **Action buttons added** to the Violation History table:
  - **Edit** — opens a centered modal pre-filled with the selected violation details so you can update the record. After saving, the table refreshes and the change is kept in the in-memory DB.
  - **Delete** — removes the selected violation after a confirmation prompt, then refreshes the table.
  - **Print** — opens a printer-friendly popup window with the selected violation formatted as a ticket and immediately calls `window.print()` so the user can print the ticket.

#### Files changed
- `license.html`
  - Added centered Add/Edit modal markup (mobile-responsive).
  - Re-introduced Check Vehicle UI section.
- `script.js`
  - Restored and improved `lookupVehicle()` and `clearVehicleBox()` for plate / MV File searches.
  - Added `openEditViolation(index)`, `deleteViolation(index)` and `printViolation(index)` functions.
  - Improved `loadViolations()` to render **Actions** (Edit/Delete side-by-side) and **Print** buttons.
  - Implemented modal open/close handlers that lock background scroll and close on backdrop click.

#### UX / Behavior notes
- The Edit and Delete buttons are displayed side-by-side under the **Actions** column (not stacked), so they remain easy to reach on desktop and mobile.
- The Edit modal is **centered both vertically and horizontally** and uses `max-height` + internal scrolling so it fits on small screens.
- The Print button creates a lightweight printable page and triggers the print dialog; if popups are blocked, the user will see a message indicating popups must be allowed.

#### How to test locally
1. Open `license.html` in your browser (or run Live Server / GitHub Pages).  
2. **Vehicle lookup**: enter `ABC-123` or `MV-2023-001234` → click **Search Vehicle** → verify vehicle info displays.  
3. **License lookup**: enter `DL-2023-456789` → click **Search License** → verify license info and Violation History appear.  
4. In Violation History:
   - Click **Edit** on a row → modal opens pre-filled → change fields → click **Save Changes** → verify table updated.
   - Click **Delete** on a row → confirm → verify row removed.
   - Click **Print** on a row → printer window opens (allow popups) and print dialog appears.

#### Developer notes / next steps
- Currently changes are stored in-memory (JavaScript objects). Consider persisting to `localStorage` or a backend API for permanent storage.  
- Optionally, add a **Status** dropdown in the Edit modal to change `Paid`/`Unsettled` status directly.  
- Replace `alert()` / `confirm()` with a toast/notification component for smoother UX.

---

