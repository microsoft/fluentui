import * as React from 'react';
import { Toggle } from '@fluentui/react/lib/Toggle';
import { Label } from '@fluentui/react/lib/Label';
import { TooltipHost, TooltipOverflowMode, ITooltipHostStyles } from '@fluentui/react/lib/Tooltip';
import { mergeStyleSets, getTheme } from '@fluentui/react/lib/Styling';
import { css } from '@fluentui/react/lib/Utilities';
import { useId } from '@fluentui/react-hooks';

const contentParent =
  "If the parent element's content overflows, hovering here will show a tooltip (anchored to the parent element).";
const contentSelf =
  "If the TooltipHost's content overflows, hovering here will show a tooltip (anchored to the TooltipHost).";

const contentLink =
  "If the link's content overflows, hovering or focusing here will show a tooltip (anchored to the TooltipHost).";

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
  // links are inline by default, so this allows the link to have overflow styles
  link: {
    display: 'inline-block',
  },
});

export const TooltipOverflowExample: React.FunctionComponent = () => {
  const parentTooltipId = useId('text-tooltip');
  const [shouldOverflow, setShouldOverflow] = React.useState(false);
  const linkRef = React.useRef<HTMLAnchorElement>(null);

  const onOverflowChange = React.useCallback(() => setShouldOverflow(!shouldOverflow), [shouldOverflow]);

  return (
    <div>
      <Toggle label="Force text to overflow" inlineLabel checked={shouldOverflow} onChange={onOverflowChange} />

      {/* Example of TooltipOverflowMode.Parent */}
      <div className={classNames.example}>
        <Label>Show tooltip when parent's content overflows</Label>
        <p>
          Warning! This is not keyboard accessible, and should only be done when users have another method to access the
          content.
        </p>

        {/* This parent element will overflow */}
        <div className={css(classNames.parent, shouldOverflow && classNames.overflow)}>
          This is the parent element.
          <TooltipHost
            overflowMode={TooltipOverflowMode.Parent}
            // In a case like this, you should usually display the non-truncated content in the tooltip.
            content={contentParent}
            id={parentTooltipId}
            styles={hostStyles}
          >
            This is the TooltipHost area. {contentParent}
          </TooltipHost>
        </div>
      </div>

      {/* Example of TooltipOverflowMode.Self */}
      <div className={classNames.example}>
        <Label>Show tooltip when TooltipHost's content overflows</Label>
        <p>
          Warning! This is not keyboard accessible, and should only be done when users have another method to access the
          content.
        </p>

        <TooltipHost
          overflowMode={TooltipOverflowMode.Self}
          // The TooltipHost itself will overflow
          hostClassName={css(shouldOverflow && classNames.overflow)}
          content={contentSelf}
          styles={hostStyles}
        >
          This is the TooltipHost area. {contentSelf}
        </TooltipHost>
      </div>

      {/* Example of TooltipOverflowMode.Custom */}
      <div className={classNames.example}>
        <Label>Show tooltip when a child link's content overflows</Label>
        <p>Note: This is the only way to create an overflow tooltip that is keyboard-accessible.</p>

        <TooltipHost
          overflowMode={TooltipOverflowMode.Custom}
          customOverflowTarget={linkRef.current}
          content={contentSelf}
          styles={hostStyles}
        >
          <a href="#" ref={linkRef} className={css(classNames.link, shouldOverflow && classNames.overflow)}>
            This is a link in the TooltipHost area. {contentLink}
          </a>
        </TooltipHost>
      </div>
    </div>
  );
};
