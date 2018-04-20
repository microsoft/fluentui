import * as React from 'react';
import { Icon } from 'office-ui-fabric-react/lib/components/Icon';
import { INavLinkProps } from './Nav.types';

export const NavLink: React.SFC<INavLinkProps> = (props) => {
  if (!props) {
    return null;
  }

  let linkTextStyle: React.CSSProperties = {};

  if (!props.rightIconName && !props.leftIconName) {
    linkTextStyle.width = '100%';
  }
  else if (!props.leftIconName || !props.rightIconName) {
    // 50px to the left or right icon
    linkTextStyle.width = 'calc(100% - 50px)';
  }
  else {
    // 50px each to left and right icon
    linkTextStyle.width = 'calc(100% - 100px)';
  }

  return (
    <a
      id={ props.id }
      href={ props.href }
      target={ props.target }
      onClick={ props.onClick }
      data-hint={ props.dataHint }
      data-value={ props.ariaLabel }
      aria-label={ props.ariaLabel }
      aria-expanded={ props.ariaExpanded }
      role={ props.role }>
      <div className={ props.rootClassName } aria-hidden="true">
        {
          props.leftIconName ?
            <Icon
              iconName={ props.leftIconName }
              className={ props.iconClassName } />
            : null
        }
        {
          props.text ?
            <div className={ props.textClassName } style={ linkTextStyle }>
              { props.text }
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
    </a>
  );
}