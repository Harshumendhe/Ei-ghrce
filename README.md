# Engineering India GHRCE

React + TypeScript + Tailwind CSS + Framer Motion frontend and Node.js + Express + MongoDB backend.

The public IA/copy follows the supplied content-flow document, including Home, Team, Events, Projects, Gallery, Join and Contact. The admin follows the supplied admin-flow: Login → Authentication → Dashboard → module CRUD → Database → public website update.

## Admin identity
The admin is **not identified by a frontend button**. Firebase verifies the Google account, then Express verifies the Firebase ID token and checks the authenticated email against `ADMIN_EMAILS` in the backend `.env`. Put your own Firebase account email there.

## Start

Backend:
`cd backend && cp .env.example .env && npm install && npm run dev`

Frontend:
`cd frontend && cp .env.example .env && npm install && npm run dev`

Add Firebase web credentials to frontend `.env`, Firebase Admin service-account values to backend `.env`, and a MongoDB URI.

The uploaded official logo is included in `frontend/public/assets/engineering-india-ghrce-logo.jpg`.
