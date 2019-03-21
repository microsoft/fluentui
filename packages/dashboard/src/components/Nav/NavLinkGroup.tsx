import * as React from 'react';
import { INavLinkGroupProps, INavLinkGroupStates, INavLinkGroupStyleProps, INavLinkGroupStyles } from './NavLinkGroup.types';
import { NavLink } from './NavLink';
import { getStyles } from './NavLinkGroup.styles';
import { INavLink } from 'office-ui-fabric-react/lib/Nav';
import { classNamesFunction } from 'office-ui-fabric-react/lib/Utilities';

const getClassNames = classNamesFunction<INavLinkGroupStyleProps, INavLinkGroupStyles>();

export class NavLinkGroup extends React.PureComponent<INavLinkGroupProps, INavLinkGroupStates> {
  private navLinkGroupRef: React.RefObject<HTMLDivElement>;
  private navRootRef: React.RefObject<HTMLDivElement>;
  private fireCollapseUpdate: boolean = false;

  constructor(props: INavLinkGroupProps) {
    super(props);

    this.state = {
      isExpanded: this.props.isExpanded,
      hasSelectedNestedLink: this.props.hasSelectedNestedLink
    };
    this.navLinkGroupRef = React.createRef<HTMLDivElement>();
    this.navRootRef = React.createRef<HTMLDivElement>();
    this._onLinkClicked = this._onLinkClicked.bind(this);
    this._offsetUpdated = this._offsetUpdated.bind(this);
  }

  public render(): JSX.Element {
    const { link, isNavCollapsed } = this.props;
    const { hasSelectedNestedLink, isExpanded } = this.state;
    const classNames = getClassNames(getStyles, { isExpanded, isNavCollapsed });
    return (
      <div className={classNames.root} {...isNavCollapsed && link.links && { onMouseEnter: this._offsetUpdated, ref: this.navRootRef }}>
        <div className={classNames.navMenuContainer} ref={this.navLinkGroupRef}>
          <NavLink
            isNavCollapsed={isNavCollapsed}
            id={link.name}
            name={link.name}
            href={link.href}
            target={link.target}
            onClick={this._onLinkClicked}
            data-value={link.name}
            aria-label={link.ariaLabel ? link.ariaLabel : link.name}
            aria-expanded={isExpanded}
            aria-haspopup={!!link.links}
            primaryIconName={link.icon}
            isSelected={hasSelectedNestedLink}
            hasSelectedNestedLink={hasSelectedNestedLink}
            hasNestedMenu={true}
            isNested={false}
            isExpanded={isExpanded}
            role="menuitem"
          />
          {/* If you apply backdrop-filter to an element with box-shadow, the filter will also apply to the shadow,
            so those elements need to be separated. This one has the shadow.
        */}
          {link.links && (
            <div className={classNames.nestedNavLinksWrapper} role="none">
              {/* This one has the blur. */}
              <ul className={classNames.nestedNavLinks} role="menu">
                {link.links.map((nestedLink: INavLink, linkIndex: number) => {
                  return (
                    <li role="none" key={linkIndex}>
                      <NavLink
                        key={linkIndex * 100}
                        isNavCollapsed={isNavCollapsed}
                        id={nestedLink.name}
                        name={nestedLink.name}
                        href={nestedLink.url}
                        target={nestedLink.target}
                        onClick={nestedLink.onClick}
                        data-value={nestedLink.name}
                        aria-label={nestedLink.ariaLabel ? nestedLink.ariaLabel : nestedLink.name}
                        primaryIconName={nestedLink.icon}
                        hasNestedMenu={false}
                        hasSelectedNestedLink={false}
                        isNested={true}
                        isSelected={nestedLink.isSelected}
                        role="menuitem"
                      />
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </div>
      </div>
    );
  }

  public componentDidUpdate(): void {
    if (this.fireCollapseUpdate && this.props.onCollapse) {
      this.props.onCollapse();
      this.fireCollapseUpdate = false;
    }
  }

  private _onLinkClicked(ev: React.MouseEvent<HTMLElement>): void {
    this.fireCollapseUpdate = true;
    this.setState({
      isExpanded: !this.state.isExpanded
    });
    ev.preventDefault();
    ev.stopPropagation();
  }

  private _offsetUpdated(ev: React.MouseEvent<HTMLElement>): void {
    if (this.navRootRef.current && this.navLinkGroupRef.current && this.props.navRef.current) {
      this.navLinkGroupRef.current.style.top = this.navRootRef.current.offsetTop - this.props.navRef.current.scrollTop + 'px';
    }
  }
}
