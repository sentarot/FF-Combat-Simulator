import { rand, T_FAT, T_JOINTS, T_FLINCH } from '../data/vocabulary.js';
import { MAX_HP, MAX_STAMINA, MAX_VOLUPTUOUSNESS, MAX_STRAIN } from '../data/constants.js';

export const clamp = (val, min, max) => Math.min(Math.max(val, min), max);
export const calcFetusWeight = (size) => Math.floor(Math.pow(size, 2.5) * 0.4) + 15;

export const calcCost = (baseCost, voluptuousness) => {
  if (baseCost <= 0) return baseCost;
  const multiplier = 1 + (voluptuousness * 0.015);
  return Math.floor(baseCost * multiplier);
};

export const getRollModifier = (actionType, attackerObj, defenderObj, actionId) => {
  let mod = 0;

  if (attackerObj.fetalSize < 4) mod += 15;
  if (attackerObj.stamina <= 0) mod -= 50;
  else if (attackerObj.stamina < 300) mod -= ((300 - attackerObj.stamina) / 300) * 30;

  if (attackerObj.isDistracted) mod -= 25;
  if (defenderObj && defenderObj.isAdvancing) mod += 30;

  const fetalPenalty = Math.floor(attackerObj.fetalSize * 2.5);
  const fatPenalty = Math.floor(attackerObj.voluptuousness * 0.4);
  const fatBuff = Math.floor(attackerObj.voluptuousness * 0.5);
  const strainPenalty = Math.floor(attackerObj.strain * 0.4);

  if (actionType === 'strike') {
    mod -= fetalPenalty;
    mod -= fatPenalty;
    mod -= (attackerObj.milk * 0.2);
    if (actionId === 'jab') mod += 20;
    if (actionId === 'uppercut') mod -= 10;
  } else if (actionType === 'arousal') {
    mod += fatBuff;
    mod += Math.floor(attackerObj.arousal * 0.2);
  } else if (actionType === 'rest') {
    mod -= fatPenalty;
    mod -= strainPenalty;
    mod -= Math.floor(attackerObj.arousal * 0.3);
  } else if (actionType === 'slowRise') {
    mod += 35;
    mod -= fetalPenalty;
  } else if (actionType === 'heaveUp') {
    mod += 15;
    mod -= fatPenalty;
    mod -= strainPenalty;
  } else if (actionType === 'restDowned') {
    mod -= fatPenalty;
    mod -= Math.floor(attackerObj.arousal * 0.3);
  }
  return Math.floor(mod);
};

export const evaluateRoll = (baseRoll, mod) => {
  const finalRoll = baseRoll + mod;
  if (finalRoll <= 10) return { id: 'CRIT_FAIL', mult: 0, text: 'CRITICAL FAILURE', isSuccess: false };
  if (finalRoll <= 35) return { id: 'FAIL', mult: 0, text: 'FAILURE', isSuccess: false };
  if (finalRoll <= 60) return { id: 'WEAK', mult: 0.5, text: 'WEAK SUCCESS', isSuccess: true };
  if (finalRoll <= 90) return { id: 'SUCCESS', mult: 1.0, text: 'SUCCESS', isSuccess: true };
  return { id: 'CRIT_SUCCESS', mult: 1.5, text: 'CRITICAL SUCCESS', isSuccess: true };
};

export const isActionValid = (actionId, range, isBellyBlocked, target) => {
    if (actionId === 'wait' || actionId === 'taunt') return true;
    if (actionId === 'jab' || actionId === 'straight') return range <= 1;
    if (actionId === 'hook') return range === 1;
    if (actionId === 'uppercut') {
        if (range !== 2) return false;
        if (isBellyBlocked && (target === 'face' || target === 'tits')) return false;
        return true;
    }
    if (actionId === 'grapple') return range === 2;
    if (actionId === 'brace' || actionId === 'restDowned' || actionId === 'slowRise' || actionId === 'heaveUp') return true;
    return false;
};

export const triggerKnockdown = (fighter, logs, reasonStr) => {
  fighter.downs += 1;
  fighter.isDowned = true;
  fighter.refCount = 0;
  fighter.recoveryProgress = 0;
  fighter.isDistracted = false;

  const ruinLevel = 1 + Math.floor(fighter.fetalSize / 3) + Math.floor(fighter.voluptuousness / 20);
  fighter.recoveryThreshold = clamp(ruinLevel, 2, 9);

  logs.push(`${reasonStr} ***`);
  logs.push(`[TIME STOP] The ref starts the count! Weighed down by heavy ${rand(T_FAT)} and bloated milkers, ${fighter.name}'s Ruin Level is ${fighter.recoveryThreshold}. She must fight through the agony and accumulate enough Success Points to heave herself up before the 10-Count ends!`);
};
