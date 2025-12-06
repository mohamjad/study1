import type { Day, Progress } from '../types';

const STORAGE_KEY = 'study-planner-data';
const PROGRESS_KEY = 'study-planner-progress';
const VERSION_KEY = 'study-planner-version';
const CURRENT_VERSION = '2.0.0'; // Increment this when data structure changes

export const saveDays = (days: Day[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(days));
  localStorage.setItem(VERSION_KEY, CURRENT_VERSION); // Ensure version is set
};

export const loadDays = (): Day[] | null => {
  const savedVersion = localStorage.getItem(VERSION_KEY);
  const savedData = localStorage.getItem(STORAGE_KEY);
  
  // Only clear if version mismatch AND data exists (don't clear on first load)
  if (savedVersion !== CURRENT_VERSION && savedData) {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(PROGRESS_KEY);
  }
  
  // Set version if not set or if it was mismatched
  if (savedVersion !== CURRENT_VERSION) {
    localStorage.setItem(VERSION_KEY, CURRENT_VERSION);
  }
  
  // Return data only if version matches (or if no version was set before)
  if (savedVersion === CURRENT_VERSION && savedData) {
    return JSON.parse(savedData);
  }
  
  return null; // Force fresh data load
};

export const saveProgress = (progress: Progress) => {
  localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
};

export const loadProgress = (): Progress | null => {
  const data = localStorage.getItem(PROGRESS_KEY);
  return data ? JSON.parse(data) : null;
};

export const calculateProgress = (days: Day[]): Progress => {
  let javaTasksDone = 0;
  let javaTasksTotal = 0;
  let linAlgTasksDone = 0;
  let linAlgTasksTotal = 0;
  let javaFlashcardsKnown = 0;
  let linAlgFlashcardsKnown = 0;

  days.forEach(day => {
    day.blocks.forEach(block => {
      block.tasks.forEach(task => {
        if (block.topic === 'Java') {
          javaTasksTotal++;
          if (task.completed) javaTasksDone++;
        } else {
          linAlgTasksTotal++;
          if (task.completed) linAlgTasksDone++;
        }
      });
      block.flashcards?.forEach(card => {
        if (block.topic === 'Java') {
          if (card.known) javaFlashcardsKnown++;
        } else {
          if (card.known) linAlgFlashcardsKnown++;
        }
      });
    });
  });

  return {
    javaTasksDone,
    javaTasksTotal,
    linAlgTasksDone,
    linAlgTasksTotal,
    javaFlashcardsKnown,
    linAlgFlashcardsKnown,
  };
};

