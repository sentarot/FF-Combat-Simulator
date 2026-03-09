export const rand = (arr) => arr[Math.floor(Math.random() * arr.length)];

export const T_BELLY = ["broodsac", "breeder-belly", "incubator-paunch", "fluid-balloon", "stretch-drum", "breeding-sack", "brood-tank", "front-loaded distension"];
export const T_BRATS = ["chonks", "piggies", "womb-hogs", "meat-leeches", "slosh-brats", "marrow-suckers", "greedy piglets", "massive brats"];
export const T_BRAT_ACT = ["startle-kick", "panic-thrash", "greed-slosh", "gut-punch", "strip-mine her muscle"];
export const T_TITS = ["squishtits", "dairy-jugs", "slosh-boulders", "milk-melons", "bloat-bags", "titmeat", "breeder-udders", "heavy liabilities"];
export const T_FAT = ["mommypadding", "breederfat", "fuckmattress", "cellulite-saddle", "thigh-jelly", "hip-slop", "breed-cushion", "heavily grounded base"];
export const T_SOFT = ["skinny-fat", "butter-flesh", "yield-squish", "pillowy-ruin", "doughy", "hyper-estrogenic", "ruined", "softened"];
export const T_FAT_ACT = ["waddle-slap", "tit-smother", "fat-trap", "squish-wedge"];
export const T_JOINTS = ["balloon-joints", "bloat-tendons", "puff-knuckles", "shudder-twigs", "rubber-knees", "jelly-ankles", "melt-ligaments", "noodle-hips"];
export const T_FLINCH = ["wobble-buckle", "pain-flinch", "joint-give", "lock up", "hyperextend"];

export const FLAVOR_TEXTS = [
  { type: 'flavor', cond: (f) => f.fetalSize < 4 && !f.isDowned, text: "Sleek, hard, and toned. {name} moves with pure athletic arrogance, determined to rip her opponent apart before the seed can take root." },
  { type: 'flavor', cond: (f) => f.fetalSize >= 4 && f.fetalSize < 7 && !f.isDowned, text: `{name}'s taut fighting core is ruined by a firm, protruding ${rand(T_BELLY)}. She glares murderously at the crowd as they jeer her expanding shape.` },
  { type: 'flavor', cond: (f) => f.fetalSize >= 4 && f.fetalSize < 7 && !f.isDowned, text: `A vicious ${rand(T_BRAT_ACT)} from the ${rand(T_BRATS)} makes {name} gasp. She angrily tightens her remaining abs, refusing to submit.` },
  { type: 'flavor', cond: (f) => f.fetalSize >= 7 && f.fetalSize < 12, text: `The perverse crowd roars with sick glee, heavily objectifying {name}'s waddling frame. She spits on the mat, furiously trying to stabilize her incredibly heavy, distended ${rand(T_BELLY)}.` },
  { type: 'flavor', cond: (f) => f.fetalSize >= 12 && !f.isDowned, text: `Physically ruined, but mentally furious. {name} grits her teeth in sheer agony, refusing to stop fighting even as her grotesque 12-month ${rand(T_BELLY)} violently stretches her skin to the tearing point.` },
  { type: 'flavor', cond: (f) => f.fetalSize >= 10 && f.hp > 0, text: `The crushing weight of the ${rand(T_BRATS)} grinds mercilessly against {name}'s prostate. She bites her lip until it bleeds, fighting back the humiliating, involuntary whimpers.` },
  { type: 'flavor', cond: (f) => f.voluptuousness < 25 && !f.isDowned, text: "Sweat gleams on {name}'s hard, toned physique. Her low-fat, lean fighting body is a testament to her athletic pride." },
  { type: 'flavor', cond: (f) => f.voluptuousness >= 25 && f.voluptuousness < 50 && !f.isDowned, text: `{name} snarls as her fighting core is erased. Thick, greedy layers of ${rand(T_FAT)} violently gorge her thighs, forcing an embarrassingly plush waddle she desperately tries to correct.` },
  { type: 'flavor', cond: (f) => f.voluptuousness >= 50 && f.voluptuousness < 75 && !f.isDowned, text: `Forced into an extreme, hyper-sexualized hourglass shape, {name} swings wildly, using the sheer, humiliating momentum of her ${rand(T_FAT)} as a weapon of pure spite.` },
  { type: 'flavor', cond: (f) => f.voluptuousness >= 75 && !f.isDowned, text: `Buried alive in her own targeted ${rand(T_FAT)}, {name} refuses to fall. Her body is a dripping fuck-toy, but her mind is still a gladiator's.` },
  { type: 'flavor', cond: (f) => f.voluptuousness >= 75 && !f.isDowned, text: `The absurd, gelatinous bulk of her incredible cellulite-choked thighs and heavily sloshing ${rand(T_TITS)} physically drags her down, but {name} roars, forcing her humiliated broodsow frame to keep fighting.` },
  { type: 'flavor', cond: (f) => f.strain > 20 && f.strain < 50 && !f.isDowned, text: `{name}'s joints ache subtly, but she violently forces her exceptionally meaty, rubenesque hips to follow her footwork.` },
  { type: 'flavor', cond: (f) => f.strain >= 50 && f.strain < 80 && !f.isDowned, text: `Every heavy step causes {name}'s ${rand(T_JOINTS)} to pop. She screams through the pain, punishing her skeleton to keep her massive meat moving.` },
  { type: 'flavor', cond: (f) => f.strain >= 80 && !f.isDowned, text: `A furious, guttural roar tears from {name}'s throat as her pulverized cartilage grinds. She refuses to let her own ${rand(T_JOINTS)} completely ${rand(T_FLINCH)}.` },
  { type: 'flavor', cond: (f) => f.milk > 40 && f.milk < 70, text: `Her overstimulated milk ducts throb painfully. {name} scowls at the hot pressure backing up beneath her areolas.` },
  { type: 'flavor', cond: (f) => f.milk >= 70, text: `Her body is a leaking, desperate dairy-cow, but her spirit is iron. {name} ignores the hot colostrum spraying from her violently engorged ducts, swinging through the agony.` },
  { type: 'flavor', cond: (f) => f.arousal > 60 && f.arousal < 70 && !f.inHeat, text: `Slick with filthy breeding-sweat, {name}'s traitorous ${rand(T_FAT)} involuntarily grind together. She punches her own leg in pure frustration, trying to break the arousal.` },
  { type: 'flavor', cond: (f) => f.arousal >= 70 && !f.inHeat, text: `Her hormone-cooked brain is melting, but {name} fights it! She furiously wipes the thick drool from her lips, ignoring her heavily engorged futa-hog twitching beneath her fat.` },
  { type: 'flavor', cond: (f) => f.inHeat, text: `SAVAGE HEAT! {name}'s mind screams in trapped horror! Her biology completely overrides her willpower, forcing her dripping, congested anatomy to wildly, humiliatingly rut!` },
  { type: 'flavor', cond: (f) => f.stamina < 300, text: `{name}'s doughy, cannibalized arms drop. She gasps for air, desperately ordering her massive, sloshing ${rand(T_BELLY)} to take just one more step.` },
  { type: 'flavor', cond: (f) => f.isDowned && f.fetalSize > 10, text: `Pinned like a stuck turtle under her own ${rand(T_BELLY)}, {name} thrashes violently on the mat, weeping in pure rage as her heavy, dimpled hips refuse to lift.` },

  { type: 'warning', cond: (f) => f.strain >= 65 && f.strain < 85 && !f.isDowned, text: `STRAIN CRITICAL: {name}'s ${rand(T_JOINTS)} buckle! She is trading her skeletal integrity for every punch!` },
  { type: 'warning', cond: (f) => f.voluptuousness >= 65 && f.voluptuousness < 85, text: `BREEDERFAT CRITICAL: {name}'s dense, suffocating padding is actively crushing her lungs, starving her of stamina!` },
  { type: 'warning', cond: (f) => f.milk >= 60 && f.milk < 80, text: `MILK BLOAT CRITICAL: The sheer pressure in {name}'s violently swollen milk ducts is constantly draining her health!` },
  { type: 'warning', cond: (f) => f.arousal >= 40 && f.arousal < 55 && !f.inHeat, text: `AROUSAL RISING: {name}'s loaded balls throb painfully! She is fighting a desperate, losing battle against a humiliating, forced climax!` },
  { type: 'warning', cond: (f) => f.arousal >= 60 && f.arousal < 70 && !f.inHeat, text: `HEAT IMMINENT: {name}'s willpower is cracking! One more spike of lust and her traitorous body will completely hijack her mind into Savage Heat!` },
  { type: 'warning', cond: (f) => f.fetalSize >= 10 && f.fetalSize < 12 && !f.isDowned, text: `LABOR IMMINENT: The gruesome size of {name}'s macrosomic male litters practically paralyzes her, fighting her every desperate movement!` },

  // EARLY GAME TENSION — fire before degradation kicks in
  { type: 'flavor', cond: (f) => f.fetalSize < 3 && f.voluptuousness < 10 && !f.isDowned, text: `{name} can feel it. Deep in her gut, the engineered seed is already dividing, burrowing into her uterine wall. The clock is ticking.` },
  { type: 'flavor', cond: (f) => f.fetalSize < 3 && f.voluptuousness < 10 && !f.isDowned, text: `Every muscle on {name}'s body is still perfectly defined, glistening under the harsh arena lights. Savor it. The hormones haven't found her yet.` },
  { type: 'flavor', cond: (f) => f.fetalSize < 2 && f.strain < 10 && !f.isDowned, text: `{name}'s joints are still razor-sharp, pivoting with elite precision. Somewhere deep in her bloodstream, the relaxin is already seeping into her cartilage.` },
  { type: 'flavor', cond: (f) => f.fetalSize < 3 && !f.isDowned, text: `A faint, sick warmth pulses in {name}'s lower abdomen. The Strain 88.4 synthetic gametes are aggressively implanting, and there is absolutely nothing she can do about it.` },
  { type: 'flavor', cond: (f) => f.fetalSize >= 2 && f.fetalSize < 4 && f.voluptuousness < 15 && !f.isDowned, text: `{name} catches a glimpse of her reflection in the sweaty plexiglass barrier. Still lean. Still lethal. But her lower abs are softening, just barely. The theft has begun.` },
  { type: 'flavor', cond: (f) => f.fetalSize >= 1 && f.fetalSize < 3 && !f.isDowned, text: `The bookmakers haven't adjusted their odds yet. {name} still looks like a killer. But the engineered litter is doubling in mass every few minutes, invisibly eating her from inside.` },

  // ENVIRONMENTAL / CROWD — the arena is alive
  { type: 'flavor', cond: (f) => f.fetalSize >= 4 && f.voluptuousness >= 20 && !f.isDowned, text: `The Underhive crowd erupts in jeering catcalls as {name}'s widening hips force a visible waddle. Someone throws a nursing bra onto the canvas.` },
  { type: 'flavor', cond: (f) => f.fetalSize >= 7 && !f.isDowned, text: `Harsh sodium lights catch the oily sheen of stretched skin across {name}'s massive belly. The arena floor is slick with sweat, milk, and something worse.` },
  { type: 'flavor', cond: (f) => f.voluptuousness >= 40 && !f.isDowned, text: `A roar of sick, objectifying laughter ripples through the stands as {name}'s ruined, jiggling frame stumbles. The betting screens flash wildly — the bookmakers are recalculating in real time.` },
  { type: 'flavor', cond: (f) => f.fetalSize >= 6 && f.milk >= 30, text: `Droplets of warm milk splatter the blood-stained canvas beneath {name}. The arena's drainage grates are already clogged with the fluids of previous fighters.` },
  { type: 'flavor', cond: (f) => f.voluptuousness >= 50 && f.fetalSize >= 8 && !f.isDowned, text: `The stench of hormones, breast milk, and breeding-sweat hangs thick under the arena lights. {name} gags on the humid air, her own body contributing to the reek.` },
  { type: 'flavor', cond: (f) => f.fetalSize >= 5 && f.strain >= 30, text: `A section of the crowd begins rhythmically chanting, pounding the plexiglass barriers as {name} struggles to stay upright. They've seen this before. They know what comes next.` },
  { type: 'flavor', cond: (f) => f.arousal >= 50 && !f.inHeat && !f.isDowned, text: `The arena cameras zoom in on {name}'s flushed, sweating face and the wet, visible bulge straining through her ruined shorts. The audience howls with perverse delight.` },
  { type: 'flavor', cond: (f) => f.fetalSize >= 9 && f.voluptuousness >= 60 && !f.isDowned, text: `The overhead display flashes {name}'s biometrics to the crowd — fetal mass, fat percentage, arousal index. Every stat is a public humiliation, broadcast to thousands of leering spectators.` },
  { type: 'flavor', cond: (f) => f.downs >= 1 && f.fetalSize >= 6 && !f.isDowned, text: `Corner crews hose down {name}'s section of the canvas between exchanges. The pink, milk-streaked runoff pools in the drainage channel. The arena has seen far worse.` },
  { type: 'flavor', cond: (f) => f.fetalSize >= 3 && f.fetalSize < 6 && !f.isDowned, text: `A veteran bettor in the front row leans forward, squinting at the subtle swell beneath {name}'s waistband. He nods slowly and taps his datapad. The smart money is already moving.` }
];

export const ENEMY_BARKS = [
  // Early game — defiant, cocky
  { cond: (f) => f.fetalSize < 4 && f.voluptuousness < 20 && !f.isDowned, text: `"You'll drop before I do, bitch."` },
  { cond: (f) => f.fetalSize < 4 && f.voluptuousness < 20 && !f.isDowned, text: `"Still tight. Still fast. Still me."` },
  { cond: (f) => f.fetalSize < 3 && !f.isDowned, text: `"I've killed bigger fighters than you before the seed even took."` },
  { cond: (f) => f.fetalSize < 4 && f.stamina > 600 && !f.isDowned, text: `"Come closer. I want you to feel this."` },

  // Mid degradation — frustrated, struggling
  { cond: (f) => f.fetalSize >= 4 && f.fetalSize < 8 && !f.isDowned, text: `"These fucking parasites... I can feel them feeding..."` },
  { cond: (f) => f.voluptuousness >= 25 && f.voluptuousness < 60 && !f.isDowned, text: `"My hips won't... stop... swaying..."` },
  { cond: (f) => f.fetalSize >= 5 && f.fetalSize < 9 && !f.isDowned, text: `"This body isn't mine anymore. But my fists still are."` },
  { cond: (f) => f.voluptuousness >= 30 && f.voluptuousness < 65 && !f.isDowned, text: `"I used to be... lean. Fast. I was beautiful. Not like THIS."` },
  { cond: (f) => f.strain >= 30 && f.strain < 65 && !f.isDowned, text: `"My knees are... making sounds. Bad sounds."` },

  // Late degradation — desperate, breaking
  { cond: (f) => f.fetalSize >= 9 && !f.isDowned, text: `"I can't... feel my knees anymore..."` },
  { cond: (f) => f.voluptuousness >= 65 && !f.isDowned, text: `"Just... one more punch. Just... one..."` },
  { cond: (f) => f.fetalSize >= 10 && !f.isDowned, text: `"They're... so heavy... the brats are tearing me apart from inside..."` },
  { cond: (f) => f.strain >= 70 && !f.isDowned, text: `"Everything... grinds. Every step is glass in my joints."` },
  { cond: (f) => f.voluptuousness >= 75 && !f.isDowned, text: `"I'm drowning... in my own fat... I used to be a FIGHTER..."` },

  // Arousal / heat
  { cond: (f) => f.arousal >= 50 && f.arousal < 70 && !f.inHeat && !f.isDowned, text: `"N-no... not here... not in front of them..."` },
  { cond: (f) => f.arousal >= 60 && !f.inHeat && !f.isDowned, text: `"Stop... looking at me... I can't... concentrate..."` },

  // Downed
  { cond: (f) => f.isDowned && f.fetalSize < 8, text: `"Get UP. GET UP, you stupid body!"` },
  { cond: (f) => f.isDowned && f.fetalSize >= 8, text: `"I can't... the belly... it's pinning me... NO!"` },
  { cond: (f) => f.isDowned && f.voluptuousness >= 50, text: `"My own fat... is holding me down... this isn't... I'm not this..."` }
];
