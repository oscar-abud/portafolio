export interface Experiencia {
  empresa: string;
  puesto: string;
  periodo: string;
  tecnologias: string[];
  descripcion: string;
  orden?: number;
}

const archivos = import.meta.glob('../experiencias/*.md', { eager: true });

export function getExperiencias(): Experiencia[] {
  const experiencias = Object.values(archivos).map((mod: any) => mod.frontmatter as Experiencia);

  return experiencias.sort((a, b) => (a.orden ?? 0) - (b.orden ?? 0));
}