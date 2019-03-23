import * as React from 'react';
import { classNamesFunction, Icon, anchorProperties, getNativeProps } from 'office-ui-fabric-react';
import { INavLinkStyles, INavLinkProps } from './NavLink.types';
import { getStyles } from './NavLink.styles';

const getClassNames = classNamesFunction<INavLinkProps, INavLinkStyles>();

export class NavLink extends React.PureComponent<INavLinkProps, {}> {
  private navLinkRef: React.RefObject<HTMLAnchorElement>;

  constructor(props: INavLinkProps) {
    super(props);
    this.navLinkRef = React.createRef<HTMLAnchorElement>();
    this._getLinkPosition = this._getLinkPosition.bind(this);
  }

  public render(): JSX.Element {
    const classNames = getClassNames(getStyles, this.props);
    return (
      <a
        {...getNativeProps(this.props, anchorProperties)}
        id={this.props.id}
        href={this.props.href}
        target={this.props.target}
        onClick={this.props.onClick}
        onMouseEnter={this._getLinkPosition}
        role={this.props.role}
        className={classNames.navLink}
        ref={this.navLinkRef}
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
    return (
      <div className={classNames.navItemText} aria-hidden="true">
        {name}
      </div>
    );
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
      <div className={classNames.iconWrapper} aria-hidden="true">
        <Icon iconName={iconName} className={classNames.navItemIcon} />
      </div>
    );
  }

  private _getLinkPosition(ev: React.MouseEvent<HTMLElement>): void {
    if (this.navLinkRef.current && this.props.offsetUpdated) {
      this.props.offsetUpdated(this.navLinkRef.current.offsetTop);
    }
  }
}
