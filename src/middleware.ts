import { clerkMiddleware } from '@clerk/nextjs/server';

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};

export default clerkMiddleware();
