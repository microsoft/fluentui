import * as React from 'react';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import { INavStyles, INavLinkProps, INavLinkStyleProps, INavLinkStates } from './Nav.types';
import { getStyles } from './Nav.styles';
import { mergeStyles } from 'office-ui-fabric-react/lib/Styling';
import { classNamesFunction } from 'office-ui-fabric-react/lib/Utilities';

const getClassNames = classNamesFunction<INavLinkStyleProps, INavStyles>();

export class NavLink extends React.Component<INavLinkProps, INavLinkStates> {
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
    const classNames = getClassNames(getStyles);

    // Decide all the cases to show the selected indicator
    if (
      (!isNavCollapsed && !isExpanded && hasSelectedNestedLink) ||
      (!isNavCollapsed && !hasNestedMenu && isSelected) ||
      (isNavCollapsed && isSelected)
    ) {
      return <div className={isNested ? classNames.navItemBarMarkerSmall : classNames.navItemBarMarker} />;
    } else {
      return null;
    }
  }

  private _generatePrimaryIcon(): React.ReactElement<{}> | null {
    const { isNested, isNavCollapsed } = this.props;
    const classNames = getClassNames(getStyles);

    return (
      <div
        className={isNavCollapsed && isNested ? mergeStyles(classNames.iconWrapper, classNames.nestedIconWrapper) : classNames.iconWrapper}
        aria-hidden="true"
      >
        {this._generateActiveBar()}
        <Icon
          iconName={this.props.primaryIconName}
          className={isNested ? mergeStyles(classNames.navItemIcon, classNames.navLinkSmall) : classNames.navItemIcon}
        />
      </div>
    );
  }

  private _generateLinkContent(): React.ReactElement<{}> | null {
    const { isNested, name } = this.props;
    const classNames = getClassNames(getStyles);
    return <div className={isNested ? mergeStyles(classNames.navItemText, classNames.navLinkSmall) : classNames.navItemText}>{name}</div>;
  }

  private _generateSecondaryIcon(): React.ReactElement<{}> | null {
    const { hasNestedMenu, isNested, target, isExpanded, isNavCollapsed } = this.props;
    const classNames = getClassNames(getStyles);

    if (isNavCollapsed && !isNested) {
      return null;
    }

    let iconName = undefined;
    if (hasNestedMenu) {
      iconName = isExpanded ? 'ChevronUp' : 'ChevronDown';
    } else if (target === '_blank') {
      iconName = 'OpenInNewWindow';
    }

    return (
      <div className={classNames.iconWrapper}>
        <Icon
          iconName={iconName}
          className={isNested ? mergeStyles(classNames.navItemIcon, classNames.navLinkSmall) : classNames.navItemIcon}
        />
      </div>
    );
  }
}
