import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { Database, Tables } from "@/database.types";
import sharp from "sharp";

function validate(election: Tables<"elections">): {
  valid: boolean;
  message?: string;
} {
  if (!election.election_name) {
    return { valid: false, message: "Election name is srequired." };
  }
  return { valid: true };
}


export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const supabase = createClient();
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();
    if (userError || !user) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 },
      );
    }

    const isAdmin = await supabase
      .from("users")
      .select("admin")
      .eq("id", user.id);
    if (
      isAdmin.error ||
      !isAdmin.data ||
      isAdmin.data.length === 0 ||
      !isAdmin.data[0].admin
    ) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 },
      );
    }

    const elections = await request.json();
    if (!elections) {
      return NextResponse.json(
        { success: false, message: "Invalid request" },
        { status: 400 },
      );
    }

    const responseData = {
      election_id: elections.election_id,
      election_name: elections.election_name,
      election_details: elections.election_details || "",
    }
    
    const validation = validate(elections);  
    if (!validation.valid) {
      return NextResponse.json(
        { success: false, message: validation.message },
        { status: 400 },
      );
    }
    
    const { data, error } = await supabase
    .from('elections')
    .insert([responseData])
    .select()
    if (error) {
      throw new Error(error.message);
    }

    const electionId = data[0]?.election_id;
    if (!electionId) {
      throw new Error("Failed to get election ID");
    }

    return NextResponse.json({
      success: true,
      message: "Election added successfully",
      id: electionId,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 },
    );
  }
}
