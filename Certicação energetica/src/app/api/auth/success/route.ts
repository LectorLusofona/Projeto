import prisma from "@/lib/prisma";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextResponse } from "next/server";

export async function GET() {
  const { getUser } = await getKindeServerSession();
  const user = await getUser();

  if (!user || !user.id) {
    return NextResponse.json(
      { error: "Something went wrong with authentication", user },
      { status: 401 }
    );
  }

  const dbUser = await prisma.user.findUnique({
    where: {
      id: user.id,
    },
  });

  if (!dbUser) {
    await prisma.user.create({
      data: {
        id: user.id,
        firstName: user.given_name ?? "",
        lastName: user.family_name ?? "",
        email: user.email ?? "",
      },
    });

    return NextResponse.redirect("http://localhost:3000/");
  }

  // Se o usuário já existe, ainda assim precisamos retornar algo
  return NextResponse.redirect("http://localhost:3000/");
}
