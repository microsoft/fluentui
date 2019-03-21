import * as React from 'react';
import { classNamesFunction, Icon, anchorProperties, buttonProperties, getNativeProps, mergeStyles } from 'office-ui-fabric-react';
import { INavLinkStyles, INavLinkProps } from './NavLink.types';
import { getStyles } from './NavLink.styles';

const getClassNames = classNamesFunction<INavLinkProps, INavLinkStyles>();

export class NavLink extends React.PureComponent<INavLinkProps, {}> {
  public render(): JSX.Element {
    const { name, hasNestedMenu, isNested, target, isNavCollapsed, isExpanded, isSelected, hasSelectedNestedLink } = this.props;
    const classNames = getClassNames(getStyles, { isNavCollapsed, hasNestedMenu, isExpanded, isSelected, hasSelectedNestedLink, isNested });
    const { className, ...nativeProps } = getNativeProps(this.props, this.props.href ? anchorProperties : buttonProperties);

    let iconName = undefined;
    if (hasNestedMenu) {
      iconName = 'ChevronUp';
    } else if (target === '_blank') {
      iconName = 'OpenInNewWindow';
    }

    const navContent: JSX.Element = (
      <>
        <div className={classNames.iconContainer} aria-hidden="true">
          {this.props.primaryIconName && <Icon iconName={this.props.primaryIconName} className={classNames.icon} />}
        </div>
        <div className={classNames.text} aria-hidden="true" data-is-focusable="false">
          {name}
        </div>
        {!(isNavCollapsed && !isNested) && <Icon iconName={iconName} className={classNames.secondaryIcon} aria-hidden="true" />}
      </>
    );

    const rootStyle = mergeStyles(classNames.root, className);
    return this.props.href ? (
      <a {...nativeProps} id={this.props.id} href={this.props.href} target={this.props.target} role={this.props.role} className={rootStyle}>
        {navContent}
      </a>
    ) : (
      <button {...nativeProps} id={this.props.id} role={this.props.role} className={rootStyle}>
        {navContent}
      </button>
    );
  }
}
