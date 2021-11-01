import * as React from 'react';
import { Tooltip } from '../Tooltip'; // codesandbox-dependency: @fluentui/react-tooltip ^9.0.0-beta

export const Controlled = () => {
  const [tooltipVisible, setTooltipVisible] = React.useState(false);
  return (
    <>
      <Tooltip content="The visibility of this tooltip is controlled by the parent component" visible={tooltipVisible}>
        <button onClick={() => setTooltipVisible(v => !v)}>Toggle tooltip</button>
      </Tooltip>
    </>
  );
};
