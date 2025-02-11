import { Follower, User } from "@prisma/client";
import { Avatar } from "@radix-ui/themes";
import { PlusIcon } from "lucide-react";
import React from "react";

const HomeTopRow = async ({
  follows,
  profiles,
}: {
  follows: Follower[];
  profiles: User[];
}) => {
  return (
    <div className="flex gap-3 lg:justify-center max-w-full overflow-x-auto">
      <div className="">
        <button className="bg-gradient-to-tr from-ig-orange to-ig-red text-white size-[92px] rounded-full flex items-center justify-center">
          <PlusIcon size="42" />
        </button>
        <p className="text-gray-400 text-center text-sm">New story</p>
      </div>
      {profiles.map((profile) => (
        <div className=" w-24 flex flex-col justify-center items-center">
          <div className="">
            <div className="inline-block p-1 rounded-full bg-gradient-to-tr from-ig-orange to-ig-red">
              <div className=" inline-block p-0.5 bg-white dark:bg-black rounded-full">
                <Avatar
                  fallback={"avatar"}
                  src={profile.avatar || ""}
                  size="6"
                  radius="full"
                />
              </div>
            </div>
          </div>
          <p className="text-gray-400 text-center text-sm">
            {profile.username}
          </p>
        </div>
      ))}
    </div>
  );
};

export default HomeTopRow;
