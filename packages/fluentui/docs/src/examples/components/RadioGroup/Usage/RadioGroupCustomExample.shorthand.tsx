import * as React from 'react';
import { Divider, RadioGroup, Input, Flex } from '@fluentui/react-northstar';
import { useBooleanKnob } from '@fluentui/docs-components';

const RadioGroupCustomExample = props => {
  const [vertical] = useBooleanKnob({
    name: 'vertical',
    initialValue: false,
  });

  const [state, dispatch] = React.useReducer(
    (state, action) => {
      switch (action.type) {
        case 'UPDATE':
          return { ...state, ...action.payload };
        case 'UPDATE_VALUE':
          return { ...state, selectedValue: action.selectedValue };
        default:
          return state;
      }
    },
    {
      selectedValue: 'capricciosa',
      inputTabIndex: '-1',
    },
  );

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
              onFocus={() => {
                dispatch({ type: 'UPDATE_VALUE', selectedValue: 'custom' });
              }}
              input={{ tabIndex: state.inputTabIndex }}
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

  const handleChange = (e, props) =>
    dispatch({
      type: 'UPDATE',
      payload: { selectedValue: props.value, inputTabIndex: props.value === 'custom' ? '0' : '-1' },
    });

  return (
    <div>
      The selected value is: {state.selectedValue}
      <Divider />
      <RadioGroup
        checkedValue={state.selectedValue}
        defaultCheckedValue="capricciosa"
        items={items}
        vertical={vertical}
        onCheckedValueChange={handleChange}
      />
    </div>
  );
};

export default RadioGroupCustomExample;
