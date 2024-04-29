import { getParameters } from 'codesandbox-import-utils/lib/api/define';

import { scaffold } from './sandbox-scaffold';
import { addHiddenInput, prepareData, prepareSandboxContainer, type Data } from './sandbox-utils';
import { StoryContext } from './types';

const defaultFileToPreview = encodeURIComponent('src/example.tsx');

const actionConfig = {
  'codesandbox-cloud': {
    label: 'CodeSandbox',
    factory: (files: Record<string, string>, config: Data) => openCodeSandbox({ files, ...config }),
  },
  'codesandbox-browser': {
    label: 'CodeSandbox',
    factory: (files: Record<string, string>, config: Data) => openCodeSandbox({ files, ...config }),
  },
  'stackblitz-cloud': {
    label: 'Stackblitz',
    factory: (files: Record<string, string>, config: Data) => openStackblitz({ files, ...config }),
  },
};

export function addDemoActionButton(context: StoryContext) {
  const { container, cssClasses } = prepareSandboxContainer(context);
  const config = prepareData(context);
  if (!config) {
    throw new Error('issues with data');
  }

  addActionButton(container, config, cssClasses);
}

function addActionButton(container: HTMLElement, config: Data, classList: string[]) {
  const files = scaffold[config.bundler](config);
  const action = actionConfig[config.provider];

  const button = document.createElement('button');
  button.classList.add(...classList);
  button.textContent = `Open in ${action.label}`;

  container?.prepend(button);

  button.addEventListener('click', _ev => {
    action.factory(files, config);
  });
}

/**
 *
 * @see https://developer.stackblitz.com/docs/platform/post-api/
 */
function openStackblitz(data: { files: Record<string, string> } & Data) {
  const { files, description, title } = data;
  const form = document.createElement('form');
  form.method = 'post';
  form.target = '_blank';
  form.action = `https://stackblitz.com/run?file=${defaultFileToPreview}`;
  // node template - boots web-container
  addHiddenInput(form, 'project[template]', 'node');
  addHiddenInput(form, 'project[title]', title);
  addHiddenInput(form, 'project[description]', `# ${description}`);

  Object.keys(files).forEach(key => {
    const value = files[key];
    addHiddenInput(form, `project[files][${key}]`, value);
  });

  document.body.appendChild(form);
  form.submit();
  document.body.removeChild(form);
}

/**
 *
 * @see https://codesandbox.io/docs/learn/sandboxes/cli-api#define-api
 */
function openCodeSandbox({ files, provider }: { files: Record<string, string> } & Data) {
  const normalizedFilesApi = Object.entries(files).reduce((acc, current) => {
    acc[current[0]] = { isBinary: false, content: current[1] };
    return acc;
  }, {} as Record<string, { content: string; isBinary: boolean }>);

  const env = provider === 'codesandbox-cloud' ? 'server' : 'browser';
  const parameters = getParameters({ files: normalizedFilesApi });

  const form = document.createElement('form');
  form.method = 'POST';
  form.target = '_blank';
  form.action = `https://codesandbox.io/api/v1/sandboxes/define?environment=${env}`;

  addHiddenInput(form, 'parameters', parameters);
  addHiddenInput(form, 'query', `file=${defaultFileToPreview}`);
  document.body.appendChild(form);
  form.submit();
  document.body.removeChild(form);
}
