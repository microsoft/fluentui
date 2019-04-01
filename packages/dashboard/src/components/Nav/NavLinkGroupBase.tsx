import * as React from 'react';
import { INavLinkGroupProps, INavLinkGroupStates, INavLinkGroupStyleProps, INavLinkGroupStyles } from './NavLinkGroup.types';
import { NavLink } from './NavLink';
import { INavLink } from 'office-ui-fabric-react/lib/Nav';
import { classNamesFunction, FocusZone, IFocusZone, KeyCodes } from 'office-ui-fabric-react';

const getClassNames = classNamesFunction<INavLinkGroupStyleProps, INavLinkGroupStyles>();

export class NavLinkGroupBase extends React.Component<INavLinkGroupProps, INavLinkGroupStates> {
  private navLinkGroupRef: React.RefObject<HTMLDivElement>;
  private navRootRef: React.RefObject<HTMLDivElement>;

  constructor(props: INavLinkGroupProps) {
    super(props);

    this.state = {
      isExpanded: this.props.isExpanded,
      isKeyboardExpanded: false
    };
    this.navLinkGroupRef = React.createRef<HTMLDivElement>();
    this.navRootRef = React.createRef<HTMLDivElement>();
    this._onLinkClicked = this._onLinkClicked.bind(this);
    this._offsetUpdated = this._offsetUpdated.bind(this);
    this._nestedNavBlur = this._nestedNavBlur.bind(this);
    this._escapeSubNavFocus = this._escapeSubNavFocus.bind(this);
  }

  public render(): JSX.Element {
    const { link, isNavCollapsed, hasSelectedNestedLink, styles } = this.props;
    const { isExpanded, isKeyboardExpanded } = this.state;
    const classNames = getClassNames(styles, {
      isExpanded: isExpanded!,
      isNavCollapsed: isNavCollapsed!,
      isKeyboardExpanded: isKeyboardExpanded!
    });
    const NestedComponent = isNavCollapsed && isKeyboardExpanded ? FocusZone : 'ul';
    return (
      <div className={classNames.root} {...isNavCollapsed && link.links && { onMouseEnter: this._offsetUpdated, ref: this.navRootRef }}>
        <NavLink
          isNavCollapsed={isNavCollapsed}
          name={link.name}
          onClick={this._onLinkClicked}
          data-value={link.name}
          aria-label={link.ariaLabel ? link.ariaLabel : link.name}
          aria-controls={link.name + 'menu_id'}
          aria-expanded={isExpanded}
          {...isNavCollapsed && link.links && { 'aria-haspopup': true, 'aria-expanded': isKeyboardExpanded }}
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
                styles={{ root: classNames.nestedNavHeaderItem }}
              />
            )}
            <div className={classNames.nestedNavLinksWrapper}>
              {/* This one has the blur. */}
              <NestedComponent
                className={classNames.nestedNavLinks}
                aria-labelledby={link.name + '_id'}
                role={isNavCollapsed ? 'menu' : 'region'}
                id={link.name + 'menu_id'}
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
                    <li role="none" key={nestedLink.name + '_key'}>
                      <NavLink
                        isNavCollapsed={isNavCollapsed}
                        name={nestedLink.name}
                        href={nestedLink.url}
                        target={nestedLink.target}
                        onClick={nestedLink.onClick}
                        data-value={nestedLink.name}
                        aria-label={nestedLink.ariaLabel ? nestedLink.ariaLabel : nestedLink.name}
                        {...nestedLink.isSelected && { 'aria-current': 'page' }}
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
      this.props.isNavCollapsed ? { isKeyboardExpanded: !this.state.isKeyboardExpanded } : { isExpanded: !this.state.isExpanded },
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
      if (this.props.focusZoneRef.current) {
        this.props.focusZoneRef.current.focus();
      }
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
