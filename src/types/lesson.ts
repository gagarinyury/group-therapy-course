export type BlockType = 
  | 'video'
  | 'illustration'
  | 'theory'
  | 'bookquote'
  | 'movie'
  | 'case'
  | 'openquestion'
  | 'quiz'
  | 'reflection'
  | 'summary'
  | 'selfcheck'
  | 'header';

export interface LessonBlock {
  id: string;
  type: BlockType;
  content: any;
  order: number;
}

export interface Lesson {
  id: number;
  title: string;
  description: string;
  blocks: LessonBlock[];
}

export interface LessonProgress {
  started: boolean;
  completed: boolean;
  lastBlockId: string | null;
  completedBlocks: string[];
  startedAt?: string;
  completedAt?: string;
}

export interface AppState {
  currentLesson: number | null;
  lessonsProgress: Record<number, LessonProgress>;
  userAnswers: Record<string, any>;
}

// Specific block types
export interface VideoBlockContent {
  url: string;
  description?: string;
  duration?: string;
}

export interface IllustrationBlockContent {
  imageUrl: string;
  caption?: string;
  style?: 'default' | 'borderless' | 'rounded';
}

export interface TheoryBlockContent {
  cards: {
    id: string;
    text: string;
    isQuote?: boolean;
    author?: string;
  }[];
}

export interface BookQuoteBlockContent {
  quote: string;
  author: string;
  book: string;
  page?: number;
}

export interface MovieBlockContent {
  posterUrl: string;
  title: string;
  year: number;
  description: string;
  connection: string;
}

export interface CaseBlockContent {
  situation: string;
  options: {
    id: string;
    text: string;
    comment: string;
  }[];
  allowMultiple?: boolean;
}

export interface OpenQuestionBlockContent {
  question: string;
  placeholder?: string;
  minLength?: number;
}

export interface QuizBlockContent {
  question: string;
  options: {
    id: string;
    text: string;
    isCorrect: boolean;
    feedback?: string;
  }[];
}

export interface ReflectionBlockContent {
  prompt: string;
  placeholder?: string;
  minLength?: number;
}

export interface SummaryBlockContent {
  items: {
    id: string;
    text: string;
  }[];
}

export interface SelfCheckBlockContent {
  title: string;
  description: string;
  placeholder?: string;
}

export interface HeaderBlockContent {
  title: string;
  subtitle?: string;
  introduction?: string;
}