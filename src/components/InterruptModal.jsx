const InterruptModal = ({ interrupt, onAccept, onDecline }) => {
  return (
    <div className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4 backdrop-blur-sm">
       <div className="bg-neutral-900 border border-purple-500 rounded-lg max-w-lg w-full p-6 shadow-[0_0_40px_purple]">
           <h2 className="text-2xl md:text-3xl font-black text-purple-400 uppercase tracking-widest mb-4 animate-pulse">
              {interrupt.title}
           </h2>
           <p className="text-gray-200 mb-8 italic text-lg leading-relaxed border-l-4 border-purple-500 pl-4 bg-purple-900/10 py-2">
              "{interrupt.text}"
           </p>
           <div className="flex flex-col gap-4">
               <button onClick={onAccept}
                       className="bg-purple-900/80 hover:bg-purple-600 text-white font-black py-4 px-6 rounded border border-purple-400 uppercase tracking-widest flex justify-between items-center transition-all shadow-[0_0_15px_rgba(147,51,234,0.5)]">
                   <span>{interrupt.action}</span>
                   <span className="text-purple-200 text-sm border border-purple-400/50 px-2 py-1 bg-black/40 rounded">- {interrupt.cost} Willpower</span>
               </button>
               <button onClick={onDecline}
                       className="bg-gray-900 hover:bg-gray-800 text-gray-400 py-3 px-6 rounded border border-gray-700 uppercase tracking-widest text-sm transition-all">
                   Submit to your body (Save Will)
               </button>
           </div>
       </div>
    </div>
  );
};

export default InterruptModal;
