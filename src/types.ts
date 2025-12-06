export type Subject = 'Java' | 'Linear Algebra';

export interface Task {
  id: string;
  description: string;
  subInfo?: string;
  completed: boolean;
}

export interface Flashcard {
  id: string;
  front: string;
  back: string;
  known: boolean;
}

export interface TextbookProblemSet {
  section: string;
  numbers: (number | string)[];
  description?: string;
}

export interface TimeBlock {
  id: string;
  timeRange: string;
  title: string;
  topic: Subject;
  description: string;
  tasks: Task[];
  flashcards?: Flashcard[];
  completed: boolean;
  textbookProblems?: TextbookProblemSet[];
}

export interface Day {
  dayNumber: number;
  date: string;
  blocks: TimeBlock[];
}

export interface Resource {
  id: string;
  title: string;
  purpose: string;
  link: string;
  subject: Subject;
}

export interface Progress {
  javaTasksDone: number;
  javaTasksTotal: number;
  linAlgTasksDone: number;
  linAlgTasksTotal: number;
  javaFlashcardsKnown: number;
  linAlgFlashcardsKnown: number;
}

