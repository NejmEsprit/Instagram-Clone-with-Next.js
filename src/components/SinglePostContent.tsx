import Comment from "@/components/Comment";
import SessionCommentForm from "@/components/SessionCommentForm";
import React, { Suspense } from "react";

import { BookmarkIcon } from "lucide-react";
import LikesInfo from "@/components/LikesInfo";
import { getSesionEmailOrThrow, getSinglePostData } from "@/actions";
import {
  Bookmark,
  Comment as CommentModel,
  Like,
  Post,
  User,
} from "@prisma/client";
import Preloader from "./Preloader";
import BookmarkButton from "./BookmarkButton";

const SinglePostContent = ({
  post,
  authorProfile,
  comments,
  commentsAuthors,
  myLike,
  myBookmark,
}: {
  post: Post;
  authorProfile: User;
  comments: CommentModel[];
  commentsAuthors: User[];
  myLike: Like | null;
  myBookmark: Bookmark | null;
}) => {
  return (
    <div>
      <div className="grid md:grid-cols-2 gap-4">
        <div className="">
          <img src={post.image} alt={post.description} className="rounded-md" />
        </div>
        <div className="">
          <Comment
            text={post.description}
            authorProfile={authorProfile}
            createdAt={post.createdAt}
          />
          <div className="pt-4 flex flex-col gap-4">
            {comments.map((comment) => (
              <div className="" key={comment.id}>
                <Comment
                  text={comment.text}
                  authorProfile={commentsAuthors.find(
                    (a) => a.email === comment.author
                  )}
                  createdAt={comment.createdAt}
                />
              </div>
            ))}
          </div>
          <div className=" flex items-center dark:text-gray-400 gap-2 justify-between py-4 mt-4 border-t border-t-gray-300 text-gray-700 dark:border-gray-700 ">
            <LikesInfo post={post} sessionLike={myLike} />
            <div className="flex items-center">
              <BookmarkButton post={post} sessionBookmark={myBookmark} />
            </div>
          </div>
          <div className="pt-8 border-t border-t-gray-300 dark:border-gray-700">
            post your comments
            <Suspense fallback={<Preloader />}>
              <SessionCommentForm postId={post.id} />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SinglePostContent;
