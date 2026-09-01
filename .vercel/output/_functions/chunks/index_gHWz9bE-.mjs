import { r as __exportAll } from "./rolldown-runtime_BMI-E3GI.mjs";
import { S as createAstro, d as maybeRenderHead, f as renderHead, i as renderComponent, m as createRenderInstruction, p as addAttribute, s as renderSlot, u as renderTemplate } from "./server_Dw1yZdCf.mjs";
import { t as createComponent } from "./compiler_st2DTkh_.mjs";
import { useEffect, useState } from "react";
import { z } from "zod";
import { jsx, jsxs } from "react/jsx-runtime";
//#region node_modules/.pnpm/astro@7.2.6_@emnapi+core@1._1809f07fe5d6f0af82302b96e1e45f4f/node_modules/astro/dist/runtime/server/render/script.js
async function renderScript(result, id) {
	const inlined = result.inlinedScripts.get(id);
	let content = "";
	if (inlined != null) {
		if (inlined) content = `<script type="module">${inlined}<\/script>`;
	} else {
		const resolved = await result.resolve(id);
		content = `<script type="module" src="${result.userAssetsBase ? (result.base === "/" ? "" : result.base) + result.userAssetsBase : ""}${resolved}"><\/script>`;
	}
	return createRenderInstruction({
		type: "script",
		id,
		content
	});
}
//#endregion
//#region src/components/About.astro
var $$About = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`${maybeRenderHead($$result)}<section id="sobre-mi" class="section scroll-m-20 w-full mx-auto container lg:max-w-4xl md:max-w-2xl"><div class="mb-8"><h2 class="flex items-center text-3xl font-bold tracking-tight gap-x-3 text-black/80 dark:text-white "><svg class="size-8" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0"></path><path d="M6 21v-2a4 4 0 0 1 4 -4h.5"></path><path d="M18 22l3.35 -3.284a2.143 2.143 0 0 0 .005 -3.071a2.242 2.242 0 0 0 -3.129 -.006l-.224 .22l-.223 -.22a2.242 2.242 0 0 0 -3.128 -.006a2.143 2.143 0 0 0 -.006 3.071l3.355 3.296"></path></svg>Sobre mi</h2><div class="mt-3 h-px w-50 bg-gradient-to-r from-amber-300/70 to-transparent" aria-hidden="true"></div></div><article class="flex flex-col items-center justify-center gap-8 text-gray-700 dark:text-gray-200 md:flex-row"><div class="[&amp;&gt;p]:mb-4 [&amp;&gt;p&gt;strong]:text-yellow-500 dark:[&amp;&gt;p&gt;strong]:text-yellow-100 [&amp;&gt;p&gt;strong]:font-normal [&amp;&gt;p&gt;strong]:font-mono text-pretty order-2 md:order-1"><p>Me llamo <strong>Oscar Palma Abud</strong>. Mi interés por la informática me llevó a cursar la carrera de <strong class="text-amber-500 dark:text-amber-400">Ingeniería en Informática en DUOC UC</strong>, mientras lo combinaba rápidamente con el desarrollo real en producción. Actualmente me desempeño como <strong class="text-amber-500 dark:text-amber-400">Desarrollador Fullstack en I&A Tecnología</strong> como freelancer.</p><p>A lo largo de mi experiencia, me he especializado en el ecosistema <strong>JavaScript / TypeScript</strong>. En el frontend trabajo con <strong class="text-amber-500 dark:text-amber-400">Vue 3, Astro 7+, React 18+ y Nextjs 13+</strong>, aplicando buenas prácticas como DRY y gestión de estado con <strong>Pinia o Zustand</strong>. En el backend me enfoco en crear arquitecturas escalables con <strong>NestJS y Express.js</strong>, gestionando persistencia con <strong>PostgreSQL (TypeORM/Prisma), MongoDB y PL/SQL</strong>.</p><p>Como desarrollador, me caracterizo por ser muy autodidacta y tener alta autonomía para resolver problemas complejos. Fuera de la pantalla, soy un entusiasta de la música, el cine y los videojuegos, lo cual me ayuda a despejar la mente y mantener el enfoque analítico al programar.</p></div><img width="200" height="200"${addAttribute("/public/yo.jpg", "src")} alt="Oscar Palma Abud" class="order-1 hover:rotate-0 transition-transform duration-300 object-cover w-64 h-full p-1 md:order-2 rotate-3 lg:p-2 lg:w-65 aspect-square rounded-3xl"></article></section>`;
}, "C:/Users/oscar/workspace/freelance/portafolio/src/components/About.astro", void 0);
//#endregion
//#region src/components/ContactForm.jsx
var contactSchema = z.object({
	nombre: z.string().min(3, "El nombre debe tener al menos 3 caracteres"),
	correo: z.string().email("Correo electrónico no válido"),
	tipo: z.enum([
		"landing",
		"aplicacion-web",
		"armado-pc"
	], { message: "Tipo de trabajo inválido" }),
	mensaje: z.string().min(10, "El mensaje debe tener al menos 10 caracteres")
});
var inputClass = "rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none transition focus:border-amber-400 focus:ring-2 focus:ring-amber-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400";
var labelClass = "text-sm font-semibold text-gray-700 dark:text-gray-200";
var errorClass = "text-sm font-medium text-red-500";
function ContactForm() {
	const [form, setForm] = useState({
		nombre: "",
		correo: "",
		tipo: "",
		mensaje: ""
	});
	const [errors, setErrors] = useState({});
	const [status, setStatus] = useState("idle");
	const [toast, setToast] = useState(null);
	function handleChange(e) {
		const { name, value } = e.target;
		setForm((prev) => ({
			...prev,
			[name]: value
		}));
	}
	async function handleSubmit(e) {
		e.preventDefault();
		const result = contactSchema.safeParse(form);
		if (!result.success) {
			setErrors(result.error.flatten().fieldErrors);
			return;
		}
		setErrors({});
		setStatus("loading");
		try {
			const res = await fetch("/api/contact", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(result.data)
			});
			const json = await res.json();
			if (!res.ok) {
				setStatus("error");
				showToast("Ocurrió un error al enviar. Intenta de nuevo.", "error");
				return;
			}
			setStatus("success");
			showToast("Correo enviado con éxito", "success");
			console.log("Datos enviados:", json.data);
			setForm({
				nombre: "",
				correo: "",
				tipo: "",
				mensaje: ""
			});
		} catch (error) {
			console.error("Error:", error);
			setStatus("error");
			showToast("Ocurrió un error de conexión.", "error");
		}
	}
	function showToast(message, type) {
		setToast({
			message,
			type
		});
		setTimeout(() => setToast(null), 3500);
	}
	return /* @__PURE__ */ jsxs("div", {
		className: "relative",
		children: [/* @__PURE__ */ jsxs("form", {
			onSubmit: handleSubmit,
			className: "grid gap-6",
			noValidate: true,
			children: [
				/* @__PURE__ */ jsxs("div", {
					className: "flex flex-col gap-2",
					children: [
						/* @__PURE__ */ jsx("label", {
							htmlFor: "nombre",
							className: labelClass,
							children: "Nombre completo"
						}),
						/* @__PURE__ */ jsx("input", {
							id: "nombre",
							name: "nombre",
							type: "text",
							placeholder: "Ej: Juan Pérez",
							value: form.nombre,
							onChange: handleChange,
							className: inputClass
						}),
						errors.nombre && /* @__PURE__ */ jsx("p", {
							className: errorClass,
							children: errors.nombre
						})
					]
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "flex flex-col gap-2",
					children: [
						/* @__PURE__ */ jsx("label", {
							htmlFor: "correo",
							className: labelClass,
							children: "Correo electrónico"
						}),
						/* @__PURE__ */ jsx("input", {
							id: "correo",
							name: "correo",
							type: "email",
							placeholder: "Ej: juan@correo.com",
							value: form.correo,
							onChange: handleChange,
							className: inputClass
						}),
						errors.correo && /* @__PURE__ */ jsx("p", {
							className: errorClass,
							children: errors.correo
						})
					]
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "flex flex-col gap-2",
					children: [
						/* @__PURE__ */ jsx("label", {
							htmlFor: "tipo",
							className: labelClass,
							children: "Tipo de trabajo a cotizar"
						}),
						/* @__PURE__ */ jsxs("select", {
							id: "tipo",
							name: "tipo",
							value: form.tipo,
							onChange: handleChange,
							className: inputClass,
							children: [
								/* @__PURE__ */ jsx("option", {
									value: "",
									disabled: true,
									children: "Selecciona una opción..."
								}),
								/* @__PURE__ */ jsx("option", {
									value: "landing",
									children: "Landing Page"
								}),
								/* @__PURE__ */ jsx("option", {
									value: "aplicacion-web",
									children: "Aplicación Web"
								}),
								/* @__PURE__ */ jsx("option", {
									value: "armado-pc",
									children: "Armado de computadores"
								})
							]
						}),
						errors.tipo && /* @__PURE__ */ jsx("p", {
							className: errorClass,
							children: errors.tipo
						})
					]
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "flex flex-col gap-2",
					children: [
						/* @__PURE__ */ jsx("label", {
							htmlFor: "mensaje",
							className: labelClass,
							children: "Escribe tu mensaje"
						}),
						/* @__PURE__ */ jsx("textarea", {
							id: "mensaje",
							name: "mensaje",
							rows: "5",
							placeholder: "Cuéntame sobre tu proyecto, alcance, plazos, etc.",
							value: form.mensaje,
							onChange: handleChange,
							className: `${inputClass} resize-none`
						}),
						errors.mensaje && /* @__PURE__ */ jsx("p", {
							className: errorClass,
							children: errors.mensaje
						})
					]
				}),
				/* @__PURE__ */ jsx("button", {
					type: "submit",
					disabled: status === "loading",
					className: "w-full cursor-pointer rounded-2xl bg-amber-300 py-3 text-base font-bold text-gray-950 transition hover:bg-amber-400 disabled:cursor-not-allowed disabled:opacity-60",
					children: status === "loading" ? "Enviando..." : "Enviar"
				})
			]
		}), toast && /* @__PURE__ */ jsx("div", {
			className: `fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-xl px-6 py-4 shadow-lg transition dark:text-white ${toast.type === "success" ? "bg-green-600 text-white" : "bg-red-600 text-white"}`,
			children: toast.message
		})]
	});
}
//#endregion
//#region src/components/Contact.astro
var $$Contact = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`${maybeRenderHead($$result)}<section id="contacto" data-section="contacto" class="section undefined scroll-m-20 w-full mx-auto container lg:max-w-4xl md:max-w-2xl"><div class="mb-10"><h2 class="text-3xl font-bold text-gray-900 dark:text-white">Quieres trabajar conmigo?</h2><h3 class="mt-2 text-lg text-gray-600 dark:text-gray-300">Contáctame y cuéntame tu proyecto</h3></div>${renderComponent($$result, "ContactForm", ContactForm, {
		"client:load": true,
		"client:component-hydration": "load",
		"client:component-path": "@/components/ContactForm.jsx",
		"client:component-export": "default"
	})}</section>`;
}, "C:/Users/oscar/workspace/freelance/portafolio/src/components/Contact.astro", void 0);
//#endregion
//#region src/components/Hero.astro
var $$Hero = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`${maybeRenderHead($$result)}<section id="hero" class="section undefined scroll-m-20 w-full mx-auto container lg:max-w-4xl md:max-w-2xl"><div class="size-30"><img${addAttribute("../../public/logo.png", "src")} alt="developer_icon"></div><h1>Soy Oscar Palma y soy el banner/hero</h1></section>`;
}, "C:/Users/oscar/workspace/freelance/portafolio/src/components/Hero.astro", void 0);
//#endregion
//#region src/components/Footer.astro
var $$Footer = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`${maybeRenderHead($$result)}<footer class="flex flex-col items-center justify-center py-5 my-2"><button id="upButton" title="Subir al inicio" class="w-10 h-10 rounded-full p-2 cursor-pointer my-3 bg-amber-300 hover:bg-amber-400 flex items-center justify-center border-none"><img${addAttribute("../../public/arrow-up.svg", "src")} alt="Ir arriba"></button><p class="footer-copy">© ${(/* @__PURE__ */ new Date()).getFullYear()}<a class="text-blue-500 hover:text-blue-700 dark:text-amber-300 dark:hover:text-amber-400" href="https://github.com/oscar-abud" target="_blank"> Oscar Palma</a>. Hecho con mucho ♥ todos los derechos reservados.</p></footer>${renderScript($$result, "C:/Users/oscar/workspace/freelance/portafolio/src/components/Footer.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Users/oscar/workspace/freelance/portafolio/src/components/Footer.astro", void 0);
//#endregion
//#region src/components/ThemeToggle.jsx
function ThemeToggle() {
	const [theme, setTheme] = useState("dark");
	useEffect(() => {
		setTheme(document.documentElement.classList.contains("dark") ? "dark" : "light");
	}, []);
	function toggleTheme() {
		const next = theme === "dark" ? "light" : "dark";
		setTheme(next);
		document.documentElement.classList.toggle("dark", next === "dark");
		localStorage.setItem("theme", next);
	}
	return /* @__PURE__ */ jsx("button", {
		type: "button",
		onClick: toggleTheme,
		"aria-label": `Cambiar a modo ${theme === "dark" ? "claro" : "oscuro"}`,
		title: `Modo ${theme === "dark" ? "claro" : "oscuro"}`,
		className: "cursor-pointer rounded-lg border border-gray-300 p-2 text-base leading-none transition-colors hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-700",
		children: theme === "dark" ? "☀️" : "🌙"
	});
}
//#endregion
//#region src/components/Navbar.astro
var $$Navbar = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`${maybeRenderHead($$result)}<nav class="flex items-center border-0 rounded-2xl gap-3 z-50 backdrop-blur-md p-0.5 sm:px-5 sm:py-1"><ul class="flex justify-end gap-x-2.5 cursor-pointer text-sm"><a class="sm:text-sm" href="#experiencia">Experiencia</a><a class="sm:text-sm" href="#proyectos">Proyectos</a><a class="sm:text-sm" href="#sobre-mi">Sobre mi</a><a class="sm:text-sm" href="#contacto">Contacto</a></ul>${renderComponent($$result, "ThemeToggle", ThemeToggle, {
		"client:load": true,
		"client:component-hydration": "load",
		"client:component-path": "C:/Users/oscar/workspace/freelance/portafolio/src/components/ThemeToggle.jsx",
		"client:component-export": "default"
	})}</nav>`;
}, "C:/Users/oscar/workspace/freelance/portafolio/src/components/Navbar.astro", void 0);
//#endregion
//#region src/components/Header.astro
var $$Header = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`${maybeRenderHead($$result)}<header class="flex align-bottom justify-center py-5 sticky top-0 z-50">${renderComponent($$result, "Navbar", $$Navbar, {})}</header>`;
}, "C:/Users/oscar/workspace/freelance/portafolio/src/components/Header.astro", void 0);
//#endregion
//#region src/layouts/layout.astro
createAstro("https://astro.build");
var $$Layout = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Layout;
	const { title, nameContent, contenido, url } = Astro.props;
	return renderTemplate`<html lang="es"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><!-- SEO --><meta${addAttribute(nameContent, "name")}${addAttribute(contenido, "content")}><meta property="og:title"${addAttribute(title, "content")}><meta property="og:type" content="Verdulería Virtual"><meta property="og:url"${addAttribute(url, "content")}><meta name="theme-color" content="#0d5a48"><link rel="icon"${addAttribute("./public/logo.ico", "href")} type="image/x-icon"><title>${title}</title><script>
            const saved = localStorage.getItem('theme');
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            document.documentElement.classList.toggle('dark', saved ? saved === 'dark' : prefersDark);
        <\/script>${renderHead($$result)}</head><body class="bg-gray-100 dark:bg-gray-900 scroll-smooth dark:text-white font-semibold"><main class="min-h-[100dvh]
          grid 
          grid-rows-[auto_1fr_auto] 
          mx-auto max-w-[1240px]
          px-5 
          font-mono">${renderComponent($$result, "Header", $$Header, {})}<main class="px-4">${renderSlot($$result, $$slots["default"])}</main>${renderComponent($$result, "Footer", $$Footer, {})}</main></body></html>`;
}, "C:/Users/oscar/workspace/freelance/portafolio/src/layouts/layout.astro", void 0);
//#endregion
//#region src/pages/index.astro
var pages_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Index,
	file: () => $$file,
	url: () => ""
});
var $$Index = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {
		"title": "Mi Portafolio",
		"nameContent": "Bienvenido al portafolio de Oscar Palma",
		"contenido": "Explora mi portafolio, proyectos destacados en desarrollo web y mi experiencia trabajando con Astro, Vue, TypeScript entre otras tecnologías del mundo del TI.",
		"url": "https://seasonharvest.cl/"
	}, { "default": ($$result) => renderTemplate`${renderComponent($$result, "Hero", $$Hero, {})}${renderComponent($$result, "About", $$About, {})}${renderComponent($$result, "Contact", $$Contact, {})}` })}`;
}, "C:/Users/oscar/workspace/freelance/portafolio/src/pages/index.astro", void 0);
var $$file = "C:/Users/oscar/workspace/freelance/portafolio/src/pages/index.astro";
//#endregion
//#region \0virtual:astro:page:src/pages/index@_@astro
var page = () => pages_exports;
//#endregion
export { page };
