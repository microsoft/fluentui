import * as React from 'react';
import { Button } from '@fluentui/react-button';
import { Meta } from '@storybook/react';

import descriptionMd from './ButtonDescription.md';
import bestPracticesMd from './ButtonBestPractices.md';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore - add link to this comment please  (see https://github.com/microsoft/fluentui/pull/18695)
export { Emphasis } from './ButtonEmphasis.stories';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore - add link to this comment please  (see https://github.com/microsoft/fluentui/pull/18695)
export { Default } from './ButtonDefault.stories';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore - add link to this comment please  (see https://github.com/microsoft/fluentui/pull/18695)
export { Disabled } from './ButtonDisabled.stories';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore - add link to this comment please  (see https://github.com/microsoft/fluentui/pull/18695)
export { WithIcon } from './ButtonWithIcon.stories';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore - add link to this comment please  (see https://github.com/microsoft/fluentui/pull/18695)
export { Circular } from './ButtonCircular.stories';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore - add link to this comment please  (see https://github.com/microsoft/fluentui/pull/18695)
export { Size } from './ButtonSize.stories';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore - add link to this comment please  (see https://github.com/microsoft/fluentui/pull/18695)
export { Block } from './ButtonBlock.stories';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore - add link to this comment please  (see https://github.com/microsoft/fluentui/pull/18695)
export { WithLongText } from './ButtonWithLongText.stories';

export default {
  title: 'Components/Button',
  component: Button,
  parameters: {
    docs: {
      description: {
        component: [descriptionMd, bestPracticesMd].join('\n'),
      },
    },
  },
} as Meta;
