import { db } from "@/lib/db";

export const getTrades = async () => {
  const query = 'SELECT * FROM trades ORDER BY created_at DESC';
  try {
    const [trades] = await db.query(query);
    return trades;
  } catch (error) {
    console.error('Error fetching trades:', error);
    throw error;
  }
}