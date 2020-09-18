import * as React from 'react';
import { Divider, RadioGroup, Input, Flex } from '@fluentui/react-northstar';
import { useBooleanKnob } from '@fluentui/docs-components';

const RadioGroupCustomExample = props => {
  const [vertical] = useBooleanKnob({
    name: 'vertical',
    initialValue: false,
  });

  const [checkedValue, setCheckedValue] = React.useState('');

  const items = [
    { name: 'pizza', key: 'Capricciosa', label: 'Capricciosa', value: 'capricciosa' },
    {
      name: 'pizza',
      key: 'Prosciutto',
      label: 'Prosciutto',
      value: 'prosciutto',
      disabled: true,
    },
    {
      name: 'pizza',
      key: 'Custom',
      label: 'Choose your own',
      children: (Component, { key, ...props }) => {
        return (
          <Flex key={key} inline>
            <Component {...props} />
            <Input
              onFocus={() => setCheckedValue('custom')}
              input={{ tabIndex: checkedValue === 'custom' ? '0' : '-1' }}
              inline
              placeholder="flavour"
            />
          </Flex>
        );
      },
      value: 'custom',
      'aria-label': 'Press Tab to change flavour',
    },
  ];

  return (
    <div>
      The selected value is: {selectedValue}
      <Divider />
      <RadioGroup
        checkedValue={checkedValue}
        defaultCheckedValue="capricciosa"
        items={items}
        vertical={vertical}
        onCheckedValueChange={(e, data)=> setCheckedValue(data.value)}
      />
    </div>
  );
};

export default RadioGroupCustomExample;
