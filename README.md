# Mumble Auth Demo

This is a demo application to show the usage of OIDC within Mumble.

This project uses **Better Auth** with the Generic OAuth plugin for authentication.

## Prerequisites

The following steps are necessary to authenticate against the Mumble API:

- A new organization for your team must be created within ZITADEL
- The API project must be granted from the ZITADEL admin
- Create your user within your own organization
- Create the project/application in your organization for your project(s) (e.g. Mumble NextJS Dev / Prod / Whatever)

## Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Better Auth

This project uses Better Auth with a SQLite database adapter. The database is required to store OAuth account data, including access tokens from Zitadel.

**Important:** A database adapter is necessary to persist OAuth access tokens. The in-memory adapter will not work for retrieving access tokens as it doesn't persist account data across requests.

### 3. Initialize Database

Run the Better Auth migration to create the required database tables:

```bash
npx better-auth migrate
```

This creates an `auth.db` file

### 4. Configure PKCE and Audience

The authentication is configured in `lib/auth.ts` using the Generic OAuth plugin with:

- **PKCE enabled** (`pkce: true`) - no client secret required
- **Correct ["audience"](https://community.auth0.com/t/what-is-the-audience/71414) scope** for Mumble API access:
  ```ts
  scopes: [
    "openid",
    "profile",
    "email",
    "urn:zitadel:iam:org:project:id:YOUR_PROJECT_ID:aud",
  ]
  ```

## Running the Application

```bash
npm run dev
```

Visit `http://localhost:3000` and log in with your ZITADEL user.

## How It Works

1. **Authentication:** Uses Better Auth's Generic OAuth plugin with Zitadel OIDC
2. **Session Management:** Sessions are stored in SQLite with a 12-hour expiry
3. **Access Token Retrieval:** The `getAccessToken()` function in `lib/auth.ts` retrieves the OAuth access token from the database
4. **API Calls:** The access token is used to authorize requests to the Mumble API

## Database Requirement

**Why SQLite is needed:**

Better Auth stores OAuth account information (including access tokens) in the database. When using the in-memory adapter, this data is not persisted, which causes the `getAccessToken()` API to fail with "Account not found" errors.

