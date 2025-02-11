import { auth, signIn, signOut } from "@/auth";
import Preloader from "@/components/Preloader";
import UserHome from "@/components/UserHome";
import { Suspense } from "react";

export default async function Home() {
  const session = await auth();
  return (
    <div className="">
  
      {session && (
        <Suspense fallback={<Preloader />}>
          <UserHome session={session} />
        </Suspense>
      )}
      {!session && (
        <form
          action={async () => {
            "use server";
            await signIn("google");
          }}
        >
          <button
            className="border px-4 py-2 bg-ig-red text-white rounded-lg"
            type="submit"
          >
            Signin with Google
          </button>
        </form>
      )}
      {session && (
        <form
          action={async () => {
            "use server";
            await signOut();
          }}
        >
          <button
            className="border px-4 py-2 bg-ig-red text-white rounded-lg"
            type="submit"
          >
            Signout
          </button>
        </form>
      )}
    </div>
  );
}
