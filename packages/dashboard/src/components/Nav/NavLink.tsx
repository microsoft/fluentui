import * as React from 'react';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import { INavStyles, INavLinkProps, INavStyleProps, INavLinkStates } from './Nav.types';
import { getStyles } from './Nav.styles';
import { mergeStyles } from 'office-ui-fabric-react/lib/Styling';
import { classNamesFunction } from 'office-ui-fabric-react/lib/Utilities';

/**
 * Represents a composed link in the Nav component.
 */

const getClassNames = classNamesFunction<INavStyleProps, INavStyles>();

class NavigationLink extends React.Component<INavLinkProps, INavLinkStates> {
  private classNames = getClassNames(getStyles);
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
        className={this.classNames.navItemRoot}
      >
        {this._generatePrimaryIcon()}
        {this._generateLinkContent()}
        {this._generateSecondaryIcon()}
      </a>
    );
  }

  private _generateActiveBar(): React.ReactElement<{}> | null {
    const { isNested } = this.props;
    if (this.props.isSelected) {
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
          className={isNested ? mergeStyles(this.classNames.navItemIcon, this.classNames.navItemSmall) : this.classNames.navItemIcon}
        />
      </div>
    );
  }

  private _generateLinkContent(): React.ReactElement<{}> | null {
    const { isNested, name } = this.props;
    if (this.props.isNavCollapsed) {
      return null;
    }
    return (
      <div className={isNested ? mergeStyles(this.classNames.navItemText, this.classNames.navItemSmall) : this.classNames.navItemText}>
        {name}
      </div>
    );
  }

  private _generateSecondaryIcon(): React.ReactElement<{}> | null {
    const { hasNestedMenu, isNested, target, isExpanded, isNavCollapsed } = this.props;

    if (isNavCollapsed) {
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
          className={isNested ? mergeStyles(this.classNames.navItemIcon, this.classNames.navItemSmall) : this.classNames.navItemIcon}
        />
      </div>
    );
  }
}

export const NavLink = NavigationLink;
