import type { APIRoute } from "astro";
import { db } from "@/lib/db";

export const GET: APIRoute = async () => {
  const query = 'SELECT * FROM trades ORDER BY created_at DESC';
  try {
    const [trades] = await db.query(query)
    return new Response(JSON.stringify({ data: trades }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
    )
  } catch (error) {
    return new Response(JSON.stringify({ message: 'Error fetching trades', error }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    )
  }
}