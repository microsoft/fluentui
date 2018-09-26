import * as React from 'react';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import { INavStyles, INavLinkProps } from './Nav.types';
import { getStyles } from './Nav.styles';
import { classNamesFunction } from 'office-ui-fabric-react/lib/Utilities';

const getClassNames = classNamesFunction<INavLinkProps, INavStyles>();

export class NavLink extends React.Component<INavLinkProps, {}> {
  constructor(props: INavLinkProps) {
    super(props);
  }

  public render(): JSX.Element {
    const classNames = getClassNames(getStyles);
    return (
      <a
        id={this.props.id}
        href={this.props.href}
        target={this.props.target}
        onClick={this.props.onClick}
        data-hint={this.props.dataHint}
        data-value={this.props.dataValue}
        aria-label={this.props.ariaLabel}
        aria-expanded={this.props.ariaExpanded}
        role={this.props.role}
        className={classNames.navLink}
      >
        {this._generatePrimaryIcon()}
        {this._generateLinkContent()}
        {this._generateSecondaryIcon()}
      </a>
    );
  }

  private _generateActiveBar(): React.ReactElement<{}> | null {
    const { isNested, isSelected, hasNestedMenu, isNavCollapsed, hasSelectedNestedLink, isExpanded } = this.props;
    // Pass all the right props to getStyles so we can handle all the cases where the selected indicator is shown/hidden
    const classNames = getClassNames(getStyles, {
      isNested: isNested,
      hasNestedMenu: hasNestedMenu,
      isNavCollapsed: isNavCollapsed,
      hasSelectedNestedLink: hasSelectedNestedLink,
      isSelected: isSelected,
      isExpanded: isExpanded
    });

    return <div className={classNames.navItemBarMarker} />;
  }

  private _generatePrimaryIcon(): React.ReactElement<{}> | null {
    const { isNested, isNavCollapsed } = this.props;
    const classNames = getClassNames(getStyles, { isNested: isNested, isNavCollapsed: isNavCollapsed });

    return (
      <div className={classNames.iconWrapper} aria-hidden="true">
        {this._generateActiveBar()}
        <Icon iconName={this.props.primaryIconName} className={classNames.navItemIcon} />
      </div>
    );
  }

  private _generateLinkContent(): React.ReactElement<{}> | null {
    const { isNested, name } = this.props;
    const classNames = getClassNames(getStyles, { isNested: isNested });
    return <div className={classNames.navItemText}>{name}</div>;
  }

  private _generateSecondaryIcon(): React.ReactElement<{}> | null {
    const { hasNestedMenu, isNested, target, isNavCollapsed, isExpanded } = this.props;
    const classNames = getClassNames(getStyles, { isExpanded: isExpanded, isNested: isNested });

    if (isNavCollapsed && !isNested) {
      return null;
    }

    let iconName = undefined;
    if (hasNestedMenu) {
      iconName = 'ChevronUp';
    } else if (target === '_blank') {
      iconName = 'OpenInNewWindow';
    }

    return (
      <div className={classNames.iconWrapper}>
        <Icon iconName={iconName} className={classNames.navItemIcon} />
      </div>
    );
  }
}
