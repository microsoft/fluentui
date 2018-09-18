import * as React from 'react';
import { INavLink, INavLinkGroupProps, INavLinkGroupStates, INavLinkGroupStyleProps, INavLinkGroupStyles } from '../Nav.types';
import { NavLink } from '../NavLink/NavLink';
import { getStyles } from './NavLinkGroup.styles';
import { classNamesFunction } from 'office-ui-fabric-react/lib/Utilities';
// import { AnimationClassNames, mergeStyles } from 'office-ui-fabric-react/lib/Styling';

const getClassNames = classNamesFunction<INavLinkGroupStyleProps, INavLinkGroupStyles>();
const classNames = getClassNames(getStyles);

class NavigationLinkGroup extends React.Component<INavLinkGroupProps, INavLinkGroupStates> {
  constructor(props: INavLinkGroupProps) {
    super(props);

    this.state = {
      isExpanded: this.props.isExpanded,
      hasSelectedNestedLink: this.props.hasSelectedNestedLink
    };

    this._onLinkClicked = this._onLinkClicked.bind(this);
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
        />
        <ul className={classNames.nestedNavMenu}>
          {!!link.links
            ? link.links.map((nestedLink: INavLink, linkIndex: number) => {
                return this._renderNestedLinks(nestedLink, linkIndex);
              })
            : null}
        </ul>
      </>
    );
  }

  // private _getClasses():  {
  //   const { isNavCollapsed } = this.props;
  //   const { isExpanded } = this.state;
  //   let classes = undefined;

  //   if (!isNavCollapsed && isExpanded) {
  //     classes = mergeStyles(AnimationClassNames.slideDownIn20);
  //   } else if (!isNavCollapsed && !isExpanded) {
  //     classes = mergeStyles(classNames.nestedNavMenuCollapsed);
  //   } else if (isNavCollapsed) {
  //     classes = mergeStyles(classNames.hidden, AnimationClassNames.slideDownIn20);
  //   }
  //   return classes;
  // }

  private _renderNestedLinks(nestedLink: INavLink, linkIndex: number): React.ReactElement<{}> | null {
    if (!nestedLink) {
      return null;
    }

    const { isNavCollapsed } = this.props;

    return (
      <li role="listitem" key={linkIndex}>
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
  }

  private _onLinkClicked(ev: React.MouseEvent<HTMLElement>): void {
    this.setState({
      isExpanded: !this.state.isExpanded
    });

    ev.preventDefault();
    ev.stopPropagation();
  }
}

export const NavLinkGroup = NavigationLinkGroup;
