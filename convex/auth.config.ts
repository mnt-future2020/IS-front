// Convex Auth Configuration
// IMPORTANT: Update the domain when deploying to production
// Development: https://exact-duckling-9.clerk.accounts.dev
// Production: https://your-clerk-instance.clerk.accounts.dev
//
// Get your Clerk domain from: https://dashboard.clerk.com/
// Format: https://{your-instance-name}.clerk.accounts.dev

const CLERK_DOMAIN = process.env.CLERK_ISSUER_URL || "https://exact-duckling-9.clerk.accounts.dev";

export default {
  providers: [
    {
      domain: CLERK_DOMAIN,
      applicationID: "convex",
    },
  ],
};
