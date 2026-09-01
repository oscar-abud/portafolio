import { r as __exportAll } from "./rolldown-runtime_BMI-E3GI.mjs";
import { z } from "zod";
//#region src/pages/api/contact.ts
var contact_exports = /* @__PURE__ */ __exportAll({ POST: () => POST });
var contactSchema = z.object({
	nombre: z.string().min(3, "El nombre debe tener al menos 3 caracteres"),
	correo: z.string().email("Correo no válido"),
	tipo: z.enum([
		"landing",
		"aplicacion-web",
		"armado-pc"
	], { message: "Tipo de trabajo inválido" }),
	mensaje: z.string().min(10, "El mensaje debe tener al menos 10 caracteres")
});
var POST = async ({ request }) => {
	try {
		const body = await request.json();
		const result = contactSchema.safeParse(body);
		if (!result.success) return new Response(JSON.stringify({
			ok: false,
			errors: result.error.flatten().fieldErrors
		}), {
			status: 400,
			headers: { "Content-Type": "application/json" }
		});
		const data = result.data;
		console.log("=== NUEVO MENSAJE DE CONTACTO ===");
		console.log("Nombre:", data.nombre);
		console.log("Correo:", data.correo);
		console.log("Tipo de trabajo:", data.tipo);
		console.log("Mensaje:", data.mensaje);
		console.log("=================================");
		return new Response(JSON.stringify({
			ok: true,
			message: "Mensaje recibido con éxito",
			data
		}), {
			status: 200,
			headers: { "Content-Type": "application/json" }
		});
	} catch (error) {
		console.error("Error procesando el contacto:", error);
		return new Response(JSON.stringify({
			ok: false,
			message: "Error procesando la solicitud"
		}), {
			status: 500,
			headers: { "Content-Type": "application/json" }
		});
	}
};
//#endregion
//#region \0virtual:astro:page:src/pages/api/contact@_@ts
var page = () => contact_exports;
//#endregion
export { page };
