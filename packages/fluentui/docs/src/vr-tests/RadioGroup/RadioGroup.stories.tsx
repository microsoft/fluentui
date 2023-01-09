import * as React from 'react';
import { ComponentMeta } from '@storybook/react';
import { Divider, RadioGroup } from '@fluentui/react-northstar';
import RadioGroupItemExample from '../../examples/components/RadioGroup/Item/RadioGroupItemExample.shorthand';
import RadioGroupItemExampleCheckedShorthand from '../../examples/components/RadioGroup/Item/RadioGroupItemExampleChecked.shorthand';
import RadioGroupItemExampleDisabledShorthand from '../../examples/components/RadioGroup/Item/RadioGroupItemExampleDisabled.shorthand';
import RadioGroupExampleRtl from '../../examples/components/RadioGroup/Rtl/RadioGroupExample.rtl';
import RadioGroupCustomExample from '../../examples/components/RadioGroup/Usage/RadioGroupCustomExample.shorthand';

const RadioGroupColorPickerExample = () => {
  const [selectedValue, setSelectedValue] = React.useState<string | number>('');

  return (
    <div>
      The selected value is: {selectedValue}
      <Divider />
      <RadioGroup
        defaultCheckedValue="pink"
        items={['pink', 'blue', 'green', 'red', 'orange'].map(color => ({
          key: color,
          value: color,
          name: color,
          'aria-label': color,
          variables: {
            indicatorColorDefault: color,
            indicatorBackgroundColorChecked: color,
            indicatorBorderColorDefaultHover: color,
          },
        }))}
        onCheckedValueChange={(e, props) => setSelectedValue(props.value)}
      />
    </div>
  );
};

export default { component: RadioGroup, title: 'RadioGroup' } as ComponentMeta<typeof RadioGroup>;

export {
  RadioGroupItemExample,
  RadioGroupItemExampleCheckedShorthand,
  RadioGroupItemExampleDisabledShorthand,
  RadioGroupExampleRtl,
  RadioGroupColorPickerExample,
  RadioGroupCustomExample,
};
