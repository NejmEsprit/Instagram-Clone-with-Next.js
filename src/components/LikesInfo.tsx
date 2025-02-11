"use client";
import { removeLikeFromPost, togglePost } from "@/actions";
import { Like, Post } from "@prisma/client";
import { HeartIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const LikesInfo = ({
  post,
  sessionLike,
  showText = true,
}: {
  post: Post;
  sessionLike: Like | null;
  showText?: boolean;
}) => {
  const [likedByMe, setLikedByMe] = useState(!!sessionLike);
  const router = useRouter();
  return (
    <form
      action={async (data: FormData) => {
        setLikedByMe((prev) => !prev);
        if (likedByMe) {
          removeLikeFromPost(data);
        } else {
          await togglePost(data);
        }

        router.refresh();
      }}
      className="flex items-center gap-2"
    >
      <input type="hidden" name="postId" value={post.id} />
      <button type="submit">
        <HeartIcon className={sessionLike ? 'text-red-500 fill-red-500' : 'dark:text-white'} />
      </button>
      {showText && <p>{post.likesCount} people like this</p>}
    </form>
  );
};

export default LikesInfo;
