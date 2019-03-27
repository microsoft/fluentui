import * as React from 'react';
import { INavLinkGroupProps, INavLinkGroupStates, INavLinkGroupStyleProps, INavLinkGroupStyles } from './NavLinkGroup.types';
import { NavLink } from './NavLink';
import { getStyles } from './NavLinkGroup.styles';
import { INavLink } from 'office-ui-fabric-react/lib/Nav';
import { classNamesFunction, FocusZone, IFocusZone, KeyCodes } from 'office-ui-fabric-react';

const getClassNames = classNamesFunction<INavLinkGroupStyleProps, INavLinkGroupStyles>();

export class NavLinkGroup extends React.Component<INavLinkGroupProps, INavLinkGroupStates> {
  private navLinkGroupRef: React.RefObject<HTMLDivElement>;
  private navRootRef: React.RefObject<HTMLDivElement>;

  constructor(props: INavLinkGroupProps) {
    super(props);

    this.state = {
      isExpanded: this.props.isExpanded,
      isKeyboardExpanded: false,
      hasSelectedNestedLink: this.props.hasSelectedNestedLink
    };
    this.navLinkGroupRef = React.createRef<HTMLDivElement>();
    this.navRootRef = React.createRef<HTMLDivElement>();
    this._onLinkClicked = this._onLinkClicked.bind(this);
    this._offsetUpdated = this._offsetUpdated.bind(this);
    this._nestedNavBlur = this._nestedNavBlur.bind(this);
    this._escapeSubNavFocus = this._escapeSubNavFocus.bind(this);
  }

  public render(): JSX.Element {
    const { link, isNavCollapsed } = this.props;
    const { hasSelectedNestedLink, isExpanded, isKeyboardExpanded } = this.state;
    const classNames = getClassNames(getStyles, { isExpanded, isNavCollapsed, isKeyboardExpanded });
    const NestedComponent = isNavCollapsed && isKeyboardExpanded ? FocusZone : 'ul';
    return (
      <div className={classNames.root} {...isNavCollapsed && link.links && { onMouseEnter: this._offsetUpdated, ref: this.navRootRef }}>
        <NavLink
          isNavCollapsed={isNavCollapsed}
          name={link.name}
          onClick={this._onLinkClicked}
          data-value={link.name}
          aria-label={link.ariaLabel ? link.ariaLabel : link.name}
          {...isNavCollapsed && link.links && { 'aria-expanded': isKeyboardExpanded, 'aria-haspopup': true }}
          primaryIconName={link.icon}
          isSelected={hasSelectedNestedLink}
          hasSelectedNestedLink={hasSelectedNestedLink}
          hasNestedMenu={true}
          isExpanded={isExpanded}
          role="menuitem"
          id={link.name + '_id'}
        />
        {/* If you apply backdrop-filter to an element with box-shadow, the filter will also apply to the shadow,
            so those elements need to be separated. This one has the shadow.
        */}
        {link.links && (
          <div
            className={classNames.nestedNav}
            role="none"
            {...isNavCollapsed && { ref: this.navLinkGroupRef, 'data-is-focusable': false }}
          >
            {isNavCollapsed && (
              <NavLink
                isNavCollapsed={isNavCollapsed}
                name={link.name}
                data-is-focusable={false}
                aria-hidden={true}
                primaryIconName={link.icon}
              />
            )}
            <div className={classNames.nestedNavLinksWrapper}>
              {/* This one has the blur. */}
              <NestedComponent
                className={classNames.nestedNavLinks}
                role="menu"
                aria-labelledby={link.name + '_id'}
                {...isKeyboardExpanded &&
                  isNavCollapsed && {
                    componentRef: this._keyboardFocusSubNav,
                    onKeyDown: this._escapeSubNavFocus,
                    isCircularNavigation: true,
                    elementType: 'ul',
                    onBlur: this._nestedNavBlur
                  }}
              >
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
              </NestedComponent>
            </div>
          </div>
        )}
      </div>
    );
  }

  private _onLinkClicked(ev: React.MouseEvent<HTMLElement>): void {
    this.setState(
      {
        isExpanded: !this.state.isExpanded,
        isKeyboardExpanded: !this.state.isKeyboardExpanded
      },
      () => {
        if (this.props.onCollapse) {
          this.props.onCollapse();
        }
      }
    );
    if (this.props.isNavCollapsed) {
      this._offsetUpdated();
    }
    ev.preventDefault();
    ev.stopPropagation();
  }

  // We're using the ref callback to focus the element so we can guarantee the element exists
  private _keyboardFocusSubNav(focusZone: IFocusZone): void {
    if (focusZone) {
      focusZone.focus(true);
    }
  }

  private _escapeSubNavFocus(event: React.KeyboardEvent<HTMLElement>): void {
    if (event.which === KeyCodes.escape) {
      this.setState({
        isKeyboardExpanded: false
      });
    }
  }

  private _nestedNavBlur(event: React.FocusEvent<HTMLElement>): void {
    if (event.relatedTarget === null || !event.currentTarget.contains(event.relatedTarget as HTMLElement)) {
      this.setState({
        isKeyboardExpanded: false
      });
    }
  }

  // calculate the offset due to scroll so we always position the sub nav correctly
  private _offsetUpdated(_ev?: React.MouseEvent<HTMLElement>): void {
    if (this.navRootRef.current && this.navLinkGroupRef.current && this.props.navRef.current) {
      this.navLinkGroupRef.current.style.top = this.navRootRef.current.offsetTop - this.props.navRef.current.scrollTop + 'px';
    }
  }
}
