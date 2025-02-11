import { prisma } from "@/db";
import React from "react";
import Link from "next/link";
import { Avatar } from "@radix-ui/themes";
import PostsGrid from "./PostsGrid";

const SearchResults = async ({ query }: { query: string }) => {
  const profiles = await prisma.user.findMany({
    where: {
      OR: [{ username: { contains: query } }, { name: { contains: query } }],
    },
  });
  const posts = await prisma.post.findMany({
    where: {
      description: { contains: query },
    },
    take: 100,
  });
  return (
    <div>
      <h1 className="text-lg mt-4 mb-2">Search results for "{query}"</h1>

      {profiles.length > 0 && (
        <div className="grid mt-4 sm:grid-cols-1 gap-2">
          {profiles.map((profile) => (
            <Link
              href={`/users/${profile.username}`}
              className="flex gap-2 bg-gray-200 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 p-2 rounded-full "
            >
              <div className="">
                <Avatar
                  radius="full"
                  size="4"
                  fallback="userAvatar"
                  src={profile.avatar || ""}
                />
              </div>
              <div className="">
                <h3 className="">{profile.name}</h3>
                <h4 className="text-gray-500 dark:text-gray-300">
                  @{profile.username}
                </h4>
              </div>
            </Link>
          ))}
        </div>
      )}
      <div className="mt-4">
        Posts:
        <PostsGrid posts={posts} />
      </div>
    </div>
  );
};

export default SearchResults;
