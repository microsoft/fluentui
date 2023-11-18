import * as React from 'react';
import { Field, ProgressBar } from '@fluentui/react-components';

const intervalDelay = 100;
const intervalIncrement = 1;

export const Max = () => {
  const [value, setValue] = React.useState(0);

  React.useEffect(() => {
    const id = setInterval(() => {
      setValue(value < 42 ? intervalIncrement + value : 0);
    }, intervalDelay);
    return () => {
      clearInterval(id);
    };
  });
  return (
    <Field validationMessage={`There have been ${value} files downloaded`} validationState="none">
      <ProgressBar max={42} value={value} />
    </Field>
  );
};

Max.parameters = {
  docs: {
    description: {
      story: `You can specify the maximum value of the determinate ProgressBar.
      This is useful for instances where you want to show capacity, or how much of a total has been
      uploaded/downloaded.`,
    },
  },
};
