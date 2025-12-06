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
  // Check version - if mismatch, clear old data
  const savedVersion = localStorage.getItem(VERSION_KEY);
  if (savedVersion !== CURRENT_VERSION) {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(PROGRESS_KEY);
    localStorage.setItem(VERSION_KEY, CURRENT_VERSION);
    return null; // Force fresh data load
  }
  
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : null;
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

