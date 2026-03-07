import { rand, T_BRATS } from '../../data/vocabulary.js';

const MenuScreen = ({ onStart }) => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center max-w-4xl mx-auto w-full p-2 md:p-4 z-10">
      <div className="w-full bg-neutral-950 border-2 border-red-900/40 rounded-lg p-5 md:p-8 shadow-[0_0_25px_rgba(220,38,38,0.1)] text-left font-mono relative overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,0,0,0.03)_1px,transparent_1px)] bg-[length:100%_4px] pointer-events-none"></div>

          <h2 className="text-xl md:text-3xl font-black text-red-600 mb-6 border-b border-red-900/50 pb-3 tracking-widest uppercase flex items-center relative z-10">
              <span className="inline-block w-3 h-3 bg-red-600 rounded-full animate-pulse mr-3"></span>
              Medical Dossier: Subject Degradation Protocols
          </h2>

          <div className="mb-6 relative z-10">
      <h3 className="text-red-400 font-bold mb-2 uppercase text-xs md:text-sm tracking-wider bg-red-900/20 inline-block px-2 py-1 border border-red-900/30">{'>>'} Administered Injection Load</h3>
      <ul className="list-disc list-inside text-gray-400 text-xs md:text-sm space-y-3 pl-2 md:pl-4 mt-3">
          <li><span className="text-red-300 font-bold">Synthetic Male Gametes (Strain 88.4):</span> Artificially inseminated via pre-match catheterization. Genetically engineered for hyper-motility and immediate, aggressive implantation upon initial physical exertion. Formulated to rapidly gestate demanding, macrosomic male subjects.</li>
          <li><span className="text-red-300 font-bold">Trauma-Linked Gestation Accelerant:</span> A proprietary biochemical agent that binds fetal development directly to adrenaline spikes and localized abdominal trauma. Every physical blow suffered by the host mathematically advances the pregnancy by a factor of months.</li>
          <li><span className="text-red-300 font-bold">Hucow-Variant Prolactin Stimulant:</span> A brutal glandular override targeting the host's firm pectoral tissue. It forcibly initiates extreme lactation, aggressively expanding the mammary glands to painful proportions to ensure a constant supply of highly caloric colostrum.</li>
          <li><span className="text-red-300 font-bold">Metabolic Cannibalization Catalyst:</span> A specialized hormone trigger designed to prioritize fetal safety over host mobility. It actively dissolves the host's high-density athletic muscle mass, metabolizing it to fuel rapid fetal growth and dumping the excess calories into dense, heavy, highly estrogenic fat deposits strictly distributed to the host's hips, thighs, and breasts.</li>
      </ul>
  </div>

  <div className="mb-6 relative z-10 bg-black/40 p-4 border border-red-900/20 rounded">
              <h3 className="text-red-400 font-bold mb-3 uppercase text-xs md:text-sm tracking-wider bg-red-900/20 inline-block px-2 py-1 border border-red-900/30">{'>>'} Projected Biological Humiliation (Mechanics)</h3>
              <div className="space-y-4 text-xs md:text-sm text-gray-400 leading-relaxed">
                  <p><strong className="text-fuchsia-500 tracking-wider">FETAL SIZE (The Parasites):</strong> "Welcome to mommyhood. The grueling weight of those macrosomic boy fetuses is going to completely ruin your center of gravity, heavily penalizing your strikes and movement. And the best part? All that weight bears down directly on your prostate, putting constant, agonizing pelvic pressure on your involuntarily force-erected futa-meat. Let's see how well you fight when you're heavily pregnant and painfully hard."</p>

                  <p><strong className="text-pink-500 tracking-wider">VOLUPTUOUSNESS (Breederfat):</strong> "Say goodbye to those abs, sweetheart. To protect the boys, your body is going to panic and pack on thick, dense squish in the most degrading places. The hormones force an extreme, obscenely sexual hourglass shape—bloating your tits to massive proportions and packing hefty, dimpled meat onto your wide birthing hips and plush thighs. This suffocating padding permanently spikes your stamina exertion and ruins your ability to catch your breath—though it does act as fleshy armor against blunt force."</p>

                  <p><strong className="text-yellow-500 tracking-wider">STRAIN (Joint Pulverization):</strong> "Your skeleton isn't built for mommyhood. The massive, rapid weight gain is going to crush your joints. High strain destroys your ability to hold a defensive guard, drastically lowers your knockdown threshold, and causes excruciating recoil damage to your own knees when your clumsy punches miss."</p>

                  <p><strong className="text-gray-300 tracking-wider">MILK BLOAT (Slosh Balloons):</strong> "Your firm pectorals are going to swell into painfully heavy, sloshing balloons. You studs are going to be leaking warm cream all over the canvas. The sheer discomfort, bloating, and stamina loss of hefting and jostling your own drooling milkers penalizes all striking momentum, and constantly drains your health. Oh, and all that sloshing friction is highly prone to causing involuntary arousal."</p>

                  <p><strong className="text-red-500 tracking-wider">AROUSAL (The Edging Threat):</strong> "Keep your hands to yourself... or don't. We love watching you squirm. Hitting 70 Arousal melts your preggo-brain into <span className="text-purple-400 font-bold">SAVAGE HEAT</span>, forcing you to lose control and rut. And if you break and climax? The violent spasming in your core actively agitates your fetuses for massive growth, on top of the painful, humiliating intensity of emptying your desperately backed-up balls right into your shorts."</p>
              </div>
          </div>

          <div className="mb-6 relative z-10">
              <h3 className="text-green-500 font-bold mb-2 uppercase text-xs md:text-sm tracking-wider bg-green-900/20 inline-block px-2 py-1 border border-green-900/30">{'>>'} Nurse's Survival 'Tips'</h3>
              <ul className="list-square list-inside text-gray-400 text-xs md:text-sm space-y-2 pl-2 md:pl-4 mt-2">
                  <li><strong className="text-green-400">TACTICS:</strong> "Manage your distance. Jabs and Straights are for Long/Medium Range. Hooks at Medium. Uppercuts and Grapples at Close. Not that your heavy-bottomed body will let you move gracefully for long."</li>
                  <li><strong className="text-green-400">TARGETING:</strong> "Face for damage, Tits to spike their milk and heat, Belly to drain their stamina and agitate the boys. Punch an overdue belly hard enough, and she might just wet herself in front of everyone."</li>
                  <li><strong className="text-purple-400">DEFIANCE (WILLPOWER):</strong> "When your ruined body forces a knockdown, climax, or heat, use your Willpower to aggressively interrupt and override it. Restore Willpower by using a Tight Guard."</li>
              </ul>
          </div>

          <div className="text-center mt-6 border-t border-red-900/50 pt-6 relative z-10">
              <button
                onClick={onStart}
                className="px-6 md:px-10 py-3 md:py-4 bg-red-900/20 hover:bg-red-800/40 border border-red-600 text-red-500 hover:text-white font-black uppercase tracking-widest transition-all rounded shadow-[0_0_15px_rgba(220,38,38,0.2)] hover:shadow-[0_0_25px_rgba(220,38,38,0.5)]"
              >
                [ Acknowledge & Initiate Match ]
              </button>
          </div>
      </div>
    </div>
  );
};

export default MenuScreen;
