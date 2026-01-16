import { db } from "@/lib/db";

export type TipoOperacion = 'compra' | 'venta';

export interface Trade {
  id: number;
  fecha: string; // formato 'YYYY-MM-DD'
  activo: string;
  tipo: TipoOperacion;
  lotaje: number;
  precio_entrada: number;
  precio_salida: number;
  ganancia: number;
  comentario: string | null;
  fecha_registro: string; // timestamp
}

export const getTrades = async () => {
  const query = 'SELECT * FROM trades';
  try {
    const [trades] = await db.query(query);
    return trades as Trade[];
  } catch (error) {
    console.error('Error fetching trades:', error);
    throw error;
  }
}