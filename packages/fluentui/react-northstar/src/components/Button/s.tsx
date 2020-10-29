import * as React from 'react';
import { useButton, MyIcon } from '@fluentui/react-northstar';

const CallingButton = React.forwardRef((props, ref) => {
  const { state, render } = useButton(props, ref, { icon: MyIcon });
  return render(state);
});

const CallingButton = <Button components={{ icon: MyIcon }} />;
