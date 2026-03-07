import ProgressBar from './ProgressBar.jsx';
import { generateStatusReport } from '../logic/textgen.js';
import { clamp } from '../logic/combat.js';
import { MAX_HP, MAX_STAMINA, MAX_WILL, MAX_FETAL_SIZE, MAX_VOLUPTUOUSNESS, MAX_STRAIN, MAX_AROUSAL, MAX_MILK } from '../data/constants.js';

const FighterCard = ({ data, isPlayer, currentTurn }) => {
  const isHit = data.effect?.turn === currentTurn;
  const fxType = isHit ? data.effect.type : null;

  let fxClasses = '';
  if (fxType === 'crit') fxClasses = 'animate-shake animate-damage';
  else if (fxType === 'hit') fxClasses = 'animate-damage';
  else if (fxType === 'agitate') fxClasses = 'animate-agitate';

  const heatClass = data.inHeat && !data.isDowned ? 'animate-heat border-purple-500' : isPlayer ? 'border-pink-900' : 'border-purple-900';
  const throbClass = data.fetalSize >= 10 && !data.isDowned && !isHit ? 'animate-throb' : '';

  const musclePct = Math.max(0, 100 - clamp((data.voluptuousness / MAX_VOLUPTUOUSNESS) * 100, 0, 100));

  return (
  <div className={`p-3 md:p-4 rounded-lg border-2 flex flex-col bg-black/60 shadow-[0_0_15px_rgba(0,0,0,0.8)] backdrop-blur-sm relative overflow-hidden transition-colors ${heatClass} ${throbClass} ${fxClasses} ${data.isDowned ? 'opacity-80 border-red-600 shadow-[0_0_20px_red]' : ''}`}>

    <div className="absolute inset-0 opacity-20 pointer-events-none transition-opacity duration-1000"
         style={{ background: `radial-gradient(circle at center, ${data.fetalSize >= 12 ? 'rgba(255,0,0,0.5)' : data.fetalSize > 8 ? 'rgba(255,0,128,0.8)' : 'transparent'} 0%, transparent 100%)`}} />

    <h2 className={`text-lg md:text-xl font-black uppercase mb-2 tracking-widest flex justify-between items-center flex-wrap gap-1 ${data.isDowned ? 'text-red-500' : isPlayer ? 'text-pink-500' : 'text-purple-500'}`}>
      <span>{data.name}</span>
      <div className="flex gap-1">
        {data.agitationQueued > 0 && <span className="text-[10px] md:text-xs bg-red-900 text-white px-2 py-1 rounded animate-pulse">! HORMONES: +{data.agitationQueued} !</span>}
        {data.inHeat && !data.isDowned && <span className="text-[10px] md:text-xs bg-purple-600 text-white px-2 py-1 rounded animate-pulse" title="Savage Heat: Preggo-brain melted. Forced to rut.">! SAVAGE HEAT !</span>}
      </div>
    </h2>

    <div className="flex gap-2 mb-3 items-center">
      {[1, 2, 3].map(i => (
        <div key={i} className={`h-3 w-3 md:h-4 md:w-4 rounded-full border-2 border-red-800 ${data.downs >= i ? 'bg-red-600 shadow-[0_0_8px_red]' : 'bg-transparent'}`} title={`Down ${i}`} />
      ))}
      <span className="text-[10px] md:text-xs text-red-500 font-bold ml-2 uppercase tracking-widest">Downs (3/Rd = TKO)</span>
    </div>

    {data.isDowned && (
      <div className="mb-2 bg-red-900/80 border border-red-500 p-2 rounded relative z-20">
          <ProgressBar label={`Rise Progress (Count: ${data.refCount}/10)`} value={data.recoveryProgress} max={data.recoveryThreshold} colorClass="bg-red-500" />
      </div>
    )}

    <div className="space-y-1 mb-2 border-b border-gray-700 pb-2">
      <ProgressBar label="Health (HP)" value={data.hp} max={MAX_HP} colorClass={data.hp > 250 ? 'bg-green-500' : data.hp > 100 ? 'bg-yellow-500' : 'bg-red-600 animate-pulse'} />
      <ProgressBar label="Energy (Stamina)" value={data.stamina} max={MAX_STAMINA} colorClass={data.stamina > 300 ? 'bg-blue-500' : 'bg-orange-500'} />
      <ProgressBar label="Willpower (Defiance)" value={data.will} max={MAX_WILL} colorClass="bg-purple-500" />
    </div>

    <div className="grid grid-cols-2 gap-x-4 gap-y-1">
      <ProgressBar label="Fetal Size (Parasites)" value={data.fetalSize} max={MAX_FETAL_SIZE} colorClass="bg-fuchsia-600" compact />
      <ProgressBar label="Arousal (Risk)" value={data.arousal} max={MAX_AROUSAL} colorClass={data.arousal > 80 ? 'bg-red-500 animate-pulse' : data.arousal > 50 ? 'bg-pink-500' : 'bg-pink-800'} compact />

      <ProgressBar label="Athletic Muscle" value={musclePct} max={100} colorClass="bg-emerald-600" compact />
      <ProgressBar label="Squishy Adipose (Fat)" value={data.voluptuousness} max={MAX_VOLUPTUOUSNESS} colorClass="bg-pink-400" compact />

      <ProgressBar label="Milk Bloat" value={data.milk} max={MAX_MILK} colorClass="bg-gray-100" compact />
      <ProgressBar label="Strain (Joints)" value={data.strain} max={MAX_STRAIN} colorClass="bg-yellow-600" compact />
    </div>

    <div className="mt-3 p-3 bg-black/80 border border-pink-900/30 rounded text-xs md:text-sm text-gray-300 leading-relaxed font-serif shadow-inner h-full relative z-20">
      {data.isDowned && <div className="text-red-500 font-black uppercase tracking-widest mb-1 animate-pulse">WRITHING ON THE MAT!</div>}
      {data.stamina <= 0 && <div className="text-orange-500 font-black uppercase tracking-widest mb-1">EXHAUSTED: Extremely Vulnerable!</div>}

      <span className="text-pink-200/90 italic">{generateStatusReport(data, isPlayer)}</span>
    </div>
  </div>
  );
};

export default FighterCard;
