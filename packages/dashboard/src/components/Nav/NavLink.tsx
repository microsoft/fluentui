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
    const { name, hasNestedMenu, isNested, target, isNavCollapsed, isExpanded, isSelected, hasSelectedNestedLink } = this.props;
    const classNames = getClassNames(getStyles, { isNavCollapsed, hasNestedMenu, isExpanded, isSelected, hasSelectedNestedLink, isNested });

    let iconName = undefined;
    if (hasNestedMenu) {
      iconName = 'ChevronUp';
    } else if (target === '_blank') {
      iconName = 'OpenInNewWindow';
    }
    return (
      <a
        {...getNativeProps(this.props, anchorProperties)}
        id={this.props.id}
        href={this.props.href}
        target={this.props.target}
        onClick={this.props.onClick}
        onMouseEnter={this._getLinkPosition}
        role={this.props.role}
        className={classNames.root}
        ref={this.navLinkRef}
      >
        <div className={classNames.iconContainer} aria-hidden="true">
          {this.props.primaryIconName && <Icon iconName={this.props.primaryIconName} className={classNames.icon} />}
        </div>
        <div className={classNames.text} aria-hidden="true" data-is-focusable="false">
          {name}
        </div>
        {!(isNavCollapsed && !isNested) && <Icon iconName={iconName} className={classNames.secondaryIcon} aria-hidden="true" />}
      </a>
    );
  }

  private _getLinkPosition(ev: React.MouseEvent<HTMLElement>): void {
    if (this.navLinkRef.current && this.props.offsetUpdated) {
      this.props.offsetUpdated(this.navLinkRef.current.offsetTop);
    }
  }
}
