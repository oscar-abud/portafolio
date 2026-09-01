import type { APIRoute } from "astro";
import { z } from "zod";
import { Resend } from "resend";

const contactSchema = z.object({
  nombre: z.string().min(3, "El nombre debe tener al menos 3 caracteres"),
  correo: z.string().email("Correo no válido"),
  tipo: z.enum(["landing", "aplicacion-web", "armado-pc"], {
    message: "Tipo de trabajo inválido",
  }),
  mensaje: z.string().min(10, "El mensaje debe tener al menos 10 caracteres"),
});

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const result = contactSchema.safeParse(body);

    if (!result.success) {
      return new Response(
        JSON.stringify({
          ok: false,
          errors: result.error.flatten().fieldErrors,
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        },
      );
    }

    const data = result.data;

    // console.log('=== NUEVO MENSAJE DE CONTACTO ===');
    // console.log('Nombre:', data.nombre);
    // console.log('Correo:', data.correo);
    // console.log('Tipo de trabajo:', data.tipo);
    // console.log('Mensaje:', data.mensaje);
    // console.log('=================================');

    const apiKey = import.meta.env.RESEND_API_KEY;
    const toEmail = import.meta.env.CONTACT_TO_EMAIL;
    const fromEmail =
      import.meta.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";

    // Si no hay API key configurada, solo logueamos (modo desarrollo)
    if (apiKey && toEmail) {
      try {
        const resend = new Resend(apiKey);

        const html = `
          <h2>Nuevo mensaje de contacto</h2>
          <p><strong>Nombre:</strong> ${data.nombre}</p>
          <p><strong>Correo:</strong> ${data.correo}</p>
          <p><strong>Tipo de trabajo:</strong> ${data.tipo}</p>
          <p><strong>Mensaje:</strong> ${data.mensaje}</p>
        `;

        const { data: emailData, error } = await resend.emails.send({
          from: fromEmail,
          to: [toEmail],
          subject: `Nuevo mensaje de contacto de ${data.nombre}`,
          html,
          replyTo: data.correo,
        });

        if (error) {
          console.error("Error enviando email con Resend:", error);
        } else {
          console.log("Email enviado con Resend, id:", emailData?.id);
        }
      } catch (emailError) {
        console.error("Error en el envío de email con Resend:", emailError);
      }
    } else if (!apiKey) {
      console.warn("RESEND_API_KEY no configurada. Omitiendo envío de email.");
    }

    return new Response(
      JSON.stringify({
        ok: true,
        message: "Mensaje recibido con éxito",
        data,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      },
    );
  } catch (error) {
    console.error("Error procesando el contacto:", error);
    return new Response(
      JSON.stringify({
        ok: false,
        message: "Error procesando la solicitud",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
};
