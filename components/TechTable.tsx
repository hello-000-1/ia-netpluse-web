
import React from 'react';
import { motion } from 'framer-motion';
import { TechItem } from '../types.ts';

interface TechTableProps {
  items: TechItem[];
}

const TechTable: React.FC<TechTableProps> = ({ items }) => {
  return (
    <div className="w-full overflow-hidden rounded-2xl border border-white/5 bg-black/20">
      <table className="w-full text-left border-collapse">
        <thead className="bg-white/5">
          <tr>
            <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-400">Tecnología</th>
            <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-400">Categoría</th>
            <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-400">Nivel de Dominio</th>
          </tr>
        </thead>
        <tbody>
          {items.map((tech, index) => (
            <motion.tr 
              key={tech.name}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="border-b border-white/5 hover:bg-white/[0.02] transition-colors group"
            >
              <td className="px-6 py-5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center font-mono font-bold text-green-400 text-xs border border-green-500/20 group-hover:bg-green-500 group-hover:text-black transition-all">
                    {tech.icon}
                  </div>
                  <span className="font-semibold text-white">{tech.name}</span>
                </div>
              </td>
              <td className="px-6 py-5">
                <span className="text-sm text-gray-500">{tech.category}</span>
              </td>
              <td className="px-6 py-5">
                <div className="flex flex-col gap-1.5">
                  <div className="flex justify-between text-[10px] text-gray-500 font-mono uppercase">
                    <span>Rendimiento</span>
                    <span>{tech.level}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: `${tech.level}%` }}
                      transition={{ duration: 1, delay: index * 0.1 + 0.3 }}
                      viewport={{ once: true }}
                      className="h-full bg-gradient-to-r from-green-500 to-emerald-400"
                    />
                  </div>
                </div>
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TechTable;
