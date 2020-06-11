import * as React from 'react';
import { Slider, SliderProps, Flex, Form, Label } from '@fluentui/react-northstar';

const CustomSlider: React.FunctionComponent<SliderProps> = props => {
  const [value, setValue] = React.useState<string>('35');
  return (
    <Flex inline hAlign="center" vAlign="center" gap="gap.smaller">
      <Slider min="18" value={value} onChange={(e, data) => setValue(data.value)} {...props} />
      <Label content={value} />
    </Flex>
  );
};

const SliderExampleFormShorthand = () => (
  <Form
    onSubmit={() => alert('Form submitted')}
    fields={[
      {
        label: 'First name',
        name: 'firstName',
        id: 'first-name-shorthand',
        key: 'first-name',
      },
      {
        label: 'Last name',
        name: 'lastName',
        id: 'last-name-shorthand',
        key: 'last-name',
      },
      {
        label: 'Age',
        control: { as: CustomSlider },
        id: 'age-shorthand',
        key: 'age',
      },
    ]}
  />
);

export default SliderExampleFormShorthand;
