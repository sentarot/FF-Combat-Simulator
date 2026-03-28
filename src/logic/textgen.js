import { rand, T_BELLY, T_BRATS, T_BRAT_ACT, T_TITS, T_FAT, T_SOFT, T_FAT_ACT, T_JOINTS, T_FLINCH } from '../data/vocabulary.js';

export const generateActionText = (result, action, attacker, defender, isDefResting, actionTarget) => {
    let log = `[${result.text}] `;

    const isAttackerFit = attacker.fetalSize < 4;
    const isAttackerSoft = attacker.fetalSize >= 4 && attacker.fetalSize < 10;
    const isAttackerRuined = attacker.fetalSize >= 10;

    const isDefenderBellyFit = defender && defender.fetalSize < 4;
    const isDefenderBellySoft = defender && defender.fetalSize >= 4 && defender.fetalSize < 10;
    const isDefenderBellyRuined = defender && defender.fetalSize >= 10;

    const isAttackerLean = attacker.voluptuousness < 30;
    const isAttackerPlush = attacker.voluptuousness >= 30 && attacker.voluptuousness < 75;
    const isAttackerFat = attacker.voluptuousness >= 75;

    const isDefenderLean = defender && defender.voluptuousness < 30;
    const isDefenderPlush = defender && defender.voluptuousness >= 30 && defender.voluptuousness < 75;
    const isDefenderFat = defender && defender.voluptuousness >= 75;

    if (action.type === 'move') {
        if (!result.isSuccess) {
            if (isAttackerLean && isAttackerFit) return log + rand([
                `${attacker.name} misjudges her footing on the slick canvas!`,
                `${attacker.name} overextends and slides on the sweat-slick mat!`,
                `${attacker.name} slips on a patch of spilled milk mid-pivot!`
            ]);
            if (isAttackerPlush || isAttackerSoft) return log + rand([
                `${attacker.name}'s heavy, swaying ${rand(T_BELLY)} throws off her balance — the shift grinds weight across her prostate, making her gasp!`,
                `${attacker.name}'s thickened thighs chafe wetly together, ruining her footwork and sending a treacherous jolt of friction through her loins!`,
                `The heavy drag of ${attacker.name}'s pregnant bump and swollen ${rand(T_TITS)} makes her stumble — every jiggle pulses arousal she can't suppress!`
            ]);
            return log + rand([
                `${attacker.name}'s massive, sloshing ${rand(T_BELLY)} anchors her in place — the shifting weight grinds her prostate, forcing a humiliated whimper!`,
                `${attacker.name}'s ${rand(T_JOINTS)} give out under the crushing burden! Her pendulous ${rand(T_TITS)} swing wildly, each bounce aching with sensitivity!`,
                `${attacker.name}'s enormous, heavy ${rand(T_TITS)} drag against her arms, trapping her movement — the friction on her oversensitized body makes her shudder!`,
                `The unbearable heft of ${attacker.name}'s ${rand(T_BELLY)} and pendulous ${rand(T_TITS)} simply won't let her move — she sobs as the burden pins her!`
            ]);
        }
        let direction;
        if (action.id === 'advance') {
            if (isAttackerRuined) direction = rand([
                `waddles forward, her pendulous ${rand(T_TITS)} slapping against her ${rand(T_BELLY)} with every aching step`,
                `shoves her crushing bulk forward, the ${rand(T_BELLY)} swinging — every step grinds fetal weight onto her prostate`,
                `forces herself forward one agonizing step at a time, the burden of her ${rand(T_BELLY)} and heavy ${rand(T_TITS)} nearly unbearable`
            ]);
            else if (isAttackerPlush || isAttackerSoft) direction = rand([
                `pushes forward, her swollen ${rand(T_TITS)} bouncing heavily, each jolt sending unwanted heat through her`,
                'lurches forward, thickened thighs chafing with arousal-spiking friction',
                `forces her heavy, pregnant bulk forward, the ${rand(T_BELLY)} dragging at her core`
            ]);
            else direction = rand([
                'darts inward with lethal speed',
                'explodes forward on powerful, lean legs',
                'surges in with predatory footwork'
            ]);
        } else {
            if (isAttackerRuined) direction = rand([
                `staggers backward, her massive ${rand(T_TITS)} sloshing painfully — the retreat shifts fetal weight across her prostate`,
                `retreats in a panicked waddle, her ${rand(T_BELLY)} and heavy ${rand(T_TITS)} swaying with every lurching step`,
                `drags her crushing bulk backward, whimpering as the pendulous ${rand(T_TITS)} bounce agonizingly`
            ]);
            else if (isAttackerPlush || isAttackerSoft) direction = rand([
                `steps back, her heavy thighs slapping together — the friction makes her clench involuntarily`,
                `retreats, her swollen ${rand(T_TITS)} bouncing with each step, each bounce a humiliating pulse of sensitivity`,
                `backs away, fighting the drag of her pregnant burden and aching, heavy ${rand(T_TITS)}`
            ]);
            else direction = rand([
                'swiftly retreats',
                'snaps back with a clean backstep',
                'disengages with sharp footwork'
            ]);
        }
        return log + `${attacker.name} ${direction}!`;
    }

    if (action.type === 'rest' || action.type === 'restDowned') {
        if (isAttackerLean && isAttackerFit) return log + rand([
            `${attacker.name} resets her stance with disciplined precision — still unburdened, still dangerous.`,
            `${attacker.name} tucks behind a crisp guard, her lean frame still answering her commands perfectly.`,
            `${attacker.name} circles slowly, conserving energy — every lean muscle fiber is primed and waiting.`
        ]);
        if (isAttackerPlush) return log + rand([
            `${attacker.name} braces her thickened thighs apart, panting — even at rest, the swollen weight of her ${rand(T_TITS)} aches with distracting sensitivity.`,
            `${attacker.name} leans against the ropes, letting them take the crushing burden of her pregnant belly — the stillness only makes her aware of her prostate throbbing under the weight.`,
            `${attacker.name} hunches behind her forearms, gasping — her heavy, pendulous ${rand(T_TITS)} drag at her chest even while resting, a constant, aching encumbrance.`
        ]);
        return log + rand([
            `${attacker.name} hoists her massive ${rand(T_BELLY)} with her forearms just to breathe — the shift grinds fetal weight across her prostate, and she whimpers involuntarily.`,
            `${attacker.name} shoves her heavy, pendulous ${rand(T_TITS)} aside just to expand her ribcage — the aching sensitivity of the swollen flesh makes her shudder.`,
            `${attacker.name} wedges her crushing ${rand(T_BELLY)} against the ropes for support — even at rest, the unbearable burden presses constant arousal into her prostate.`,
            `${attacker.name} drops her guard to let her impossibly heavy ${rand(T_TITS)} hang free — the relief from the crushing weight is instant, but the aching sensitivity remains.`,
            `${attacker.name} cradles the enormous weight of her ${rand(T_BELLY)} from below, trembling — the burden never stops, and neither does the grinding pressure on her prostate.`
        ]);
    }
    if (action.type === 'slowRise' || action.type === 'heaveUp') {
        if (isAttackerLean && isAttackerFit) return log + rand([
            `${attacker.name} springs off the mat with elite core strength — still light, still fast!`,
            `${attacker.name} kips up with athletic fury, snapping back to her feet!`,
            `${attacker.name} is up, guard set, unburdened body responding instantly!`
        ]);
        if (isAttackerPlush) return log + rand([
            `${attacker.name} heaves herself up against the crushing drag of her pregnant belly and heavy ${rand(T_TITS)} — the effort shifts the burden across her prostate!`,
            `${attacker.name} rolls onto her thickened haunches, forcing herself upright — her pendulous ${rand(T_TITS)} swing painfully with the motion!`,
            `${attacker.name} hauls herself vertical on the ropes, the unbearable weight of her ${rand(T_BELLY)} and aching ${rand(T_TITS)} fighting her every inch!`
        ]);
        return log + rand([
            `${attacker.name} somehow forces her crushing bulk upright — the massive ${rand(T_BELLY)} shifts, grinding fetal weight across her prostate, and she shudders!`,
            `${attacker.name} swings her enormous ${rand(T_BELLY)} upward, pendulous ${rand(T_TITS)} dragging like anchors — the motion sends aching arousal pulsing through her!`,
            `${attacker.name} drags her crushing, overburdened body off the canvas — her ${rand(T_JOINTS)} grind and her heavy ${rand(T_TITS)} swing with agonizing sensitivity!`,
            `${attacker.name} hooks her arms over the ropes and hauls her massive, burdened bulk vertical — every inch of the rise grinds the ${rand(T_BRATS)} across her prostate!`
        ]);
    }
    if (action.type === 'arousal') {
        if (isAttackerLean && isAttackerFit) return log + rand([
            `${attacker.name} pins ${defender.name} in a dominant clinch, deliberately grinding her hard body against every sensitive point!`,
            `${attacker.name} shoots in low, driving a lean shoulder into ${defender.name}'s hips — humiliating, targeted friction!`,
            `${attacker.name} locks ${defender.name} in a tight clinch, pressing her athletic body against her opponent's aching, sensitive anatomy!`
        ]);
        if (isAttackerPlush) return log + rand([
            `${attacker.name} traps ${defender.name} between her heavy, sensitive thighs — the friction humiliates them both!`,
            `${attacker.name} smothers ${defender.name} in a clinch, her pendulous ${rand(T_TITS)} and heavy belly creating an inescapable prison of hot, aching flesh!`,
            `${attacker.name} pins ${defender.name} against the ropes and grinds her heavy, burdened hips into her — the contact sends arousal spiking through both fighters!`
        ]);
        return log + rand([
            `${attacker.name} forces her crushing, overburdened bulk into ${defender.name}, grinding her massive ${rand(T_BELLY)} and leaking ${rand(T_TITS)} against the trapped fighter!`,
            `${attacker.name} buries ${defender.name} beneath her suffocating weight — heavy, leaking ${rand(T_TITS)} and the crushing mass of her ${rand(T_BELLY)} pin and grind!`,
            `${attacker.name} collapses her entire burdened mass onto ${defender.name}, weaponizing the crushing weight of her ${rand(T_BELLY)} and pendulous ${rand(T_TITS)}!`,
            `${attacker.name} traps ${defender.name} under the full, crushing burden of her pregnant body — the friction of all that oversensitized flesh is devastating!`
        ]);
    }

    if (action.type === 'strike') {
        let punchName = action.name.toLowerCase();
        let motions = [];
        if (isAttackerLean) {
            motions = [
                `{attacker} drives a lightning-fast ${punchName}`,
                `{attacker} snaps a brutal ${punchName}`,
                `{attacker}'s lean muscles coil and release a precise ${punchName}`,
                `{attacker} whips a razor-sharp ${punchName}`,
                `{attacker} fires a punishing ${punchName}`
            ];
        } else if (isAttackerPlush) {
            motions = [
                `Fighting the drag of her heavy ${rand(T_TITS)}, {attacker} throws a ${punchName}`,
                `{attacker}'s heavy hips drag as she swings — her swollen ${rand(T_TITS)} bounce painfully with the ${punchName}`,
                `Gritting her teeth against the encumbering bulk, {attacker} winds up a ${punchName}`,
                `{attacker} rotates her burdened torso, her aching ${rand(T_TITS)} swaying, and throws a ${punchName}`,
                `{attacker} throws a heavy ${punchName}, the motion shifting her ${rand(T_BELLY)} across her prostate`
            ];
        } else {
            motions = [
                `{attacker} forces her crushing bulk into a desperate ${punchName}, her pendulous ${rand(T_TITS)} swinging wildly`,
                `{attacker} shoves one heavy, aching ${rand(T_TITS)} out of the way to throw a ${punchName}`,
                `{attacker} heaves the dead weight of her ${rand(T_BELLY)} forward into a sloppy ${punchName} — the shift grinds her prostate`,
                `{attacker} wrenches her arm through the resistance of her own pendulous ${rand(T_TITS)} to throw a wild ${punchName}`,
                `Sobbing with effort under the crushing burden, {attacker} converts her momentum into a desperate ${punchName}`,
                `{attacker} screams at her own body, forcing a ${punchName} despite the agonizing drag of her ${rand(T_BELLY)} and heavy ${rand(T_TITS)}`
            ];
        }
        let motionStr = rand(motions).replace(/\{attacker\}/g, attacker.name);

        let targets = [];
        if (actionTarget === 'face') {
            targets = [`at {defender}'s jaw`, `toward {defender}'s flushed face`, `at {defender}'s head`, `at {defender}'s chin`, `toward {defender}'s nose`];
        } else if (actionTarget === 'tits') {
            if (isDefenderLean) targets = [`into {defender}'s tender, swelling chest`, `at {defender}'s increasingly sensitive pectorals`, `against the aching buds beneath {defender}'s bra`];
            else if (isDefenderPlush) targets = [`into {defender}'s heavy, aching new ${rand(T_TITS)}`, `against {defender}'s tender, pendulous ${rand(T_TITS)}`, `directly into {defender}'s swollen, painfully sensitive ${rand(T_TITS)}`];
            else targets = [`deep into {defender}'s painfully heavy, pendulous ${rand(T_TITS)}`, `against {defender}'s massive, aching ${rand(T_TITS)}`, `into {defender}'s enormously heavy, leaking ${rand(T_TITS)}`, `squarely into the swollen, aching underside of {defender}'s pendulous ${rand(T_TITS)}`];
        } else if (actionTarget === 'belly') {
            if (isDefenderBellyFit) targets = [`into {defender}'s taut midsection`, `at {defender}'s still-lean core`, `against {defender}'s abs, right where the seed is rooting`];
            else if (isDefenderBellySoft) targets = [`into {defender}'s heavy, pregnant bump`, `against {defender}'s firm, straining belly`, `directly into {defender}'s increasingly burdensome ${rand(T_BELLY)}`];
            else targets = [`into {defender}'s crushing, overstuffed ${rand(T_BELLY)}`, `against the drum-tight skin of {defender}'s massive ${rand(T_BELLY)}`, `deep into {defender}'s enormously heavy ${rand(T_BELLY)}`, `into the lowest, heaviest sag of {defender}'s ${rand(T_BELLY)}`, `against {defender}'s massive ${rand(T_BELLY)}, jolting the ${rand(T_BRATS)} onto her prostate`];
        }
        let targetStr = rand(targets).replace(/\{defender\}/g, defender.name);

        let resolutionStr = "";
        if (!result.isSuccess) {
            if (isAttackerLean && isAttackerFit) {
                resolutionStr = rand([
                    `... but ${defender.name} slips it with elite reflexes!`,
                    `... but ${defender.name} reads it and pivots away!`,
                    `... but ${defender.name} rolls with the punch, neutralizing the impact!`
                ]);
            } else {
                resolutionStr = rand([
                    `... but her cannibalized muscles refuse — the crushing burden has stolen her strength!`,
                    `... but the sheer weight of her ${rand(T_BELLY)} and heavy ${rand(T_TITS)} drags her off balance!`,
                    `... but her heavy thighs trip her up — the friction sends a humiliating jolt of arousal through her!`,
                    `... but her massive ${rand(T_BELLY)} physically blocks her own momentum!`,
                    `... but her pendulous ${rand(T_TITS)} swing into her own arm, blocking the strike — the aching impact makes her gasp!`,
                    `... but her ${rand(T_JOINTS)} ${rand(T_FLINCH)} under the crushing burden, turning the strike into a flail!`
                ]);
            }
        } else if (isDefResting) {
            if (isDefenderLean) {
                resolutionStr = rand([
                    `... but it glances off a crisp guard!`,
                    `... but ${defender.name} catches it on her forearms, barely flinching!`,
                    `... but ${defender.name}'s high guard deflects it cleanly!`
                ]);
            } else {
                resolutionStr = rand([
                    `... but it sinks into ${defender.name}'s thick ${rand(T_FAT)} — the impact just makes her heavy flesh jiggle humiliatingly!`,
                    `... but ${defender.name}'s dense padding absorbs it — the wobble sends a treacherous jolt through her oversensitized body!`,
                    `... but the punch buries itself in ${defender.name}'s ${rand(T_FAT)} and stops dead — the vibration makes her pendulous ${rand(T_TITS)} ache!`,
                    `... but ${defender.name}'s heavy ${rand(T_FAT)} swallows the blow — the ripple through her sensitive flesh makes her shudder!`
                ]);
            }
        } else {
            let impacts = [];
            if (actionTarget === 'face') {
                if (result.id === 'CRIT_SUCCESS') impacts = [`... A devastating connection! ${defender.name}'s hormone-cooked brain scrambles!`, `... A catastrophic blow! ${defender.name} reels, utterly dazed!`, `... ${defender.name}'s eyes roll back as her burdened legs buckle!`];
                else impacts = [`... smacking her solidly!`, `... leaving her dizzy and distracted!`, `... a solid hit that sends sweat flying!`, `... snapping her head sideways!`];
            } else if (actionTarget === 'tits') {
                if (result.id === 'CRIT_SUCCESS') impacts = [`... A catastrophic crush of her heavy, pendulous ${rand(T_TITS)}! Milk erupts as a blinding spike of forced arousal overwhelms her!`, `... The massive, aching ${rand(T_TITS)} compress brutally — the shockwave of pain and involuntary arousal sends ${defender.name} to her knees!`, `... The bloated ${rand(T_TITS)} detonate in a spray of pressurized cream! ${defender.name} screams as forced arousal hijacks her nervous system!`];
                else impacts = [`... the heavy ${rand(T_TITS)} compress painfully, spiking her arousal!`, `... sending an agonizing jolt through her aching, pendulous ${rand(T_TITS)}!`, `... the swollen ${rand(T_TITS)} squirt a humiliating arc of milk — the sensitivity makes her moan!`, `... burying the fist in her heavy, leaking ${rand(T_TITS)} — the pain and arousal are indistinguishable!`];
            } else if (actionTarget === 'belly') {
                if (result.id === 'CRIT_SUCCESS') impacts = [`... A catastrophic blow! The massive ${rand(T_BRATS)} shift violently, grinding onto her prostate — ${defender.name} doubles over in agonized, unwanted arousal!`, `... The heavy ${rand(T_BELLY)} absorbs the force and the ${rand(T_BRATS)} thrash in panic, their weight crushing her prostate!`, `... The blow jolts the ${rand(T_BRATS)} into a frenzy — their ${rand(T_BRAT_ACT)} grinds the crushing fetal mass directly across her prostate!`];
                else impacts = [`... the heavy ${rand(T_BELLY)} sloshes, shifting the crushing weight onto her prostate!`, `... agitating the ${rand(T_BRATS)} — their ${rand(T_BRAT_ACT)} grinds against her from inside!`, `... the ${rand(T_BRATS)} respond with a furious ${rand(T_BRAT_ACT)}, punishing her from within!`, `... the heavy belly sloshes, the burden pulling agonizingly on her spine!`];
            }
            resolutionStr = rand(impacts);
        }

        log += `${motionStr} ${targetStr}${resolutionStr} `;
        return log;
    }
    return log;
};

export const generateStatusReport = (f, isPlayer) => {
    let report = "";
    const p = isPlayer ? {
        abs_tight: "Your abs are still hard — the seed is just a heavy knot in your gut, not yet a burden.",
        belly_med: `Your pregnant belly drags at your core, the growing ${rand(T_BRATS)} heavy enough to grind against your prostate with every step.`,
        belly_high: `Your crushing ${rand(T_BELLY)} is an unbearable burden — the massive ${rand(T_BRATS)} grind your prostate constantly, and you can't stop the involuntary arousal.`,
        fat_low: "Your lean body still answers your commands — no drag, no aching sensitivity.",
        fat_med: `Heavy, sensitive padding has swallowed your core. Your pendulous ${rand(T_TITS)} ache with every bounce, and your thickened thighs chafe with arousal-spiking friction.`,
        fat_high: `You are buried under your own flesh. Your enormous, pendulous ${rand(T_TITS)} drag like anchors, aching with treacherous sensitivity, and every movement grinds arousal into you.`,
        milk_med: `Your swollen ${rand(T_TITS)} throb with backed-up pressure — the aching heaviness sends unwanted warmth to your loins.`,
        milk_high: `Hot colostrum streams constantly from your painfully heavy ${rand(T_TITS)} — every letdown pulse sends arousal straight through you.`,
        strain_med: `Your ${rand(T_JOINTS)} tremble under the growing pregnant burden, forcing a wider, more humiliating stance.`,
        strain_high: `Your ${rand(T_JOINTS)} grind bone-on-bone — the crushing weight demands pure willpower just to stand.`,
        arousal_med: `Pre-cum soaks your thighs — the constant burden grinding your prostate keeps your anatomy throbbing against your will.`,
        arousal_high: `SAVAGE HEAT. Your overburdened body has won — you rut involuntarily, dripping and moaning, unable to stop!`
    } : {
        abs_tight: `${f.name}'s lean torso is still hard and unburdened. The seed hasn't ruined her yet.`,
        belly_med: `Her pregnant belly drags at her posture, the growing ${rand(T_BRATS)} heavy enough to grind against her prostate with every movement.`,
        belly_high: `Her crushing ${rand(T_BELLY)} is an unbearable burden — the ${rand(T_BRATS)}' weight grinds her prostate constantly, keeping her involuntarily aroused.`,
        fat_low: "Her lean fighting frame is still sharp — no encumbering weight, no aching sensitivity.",
        fat_med: `Heavy padding has erased her abs. Her pendulous ${rand(T_TITS)} ache with sensitivity, and her thickened thighs chafe with humiliating friction.`,
        fat_high: `She is buried under her own flesh — enormous, pendulous ${rand(T_TITS)} drag like anchors, and every movement grinds arousal through her oversensitized body.`,
        milk_med: `Her swollen ${rand(T_TITS)} visibly bulge with pressure — the aching weight makes her wince.`,
        milk_high: `Hot cream leaks constantly from her painfully heavy, pendulous ${rand(T_TITS)}, each letdown pulsing arousal through her.`,
        strain_med: `Her ${rand(T_JOINTS)} tremble under the pregnant burden, forcing a wider stance.`,
        strain_high: `Her ${rand(T_JOINTS)} pop and crunch under the crushing weight — sharp agony radiates through her pelvis.`,
        arousal_med: `Pre-cum pours down her thighs — the constant burden on her prostate keeps her anatomy throbbing visibly.`,
        arousal_high: `SAVAGE HEAT. Her overburdened body has won — she ruts involuntarily, moaning and dripping!`
    };

    if (f.fetalSize >= 10) report += p.belly_high + " ";
    else if (f.fetalSize >= 5) report += p.belly_med + " ";
    else report += p.abs_tight + " ";

    if (f.voluptuousness >= 75) report += p.fat_high + " ";
    else if (f.voluptuousness >= 35) report += p.fat_med + " ";
    else report += p.fat_low + " ";

    if (f.strain >= 80) report += p.strain_high + " ";
    else if (f.strain >= 40) report += p.strain_med + " ";

    if (f.inHeat) report += p.arousal_high + " ";
    else if (f.arousal >= 60) report += p.arousal_med + " ";

    if (f.milk >= 70) report += p.milk_high + " ";
    else if (f.milk >= 40) report += p.milk_med + " ";

    return report.trim();
};

export const getPitstopLog = (choice, fighter) => {
    const name = fighter.name;
    switch (choice) {
        case 'feed':
            return rand([
                `${name} forces down the nutrient slop — the calories go straight to her ${rand(T_TITS)} and hips, adding more heavy, aching burden. (+250 HP, +300 Stamina, +3 Fat, +2 Strain)`,
                `${name} gags on the paste. The ${rand(T_BRATS)} redirect the excess into dense ${rand(T_FAT)} on her hips and swelling ${rand(T_TITS)} — heavier, more sensitive, more humiliating. (+250 HP, +300 Stamina, +3 Fat, +2 Strain)`,
                `The calories flood ${name}'s body, but the surplus packs directly into her pendulous ${rand(T_TITS)} and thickening thighs — more encumbering weight, more aching sensitivity. (+250 HP, +300 Stamina, +3 Fat, +2 Strain)`
            ]);
        case 'ring':
            return rand([
                `A handler clamps a steel ring onto ${name}'s throbbing anatomy — the humiliation of needing it burns as much as the pressure. (Orgasm check blocked this turn)`,
                `${name} whimpers as the cold cockring clicks shut, painfully compressing her swollen, twitching meat. The humiliation is total. (Orgasm check blocked this turn)`,
                `The ring snaps tight. ${name} shudders, her backed-up anatomy throbbing against the restraint — a public reminder of how aroused her burdened body keeps her. (Orgasm check blocked this turn)`
            ]);
        case 'pump':
            return rand([
                `The pump latches onto ${name}'s painfully heavy ${rand(T_TITS)} — the relief is immediate but the rhythmic suction sends humiliating arousal straight to her loins. (Milk drained, +200 HP, +15 Arousal)`,
                `${name} groans as the pump drains her aching, pendulous ${rand(T_TITS)} — each pulse of suction sends treacherous waves of heat through her. (Milk drained, +200 HP, +15 Arousal)`,
                `The pump cycles mercilessly, draining ${name}'s heavy, leaking ${rand(T_TITS)} — her toes curl as the rhythmic extraction sparks involuntary arousal. (Milk drained, +200 HP, +15 Arousal)`
            ]);
        case 'bladder':
            return rand([
                `${name} relieves her crushed bladder with a shameful sob — the ${rand(T_BRATS)} shift onto her prostate as the pressure eases, and she shudders. (+200 Stamina)`,
                `${name} empties her pulverized bladder — the relief from the crushing burden is immediate, but the fetal weight settles lower, grinding her prostate. (+200 Stamina)`,
                `${name} sobs with shameful relief as the bladder pressure releases — the ${rand(T_BRATS)} immediately expand into the space, pressing heavier on her prostate. (+200 Stamina)`
            ]);
        default:
            return `${name} rests briefly.`;
    }
};

export const generateRoundTransition = (round, player, enemy) => {
    const avgFetal = (player.fetalSize + enemy.fetalSize) / 2;
    const avgVol = (player.voluptuousness + enemy.voluptuousness) / 2;

    if (round <= 3) {
        return rand([
            `Both fighters are still lean and unburdened. The real weight hasn't found them yet.`,
            `The fighters still look like athletes. The bookmakers know this won't last.`,
            `The canvas is still clean. Both fighters move without the drag of burden or the flush of unwanted arousal. Not for long.`,
            `Both fighters return to their corners breathing clean — no heavy bellies, no aching udders, no involuntary arousal. The seed is patient.`
        ]);
    }

    if (round <= 6) {
        return rand([
            `The burden is becoming visible. ${avgVol > 30 ? "Widening hips, swelling chests, and the first humiliating waddle." : "The fighters are holding shape, but the growing belly-weight is already grinding on their prostates."} The betting boards recalculate.`,
            `${avgFetal > 4 ? "Both fighters waddle noticeably, their heavy bellies and swelling udders dragging at them." : "The fighters move with visible discomfort, the growing burden already triggering involuntary responses they can't hide."}`,
            `The softening has begun — heavier hips, pendulous new udders, and the flushed, humiliated faces of fighters whose bodies are starting to betray them with unwanted arousal.`,
            `Both fighters' bodies are visibly changing — heavier, softer, more encumbered. The real fight — fighter versus the crushing, arousal-inducing burden of her own pregnant body — is only just beginning.`
        ]);
    }

    if (round <= 9) {
        return rand([
            `Both fighters heave themselves up under crushing burdens — waddling, leaking from heavy pendulous udders, visibly aroused by bodies they can no longer control.`,
            `${avgVol > 60 ? "Both fighters barely fit on their stools, their massive, heavy bodies dragging with aching sensitivity." : "The fighters collapse onto their stools, gasping under the burden of swollen bellies and heavy, aching udders."}`,
            `Neither fighter can hide it anymore — the heavy, pendulous udders, the crushing bellies, the flushed faces and visible arousal. The burden has made them into something else entirely.`,
            `The bell rings and neither fighter moves immediately — the crushing weight of their pregnant bellies and heavy, aching udders pins them to their stools.`
        ]);
    }

    // Rounds 10+
    return rand([
        `Both fighters are barely recognizable — massive, burdened, leaking from heavy pendulous udders, visibly aroused and humiliated by bodies that have completely betrayed them.`,
        `Both fighters collapse under their crushing burdens, their enormous bellies and heavy, aching udders making every movement an exercise in involuntary arousal and public humiliation.`,
        `Both fighters sit motionless, their impossibly heavy bellies resting on splayed thighs, their pendulous udders leaking — the burden has won, and the involuntary arousal never stops.`,
        `The betting has shifted from "who wins" to "who climaxes first." Both fighters are so overburdened that the constant prostate grinding and aching udder sensitivity keep them on the edge.`
    ]);
};
