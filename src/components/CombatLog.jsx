const CombatLog = ({ log, logEndRef }) => {
  return (
    <div className="lg:col-span-2 bg-black/80 border border-gray-800 rounded-lg p-3 md:p-4 h-64 overflow-y-auto font-mono text-[11px] md:text-sm shadow-inner flex flex-col">
      {log.map((entry, idx) => {
        let color = 'text-gray-300 border-gray-700';
        if (entry.includes('[WARNING]')) color = 'text-orange-400 border-orange-700 font-bold bg-orange-900/20';
        else if (entry.includes('[FLAVOR]')) color = 'text-purple-300 italic border-purple-800/40 bg-purple-900/10';
        else if (entry.includes('[INFO]') || entry.includes('[TIME STOP]')) color = 'text-orange-300 border-orange-800 font-bold bg-orange-900/20';
        else if (entry.includes('[Count:')) color = 'text-yellow-300 border-yellow-600 font-bold';
        else if (entry.includes('[CRITICAL SUCCESS]')) color = 'text-green-400 border-green-600 font-bold';
        else if (entry.includes('[SUCCESS]')) color = 'text-blue-300 border-blue-600';
        else if (entry.includes('[WEAK SUCCESS]')) color = 'text-yellow-400 border-yellow-600';
        else if (entry.includes('[FAILURE]')) color = 'text-gray-500 border-gray-600';
        else if (entry.includes('[CRITICAL FAILURE]')) color = 'text-red-500 border-red-800 font-bold';
        else if (entry.includes('[BARK]')) color = 'text-amber-300 italic border-amber-700/50 bg-amber-900/15';
        else if (entry.includes('*** HUMILIATION')) color = 'text-yellow-400 border-yellow-800 font-bold bg-yellow-900/20';
        else if (entry.includes('*** SAVAGE HEAT')) color = 'text-purple-400 border-purple-800 font-bold bg-purple-900/20';
        else if (entry.includes('*** DEFIANCE')) color = 'text-purple-300 border-purple-500 font-bold bg-purple-900/30 text-base py-2';
        else if (entry.includes('***')) color = 'text-pink-500 font-bold text-center my-2 border-none';
        else if (entry.includes('---')) color = 'text-gray-400 font-bold text-center my-4 border-none';

        return (
          <div key={idx} className={`mb-1 pl-2 py-1 border-l-2 ${color}`}>
            {entry.replace('[FLAVOR] ', '').replace('[WARNING] ', '').replace('[BARK] ', '')}
          </div>
        );
      })}
      <div ref={logEndRef} />
    </div>
  );
};

export default CombatLog;
