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

  const {
    rightIconName,
    leftIconName,
    id,
    href,
    target,
    onClick,
    dataHint,
    dataValue,
    ariaLabel,
    ariaExpanded,
    title,
    role,
    rootClassName,
    barClassName,
    content,
    iconClassName,
    textClassName,
    focusedStyle
  } = props;

  const computedTextWidth: IStyle = {
    // 100px to accomodate left and right icons (48px each)
    width: 'calc(100% - 96px)'
  };

  if (!rightIconName && !leftIconName) {
    // no icons, take full with to text
    computedTextWidth.width = '100%';
  } else if (!leftIconName || !rightIconName) {
    // 48px to the left or right icon
    computedTextWidth.width = 'calc(100% - 48px)';
  }

  const fixedIconWidth: IStyle = {
    width: '48px',
    display: rightIconName === 'OpenInNewWindow' ? 'none' : 'inline-block'
  };

  return (
    <a
      id={id}
      href={href}
      target={target}
      onClick={onClick}
      data-hint={dataHint}
      data-value={dataValue}
      aria-label={ariaLabel}
      aria-expanded={ariaExpanded}
      role={role}
      className={focusedStyle}
      title={title}
    >
      <div className={rootClassName} aria-hidden="true">
        <hr className={barClassName} />
        {leftIconName ? <Icon iconName={leftIconName} className={iconClassName} /> : null}
        {content ? <div className={mergeStyles(textClassName, computedTextWidth)}>{content}</div> : null}
        {rightIconName ? <Icon iconName={rightIconName} className={mergeStyles(iconClassName, fixedIconWidth)} /> : null}
      </div>
    </a>
  );
};
