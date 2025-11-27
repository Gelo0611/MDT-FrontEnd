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
