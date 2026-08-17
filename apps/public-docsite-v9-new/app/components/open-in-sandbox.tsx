import {
  getDependencies,
  openCodeSandbox,
  openStackblitz,
  scaffold,
  type Data,
} from '@fluentui/react-storybook-addon-export-to-sandbox';
import { useState } from 'react';

/**
 * Mirrors the workbench's `exportToSandbox` configuration in `.storybook/preview.js`,
 * so an exported project is identical whichever host produced it.
 */
const SANDBOX_CONFIG = {
  provider: 'stackblitz-cloud',
  bundler: 'vite',
  requiredDependencies: {
    react: '^18',
    'react-dom': '^18',
    '@fluentui/react-components': '^9.0.0',
  },
  optionalDependencies: {
    '@fluentui/react-icons': 'latest',
  },
  devDependencies: {},
} satisfies Pick<Data, 'provider' | 'bundler' | 'requiredDependencies' | 'optionalDependencies' | 'devDependencies'>;

export interface OpenInSandboxProps {
  /** Story export carrying the build-injected source. */
  story: { parameters?: { fullSource?: string; cssModuleSources?: Data['cssModuleSources'] } };
  /** Name of the story's exported binding, known statically by the page. */
  exportToken: string;
  /** Human-readable label used as the sandbox description. */
  description: string;
}

/**
 * Opens the example in an online sandbox (design D5).
 *
 * Uses the addon's host-agnostic API: no Storybook runtime, no workbench DOM. The
 * document is supplied explicitly rather than taken from a global (repo rule #3).
 */
export function OpenInSandbox({ story, exportToken, description }: OpenInSandboxProps) {
  const [error, setError] = useState<string | null>(null);

  const storyFile = story.parameters?.fullSource;

  if (!storyFile) {
    return null;
  }

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const targetDocument = event.currentTarget.ownerDocument;

    try {
      setError(null);

      const data: Data = {
        ...SANDBOX_CONFIG,
        storyFile,
        storyExportToken: exportToken,
        title: 'FluentUI React v9',
        description,
        dependencies: getDependencies(
          storyFile,
          SANDBOX_CONFIG.requiredDependencies,
          SANDBOX_CONFIG.optionalDependencies,
        ),
        cssModuleSources: story.parameters?.cssModuleSources,
      };

      const files = scaffold[data.bundler](data);
      const open = data.provider === 'stackblitz-cloud' ? openStackblitz : openCodeSandbox;

      open({ ...data, files, targetDocument });
    } catch (cause) {
      // Surface the failure rather than leaving the reader with a dead button.
      setError(cause instanceof Error ? cause.message : 'Could not open the sandbox.');
    }
  };

  return (
    <div className="my-2">
      <button type="button" onClick={handleClick} className="rounded-md border px-3 py-1.5 text-sm">
        Open in CodeSandbox
      </button>
      {error ? (
        <p role="alert" className="mt-2 text-sm text-red-600">
          {error}
        </p>
      ) : null}
    </div>
  );
}
