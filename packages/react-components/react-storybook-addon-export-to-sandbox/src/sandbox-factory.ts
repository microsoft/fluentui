import { getParameters } from 'codesandbox-import-utils/lib/api/define';

import type { Data } from './public-types';
import { scaffold } from './sandbox-scaffold';
import { addHiddenInput, prepareData, prepareSandboxContainers } from './sandbox-utils';
import { StoryContext } from './types';

const defaultFileToPreview = encodeURIComponent('src/example.tsx');

/** Options for opening a scaffolded sandbox from any host. */
export type OpenSandboxOptions = Data & {
  files: Record<string, string>;
  /** Document used to perform the form-post handoff (repo rule #3 — never ambient). */
  targetDocument: Document;
};

// SVG icon: external link (box with arrow pointing upper-right), similar to Storybook's native "open in new tab" icon
const externalLinkIconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 14" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align: middle; margin-right: 4px;"><path d="M11 8.5v3a1 1 0 0 1-1 1H2.5a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1H6"/><path d="M8.5 1.5H13v4.5"/><path d="M13 1.5 6.5 8"/></svg>`;

const actionConfig = {
  'codesandbox-cloud': {
    label: 'CodeSandbox',
    factory: (options: OpenSandboxOptions) => openCodeSandbox(options),
  },
  'codesandbox-browser': {
    label: 'CodeSandbox',
    factory: (options: OpenSandboxOptions) => openCodeSandbox(options),
  },
  'stackblitz-cloud': {
    label: 'Stackblitz',
    factory: (options: OpenSandboxOptions) => openStackblitz(options),
  },
};

export function addDemoActionButtons(context: StoryContext) {
  const config = prepareData(context);
  if (!config) {
    throw new Error('issues with data');
  }

  prepareSandboxContainers(context).forEach(({ container, cssClasses }) => {
    const files = scaffold[config.bundler](config);
    const action = actionConfig[config.provider];
    const targetDocument = container.ownerDocument;

    if (context.parameters.openInNewTab !== false) {
      addButton({
        container,
        classList: cssClasses,
        markerClass: 'with-open-in-new-tab-button',
        content: `${externalLinkIconSvg} Open in new tab`,
        onClick: () => {
          targetDocument.defaultView?.open(
            `./iframe.html?id=${encodeURIComponent(context.id)}&viewMode=story`,
            '_blank',
          );
        },
      });
    }

    addButton({
      container,
      classList: cssClasses,
      markerClass: 'with-code-sandbox-button',
      content: `${externalLinkIconSvg} Open in ${action.label}`,
      onClick: () => {
        action.factory({ files, targetDocument, ...config });
      },
    });
  });
}

function addButton(options: {
  container: HTMLElement;
  classList: string[];
  markerClass: string;
  content: string;
  onClick: () => void;
}) {
  const { container, classList, markerClass, content, onClick } = options;
  const buttonClassList = classList.map(cls => (cls === 'with-code-sandbox-button' ? markerClass : cls));

  const button = container.ownerDocument.createElement('button');
  button.classList.add(...buttonClassList);
  button.innerHTML = content;

  container.prepend(button);

  button.addEventListener('click', onClick);
}

function submitForm(form: HTMLFormElement, targetDocument: Document) {
  targetDocument.body.appendChild(form);
  form.submit();
  targetDocument.body.removeChild(form);
}

/**
 * Opens a scaffolded project in StackBlitz.
 *
 * Host-agnostic: depends only on the supplied document, never on Storybook.
 *
 * @see https://developer.stackblitz.com/docs/platform/post-api/
 */
export function openStackblitz(data: OpenSandboxOptions) {
  const { files, description, title, targetDocument } = data;
  const form = targetDocument.createElement('form');
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

  submitForm(form, targetDocument);
}

/**
 * Opens a scaffolded project in CodeSandbox.
 *
 * Host-agnostic: depends only on the supplied document, never on Storybook.
 *
 * @see https://codesandbox.io/docs/learn/sandboxes/cli-api#define-api
 */
export function openCodeSandbox({ files, provider, targetDocument }: OpenSandboxOptions) {
  const normalizedFilesApi = Object.entries(files).reduce((acc, current) => {
    acc[current[0]] = { isBinary: false, content: current[1] };
    return acc;
  }, {} as Record<string, { content: string; isBinary: boolean }>);

  const env = provider === 'codesandbox-cloud' ? 'server' : 'browser';
  const parameters = getParameters({ files: normalizedFilesApi });

  const form = targetDocument.createElement('form');
  form.method = 'POST';
  form.target = '_blank';
  form.action = `https://codesandbox.io/api/v1/sandboxes/define?environment=${env}`;

  addHiddenInput(form, 'parameters', parameters);
  addHiddenInput(form, 'query', `file=${defaultFileToPreview}`);

  submitForm(form, targetDocument);
}
