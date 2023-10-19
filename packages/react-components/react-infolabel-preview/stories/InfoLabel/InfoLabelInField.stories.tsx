import * as React from 'react';

import { Field, Input, LabelProps, makeStyles } from '@fluentui/react-components';
import { InfoLabel } from '@fluentui/react-infolabel-preview';

const useStyles = makeStyles({
  infoLabelSurface: {
    // Since we render the Popover inline and Input uses position: relative, we need to set a zIndex. If we don't,
    // the Popover surface will render behind the input. See #27891 for more details.
    zIndex: 1,
  },
});

export const InField = () => {
  const styles = useStyles();

  return (
    <Field
      label={{
        children: (_: unknown, props: LabelProps) => (
          <InfoLabel {...props} info={{ children: 'Example info', className: styles.infoLabelSurface }}>
            Field with info label
          </InfoLabel>
        ),
      }}
    >
      <Input />
    </Field>
  );
};

InField.storyName = 'In a Field';
InField.parameters = {
  docs: {
    description: {
      story:
        'An `InfoLabel` can be used in a `Field` by rendering the label prop as an InfoLabel. This uses the slot ' +
        '[render function]' +
        '(./?path=/docs/concepts-developer-customizing-components-with-slots--page#replacing-the-entire-slot) ' +
        'support. See the code from this story for an example.',
    },
  },
};
