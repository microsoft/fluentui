import * as React from 'react';
import { TooltipHost, ITooltipHostStyles } from 'office-ui-fabric-react/lib/Tooltip';
import { getTheme } from 'office-ui-fabric-react/lib/Styling';
import { useId } from '@uifabric/react-hooks';

const theme = getTheme();
const buttonStyle = { fontSize: theme.fonts.medium.fontSize, padding: 10 };
const calloutProps = { gapSpace: 0 };

// Important for correct positioning--see below
const inlineBlockStyle: Partial<ITooltipHostStyles> = {
  root: { display: 'inline-block' },
};

export const TooltipDisplayExample: React.FunctionComponent = () => {
  // Use useId() to ensure that the ID is unique on the page.
  // (It's also okay to use a plain string and manually ensure uniqueness.)
  const tooltip1Id = useId('tooltip1');
  const tooltip2Id = useId('tooltip2');

  return (
    <div>
      In some cases when a TooltipHost is wrapping <code>inline-block</code> or <code>inline</code> elements, the
      positioning of the Tooltip may be off. In these cases, it's recommended to set the TooltipHost's{' '}
      <code>display</code> property to <code>inline-block</code>, as in the following example.
      <br />
      <br />
      <TooltipHost content="Incorrect positioning" id={tooltip1Id} calloutProps={calloutProps}>
        <button style={buttonStyle} aria-describedby={tooltip1Id}>
          Hover for incorrect positioning
        </button>
      </TooltipHost>{' '}
      <TooltipHost
        content="Correct positioning"
        // This is the important part!
        styles={inlineBlockStyle}
        id={tooltip2Id}
        calloutProps={calloutProps}
      >
        <button style={buttonStyle} aria-describedby={tooltip2Id}>
          Hover for correct positioning
        </button>
      </TooltipHost>
    </div>
  );
};
