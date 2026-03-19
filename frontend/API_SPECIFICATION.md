# API Specification

## Auth
- POST /auth/register - Register a new user
- POST /auth/login - Login with email and password
- POST /auth/refresh - Refresh access token
- GET /auth/google - Google OAuth login redirect
- GET /auth/google/callback - Google OAuth callback
- GET /auth/me - Get current user profile (Authenticated)

## Leads
- GET /leads - Get all saved leads for the user (Authenticated)
- POST /leads - Save a lead (Authenticated)
- POST /leads/find - Find new leads using AI (Authenticated or Public depending on requirements, let's make it Authenticated)
- GET /leads/:id - Get lead details (Authenticated)
- PATCH /leads/:id - Update lead status or details (Authenticated)
- DELETE /leads/:id - Soft delete a lead (Authenticated)

## AI
- POST /ai/email - Generate personalized email for a lead (Authenticated)
- POST /ai/insights - Get AI insights for a company (Authenticated)
