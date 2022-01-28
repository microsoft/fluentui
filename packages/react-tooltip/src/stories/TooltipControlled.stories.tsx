import * as React from 'react';
import { Tooltip } from '../Tooltip';

export const Controlled = () => {
  const [tooltipVisible, setTooltipVisible] = React.useState(false);
  return (
    <>
      <Tooltip
        content="The visibility of this tooltip is controlled by the parent component"
        relationship="description"
        visible={tooltipVisible}
      >
        <button onClick={() => setTooltipVisible(v => !v)}>Toggle tooltip</button>
      </Tooltip>
    </>
  );
};
