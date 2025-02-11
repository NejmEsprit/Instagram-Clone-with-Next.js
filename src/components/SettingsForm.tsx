"use client";
import { updateProfile } from "@/actions";
import { User } from "@prisma/client";
import { Button, Switch, TextArea, TextField } from "@radix-ui/themes";
import { CloudUploadIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";

const SettingsForm = ({ profile }: { profile: User | null }) => {
  const router = useRouter();
  const fileInfoRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [avatarUrl, setAvatarUrl] = useState(profile?.avatar || null);

  useEffect(() => {
    if (file) {
      const data = new FormData();
      data.set("file", file);
      fetch("/api/upload", {
        method: "POST",
        body: data,
      }).then((response) => {
        response.json().then((url) => {
          setAvatarUrl(url);
        });
      });
    }
  }, [file]);
  return (
    <form
      action={async (data: FormData) => {
        await updateProfile(data);
        router.push("/profile");
        router.refresh();
      }}
    >
      <input type="hidden" name="avatar" value={avatarUrl ||''} />
      <div className="flex items-center gap-4">
        <div className="">
          <div className="bg-gray-400 size-24 overflow-hidden rounded-full aspect-square border border-gray-600 shadow-md shadow-gray-500">
            <img className="" src={avatarUrl ||''} alt="" />
          </div>
        </div>
        <div className="">
          <input
            type="file"
            ref={fileInfoRef}
            className="hidden"
            onChange={(ev) => setFile(ev.target.files?.[0] || null)}
          />
          <Button
            variant="surface"
            type="button"
            onClick={() => fileInfoRef.current?.click()}
          >
            <CloudUploadIcon /> Change Avatar
          </Button>
        </div>
      </div>
      <p className="mt-2 font-bold">username</p>
      <TextField.Root
        placeholder="your_username"
        name="username"
        defaultValue={profile?.username || ""}
      />
      <p className="mt-2 font-bold"> name</p>
      <TextField.Root
        placeholder="NejmEddine"
        name="name"
        defaultValue={profile?.name || ""}
      />
      <p className="mt-2 font-bold">subtitle</p>
      <TextField.Root
        placeholder="web devolopper"
        name="subtitle"
        defaultValue={profile?.subtitile || ""}
      />
      <p className="mt-2 font-bold">bio</p>
      <TextArea name="bio" defaultValue={profile?.bio || ""} />
      <label className="flex gap-2 items-center mt-2">
        <span>Dark mode </span>
        <Switch
          defaultChecked={localStorage.getItem('theme') == 'dark'}
          onCheckedChange={(isDark) => {
            const html = document.querySelector('html');
            const theme = isDark ? 'dark' : 'light';
            if (html) {
              html.dataset.theme = theme;
            }
            localStorage.setItem('theme', theme);
            window.location.reload();
        }} />
      </label>
      <div className="mt-4 flex justify-center">
        <Button variant="solid">Save Settings</Button>
      </div>
    </form>
  );
};

export default SettingsForm;
