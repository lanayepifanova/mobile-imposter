import { createContext, useContext, useState, ReactNode } from 'react';
import { GameState, Category, Role, WORDS } from '@/lib/game-data';
import { toast } from 'sonner';

interface GameContextType {
  gameState: GameState;
  setPlayers: (count: number) => void;
  setPlayerNames: (names: string[]) => void;
  setImposters: (count: number) => void;
  goToSetup: () => void;
  goToCategorySelect: () => void;
  goToRoleReveal: () => void;
  goToStartPlayer: () => void;
  startGame: (category: string) => void;
  addCustomCategory: (name: string, words: string[]) => void;
  customCategories: Record<string, string[]>;
  nextPlayer: () => void;
  prevPlayer: () => void;
  startVoting: () => void;
  castVote: (targetIndex: number) => void;
  resetGame: () => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export function GameProvider({ children }: { children: ReactNode }) {
  const [customCategories, setCustomCategories] = useState<Record<string, string[]>>(() => {
    if (typeof window === 'undefined') return {};
    const saved = localStorage.getItem('customCategories');
    return saved ? JSON.parse(saved) : {};
  });

  const [gameState, setGameState] = useState<GameState>({
    step: 'setup',
    players: 4,
    playerNames: ['Player 1', 'Player 2', 'Player 3', 'Player 4'],
    imposters: 1,
    category: null,
    secretWord: '',
    hintWord: '',
    playerRoles: [],
    currentPlayerIndex: 0,
    startingPlayerIndex: null,
    votes: {},
    winner: null,
  });

  const setPlayers = (count: number) => {
    setGameState(prev => {
      // Adjust playerNames array when count changes
      const currentNames = [...prev.playerNames];
      if (count > currentNames.length) {
        // Add new players
        for (let i = currentNames.length; i < count; i++) {
          currentNames.push(`Player ${i + 1}`);
        }
      } else {
        // Remove excess players
        currentNames.length = count;
      }
      return { ...prev, players: count, playerNames: currentNames };
    });
  };

  const setPlayerNames = (names: string[]) => {
    setGameState(prev => ({ ...prev, playerNames: names }));
  };

  const setImposters = (count: number) => {
    setGameState(prev => ({ ...prev, imposters: count }));
  };

  const goToSetup = () => {
    setGameState(prev => ({
      ...prev,
      step: 'setup',
      category: null,
      secretWord: '',
      hintWord: '',
      playerRoles: [],
      currentPlayerIndex: 0,
      startingPlayerIndex: null,
      votes: {},
      winner: null,
    }));
  };

  const goToCategorySelect = () => {
    setGameState(prev => ({
      ...prev,
      step: 'category-select',
      category: null,
      secretWord: '',
      hintWord: '',
      playerRoles: [],
      currentPlayerIndex: 0,
      startingPlayerIndex: null,
      votes: {},
      winner: null,
    }));
  };

  const goToRoleReveal = () => {
    setGameState(prev => ({
      ...prev,
      step: 'roles',
      currentPlayerIndex: 0,
      startingPlayerIndex: null,
      votes: {},
      winner: null,
    }));
  };

  const goToStartPlayer = () => {
    setGameState(prev => ({ ...prev, step: 'start-player', votes: {}, winner: null }));
  };

  const addCustomCategory = (name: string, words: string[]) => {
    setCustomCategories(prev => {
      const updated = { ...prev, [name]: words };
      if (typeof window !== 'undefined') {
        localStorage.setItem('customCategories', JSON.stringify(updated));
      }
      return updated;
    });
  };

  const startGame = (category: string) => {
    const wordList = WORDS[category as Category] || customCategories[category];
    if (!wordList?.length) {
      toast.error("This category has no words yet. Please pick another.");
      return;
    }
    const secretWord = wordList[Math.floor(Math.random() * wordList.length)];
    const hintCandidates = wordList.filter(word => word !== secretWord);
    const hintWord = hintCandidates.length
      ? hintCandidates[Math.floor(Math.random() * hintCandidates.length)]
      : category;
    
    // Assign roles
    const roles: Role[] = Array(gameState.players).fill('crew');
    let assignedImposters = 0;
    while (assignedImposters < gameState.imposters) {
      const idx = Math.floor(Math.random() * gameState.players);
      if (roles[idx] === 'crew') {
        roles[idx] = 'imposter';
        assignedImposters++;
      }
    }

    setGameState(prev => ({
      ...prev,
      step: 'roles',
      category,
      secretWord,
      hintWord,
      playerRoles: roles,
      currentPlayerIndex: 0,
      startingPlayerIndex: null,
      votes: {},
      winner: null,
    }));
  };

  const nextPlayer = () => {
    setGameState(prev => {
      if (prev.currentPlayerIndex + 1 >= prev.players) {
        const startingPlayerIndex = Math.floor(Math.random() * prev.players);
        return { ...prev, step: 'start-player', startingPlayerIndex };
      }
      return { ...prev, currentPlayerIndex: prev.currentPlayerIndex + 1 };
    });
  };

  const prevPlayer = () => {
    setGameState(prev => {
      if (prev.currentPlayerIndex <= 0) {
        return { ...prev, step: 'category-select' };
      }
      return { ...prev, currentPlayerIndex: prev.currentPlayerIndex - 1 };
    });
  };

  const startVoting = () => {
    setGameState(prev => ({ ...prev, step: 'vote' }));
  };

  const castVote = (targetIndex: number) => {
    setGameState(prev => {
      const newVotes = { ...prev.votes, [targetIndex]: (prev.votes[targetIndex] || 0) + 1 };
      
      // Check if everyone has voted (assuming 1 vote per player for simplicity in this version, 
      // or we can just manually trigger result calculation. 
      // For this MVP, let's assume we just tally votes at the end of a "discussion" phase 
      // or let players click a "Finish Voting" button. 
      // Actually, let's make it simple: Players discuss, then they click who they think it is.
      // But to keep it simple for a single device, we might just skip to result or have a "Reveal" button.
      
      return { ...prev, votes: newVotes };
    });
  };
  
  const resetGame = () => {
    setGameState({
      step: 'setup',
      players: gameState.players,
      playerNames: gameState.playerNames,
      imposters: gameState.imposters,
      category: null,
      secretWord: '',
      hintWord: '',
      playerRoles: [],
      currentPlayerIndex: 0,
      startingPlayerIndex: null,
      votes: {},
      winner: null,
    });
  };

  return (
    <GameContext.Provider value={{ 
      gameState, 
      setPlayers, 
      setPlayerNames,
      setImposters, 
      goToSetup,
      goToCategorySelect,
      goToRoleReveal,
      goToStartPlayer,
      startGame, 
      addCustomCategory,
      customCategories,
      nextPlayer,
      prevPlayer,
      startVoting, 
      castVote,
      resetGame 
    }}>
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
}
