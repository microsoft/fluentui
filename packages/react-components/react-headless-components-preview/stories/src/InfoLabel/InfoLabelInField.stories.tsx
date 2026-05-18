import * as React from 'react';
import { Info16Regular } from '@fluentui/react-icons';
import { Field } from '@fluentui/react-headless-components-preview/field';
import { InfoLabel } from '@fluentui/react-headless-components-preview/info-label';
import { Input } from '@fluentui/react-headless-components-preview/input';
import type { LabelProps } from '@fluentui/react-headless-components-preview/label';

import fieldStyles from '../Field/field.module.css';
import infoLabelStyles from './info-label.module.css';
import inputStyles from '../Input/input.module.css';

export const InField = (): React.ReactNode => (
  <Field
    className={fieldStyles.field}
    label={{
      children: (_: unknown, props: LabelProps) => (
        <InfoLabel
          {...props}
          className={infoLabelStyles.infoLabel}
          info={{ className: infoLabelStyles.popover, children: 'Example info' }}
          infoButton={{ className: infoLabelStyles.infoButton, children: <Info16Regular /> }}
        >
          Field with info label
        </InfoLabel>
      ),
    }}
  >
    <Input className={inputStyles.wrap} input={{ className: inputStyles.input }} placeholder="Default input" />
  </Field>
);

InField.storyName = 'In a Field';
InField.parameters = {
  docs: {
    description: {
      story: 'An `InfoLabel` can be used in a `Field` by rendering the label prop as an InfoLabel.',
    },
  },
};
