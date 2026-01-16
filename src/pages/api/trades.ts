import type { APIRoute } from "astro";
import { db } from "@/lib/db";

export const POST: APIRoute = async ({ request }) => {
  try {
    // Obtener datos del formulario
    const formData = await request.formData();

    const fecha = formData.get('created_at') as string;
    const activo = formData.get('activo') as string;
    const tipo = formData.get('tipo') as string;
    const lotaje = parseFloat(formData.get('lotaje') as string);
    const precio_entrada = parseFloat(formData.get('precio_entrada') as string);
    const precio_salida = parseFloat(formData.get('precio_salida') as string);
    const ganancia = parseFloat(formData.get('ganancia') as string);
    const comentario = formData.get('comentario') as string || null;

    // Validación básica
    if (!fecha || !activo || !tipo || isNaN(lotaje) || isNaN(precio_entrada) || isNaN(precio_salida) || isNaN(ganancia)) {
      return new Response(JSON.stringify({
        success: false,
        message: 'Datos incompletos o inválidos',
        data: { fecha, activo, tipo, lotaje, precio_entrada, precio_salida, ganancia, comentario }
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Validaciones específicas
    const fechaFormatted = fecha.split('T')[0];

    if (tipo !== 'compra' && tipo !== 'venta') {
      return new Response(JSON.stringify({
        success: false,
        message: 'Tipo de operación inválido'
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Crear conexión a MySQL

    try {
      // Insertar el trade
      const [result] = await db.query(
        `INSERT INTO trades (fecha, activo, tipo, lotaje, precio_entrada, precio_salida, ganancia, comentario) 
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [fechaFormatted, activo, tipo, lotaje, precio_entrada, precio_salida, ganancia, comentario]
      );

      // Actualizar resumen diario
      await db.query(
        'CALL actualizar_resumen(?)',
        [fechaFormatted]
      );

      return new Response(JSON.stringify({
        success: true,
        message: 'Trade registrado exitosamente',
        tradeId: (result as any).insertId
      }), {
        status: 201,
        headers: { 'Content-Type': 'application/json' }
      });

    } catch (dbError) {
      throw dbError;
    }

  } catch (error) {
    console.error('Error al registrar trade:', error);
    return new Response(JSON.stringify({
      success: false,
      message: 'Error al registrar el trade',
      error: error instanceof Error ? error.message : 'Error desconocido'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
