import { useState, useEffect } from 'react';
import type { Day } from './types';
import { studyDays, resources } from './data';
import { loadDays, saveDays, calculateProgress } from './utils/storage';
import ProgressSummary from './components/ProgressSummary';
import DayTimeline from './components/DayTimeline';
import Resources from './components/Resources';
import ExamDayStrategy from './components/ExamDayStrategy';

function App() {
  const [days, setDays] = useState<Day[]>(() => {
    const saved = loadDays();
    return saved || studyDays;
  });

  const progress = calculateProgress(days);

  useEffect(() => {
    saveDays(days);
  }, [days]);

  const handleToggleTask = (dayNumber: number, taskId: string) => {
    setDays(prevDays => 
      prevDays.map(day => 
        day.dayNumber === dayNumber
          ? {
              ...day,
              blocks: day.blocks.map(block => ({
                ...block,
                tasks: block.tasks.map(task =>
                  task.id === taskId
                    ? { ...task, completed: !task.completed }
                    : task
                ),
              })),
            }
          : day
      )
    );
  };

  const handleToggleFlashcard = (dayNumber: number, flashcardId: string) => {
    setDays(prevDays =>
      prevDays.map(day =>
        day.dayNumber === dayNumber
          ? {
              ...day,
              blocks: day.blocks.map(block => ({
                ...block,
                flashcards: block.flashcards?.map(card =>
                  card.id === flashcardId
                    ? { ...card, known: !card.known }
                    : card
                ),
              })),
            }
          : day
      )
    );
  };

  const handleToggleBlockComplete = (dayNumber: number, blockId: string) => {
    setDays(prevDays =>
      prevDays.map(day =>
        day.dayNumber === dayNumber
          ? {
              ...day,
              blocks: day.blocks.map(block =>
                block.id === blockId
                  ? { ...block, completed: !block.completed }
                  : block
              ),
            }
          : day
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Study Planner - Java & Linear Algebra
          </h1>
          <p className="text-gray-600">
            Comprehensive 6-day study plan for ES1036 exams
          </p>
        </header>

        <ProgressSummary progress={progress} />

        <Resources resources={resources} />

        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">Study Timeline</h2>
          {days.map(day => (
            <DayTimeline
              key={day.dayNumber}
              day={day}
              onToggleTask={handleToggleTask}
              onToggleFlashcard={handleToggleFlashcard}
              onToggleBlockComplete={handleToggleBlockComplete}
            />
          ))}
        </div>

        <ExamDayStrategy />
      </div>
    </div>
  );
}

export default App;
