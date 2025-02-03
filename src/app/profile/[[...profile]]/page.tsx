import { UserProfile } from '@clerk/nextjs'

const UserProfilePage = ({ params }: { params: { profile: string } }) => (
  <UserProfile />
)

export default UserProfilePage