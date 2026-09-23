// Workspace-source imports intentionally reuse the addon's pure helpers without expanding its public API.
import { getDependencies } from '../../../../packages/react-components/react-storybook-addon-export-to-sandbox/src/getDependencies';
import { scaffold } from '../../../../packages/react-components/react-storybook-addon-export-to-sandbox/src/sandbox-scaffold';
import type { Data } from '../../../../packages/react-components/react-storybook-addon-export-to-sandbox/src/sandbox-utils';

export type { Data };

/** Scaffold the shared example and hand it to StackBlitz using the clicked button's document. */
export function openInStackBlitz(
  data: Omit<Data, 'dependencies' | 'provider' | 'bundler'>,
  targetDocument: Document,
): void {
  const files = scaffold.vite({
    ...data,
    provider: 'stackblitz-cloud',
    bundler: 'vite',
    dependencies: getDependencies(data.storyFile, data.requiredDependencies, data.optionalDependencies),
  });
  const form = targetDocument.createElement('form');
  form.method = 'post';
  form.target = '_blank';
  form.action = 'https://stackblitz.com/run?file=src%2Fexample.tsx';

  const fields = {
    'project[template]': 'node',
    'project[title]': data.title,
    'project[description]': `# ${data.description}`,
    ...Object.fromEntries(Object.entries(files).map(([name, content]) => [`project[files][${name}]`, content])),
  };
  for (const [name, value] of Object.entries(fields)) {
    const input = targetDocument.createElement('input');
    input.type = 'hidden';
    input.name = name;
    input.value = value;
    form.appendChild(input);
  }

  targetDocument.body.appendChild(form);
  try {
    form.submit();
  } finally {
    form.remove();
  }
}
