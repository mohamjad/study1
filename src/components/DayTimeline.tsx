import { useState } from 'react';
import type { Day } from '../types';
import TimeBlock from './TimeBlock';

interface DayTimelineProps {
  day: Day;
  onToggleTask: (dayNumber: number, taskId: string) => void;
  onToggleFlashcard: (dayNumber: number, flashcardId: string) => void;
  onToggleBlockComplete: (dayNumber: number, blockId: string) => void;
}

export default function DayTimeline({ 
  day, 
  onToggleTask, 
  onToggleFlashcard,
  onToggleBlockComplete 
}: DayTimelineProps) {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div className="bg-gray-50 rounded-lg shadow-md mb-6">
      <div 
        className="p-4 cursor-pointer hover:bg-gray-100 rounded-t-lg"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-800">
            Day {day.dayNumber} - {day.date}
          </h2>
          <span className="text-gray-400">{isExpanded ? '▼' : '▶'}</span>
        </div>
      </div>

      {isExpanded && (
        <div className="p-4 space-y-4">
          {day.blocks.map(block => (
            <TimeBlock
              key={block.id}
              block={block}
              onToggleTask={(taskId) => onToggleTask(day.dayNumber, taskId)}
              onToggleFlashcard={(flashcardId) => onToggleFlashcard(day.dayNumber, flashcardId)}
              onToggleBlockComplete={(blockId) => onToggleBlockComplete(day.dayNumber, blockId)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

