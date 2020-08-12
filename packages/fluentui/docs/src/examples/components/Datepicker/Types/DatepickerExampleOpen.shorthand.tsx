import { useBooleanKnob } from '@fluentui/docs-components';
import * as React from 'react';
import { Datepicker } from '@fluentui/react-northstar';

const PopupControlledExample = () => {
  const [open] = useBooleanKnob({ name: 'open' });

  return <Datepicker calendarOpenState={open} />;
};

export default PopupControlledExample;
