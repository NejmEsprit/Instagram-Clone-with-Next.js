import { auth, signOut } from "@/auth";
import SettingsForm from "@/components/SettingsForm";
import { prisma } from "@/db";
import { Button, TextArea, TextField } from "@radix-ui/themes";
import { CloudUploadIcon } from "lucide-react";

import { redirect } from "next/navigation";
import React from "react";

const SettingsPage = async () => {
  const session = await auth();
  if (!session?.user?.email) {
    return "not logged in";
  }
  const profile = await prisma.user.findFirst({
    where: { email: session?.user?.email },
  });

  return (
    <div className=" max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-center">Profile Settings</h1>
      <p className=" text-center text-gray-500 text-xs -mt-4 mb-4">{session.user.email}</p>
      <SettingsForm profile={profile} />
      <div className=" flex justify-center mt-2 pt-2 border-t border-gray-300">
        <form
          action={async () => {
            "use server";
            await signOut();
          }}
        >
          <Button type="submit" variant="outline">
            Lougout
          </Button>
        </form>
      </div>
    </div>
  );
};

export default SettingsPage;
