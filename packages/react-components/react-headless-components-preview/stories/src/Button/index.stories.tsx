import { Button } from '@fluentui/react-headless-components-preview/button';
import type { FluentParameters } from '@fluentui/react-storybook-addon';

import descriptionMd from './ButtonDescription.md';
export { Default } from './ButtonDefault.stories';

export default {
  title: 'Components/Button',
  component: Button,
  parameters: {
    reactStorybookAddon: {
      docs: {
        dataAttributes: {
          attributes: {
            root: {
              disabled: 'data-disabled',
              disabledFocusable: 'data-disabled-focusable',
              iconOnly: 'data-icon-only',
              iconPosition: 'data-icon-position',
            },
          },
          values: { root: { iconPosition: ['before', 'after'] } },
        },
      },
    },
    docs: {
      description: {
        component: descriptionMd,
      },
    },
  } satisfies FluentParameters,
};
