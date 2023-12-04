# Mumble Auth Demo

This is a demo application to show the usage of OIDC within Mumble.

This project uses "authJS", the next iteration of next-auth (v5).

The following steps are necessary to authenticate against the Mumble API:

- A new organization for your team must be created within ZITADEL
- The API project must be granted from the ZITADEL admin
- Create your user within your own organization
- Create the project/application in your organization for your project(s) (e.g. Mumble NextJS Dev / Prod / Whatever)
- Setup the next app according to the lecture
- To use pkce, configure client auth to none and add the pkce check to next-auth:

  ```ts
  {
    //...
    checks: ['pkce', 'state'],
    client: {
      token_endpoint_auth_method: 'none',
    },
    //...
  }
  ```

- To add the required mumble API ["audience"](https://community.auth0.com/t/what-is-the-audience/71414), configure the scope with the project id:
  ```ts
  {
    //...
    authorization: {
      params: {
        scope: 'openid profile email urn:zitadel:iam:org:project:id:229389352298352392:aud',
      },
    },
    //...
  }
  ```

You should now be able to log in with your ZITADEL user (in your own organization)
and then call the API with your access token. The API will allow the call if
the audience is correctly fetched and the project is granted to your organization.
