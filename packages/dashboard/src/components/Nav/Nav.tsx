import * as React from 'react';
import { INavLinkGroup, styled, classNamesFunction, BaseComponent, FocusZone, FocusZoneDirection } from 'office-ui-fabric-react';

import { INavProps, INavStyleProps, INavStyles, INavState } from './Nav.types';
import { getStyles } from './Nav.styles';
import { NavLink } from './NavLink';
import { NavGroup } from './NavGroup';

const getClassNames = classNamesFunction<INavStyleProps, INavStyles>();

class NavComponent extends BaseComponent<INavProps, INavState> {
  private wrapperRef: React.RefObject<HTMLDivElement>;
  private containerRef: React.RefObject<HTMLDivElement>;
  private shouldScroll: boolean = false;
  private fireCollapse: boolean = false;

  constructor(props: INavProps) {
    super(props);
    this.state = {
      isNavCollapsed: this.props.isNavCollapsed ? this.props.isNavCollapsed : false
    };

    this.wrapperRef = React.createRef<HTMLDivElement>();
    this.containerRef = React.createRef<HTMLDivElement>();
    this._onNavCollapseClicked = this._onNavCollapseClicked.bind(this);
    this._editClicked = this._editClicked.bind(this);
    this._toggleHidden = this._toggleHidden.bind(this);
    this._setScrollLayout = this._setScrollLayout.bind(this);
  }

  public render(): JSX.Element {
    const { isNavCollapsed, groups, enableCustomization, showMore, editString, showMoreString, showLessString, dataHint } = this.props;

    const navCollapsed = isNavCollapsed ? isNavCollapsed : this.state.isNavCollapsed;

    const classNames = getClassNames(getStyles, { isNavCollapsed: navCollapsed });
    const collapseButtonAriaLabel = navCollapsed ? 'Navigation collapsed' : 'Navigation expanded';
    const navWrapperClassName = this.shouldScroll ? classNames.navWrapper + ' ' + classNames.navWrapperScroll : classNames.navWrapper;
    const navContainerClassName = this.shouldScroll
      ? classNames.navContainer + ' ' + classNames.navContainerScroll
      : classNames.navContainer;

    return (
      <FocusZone isCircularNavigation aria-hidden="true" direction={FocusZoneDirection.vertical} className={classNames.root}>
        <div aria-hidden="true" className={navWrapperClassName} ref={this.wrapperRef}>
          <nav role="navigation" className={navContainerClassName} ref={this.containerRef}>
            <ul role="menubar" className={classNames.navGroup}>
              <li role="none" title={'NavToggle'}>
                <NavLink
                  id={'NavToggle'}
                  href={'#'}
                  onClick={this._onNavCollapseClicked}
                  ariaExpanded={!isNavCollapsed}
                  dataHint={dataHint}
                  dataValue={'NavToggle'}
                  ariaLabel={collapseButtonAriaLabel}
                  primaryIconName={'GlobalNavButton'}
                  role="menuitem"
                />
              </li>

              {groups.map((group: INavLinkGroup, groupIndex: number) => (
                <NavGroup
                  key={'group_' + groupIndex}
                  groupIndex={groupIndex}
                  groupName={group.name}
                  links={group.links}
                  dataHint={this.props.dataHint}
                  isNavCollapsed={navCollapsed}
                  onCollapse={this._setScrollLayout}
                  navRef={this.containerRef}
                />
              ))}

              {enableCustomization && (
                // If enableCustomization
                <>
                  <li role="none" title={'Edit navigation'}>
                    <NavLink
                      id={'EditNav'}
                      href={'#'}
                      name={editString}
                      onClick={this._editClicked}
                      dataHint={'Edit navigation'}
                      dataValue={'NavToggle'}
                      ariaLabel={'Edit navigation'}
                      primaryIconName={'Edit'}
                      role="menuitem"
                    />
                  </li>
                  {showMore && (
                    <li role="none" title={'Show more'}>
                      <NavLink
                        id={'ShowMore'}
                        href={'#'}
                        name={this.props.showMore ? showMoreString : showLessString}
                        onClick={this._toggleHidden}
                        dataHint={'Show more'}
                        dataValue={'Show more'}
                        ariaLabel={'Show more'}
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
    if (this.fireCollapse) {
      this.fireCollapse = false;
      this._setScrollLayout();
    }
    console.log('nav updated');
  }

  private _setScrollLayout(): void {
    const classNames = getClassNames(getStyles, { isNavCollapsed: this.state.isNavCollapsed });
    if (this.containerRef.current && this.wrapperRef.current) {
      if (this.containerRef.current.scrollHeight > this.containerRef.current.clientHeight) {
        this.containerRef.current.classList.add(classNames.navContainerScroll);
        this.wrapperRef.current.classList.add(classNames.navWrapperScroll);
        this.shouldScroll = true;
      } else {
        this.containerRef.current.classList.remove(classNames.navContainerScroll);
        this.wrapperRef.current.classList.remove(classNames.navWrapperScroll);
        this.shouldScroll = false;
      }
      console.log(this.containerRef.current.scrollHeight, this.containerRef.current.clientHeight);
    }
  }

  //
  // Event handlers
  //
  private _onNavCollapseClicked(ev: React.MouseEvent<HTMLElement>): void {
    this.fireCollapse = true;
    this.setState({
      isNavCollapsed: !this.state.isNavCollapsed
    });

    // inform the caller about the collapse event
    if (!!this.props.onNavCollapsedCallback) {
      this.props.onNavCollapsedCallback(this.state.isNavCollapsed);
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
  private _toggleHidden(ev: React.MouseEvent<HTMLElement>): void {
    ev.preventDefault();
    ev.stopPropagation();
  }
}

export const Nav = styled<INavProps, INavStyleProps, INavStyles>(NavComponent, getStyles);
