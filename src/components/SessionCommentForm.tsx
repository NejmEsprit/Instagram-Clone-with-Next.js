import { auth } from "@/auth";
import { prisma } from "@/db";
import React from "react";
import CommentForm from "./CommentForm";

const SessionCommentForm = async ({ postId }: { postId: string }) => {
  const session = await auth();
  const profile = await prisma.user.findFirstOrThrow({
    where: {
      email: session?.user?.email as string,
    },
  });
  return <CommentForm postId={postId} avatar={profile.avatar || ""} />;
};

export default SessionCommentForm;
