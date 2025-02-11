import { Session } from "next-auth";
import React from "react";
import HomeTopRow from "./HomeTopRow";
import { prisma } from "@/db";
import HomePosts from "./HomePosts";

const UserHome = async ({ session }: { session: Session }) => {
  const follows = await prisma.follower.findMany({
    where: {
      followingProfileEmail: session?.user?.email || "",
    },
  });
  const profiles = await prisma.user.findMany({
    where: {
      id: { in: follows.map((f) => f.followedProfileId) },
    },
  });
  return (

    <div>
      <div className=" flex flex-col gap-8">
        <HomeTopRow follows={follows} profiles={profiles} />
        <HomePosts follows={follows} profiles={profiles} />
        posts
      </div>
    </div>
  );
};

export default UserHome;
