import { UserProfile } from "@clerk/nextjs";

interface PageProps {
  params: {
    profile: string[]; // Note: this should be string[] for catch-all routes
  };
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function UserProfilePage({ params }: PageProps) {
  return <UserProfile />;
}
