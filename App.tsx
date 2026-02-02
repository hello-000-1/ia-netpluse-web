
import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Github, 
  MessageCircle, 
  Terminal, 
  Shield, 
  Zap, 
  Cpu, 
  Code,
  Download,
  Sparkles,
  Music,
  Video,
  FileSearch,
  Sticker,
  Facebook,
  Send,
  X,
  Bot,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { TECH_STACK, WHATSAPP_NUMBER, GITHUB_URL, TIKTOK_URL, FACEBOOK_URL } from './constants.tsx';
import TechTable from './components/TechTable.tsx';

// REEMPLAZA ESTA URL CON TU IMAGEN FINAL
const CENTRAL_IMAGE_URL = "https://cdn-images.dzcdn.net/images/cover/55b9c6223109e892edcd3c20f569b57a/1900x1900-000000-80-0-0.jpg";

const App: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [messages, setMessages] = useState<{role: 'user' | 'bot', text: string}[]>([
    { role: 'bot', text: '¡Hola! Soy el asistente de IANetPluse. ¿En qué puedo ayudarte hoy?' }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSendMessage = async () => {
    if (!chatInput.trim() || isTyping) return;

    const userMsg = chatInput;
    setChatInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsTyping(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: [{ parts: [{ text: userMsg }] }],
        config: {
          systemInstruction: `Eres el asistente oficial de IANetPluse, un bot de WhatsApp avanzado. 
          Tus respuestas deben ser cortas, directas y con un tono tecnológico/cyberpunk. 
          Ayuda a los usuarios a entender las funciones: descargas HD de TikTok/YT, creación de stickers, búsqueda con IA, herramientas de administración de grupos y conversión multimedia.`,
        },
      });

      const botText = response.text || 'Lo siento, tuve un problema al procesar tu mensaje. Inténtalo de nuevo.';
      setMessages(prev => [...prev, { role: 'bot', text: botText }]);
    } catch (error) {
      console.error('AI Error:', error);
      setMessages(prev => [...prev, { role: 'bot', text: 'Error de conexión con el motor de IA.' }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-grid text-gray-100 selection:bg-green-500 selection:text-black font-sans">
      {/* Luces de fondo dinámicas */}
      <div className="absolute top-0 -left-20 w-96 h-96 bg-green-500/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 -right-20 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] pointer-events-none"></div>

      {/* Navbar */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-gray-950/90 backdrop-blur-xl py-4 border-b border-white/5 shadow-2xl' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-2 group cursor-pointer" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
            <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center glow transform transition-transform group-hover:rotate-12">
              <Terminal className="text-black" size={24} />
            </div>
            <span className="text-xl font-black tracking-tighter text-white uppercase italic">IANet<span className="text-green-500">Pluse</span></span>
          </div>
          <div className="hidden lg:flex items-center gap-8 text-sm font-medium text-gray-400">
            <a href="#servicios" className="hover:text-green-400 transition-colors uppercase tracking-wider">Servicios</a>
            <a href="#stack" className="hover:text-green-400 transition-colors uppercase tracking-wider">Stack</a>
          </div>
          <a 
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            className="bg-green-500 text-black px-6 py-2 rounded-full font-bold text-sm hover:scale-105 transition-transform shadow-[0_0_20px_rgba(34,197,94,0.3)]"
          >
            WhatsApp
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-40 pb-24 px-6 relative flex flex-col items-center">
        <div className="max-w-5xl mx-auto text-center flex flex-col items-center">
          
          {/* Hero Image perfectamente circular */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ 
              opacity: 1, 
              scale: [1, 1.05, 1], 
            }}
            transition={{ 
              opacity: { duration: 1 },
              scale: { duration: 5, repeat: Infinity, ease: "easeInOut" }
            }}
            className="relative mb-14"
          >
            {/* Resplandor exterior de neón */}
            <div className="absolute inset-0 bg-green-500/20 blur-[70px] rounded-full animate-pulse" />
            
            {/* Contenedor Circular Principal */}
            <div className="relative w-56 h-56 md:w-72 md:h-72 rounded-full p-[4px] bg-gradient-to-tr from-green-500 via-emerald-300 to-green-600 shadow-[0_0_50px_rgba(34,197,94,0.4)] ring-1 ring-white/10 overflow-hidden">
              <div className="w-full h-full rounded-full overflow-hidden bg-gray-950 flex items-center justify-center relative">
                <motion.img 
                  src={CENTRAL_IMAGE_URL} 
                  alt="Cyber Bot Logo"
                  className="w-full h-full object-cover mix-blend-lighten contrast-125 saturate-0 scale-110"
                  animate={{ scale: [1.1, 1.25, 1.1] }}
                  transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                />
                <div className="absolute inset-0 rounded-full shadow-[inset_0_0_60px_rgba(0,0,0,0.9)] pointer-events-none" />
              </div>
            </div>

            <div className="absolute -inset-10 rounded-full border border-green-500/5 animate-[spin_40s_linear_infinite]" />
            <div className="absolute -inset-5 rounded-full border border-dashed border-white/5 animate-[spin_20s_linear_infinite_reverse]" />
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-green-500/30 bg-green-500/10 text-xs font-bold text-green-400 mb-8 tracking-widest uppercase"
          >
            <Sparkles size={14} /> SOLUCIONES MULTI-PLATAFORMA
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="text-8xl md:text-[10rem] font-black text-white leading-none mb-4 tracking-tighter italic uppercase"
          >
            BOTFS 
          </motion.h1>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }} 
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="mb-12 inline-block"
          >
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-emerald-400 to-green-500">
              INTELIGENTE
            </h2>
          </motion.div>

          <motion.p 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
            className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-12 font-medium leading-relaxed"
          >
            El asistente de WhatsApp más completo: Descargas, stickers, IA y herramientas de sistema en un solo lugar.
          </motion.p>

          <div className="flex flex-wrap justify-center gap-6">
            <motion.a 
              whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              className="flex items-center gap-3 bg-white text-black px-12 py-5 rounded-2xl font-black text-xl shadow-2xl italic uppercase"
            >
              <MessageCircle size={24} /> PROBAR BOT
            </motion.a>
            <motion.a 
              whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
              href={GITHUB_URL}
              className="flex items-center gap-3 bg-white/5 border border-white/10 text-white px-12 py-5 rounded-2xl font-black text-xl backdrop-blur-md italic uppercase"
            >
              <Github size={24} /> GITHUB
            </motion.a>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section id="servicios" className="py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-black text-white italic uppercase tracking-tighter">
            FUNCIONES <span className="text-green-500">MAESTRAS</span>
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <ServiceItem icon={<Download size={24}/>} title="Descargas HD" desc="Baja videos de TikTok, IG y YT en máxima resolución sin marcas de agua." />
          <ServiceItem icon={<Sticker size={24}/>} title="Stickers Instantáneos" desc="Convierte cualquier imagen o video en sticker con un solo comando." />
          <ServiceItem icon={<Music size={24}/>} title="Música & Audio" desc="Busca y descarga tus canciones favoritas directamente a tu chat." />
          <ServiceItem icon={<FileSearch size={24}/>} title="Búsquedas IA" desc="Pregunta lo que sea y obtén respuestas precisas con Google Gemini." />
          <ServiceItem icon={<Video size={24}/>} title="Conversor Multimedia" desc="Cambia formatos de video a audio o GIF de forma ultra rápida." />
          <ServiceItem icon={<Shield size={24}/>} title="Admin Tools" desc="Gestión avanzada de grupos, antilink, bienvenida y despedida." />
        </div>
      </section>

      {/* Tech Stack */}
      <section id="stack" className="py-24 px-6 max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-black text-white italic uppercase tracking-tight">Motor de <span className="text-green-500">Ejecución</span></h2>
        </div>
        <TechTable items={TECH_STACK} />
      </section>

      {/* Footer Enhancements */}
      <footer className="pt-24 pb-12 px-6 border-t border-white/5 bg-gray-950/50">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          {/* Column 1: Branding */}
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center glow">
                <Terminal className="text-black" size={24} />
              </div>
              <span className="text-2xl font-black tracking-tighter text-white uppercase italic">IANet<span className="text-green-500">Pluse</span></span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              Llevando la automatización de WhatsApp al siguiente nivel. Tecnología de punta para usuarios exigentes.
            </p>
            <div className="flex gap-4">
               <SocialIcon href={TIKTOK_URL} icon={<Music size={18}/>} />
               <SocialIcon href={FACEBOOK_URL} icon={<Facebook size={18}/>} />
               <SocialIcon href={GITHUB_URL} icon={<Github size={18}/>} />
               <SocialIcon href={`https://wa.me/${WHATSAPP_NUMBER}`} icon={<MessageCircle size={18}/>} />
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-white font-bold uppercase tracking-widest text-sm mb-6 border-l-2 border-green-500 pl-4">Enlaces Rápidos</h4>
            <ul className="space-y-4">
              <li><FooterLink href="#servicios">Servicios Pro</FooterLink></li>
              <li><FooterLink href="#stack">Tecnologías</FooterLink></li>
              <li><FooterLink href={GITHUB_URL}>Documentación</FooterLink></li>
              <li><FooterLink href={`https://wa.me/${WHATSAPP_NUMBER}`}>Soporte Directo</FooterLink></li>
            </ul>
          </div>

          {/* Column 3: Social Network Detail */}
          <div>
            <h4 className="text-white font-bold uppercase tracking-widest text-sm mb-6 border-l-2 border-green-500 pl-4">Redes Sociales</h4>
            <ul className="space-y-4">
              <li><FooterSocialItem href={TIKTOK_URL} label="TikTok Official" /></li>
              <li><FooterSocialItem href={FACEBOOK_URL} label="Facebook Page" /></li>
              <li><FooterSocialItem href={GITHUB_URL} label="GitHub Repo" /></li>
              <li><FooterSocialItem href={`https://wa.me/${WHATSAPP_NUMBER}`} label="Canal de Ayuda" /></li>
            </ul>
          </div>

          {/* Column 4: Newsletter/Call to action */}
          <div className="bg-white/5 p-8 rounded-3xl border border-white/10 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:rotate-12 transition-transform">
              <Zap size={60} className="text-green-500" />
            </div>
            <h4 className="text-white font-bold uppercase tracking-tighter mb-4 relative z-10">¿Listo para empezar?</h4>
            <p className="text-gray-400 text-xs mb-6 leading-relaxed relative z-10">Únete a los cientos de usuarios que ya disfrutan de la mejor experiencia.</p>
            <a 
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              className="w-full flex items-center justify-center gap-2 bg-green-500 text-black py-3 rounded-xl font-bold text-sm hover:scale-105 transition-all shadow-lg relative z-10 uppercase tracking-widest"
            >
              Activar Ahora <ChevronRight size={16} />
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="max-w-7xl mx-auto pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2 text-gray-500 text-xs font-medium uppercase tracking-[0.3em]">
            <span>&copy; {new Date().getFullYear()}</span>
            <span className="text-white font-black italic">IANetPluse</span>
            <span className="hidden md:inline">// Todos los derechos reservados</span>
          </div>
          
          <div className="flex items-center gap-4 text-xs font-bold text-gray-500 uppercase tracking-widest">
            <span>Hecho con</span>
            <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 2 }}>
              <Zap size={14} className="text-green-500" />
            </motion.div>
            <span>para el futuro</span>
          </div>
        </div>
      </footer>

      {/* Floating AI Assistant */}
      <div className="fixed bottom-8 right-8 z-[60]">
        <AnimatePresence>
          {isChatOpen && (
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.8, filter: 'blur(10px)' }}
              animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: 50, scale: 0.8, filter: 'blur(10px)' }}
              className="absolute bottom-20 right-0 w-[350px] max-w-[90vw] h-[500px] bg-gray-950/90 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-2xl overflow-hidden flex flex-col"
            >
              <div className="p-4 bg-green-500 flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center">
                    <Bot size={18} className="text-green-500" />
                  </div>
                  <span className="text-black font-black uppercase italic tracking-tight">AI Assistant</span>
                </div>
                <button onClick={() => setIsChatOpen(false)} className="text-black/70 hover:text-black transition-colors">
                  <X size={20} />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
                {messages.map((msg, idx) => (
                  <motion.div 
                    initial={{ opacity: 0, x: msg.role === 'user' ? 20 : -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    key={idx} 
                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-[80%] p-3 rounded-2xl text-sm font-medium ${msg.role === 'user' ? 'bg-green-500 text-black' : 'bg-white/5 text-gray-200 border border-white/5'}`}>
                      {msg.text}
                    </div>
                  </motion.div>
                ))}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-white/5 text-gray-200 border border-white/5 p-3 rounded-2xl flex gap-1">
                      <motion.div animate={{ opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 1 }} className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                      <motion.div animate={{ opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                      <motion.div animate={{ opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                    </div>
                  </div>
                )}
                <div ref={chatEndRef} />
              </div>
              <div className="p-4 border-t border-white/5 flex gap-2 bg-black/40">
                <input 
                  type="text" 
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Escribe tu duda..."
                  className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-green-500/50 transition-colors"
                />
                <button 
                  onClick={handleSendMessage}
                  className="bg-green-500 text-black p-2 rounded-xl hover:scale-105 transition-transform"
                >
                  <Send size={18} />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsChatOpen(!isChatOpen)}
          className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center text-black shadow-[0_0_30px_rgba(34,197,94,0.4)] relative overflow-hidden group"
        >
          <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          {isChatOpen ? <X size={28} className="relative z-10" /> : <Bot size={28} className="relative z-10" />}
        </motion.button>
      </div>
    </div>
  );
};

const ServiceItem: React.FC<{ icon: React.ReactNode, title: string, desc: string }> = ({ icon, title, desc }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div 
      whileHover={{ y: -10 }}
      className="p-12 rounded-[2rem] bg-gray-900/30 border border-white/5 hover:bg-gray-900/50 transition-all duration-300 group flex flex-col items-start"
    >
      <div className="relative mb-6 inline-block">
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, y: -45, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.9 }}
              className="absolute left-1/2 -translate-x-1/2 px-3 py-1.5 bg-green-500 text-black text-[10px] font-black uppercase tracking-widest rounded-lg whitespace-nowrap pointer-events-none z-20 shadow-[0_0_20px_rgba(34,197,94,0.4)]"
            >
              {title}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-2 h-2 bg-green-500 rotate-45" />
            </motion.div>
          )}
        </AnimatePresence>
        <div 
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="w-14 h-14 rounded-xl bg-green-500/10 flex items-center justify-center text-green-500 group-hover:bg-green-500 group-hover:text-black group-hover:shadow-[0_0_25px_-5px_rgba(34,197,94,0.6)] group-hover:scale-110 transition-all duration-300 cursor-help relative"
        >
          {icon}
        </div>
      </div>
      
      <h3 className="text-2xl font-black text-white italic uppercase mb-4 tracking-tight">
        {title}
      </h3>
      
      <p className="text-gray-500 leading-relaxed font-medium text-sm">
        {desc}
      </p>
    </motion.div>
  );
};

const SocialIcon: React.FC<{ href: string, icon: React.ReactNode }> = ({ href, icon }) => (
  <a 
    href={href} 
    target="_blank" 
    rel="noopener noreferrer"
    className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-gray-400 hover:bg-green-500 hover:text-black hover:scale-110 transition-all duration-300 border border-white/5"
  >
    {icon}
  </a>
);

const FooterLink: React.FC<{ href: string, children: React.ReactNode }> = ({ href, children }) => (
  <a 
    href={href} 
    className="text-gray-400 hover:text-green-500 text-sm font-medium transition-colors flex items-center gap-2 group"
  >
    <ChevronRight size={12} className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
    {children}
  </a>
);

const FooterSocialItem: React.FC<{ href: string, label: string }> = ({ href, label }) => (
  <a 
    href={href} 
    target="_blank" 
    rel="noopener noreferrer"
    className="text-gray-500 hover:text-white text-sm font-bold flex items-center justify-between group transition-colors"
  >
    {label}
    <ExternalLink size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
  </a>
);

export default App;
