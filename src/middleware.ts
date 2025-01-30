import { clerkMiddleware } from '@clerk/nextjs/server';

const publishableKey = "pk_test_d2VsY29tZS1zd2lmdC0yNy5jbGVyay5hY2NvdW50cy5kZXYk";

if (!publishableKey) {
  throw new Error("NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY is not set in the environment variables.");
}

export const config = {
  publicRoutes: ['/'],
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};

export default clerkMiddleware({ publishableKey });
