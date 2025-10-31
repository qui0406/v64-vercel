## Repo overview

- This is a Create React App (CRA) single-page front-end for the v64 clothes shop.
- Main entry: `src/index.js` -> `src/App.jsx` which configures `BrowserRouter` and all routes.
- UI: Bootstrap + custom CSS. Icons use `lucide-react`.

## Key architecture and data flows

- Routing and pages: `src/App.jsx` declares all top-level routes (home, auth, product lists, cart, wishlist, product details). Use this file to see which components render which paths.
- API layer: `src/configs/APIs.jsx` defines a `BASE_URL` (default: `http://localhost:8088/api/v1`), `endpoints` map, a default axios instance and `authApis()` which attaches a token from `react-cookies`.
  - Example usage: `authApis().get(endpoints['my-profile'])` (see `src/App.jsx`).
- Auth & user state: `src/configs/MyContexts.jsx` exports `MyUserContext` and `MyDispatchContext`. `src/reducer/MyUserReducer.jsx` handles `login`/`logout` and clears the cookie on logout.
- Cart/wishlist: components save cart/wishlist in cookies or local component state. Example: `src/components/Products/AllProductByWomen.jsx` saves `cart` to a `cart` cookie via a helper `setCookie`.

## Project-specific conventions / patterns

- API tokens are read from cookies using `react-cookies` and passed in `Authorization: Bearer <token>` by `authApis()` (see `src/configs/APIs.jsx`). When adding calls that require authentication prefer `authApis()`.
- Global user state is provided with two contexts: `MyUserContext` (value = user) and `MyDispatchContext` (value = dispatch). `App.jsx` wires these with `useReducer(MyUserReducer, null)`.
- Many components embed local styles via a `<style>{`...`}</style>` block inside the component (see `AllProductByWomen.jsx`). Respect these local styles when editing components — some UI is component-scoped rather than centralized.
- Files generally default-export React components; import by path (no index barrels in `components/`).
- Some context files are placeholders/empty (e.g., `src/Contexts/UserContext.jsx` is empty). Prefer the contexts under `src/configs` and `src/Contexts` where used.

## Build / run / test

- Local dev server: `npm start` or `yarn start` (CRA `react-scripts start`).
- Build for production: `npm run build` or `yarn build`.
- Tests: `npm test` or `yarn test` (uses `react-scripts test` and @testing-library packages).
- Note: backend API expected during some flows at `http://localhost:8088/api/v1`. When working on auth or product fetching, either run the backend or mock the endpoints.

## Practical examples for an AI agent

- To add an authenticated API call: import `authApis` and `endpoints` and call e.g.
  authApis().post(endpoints['product/create'], body)
- To read/update global user: use `MyUserContext` (read) and `MyDispatchContext` (dispatch). Example from `App.jsx`:
  - On start the app loads token from cookie and dispatches `dispatch({type: 'login', payload: res.data})`.
- To update cart persistence: search for `setCookie('cart'` or `document.cookie` — multiple components write a `cart` cookie. Keep naming consistent.

## Integration points / gotchas

- Backend base URL is hard-coded in `src/configs/APIs.jsx`. If the backend is elsewhere, update that file — many components rely on `endpoints` there.
- Cookies are used for auth and cart. Two libraries/patterns present: `react-cookies` (used in `App.jsx` & reducer) and manual `document.cookie` helpers in components (e.g., `AllProductByWomen.jsx`). Be careful when reading/removing cookies to use the same approach.
- Some components use mocked/sample product arrays (see `AllProductByWomen.jsx`) instead of fetching from API; when converting to real API calls, implement `fetchProduct` and follow existing UI shape (id, name, price, image, sizes, colors, sku).

## Files to check when making changes

- Routing / app state: `src/App.jsx`
- API config: `src/configs/APIs.jsx`
- Contexts: `src/configs/MyContexts.jsx`, `src/Contexts/CartContext.jsx`, `src/Contexts/UserContext.jsx` (empty)
- User reducer: `src/reducer/MyUserReducer.jsx`
- Example product page + UI patterns: `src/components/Products/AllProductByWomen.jsx` (large inline styles and local state), `src/components/Products/ProductDetails.jsx`

If any part of the backend integration, cookie names, or context wiring above is incorrect or you want more detail (e.g., examples for converting a mock product list to a real fetch), tell me which area to expand and I'll update this file.
