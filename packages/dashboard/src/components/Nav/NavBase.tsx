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
    this._editClicked = this._editClicked.bind(this);
    this._toggleMore = this._toggleMore.bind(this);
    this._setScrollLayout = this._setScrollLayout.bind(this);
  }

  public render(): JSX.Element {
    const { groups, enableCustomization, showMore, editString, showMoreString, showLessString, dataHint, styles } = this.props;
    const { shouldScroll } = this.state;

    const isNavCollapsed = this.props.isNavCollapsed === undefined ? this.state.isNavCollapsed : this.props.isNavCollapsed;

    const classNames = getClassNames(styles, { isNavCollapsed, shouldScroll });

    return (
      <FocusZone isCircularNavigation direction={FocusZoneDirection.vertical} className={classNames.root} componentRef={this.focusRef}>
        <div className={classNames.navWrapper}>
          <nav role="navigation" className={classNames.navContainer} ref={this.containerRef}>
            <ul role="menubar" aria-orientation="vertical" className={classNames.navGroup}>
              <li role="none" title={'NavToggle'}>
                <NavLink
                  onClick={this._onNavCollapseClicked}
                  data-hint={dataHint}
                  data-value={'NavToggle'}
                  aria-label="Navigation Collapse"
                  primaryIconName={'GlobalNavButton'}
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
                  dataHint={this.props.dataHint}
                  isNavCollapsed={isNavCollapsed}
                  onCollapse={this._setScrollLayout}
                  navRef={this.containerRef}
                  focusZoneRef={this.focusRef}
                />
              ))}

              {enableCustomization && (
                // If enableCustomization
                <>
                  <li role="none" title={'Edit navigation'}>
                    <NavLink
                      name={editString}
                      onClick={this._editClicked}
                      data-hint={'Edit navigation'}
                      data-value={'NavToggle'}
                      aria-label={'Edit navigation'}
                      primaryIconName={'Edit'}
                      role="menuitem"
                    />
                  </li>
                  {showMore && (
                    <li role="none" title={'Show more'}>
                      <NavLink
                        name={this.props.showMore ? showMoreString : showLessString}
                        onClick={this._toggleMore}
                        data-hint={'Show more'}
                        data-value={'Show more'}
                        aria-label={'Show more'}
                        primaryIconName={'More'}
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
  private _onNavCollapseClicked(ev: React.MouseEvent<HTMLElement>): void {
    // inform the caller about the collapse event
    if (this.props.onNavCollapsed) {
      this.props.onNavCollapsed(!this.state.isNavCollapsed);
    }

    if (this.props.isNavCollapsed === undefined) {
      this.setState({
        isNavCollapsed: !this.state.isNavCollapsed
      });
    }

    ev.preventDefault();
    ev.stopPropagation();
  }

  // TODO: make this a callback
  private _editClicked(ev: React.MouseEvent<HTMLElement>): void {
    ev.preventDefault();
    ev.stopPropagation();
  }

  // TODO: make this a callback
  private _toggleMore(ev: React.MouseEvent<HTMLElement>): void {
    ev.preventDefault();
    ev.stopPropagation();
    if (this.props.onShowMoreLinkClicked) {
      this.props.onShowMoreLinkClicked(ev);
    }
  }
}
