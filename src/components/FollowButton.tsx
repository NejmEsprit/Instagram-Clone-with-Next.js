"use client";
import { followUser, unFollowUser } from "@/actions";
import { Follower } from "@prisma/client";
import { Button } from "@radix-ui/themes";
import { UserMinusIcon, UserPlusIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const FollowButton = ({
  profileIdToFollow,
  ourFollow,
}: {
  profileIdToFollow: string;
  ourFollow: Follower | null;
}) => {
  const router = useRouter();
  const [isFollowed, setIsFollowed] = useState<boolean>(!!ourFollow);
  return (
    <form
      action={async () => {
        setIsFollowed((prev) => !prev);
        if (isFollowed) {
          await unFollowUser(profileIdToFollow);
        } else {
          await followUser(profileIdToFollow);
        }
        router.refresh();
      }}
    >
      <input type="hidden" name="profileIdToFollow" value="" />
      <Button
        size="3"
        className={
          isFollowed
            ? "bg-gradient-to-tr from-ig-orange to-ig-red from-70% cursor-pointer"
            : "bg-gradient-to-tr from-ig-orange to-ig-red to-70% cursor-pointer"
        }
      >
        {isFollowed ? <UserMinusIcon /> : <UserPlusIcon />}
        {isFollowed ? "Unfollow" : "follow"}
      </Button>
    </form>
  );
};

export default FollowButton;
