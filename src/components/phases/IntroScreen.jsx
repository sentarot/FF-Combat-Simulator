const IntroScreen = ({ onContinue }) => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center relative overflow-y-auto h-full rounded-lg border-2 border-red-900/30 bg-black p-4 md:p-8 z-10">
        <div className="z-10 w-full max-w-3xl text-center text-gray-400 font-mono tracking-wide text-sm md:text-lg leading-relaxed space-y-6">
            <h2 className="font-black text-red-700 text-4xl md:text-5xl mb-8 tracking-tighter border-b border-red-900/50 pb-4">FERTILITY FIGHTS: REGULATION 88.4</h2>
            <p>The year is 2142. The hyper-corporate dystopia of the Underhive demands two things: bloody entertainment, and an endless supply of breeding stock.</p>
            <p>Welcome to the Penal Arena.</p>
            <p>Here, the subjugated futanari underclass is put to use as both spectacle and cattle. The citizenry—male and female alike—deeply resent the futanari for being naturally tall, beautiful, muscular, and sexually virile. They take a sick, roaring glee in watching these proud, lethal warriors brought low, degraded into fat-titted, groaning incubators for their amusement.</p>
            <p>You step into the ring with a hard, toned, athletic body... but the syndicate ensures no one leaves the way they entered.</p>
            <p>Pumped full of experimental hucow hormones and aggressive seed engineered to rapidly gestate big, healthy male fetuses, fighters are forced to battle to complete physical ruination. As they violently batter each other's bellies, the trauma severely agitates the growing male fetuses.</p>
            <p>Engineered to survive, these disturbed parasites immediately "demand" calories, venting potent hormones into the futanari's bloodstream. This violently drains their lean muscle mass, using it to fuel their own rapid, macrosomic growth, while dumping the excess calories directly into the futanari's breasts, hips, and thighs. They are biologically forced into an extreme, highly sexualized hourglass figure—an all-natural fuckmattress pornbody designed to titillate the jaded, perverse audience.</p>
            <p className="text-red-500 font-bold italic pt-4">There is no graceful defeat. You will fight until your creaking joints buckle, your massively bloated milkers drag you to the canvas, and your exhausted, overbred body fully surrenders to its new role as a groaning broodsow.</p>
        </div>
        <button
            onClick={onContinue}
            className="mt-12 z-20 px-10 py-4 bg-gradient-to-b from-red-900 to-black hover:from-red-800 hover:to-red-950 border border-red-700 text-red-300 hover:text-white font-black tracking-widest uppercase transition-all rounded shadow-[0_0_20px_rgba(220,38,38,0.3)] hover:shadow-[0_0_30px_rgba(220,38,38,0.6)]"
        >
            Enter the Penal Arena
        </button>
    </div>
  );
};

export default IntroScreen;
