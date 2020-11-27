import { Checkbox } from '@fluentui/react-northstar';
import * as React from 'react';

const CheckboxExampleChecked = () => {
  const [lettuceChecked, setLettuceCheck] = React.useState(false);
  const [tomatoChecked, setTomatoCheck] = React.useState(false);

  return (
    <>
      <Checkbox
        checked={lettuceChecked}
        indeterminate={(!tomatoChecked || !lettuceChecked) && !(!lettuceChecked && !tomatoChecked)}
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

export default CheckboxExampleChecked;
