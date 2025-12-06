import type { Day, Progress } from '../types';

const STORAGE_KEY = 'study-planner-data';
const PROGRESS_KEY = 'study-planner-progress';

export const saveDays = (days: Day[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(days));
};

export const loadDays = (): Day[] | null => {
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

