import { getActions, getDownedActions, getEnemyDownedActions } from '../data/actions.js';
import { calcCost } from '../logic/combat.js';

const ActionPanel = ({ gameState, setGameState, executeTurn, projectedRange }) => {
  const isBellyBlocked = (gameState.player.fetalSize + gameState.enemy.fetalSize) >= 15;

  return (
    <>
      {(gameState.phase === 'combat' || gameState.phase === 'interrupt') && !gameState.player.isDowned && !gameState.enemy.isDowned && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="bg-black/60 p-2 rounded border border-gray-700">
                  <div className="text-center text-gray-400 text-xs font-bold mb-2 tracking-widest uppercase">Target Select</div>
                  <div className="grid grid-cols-3 gap-2">
                     <button onClick={() => setGameState({...gameState, target: 'face'})} className={`py-2 text-[10px] md:text-xs font-black uppercase rounded border transition-colors ${gameState.target === 'face' ? 'bg-red-800 border-red-500 text-white shadow-[0_0_10px_red]' : 'bg-gray-800 border-gray-600 text-gray-400 hover:bg-gray-700'}`}>Face (HP)</button>
                     <button onClick={() => setGameState({...gameState, target: 'tits'})} className={`py-2 text-[10px] md:text-xs font-black uppercase rounded border transition-colors ${gameState.target === 'tits' ? 'bg-purple-800 border-purple-500 text-white shadow-[0_0_10px_purple]' : 'bg-gray-800 border-gray-600 text-gray-400 hover:bg-gray-700'}`}>Tits (Milk/Heat)</button>
                     <button onClick={() => setGameState({...gameState, target: 'belly'})} className={`py-2 text-[10px] md:text-xs font-black uppercase rounded border transition-colors ${gameState.target === 'belly' ? 'bg-pink-800 border-pink-500 text-white shadow-[0_0_10px_pink]' : 'bg-gray-800 border-gray-600 text-gray-400 hover:bg-gray-700'}`}>Belly (Agit)</button>
                  </div>
              </div>

              <div className="bg-black/60 p-2 rounded border border-gray-700">
                  <div className="text-center text-gray-400 text-xs font-bold mb-2 tracking-widest uppercase">Movement Select</div>
                  <div className="grid grid-cols-3 gap-2">
                     <button onClick={() => setGameState({...gameState, movement: 'retreat'})} disabled={gameState.range === 0} className={`py-2 text-[10px] md:text-xs font-black uppercase rounded border transition-colors ${gameState.movement === 'retreat' ? 'bg-blue-800 border-blue-500 text-white shadow-[0_0_10px_blue]' : 'bg-gray-800 border-gray-600 text-gray-400 hover:bg-gray-700'}`} title="Roll required. Costs 35 Stamina. Moves you to Long Range.">Retreat (Roll)</button>
                     <button onClick={() => setGameState({...gameState, movement: 'hold'})} className={`py-2 text-[10px] md:text-xs font-black uppercase rounded border transition-colors ${gameState.movement === 'hold' ? 'bg-green-800 border-green-500 text-white shadow-[0_0_10px_green]' : 'bg-gray-800 border-gray-600 text-gray-400 hover:bg-gray-700'}`} title="Free. No Defense Penalty. Maintains Current Range.">Hold Ground</button>
                     <button onClick={() => setGameState({...gameState, movement: 'advance'})} disabled={gameState.range === 2} className={`py-2 text-[10px] md:text-xs font-black uppercase rounded border transition-colors ${gameState.movement === 'advance' ? 'bg-orange-800 border-orange-500 text-white shadow-[0_0_10px_orange]' : 'bg-gray-800 border-gray-600 text-gray-400 hover:bg-gray-700'}`} title="Guaranteed. Costs 25 Stamina. Decreases Defense. Moves you to Close Range.">Advance (-Def)</button>
                  </div>
              </div>
          </div>
      )}

      {(gameState.phase === 'combat' || gameState.phase === 'interrupt') && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {gameState.player.isDowned ? (
              getDownedActions().map(action => {
                const actualCost = calcCost(action.cost, gameState.player.voluptuousness);
                return (
                  <button key={action.id} onClick={() => executeTurn(action.id)}
                          title={action.tooltip}
                          className={`p-2 md:p-3 border border-gray-600 rounded text-xs md:text-sm font-bold uppercase text-white transition-colors shadow-sm hover:brightness-125 flex flex-col items-center justify-between h-full min-h-[90px] ${action.color}`}>
                    <span className="text-center">{action.name}</span>
                    <div className="text-[10px] md:text-xs text-gray-300 font-normal mt-1 text-center leading-tight">{action.desc}</div>
                    <div className={`mt-2 text-[10px] md:text-xs font-black px-1 py-1 rounded w-full text-center ${action.type === 'restDowned' ? 'bg-green-900/80 text-green-300' : 'bg-black/60 text-red-400'}`}>
                      {action.type === 'restDowned' ? `+STAMINA` : `COST: ${actualCost} STAMINA`}
                    </div>
                  </button>
                );
              })
          ) : gameState.enemy.isDowned ? (
              getEnemyDownedActions().map(action => {
                return (
                  <button key={action.id} onClick={() => executeTurn(action.id)}
                          title={action.desc}
                          className={`p-2 md:p-3 border border-gray-600 rounded text-xs md:text-sm font-bold uppercase text-white transition-colors shadow-sm hover:brightness-125 flex flex-col items-center justify-between h-full min-h-[90px] ${action.color}`}>
                    <span className="text-center">{action.name}</span>
                    <div className="text-[10px] md:text-xs text-gray-300 font-normal mt-1 text-center leading-tight">{action.desc}</div>
                    <div className={`mt-2 text-[10px] md:text-xs font-black px-1 py-1 rounded w-full text-center bg-black/60 text-green-400`}>
                      FREE ACTION
                    </div>
                  </button>
                );
              })
          ) : (
              getActions(gameState.player.fetalSize, projectedRange, isBellyBlocked, gameState.target).map(action => {
                const actualCost = calcCost(action.cost, gameState.player.voluptuousness);
                const isHeatDisabled = gameState.player.inHeat && action.type !== 'arousal';
                const isDisabled = action.disabled || isHeatDisabled;

                return (
                  <button key={action.id} onClick={() => !isDisabled && executeTurn(action.id)}
                          title={isHeatDisabled ? "DISABLED: Your preggo-brain is completely melted by lust! You can only Grapple/Grind!" : action.tooltip}
                          className={`p-2 md:p-3 border border-gray-600 rounded text-xs md:text-sm font-bold uppercase text-white transition-colors shadow-sm flex flex-col items-center justify-between h-full min-h-[90px] ${action.color} ${isDisabled ? 'opacity-30 grayscale cursor-not-allowed' : 'hover:brightness-125'}`}>
                    <span className="text-center">{action.name}</span>
                    <div className="text-[10px] md:text-xs text-gray-300 font-normal mt-1 text-center leading-tight">{action.desc}</div>
                    {action.type !== 'disabled' && !action.disabled && (
                        <div className={`mt-2 text-[10px] md:text-xs font-black px-1 py-1 rounded w-full text-center ${action.type === 'rest' ? 'bg-green-900/80 text-green-300' : 'bg-black/60 text-red-400'}`}>
                          {action.type === 'rest' ? `+WILL / STAM` : `COST: ${actualCost} STAM`}
                        </div>
                    )}
                  </button>
                );
              })
          )}
        </div>
      )}
    </>
  );
};

export default ActionPanel;
