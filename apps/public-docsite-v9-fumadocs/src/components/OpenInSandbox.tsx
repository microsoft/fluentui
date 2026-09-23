'use client';

import { openInStackBlitz } from '../utils/sandbox';
import type { Data } from '../utils/sandbox';
import * as React from 'react';
import { ExternalLink } from 'lucide-react';
import { DocsButton } from './DocsControls';

const SANDBOX_CONFIG = {
  requiredDependencies: {
    react: '^19',
    'react-dom': '^19',
    '@fluentui/react-components': '^9.0.0',
  },
  optionalDependencies: {
    '@fluentui/react-icons': 'latest',
  },
  devDependencies: {
    '@types/react': '^19',
    '@types/react-dom': '^19',
    typescript: '~5.7.0',
  },
} satisfies Pick<Data, 'requiredDependencies' | 'optionalDependencies' | 'devDependencies'>;

export interface OpenInSandboxProps {
  story: { parameters?: { fullSource?: string; cssModuleSources?: Data['cssModuleSources'] } };
  exportToken: string;
  description: string;
}

export const OpenInSandbox = ({ story, exportToken, description }: OpenInSandboxProps): React.ReactElement | null => {
  const [error, setError] = React.useState<string | null>(null);

  const storyFile = story.parameters?.fullSource;
  const cssModuleSources = story.parameters?.cssModuleSources;

  const handleClick = React.useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      if (!storyFile) {
        return;
      }
      const targetDocument = event.currentTarget.ownerDocument;

      try {
        setError(null);

        openInStackBlitz(
          {
            ...SANDBOX_CONFIG,
            storyFile,
            storyExportToken: exportToken,
            title: 'FluentUI React v9',
            description,
            cssModuleSources,
          },
          targetDocument,
        );
      } catch (cause) {
        setError(cause instanceof Error ? cause.message : 'Could not open the sandbox.');
      }
    },
    [storyFile, exportToken, description, cssModuleSources],
  );

  if (!storyFile) {
    return null;
  }

  return (
    <>
      <DocsButton
        onClick={handleClick}
        iconPosition="after"
        icon={{
          className: 'inline-flex shrink-0',
          children: <ExternalLink aria-hidden="true" className="size-lg" />,
        }}
      >
        Open in StackBlitz
      </DocsButton>
      {error ? (
        <p role="alert" className="order-2 min-w-0 basis-full mt-2 text-sm text-fd-destructive">
          {error}
        </p>
      ) : null}
    </>
  );
};
