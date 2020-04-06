import * as React from 'react';
import { Toggle } from 'office-ui-fabric-react/lib/Toggle';
import { Label } from 'office-ui-fabric-react/lib/Label';
import { TooltipHost, TooltipOverflowMode, ITooltipHostStyles } from 'office-ui-fabric-react/lib/Tooltip';
import { mergeStyleSets, getTheme } from 'office-ui-fabric-react/lib/Styling';
import { css } from 'office-ui-fabric-react/lib/Utilities';
import { useId } from '@uifabric/react-hooks';

const contentParent =
  "If the parent element's content overflows, hovering here will show a tooltip (anchored to the parent element).";
const contentSelf =
  "If the TooltipHost's content overflows, hovering here will show a tooltip (anchored to the TooltipHost).";

// The TooltipHost uses display: inline by default, which causes issues with this example's
// styling and layout. Use display: block instead. (other styles are just to look nice)
const theme = getTheme();
const hostStyles: Partial<ITooltipHostStyles> = {
  root: { display: 'block', padding: 10, backgroundColor: theme.palette.themeLighter },
};
const classNames = mergeStyleSets({
  // Applied to make content overflow (and tooltips activate)
  overflow: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    width: 200,
  },
  // Just to look nice
  example: { marginTop: 20, selectors: { '> *:first-child': { paddingBottom: 10 } } },
  parent: {
    padding: 10,
    border: '2px dashed ' + theme.palette.neutralTertiary,
    selectors: { '> *:last-child': { marginTop: 10 } },
  },
});

export const TooltipOverflowExample: React.FunctionComponent = () => {
  const parentTooltipId = useId('text-tooltip');
  const [shouldOverflow, setShouldOverflow] = React.useState(false);
  const [isParentTooltipVisible, setIsParentTooltipVisible] = React.useState(false);

  const onOverflowChange = React.useCallback(() => setShouldOverflow(!shouldOverflow), [shouldOverflow]);

  return (
    <div>
      <Toggle label="Force text to overflow" inlineLabel checked={shouldOverflow} onChange={onOverflowChange} />

      {/* Example of TooltipOverflowMode.Parent */}
      <div className={classNames.example}>
        <Label>Show tooltip when parent's content overflows</Label>

        {/* This parent element will overflow */}
        <div className={css(classNames.parent, shouldOverflow && classNames.overflow)}>
          This is the parent element.
          <TooltipHost
            overflowMode={TooltipOverflowMode.Parent}
            // In a case like this, you should usually display the non-truncated content in the tooltip.
            content={contentParent}
            // If targeting the tooltip to the parent, it's necessary to manually set and remove
            // aria-describedby for the content when the tooltip is shown/hidden
            onTooltipToggle={setIsParentTooltipVisible}
            id={parentTooltipId}
            styles={hostStyles}
          >
            This is the TooltipHost area.{' '}
            <span aria-describedby={isParentTooltipVisible ? parentTooltipId : undefined}>{contentParent}</span>
          </TooltipHost>
        </div>
      </div>

      {/* Example of TooltipOverflowMode.Self */}
      <div className={classNames.example}>
        <Label>Show tooltip when TooltipHost's content overflows</Label>

        <TooltipHost
          overflowMode={TooltipOverflowMode.Self}
          // The TooltipHost itself will overflow
          hostClassName={css(shouldOverflow && classNames.overflow)}
          content={contentSelf}
          onTooltipToggle={setIsParentTooltipVisible}
          styles={hostStyles}
          // In this mode, aria-describedby is automatically added/removed based on tooltip visibility
        >
          This is the TooltipHost area. {contentSelf}
        </TooltipHost>
      </div>
    </div>
  );
};
