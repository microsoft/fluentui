import * as React from 'react';
import { Checkbox, CheckboxProps } from './index';

export const Default = (props: CheckboxProps) => <Checkbox {...props} />;
Default.argTypes = {
  label: {
    control: 'text',
    defaultValue: 'Checkbox',
    type: 'string',
  },
  checked: {
    control: {
      type: 'inline-radio',
      options: [undefined, false, true, 'mixed'],
    },
  },
  size: {
    control: {
      type: 'inline-radio',
    },
  },
  defaultChecked: {
    control: {
      type: 'inline-radio',
      options: [false, true, 'mixed'],
    },
  },
};

export const Label = () => <Checkbox label="Labeled checkbox" />;
Label.parameters = {
  docs: {
    description: {
      story:
        'A checkbox can have a label with the `label` slot instead of an external `<label>` element. The benefit of ' +
        'using the slot is that styling such as padding, and hover/disabled colors are handled automatically.',
    },
  },
};

export const Large = () => <Checkbox size="large" label="Large checkbox" />;
Large.parameters = {
  docs: {
    description: {
      story: 'A checkbox can be large in size.',
    },
  },
};

export const Circular = () => <Checkbox circular label="Circular checkbox" />;
Circular.parameters = {
  docs: {
    description: {
      story:
        'A checkbox can have a circular shape. This variant is **strongly discourged** outside of a tasks ' +
        'experience, since it could be confused for a `RadioItem`.',
    },
  },
};

export const LabelBefore = () => <Checkbox labelPosition="before" label="Label before the checkbox" />;
LabelBefore.parameters = {
  docs: {
    description: {
      story: 'The label can be placed in front of the checkbox.',
    },
  },
};

export const Required = () => <Checkbox required label="Required checkbox" />;
Required.parameters = {
  docs: {
    description: {
      story: 'When a checkbox is marked as `required`, its label also gets the required styling.',
    },
  },
};

export const Disabled = () => <Checkbox disabled label="Disabled checkbox" />;
Disabled.parameters = {
  docs: {
    description: {
      story: 'A checkbox can be disabled.',
    },
  },
};

export const Checked = () => <Checkbox defaultChecked label="Checked checkbox" />;
Checked.parameters = {
  docs: {
    description: {
      story: 'A checkbox can be checked by default using `defaultChecked`, or controlled via the `checked` property.',
    },
  },
};

export const Mixed = () => <Checkbox defaultChecked="mixed" label="Mixed checkbox" />;
Checked.parameters = {
  docs: {
    description: {
      story:
        'A checkbox can be mixed (also known as indeterminate) by default using `defaultChecked="mixed"`, ' +
        'or controlled via `checked="mixed"`',
    },
  },
};

export const ExternalLabel = () => (
  <div style={{ display: 'flex', flexDirection: 'column', padding: '8px' }}>
    <Checkbox id="exampleCheckbox" />
    <label htmlFor="exampleCheckbox">This is an external label</label>
  </div>
);
ExternalLabel.parameters = {
  docs: {
    description: {
      story:
        "An external `<label>` element or `<Label>` component can be used via the checkbox's `id` and the label's " +
        "`htmlFor` property, just as with any HTML checkbox. However, the external label won't have padding or other " +
        'styling applied.',
    },
  },
};

export default {
  title: 'Components/Checkbox',
  component: Checkbox,
};
