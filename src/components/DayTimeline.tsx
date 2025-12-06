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
  return (
    <div className="space-y-4">
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
  );
}

