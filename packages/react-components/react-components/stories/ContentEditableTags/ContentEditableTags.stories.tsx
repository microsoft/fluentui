import * as React from 'react';
import { Prototype } from './utils/stories';
import { ContentEditableTagsRenderer } from './ContentEditableTagsRenderer';

export const ContentEditableTags: React.FC = () => {
  return (
    <Prototype pageTitle="tags">
      <h1>Content editable tags</h1>
      <ContentEditableTagsRenderer />
    </Prototype>
  );
};
