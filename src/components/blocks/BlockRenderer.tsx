import React from 'react';
import { LessonBlock } from '../../types/lesson';
import { VideoBlock } from './VideoBlock';
import { IllustrationBlock } from './IllustrationBlock';
import { TheoryBlock } from './TheoryBlock';
import { BookQuoteBlock } from './BookQuoteBlock';
import { MovieBlock } from './MovieBlock';
import { CaseBlock } from './CaseBlock';
import { OpenQuestionBlock } from './OpenQuestionBlock';
import { QuizBlock } from './QuizBlock';
import { ReflectionBlock } from './ReflectionBlock';
import { SummaryBlock } from './SummaryBlock';
import { SelfCheckBlock } from './SelfCheckBlock';
import { HeaderBlock } from './HeaderBlock';

interface BlockRendererProps {
  block: LessonBlock;
}

export const BlockRenderer: React.FC<BlockRendererProps> = ({ block }) => {
  switch (block.type) {
    case 'video':
      return <VideoBlock content={block.content} />;
    case 'illustration':
      return <IllustrationBlock content={block.content} />;
    case 'theory':
      return <TheoryBlock content={block.content} />;
    case 'bookquote':
      return <BookQuoteBlock content={block.content} />;
    case 'movie':
      return <MovieBlock content={block.content} />;
    case 'case':
      return <CaseBlock content={block.content} blockId={block.id} />;
    case 'openquestion':
      return <OpenQuestionBlock content={block.content} blockId={block.id} />;
    case 'quiz':
      return <QuizBlock content={block.content} blockId={block.id} />;
    case 'reflection':
      return <ReflectionBlock content={block.content} blockId={block.id} />;
    case 'summary':
      return <SummaryBlock content={block.content} />;
    case 'selfcheck':
      return <SelfCheckBlock content={block.content} blockId={block.id} />;
    case 'header':
      return <HeaderBlock content={block.content} />;
    default:
      return (
        <div className="p-6 bg-red-50 text-red-700 rounded-lg">
          Unknown block type: {block.type}
        </div>
      );
  }
};