// "use client";
// import { motion, useMotionValue, useMotionTemplate } from "framer-motion";
// import Image from "next/image";
// import { MouseEvent } from "react";

// function GlowCard({ title, items, description }: { title: string, items: string[], description: string }) {
//   const mouseX = useMotionValue(0);
//   const mouseY = useMotionValue(0);

//   function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
//     const { left, top } = currentTarget.getBoundingClientRect();
//     mouseX.set(clientX - left);
//     mouseY.set(clientY - top);
//   }

//   return (
//     <div 
//       className="group relative max-w-md rounded-xl border border-white/10 bg-[#0a0a0a] px-8 py-8 shadow-2xl overflow-hidden cursor-none"
//       onMouseMove={handleMouseMove}
//     >
//       <motion.div
//         className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100"
//         style={{
//           background: useMotionTemplate`
//             radial-gradient(
//               400px circle at ${mouseX}px ${mouseY}px,
//               rgba(168, 85, 247, 0.3),
//               transparent 80%
//             )
//           `,
//         }}
//       />
      
//       <div className="relative z-10 pointer-events-none">
//         <h3 className="text-xl font-bold tracking-widest text-white mb-2">{title}</h3>
//         <p className="text-gray-500 text-sm mb-6">{description}</p>
        
//         <div className="flex flex-wrap gap-3 pointer-events-auto">
//           {items.map(item => (
//             <div key={item} className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-gray-300 hover:text-white transition-colors cursor-none">
//               {item}
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default function Skills() {
//   return (
//     <section id="work" className="min-h-screen py-20 px-8 md:px-24 flex flex-col lg:flex-row items-center justify-between relative overflow-hidden gap-12 lg:gap-0">
      
//       {/* Left - Huge Text */}
//       <motion.div 
//         whileInView={{ opacity: 1, x: 0 }}
//         initial={{ opacity: 0, x: -50 }}
//         viewport={{ once: true }}
//         className="flex-1 flex flex-col z-10"
//       >
//         <h2 className="text-[12vw] lg:text-[8vw] font-black leading-none text-transparent opacity-80 select-none" style={{ WebkitTextStroke: '1px #0ff' }}>
//           WHAT
//         </h2>
//         <h2 className="text-5xl lg:text-7xl font-bold leading-tight text-white -mt-4 lg:-mt-8 ml-12">
//           I DO
//         </h2>
//       </motion.div>

//       {/* Center - Laptop Image */}
//       <div className="flex-1 flex justify-center z-10">
//         <motion.div
//           animate={{ y: [-10, 10, -10] }}
//           transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
//           className="relative w-[300px] h-[300px] lg:w-[450px] lg:h-[450px]"
//         >
//           <Image 
//             src="/images/working-desk.jpeg" 
//             alt="Working at desk"
//             fill
//             className="object-contain drop-shadow-2xl mix-blend-luminosity opacity-90"
//           />
//         </motion.div>
//       </div>

//       {/* Right - Glow Cards */}
//       <div className="flex-1 flex flex-col gap-6 z-10">
//         <GlowCard 
//           title="FRONTEND" 
//           description="Crafting performant, responsive interfaces with modern frameworks. From SPAs to micro-frontends, I deliver pixel-perfect experiences."
//           items={["React", "JavaScript", "HTML5", "CSS3"]} 
//         />
//         <GlowCard 
//           title="BACKEND" 
//           description="Designing robust APIs and microservices. From CMS platforms to complex business logic, I build backends that scale."
//           items={["Node.js", "Express", "Prisma"]} 
//         />
//       </div>

//     </section>
//   );
// }
