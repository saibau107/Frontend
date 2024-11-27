# React Auth RBAC

## OAuth Configuration

To enable social login, you need to set up OAuth credentials for Google and/or Auth0:

### Google OAuth Setup:

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google+ API
4. Go to Credentials
5. Create an OAuth 2.0 Client ID
6. Add your application's domain to the authorized origins
7. Copy the Client ID

### Auth0 Setup:

1. Sign up for an [Auth0 account](https://auth0.com/)
2. Create a new application
3. Select "Single Page Application"
4. Configure the following:
   - Allowed Callback URLs: `http://localhost:5173`
   - Allowed Logout URLs: `http://localhost:5173`
   - Allowed Web Origins: `http://localhost:5173`
5. Copy the Domain and Client ID

### Environment Variables:

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```
2. Update the values in `.env` with your OAuth credentials