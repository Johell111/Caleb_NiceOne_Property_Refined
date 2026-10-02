CALEB NICEONE PROPERTY — STATIC WEBSITE

Seven pages:
- index.html — Home
- about.html — About
- services.html — Services
- leadership.html — Leadership
- contact.html — Contact and frequently asked questions
- property-finder.html — Structured property brief
- 404.html — Page recovery

RUN LOCALLY
Open index.html directly in a browser, or serve this folder with any static web server.
If Python is installed, run:
  py -m http.server 8080
Then visit http://localhost:8080/index.html.
There is no build step, package installation, database or backend requirement.
Upload the contents of this folder to a static host. Configure the host to use
404.html for missing pages if it supports a custom error page.

ASSETS AND CONTENT
Brand assets and the real leadership portraits are stored in assets/.
The homepage architectural concept is assets/architecture-concept.webp.
Cormorant Garamond and DM Sans are self-hosted in assets/fonts/ with their licenses.
All site imagery is local; no remote Unsplash image is loaded.
Architectural artwork is illustrative and is not an available listing or a claim
about the company's portfolio. Replace it with approved company photography when
available, and update the caption and alternative text accordingly.
Do not add unverified listings, testimonials, statistics or business claims.

Verified business details retained from the supplied website:
Phone: 0802 329 2798 / +2348023292798
WhatsApp: https://wa.me/2348023292798
Address: 1, Success Close, Orofun Town Office, Lagos Free Zone,
Ibeju-Lekki Local Government, Lagos.
RC No. 7682901
Leadership: Caleb Odukoya, Managing Director;
Eunice Odukoya, Executive Director.

ENQUIRY BEHAVIOR
Contact and Property Finder prepare a WhatsApp message from the visitor's answers.
Submitting a valid form requests a new WhatsApp tab. The visitor must review the
message in WhatsApp and press Send themselves; this website does not send messages.
A visible link to the prepared message remains available if a popup is blocked.
No personal details are saved in cookies, local storage, a database or a server
by the website. Submitted details are included in the WhatsApp link when used.
Direct telephone and WhatsApp links provide a fallback when JavaScript is disabled.

Property Finder supports these quick-start URL values:
  property-finder.html?goal=Buy
  property-finder.html?goal=Rent
  property-finder.html?goal=Invest
  property-finder.html?goal=Sell
  property-finder.html?goal=Property%20management
  property-finder.html?goal=Property%20marketing
Goal selection adjusts the budget label, guidance and choices. Buying, investing
and renting require a choice, including an option to discuss the budget. Selling,
management and marketing allow the budget field to remain blank. Changing the goal
clears the budget choice so an earlier selection cannot carry into a different brief.
Service enquiry links may use contact.html?interest= with the exact encoded value
of an existing contact-form interest option.

ACCESSIBILITY AND MAINTENANCE
Shared navigation supports keyboard focus, Escape dismissal, outside dismissal
and clear expanded state. Keep the 980px mobile navigation breakpoint synchronized
between assets/styles.css and assets/site.js.
Forms trim surrounding whitespace, retain native validation and accept telephone
numbers with country codes, spaces, parentheses, dots and dashes (7–15 digits).
Keep form IDs contactForm/finderForm, input names, data-form-submit,
data-form-status, #budget-label and data-budget-help hooks synchronized with JS.
Retain visible required-field guidance, focus indicators, image alternatives,
reduced-motion support and the no-JavaScript contact fallbacks when editing.

See VALIDATION.txt for checks completed during this revision.
