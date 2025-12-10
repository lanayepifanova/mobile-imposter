import { PlayScreen } from "@/components/screens/PlayScreen";
import { RoleRevealScreen } from "@/components/screens/RoleRevealScreen";
import { CategorySelectScreen } from "@/components/screens/CategorySelectScreen";
import { SetupScreen } from "@/components/screens/SetupScreen";
import { VoteScreen } from "@/components/screens/VoteScreen";
import { GameProvider, useGame } from "@/contexts/GameContext";

function GameContainer() {
  const { gameState } = useGame();

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-6 md:p-12 relative overflow-hidden bg-[#FDFBF7]">
      {/* Soft Background Elements */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-40">
        <div className="absolute top-[-20%] left-[-20%] w-[70%] h-[70%] bg-primary/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-20%] w-[70%] h-[70%] bg-secondary/10 rounded-full blur-[120px]" />
        <div className="absolute top-[40%] left-[40%] w-[40%] h-[40%] bg-accent/5 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 w-full max-w-lg mx-auto">
        {gameState.step === 'setup' && <SetupScreen />}
        {gameState.step === 'category-select' && <CategorySelectScreen />}
        {gameState.step === 'roles' && <RoleRevealScreen />}
        {gameState.step === 'play' && <PlayScreen />}
        {gameState.step === 'vote' && <VoteScreen />}
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <GameProvider>
      <GameContainer />
    </GameProvider>
  );
}
