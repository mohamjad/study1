import { useState } from 'react';
import type { TimeBlock as TimeBlockType } from '../types';
import TaskChecklist from './TaskChecklist';
import Flashcard from './Flashcard';

interface TimeBlockProps {
  block: TimeBlockType;
  onToggleTask: (id: string) => void;
  onToggleFlashcard: (id: string) => void;
  onToggleBlockComplete: (id: string) => void;
}

export default function TimeBlock({ 
  block, 
  onToggleTask, 
  onToggleFlashcard,
  onToggleBlockComplete 
}: TimeBlockProps) {
  const [isExpanded, setIsExpanded] = useState(true);

  const topicColor = block.topic === 'Java' 
    ? 'bg-blue-100 text-blue-800 border-blue-300' 
    : 'bg-green-100 text-green-800 border-green-300';

  return (
    <div className="bg-white rounded-lg shadow-md border-l-4 border-gray-300 mb-4">
      <div 
        className="p-4 cursor-pointer hover:bg-gray-50"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span className={`text-xs px-2 py-1 rounded border ${topicColor}`}>
                {block.topic}
              </span>
              <span className="text-sm font-semibold text-gray-600">{block.timeRange}</span>
            </div>
            <h3 className="text-lg font-bold text-gray-800 mb-1">{block.title}</h3>
            <p className="text-sm text-gray-600">{block.description}</p>
          </div>
          <div className="flex items-center gap-2 ml-4">
            <input
              type="checkbox"
              checked={block.completed}
              onChange={(e) => {
                e.stopPropagation();
                onToggleBlockComplete(block.id);
              }}
              className="w-5 h-5 cursor-pointer"
            />
            <span className="text-gray-400">{isExpanded ? '▼' : '▶'}</span>
          </div>
        </div>
      </div>

      {isExpanded && (
        <div className="px-4 pb-4 border-t pt-4">
          <div className="mb-4">
            <h4 className="font-semibold mb-2 text-gray-700">Tasks</h4>
            <TaskChecklist 
              tasks={block.tasks} 
              onToggleTask={onToggleTask}
            />
          </div>

          {block.flashcards && block.flashcards.length > 0 && (
            <div>
              <h4 className="font-semibold mb-2 text-gray-700">Flashcards</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {block.flashcards.map(card => (
                  <Flashcard
                    key={card.id}
                    card={card}
                    onToggleKnown={onToggleFlashcard}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

