export const getActions = (fetalSize, projectedRange, isBellyBlocked, currentTarget) => {
  let actions = [];
  const isFit = fetalSize < 6;
  const isOverdue = fetalSize >= 10;

  actions.push({ id: 'brace', name: isFit ? 'Tight Guard' : 'Agonized Heave', desc: 'Restore Stamina & Will', type: 'rest', val: 250, cost: 0, color: 'bg-blue-900/40 hover:bg-blue-800/60', disabled: false });
  actions.push({ id: 'grapple', name: isFit ? 'Tactical Clinch' : 'Crushing Smother', desc: 'Close (Arousal)', type: 'arousal', val: 40, cost: 50, color: projectedRange !== 2 ? 'bg-gray-800' : 'bg-purple-900/60 hover:bg-purple-800', disabled: projectedRange !== 2 });

  const jabName = isFit ? 'Precision Jab' : (isOverdue ? 'Stubborn Flail' : 'Flabby Jab');
  const straightName = isFit ? 'Power Straight' : (isOverdue ? 'Reckless Lunge' : 'Heavy Cross');
  const hookName = isFit ? 'Medium Hook' : (isOverdue ? 'Desperate Swing' : 'Meaty Hook');
  const uppercutName = isFit ? 'Tight Uppercut' : (isOverdue ? 'Agonized Upthrust' : 'Heaving Uppercut');

  const ucBlocked = isBellyBlocked && (currentTarget === 'face' || currentTarget === 'tits');

  actions.push({
      id: 'jab', name: jabName, desc: 'Long/Med Range', type: 'strike', val: 30, cost: 20,
      color: projectedRange === 2 ? 'bg-gray-800' : 'bg-neutral-800 hover:bg-neutral-700', disabled: projectedRange === 2,
      tooltip: projectedRange === 2 ? "Requires LONG or MEDIUM Range." : "High accuracy. Hitting the Face applies 'Distracted' debuff to their next roll."
  });

  actions.push({
      id: 'straight', name: straightName, desc: 'Long/Med Range', type: 'strike', val: 80, cost: 45,
      color: projectedRange === 2 ? 'bg-gray-800' : 'bg-neutral-800 hover:bg-neutral-700', disabled: projectedRange === 2,
      tooltip: projectedRange === 2 ? "Requires LONG or MEDIUM Range." : "Heavy damage from a distance."
  });

  actions.push({
      id: 'hook', name: hookName, desc: 'Med Range (Solid)', type: 'strike', val: 70, cost: 50,
      color: projectedRange !== 1 ? 'bg-gray-800' : 'bg-neutral-800 hover:bg-neutral-700', disabled: projectedRange !== 1,
      tooltip: projectedRange !== 1 ? "Requires MEDIUM Range." : "Sweeping blow. Good balance of damage and cost."
  });

  actions.push({
      id: 'uppercut', name: ucBlocked ? 'BLOCKED BY BELLY' : uppercutName, desc: 'Close Range (Massive)', type: 'strike', val: 120, cost: 65,
      color: projectedRange !== 2 || ucBlocked ? 'bg-gray-800' : 'bg-neutral-800 hover:bg-neutral-700', disabled: projectedRange !== 2 || ucBlocked,
      tooltip: projectedRange !== 2 ? "Requires CLOSE Range." : (ucBlocked ? "BELLY LIABILITY: Enormous wombs wedged together! Cannot reach upper body!" : "Devastating close-range power.")
  });

  return actions;
};

export const getDownedActions = () => [
  { id: 'restDowned', name: 'Helpless Gasping', desc: 'Regain Stamina, +0 Rise', type: 'restDowned', val: 200, cost: 0, color: 'bg-blue-900/40 hover:bg-blue-800', disabled: false },
  { id: 'slowRise', name: 'Agonized Crawl', desc: 'Low Stamina, +1-2 Rise', type: 'slowRise', val: 0, cost: 30, color: 'bg-yellow-800/40 hover:bg-yellow-700', disabled: false },
  { id: 'heaveUp', name: 'Reckless Upthrust', desc: 'High Stam, +2-3 Rise (Risky)', type: 'heaveUp', val: 0, cost: 100, color: 'bg-red-800/40 hover:bg-red-700', disabled: false }
];

export const getEnemyDownedActions = () => [
  { id: 'wait', name: 'Catch Breath', desc: 'Watch her struggle', type: 'wait', val: 150, cost: 0, color: 'bg-blue-900/40 hover:bg-blue-800', disabled: false },
  { id: 'taunt', name: 'Humiliate', desc: 'Spike her heat', type: 'taunt', val: 20, cost: 0, color: 'bg-purple-900/40 hover:bg-purple-800', disabled: false }
];
