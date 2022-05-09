import * as React from 'react';

import { Tooltip, TooltipProps } from '../Tooltip';
import { Button } from '@fluentui/react-button';
import { SlideTextRegular } from '@fluentui/react-icons';

export const CustomMount = (props: Partial<TooltipProps>) => {
  const [ref, setRef] = React.useState<HTMLElement | null>();

  return (
    <>
      <Tooltip mountNode={ref} content="Example tooltip" relationship="label" {...props}>
        <Button icon={<SlideTextRegular />} size="large" />
      </Tooltip>
      <div ref={setRef} />
    </>
  );
};

CustomMount.parameters = {
  docs: {
    description: {
      story: `Tooltips are rendered in a React Portal. By default that Portal is the outermost div.
      A custom \`mountNode\` can be provided in the case that the tooltip needs to be rendered elsewhere.`,
    },
  },
};
