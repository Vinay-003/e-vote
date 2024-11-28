import { type EmailOtpType } from "@supabase/supabase-js";
import { type NextRequest, NextResponse } from "next/server";

import axios from 'axios'

import { createClient } from "@/utils/supabase/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const token_hash = searchParams.get("token_hash");
  const type = searchParams.get("type") as EmailOtpType | null;
  const next = searchParams.get("next") ?? "/home";

  const redirectTo = req.nextUrl.clone();
  redirectTo.pathname = next;
  redirectTo.searchParams.delete("token_hash");
  redirectTo.searchParams.delete("type");

  if (token_hash) {
    const supabase = createClient();
    const { data, error } = await supabase.auth.verifyOtp({
      type: type || "email",
      token_hash: token_hash,
    });
    if (!error) {
      if (data.user && data.user.id) {
        console.log('inserting to users table');

        const { error: insertError } = await supabase
        .from("users")
        .insert([{ id: data.user.id }]);
        if (insertError) {
          redirectTo.searchParams.set("error", insertError.message);
          return NextResponse.redirect(redirectTo);
        }
        
        redirectTo.searchParams.delete("next");
        return NextResponse.redirect(redirectTo);
      } else {
        redirectTo.searchParams.set("error", "Invalid user");
        return NextResponse.redirect(redirectTo);
      }
    }
  }

  redirectTo.pathname = "/signup";
  redirectTo.searchParams.set("error", "Invalid token hash");
  return NextResponse.redirect(redirectTo);
}
