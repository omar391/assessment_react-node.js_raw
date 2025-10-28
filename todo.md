# TODO

## Task 1 - Authentication status codes (DONE)

- What to do: Ensure failed login and registration attempts return HTTP 401 instead of HTTP 200 while keeping success payloads unchanged.
- Possible files to change: backend/controllers/userController.js (adjust status codes), backend/middleware/auth.js (sanity check for unauthorized flows), backend/server.js (confirm no global middleware overrides response codes).
- Verify completion: Automated coverage in `backend/tests/authStatus.test.js`; run `bun run --cwd backend test` to assert 401 statuses for missing users, bad passwords, and duplicate registrations.
- Relevant test case plans: Extend with success-path assertions or auth middleware checks if future scope increases.

## Task 2 - Menu hover zoom effect (DONE)

- What to do: Add a smooth scale-up hover effect to each displayed menu item image without impacting layout or counter overlays.
- Possible files to change: frontend/src/components/FoodItem/FoodItem.css (add hover transform and overflow handling), frontend/src/components/FoodItem/FoodItem.jsx (only if additional wrapper logic needed), frontend/src/components/ExploreMenu/ExploreMenu.css (verify menu thumbnails if they should also zoom).
- Verify completion: CSS assertions in `frontend/src/__tests__/uiTweaks.test.js`; execute `bun run --cwd frontend test` to ensure transition, transform, and overflow guards remain in place.
- Relevant test case plans: Consider browser-driven checks (e.g., Playwright) if future UX regressions need dynamic validation.

## Task 3 - Minus icon alignment in order counter (DONE)

- What to do: Prevent the minus icon from shifting when quantities change by normalizing counter dimensions (e.g., fixed width, flex alignment, padding adjustments).
- Possible files to change: frontend/src/components/FoodItem/FoodItem.css (set fixed width/min-width for counter and quantity text), frontend/src/components/FoodItem/FoodItem.jsx (only if structural wrapper needed), frontend/src/pages/Cart/Cart.css (confirm similar counters remain aligned).
- Verify completion: `frontend/src/__tests__/uiTweaks.test.js` validates the counter maintains minimum width, balanced padding, and centered quantity text; run with `bun run --cwd frontend test`.
- Relevant test case plans: Add interaction-driven UI automation later if component styling becomes more complex.
