import * as React from 'react';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
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
    // 100px to accomodate left and right icons (48px each)
    width: 'calc(100% - 96px)'
  };

  if (!props.rightIconName && !props.leftIconName) {
    // no icons, take full with to text
    computedTextWidth.width = '100%';
  } else if (!props.leftIconName || !props.rightIconName) {
    // 48px to the left or right icon
    computedTextWidth.width = 'calc(100% - 48px)';
  }

  const fixedIconWidth: IStyle = {
    width: '48px',
    display: props.rightIconName === 'OpenInNewWindow' ? 'none' : 'inline-block'
  };

  return (
    <a
      id={props.id}
      href={props.href}
      target={props.target}
      onClick={props.onClick}
      data-hint={props.dataHint}
      data-value={props.dataValue}
      aria-label={props.ariaLabel}
      aria-expanded={props.ariaExpanded}
      role={props.role}
    >
      <div className={props.rootClassName} aria-hidden="true">
        <hr className={props.barClassName} />
        {props.leftIconName ? <Icon iconName={props.leftIconName} className={props.iconClassName} /> : null}
        {props.content ? (
          <div className={mergeStyles(props.textClassName, computedTextWidth)}>{props.content}</div>
        ) : null}
        {props.rightIconName ? (
          <Icon iconName={props.rightIconName} className={mergeStyles(props.iconClassName, fixedIconWidth)} />
        ) : null}
      </div>
    </a>
  );
};
