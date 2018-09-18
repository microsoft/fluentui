import * as React from 'react';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import { INavLinkStyles, INavLinkProps, INavLinkStyleProps, INavLinkStates } from '../Nav.types';
import { getStyles } from './NavLink.styles';
import { mergeStyles } from 'office-ui-fabric-react/lib/Styling';
import { classNamesFunction } from 'office-ui-fabric-react/lib/Utilities';

/**
 * Represents a composed link in the Nav component.
 */

const getClassNames = classNamesFunction<INavLinkStyleProps, INavLinkStyles>();
const classNames = getClassNames(getStyles);

class NavigationLink extends React.Component<INavLinkProps, INavLinkStates> {
  constructor(props: INavLinkProps) {
    super(props);
  }

  public render(): JSX.Element {
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
        className={this.classNames.navLink}
      >
        {this._generatePrimaryIcon()}
        {this._generateLinkContent()}
        {this._generateSecondaryIcon()}
      </a>
    );
  }

  private _generateActiveBar(): React.ReactElement<{}> | null {
    const { isNested, isSelected, hasNestedMenu, isNavCollapsed, hasSelectedNestedLink, isExpanded } = this.props;

    // Decide all the cases to show the selected indicator
    if (
      (!isNavCollapsed && !isExpanded && hasSelectedNestedLink) ||
      (!isNavCollapsed && !hasNestedMenu && isSelected) ||
      (isNavCollapsed && isSelected && !isNested)
    ) {
      return <div className={isNested ? this.classNames.navItemBarMarkerSmall : this.classNames.navItemBarMarker} />;
    } else {
      return null;
    }
  }

  private _generatePrimaryIcon(): React.ReactElement<{}> | null {
    const { isNested } = this.props;
    return (
      <div className={this.classNames.iconWrapper} aria-hidden="true">
        {this._generateActiveBar()}
        <Icon
          iconName={this.props.primaryIconName}
          className={isNested ? mergeStyles(this.classNames.navItemIcon, this.classNames.navLinkSmall) : this.classNames.navItemIcon}
        />
      </div>
    );
  }

  private _generateLinkContent(): React.ReactElement<{}> | null {
    const { isNested, name } = this.props;
    return (
      <div className={isNested ? mergeStyles(this.classNames.navItemText, this.classNames.navLinkSmall) : this.classNames.navItemText}>
        {name}
      </div>
    );
  }

  private _generateSecondaryIcon(): React.ReactElement<{}> | null {
    const { hasNestedMenu, isNested, target, isExpanded, isNavCollapsed } = this.props;

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
      <div className={this.classNames.iconWrapper}>
        <Icon
          iconName={iconName}
          className={isNested ? mergeStyles(this.classNames.navItemIcon, this.classNames.navLinkSmall) : this.classNames.navItemIcon}
        />
      </div>
    );
  }
}

export const NavLink = NavigationLink;
