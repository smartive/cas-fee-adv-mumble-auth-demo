import { NextApiRequest, NextApiResponse } from "next";
import { auth } from "../auth/[...nextauth]/auth";

export async function GET(req: NextApiRequest, res: NextApiResponse) {
    const session = await auth(req, new Response() as any);
    console.log('🔥');
    console.log(session);
    console.log(JSON.stringify(session));
    console.log(session?.user);
    console.log(session?.accessToken);
    console.log('🔥');
    return new Response('OK', { status: 200 });
}
