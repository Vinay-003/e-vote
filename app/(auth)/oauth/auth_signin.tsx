'use server'
import { cookies, headers } from "next/headers";
import { createClient } from "@/utils/supabase/server";

export const AuthSignIn = async () => {
  const origin = (await headers()).get("origin");
  const gmail = (await cookies())?.get("email")?.value || "";

  const supabase = createClient();
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${origin}/api/auth/v1/callback`,
      queryParams: {
        include_granted_scopes: "true",
        access_type: "offline",
        prompt: "select_account",
        login_hint: gmail,
      },
    },
  });
  if (error) return { error: error.message, url: null };
  if (data.url) return { error: null, url: data.url };
  return { error: "Error signing in", url: null };
};
