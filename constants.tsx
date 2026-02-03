
import { TechItem } from './types';

/** 
 * CONFIGURACIÓN DE CONTACTO Y REDES SOCIALES
 * Cambia estos valores por los tuyos para que los botones funcionen correctamente.
 */

// Tu número de WhatsApp con código de país (sin el signo +)
export const WHATSAPP_NUMBER = "https://wa.me/51939467706?text=.code"; 

// Tu enlace de repositorio en GitHub
export const GITHUB_URL = "https://github.com/hello-000-1/TIME"; 

// Tu enlace de perfil en TikTok
export const TIKTOK_URL = "https://vt.tiktok.com/ZSaQCV1JN/"; 

// Tu enlace de perfil en Facebook
export const FACEBOOK_URL = "https://www.facebook.com/share/r/17rJmJLt14/";

/**
 * STACK TECNOLÓGICO
 * Puedes cambiar los niveles (0-100) o las categorías según tu experiencia.
 */
export const TECH_STACK: TechItem[] = [
  { name: "JavaScript", category: "Lenguaje", level: 95, icon: "JS" },
  { name: "Python", category: "Lenguaje", level: 90, icon: "PY" },
  { name: "Node.js", category: "Entorno", level: 92, icon: "Node" },
  { name: "HTML/CSS", category: "Diseño", level: 85, icon: "Web" },
  { name: "NPM", category: "Herramientas", level: 88, icon: "NPM" },
  { name: "Bash", category: "Terminal", level: 80, icon: "Bsh" }
];
