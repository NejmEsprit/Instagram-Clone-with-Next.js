"use client";

import { Post } from "@prisma/client";
import Link from "next/link";
import React from "react";
import Masonry from "react-masonry-css";

const PostsGrid = ({ posts }: { posts: Post[] }) => {
  return (
    <div className="max-w-4xl mx-auto">
    <Masonry
      breakpointCols={{
        default: 4,
        860: 3,
        500: 2
      }}
      className="flex -ml-4"
      columnClassName="pl-4">
      {posts.map(post => (
        <Link
          key={post.id}
          href={`/post/${post.id}`} className="block mb-4">
          <img
            className="rounded-lg"
            src={post.image} alt=""/>
        </Link>
      ))}
    </Masonry>
  </div>
  );
};

export default PostsGrid;
