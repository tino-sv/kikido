import { UserProfile } from "@clerk/nextjs";
import type { NextPage } from "next";

const UserProfilePage: NextPage<{ params: { profile: string } }> = ({
  params,
}) => {
  return <UserProfile />;
};

export default UserProfilePage;
