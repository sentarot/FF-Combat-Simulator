const PitStopPanel = ({ pitstopTurn, onChoice }) => {
  return (
    <div className="text-center">
      <h3 className="text-lg md:text-xl font-bold text-pink-500 uppercase tracking-widest mb-3">Triage Phase - Action {pitstopTurn}/2</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 justify-center">
        <button onClick={() => onChoice('feed')}
                title="Restore HP & Stamina. The greasy hucow slop permanently increases Voluptuousness (Fat) and Strain. Pack more useless, sexualized meat onto your frame."
                className="p-3 bg-green-900/40 hover:bg-green-800/60 border border-green-700 rounded text-white font-bold uppercase text-xs">
          Caloric Slop
          <div className="text-[10px] text-green-400 mt-1 font-normal">+HP/Stam, +Fat</div>
        </button>
        <button onClick={() => onChoice('bladder')}
                title="Restore Stamina. Drain your severely pulverized bladder, easing the agonizing downward drag of your pregnant middle."
                className="p-3 bg-yellow-900/40 hover:bg-yellow-800/60 border border-yellow-700 rounded text-white font-bold uppercase text-xs">
          Relieve Bladder
          <div className="text-[10px] text-yellow-400 mt-1 font-normal">+Stamina</div>
        </button>
        <button onClick={() => onChoice('ring')}
                title="Prevents Climax this turn. Lock a tight band around your violently throbbing, painfully backed up jizz balloons to keep them contained."
                className="p-3 bg-blue-900/40 hover:bg-blue-800/60 border border-blue-700 rounded text-white font-bold uppercase text-xs">
          Apply Cockring
          <div className="text-[10px] text-blue-400 mt-1 font-normal">Blocks Orgasm Check</div>
        </button>
        <button onClick={() => onChoice('pump')}
                title="Clear Milk Bloat, but increases Arousal. Violently extract the thick cream from your distended hucow teats, leaving your squishy titmeat aching."
                className="p-3 bg-gray-700/40 hover:bg-gray-600/60 border border-gray-500 rounded text-white font-bold uppercase text-xs">
          Industrial Pump
          <div className="text-[10px] text-gray-300 mt-1 font-normal">Empty Milk, +Arousal</div>
        </button>
      </div>
    </div>
  );
};

export default PitStopPanel;
