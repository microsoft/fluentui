import * as React from 'react';
import {
  classNamesFunction,
  Icon,
  anchorProperties,
  buttonProperties,
  getNativeProps,
  mergeStyles,
  getId,
  TooltipHost,
  DirectionalHint
} from 'office-ui-fabric-react';
import { INavLinkStyles, INavLinkProps } from './NavLink.types';

const getClassNames = classNamesFunction<INavLinkProps, INavLinkStyles>();

export class NavLinkBase extends React.PureComponent<INavLinkProps, {}> {
  private _linkTipId: string = getId('linkTip');
  public render(): JSX.Element {
    const {
      name,
      hasNestedMenu,
      isNested,
      isNavCollapsed,
      isExpanded,
      isSelected,
      hasSelectedNestedLink,
      styles,
      primaryIconName,
      onClick,
      href,
      forceAnchor
    } = this.props;
    const classNames = getClassNames(styles!, { isNavCollapsed, hasNestedMenu, isExpanded, isSelected, hasSelectedNestedLink, isNested });
    const { className, title, ...nativeProps } = getNativeProps(this.props, href ? anchorProperties : buttonProperties);

    let iconName = undefined;
    if (hasNestedMenu) {
      iconName = 'ChevronUp';
    }

    const navContent: JSX.Element = (
      <>
        <div className={classNames.iconContainer} aria-hidden="true">
          {primaryIconName && <Icon iconName={primaryIconName} className={classNames.icon} />}
        </div>
        <div className={classNames.text} aria-hidden="true" data-is-focusable="false">
          {name}
        </div>
        {!(isNavCollapsed && !isNested) && <Icon iconName={iconName} className={classNames.secondaryIcon} aria-hidden="true" />}
      </>
    );

    const rootStyle = mergeStyles(classNames.root, className);
    const linkBase =
      onClick && !forceAnchor ? (
        <button {...nativeProps} className={rootStyle}>
          {navContent}
        </button>
      ) : (
        <a {...nativeProps} className={rootStyle}>
          {navContent}
        </a>
      );

    return !href && !onClick ? (
      linkBase
    ) : (
      <TooltipHost id={this._linkTipId} content={title} directionalHint={DirectionalHint.rightCenter}>
        {linkBase}
      </TooltipHost>
    );
  }
}
