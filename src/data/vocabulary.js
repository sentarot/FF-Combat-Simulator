export const rand = (arr) => arr[Math.floor(Math.random() * arr.length)];

export const T_BELLY = ["broodsac", "breeder-belly", "incubator-paunch", "fluid-balloon", "stretch-drum", "breeding-sack", "brood-tank", "front-loaded distension"];
export const T_BRATS = ["chonks", "piggies", "womb-hogs", "meat-leeches", "slosh-brats", "marrow-suckers", "greedy piglets", "massive brats"];
export const T_BRAT_ACT = ["startle-kick", "panic-thrash", "greed-slosh", "gut-punch", "strip-mine her muscle", "demand-squirm", "hunger-kick"];
export const T_TITS = ["squishtits", "dairy-jugs", "slosh-boulders", "milk-melons", "bloat-bags", "titmeat", "breeder-udders", "heavy liabilities"];
export const T_FAT = ["mommypadding", "breederfat", "fuckmattress", "cellulite-saddle", "thigh-jelly", "hip-slop", "breed-cushion", "heavily grounded base"];
export const T_SOFT = ["skinny-fat", "butter-flesh", "yield-squish", "pillowy-ruin", "doughy", "hyper-estrogenic", "ruined", "softened"];
export const T_FAT_ACT = ["waddle-slap", "tit-smother", "fat-trap", "squish-wedge", "blubber-slap", "adipose-drag"];
export const T_JOINTS = ["balloon-joints", "bloat-tendons", "puff-knuckles", "shudder-twigs", "rubber-knees", "jelly-ankles", "melt-ligaments", "noodle-hips"];
export const T_FLINCH = ["wobble-buckle", "pain-flinch", "joint-give", "lock up", "hyperextend", "snap-buckle", "grind-seize"];

export const FLAVOR_TEXTS = [
  { type: 'flavor', cond: (f) => f.fetalSize < 4 && !f.isDowned, text: "{name} moves with lean, predatory speed — still unburdened, still hers." },
  { type: 'flavor', cond: (f) => f.fetalSize >= 4 && f.fetalSize < 7 && !f.isDowned, text: `The growing ${rand(T_BELLY)} drags at {name}'s core like a sack of wet sand, and every stumble shifts it across her prostate in a way that makes her thighs clench involuntarily.` },
  { type: 'flavor', cond: (f) => f.fetalSize >= 4 && f.fetalSize < 7 && !f.isDowned, text: `A vicious ${rand(T_BRAT_ACT)} from the ${rand(T_BRATS)} jolts {name}'s pelvic floor — she gasps, horrified by the spike of unwanted heat the impact sends through her loins.` },
  { type: 'flavor', cond: (f) => f.fetalSize >= 7 && f.fetalSize < 12, text: `The sheer, crushing burden of {name}'s ${rand(T_BELLY)} forces a humiliating wide-legged waddle, every step grinding fetal weight across her prostate until her eyes water.` },
  { type: 'flavor', cond: (f) => f.fetalSize >= 12 && !f.isDowned, text: `{name}'s grotesque 12-month ${rand(T_BELLY)} hangs so low it brushes her thighs — the constant, unbearable weight pressing her prostate into a state of agonizing, involuntary arousal she can't escape.` },
  { type: 'flavor', cond: (f) => f.fetalSize >= 10 && f.hp > 0, text: `The crushing weight of the ${rand(T_BRATS)} grinds mercilessly against {name}'s prostate — she bites her lip until it bleeds, fighting back humiliating, involuntary whimpers of forced pleasure.` },
  { type: 'flavor', cond: (f) => f.voluptuousness < 25 && !f.isDowned, text: "{name}'s lean, hard physique still answers her commands — no drag, no jiggle, no shameful sensitivity. Not yet." },
  { type: 'flavor', cond: (f) => f.voluptuousness >= 25 && f.voluptuousness < 50 && !f.isDowned, text: `{name}'s thickening ${rand(T_FAT)} chafes with every step, the new sensitivity in her swelling ${rand(T_TITS)} sending treacherous little jolts of arousal she has to grit her teeth to ignore.` },
  { type: 'flavor', cond: (f) => f.voluptuousness >= 50 && f.voluptuousness < 75 && !f.isDowned, text: `{name}'s pendulous, heavy ${rand(T_TITS)} swing painfully with every movement, each bounce sending a humiliating pulse of heat straight to her aching loins.` },
  { type: 'flavor', cond: (f) => f.voluptuousness >= 75 && !f.isDowned, text: `Buried under her own ${rand(T_FAT)}, {name}'s massive, pendulous ${rand(T_TITS)} drag like anchors — and every jiggle of that treacherous softness sends arousal sparking through her oversensitized body.` },
  { type: 'flavor', cond: (f) => f.voluptuousness >= 75 && !f.isDowned, text: `{name}'s enormous, heavy ${rand(T_TITS)} slap wetly against her ${rand(T_BELLY)} with each labored step, the aching weight and shameful sensitivity making her whimper between punches.` },
  { type: 'flavor', cond: (f) => f.strain > 20 && f.strain < 50 && !f.isDowned, text: `{name}'s ${rand(T_JOINTS)} ache under the growing burden, each step a grinding reminder of how much heavier she's become.` },
  { type: 'flavor', cond: (f) => f.strain >= 50 && f.strain < 80 && !f.isDowned, text: `{name}'s ${rand(T_JOINTS)} pop sickeningly under the crushing pregnant weight — the wider stance forced by the pain only exposes her more humiliatingly to the crowd.` },
  { type: 'flavor', cond: (f) => f.strain >= 80 && !f.isDowned, text: `{name}'s pulverized ${rand(T_JOINTS)} ${rand(T_FLINCH)} under the impossible burden — she can barely stand, let alone fight.` },
  { type: 'flavor', cond: (f) => f.milk > 40 && f.milk < 70, text: `{name}'s swollen ${rand(T_TITS)} throb with backed-up pressure, the aching heaviness a constant distraction that sends unwanted warmth pooling between her thighs.` },
  { type: 'flavor', cond: (f) => f.milk >= 70, text: `{name}'s grotesquely engorged ${rand(T_TITS)} leak hot colostrum with every movement — the rhythmic ache of letdown pulses arousal straight into her oversensitized loins.` },
  { type: 'flavor', cond: (f) => f.arousal > 60 && f.arousal < 70 && !f.inHeat, text: `{name}'s thickened thighs involuntarily grind together, the friction on her engorged anatomy making her sob with frustrated arousal she can't stop.` },
  { type: 'flavor', cond: (f) => f.arousal >= 70 && !f.inHeat, text: `{name} furiously wipes drool from her lips — her engorged futa-hog twitches visibly beneath her ${rand(T_FAT)}, utterly indifferent to her willpower.` },
  { type: 'flavor', cond: (f) => f.inHeat, text: `SAVAGE HEAT! {name}'s biology completely overrides her mind, forcing her dripping, congested anatomy to wildly, humiliatingly rut in front of everyone!` },
  { type: 'flavor', cond: (f) => f.stamina < 300, text: `{name}'s arms drop — the crushing weight of her ${rand(T_BELLY)} and pendulous ${rand(T_TITS)} is simply too much, and even breathing shifts the burden across her throbbing prostate.` },
  { type: 'flavor', cond: (f) => f.isDowned && f.fetalSize > 10, text: `Pinned under the crushing mass of her own ${rand(T_BELLY)}, {name} writhes on the mat — the grinding pressure on her prostate forces a humiliating moan she can't suppress.` },
  { type: 'flavor', cond: (f) => f.isDowned && f.fetalSize > 6, text: `{name}'s massive ${rand(T_BELLY)} pins her to the canvas like an anchor — her heavy, pendulous ${rand(T_TITS)} splay to either side, aching and useless.` },
  { type: 'flavor', cond: (f) => f.isDowned && f.voluptuousness >= 40, text: `Splayed on the canvas, {name}'s ${rand(T_FAT)} spreads obscenely — the mat's friction against her oversensitized body sends treacherous sparks of arousal through her.` },

  // Mid-pregnancy flavor (fetalSize 4-7 — critical transition)
  { type: 'flavor', cond: (f) => f.fetalSize >= 4 && f.fetalSize < 7 && !f.isDowned, text: `{name} stumbles on a routine pivot — the unfamiliar weight of the ${rand(T_BELLY)} throws her off, and the shift grinds the mass across her prostate, making her gasp.` },
  { type: 'flavor', cond: (f) => f.fetalSize >= 5 && f.fetalSize < 8 && !f.isDowned, text: `The ${rand(T_BRATS)} are getting heavier by the minute, cannibalizing {name}'s muscle into soft, humiliatingly sensitive new padding on her hips and chest.` },
  { type: 'flavor', cond: (f) => f.fetalSize >= 4 && f.fetalSize < 7 && !f.isDowned, text: `{name}'s waistband splits under the growing ${rand(T_BELLY)} — she adjusts her stance wider, and the shift in weight sends a sickening pulse of prostate pressure through her pelvis.` },

  // High voluptuousness (long-lived late-game state)
  { type: 'flavor', cond: (f) => f.voluptuousness >= 75 && !f.isDowned, text: `{name}'s massive, pendulous ${rand(T_TITS)} and grotesquely wide hips physically won't fit through a normal stance — every forced adjustment rubs her thickened, oversensitized flesh together.` },
  { type: 'flavor', cond: (f) => f.voluptuousness >= 60 && f.voluptuousness < 85 && !f.isDowned, text: `{name}'s heavy thighs clap together with every step — the humiliating jiggle of her ${rand(T_FAT)} and the friction on her engorged anatomy make her whimper involuntarily.` },

  // Arousal flavor
  { type: 'flavor', cond: (f) => f.arousal >= 40 && f.arousal < 60 && !f.inHeat && !f.isDowned, text: `A treacherous warmth pools between {name}'s thick thighs — her engorged anatomy throbs against her will, fed by the constant friction of her heavy, burdened body.` },
  { type: 'flavor', cond: (f) => f.arousal >= 55 && f.arousal < 75 && !f.inHeat && !f.isDowned, text: `{name}'s breath comes in ragged, involuntary gasps — the sheer weight pressing on her prostate and the aching sensitivity of her swollen ${rand(T_TITS)} are winning the war against her willpower.` },

  // Late-game crowd/environmental
  { type: 'flavor', cond: (f) => f.fetalSize >= 8 && f.voluptuousness >= 50 && !f.isDowned, text: `A handler pre-stages the maternity gurney — {name} sees it and her face burns with humiliation, even as her burdened body throbs with unwanted arousal.` },
  { type: 'flavor', cond: (f) => f.voluptuousness >= 65 && f.fetalSize >= 7 && !f.isDowned, text: `{name} waddles under the crushing weight of her ${rand(T_BELLY)} and pendulous, leaking ${rand(T_TITS)}, painfully aware that every spectator can see how aroused her overburdened body has made her.` },

  { type: 'warning', cond: (f) => f.strain >= 65 && f.strain < 85 && !f.isDowned, text: `STRAIN CRITICAL: {name}'s ${rand(T_JOINTS)} buckle under the pregnant burden — the forced wide stance only grinds more weight onto her prostate!` },
  { type: 'warning', cond: (f) => f.voluptuousness >= 65 && f.voluptuousness < 85, text: `BREEDERFAT CRITICAL: {name}'s heavy, pendulous ${rand(T_TITS)} and suffocating ${rand(T_FAT)} are crushing her lungs and keeping her arousal unbearably high!` },
  { type: 'warning', cond: (f) => f.milk >= 60 && f.milk < 80, text: `MILK BLOAT CRITICAL: {name}'s painfully swollen ${rand(T_TITS)} throb with backed-up pressure, each aching pulse draining her health and spiking her arousal!` },
  { type: 'warning', cond: (f) => f.arousal >= 40 && f.arousal < 55 && !f.inHeat, text: `AROUSAL RISING: The burden of {name}'s heavy body is grinding involuntary arousal into her — a humiliating public climax is building!` },
  { type: 'warning', cond: (f) => f.arousal >= 60 && f.arousal < 70 && !f.inHeat, text: `HEAT IMMINENT: {name}'s willpower is cracking — one more spike and her overburdened, arousal-soaked body will hijack her mind completely!` },
  { type: 'warning', cond: (f) => f.fetalSize >= 10 && f.fetalSize < 12 && !f.isDowned, text: `LABOR IMMINENT: The crushing mass of {name}'s macrosomic litters paralyzes her, the unbearable weight grinding constant, involuntary arousal into her prostate!` },

  // EARLY GAME TENSION — fire before degradation kicks in
  { type: 'flavor', cond: (f) => f.fetalSize < 3 && f.voluptuousness < 10 && !f.isDowned, text: `{name} can feel it deep in her gut — the engineered seed burrowing in, the first faint promise of the unbearable weight to come.` },
  { type: 'flavor', cond: (f) => f.fetalSize < 3 && f.voluptuousness < 10 && !f.isDowned, text: `{name}'s body is still perfectly lean and responsive — no burden, no aching sensitivity, no involuntary heat. Not yet.` },
  { type: 'flavor', cond: (f) => f.fetalSize < 2 && f.strain < 10 && !f.isDowned, text: `{name}'s joints still pivot with elite precision — but somewhere in her bloodstream, the relaxin is already preparing to melt them soft.` },
  { type: 'flavor', cond: (f) => f.fetalSize < 3 && !f.isDowned, text: `A faint, sick warmth pulses in {name}'s lower abdomen — the synthetic gametes aggressively implanting, the first whisper of the arousal and burden that will follow.` },
  { type: 'flavor', cond: (f) => f.fetalSize >= 2 && f.fetalSize < 4 && f.voluptuousness < 15 && !f.isDowned, text: `{name} catches her reflection — still lean, but her lower abs are softening and her chest is starting to feel tender and heavy.` },
  { type: 'flavor', cond: (f) => f.fetalSize >= 1 && f.fetalSize < 3 && !f.isDowned, text: `{name} still looks like a killer, but the engineered litter is doubling in mass every few minutes — invisibly building the burden that will break her.` },

  // ENVIRONMENTAL / CROWD — the arena is alive
  { type: 'flavor', cond: (f) => f.fetalSize >= 4 && f.voluptuousness >= 20 && !f.isDowned, text: `The crowd jeers as {name}'s widening hips force a visible waddle — someone throws a nursing bra, and her face burns with shame even as her thighs chafe with unwanted heat.` },
  { type: 'flavor', cond: (f) => f.fetalSize >= 7 && !f.isDowned, text: `{name}'s massive, heavy ${rand(T_BELLY)} glistens under the lights — a visible monument to the unbearable burden grinding her down and keeping her involuntarily aroused.` },
  { type: 'flavor', cond: (f) => f.voluptuousness >= 40 && !f.isDowned, text: `{name}'s ruined, jiggling frame stumbles — the crowd laughs as her pendulous ${rand(T_TITS)} swing humiliatingly, each bounce sending an aching pulse of sensitivity she can't ignore.` },
  { type: 'flavor', cond: (f) => f.fetalSize >= 6 && f.milk >= 30, text: `Warm milk from {name}'s overburdened ${rand(T_TITS)} spatters the canvas — the letdown reflex sends a shameful wave of arousal through her aching body.` },
  { type: 'flavor', cond: (f) => f.voluptuousness >= 50 && f.fetalSize >= 8 && !f.isDowned, text: `{name} gags on the thick air — her own reek of hormones and breast milk surrounds her, a humiliating reminder of what the burden has turned her into.` },
  { type: 'flavor', cond: (f) => f.fetalSize >= 5 && f.strain >= 30, text: `{name} struggles to stay upright under the crushing pregnant weight, her ${rand(T_JOINTS)} trembling as the burden forces her into an increasingly exposed, humiliating stance.` },
  { type: 'flavor', cond: (f) => f.arousal >= 50 && !f.inHeat && !f.isDowned, text: `The cameras zoom in on {name}'s flushed face and the wet bulge straining through her shorts — every spectator can see how aroused her overburdened body has made her.` },
  { type: 'flavor', cond: (f) => f.fetalSize >= 9 && f.voluptuousness >= 60 && !f.isDowned, text: `The overhead display broadcasts {name}'s arousal index to the crowd — public, undeniable proof that the crushing burden of her pregnancy is keeping her involuntarily aroused.` },
  { type: 'flavor', cond: (f) => f.downs >= 1 && f.fetalSize >= 6 && !f.isDowned, text: `Corner crews hose down the milk-streaked canvas beneath {name} — a public reminder of how much her heavy, aching ${rand(T_TITS)} are leaking.` },
  { type: 'flavor', cond: (f) => f.fetalSize >= 3 && f.fetalSize < 6 && !f.isDowned, text: `A bettor squints at the subtle swell beneath {name}'s waistband — the first sign of the burden that will humiliate and arouse her against her will.` },

  // COMPOUND-STAT: Pregnancy + Strain (relaxin-melted joints crushed by fetal weight)
  { type: 'flavor', cond: (f) => f.fetalSize >= 6 && f.strain >= 40 && !f.isDowned, text: `The ${rand(T_BRATS)} have softened {name}'s cartilage with relaxin, then stacked their crushing weight directly on top — every agonizing step grinds fetal mass deeper onto her prostate.` },
  { type: 'flavor', cond: (f) => f.fetalSize >= 7 && f.strain >= 50 && !f.isDowned, text: `{name}'s ${rand(T_JOINTS)} crunch like wet gravel under the crushing fetal burden — the forced wide stance only spreads her hips further, grinding more weight onto her prostate.` },
  { type: 'flavor', cond: (f) => f.fetalSize >= 8 && f.strain >= 60 && !f.isDowned, text: `{name}'s pelvis is being physically spread apart by the fetal mass — the widening stance is involuntary, humiliating, and grinds constant arousal into her from the sheer weight pressing down.` },

  // COMPOUND-STAT: Pregnancy + Arousal (prostate grinding from fetal mass)
  { type: 'flavor', cond: (f) => f.fetalSize >= 7 && f.arousal >= 35 && !f.inHeat && !f.isDowned, text: `The massive ${rand(T_BRATS)} press their combined weight directly onto {name}'s prostate — a constant, grinding, involuntary stimulation that makes her futa-meat twitch and leak no matter how hard she clenches.` },
  { type: 'flavor', cond: (f) => f.fetalSize >= 8 && f.arousal >= 40 && !f.inHeat && !f.isDowned, text: `Every time {name} shifts the crushing burden of her ${rand(T_BELLY)}, the fetal mass rocks across her prostate — her eyes go glassy for a moment before she bites down on her mouthguard to suppress the moan.` },
  { type: 'flavor', cond: (f) => f.fetalSize >= 9 && f.arousal >= 45 && !f.inHeat && !f.isDowned, text: `The ${rand(T_BRATS)} are so massive that their weight creates permanent, grinding pressure on {name}'s prostate — her futa-meat tents her ruined shorts visibly, and every fetal kick jolts unwanted pleasure through her.` },

  // COMPOUND-STAT: Mid-pregnancy downed (fetalSize 4-6)
  { type: 'flavor', cond: (f) => f.isDowned && f.fetalSize >= 4 && f.fetalSize < 7, text: `{name} hits the canvas belly-first — the ${rand(T_BRATS)} slosh sickeningly on impact, and the shifting weight grinds across her prostate, forcing a humiliated whimper she can't suppress.` },
  { type: 'flavor', cond: (f) => f.isDowned && f.fetalSize >= 4 && f.fetalSize < 7, text: `The belly isn't big enough to pin her yet, but it's heavy enough to matter — {name} pushes up and the burden shifts forward, the unfamiliar weight dragging across her prostate mid-rise.` },

  // COMPOUND-STAT: Late pregnancy burden
  { type: 'flavor', cond: (f) => f.fetalSize >= 9 && !f.isDowned, text: `{name}'s belly is so heavy it's translucent — veins and fetal shadows visible through skin stretched to its limits, the unbearable mass grinding constant arousal into her with every micro-movement.` },
  { type: 'flavor', cond: (f) => f.fetalSize >= 10 && !f.isDowned, text: `A fetal elbow drags slowly across {name}'s drum-tight belly — the internal pressure shifts the burden directly onto her prostate, and she shudders with a moan she can't hold back.` }
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

  // Mid degradation — additional
  { cond: (f) => f.fetalSize >= 5 && f.fetalSize < 9 && f.voluptuousness >= 25 && !f.isDowned, text: `"I can hear them... moving inside me... feeding... I HATE them..."` },
  { cond: (f) => f.voluptuousness >= 40 && f.voluptuousness < 70 && !f.isDowned, text: `"My tits are... so heavy... every time they bounce I... nngh... no..."` },
  { cond: (f) => f.fetalSize >= 6 && f.fetalSize < 10 && f.arousal >= 30 && !f.inHeat && !f.isDowned, text: `"The weight is... pressing right on my... every step just... grinds..."` },

  // Late degradation — additional
  { cond: (f) => f.fetalSize >= 9 && f.voluptuousness >= 50 && !f.isDowned, text: `"I used to... run marathons... now I can't... even stand up straight..."` },
  { cond: (f) => f.milk >= 60 && !f.isDowned, text: `"They won't stop... leaking... and every time it... it makes me... feel things..."` },

  // Arousal / heat
  { cond: (f) => f.arousal >= 50 && f.arousal < 70 && !f.inHeat && !f.isDowned, text: `"N-no... not here... not in front of them..."` },
  { cond: (f) => f.arousal >= 60 && !f.inHeat && !f.isDowned, text: `"Stop... looking at me... I can't... concentrate..."` },
  { cond: (f) => f.arousal >= 45 && f.arousal < 65 && !f.inHeat && !f.isDowned, text: `"My body is... betraying me... I can feel it... throbbing... NO..."` },
  { cond: (f) => f.arousal >= 55 && !f.inHeat && !f.isDowned, text: `"If I cum in front of... all these people... I'll... I'll never..."` },

  // Downed
  { cond: (f) => f.isDowned && f.fetalSize < 8, text: `"Get UP. GET UP, you stupid body!"` },
  { cond: (f) => f.isDowned && f.fetalSize >= 8, text: `"I can't... the belly... it's pinning me... NO!"` },
  { cond: (f) => f.isDowned && f.voluptuousness >= 50, text: `"My own fat... is holding me down... this isn't... I'm not this..."` },
  { cond: (f) => f.isDowned && f.fetalSize >= 6, text: `"The mat is... so far down... and getting back up is... impossible... NO. MOVE."` },
  { cond: (f) => f.isDowned && f.strain >= 40, text: `"My knees... I can hear them grinding... just... one... more... time..."` },

  // Pregnancy-internal horror — fetal movement, body hijack, labor dread
  { cond: (f) => f.fetalSize >= 4 && f.fetalSize < 7 && !f.isDowned, text: `"I felt them... MOVE. They're awake in there. They're... aware."` },
  { cond: (f) => f.fetalSize >= 5 && f.fetalSize < 8 && !f.isDowned, text: `"One of them just... kicked my spine. From INSIDE. The little monster is rearranging my organs..."` },
  { cond: (f) => f.fetalSize >= 7 && f.fetalSize < 10 && !f.isDowned, text: `"Stop... MOVING... you greedy... little... parasites... I'm trying to FIGHT..."` },
  { cond: (f) => f.fetalSize >= 7 && f.fetalSize < 10 && !f.isDowned, text: `"I can feel them... feeding. Literally sucking the strength out of my muscles. Every second I get weaker and THEY get bigger."` },
  { cond: (f) => f.fetalSize >= 10 && !f.isDowned, text: `"If I go into labor... in this ring... in front of all of them... no... NO. I won't. I WON'T."` },
  { cond: (f) => f.fetalSize >= 10 && !f.isDowned, text: `"They're pushing... against my cervix... pressing DOWN. The brats want OUT and I'm the only thing stopping them..."` },
  { cond: (f) => f.fetalSize >= 6 && f.arousal >= 40 && !f.inHeat && !f.isDowned, text: `"They're... pressing on my... the weight is grinding right on my... no... not NOW... stop MOVING..."` },
  { cond: (f) => f.milk >= 50 && f.fetalSize >= 5 && !f.isDowned, text: `"My tits are... filling up. For THEM. They're so heavy they... ache... I'm not a cow, I'm a FIGHTER..."` }
];

export const MILESTONE_TEXTS = {
  m4: [
    `{name}'s six-pack visibly surrenders — a firm, unmistakable dome pushes forward, and with it comes the first real weight. She can already feel the burden settling onto her prostate, a faint but undeniable pressure that makes her thighs clench involuntarily.`,
    `{name}'s hand drops to her belly mid-stance as the ${rand(T_BRATS)} shift inside her for the first time. The crowd roars — everyone can see the swell now, and the growing weight is already making her stance feel wrong, her balance uncertain, her lower body treacherously warm.`,
    `Month four. {name}'s abdomen has crossed from 'bloated' to undeniably pregnant — a firm, heavy intrusion she can't flex away. Her chest is tender and starting to swell, and the new weight in her pelvis grinds faintly against her prostate with every step.`,
    `The ${rand(T_BRATS)} have reached critical mass. {name} staggers as the growing burden settles low in her pelvis, and her breasts ache with the first hint of the heavy, pendulous sensitivity that will only get worse. The encumbrance has begun.`
  ],
  m7: [
    `Month seven. {name}'s grotesquely heavy ${rand(T_BELLY)} forces her knees apart into a humiliating wide-legged stance, and the massive ${rand(T_BRATS)} press their combined crushing weight directly onto her prostate. Every waddling step grinds involuntary arousal into her. Her pendulous ${rand(T_TITS)} swing painfully with each movement. She locks her jaw and keeps her fists up.`,
    `{name}'s footwork is simply erased — she waddles now, her ${rand(T_BELLY)} leading every movement like a wrecking ball she can't put down. The ${rand(T_BRATS)} have consumed enough muscle to pad her with heavy, aching ${rand(T_FAT)}, and her massive, pendulous ${rand(T_TITS)} bounce with every tortured step, each jolt sending arousal sparking through her oversensitized body.`,
    `{name}'s body is a factory working against her. The massive fetal weight grinds against her prostate with every step, her heavy, leaking ${rand(T_TITS)} ache constantly, and her thickened thighs chafe with friction that keeps her arousal simmering no matter how hard she fights it.`
  ],
  m10: [
    `The crushing mass of the ${rand(T_BRATS)} has swollen past any natural limit — {name}'s spine is bent under the burden, her ${rand(T_JOINTS)} dissolved by relaxin. Braxton Hicks contractions grind the fetal weight across her prostate every few minutes, forcing humiliating jolts of arousal. Her massive, pendulous ${rand(T_TITS)} leak constantly. She pisses herself when the contractions hit. And still — her fists are up.`,
    `{name} has entered the red zone — the pregnancy so extreme that the crushing fetal mass keeps her in a state of constant, grinding, involuntary arousal. Her ${rand(T_TITS)} are painfully engorged and leaking. Her ${rand(T_JOINTS)} pop with every micro-movement under the unbearable burden. She should not be standing. She is, and she is FURIOUS.`,
    `The ${rand(T_BRATS)} have ballooned so massive that their weight creates permanent, grinding pressure on {name}'s prostate — agonizing semi-arousal she can't suppress. Her enormous, pendulous ${rand(T_TITS)} drag like anchors. Her ${rand(T_JOINTS)} crunch with every step under the crushing burden. And still — STILL — her fists are up.`
  ],
  m12: [
    `Terminal pregnancy. {name}'s ${rand(T_BELLY)} drags her forward like an anchor, the burden so total that real labor contractions now grind the massive fetal weight across her prostate in waves of agonizing, involuntary arousal. Her ${rand(T_TITS)} leak constantly. She is somehow still on her feet, fists raised, tears streaming, DARING the universe to take one more thing.`,
    `{name}'s joints are powder, her muscles cannibalized into thick ${rand(T_FAT)}, and real labor contractions rip through her every ninety seconds — each one grinding the crushing fetal mass onto her prostate, forcing shuddering pulses of unwanted arousal. Her massive, pendulous ${rand(T_TITS)} hang heavy and leaking. She still swings. She still FIGHTS.`,
    `{name}'s body is in active labor — her ${rand(T_BELLY)} hangs so low it brushes the canvas, the unbearable weight keeping her prostate in a state of constant, grinding arousal. Her heavy, aching ${rand(T_TITS)} spray with every contraction. And she just threw a punch.`
  ]
};
