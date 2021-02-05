import { Checkbox } from '@fluentui/react-northstar';
import * as React from 'react';

const CheckboxExampleCheckedMixed = () => {
  const [sandwichState, dispatch] = React.useReducer(
    (state, action) => {
      return { ...state, ...action };
    },
    {
      lettuce: false,
      tomato: false,
      ketchup: false,
    },
  );
  const isMixed =
    Object.values(sandwichState).every(Boolean) || (Object.values(sandwichState).some(Boolean) ? 'mixed' : false);

  return (
    <>
      <Checkbox
        checked={isMixed}
        aria-controls="lettuce tomato ketchup"
        onChange={(e, { checked }) => {
          dispatch({ lettuce: checked, tomato: checked, ketchup: checked });
        }}
        label="All Sandwich Condiments selected"
        id="all"
      />
      <Checkbox
        checked={sandwichState.lettuce}
        onChange={(e, { checked }) => {
          dispatch({ lettuce: checked });
        }}
        id="lettuce"
        label="Lettuce"
      />
      <Checkbox
        checked={sandwichState.tomato}
        onChange={(e, { checked }) => {
          dispatch({ tomato: checked });
        }}
        id="tomato"
        label="Tomato"
      />
      <Checkbox
        checked={sandwichState.ketchup}
        onChange={(e, { checked }) => {
          dispatch({ ketchup: checked });
        }}
        id="ketchup"
        label="ketchup"
      />
    </>
  );
};

export default CheckboxExampleCheckedMixed;
