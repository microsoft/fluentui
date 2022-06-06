import * as React from 'react';
import { IIconProps, initializeIcons } from '@fluentui/react';
import { TooltipHost, ITooltipHostStyles } from '@fluentui/react/lib/Tooltip';
import { IconButton } from '@fluentui/react/lib/Button';
import { useId } from '@fluentui/react-hooks';

export interface IButtonExampleProps {
  // These are set based on the toggles shown above the examples (not needed in real code)
  disabled?: boolean;
  checked?: boolean;
}
// Initialize icons in case this example uses them
initializeIcons();

const emojiIcon: IIconProps = { iconName: 'Emoji2' };

const calloutProps = { gapSpace: 0 };
// The TooltipHost root uses display: inline by default.
// If that's causing sizing issues or tooltip positioning issues, try overriding to inline-block.
const hostStyles: Partial<ITooltipHostStyles> = { root: { display: 'inline-block' } };

export const ButtonIconWithTooltipExample: React.FunctionComponent<IButtonExampleProps> = props => {
  // Use useId() to ensure that the ID is unique on the page.
  // (It's also okay to use a plain string and manually ensure uniqueness.
  const tooltipId = useId('tooltip');

  const { disabled, checked } = props;

  return (
    <div>
      <TooltipHost
        content="Emoji"
        // This id is used on the tooltip itself, not the host
        // (so an element with this id only exists when the tooltip is shown)
        id={tooltipId}
        calloutProps={calloutProps}
        styles={hostStyles}
        setAriaDescribedBy={false}
      >
        <IconButton iconProps={emojiIcon} aria-label="Emoji" disabled={disabled} checked={checked} />
      </TooltipHost>
      <p>
        For now, we advise you to take this approach of wrapping IconButton with a Tooltip. We'll address providing this
        behavior out of the box in next version of this component in Fluent.
      </p>
    </div>
  );
};
