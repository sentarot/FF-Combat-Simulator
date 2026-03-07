import { clamp } from '../logic/combat.js';

const ProgressBar = ({ label, value, max, colorClass, compact = false }) => {
  const percentage = clamp((value / max) * 100, 0, 100);
  return (
    <div className={compact ? "mb-1" : "mb-2"}>
      <div className="flex justify-between text-[10px] md:text-xs mb-1 text-gray-300 font-bold uppercase tracking-wider">
        <span>{label}</span>
        <span>{typeof value === 'number' && value % 1 !== 0 ? value.toFixed(1) : Math.floor(value)} / {max}</span>
      </div>
      <div className={`w-full bg-gray-800 rounded-full border border-gray-700 overflow-hidden shadow-inner ${compact ? 'h-2' : 'h-3'}`}>
        <div className={`h-full transition-all duration-500 ${colorClass}`} style={{ width: `${percentage}%` }}></div>
      </div>
    </div>
  );
};

export default ProgressBar;
