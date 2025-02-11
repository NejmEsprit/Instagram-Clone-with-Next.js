import { auth } from "@/auth";
import PostsGrid from "@/components/PostsGrid";
import ProfilePageContent from "@/components/ProfilePageContent";
import ProfilePosts from "@/components/ProfilePosts";
import { prisma } from "@/db";
import { CheckIcon, ChevronLeft, Cog } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import React, { Suspense } from "react";

const ProfilePage = async () => {
  const session = await auth();
  const profile = await prisma.user.findFirst({
    where: { email: session?.user?.email as string },
  });
  if(!profile ){
  return  redirect('/settings')
  }
  return (
    <ProfilePageContent
    ourFollow={null}
    profile={profile}
    isOurProfile={true} />
  );
};

export default ProfilePage;
