import { getSesionEmailOrThrow, getSessionEmail } from "@/actions";
import ProfilePageContent from "@/components/ProfilePageContent";
import { prisma } from "@/db";
import React from "react";

const UserProfilePage = async ({
  params,
}: {
  params: { username: string };
}) => {
  const { username } = await params;
  const sessionEmail = await getSessionEmail() || "";
  const profile = await prisma.user.findFirstOrThrow({
    where: { username }
  });
  const ourfllow = await prisma.follower.findFirst({
    where: {
      followingProfileEmail: sessionEmail,
      followedProfileId: profile.id,
    },
  });
  return (
    <ProfilePageContent
      isOurProfile={profile.email === sessionEmail}
      ourFollow={ourfllow}
      profile={profile}
    />
  );
};

export default UserProfilePage;
