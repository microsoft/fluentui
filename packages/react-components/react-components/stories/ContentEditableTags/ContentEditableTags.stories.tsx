import * as React from 'react';
import { Prototype } from './utils/stories';
import { ContentEditableTagsRenderer } from './ContentEditableTagsRenderer';
import { ContentEditableEntities } from './ContentEditableEntities';
import { LexicalEditor2 } from './Lexical2';

export const ContentEditableTags: React.FC = () => {
  return (
    <Prototype pageTitle="tags">
      {/* <h1>Content editable tags</h1>
      <ContentEditableTagsRenderer />

      <h1>Content editable - entities</h1>
      <ContentEditableEntities />
       */}
      <h1>Lexical</h1>
      <LexicalEditor2 />
    </Prototype>
  );
};
