import { rand, T_BELLY, T_BRATS, T_FAT, T_TITS, T_JOINTS } from '../../data/vocabulary.js';

const GameOverScreen = ({ gameState, onEpilogueChoice, onRestart }) => {
  return (
    <div className="text-center py-4 bg-black/60 border border-gray-800 rounded p-6 shadow-2xl max-w-4xl mx-auto">
      <h2 className={`text-2xl md:text-3xl font-black uppercase tracking-widest mb-6 border-b border-gray-700 pb-4 ${gameState.winner === 'player' ? 'text-pink-500' : gameState.winner === 'enemy' ? 'text-red-500' : 'text-gray-400'}`}>
        {gameState.winner === 'draw' ? 'DRAW: MUTUAL RUINATION' : gameState.winner === 'player' ? 'VICTORY: HOLLOW SURVIVAL' : 'DEFEAT: TOTAL SURRENDER'}
      </h2>

      {!gameState.epilogueStep ? (
          <div className="text-sm md:text-base text-gray-300 mb-8 space-y-4 px-4 text-left">
              {gameState.winner === 'player' && (
                  <>
                      <p>You stand over her unconscious frame. Sweat slicks your heavy, dimpled {rand(T_FAT)}. Suddenly, a brutal contraction rips through your distended 12-month {rand(T_BELLY)}. The macrosomic litter is dropping.</p>
                      <p>Futanari given the Strain 88.4 load suffer penile birth. The massive {rand(T_BRATS)} will violently force their way through your congested anatomy. However, your victory means you have enough prize credits to pay the arena medics for a C-section.</p>
                      <div className="flex flex-col gap-4 mt-6">
                          <button onClick={() => onEpilogueChoice('win_csection')} className="p-4 bg-gray-800 hover:bg-gray-700 border border-gray-600 rounded text-white font-bold transition-all text-left">
                              {'>> '}Pay the medics for a C-Section and save your anatomy.
                          </button>
                          <button onClick={() => onEpilogueChoice('win_natural')} className="p-4 bg-red-900/40 hover:bg-red-800/60 border border-red-700 rounded text-white font-bold transition-all text-left">
                              {'>> '}Keep the credits. Birth them the way nature intended.
                          </button>
                      </div>
                  </>
              )}
              {gameState.winner === 'enemy' && (
                  <>
                      <p>Your fluid-logged knees buckle. You collapse under the sheer weight of your deep, dimpled {rand(T_FAT)}. You are officially corporate property.</p>
                      <p>A violent contraction seizes your drum-tight belly. The macrosomic litter is dropping. You have zero credits to your name. The massive brats are going to violently stretch their way out through your congested anatomy in an agonizing penile birth.</p>
                      <div className="flex flex-col gap-4 mt-6">
                          <button onClick={() => onEpilogueChoice('lose_beg')} className="p-4 bg-gray-800 hover:bg-gray-700 border border-gray-600 rounded text-white font-bold transition-all text-left">
                              {'>> '}Beg the approaching handlers for a C-Section.
                          </button>
                          <button onClick={() => onEpilogueChoice('lose_submit')} className="p-4 bg-red-900/40 hover:bg-red-800/60 border border-red-700 rounded text-white font-bold transition-all text-left">
                              {'>> '}Submit silently to the canvas and spread your heavy thighs.
                          </button>
                      </div>
                  </>
              )}
              {gameState.winner === 'draw' && (
                  <>
                      <p>The final bell shrieks. Neither of you fell to strikes—your {rand(T_JOINTS)} simply gave out. You both lay gasping on the canvas, your massive, drum-tight bellies shifting violently as the engineered litters drop into your pelvises.</p>
                      <p>You have a fraction of the prize credits. Not enough for a C-section without selling yourself into a permanent corporate breeding contract. Otherwise, you face the agony of penile birth right here on the bloody mat.</p>
                      <div className="flex flex-col gap-4 mt-6">
                          <button onClick={() => onEpilogueChoice('draw_contract')} className="p-4 bg-gray-800 hover:bg-gray-700 border border-gray-600 rounded text-white font-bold transition-all text-left">
                              {'>> '}Sign the debt contract for the C-Section.
                          </button>
                          <button onClick={() => onEpilogueChoice('draw_canvas')} className="p-4 bg-red-900/40 hover:bg-red-800/60 border border-red-700 rounded text-white font-bold transition-all text-left">
                              {'>> '}Refuse the debt. Endure the penile birth alongside your rival.
                          </button>
                      </div>
                  </>
              )}
          </div>
      ) : (
          <div className="text-sm md:text-base text-gray-300 mb-8 space-y-4 px-4 text-left">
              {gameState.epilogueStep === 'win_csection' && (
                  <>
                      <p>The medics slice open your taut, oiled {rand(T_BELLY)}, extracting the massive triplets. Your anatomy is saved, and your heavy breederfat is stitched back together. You still have a massive pile of leftover credits.</p>
                      <p>However, your deeply altered endocrine system is screaming. The empty ache in your heavy womb is driving you completely mad. You are biochemically addicted to extreme pregnancy.</p>
                      <div className="flex flex-col gap-4 mt-6">
                          <button onClick={() => onEpilogueChoice('win_csection_cleanse')} className="p-4 bg-gray-800 hover:bg-gray-700 border border-gray-600 rounded text-white font-bold transition-all text-left">
                              {'>> '}Spend the remaining credits on a total hormonal cleanse.
                          </button>
                          <button onClick={() => onEpilogueChoice('win_csection_escort')} className="p-4 bg-pink-900/40 hover:bg-pink-800/60 border border-pink-700 rounded text-white font-bold transition-all text-left">
                              {'>> '}Keep the credits. Purchase a penthouse and become a high-end surrogate.
                          </button>
                      </div>
                  </>
              )}

              {gameState.epilogueStep === 'win_csection_cleanse' && (
                  <>
                      <p>You pump the expensive cleanse through your veins. The agonizing craving slowly fades. Over the next year, you meticulously train the heavy {rand(T_FAT)} off your hips, shrinking your bloated milkers back into hard pectorals.</p>
                      <p>You step back into the Underhive streets a wealthy, lethal warrior. You survived the pits and reclaimed your body.</p>
                  </>
              )}
              {gameState.epilogueStep === 'win_csection_escort' && (
                  <>
                      <p>You accept the heat. You use the credits to purchase a plush penthouse and contract yourself out to the Underhive's elite.</p>
                      <p>You spend your days as a wealthy, bedridden fuckmattress, your obscenely wide birthing hips constantly pinned to a silk mattress. You happily moan as you continuously incubate massive, demanding litters for rich patrons, leaking milk into expensive sheets. Your athletic past is nothing but a distant, blurry memory.</p>
                  </>
              )}
              {gameState.epilogueStep === 'win_natural' && (
                  <>
                      <p>You scream as the massive {rand(T_BRATS)} forcefully stretch your anatomy to the tearing point. The blinding agony of birthing three fat, hefty babies through your pregnancy-swollen meat permanently breaks something deep inside your hormone-cooked brain.</p>
                      <p>You have your credits, but your body is hopelessly, masochistically addicted to the excruciating stretch. You keep trying to escape the lifestyle, but you can never kick the habit. Less than a year later, you are back in an Underhive hospital bed, sobbing helplessly as you feel another hefty, squirming litter begin to drop, your ruined body eagerly preparing for the agony all over again.</p>
                      <p className="text-pink-400 font-bold italic mt-4">It only takes a few years for you to lose count of the brats you've pushed out of your loose, stretched out dick.</p>
                  </>
              )}

              {gameState.epilogueStep === 'lose_beg' && (
                  <>
                      <p>The handlers laugh at your sweaty, heaving frame. "C-sections are for paying customers." They drag your heavy-hipped, leaking body directly to the industrial milking racks.</p>
                      <p>Strapped down with your heavy thighs forced wide, you endure a gruesome, mind-breaking penile birth. Your ruined, blown-out body is now permanently designated as corporate breeding stock, kept constantly pregnant to churn out endless litters for the syndicate.</p>
                  </>
              )}
              {gameState.epilogueStep === 'lose_submit' && (
                  <>
                      <p>Your preggo-brain takes over. You let out a thick, musky moan and present your heavy, dripping breeder-loins to the handlers.</p>
                      <p>Right there on the canvas, the extreme penile labor begins. The impossible stretch shatters your mind completely. You are dragged into the winner's locker room as the arena's official post-match relief sow—a docile, leaking incubator completely addicted to your own degradation.</p>
                  </>
              )}

              {gameState.epilogueStep === 'draw_contract' && (
                  <>
                      <p>You desperately sign the datapad. The medics rush you to surgery, slicing your drum-tight belly open to extract the fetuses before your anatomy is ruined.</p>
                      <p>But the debt is massive. Stripped of your fighter status, your heavy, gelatinous frame is wheeled directly into the syndicate maternity wards. You will spend the next decade as a contract surrogate, using your extreme hourglass body to pay off the surgery one grueling pregnancy at a time.</p>
                  </>
              )}
              {gameState.epilogueStep === 'draw_canvas' && (
                  <>
                      <p>You refuse to owe them. You let out a guttural, bovine groan and bear down. Beside you, Siobhan screams as her own labor begins.</p>
                      <p>The extreme, agonizing stretch of the penile birth permanently blows out your anatomy and rewrites your mind. The intense rush of hormones leaves you both completely feral. You are no longer fighters—just two moaning, hyper-fertile broodmares, hopelessly addicted to the pain and hungry for your next litter.</p>
                  </>
              )}

              {(gameState.epilogueStep === 'win_csection_cleanse' ||
                gameState.epilogueStep === 'win_csection_escort' ||
                gameState.epilogueStep === 'win_natural' ||
                gameState.epilogueStep === 'lose_beg' ||
                gameState.epilogueStep === 'lose_submit' ||
                gameState.epilogueStep === 'draw_contract' ||
                gameState.epilogueStep === 'draw_canvas') && (
                  <div className="text-center mt-8 pt-6 border-t border-gray-700">
                      <button
                        onClick={onRestart}
                        className="px-8 py-3 bg-red-900/40 hover:bg-red-800/60 border border-red-500 text-red-100 font-black tracking-widest rounded transition-all shadow-[0_0_15px_rgba(220,38,38,0.4)]"
                      >
                        In another place and another time, a futanari steps into the ring...
                      </button>
                  </div>
              )}
          </div>
      )}
    </div>
  );
};

export default GameOverScreen;
