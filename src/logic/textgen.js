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
            if (isAttackerLean && isAttackerFit) return log + `${attacker.name} executes a tactical ${action.name.toLowerCase()}, but misjudges her footing on the slick canvas!`;
            if (isAttackerPlush || isAttackerSoft) return log + rand([
                `${attacker.name} attempts to ${action.name.toLowerCase()}, but her newly voluptuous, incredibly thick hips throw off her balance!`,
                `${attacker.name} violently commands her legs to move, but her highly estrogenic, heavy-bottomed thighs chafe wetly, ruining her footwork!`,
                `The heavy drag of her tight pregnant bump makes ${attacker.name} stumble clumsily! She curses her expanding body!`
            ]);
            return log + rand([
                `${attacker.name} desperately tries to ${action.name.toLowerCase()}, but her ridiculously huge, sloshing ${rand(T_BELLY)} completely anchors her in place!`,
                `Her traitorous ${rand(T_JOINTS)} give out! ${attacker.name} trips over the sheer gelatinous mass of her own incredibly thick, cellulite-choked ${rand(T_FAT)}!`,
                `The agonizing, suffocating heft of her bloated ${rand(T_TITS)} throws her off balance as ${attacker.name} pitifully fails to move! She sobs in frustration!`,
                `She tries to move, but her massive, pudding-like ${rand(T_TITS)} physically ooze against her own biceps, trapping her arms and ruining her momentum!`
            ]);
        }
        const direction = action.id === 'advance' ?
            (isAttackerRuined ? `roars, aggressively waddling her massive, dripping bulk forward, her breasts spilling over her ${rand(T_BELLY)}` : (isAttackerPlush || isAttackerSoft) ? 'forces her plump twin-bump and swaying hips forward' : 'darts inward with lethal speed') :
            (isAttackerRuined ? `clumsily backs away, dragging her deeply dimpled, jiggly frame in a desperate retreat` : (isAttackerPlush || isAttackerSoft) ? 'steps back, her plush thighs slapping wetly together' : 'swiftly retreats');
        return log + `${attacker.name} ${direction}!`;
    }

    if (action.type === 'rest' || action.type === 'restDowned') {
        if (isAttackerLean && isAttackerFit) return log + `${attacker.name} breathes sharply, tightly bracing her washboard abs and resetting her gladiator stance!`;
        if (isAttackerPlush) return log + `${attacker.name} wipes sweat from her plush cleavage, panting heavily as she forces her thick, soft hips to sink into a wide stance.`;
        return log + rand([
            `The exhausted fighter violently hoists her massive, sloshing ${rand(T_BELLY)} up with her forearms, roaring in effort just to take the crushing pressure off her pulverized spine so she can gasp a single breath.`,
            `${attacker.name} groans through gritted teeth, aggressively digging her puffy fingers into her own gelatinous ${rand(T_FAT)} as she begs her crushed lungs for air.`,
            `A furious, sweaty moan escapes her lips as ${attacker.name} literally uses her massive, sloshing ${rand(T_BELLY)} as a fleshy table to rest her doughy arms.`,
            `She violently shoves her heavy, oozing ${rand(T_TITS)} aside, desperately trying to expose her ribcage enough to suck in a ragged breath.`
        ]);
    }
    if (action.type === 'slowRise' || action.type === 'heaveUp') {
        if (isAttackerLean && isAttackerFit) return log + `${attacker.name} uses her elite core strength to spring powerfully off the mat!`;
        if (isAttackerPlush) return log + `Struggling against her new, exceptionally heavy birthing hips, ${attacker.name} furiously manages to heave her deeply plush frame upward!`;
        return log + rand([
            `With an agonized, defiant roar, ${attacker.name} somehow forces her incredibly heavy, dimpled ${rand(T_FAT)} to defy gravity!`,
            `${attacker.name} violently swings her massive, sloshing belly upward, fighting desperately against her own deep, anchor-like adipose tissue!`,
            `Her pulverized cartilage grinds loudly as ${attacker.name} manages to heave her dripping, hyper-fertile, immensely fat frame off the canvas, refusing to submit!`
        ]);
    }
    if (action.type === 'arousal') {
        if (isAttackerLean && isAttackerFit) return log + `${attacker.name} executes a flawless takedown, forcing her hard, toned futa-body against ${defender.name} in a dominant pin!`;
        if (isAttackerPlush) return log + `${attacker.name} traps her opponent, using her extremely dense, highly estrogenic thighs to create intense, humiliating friction!`;
        return log + rand([
            `${attacker.name} weaponizes her ruination! She forces her massive, gelatinous, heavy-bottomed curves into ${defender.name}, grinding her dripping breeder-loins mercilessly!`,
            `A desperate, overwhelmingly lewd smothering! ${attacker.name} aggressively buries her opponent beneath a suffocating, oozing mountain of leaking milk and hot broodsow ${rand(T_FAT)}!`,
            `Fighting through the haze of lust, ${attacker.name} traps ${defender.name} in an obscene pile of deep, grab-able hip-meat and violently rubs her engorged futa-hog against the squish!`
        ]);
    }

    if (action.type === 'strike') {
        let punchName = action.name.toLowerCase();
        let motions = [];
        if (isAttackerLean) {
            motions = [
                `Pivoting on lean hips, {attacker} drives a lightning-fast ${punchName}`,
                `Using her peak athletic conditioning, {attacker} snaps a brutal ${punchName}`,
                `{attacker}'s hard, toned muscles coil and release, launching a precise ${punchName}`
            ];
        } else if (isAttackerPlush) {
            motions = [
                `Leaning into her hyper-curvy, heavily padded mommy-bod, {attacker} throws a heavy ${punchName}`,
                `Weaponizing her ridiculously wide, heavy-bottomed birthing hips, {attacker} hurls a fleshy ${punchName}`,
                `{attacker}'s extremely thick, rubenesque hips drag slightly as she swings a plush, sweaty ${punchName}`
            ];
        } else {
            motions = [
                `Roaring in absolute defiance, {attacker} forces her incredibly fat, gelatinous broodsow bulk forward into a desperate ${punchName}`,
                `Screaming in frustration, {attacker} commands her completely cannibalized, doughy arms to throw a pathetic ${punchName}`,
                `Gritting her teeth against the agonizing heft of her bloated ${rand(T_TITS)}, {attacker} violently throws her ruined pornbody into a frantic ${punchName}`,
                `Awkwardly cupping one fat, pudding-like udder out of her way, {attacker} desperately throws a wide, flabby ${punchName}`
            ];
        }
        let motionStr = rand(motions).replace(/\{attacker\}/g, attacker.name);

        let targets = [];
        if (actionTarget === 'face') {
            targets = [`directly at {defender}'s jaw`, `toward {defender}'s sweaty, flushed face`, `at the side of {defender}'s head`];
        } else if (actionTarget === 'tits') {
            if (isDefenderLean) targets = [`into {defender}'s firm pectorals`, `at {defender}'s aching, hormone-injected chest`];
            else if (isDefenderPlush) targets = [`into {defender}'s rapidly swelling, heavily padded cleavage`, `against {defender}'s tender, jiggling new assets`];
            else targets = [`deep into {defender}'s painfully distended, highly estrogenic ${rand(T_TITS)}`, `against {defender}'s absurdly massive, bouncing hucow ${rand(T_TITS)}`, `directly into {defender}'s incredibly heavy, oozing milkers`];
        } else if (actionTarget === 'belly') {
            if (isDefenderBellyFit) targets = [`into {defender}'s taut, muscular midsection`, `at {defender}'s hard, flat stomach`];
            else if (isDefenderBellySoft) targets = [`against {defender}'s high, tight pregnant belly`, `into {defender}'s firm, distinctly pregnant bump`];
            else targets = [`directly into {defender}'s ridiculously overstuffed, sloshing ${rand(T_BELLY)}`, `against the drum-tight, oily, vein-streaked skin of {defender}'s overdue 12-month belly`, `deep into the extremely heavy, bulging broodsow uterus of {defender}`];
        }
        let targetStr = rand(targets).replace(/\{defender\}/g, defender.name);

        let resolutionStr = "";
        if (!result.isSuccess) {
            if (isAttackerLean && isAttackerFit) {
                resolutionStr = `... but ${defender.name} flawlessly slips the strike with elite reflexes!`;
            } else {
                resolutionStr = rand([
                    `... but her traitorous, cannibalized muscles outright refuse the command, turning the fierce strike into a pathetic whiff!`,
                    `... but the sheer, gravity-warping weight of her own heavy estrogenic fat violently drags her off balance!`,
                    `... but her incredibly thick, cellulite-choked thighs aggressively trip her up. She sobs in rage as her ${rand(T_JOINTS)} ${rand(T_FLINCH)}!`,
                    `... but her massive ${rand(T_BELLY)} physically blocks her own momentum, ruining the blow entirely in a sweaty, frustrating mess!`,
                    `... but her oozing ${rand(T_TITS)} ${rand(T_FAT_ACT)} heavily against her own skinny-fat bicep, physically blocking the swing mid-air!`
                ]);
            }
        } else if (isDefResting) {
            if (isDefenderLean) {
                resolutionStr = `... but it glances harmlessly off a crisp, professional guard!`;
            } else {
                resolutionStr = rand([
                    `... but it sinks uselessly into a deep, humiliating sea of highly estrogenic hip-meat! The dense ${rand(T_FAT)} swallows the impact entirely!`,
                    `... but ${defender.name}'s incredibly thick, grabbing ${rand(T_FAT)} absorbs the shock like a giant, squishy sponge!`,
                    `... but the heavy, gelatinous layer of shameful breederfat neutralizes the impact, making her massive thighs jiggle violently but safely!`
                ]);
            }
        } else {
            let impacts = [];
            if (actionTarget === 'face') {
                if (result.id === 'CRIT_SUCCESS') impacts = [`... A devastating, bone-rattling connection! ${defender.name}'s hormone-cooked brain is totally scrambled!`, `... A catastrophic blow that nearly snaps her neck!`, `... The brutal impact leaves ${defender.name} completely dazed, drooling, and reeling!`, `... She connects perfectly! The sheer mass behind the strike violently rocks ${defender.name}!`];
                else impacts = [`... smacking her solidly!`, `... leaving her dizzy and highly distracted!`, `... clattering heavily against her skull!`, `... A solid, wet hit that sends sweat flying!`];
            } else if (actionTarget === 'tits') {
                if (result.id === 'CRIT_SUCCESS') impacts = [`... A catastrophic crush of her hucow anatomy! Hot milk violently erupts as a blinding spike of pure, desperate arousal completely melts her mind!`, `... The heavy slosh balloons are brutally compressed, sending a massive shockwave of leaking cream and agonizing heat directly to her flooded loins!`, `... A devastating impact! The squishy ${rand(T_TITS)} practically bursts, overloading the broodsow with desperate, dripping lust!`];
                else impacts = [`... violently splashing hot colostrum all over the canvas!`, `... making the massive ${rand(T_TITS)} jiggle agonizingly, severely spiking her heat!`, `... sending a painful, deeply arousing jolt through the tender, bloated udders!`, `... completely burying the fist in soft, leaking milky squish!`];
            } else if (actionTarget === 'belly') {
                if (result.id === 'CRIT_SUCCESS') impacts = [`... It's a catastrophic, deep-sinking blow! The massive, macrosomic litter shifts violently, pulverizing her ruined pelvis and sending the greedy ${rand(T_BRATS)} into an absolute frenzy!`, `... A deeply humiliating, devastating impact! The drum-tight ${rand(T_BELLY)} absorbs the massive force, causing the demanding male brats inside to panic-thrash wildly!`, `... The heavy, sloshing ${rand(T_BELLY)} is brutally compressed! The highly agitated engineered litters aggressively demand immediate caloric sacrifice!`];
                else impacts = [`... sending a violent, sickening ripple through the heavy amniotic fluid!`, `... a wet, echoing smack that deeply agitates the testy ${rand(T_BRATS)}!`, `... mercilessly mashing into the bulging uterus and startling the greedy ${rand(T_BRATS)}!`, `... causing the heavy belly to slosh and pull agonizingly on her ruined spine!`];
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
        abs_tight: "You feel your hard abs tighten and flex. The implanted seed is just a heavy knot deep in your gut.",
        belly_med: `Your firm, distinctly pregnant belly bulges outward, ruining your center of mass. The growing ${rand(T_BRATS)} slosh uncomfortably inside you.`,
        belly_high: `Your brutally distended belly lurches with heavy, impatient life, practically tearing your skin. The massive ${rand(T_BRATS)} mercilessly crowd your lungs and crush your bladder.`,
        fat_low: "Your lean, athletic muscle remains fully intact, ready to strike.",
        fat_med: `Thick, squishy padding has swallowed your core. Your new, highly estrogenic hips sway heavily, forcing a humiliating waddle.`,
        fat_high: `Total adipose surrender. You are buried in your own ruined flesh. Deep, dimpled ${rand(T_FAT)} anchors your waddling thighs to the mat, and permanent, heavy ${rand(T_TITS)} smother your chest.`,
        milk_med: `Your swollen milk ducts throb and ache with pressurized fluid beneath the skin.`,
        milk_high: `Hot colostrum constantly streams from your painfully engorged, violently leaking teats.`,
        strain_med: `Trapped fluid bloats your ankles, while relaxin makes your knees feel terrifyingly loose and wobbly.`,
        strain_high: `Your pulverized cartilage grinds bone-on-bone. The sheer agony in your chemically melted ${rand(T_JOINTS)} demands pure willpower just to remain standing.`,
        arousal_med: `Slick, musky pre-cum heavily soaks your thighs as your congested futa-meat throbs against your will.`,
        arousal_high: `SAVAGE HEAT. Your preggo-brain is completely cooked by lust. Thick drool hangs from your lips as your heavy hips involuntarily rut the empty air!`
    } : {
        abs_tight: `Tight skin stretches over ${f.name}'s hard, lean torso. The seed hasn't ruined her yet.`,
        belly_med: `Her firm, protruding belly pulls her athletic posture out of alignment, the growing ${rand(T_BRATS)} visibly shifting inside her.`,
        belly_high: `Her brutally distended belly lurches with heavy, impatient life. The sheer weight of the ${rand(T_BRATS)} forces her into a desperate, wide-legged stance.`,
        fat_low: "Her low-fat, highly lethal fighting frame remains sharp and uncompromised.",
        fat_med: `Squishy padding has erased her abs, and her thick, rubenesque hips drag with a humiliating, estrogenic heaviness.`,
        fat_high: `Total adipose surrender. She is an immobile mountain of jiggly broodsow meat. The utterly unfair weight drags heavily on her deep, dimpled ${rand(T_FAT)}.`,
        milk_med: `Her swollen milk ducts visibly bulge, the pressure making her wince with every movement.`,
        milk_high: `Thick, hot cream constantly leaks from her painfully engorged teats, splashing down her sweaty belly.`,
        strain_med: `Edema visibly puffs her ankles, and her knees tremble unsteadily under her shifting weight.`,
        strain_high: `Her ${rand(T_JOINTS)} pop and crunch sickeningly. Sharp agony radiates through her completely pulverized pelvis.`,
        arousal_med: `Thick pre-cum pours down her thighs. Her heavy, engorged futa-hog violently throbs through her soaked shorts.`,
        arousal_high: `SAVAGE HEAT. Her preggo-brain is fried. She moans like a feral animal, her dripping hips involuntarily rutting the air!`
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
                `${name} desperately inhales the greasy caloric slop, feeling the thick nutrients flow to her aching muscles... and straight to her widening hips. (+250 HP, +300 Stamina, +3 Fat, +2 Strain)`,
                `Gagging on the foul hucow nutrient paste, ${name} forces it down. The calories flood her depleted body, but the ${rand(T_BRATS)} greedily redirect the excess into dense, squishy ${rand(T_FAT)}. (+250 HP, +300 Stamina, +3 Fat, +2 Strain)`,
                `${name} wolfs down the disgusting slop. Her body immediately begins packing the surplus calories into her ${rand(T_TITS)} and thighs. (+250 HP, +300 Stamina, +3 Fat, +2 Strain)`
            ]);
        case 'ring':
            return rand([
                `A handler roughly clamps a tight steel ring around ${name}'s violently throbbing, backed-up anatomy. The agonizing pressure suppresses the urge to climax... for now. (Orgasm check blocked this turn)`,
                `${name} bites back a humiliated whimper as the cold cockring clicks shut, painfully compressing her swollen, desperately twitching meat. (Orgasm check blocked this turn)`
            ]);
        case 'pump':
            return rand([
                `The industrial breast pump latches onto ${name}'s painfully engorged ${rand(T_TITS)} with a harsh vacuum seal. Thick, warm cream is violently extracted, leaving her gasping and deeply aroused. (Milk drained, +200 HP, +15 Arousal)`,
                `${name} groans as the pump aggressively drains her swollen, aching ${rand(T_TITS)}. The relief is immediate but the rhythmic suction sends humiliating waves of heat straight to her loins. (Milk drained, +200 HP, +15 Arousal)`
            ]);
        case 'bladder':
            return rand([
                `${name} finally relieves her agonizingly crushed bladder, sobbing quietly as the immense pressure on her pelvic floor eases. The ${rand(T_BRATS)} shift slightly, granting a moment of blessed relief. (+200 Stamina)`,
                `With a desperate, shuddering gasp, ${name} empties her pulverized bladder. The relief from the crushing downward pressure of her massive ${rand(T_BELLY)} is immediate. (+200 Stamina)`
            ]);
        default:
            return `${name} rests briefly.`;
    }
};
