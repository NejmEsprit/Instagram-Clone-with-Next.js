import { pinata } from "@/config";
import { NextResponse, type NextRequest } from "next/server";

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(request: NextRequest) {
  try {
    const data = await request.formData();
    const file: File | null = data.get("file") as unknown as File;
    // if (!file) {
    //   throw new Error("Aucun fichier trouvé dans le formulaire.");
    // }
    const uploadData = await pinata.upload.file(file, {
      groupId: '01945b77-0c64-728a-9ba2-af79104155e9',
    });
    // const url = await pinata.gateways.createSignedURL({
    //   cid: uploadData.cid,
    //   expires: 3600,
    // });
    // const info = await pinata.groups.create({
    //   name: "ig-photos",
    //   isPublic: true,
    // });
    // console.log({ info });

    const fileUrl = `https://${process.env.NEXT_PUBLIC_GATEWAY_URL}/files/${uploadData.cid}`;
    return NextResponse.json(fileUrl, { status: 200 });
  } catch (e) {
    console.log(e);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
