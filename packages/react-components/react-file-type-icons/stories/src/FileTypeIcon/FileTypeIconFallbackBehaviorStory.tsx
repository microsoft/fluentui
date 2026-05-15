import * as React from 'react';
import { FileTypeIcon } from '@fluentui/react-file-type-icons';

const examples = [
  { extension: 'unknown', label: 'unknown extension' },
  { extension: '', label: 'empty extension' },
  { extension: '.PDF', label: 'leading dot and uppercase' },
  { extension: 'pdf', label: 'normalized lowercase' },
] as const;

export const FallbackBehavior = (): React.ReactElement => (
  <div>
    {examples.map(example => (
      <div key={`${example.label}-${example.extension || 'empty'}`}>
        <FileTypeIcon extension={example.extension} size={24} />
        <span>
          {' '}
          {example.label}: "{example.extension}"
        </span>
      </div>
    ))}
  </div>
);

FallbackBehavior.parameters = {
  docs: {
    description: {
      story:
        'Step 5: Validate fallback behavior. Unknown or empty extensions render the generic file icon. Extension values are case-insensitive, and leading dots are supported.',
    },
  },
};

FallbackBehavior.storyName = '05 Fallbacks';
