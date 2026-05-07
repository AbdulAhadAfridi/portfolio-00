export default function BackgroundGlow() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
      {/* Cyan Glow Top Left */}
      <div className="absolute -top-[20%] -left-[10%] w-[50vw] h-[50vw] rounded-full bg-cyan-900/20 blur-[120px] mix-blend-screen" />
      {/* Purple Glow Bottom Right */}
      <div className="absolute top-[60%] -right-[10%] w-[60vw] h-[60vw] rounded-full bg-purple-900/20 blur-[150px] mix-blend-screen" />
    </div>
  );
}
