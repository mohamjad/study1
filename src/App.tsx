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
    if (saved) {
      // Merge dates from fresh studyDays while preserving user progress
      return saved.map((savedDay: Day) => {
        const freshDay = studyDays.find(d => d.dayNumber === savedDay.dayNumber);
        return freshDay ? { ...savedDay, date: freshDay.date } : savedDay;
      });
    }
    return studyDays;
  });
  const [activeDay, setActiveDay] = useState(1);

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
          <p className="text-gray-600 mb-1">
            Comprehensive 6-day study plan for ES1036 (Java) & NM1411 (Linear Algebra) exams
          </p>
          <p className="text-sm text-gray-500 italic mb-4">
            by Mohammed Amjad
          </p>
          <div className="bg-blue-50 border-l-4 border-blue-600 p-4 rounded-r-lg mb-4">
            <div className="flex items-center gap-3">
              <span className="text-blue-600 font-semibold">📚 Textbook:</span>
              <a 
                href="https://www.studyhalo.com/media/resources/resources/MAT1503/Textbook/MAT1503_-_Prescribed_book.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-700 hover:text-blue-900 font-medium underline"
              >
                Anton & Kaul, Elementary Linear Algebra 12e (PDF)
              </a>
            </div>
          </div>
        </header>

        <ProgressSummary progress={progress} />

        <Resources resources={resources} />

        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-4 text-gray-800">Study Timeline</h2>
          
          {/* Tabs */}
          <div className="flex flex-wrap gap-2 mb-6 border-b border-gray-300">
            {days.map(day => (
              <button
                key={day.dayNumber}
                onClick={() => setActiveDay(day.dayNumber)}
                className={`px-4 py-2 font-semibold rounded-t-lg transition-colors ${
                  activeDay === day.dayNumber
                    ? 'bg-blue-600 text-white border-b-2 border-blue-600'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Day {day.dayNumber} - {day.date}
              </button>
            ))}
            <button
              onClick={() => setActiveDay(0)}
              className={`px-4 py-2 font-semibold rounded-t-lg transition-colors ${
                activeDay === 0
                  ? 'bg-blue-600 text-white border-b-2 border-blue-600'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Exam Strategy
            </button>
          </div>

          {/* Tab Content */}
          {activeDay === 0 ? (
            <ExamDayStrategy />
          ) : (
            days
              .filter(day => day.dayNumber === activeDay)
              .map(day => (
                <DayTimeline
                  key={day.dayNumber}
                  day={day}
                  onToggleTask={handleToggleTask}
                  onToggleFlashcard={handleToggleFlashcard}
                  onToggleBlockComplete={handleToggleBlockComplete}
                />
              ))
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
