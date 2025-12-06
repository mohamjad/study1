import { useState } from 'react';
import type { Flashcard as FlashcardType } from '../types';

interface FlashcardProps {
  card: FlashcardType;
  onToggleKnown: (id: string) => void;
}

export default function Flashcard({ card, onToggleKnown }: FlashcardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div 
      className={`bg-white rounded-lg shadow-md p-4 cursor-pointer transition-transform hover:shadow-lg ${
        card.known ? 'ring-2 ring-green-500' : ''
      }`}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <div className="flex justify-between items-start mb-2">
        <span className={`text-xs px-2 py-1 rounded ${
          card.known ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'
        }`}>
          {card.known ? 'Known' : 'Learning'}
        </span>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleKnown(card.id);
          }}
          className={`text-xs px-2 py-1 rounded ${
            card.known 
              ? 'bg-green-500 text-white hover:bg-green-600' 
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          {card.known ? 'Mark Unknown' : 'Mark Known'}
        </button>
      </div>
      
      <div className="min-h-[100px] flex items-center justify-center">
        {isFlipped ? (
          <div className="text-gray-800">{card.back}</div>
        ) : (
          <div className="text-gray-700 font-medium">{card.front}</div>
        )}
      </div>
      
      <div className="text-xs text-gray-500 mt-2 text-center">
        Click to {isFlipped ? 'show front' : 'flip'}
      </div>
    </div>
  );
}

