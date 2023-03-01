import * as React from 'react';
import { Keys, StoryWright, Steps } from 'storywright';
import { ComponentMeta } from '@storybook/react';
import { Divider, RadioGroup } from '@fluentui/react-northstar';
import { getThemeStoryVariant } from '../utilities';

const RadioGroupVerticalExample = () => {
  const [selectedValue, setSelectedValue] = React.useState('');

  const getItems = () => {
    return [
      {
        name: 'pizza',
        key: 'Capricciosa',
        label: 'Capricciosa',
        value: 'capricciosa',
      },
      {
        name: 'pizza',
        key: 'Prosciutto',
        label: 'Prosciutto',
        value: 'prosciutto',
        disabled: true,
      },
      {
        name: 'pizza',
        key: 'Pepperoni',
        label: 'Pepperoni',
        value: 'pepperoni',
      },
    ];
  };

  const handleChange = (e, props) => {
    setSelectedValue(props.value);
  };
  return (
    <div style={{ maxWidth: '400px' }}>
      The selected value is: {selectedValue}
      <Divider />
      <RadioGroup vertical defaultCheckedValue="prosciutto" items={getItems()} onCheckedValueChange={handleChange} />
    </div>
  );
};

export default {
  component: RadioGroup,
  title: 'RadioGroup',
  decorators: [
    story => (
      <StoryWright steps={new Steps().keys('body', Keys.tab).snapshot('Focuses item').end()}>{story()}</StoryWright>
    ),
  ],
} as ComponentMeta<typeof RadioGroup>;

const RadioGroupVerticalExampleTeams = getThemeStoryVariant(RadioGroupVerticalExample, 'teamsV2');

const RadioGroupVerticalExampleTeamsDark = getThemeStoryVariant(RadioGroupVerticalExample, 'teamsDarkV2');

const RadioGroupVerticalExampleTeamsHighContrast = getThemeStoryVariant(RadioGroupVerticalExample, 'teamsHighContrast');

export {
  RadioGroupVerticalExample,
  RadioGroupVerticalExampleTeams,
  RadioGroupVerticalExampleTeamsDark,
  RadioGroupVerticalExampleTeamsHighContrast,
};
