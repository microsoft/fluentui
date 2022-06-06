import * as React from 'react';
import { TextBoldRegular, TextItalicRegular, TextUnderlineRegular } from '@fluentui/react-icons';
import { Button } from '@fluentui/react-button';
import { Tooltip } from '../Tooltip';

export const RelationshipLabel = () => (
  <>
    <Tooltip content="Bold" relationship="label">
      <Button icon={<TextBoldRegular />} />
    </Tooltip>
    <Tooltip content="Italic" relationship="label">
      <Button icon={<TextItalicRegular />} />
    </Tooltip>
    <Tooltip content="Underline" relationship="label">
      <Button icon={<TextUnderlineRegular />} />
    </Tooltip>
  </>
);

RelationshipLabel.storyName = 'Relationship: label';
RelationshipLabel.parameters = {
  docs: {
    description: {
      story: `A tooltip can be used as the label of its trigger. For example, a label tooltip can be used for buttons
        that have only an icon and no visible label text.
        <br />
        The tooltip sets its \`content\` as the trigger's \`aria-label\`, so the tooltip is accessible to screen
        readers and other assistive technology.`,
    },
  },
};
