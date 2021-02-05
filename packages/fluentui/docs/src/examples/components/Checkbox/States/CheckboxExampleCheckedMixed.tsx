import { Checkbox, CheckboxProps } from '@fluentui/react-northstar';
import * as React from 'react';

const CheckboxExampleCheckedMixed = () => {
  const [lettuceChecked, setLettuceCheck] = React.useState(false);
  const [tomatoChecked, setTomatoCheck] = React.useState(false);
  let checked: CheckboxProps['checked'] = lettuceChecked && tomatoChecked;
  if (!checked) {
    checked = !lettuceChecked && !tomatoChecked ? false : 'mixed';
  }
  return (
    <>
      <Checkbox
        checked={checked}
        controlsIds="lettuce tomato"
        onChange={(e, { checked }) => {
          setLettuceCheck(checked);
          setTomatoCheck(checked);
        }}
        label="All Sandwich Condiments selected"
      />
      <Checkbox
        checked={lettuceChecked}
        onChange={(e, { checked }) => {
          setLettuceCheck(checked);
        }}
        id="lettuce"
        label="Lettuce"
      />
      <Checkbox
        onChange={(e, { checked }) => {
          setTomatoCheck(checked);
        }}
        id="tomato"
        checked={tomatoChecked}
        label="Tomato"
      />
    </>
  );
};

export default CheckboxExampleCheckedMixed;
