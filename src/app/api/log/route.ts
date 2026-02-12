import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

const LOG_DIR = path.join(process.cwd(), "logs");
const LOG_FILE = path.join(LOG_DIR, "actions.jsonl");

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const entry = {
      ...body,
      serverTimestamp: new Date().toISOString(),
    };

    await fs.mkdir(LOG_DIR, { recursive: true });
    await fs.appendFile(LOG_FILE, JSON.stringify(entry) + "\n", "utf-8");

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Logging error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to write log" },
      { status: 500 }
    );
  }
}
