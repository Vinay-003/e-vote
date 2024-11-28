"use server";
import { cookies, headers } from "next/headers";
import { RedirectType, redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

export const Login = async (credentials: {
  email: string;
  password: string;
}) => {
  const supabase = createClient();

  const cookiesObj = await cookies();
  cookiesObj.set("email", credentials.email);
  
  const { error } = await supabase.auth.signInWithPassword({
    email: credentials.email as string,
    password: credentials.password as string,
  });
  if (error) {
    return { error: error.message };
  }
  return { error: null };
};

export const SignUp = async (credentials: {
  email: string;
  password: string;
}) => {
  const origin = (await headers()).get("origin");
  const supabase = createClient();

  const cookiesObj = await cookies();
  cookiesObj.set("email", credentials.email);

  const {
    data: { user, session },
    error,
  } = await supabase.auth.signUp({
    email: credentials.email as string,
    password: credentials.password as string,
    options: {
      emailRedirectTo: `${origin}/api/auth/v1/confirm`,
    },
  });

  if (error) {
    console.log(error);
    return { error: error.message };
  }
  if (session || user?.role !== "authenticated") {
    return { error: "Email already exists" };
  }
  return { error: null };
};