import { Follower, User } from "@prisma/client";
import React, { Suspense } from "react";
import ProfilePosts from "./ProfilePosts";
import Preloader from "./Preloader";
import ProfilePageInfo from "./ProfilePageInfo";
import ProfileNav from "./ProfileNav";

const ProfilePageContent = ({
  profile,
  isOurProfile = false,
  ourFollow = null,
}: {
  profile: User;
  isOurProfile?: boolean;
  ourFollow: Follower | null;
}) => {
  return (
    <main>
      <ProfilePageInfo
        isOurProfile={isOurProfile}
        profile={profile}
        ourFollow={ourFollow}
      />
     <ProfileNav isOurProfile={isOurProfile} username={profile.username ||''}/>
      <section className="mt-4">
        <Suspense fallback={<Preloader />}>
          <ProfilePosts email={profile?.email || ""} />
        </Suspense>
      </section>
    </main>
  );
};

export default ProfilePageContent;
