import { User } from "@prisma/client";
import React from "react";
import Avatar from "./Avatar";
import { format } from "date-fns";

const Comment = ({
  text,
  authorProfile,
  createdAt,
}: {
  text: string;
  authorProfile?: User;
  createdAt: Date;
}) => {
  return (
    <div className="flex gap-2">
      <div className="">
        <Avatar src={authorProfile?.avatar || ""} />
      </div>
      <div className="w-full">
        <div className="flex justify-between gap-2">
          <div className="">
            <h3 className="flex gap-1 dark:text-gray-300">{authorProfile?.name}</h3>
            <h4 className="text-gray-600 dark:text-gray-500 text-sm -mt-1">
              @{authorProfile?.username}
            </h4>
          </div>
        </div>
        <div className="">
          <div className="bg-gray-200 dark:bg-gray-700 border dark:border-0 dark:text-gray-400 border-gray-300 p-4 mt-2 rounded-md">
            <p>{text}</p>
          </div>
          <time className="text-xs text-gray-400 text-right">
            {format(createdAt, "yyyy-MM-dd HH:mm:ss")}
          </time>
        </div>
      </div>
    </div>
  );
};

export default Comment;
