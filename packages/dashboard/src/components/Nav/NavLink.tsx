import * as React from 'react';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import { INavStyles, INavLinkProps, INavStyleProps } from './Nav.types';
import { getStyles } from './Nav.styles';
import { IStyle, mergeStyles } from 'office-ui-fabric-react/lib/Styling';
import { classNamesFunction } from 'office-ui-fabric-react/lib/Utilities';

/**
 * Represents a composed link in the Nav component.
 */

const getClassNames = classNamesFunction<INavStyleProps, INavStyles>();

export const NavLink: React.SFC<INavLinkProps> = (props: INavLinkProps) => {
  if (!props) {
    return null;
  }

  // const { styles } = props;
  const classNames = getClassNames(getStyles);

  const fixedIconWidth: IStyle = {
    display: props.rightIconName === 'OpenInNewWindow' ? 'none' : 'flex'
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
      className={classNames.navItemRoot}
    >
      {props.leftIconName ? (
        <div className={classNames.iconWrapper} aria-hidden="true">
          <div className={classNames.navItemBarMarker} />
          <Icon iconName={props.leftIconName} className={classNames.navItemIcon} />
        </div>
      ) : null}

      {props.content ? <div className={classNames.navItemText}>{props.content}</div> : null}

      {props.rightIconName ? (
        <div className={classNames.iconWrapper}>
          <Icon iconName={props.rightIconName} className={mergeStyles(classNames.navItemIcon, fixedIconWidth)} />
        </div>
      ) : null}
    </a>
  );
};
