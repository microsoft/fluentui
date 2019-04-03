import * as React from 'react';
import { INavLinkGroup, classNamesFunction, BaseComponent, FocusZone, FocusZoneDirection, IFocusZone } from 'office-ui-fabric-react';

import { INavProps, INavStyleProps, INavStyles, INavState } from './Nav.types';
import { NavLink } from './NavLink';
import { NavGroup } from './NavGroup';

const getClassNames = classNamesFunction<INavStyleProps, INavStyles>();

export class NavBase extends BaseComponent<INavProps, INavState> {
  private containerRef: React.RefObject<HTMLDivElement>;
  private focusRef: React.RefObject<IFocusZone>;

  constructor(props: INavProps) {
    super(props);

    this._warnMutuallyExclusive({
      isNavCollapsed: 'defaultIsNavCollapsed'
    });

    this.state = {
      isNavCollapsed: !!(props.isNavCollapsed !== undefined ? props.isNavCollapsed : props.defaultIsNavCollapsed),
      shouldScroll: false
    };

    this.containerRef = React.createRef<HTMLDivElement>();
    this.focusRef = React.createRef<IFocusZone>();
    this._onNavCollapseClicked = this._onNavCollapseClicked.bind(this);
    this._setScrollLayout = this._setScrollLayout.bind(this);
  }

  public render(): JSX.Element {
    const { groups, enableCustomization, showMore, dataHint, styles, showMoreLinkProps, editLinkProps, collapseNavLinkProps } = this.props;
    const { shouldScroll } = this.state;

    const isNavCollapsed = this.props.isNavCollapsed === undefined ? this.state.isNavCollapsed : this.props.isNavCollapsed;

    const classNames = getClassNames(styles, { isNavCollapsed, shouldScroll });

    return (
      <FocusZone isCircularNavigation direction={FocusZoneDirection.vertical} className={classNames.root} componentRef={this.focusRef}>
        <div className={classNames.navWrapper}>
          <nav role="navigation" className={classNames.navContainer} ref={this.containerRef}>
            <ul role="menubar" aria-orientation="vertical" className={classNames.navGroup}>
              <li role="none">
                <NavLink
                  aria-label="Navigation Collapse"
                  primaryIconName={'GlobalNavButton'}
                  title={'Navigation Collapse Button'}
                  {...collapseNavLinkProps}
                  onClick={this._onNavCollapseClicked}
                  role="switch"
                  aria-checked={isNavCollapsed}
                />
              </li>

              {groups.map((group: INavLinkGroup, groupIndex: number) => (
                <NavGroup
                  key={'group_' + groupIndex}
                  groupIndex={groupIndex}
                  groupName={group.name}
                  links={group.links}
                  dataHint={dataHint}
                  isNavCollapsed={isNavCollapsed}
                  onCollapse={this._setScrollLayout}
                  navRef={this.containerRef}
                  focusZoneRef={this.focusRef}
                />
              ))}

              {enableCustomization && (
                // If enableCustomization
                <>
                  <li role="none">
                    <NavLink
                      aria-label={'Edit navigation'}
                      primaryIconName={'Edit'}
                      title={'Edit navigation'}
                      {...editLinkProps}
                      role="menuitem"
                    />
                  </li>
                  {showMore && (
                    <li role="none">
                      <NavLink
                        aria-label={'Show more'}
                        primaryIconName={'More'}
                        title={'Show more'}
                        {...showMoreLinkProps}
                        role="menuitem"
                      />
                    </li>
                  )}
                </>
              )}
            </ul>
          </nav>
        </div>
      </FocusZone>
    );
  }

  // we also need to hook into a collapse callback for the nav items
  // also see if we can get rid of refs
  public componentDidMount(): void {
    this._setScrollLayout();
  }

  public componentDidUpdate(): void {
    this._setScrollLayout();
  }

  private _setScrollLayout(): void {
    // We need to call this from window resize so when the viewport is changed we can adjust whether we scroll or not
    // use _async and _events to debounce resize events with RAF
    const shouldScroll = !!this.containerRef.current && this.containerRef.current.scrollHeight > this.containerRef.current.clientHeight;
    if (shouldScroll !== this.state.shouldScroll) {
      this.setState({ shouldScroll });
    }
  }

  //
  // Event handlers
  //
  private _onNavCollapseClicked(ev: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>): void {
    // inform the caller about the collapse event

    // collapse this into a single call by extending interface and overriding sig
    if (this.props.onNavCollapsed) {
      this.props.onNavCollapsed(!this.state.isNavCollapsed);
    }

    // additionally call onClick if it was provided in props
    if (this.props.collapseNavLinkProps && this.props.collapseNavLinkProps.onClick) {
      this.props.collapseNavLinkProps.onClick(ev);
    }

    if (this.props.isNavCollapsed === undefined) {
      this.setState({
        isNavCollapsed: !this.state.isNavCollapsed
      });
    }

    ev.preventDefault();
    ev.stopPropagation();
  }
}
