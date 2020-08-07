import { STORY_RENDERED } from '@storybook/core-events';
import addons from '@storybook/addons';
import { FluentDesignSystemProvider } from '../design-system-provider';
import Examples from './fixtures/checkbox.html';
import { FluentCheckbox } from './';

// Prevent tree-shaking
FluentCheckbox;
FluentDesignSystemProvider;

addons.getChannel().addListener(STORY_RENDERED, (name: string) => {
  if (name.toLowerCase().startsWith('checkbox')) {
    setIndeterminate();
  }
});

function setIndeterminate(): void {
  document.querySelectorAll('.flag-indeterminate').forEach(el => {
    if (el instanceof FluentCheckbox) {
      el.indeterminate = true;
    }
  });
}

document.addEventListener('readystatechange', () => {
  if (document.readyState === 'complete') {
    setIndeterminate();
  }
});

export default {
  title: 'Checkbox',
};

export const Checkbox = (): string => Examples;
