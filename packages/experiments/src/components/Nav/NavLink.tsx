import * as React from 'react';
import { Icon } from 'office-ui-fabric-react/lib/components/Icon';
import { INavLinkProps } from './Nav.types';
import { IStyle, mergeStyles } from 'office-ui-fabric-react/lib/Styling';

/**
 * Represents a composed link in the Nav component.
 */
export const NavLink: React.SFC<INavLinkProps> = (props: INavLinkProps) => {
  if (!props) {
    return null;
  }

  const computedTextWidth: IStyle = {
    // 100px to accomodate left and right icons (50px each)
    width: 'calc(100% - 100px)'
  };

  if (!props.rightIconName && !props.leftIconName) {
    // no icons, take full with to text
    computedTextWidth.width = '100%';
  } else if (!props.leftIconName || !props.rightIconName) {
    // 50px to the left or right icon
    computedTextWidth.width = 'calc(100% - 50px)';
  }

  return (
    <a
      id={ props.id }
      href={ props.href }
      target={ props.target }
      onClick={ props.onClick }
      data-hint={ props.dataHint }
      data-value={ props.dataValue }
      aria-label={ props.ariaLabel }
      aria-expanded={ props.ariaExpanded }
      role={ props.role }
    >
      <div className={ props.rootClassName } aria-hidden='true'>
        {
          props.leftIconName ?
            <Icon
              iconName={ props.leftIconName }
              className={ props.iconClassName }
            />
            : null
        }
        {
          props.content ?
            <div className={ mergeStyles(props.textClassName, computedTextWidth) }>
              { props.content }
            </div>
            : null
        }
        {
          props.rightIconName ?
            <Icon
              iconName={ props.rightIconName }
              className={ props.iconClassName }
            />
            : null
        }
      </div>
    </a >
  );
};