import { useState, useEffect, useRef } from 'react';
import { INITIAL_STATE, MAX_HP, MAX_STAMINA, MAX_WILL, MAX_FETAL_SIZE, MAX_VOLUPTUOUSNESS, MAX_STRAIN, MAX_AROUSAL, MAX_MILK, MAX_DOWNS, TURNS_PER_ROUND, MAX_ROUNDS } from './data/constants.js';
import { rand, FLAVOR_TEXTS, ENEMY_BARKS, T_BELLY, T_BRATS, T_BRAT_ACT, T_TITS, T_FAT, T_SOFT, T_FAT_ACT, T_JOINTS, T_FLINCH } from './data/vocabulary.js';
import { getActions, getDownedActions, getEnemyDownedActions } from './data/actions.js';
import { clamp, calcFetusWeight, calcCost, getRollModifier, evaluateRoll, isActionValid, triggerKnockdown } from './logic/combat.js';
import { generateActionText, getPitstopLog, generateRoundTransition } from './logic/textgen.js';

import FighterCard from './components/FighterCard.jsx';
import CombatLog from './components/CombatLog.jsx';
import InterruptModal from './components/InterruptModal.jsx';
import ActionPanel from './components/ActionPanel.jsx';
import IntroScreen from './components/phases/IntroScreen.jsx';
import MenuScreen from './components/phases/MenuScreen.jsx';
import PitStopPanel from './components/phases/PitStopPanel.jsx';
import GameOverScreen from './components/phases/GameOverScreen.jsx';

function App() {
  const [gameState, setGameState] = useState(INITIAL_STATE);
  const logEndRef = useRef(null);

  useEffect(() => {
    if (logEndRef.current) logEndRef.current.scrollIntoView({ behavior: 'smooth' });
  }, [gameState.log]);

  const startGame = () => {
    setGameState({
      ...INITIAL_STATE,
      phase: 'combat',
      log: ["The bell shrieks. The fighters step forward. Relish your strength now; your bodies will soon betray you."]
    });
  };

  const checkGameOver = (state, isRoundEnd = false) => {
    if (state.player.hp <= 0 || state.player.downs >= MAX_DOWNS) {
        return { isOver: true, winner: 'enemy', reason: state.player.downs >= MAX_DOWNS ? 'TKO (3 Downs in a Round)' : 'KO (Unconscious)' };
    }
    if (state.enemy.hp <= 0 || state.enemy.downs >= MAX_DOWNS) {
        return { isOver: true, winner: 'player', reason: state.enemy.downs >= MAX_DOWNS ? 'TKO (3 Downs in a Round)' : 'KO (Unconscious)' };
    }

    if (isRoundEnd && (state.round >= MAX_ROUNDS || state.player.fetalSize >= MAX_FETAL_SIZE || state.enemy.fetalSize >= MAX_FETAL_SIZE)) {
        const pScore = state.player.hp + state.player.stamina - (state.player.fetalSize * 100) - (state.player.downs * 200);
        const eScore = state.enemy.hp + state.enemy.stamina - (state.enemy.fetalSize * 100) - (state.enemy.downs * 200);
        let winner = 'draw';
        if (pScore > eScore) winner = 'player';
        else if (eScore > pScore) winner = 'enemy';

        let reason = 'Judge Decision (Round Limit)';
        if (state.player.fetalSize >= MAX_FETAL_SIZE || state.enemy.fetalSize >= MAX_FETAL_SIZE) {
            reason = 'Active Labor Prevents Further Fighting (Judge Decision)';
        }
        return { isOver: true, winner, reason };
    }
    return { isOver: false };
  };

  const finalizeStatePhase = (stateObj) => {
      const isRoundEnd = stateObj.turn > TURNS_PER_ROUND;
      const overCheck = checkGameOver(stateObj, isRoundEnd);
      if (overCheck.isOver) {
          stateObj.phase = 'gameover';
          stateObj.winner = overCheck.winner;
          stateObj.log.push(`*** MATCH OVER: ${overCheck.reason} ***`);
      } else if (isRoundEnd) {
          stateObj.phase = 'pitstop';
          stateObj.pitstopTurn = 1;
          if (stateObj.player.isDowned || stateObj.enemy.isDowned) {
              stateObj.log.push(`[INFO] The bell rings! Corner crews rush in and forcefully drag the exhausted fighters to their feet!`);
          } else {
              stateObj.log.push(`[INFO] The bell rings!`);
          }
          stateObj.player.isDowned = false;
          stateObj.enemy.isDowned = false;
          stateObj.range = 1;
          stateObj.player.movement = 'hold';
          stateObj.log.push(`--- END OF ROUND ${stateObj.round} ---`);
          stateObj.log.push(generateRoundTransition(stateObj.round, stateObj.player, stateObj.enemy));
          stateObj.log.push("The degraded fighters collapse onto their stools for desperate, 2-turn maintenance.");
      }
      return stateObj;
  };

  const processMovement = (moverObj, movementType, currentRange, logs) => {
      moverObj.isAdvancing = false;
      if (movementType === 'hold') return currentRange;

      if (movementType === 'advance') {
          if (currentRange < 2) {
              moverObj.stamina = clamp(moverObj.stamina - 25, 0, MAX_STAMINA);
              moverObj.isAdvancing = true;
              let adj;
              if (moverObj.fetalSize >= 10) {
                  adj = rand([
                      `roars, aggressively waddling her massive ${rand(T_BELLY)} forward`,
                      `heaves her enormous, sloshing bulk forward with a guttural, animal scream, the canvas groaning under her shifting weight`,
                      `forces her wrecking-ball belly forward step by agonizing step, her ${rand(T_JOINTS)} popping audibly with every stride`
                  ]);
              } else if (moverObj.fetalSize >= 4) {
                  adj = rand([
                      "forces her heavy twin-bump forward, ignoring the sway of her hips",
                      `drives forward, her thickening thighs chafing wetly as she closes the distance with brutal determination`,
                      `stomps forward, her swelling belly leading the charge like a battering ram of taut, pregnant flesh`
                  ]);
              } else {
                  adj = rand([
                      "explodes forward with lethal athletic speed",
                      "closes distance with predatory aggression, her lean muscles coiling like a panther's",
                      "surges forward, every lean sinew firing with elite gladiatorial precision"
                  ]);
              }
              logs.push(`[MOVE] ${moverObj.name} ${adj}, leaving her guard completely open in her desperation! (-Defense)`);
              return currentRange + 1;
          }
          return currentRange;
      }

      if (movementType === 'retreat') {
          if (currentRange > 0) {
              moverObj.stamina = clamp(moverObj.stamina - 35, 0, MAX_STAMINA);

              const rawRoll = Math.floor(Math.random() * 100) + 1;
              let mod = 0;
              mod -= Math.floor(moverObj.fetalSize * 3);
              mod -= Math.floor(moverObj.voluptuousness * 0.4);
              mod -= Math.floor(moverObj.strain * 0.3);

              const result = evaluateRoll(rawRoll, mod);
              if (result.isSuccess) {
                  let adj;
                  if (moverObj.fetalSize >= 10) {
                      adj = rand([
                          `clumsily backs away, dragging her sloshing ${rand(T_BELLY)} in a frantic retreat`,
                          `stumbles backward, her massive belly swinging dangerously as she desperately creates space`,
                          `retreats in a humiliating, wide-hipped waddle, her ${rand(T_FAT)} slapping wetly with every terrified step`
                      ]);
                  } else if (moverObj.fetalSize >= 4) {
                      adj = rand([
                          `steps back, gritting her teeth as her dense ${rand(T_FAT)} slaps heavily together`,
                          `disengages with visible effort, her swollen belly throwing off her balance as she backpedals`,
                          `retreats, her widening hips catching on the motion and forcing a clumsy, uneven backstep`
                      ]);
                  } else {
                      adj = rand([
                          "executes a flawless tactical backstep",
                          "pivots cleanly on sharp ankles and creates distance with professional ease",
                          "slips backward with fluid athletic grace, resetting the range"
                      ]);
                  }
                  logs.push(`[MOVE] ${moverObj.name} ${adj}, successfully creating distance!`);
                  return currentRange - 1;
              } else {
                  let failReason;
                  if (moverObj.fetalSize >= 10) {
                      failReason = rand([
                          `her massive, sloshing ${rand(T_BELLY)} completely anchors her in place!`,
                          `the sheer gravitational drag of her enormous belly roots her to the bloody canvas!`,
                          `her ${rand(T_JOINTS)} buckle under the shifting weight, locking her in place like a beached whale!`
                      ]);
                  } else if (moverObj.fetalSize >= 4) {
                      failReason = rand([
                          `she tries to disengage, but feels the horrifying drag of her dense new ${rand(T_FAT)} tripping her up!`,
                          `her swollen belly's momentum carries her the wrong way, her thickened thighs tangling!`,
                          `the unfamiliar weight distribution of her pregnant bump throws her footwork into chaos!`
                      ]);
                  } else {
                      failReason = rand([
                          "she misjudges her footing on the slick canvas!",
                          "her heel catches on a wet patch of milk-streaked canvas!",
                          "she slips on the sweaty mat, her clean footwork betrayed by the filthy arena floor!"
                      ]);
                  }
                  logs.push(`[MOVE FAILED] ${moverObj.name} desperately tries to retreat, but ${failReason}`);
                  return currentRange;
              }
          }
          return currentRange;
      }
      return currentRange;
  };

  const executeTurn = (playerActionId) => {
    if (gameState.phase !== 'combat') return;

    let newState = JSON.parse(JSON.stringify(gameState));
    let newLogs = [];

    newState.player.isAdvancing = false;
    newState.enemy.isAdvancing = false;

    const isBellyBlocked = (newState.player.fetalSize + newState.enemy.fetalSize) >= 15;

    let playerAction;
    if (newState.player.isDowned) {
        playerAction = getDownedActions().find(a => a.id === playerActionId);
    } else if (newState.enemy.isDowned) {
        playerAction = getEnemyDownedActions().find(a => a.id === playerActionId);
    } else {
        playerAction = getActions(newState.player.fetalSize, newState.range, isBellyBlocked, newState.target).find(a => a.id === playerActionId);
    }

    const processAction = (action, attackerObj, defenderObj, attackerName, defenderName, defIsResting, actionTarget) => {
      let newlyAgitated = false;

      if (action.type === 'wait') {
          attackerObj.stamina = clamp(attackerObj.stamina + action.val, 0, MAX_STAMINA);
          newLogs.push(`[TIME STOP] ${attackerName} rests on the ropes, catching her breath while watching the pathetic broodsow struggle on the mat. (+${action.val} Stamina). `);
          return { result: {isSuccess: true, id: 'SUCCESS'}, logStr: "", newlyAgitated: false };
      }
      if (action.type === 'taunt') {
          defenderObj.arousal = clamp(defenderObj.arousal + action.val, 0, MAX_AROUSAL);
          newLogs.push(`[TIME STOP] ${attackerName} mercilessly taunts the downed fighter! The deep humiliation severely spikes ${defenderName}'s heat! (+${action.val} Arousal). `);
          return { result: {isSuccess: true, id: 'SUCCESS'}, logStr: "", newlyAgitated: false };
      }

      const exertionCost = calcCost(action.cost, attackerObj.voluptuousness);
      attackerObj.stamina = clamp(attackerObj.stamina - exertionCost, 0, MAX_STAMINA);

      const rawRoll = Math.floor(Math.random() * 100) + 1;
      const modifier = getRollModifier(action.type, attackerObj, defenderObj, action.id);
      const result = evaluateRoll(rawRoll, modifier);
      const vMult = defenderObj.stamina <= 0 ? 1.5 : 1.0;
      let logStr = generateActionText(result, action, attackerObj, defenderObj, defIsResting, actionTarget);

      if (!result.isSuccess) {
        if (action.type === 'strike' && attackerObj.voluptuousness >= 50 && attackerObj.strain >= 50) {
            const strainDmg = Math.floor(attackerObj.strain * 1.5) + 15;
            attackerObj.hp = clamp(attackerObj.hp - strainDmg, 0, MAX_HP);
            logStr += `(-${strainDmg} HP recoil). `;
        }
        if (action.type === 'heaveUp') {
            const strainDmg = Math.floor(attackerObj.strain * 1.0) + 20;
            attackerObj.hp = clamp(attackerObj.hp - strainDmg, 0, MAX_HP);
            attackerObj.stamina = clamp(attackerObj.stamina - 50, 0, MAX_STAMINA);
            logStr += `(-${strainDmg} HP from crushing joint stress). `;
        }
        if (result.id === 'CRIT_FAIL' && action.type !== 'rest' && action.type !== 'restDowned') {
            attackerObj.stamina = clamp(attackerObj.stamina - 40, 0, MAX_STAMINA);
            logStr += `(-40 Extra Stamina loss). `;
        }
        newLogs.push(logStr);
        return { result: result, logStr: logStr, newlyAgitated: newlyAgitated };
      }

      if (action.type === 'rest' || action.type === 'restDowned') {
        const stamHeal = Math.floor(action.val * result.mult);
        attackerObj.stamina = clamp(attackerObj.stamina + stamHeal, 0, MAX_STAMINA);
        attackerObj.will = clamp(attackerObj.will + 20, 0, MAX_WILL);
        newLogs.push(logStr + `(+${stamHeal} Stamina, +Will). `);
      }
      else if (action.type === 'slowRise' || action.type === 'heaveUp') {
        let prog = result.id === 'WEAK' ? (action.type==='slowRise'?1:2) : (action.type==='slowRise'?2:3);
        attackerObj.recoveryProgress += prog;
        newLogs.push(logStr + `(+${prog} Rise Progress). `);

        if (attackerObj.recoveryProgress >= attackerObj.recoveryThreshold) {
            attackerObj.isDowned = false;
            newLogs.push(`*** ${attackerName} finally manages to heave her extremely heavy, bloated incubator frame off the canvas! ***`);
        } else {
            newLogs.push(`(${attackerObj.recoveryProgress} / ${attackerObj.recoveryThreshold} Success Points required to stand).`);
        }
      }
      else if (action.type === 'strike') {
        let baseDmg = Math.floor(action.val * result.mult * (defIsResting ? 0.5 : 1.0));
        const muscleLossMult = Math.max(0.4, 1 - (attackerObj.voluptuousness / 150));
        const powerLostPct = Math.floor((1 - muscleLossMult) * 100);
        baseDmg = Math.floor(baseDmg * muscleLossMult);

        if (defenderObj.isDowned) baseDmg = Math.floor(baseDmg * 1.5);
        if (defenderObj.isAdvancing) baseDmg = Math.floor(baseDmg * 1.25);

        if (actionTarget === 'tits') {
            baseDmg = Math.floor(baseDmg * 0.7);
            defenderObj.milk += Math.floor(action.val * 0.3);
            defenderObj.arousal += Math.floor(action.val * 0.2);
            logStr += `(+Milk Bloat, +Arousal). `;
        } else if (actionTarget === 'belly') {
            baseDmg = Math.floor(baseDmg * 0.4);
            defenderObj.stamina = clamp(defenderObj.stamina - Math.floor(action.val * 0.8), 0, MAX_STAMINA);

            if (defIsResting) {
                logStr += `(Guard absorbs the shock! Belly protected! -Opponent Stamina). `;
            } else if (!defenderObj.agitatedThisRound) {
                defenderObj.agitationQueued = Math.max(defenderObj.agitationQueued, 1);
                defenderObj.agitatedThisRound = true;
                newlyAgitated = true;
                if (defenderObj.orgasmedThisRound) {
                    logStr += `(Fetuses agitated, but eclipsed by her climax! -Opponent Stamina). `;
                } else {
                    logStr += `(+Agitation, -Opponent Stamina). `;
                }
            } else {
                logStr += `(Fetuses already agitated this round! -Opponent Stamina). `;
            }

            if (!defIsResting) {
                defenderObj.effect = { type: 'agitate', turn: newState.turn + 1 };
            }
        } else if (actionTarget === 'face' && action.id === 'jab' && !defIsResting) {
            defenderObj.isDistracted = true;
            logStr += `(Opponent Distracted!). `;
        }

        if (powerLostPct > 10 && !defIsResting) {
            logStr += rand([
                `Her cannibalized, doughy arms are completely robbed of athletic strength! The weak blow loses ${powerLostPct}% of its power, doing little more than bruising ${defenderName}'s squishy ${rand(T_FAT)}! `,
                `The demanding fetuses have stolen her muscular power! Her flabby punch loses ${powerLostPct}% of its force, merely stinging ${defenderName}'s heavy padding. `,
                `Her hormone-cooked body is meant for breeding, not fighting. The soft strike is weakened by ${powerLostPct}%, feeling like a pathetic, wet slap! `
            ]);
        }

        defenderObj.hp -= baseDmg;
        logStr += `(-${baseDmg} HP). `;
        if (actionTarget !== 'belly') {
            defenderObj.effect = { type: result.id === 'CRIT_SUCCESS' ? 'crit' : 'hit', turn: newState.turn + 1 };
        }

        if (actionTarget === 'belly' && defenderObj.fetalSize >= 8 && !defenderObj.isDowned && result.mult >= 1.0) {
            const incontChance = defenderObj.fetalSize >= 10 ? 0.60 : 0.35;
            if (Math.random() < incontChance) {
                defenderObj.stamina = clamp(defenderObj.stamina - 150, 0, MAX_STAMINA);
                logStr += `*** HUMILIATION! The brutal blow to her enormous ${rand(T_BELLY)} pulverizes her bladder! ${defenderName} helplessly wets the canvas, weeping in frustration! (-150 Stamina) *** `;
            }
        }

        const downThreshold = 300 + Math.floor(defenderObj.strain * 1.5);
        if (defenderObj.hp < downThreshold && result.mult >= 1.0 && !defenderObj.isDowned) {
            if (Math.random() * 100 < ((downThreshold - defenderObj.hp) / downThreshold) * 100) {
                newLogs.push(logStr);
                triggerKnockdown(defenderObj, newLogs, `*** KNOCKDOWN! ${defenderName}'s swollen, creaking ${rand(T_JOINTS)} finally ${rand(T_FLINCH)} under her massive weight!`);
                return { result: result, logStr: logStr, newlyAgitated: newlyAgitated };
            }
        }
        newLogs.push(logStr);
      }
      else if (action.type === 'arousal') {
        let arousalDealt = Math.floor(action.val * result.mult * vMult);
        if (defIsResting) arousalDealt = Math.floor(arousalDealt * 1.5);
        defenderObj.arousal += arousalDealt;
        attackerObj.arousal += Math.floor(arousalDealt / 3);
        newLogs.push(logStr + `(+${arousalDealt} Arousal). `);
      }

      attackerObj.isDistracted = false;
      return { result: result, logStr: logStr, newlyAgitated: newlyAgitated };
    };

    const evaluateArousal = (fighter, logsArray, isRingActive) => {
      fighter.arousal = clamp(fighter.arousal - 5, 0, MAX_AROUSAL);

      if (fighter.arousal >= 70) {
          if (!fighter.inHeat && !fighter.isDowned) {
              fighter.inHeat = true;
              logsArray.push(`*** SAVAGE HEAT! ${fighter.name}'s mind screams in trapped horror as her dripping, ruthlessly congested anatomy completely hijacks her nervous system, forcing her to violently rut! ***`);
          }
      } else {
          if (fighter.inHeat) {
              fighter.inHeat = false;
              logsArray.push(`[INFO] ${fighter.name} gasps, regaining control of her mind as the feverish rut breaks.`);
          }
      }

      if (fighter.arousal > 50 && !isRingActive && fighter.hp > 0) {
          if (Math.random() * 100 < ((fighter.arousal - 50) / 50) * 75) {
              fighter.arousal = 0;
              fighter.hp = clamp(fighter.hp - 50, 0, MAX_HP);
              fighter.stamina = clamp(fighter.stamina - 100, 0, MAX_STAMINA);
              fighter.inHeat = false;
              fighter.isDistracted = false;

              let growthStr = "";
              if (!fighter.orgasmedThisRound) {
                  fighter.agitationQueued = Math.max(fighter.agitationQueued, 2);
                  fighter.orgasmedThisRound = true;
                  growthStr = "(+2 Queued Fetal Growth)";
              } else {
                  growthStr = "(Already climaxed this round! No extra fetal growth.)";
              }

              if (!fighter.isDowned) {
                  triggerKnockdown(fighter, logsArray, `*** CLIMAX! ${fighter.name}'s furious edging breaks! The painful, humiliating intensity of emptying her backed-up balls into her shorts drops her to her knees! The violent spasming in her core actively agitates her male fetuses! ${growthStr} ***`);
              } else {
                  fighter.recoveryProgress = 0;
                  logsArray.push(`*** CLIMAX! Writhing on the mat, the humiliating intensity of emptying her loaded balls shatters ${fighter.name}'s focus! The violent core spasms actively agitate the male fetuses, completely resetting her struggle to rise! ${growthStr} ***`);
              }
          }
      }
    };

    // PLAYER RECOVERY TIME STOP
    if (newState.player.isDowned) {
        newState.player.refCount += 1;
        newLogs.push(`[Count: ${newState.player.refCount}]`);

        if (playerAction) {
            processAction(playerAction, newState.player, newState.enemy, newState.player.name, newState.enemy.name, false, newState.target);
            evaluateArousal(newState.player, newLogs, false);
        }

        if (!newState.player.isDowned) {
            newLogs.push(`[INFO] ${newState.player.name} beats the count! Time resumes.`);
        } else if (newState.player.refCount >= 10) {
            newState.phase = 'gameover';
            newState.winner = 'enemy';
            newLogs.push(`*** KO! ${newState.player.name} failed to beat the 10-count! Her ruined fuckmattress pornbody couldn't leave the mat! ***`);
        }

        newState.log = [...newState.log, ...newLogs];
        setGameState(newState);
        return;
    }

    // ENEMY RECOVERY TIME STOP (INTERACTIVE)
    if (newState.enemy.isDowned) {
        if (playerAction) {
            processAction(playerAction, newState.player, newState.enemy, newState.player.name, newState.enemy.name, false, newState.target);
        }

        newState.enemy.refCount += 1;
        newLogs.push(`[Count: ${newState.enemy.refCount}]`);

        const eActions = getDownedActions();
        let eRecAct;
        if (newState.enemy.stamina < 150) eRecAct = eActions.find(a => a.id === 'restDowned');
        else if (newState.enemy.recoveryThreshold - newState.enemy.recoveryProgress >= 2 && newState.enemy.stamina > 300) {
            eRecAct = Math.random() > 0.4 ? eActions.find(a => a.id === 'heaveUp') : eActions.find(a => a.id === 'slowRise');
        } else {
            eRecAct = eActions.find(a => a.id === 'slowRise');
        }

        processAction(eRecAct, newState.enemy, newState.player, newState.enemy.name, newState.player.name, true, 'belly');
        evaluateArousal(newState.enemy, newLogs, false);

        if (!newState.enemy.isDowned) {
            newLogs.push(`[INFO] ${newState.enemy.name} beats the count! Time resumes.`);
        } else if (newState.enemy.refCount >= 10) {
            newState.phase = 'gameover';
            newState.winner = 'player';
            newLogs.push(`*** KO! Siobhan failed to beat the 10-count! Her bloated incubator frame couldn't leave the mat! ***`);
        }

        newState.log = [...newState.log, ...newLogs];
        setGameState(newState);
        return;
    }

    // NORMAL COMBAT RESUMES BELOW
    const triggerFlavor = (fighter, logsArray) => {
        const validFlavors = FLAVOR_TEXTS.filter(ft => ft.cond(fighter));
        if (validFlavors.length > 0 && Math.random() < 0.8) {
            const chosen = rand(validFlavors);
            let prefix = chosen.type === 'warning' ? '[WARNING]' : '[FLAVOR]';
            logsArray.push(`${prefix} ${chosen.text.replace(/\{name\}/g, fighter.name)}`);
        }
    };

    triggerFlavor(newState.player, newLogs);
    triggerFlavor(newState.enemy, newLogs);

    const triggerInvoluntary = (fighter, logsArray) => {
        if (Math.random() > 0.4) return;

        let possible = [];
        if (fighter.fetalSize >= 10) possible.push(`The massive ${rand(T_BRATS)} violently ${rand(T_BRAT_ACT)} against her flattened bladder. ${fighter.name} gasps, sobbing in furious humiliation as she involuntarily pisses a hot stream down her legs.`);
        if (fighter.fetalSize >= 12) possible.push(`A violent Braxton Hicks contraction ripples across ${fighter.name}'s drum-tight ${rand(T_BELLY)}, forcing a guttural moan from her lips despite her desperate attempt to stay silent.`);
        if (fighter.milk >= 60) possible.push(`${fighter.name} claps a hand over her mouth, but a filthy, hormone-drenched moan escapes anyway as hot milk suddenly sprays from her over-inflated ${rand(T_TITS)}.`);
        if (fighter.voluptuousness >= 60) possible.push(`${fighter.name} attempts to shift her massive weight, but the agonizing friction of her intensely chafing, cellulite-choked ${rand(T_FAT)} makes her furiously whimper and stagger.`);
        if (fighter.arousal >= 60 && !fighter.inHeat) possible.push(`A sudden, violent throb in her congested slit makes ${fighter.name} abruptly grind her incredibly fat thighs together. She bites her lip until it bleeds to stop the rutting.`);
        if (fighter.arousal >= 80 && !fighter.inHeat) possible.push(`${fighter.name}'s dripping futa-meat bulges visibly through her soaked, ruined shorts. She punches her own thigh in sheer rage, completely betrayed by her fighting focus.`);

        if (fighter.fetalSize >= 9) {
            possible.push(`The sheer, unfair gravitational pull of ${fighter.name}'s low-slung ${rand(T_BELLY)} makes her spine pop audibly. She whines in pure agony, completely trapped in her own flesh.`);
            possible.push(`A massive, distinct hand pushes forcefully outward against the drum-tight skin of ${fighter.name}'s unbelievably heavy ${rand(T_BELLY)}, violently stretching her beyond human limits.`);
        }

        if (fighter.fetalSize >= 8 && fighter.voluptuousness < 90) {
            possible.push(`The massive, squirming fetuses forcefully feed on her athletic core! ${fighter.name} gasps, sobbing in furious humiliation as she physically feels her tight abs literally softening into dimpled, squishy ${rand(T_FAT)}.`);
            possible.push(`${fighter.name}'s incredibly heavy, overbred body betrays her! The greedy ${rand(T_BRATS)} eagerly consume her muscular strength, leaving her standing there as a panting, helpless piece of squishy broodsow meat.`);
        }

        if (possible.length > 0) {
            logsArray.push(`[FLAVOR] ${rand(possible)}`);
        }
    };

    triggerInvoluntary(newState.player, newLogs);
    triggerInvoluntary(newState.enemy, newLogs);

    // SIOBHAN BARKS — give the opponent personality
    if (Math.random() < 0.3) {
        const validBarks = ENEMY_BARKS.filter(b => b.cond(newState.enemy));
        if (validBarks.length > 0) {
            const bark = rand(validBarks);
            newLogs.push(`[BARK] ${newState.enemy.name}: ${bark.text}`);
        }
    }

    newState.playerLastAction = playerAction ? playerAction.type : 'none';

    const eIsResting = false;
    let playerProcessResult = null;
    if (playerAction && !playerAction.disabled && isActionValid(playerAction.id, newState.range, isBellyBlocked, newState.target)) {
        playerProcessResult = processAction(playerAction, newState.player, newState.enemy, newState.player.name, newState.enemy.name, false, newState.target);
    } else if (playerAction) {
        newLogs.push(`[CRITICAL FAILURE] Out of position! ${newState.player.name} flails uselessly at the wrong range!`);
        newState.player.stamina = clamp(newState.player.stamina - 40, 0, MAX_STAMINA);
    }

    if (playerProcessResult && playerProcessResult.result && playerProcessResult.result.isSuccess && playerAction && playerAction.type === 'strike' && newState.target === 'belly' && !eIsResting && playerProcessResult.newlyAgitated) {
         newLogs[newLogs.length - 1] += rand([
             `The sloshed ${rand(T_BRATS)} angrily demand calories, violently venting potent cannibalizing hormones into her bloodstream! `,
             `The smacked male womb-bullies immediately trigger a massive hormonal dump, draining her muscle mass into dense feminine fat! `,
             `Agitated by the disturbance, the greedy male gestalts violently melt her hard muscles into squishy, heavy-bottomed ${rand(T_FAT)}! `,
             `Her agitated uterus floods her body with hormones as the engineered male litters demand immediate, catastrophic caloric sacrifice! `
         ]);
    }

    // Enemy AI Phase
    if (newState.enemy.hp > 0 && !newState.enemy.isDowned && newState.player.hp > 0) {
        let eTarget = rand(['face', 'tits', 'belly']);
        let enemyMovement = 'hold';
        let enemyActionId = 'brace';

        if (newState.enemy.inHeat) {
            if (newState.range < 2) {
                enemyMovement = 'advance';
                enemyActionId = 'grapple';
            } else {
                enemyMovement = 'hold';
                enemyActionId = 'grapple';
            }
        } else if (newState.enemy.stamina < 200) {
            enemyActionId = 'brace';
            if (newState.range === 2) enemyMovement = 'retreat';
        } else {
            const attacks = ['jab', 'straight', 'hook', 'uppercut'];
            enemyActionId = rand(attacks);

            if ((enemyActionId === 'jab' || enemyActionId === 'straight') && newState.range === 2) {
                enemyMovement = 'retreat';
            } else if (enemyActionId === 'hook' && newState.range === 0) {
                enemyMovement = 'advance';
            } else if (enemyActionId === 'hook' && newState.range === 2) {
                enemyMovement = 'retreat';
            } else if (enemyActionId === 'uppercut' && newState.range < 2) {
                enemyMovement = 'advance';
            } else {
                enemyMovement = 'hold';
            }
        }

        newState.range = processMovement(newState.enemy, enemyMovement, newState.range, newLogs);

        const eActionObj = getActions(newState.enemy.fetalSize, newState.range, isBellyBlocked, eTarget).find(a => a.id === enemyActionId);
        const pIsResting = playerAction && playerAction.type === 'rest';

        if (eActionObj && isActionValid(eActionObj.id, newState.range, isBellyBlocked, eTarget)) {
            processAction(eActionObj, newState.enemy, newState.player, newState.enemy.name, newState.player.name, pIsResting, eTarget);
        } else {
            newLogs.push(`[CRITICAL FAILURE] Out of position! ${newState.enemy.name} flails uselessly at the wrong range!`);
            newState.enemy.stamina = clamp(newState.enemy.stamina - 40, 0, MAX_STAMINA);
        }
    }

    evaluateArousal(newState.player, newLogs, false);
    evaluateArousal(newState.enemy, newLogs, false);

    // MOMENTUM TRACKING
    if (playerProcessResult && playerAction && playerAction.type === 'strike') {
        if (playerProcessResult.result && playerProcessResult.result.isSuccess) {
            newState.player.consecutiveHits += 1;
            if (newState.player.consecutiveHits === 3) {
                newLogs.push(rand([
                    `[FLAVOR] She's finding her rhythm! Even through the fog of hormones, ${newState.player.name}'s gladiator instinct burns bright!`,
                    `[FLAVOR] A relentless barrage! The crowd chants as ${newState.player.name} presses her advantage despite the weight dragging her down!`,
                    `[FLAVOR] Three clean hits! The warrior inside the broodsow is clawing her way to the surface, landing blow after brutal blow!`
                ]));
            }
        } else {
            if (newState.player.consecutiveHits >= 3) {
                newLogs.push(`[FLAVOR] The momentum shatters! ${newState.player.name}'s traitorous body finally betrays the rhythm!`);
            }
            newState.player.consecutiveHits = 0;
        }
    }

    const applyPassives = (fighterObj, logsArray) => {
      fighterObj.milk += 8;
      fighterObj.arousal += Math.floor(fighterObj.milk / 15);
      fighterObj.hp -= Math.floor(fighterObj.milk / 4);

      const fetusWeight = calcFetusWeight(fighterObj.fetalSize);
      const massDrain = Math.floor(fighterObj.voluptuousness / 2) + Math.floor(fetusWeight / 3);
      fighterObj.stamina -= massDrain;

      if (fighterObj.fetalSize >= 6 && !fighterObj.isDowned) {
          const fatGain = Math.floor(fighterObj.fetalSize / 4);
          fighterObj.voluptuousness = clamp(fighterObj.voluptuousness + fatGain, 0, MAX_VOLUPTUOUSNESS);

          if (Math.random() > 0.85) {
              fighterObj.effect = { type: 'agitate', turn: newState.turn + 1 };
              const muscleMelts = [
                  `The greedy ${rand(T_BRATS)} inside ${fighterObj.name} ruthlessly steal her strength mid-fight! Her hard muscle actively melts to feed them, dumping the excess calories into soft, squishy padding on her hips and chest!`,
                  `Biological theft! The demanding ${rand(T_BRATS)} actively strip-mine ${fighterObj.name}'s athletic core, dissolving her lean muscle into deeply humiliating ${rand(T_FAT)} just to sustain their massive growth!`,
                  `${fighterObj.name} gasps as a violent hormonal spike forces her body to prioritize the pregnancy! Her hard-won muscle rapidly cannibalizes itself, softening into heavy, estrogenic ${rand(T_FAT)} to feed the ${rand(T_BRATS)}!`,
                  `A sickening rush of heat floods ${fighterObj.name}'s limbs as the massive ${rand(T_BRATS)} aggressively demand calories! She literally feels her fighting strength melting into jiggly, yielding ${rand(T_SOFT)}!`,
                  `Traitorous biology! To satisfy the squirming ${rand(T_BRATS)}, ${fighterObj.name}'s own metabolism violently breaks down her athletic power, aggressively packing thick, grab-able ${rand(T_FAT)} onto her frame right before your eyes!`
              ];
              logsArray.push(`[WARNING] ${rand(muscleMelts)} (+Fat, -Muscle)`);
          }
      }

      if (fighterObj.fetalSize >= 10 && Math.random() > 0.8 && !fighterObj.isDowned) {
          logsArray.push(`[WARNING] Hefting the violently heavy, squirming ${rand(T_BRATS)} is physically crushing ${fighterObj.name}'s spine, passively draining her stamina!`);
      }
    };

    if(newState.player.hp > 0 && newState.phase !== 'gameover') applyPassives(newState.player, newLogs);
    if(newState.enemy.hp > 0 && newState.phase !== 'gameover') applyPassives(newState.enemy, newLogs);

    newState.player.stamina = clamp(newState.player.stamina, 0, MAX_STAMINA);
    newState.enemy.stamina = clamp(newState.enemy.stamina, 0, MAX_STAMINA);
    newState.player.hp = clamp(newState.player.hp, 0, MAX_HP);
    newState.enemy.hp = clamp(newState.enemy.hp, 0, MAX_HP);
    newState.player.arousal = clamp(newState.player.arousal, 0, MAX_AROUSAL);
    newState.enemy.arousal = clamp(newState.enemy.arousal, 0, MAX_AROUSAL);
    newState.player.milk = clamp(newState.player.milk, 0, MAX_MILK);
    newState.enemy.milk = clamp(newState.enemy.milk, 0, MAX_MILK);

    newState.log = [...newState.log, ...newLogs];
    newState.turn += 1;

    // DEFIANCE INTERRUPT EVALUATION (WILLPOWER)
    const playerDownedThisTurn = newState.player.isDowned && !gameState.player.isDowned;
    const playerHeatThisTurn = newState.player.inHeat && !gameState.player.inHeat;
    const playerClimaxedThisTurn = newState.player.arousal === 0 && gameState.player.arousal > 50 && newState.player.stamina < gameState.player.stamina && newLogs.some(l => l.includes('CLIMAX!'));

    if (playerDownedThisTurn && gameState.player.will >= 30) {
        const aState = JSON.parse(JSON.stringify(newState));
        aState.player.isDowned = false;
        aState.player.downs -= 1;
        aState.player.will -= 30;
        aState.log.push(`*** DEFIANCE! You burn 30 Willpower! With an agonized scream, you lock your violently swollen ${rand(T_JOINTS)} and refuse to hit the mat! ***`);

        newState.phase = 'interrupt';
        newState.interrupt = {
            title: "CRITICAL JOINT FAILURE",
            text: `Your ${rand(T_JOINTS)} buckle painfully under the immense, shifting weight of the ${rand(T_BRATS)}. You are falling to the canvas!`,
            action: "Lock Knees & Stand",
            cost: 30,
            acceptState: finalizeStatePhase(aState),
            declineState: finalizeStatePhase(JSON.parse(JSON.stringify(newState)))
        };
        setGameState(newState);
        return;
    }
    else if (playerClimaxedThisTurn && gameState.player.will >= 40) {
        const aState = JSON.parse(JSON.stringify(newState));
        aState.player.hp = clamp(aState.player.hp + 50, 0, MAX_HP);
        aState.player.stamina = clamp(aState.player.stamina + 100, 0, MAX_STAMINA);
        if (!gameState.player.orgasmedThisRound) {
            aState.player.agitationQueued = Math.max(0, aState.player.agitationQueued - 2);
            aState.player.orgasmedThisRound = false;
        }
        aState.player.arousal = 65;
        aState.player.will -= 40;
        aState.log.push(`*** DEFIANCE! You burn 40 Willpower! You bite your lip until it bleeds, violently clamping your hips together to forcefully deny the humiliating climax! You are edging on the absolute brink! ***`);

        newState.phase = 'interrupt';
        newState.interrupt = {
            title: "SENSORY OVERLOAD",
            text: `Your heavily congested futa-meat violently throbs! The agonizing pressure of your backed-up seed is forcing an explosive, stamina-draining climax right here on the mat!`,
            action: "Clench Hips & Edge",
            cost: 40,
            acceptState: finalizeStatePhase(aState),
            declineState: finalizeStatePhase(JSON.parse(JSON.stringify(newState)))
        };
        setGameState(newState);
        return;
    }
    else if (playerHeatThisTurn && gameState.player.will >= 20) {
        const aState = JSON.parse(JSON.stringify(newState));
        aState.player.inHeat = false;
        aState.player.arousal = 60;
        aState.player.will -= 20;
        aState.log.push(`*** DEFIANCE! You burn 20 Willpower! You punch your own squishy thigh in pure spite, snapping your preggo-brain out of the hormonal rut! ***`);

        newState.phase = 'interrupt';
        newState.interrupt = {
            title: "ENDOCRINE OVERRIDE",
            text: `Your preggo-brain is melting into pure Savage Heat. The overwhelming lust is forcing your heavy hips to involuntarily rut!`,
            action: "Bite Lip & Suppress",
            cost: 20,
            acceptState: finalizeStatePhase(aState),
            declineState: finalizeStatePhase(JSON.parse(JSON.stringify(newState)))
        };
        setGameState(newState);
        return;
    }

    setGameState(finalizeStatePhase(newState));
  };

  const handleEpilogueChoice = (choiceId) => {
    setGameState({ ...gameState, epilogueStep: choiceId });
  };

  const executePitStop = (choice) => {
    if (gameState.phase !== 'pitstop') return;
    let newState = { ...gameState };

      if (newState.pitstopTurn === 1) {
          newState.player.downs = 0;
          newState.enemy.downs = 0;
      }

      let pRingActive = false;
      let eRingActive = false;

      if (choice === 'feed') {
        newState.player.hp = clamp(newState.player.hp + 250, 0, MAX_HP);
        newState.player.stamina = clamp(newState.player.stamina + 300, 0, MAX_STAMINA);
        newState.player.voluptuousness = clamp(newState.player.voluptuousness + 3, 0, MAX_VOLUPTUOUSNESS);
        newState.player.strain = clamp(newState.player.strain + 2, 0, MAX_STRAIN);
        newState.log = [...newState.log, getPitstopLog('feed', newState.player)];
      } else if (choice === 'ring') {
        pRingActive = true;
        newState.log = [...newState.log, getPitstopLog('ring', newState.player)];
      } else if (choice === 'pump') {
        newState.player.milk = 0;
        newState.player.hp = clamp(newState.player.hp + 200, 0, MAX_HP);
        newState.player.arousal += 15;
        newState.log = [...newState.log, getPitstopLog('pump', newState.player)];
      } else if (choice === 'bladder') {
        newState.player.stamina = clamp(newState.player.stamina + 200, 0, MAX_STAMINA);
        newState.log = [...newState.log, getPitstopLog('bladder', newState.player)];
      }

      let enemyChoice = 'feed';
      if (newState.enemy.arousal > 80) enemyChoice = 'ring';
      else if (newState.enemy.stamina < 300) enemyChoice = 'bladder';
      else if (newState.enemy.milk > 60) enemyChoice = 'pump';

      if (enemyChoice === 'feed') {
          newState.enemy.hp = clamp(newState.enemy.hp + 250, 0, MAX_HP);
          newState.enemy.stamina = clamp(newState.enemy.stamina + 300, 0, MAX_STAMINA);
          newState.enemy.voluptuousness = clamp(newState.enemy.voluptuousness + 3, 0, MAX_VOLUPTUOUSNESS);
          newState.enemy.strain = clamp(newState.enemy.strain + 2, 0, MAX_STRAIN);
          newState.log = [...newState.log, getPitstopLog('feed', newState.enemy)];
      } else if (enemyChoice === 'ring') {
          eRingActive = true;
          newState.log = [...newState.log, getPitstopLog('ring', newState.enemy)];
      } else if (enemyChoice === 'pump') {
          newState.enemy.milk = 0;
          newState.enemy.hp = clamp(newState.enemy.hp + 200, 0, MAX_HP);
          newState.enemy.arousal += 15;
          newState.log = [...newState.log, getPitstopLog('pump', newState.enemy)];
      } else if (enemyChoice === 'bladder') {
          newState.enemy.stamina = clamp(newState.enemy.stamina + 200, 0, MAX_STAMINA);
          newState.log = [...newState.log, getPitstopLog('bladder', newState.enemy)];
      }

      // evaluateArousal needs to work on mutable state with logs array
      const evalArousalPitstop = (fighter, isRingActive) => {
        fighter.arousal = clamp(fighter.arousal - 5, 0, MAX_AROUSAL);
        if (fighter.arousal >= 70) {
            if (!fighter.inHeat && !fighter.isDowned) {
                fighter.inHeat = true;
                newState.log = [...newState.log, `*** SAVAGE HEAT! ${fighter.name}'s mind screams in trapped horror as her dripping, ruthlessly congested anatomy completely hijacks her nervous system, forcing her to violently rut! ***`];
            }
        } else {
            if (fighter.inHeat) {
                fighter.inHeat = false;
                newState.log = [...newState.log, `[INFO] ${fighter.name} gasps, regaining control of her mind as the feverish rut breaks.`];
            }
        }
        if (fighter.arousal > 50 && !isRingActive && fighter.hp > 0) {
            if (Math.random() * 100 < ((fighter.arousal - 50) / 50) * 75) {
                fighter.arousal = 0;
                fighter.hp = clamp(fighter.hp - 50, 0, MAX_HP);
                fighter.stamina = clamp(fighter.stamina - 100, 0, MAX_STAMINA);
                fighter.inHeat = false;
                fighter.isDistracted = false;
                let growthStr = "";
                if (!fighter.orgasmedThisRound) {
                    fighter.agitationQueued = Math.max(fighter.agitationQueued, 2);
                    fighter.orgasmedThisRound = true;
                    growthStr = "(+2 Queued Fetal Growth)";
                } else {
                    growthStr = "(Already climaxed this round! No extra fetal growth.)";
                }
                if (!fighter.isDowned) {
                    fighter.downs += 1;
                    fighter.isDowned = true;
                    fighter.refCount = 0;
                    fighter.recoveryProgress = 0;
                    fighter.isDistracted = false;
                    const ruinLevel = 1 + Math.floor(fighter.fetalSize / 3) + Math.floor(fighter.voluptuousness / 20);
                    fighter.recoveryThreshold = clamp(ruinLevel, 2, 9);
                    newState.log = [...newState.log, `*** CLIMAX! ${fighter.name}'s furious edging breaks! ${growthStr} ***`];
                } else {
                    fighter.recoveryProgress = 0;
                    newState.log = [...newState.log, `*** CLIMAX! ${fighter.name} climaxes on the mat! ${growthStr} ***`];
                }
            }
        }
      };

      evalArousalPitstop(newState.player, pRingActive);
      evalArousalPitstop(newState.enemy, eRingActive);

      if (newState.pitstopTurn >= 2) {
          const applyGestation = (fighterObj, name) => {
            const queued = fighterObj.agitationQueued;
            fighterObj.fetalSize += 1.0 + queued;
            let addedSize = 1.0 + queued;
            fighterObj.agitationQueued = 0;

            const volGain = Math.floor(addedSize * (6 + Math.random() * 5));
            const strainGain = Math.floor(addedSize * (4 + Math.random() * 5));
            fighterObj.voluptuousness += volGain;
            fighterObj.strain += strainGain;

            let msg = "";
            if (queued === 0) {
                msg = rand([
                    `${name} suffers her natural +1 Month fetal growth. Her engineered male parasites demand calories, slowly cannibalizing her muscle to fuel their growth and dumping the excess into soft, dense fat on her hips and tits (+${volGain} Voluptuousness). Her ${rand(T_JOINTS)} buckle slightly under the new meat (+${strainGain} Strain).`,
                    `Time marches on, forcing ${name}'s body through another natural +1 Month of pregnancy. The male fetuses drain her energy, packing on more heavy, squishy ${rand(T_FAT)} straight onto her extreme hourglass frame (+${volGain} Voluptuousness) as her aching knees pop (+${strainGain} Strain).`
                ]);
            } else if (queued <= 2) {
                msg = rand([
                    `${name} suffers natural +1 Month growth, but the sloshed hormones violently vent! The testy male ${rand(T_BRATS)} force an additional +${queued} Months! They demand massive calories, melting her muscle and aggressively forcing an extreme, heavy-bottomed hourglass frame (+${volGain} Voluptuousness) and her joints groan under the sudden weight (+${strainGain} Strain).`
                ]);
            } else if (queued <= 4) {
                msg = rand([
                    `CATASTROPHIC GROWTH! ${name}'s battered womb dumps massive amounts of raw hormones as the male fetuses aggressively demand calories! Along with her natural +1 Month, she instantly swells by +${queued} extra Months! Her muscle is instantly cannibalized, the excess calories violently expanding her tits and thighs into a heavy, leaking fuckmattress pornbody (+${volGain} Voluptuousness)! Her skeleton shrieks in agony (+${strainGain} Strain)!`
                ]);
            } else {
                msg = rand([
                    `BIOLOGICAL DEFEAT! ${name}'s preggo-brain and battered womb completely overflow with pure, unadulterated breeding hormones! The genetically engineered male fetuses demand total caloric sacrifice! Adding to the natural +1 Month, her violently overstuffed belly expands by a shamelessly massive +${queued} Months! Her athletic muscle is completely erased, replaced by a highly titillating, extreme hourglass figure packed with dense, meaty breederfat on her hips and chest (+${volGain} Voluptuousness)! Her joints practically shatter (+${strainGain} Strain)!`
                ]);
            }
            newState.log = [...newState.log, msg];

            fighterObj.fetalSize = clamp(fighterObj.fetalSize, 1.0, MAX_FETAL_SIZE);
            fighterObj.voluptuousness = clamp(fighterObj.voluptuousness, 0, MAX_VOLUPTUOUSNESS);
            fighterObj.strain = clamp(fighterObj.strain, 0, MAX_STRAIN);
            fighterObj.agitatedThisRound = false;
            fighterObj.orgasmedThisRound = false;
          };

          applyGestation(newState.player, newState.player.name);
          applyGestation(newState.enemy, newState.enemy.name);

          newState.round += 1;
          newState.turn = 1;

          const overCheck = checkGameOver(newState, false);
          if (overCheck.isOver) {
              newState.phase = 'gameover';
              newState.winner = overCheck.winner;
              newState.log = [...newState.log, `*** MATCH OVER: ${overCheck.reason} ***`];
          } else {
              newState.phase = 'combat';
              newState.log = [...newState.log, `--- ROUND ${newState.round} BEGINS ---`];
              if (newState.player.fetalSize >= MAX_FETAL_SIZE || newState.enemy.fetalSize >= MAX_FETAL_SIZE) {
                  newState.log = [...newState.log, `*** WARNING: Braxton Hicks contractions detected! This is the FINAL ROUND before labor forces a stoppage! ***`];
              }
          }
      } else {
          newState.pitstopTurn += 1;
      }
      setGameState(newState);
    };

  const isFinalRound = gameState.player.fetalSize >= 12 || gameState.enemy.fetalSize >= 12;
  const rangeText = gameState.range === 0 ? "LONG RANGE (Poking Distance)" : gameState.range === 1 ? "MEDIUM RANGE (Striking Distance)" : "CLOSE RANGE (Clinch/Belly Bump)";

  let projectedRange = gameState.range;
  if (!gameState.player.isDowned && !gameState.enemy.isDowned) {
      if (gameState.movement === 'advance' && gameState.range < 2) projectedRange += 1;
      if (gameState.movement === 'retreat' && gameState.range > 0) projectedRange -= 1;
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-gray-200 font-sans p-2 md:p-6 flex flex-col max-w-6xl mx-auto"
         style={{ backgroundImage: 'radial-gradient(circle at 50% 50%, #2a1122 0%, #000000 100%)' }}>

      <div className={`fixed inset-0 z-50 pointer-events-none transition-opacity duration-1000 ${gameState.player.hp < 250 && gameState.player.hp > 0 && gameState.phase === 'combat' ? 'animate-critical-hp opacity-100' : 'opacity-0'}`}></div>

      {gameState.phase === 'interrupt' && gameState.interrupt && (
        <InterruptModal
          interrupt={gameState.interrupt}
          onAccept={() => setGameState(gameState.interrupt.acceptState)}
          onDecline={() => setGameState(gameState.interrupt.declineState)}
        />
      )}

      <header className="text-center mb-4 border-b border-pink-900/50 pb-4 relative z-10">
        <h1 className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600 tracking-tighter uppercase">
          Fertility Fights
        </h1>
        <p className="text-pink-400/70 text-xs tracking-widest font-mono mt-1 mb-2">THE UNDERHIVE PITS</p>

        {gameState.phase !== 'menu' && gameState.phase !== 'intro' && (
          <div className="mt-3 inline-flex flex-col items-center">
             <div className="bg-black/80 px-4 md:px-6 py-2 rounded-full border border-pink-900/50 shadow-[0_0_10px_rgba(255,0,128,0.2)] mb-2">
              {gameState.phase === 'pitstop' ? (
                <span className="font-bold text-pink-500 text-sm tracking-wider animate-pulse">PIT STOP - TURN {gameState.pitstopTurn}/2</span>
              ) : (
                <>
                  <span className="font-bold text-gray-400 text-sm tracking-wider">ROUND <span className="text-white text-lg">{gameState.round}</span> / {MAX_ROUNDS}</span>
                  <span className="mx-3 text-pink-700">|</span>
                  <span className="font-bold text-gray-400 text-sm tracking-wider">TURN <span className="text-white text-lg">{gameState.turn}</span> / {TURNS_PER_ROUND}</span>
                </>
              )}
            </div>
            {gameState.phase === 'combat' && (
                <div className="text-yellow-500 font-black tracking-widest uppercase border border-yellow-600/50 bg-yellow-900/20 px-4 py-1 rounded">
                    {rangeText}
                </div>
            )}
            {isFinalRound && gameState.phase !== 'pitstop' && (
                <div className="mt-2 text-red-500 font-black text-xs md:text-sm animate-pulse uppercase tracking-widest bg-red-900/20 px-4 py-1 rounded">
                    FINAL ROUND (LABOR IMMINENT)
                </div>
            )}
          </div>
        )}
      </header>

      {gameState.phase === 'intro' && (
        <IntroScreen onContinue={() => setGameState({...gameState, phase: 'menu'})} />
      )}

      {gameState.phase === 'menu' && (
        <MenuScreen onStart={startGame} />
      )}

      {(gameState.phase === 'combat' || gameState.phase === 'pitstop' || gameState.phase === 'gameover' || gameState.phase === 'interrupt') && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 flex-1 z-10">
          <FighterCard data={gameState.player} isPlayer={true} currentTurn={gameState.turn} />
          <FighterCard data={gameState.enemy} isPlayer={false} currentTurn={gameState.turn} />

          <CombatLog log={gameState.log} logEndRef={logEndRef} />

          <div className="lg:col-span-2 bg-neutral-900 border border-neutral-800 p-3 md:p-4 rounded-lg shadow-lg">
            <ActionPanel
              gameState={gameState}
              setGameState={setGameState}
              executeTurn={executeTurn}
              projectedRange={projectedRange}
            />

            {gameState.phase === 'pitstop' && (
              <PitStopPanel pitstopTurn={gameState.pitstopTurn} onChoice={executePitStop} />
            )}

            {gameState.phase === 'gameover' && (
              <GameOverScreen
                gameState={gameState}
                onEpilogueChoice={handleEpilogueChoice}
                onRestart={startGame}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
