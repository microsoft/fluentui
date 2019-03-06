import * as React from 'react';
import { INavLinkGroupProps, INavLinkGroupStates, INavLinkGroupStyleProps, INavStyles } from './Nav.types';
import { NavLink } from './NavLink';
import { getStyles } from './Nav.styles';
import { INavLink } from 'office-ui-fabric-react/lib/Nav';
import { classNamesFunction } from 'office-ui-fabric-react/lib/Utilities';

const getClassNames = classNamesFunction<INavLinkGroupStyleProps, INavStyles>();

export class NavLinkGroup extends React.PureComponent<INavLinkGroupProps, INavLinkGroupStates> {
  private navLinkGroupRef: React.RefObject<HTMLDivElement>;
  private fireCollapseUpdate: boolean = false;

  constructor(props: INavLinkGroupProps) {
    super(props);

    this.state = {
      isExpanded: this.props.isExpanded,
      hasSelectedNestedLink: this.props.hasSelectedNestedLink
    };
    this.navLinkGroupRef = React.createRef<HTMLDivElement>();
    this._onLinkClicked = this._onLinkClicked.bind(this);
    this._offsetUpdated = this._offsetUpdated.bind(this);
  }

  public render(): JSX.Element {
    const { link, isNavCollapsed } = this.props;
    const { hasSelectedNestedLink } = this.state;

    return (
      <>
        <NavLink
          isNavCollapsed={isNavCollapsed}
          id={link.name}
          name={link.name}
          href={link.href}
          target={link.target}
          onClick={this._onLinkClicked}
          ariaExpanded={isNavCollapsed}
          dataValue={link.name}
          ariaLabel={link.ariaLabel}
          primaryIconName={link.icon}
          isSelected={hasSelectedNestedLink}
          hasSelectedNestedLink={hasSelectedNestedLink}
          hasNestedMenu={true}
          isNested={false}
          isExpanded={this.state.isExpanded}
          role="menuitem"
          offsetUpdated={this._offsetUpdated}
        />
        {isNavCollapsed ? this._renderWhenNavCollapsed(link) : this._renderWhenNavExpanded(link)}
      </>
    );
  }

  public componentDidUpdate(): void {
    if (this.fireCollapseUpdate && this.props.onCollapse) {
      this.props.onCollapse();
      this.fireCollapseUpdate = false;
    }
  }

  private _renderWhenNavCollapsed(link: INavLink): React.ReactElement<{}> | null {
    const classNames = getClassNames(getStyles, { isExpanded: this.state.isExpanded, isNavCollapsed: this.props.isNavCollapsed });
    const { isNavCollapsed, hasSelectedNestedLink } = this.props;

    return (
      <div className={classNames.nestedNavMenuWhenNavCollapsed} ref={this.navLinkGroupRef}>
        <NavLink
          isNavCollapsed={isNavCollapsed}
          id={link.name}
          name={link.name}
          href={link.href}
          target={link.target}
          onClick={this._onLinkClicked}
          ariaExpanded={isNavCollapsed}
          dataValue={link.name}
          ariaLabel={link.ariaLabel}
          primaryIconName={link.icon}
          isSelected={hasSelectedNestedLink}
          hasSelectedNestedLink={hasSelectedNestedLink}
          hasNestedMenu={true}
          isNested={false}
          isExpanded={this.state.isExpanded}
          role="menuitem"
        />
        {/* If you apply backdrop-filter to an element with box-shadow, the filter will also apply to the shadow,
            so those elements need to be separated. This one has the shadow.
        */}
        <div className={classNames.nestedNavLinksWrapper}>
          {/* This one has the blur. */}
          <ul className={classNames.nestedNavLinksWhenNavCollapsed}>
            {link.links &&
              link.links.map((nestedLink: INavLink, linkIndex: number) => {
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
                      ariaExpanded={!isNavCollapsed}
                      dataValue={nestedLink.name}
                      ariaLabel={nestedLink.ariaLabel}
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
      </div>
    );
  }

  private _renderWhenNavExpanded(link: INavLink): JSX.Element {
    const classNames = getClassNames(getStyles, { isExpanded: this.state.isExpanded, isNavCollapsed: this.props.isNavCollapsed });
    const { isNavCollapsed } = this.props;
    return (
      <>
        {link.links && (
          <ul className={classNames.nestedNavMenu}>
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
                    ariaExpanded={!isNavCollapsed}
                    dataValue={nestedLink.name}
                    ariaLabel={nestedLink.ariaLabel}
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
        )}
      </>
    );
  }
  private _onLinkClicked(ev: React.MouseEvent<HTMLElement>): void {
    this.fireCollapseUpdate = true;
    this.setState({
      isExpanded: !this.state.isExpanded
    });
    ev.preventDefault();
    ev.stopPropagation();
  }

  private _offsetUpdated(offset: number): void {
    if (this.navLinkGroupRef.current && this.props.navRef.current) {
      this.navLinkGroupRef.current.style.top = offset - this.props.navRef.current.scrollTop + 'px';
    }
  }
}
