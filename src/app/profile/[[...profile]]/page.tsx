import { UserProfile } from "@clerk/nextjs";

const UserProfilePage = ({ params }: { params: { profile: string } }) => {
  return <UserProfile />;
};

export default UserProfilePage;
