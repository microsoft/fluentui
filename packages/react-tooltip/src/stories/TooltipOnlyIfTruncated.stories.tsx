import * as React from 'react';
import { Tooltip } from '../Tooltip';

export const OnlyIfTruncated = () => {
  const textContainerRef = React.useRef<HTMLDivElement>(null);
  const [tooltipVisible, setTooltipVisible] = React.useState(false);
  const [wide, setWide] = React.useState(true);
  const text = 'The tooltip only shows if the text is truncated';
  return (
    <>
      <button onClick={() => setWide(w => !w)}>Toggle container width</button>
      <Tooltip
        content={text}
        relationship="description"
        visible={tooltipVisible}
        positioning="below"
        onVisibleChange={(_ev, { visible }) => {
          if (
            visible &&
            textContainerRef.current &&
            textContainerRef.current.scrollWidth <= textContainerRef.current.clientWidth &&
            textContainerRef.current.scrollHeight <= textContainerRef.current.clientHeight
          ) {
            // Don't show the tooltip if the textContainer's content is not truncated
            visible = false;
          }

          setTooltipVisible(visible);
        }}
      >
        <div
          ref={textContainerRef}
          tabIndex={0}
          style={{
            width: !wide ? '100px' : undefined,
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            border: '1px solid gray',
            padding: '4px',
          }}
        >
          {text}
        </div>
      </Tooltip>
    </>
  );
};
