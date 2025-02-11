import { prisma } from "@/db";
import React from "react";
import PostsGrid from "@/components/PostsGrid";

const ProfilePosts = async ({ email }: { email: string }) => {
  const posts = await prisma.post.findMany({ where: { author: email } });
  
  return( <PostsGrid posts={posts} />);
};

export default ProfilePosts;
