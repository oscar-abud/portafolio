import { useState } from 'react';
import { z } from 'zod';

const contactSchema = z.object({
  nombre: z.string().min(3, 'El nombre debe tener al menos 3 caracteres'),
  correo: z.string().email('Correo electrónico no válido'),
  tipo: z.enum(['landing', 'aplicacion-web', 'armado-pc'], {
    message: 'Tipo de trabajo inválido',
  }),
  mensaje: z.string().min(10, 'El mensaje debe tener al menos 10 caracteres'),
});

const inputClass =
  'rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none transition focus:border-amber-400 focus:ring-2 focus:ring-amber-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400';
const labelClass = 'text-sm font-semibold text-gray-700 dark:text-gray-200';
const errorClass = 'text-sm font-medium text-red-500';

export default function ContactForm() {
  const [form, setForm] = useState({
    nombre: '',
    correo: '',
    tipo: '',
    mensaje: '',
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [toast, setToast] = useState(null);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const result = contactSchema.safeParse(form);
    if (!result.success) {
      setErrors(result.error.flatten().fieldErrors);
      return;
    }

    setErrors({});
    setStatus('loading');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(result.data),
      });

      const json = await res.json();

      if (!res.ok) {
        setStatus('error');
        showToast('Ocurrió un error al enviar. Intenta de nuevo.', 'error');
        return;
      }

      setStatus('success');
      showToast('Correo enviado con éxito', 'success');
      console.log('Datos enviados:', json.data);
      setForm({ nombre: '', correo: '', tipo: '', mensaje: '' });
    } catch (error) {
      console.error('Error:', error);
      setStatus('error');
      showToast('Ocurrió un error de conexión.', 'error');
    }
  }

  function showToast(message, type) {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  }

  return (
    <div className="relative">
      <form onSubmit={handleSubmit} className="grid gap-6" noValidate>
        <div className="flex flex-col gap-2">
          <label htmlFor="nombre" className={labelClass}>Nombre completo</label>
          <input
            id="nombre"
            name="nombre"
            type="text"
            placeholder="Ej: Juan Pérez"
            value={form.nombre}
            onChange={handleChange}
            className={inputClass}
          />
          {errors.nombre && <p className={errorClass}>{errors.nombre}</p>}
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="correo" className={labelClass}>Correo electrónico</label>
          <input
            id="correo"
            name="correo"
            type="email"
            placeholder="Ej: juan@correo.com"
            value={form.correo}
            onChange={handleChange}
            className={inputClass}
          />
          {errors.correo && <p className={errorClass}>{errors.correo}</p>}
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="tipo" className={labelClass}>Tipo de trabajo a cotizar</label>
          <select
            id="tipo"
            name="tipo"
            value={form.tipo}
            onChange={handleChange}
            className={inputClass}
          >
            <option value="" disabled>Selecciona una opción...</option>
            <option value="landing">Landing Page</option>
            <option value="aplicacion-web">Aplicación Web</option>
            <option value="armado-pc">Armado de computadores</option>
          </select>
          {errors.tipo && <p className={errorClass}>{errors.tipo}</p>}
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="mensaje" className={labelClass}>Escribe tu mensaje</label>
          <textarea
            id="mensaje"
            name="mensaje"
            rows="5"
            placeholder="Cuéntame sobre tu proyecto, alcance, plazos, etc."
            value={form.mensaje}
            onChange={handleChange}
            className={`${inputClass} resize-none`}
          ></textarea>
          {errors.mensaje && <p className={errorClass}>{errors.mensaje}</p>}
        </div>

        <button
          type="submit"
          disabled={status === 'loading'}
          className="w-full cursor-pointer rounded-2xl bg-amber-300 py-3 text-base font-bold text-gray-950 transition hover:bg-amber-400 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === 'loading' ? 'Enviando...' : 'Enviar'}
        </button>
      </form>

      {toast && (
        <div
          className={`fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-xl px-6 py-4 shadow-lg transition dark:text-white ${
            toast.type === 'success'
              ? 'bg-green-600 text-white'
              : 'bg-red-600 text-white'
          }`}
        >
          {toast.message}
        </div>
      )}
    </div>
  );
}
