import NextAuth from 'next-auth';
import Zitadel from 'next-auth/providers/zitadel';

export const {
  handlers: { GET, POST },
  auth,
} = NextAuth({
  providers: [
    Zitadel({
      clientId: '243151322562550215@mumble_auth_demo',
      issuer: 'https://cas-fee-adv-ed1ide.zitadel.cloud',
      authorization: {
        params: {
          scope: 'openid profile email urn:zitadel:iam:org:project:id:229389352298352392:aud',
        },
      },
      checks: ['pkce', 'state'],
      client: {
        token_endpoint_auth_method: 'none',
      },
    }),
  ],
  session: {
    maxAge: 12*60*60, // 12 hours
  },
  callbacks: {
    async jwt({ token, user, account }) {
      if (account) {
        token.accessToken = account.access_token;
        token.expiresAt = (account.expires_at ?? 0) * 1000;
      }

      if (user) {
        token.user = user;
      }

      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      session.user = token.user;
      return session;
    },
  },
  secret:
    process.env.NEXTAUTH_SECRET ??
    (function () {
      console.warn('NO NEXT AUTH SECRET SET!!!');
      return 'this-is-very-secret';
    })(),
});
