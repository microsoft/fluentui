import * as React from 'react';
import { Prototype } from './utils/stories';
import { ContentEditableTagsRenderer } from './ContentEditableTagsRenderer';
import { ContentEditableEntities } from './ContentEditableEntities';

export const ContentEditableTags: React.FC = () => {
  return (
    <Prototype pageTitle="tags">
      <h1>Content editable tags</h1>
      <ContentEditableTagsRenderer />

      <h1>Content editable - entities</h1>
      <ContentEditableEntities />
    </Prototype>
  );
};
