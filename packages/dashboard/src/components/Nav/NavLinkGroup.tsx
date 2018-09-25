import * as React from 'react';
import { INavLinkGroupProps, INavLinkGroupStates, INavLinkGroupStyleProps, INavStyles } from './Nav.types';
import { NavLink } from './NavLink';
import { getStyles } from './Nav.styles';
import { INavLink } from 'office-ui-fabric-react/lib/Nav';
import { classNamesFunction } from 'office-ui-fabric-react/lib/Utilities';

const getClassNames = classNamesFunction<INavLinkGroupStyleProps, INavStyles>();

export class NavLinkGroup extends React.Component<INavLinkGroupProps, INavLinkGroupStates> {
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
        {isNavCollapsed ? this._renderWhenNavCollapsed(link) : this._renderWhenNavExpanded(link)}
      </>
    );
  }

  private _renderWhenNavCollapsed(link: INavLink): React.ReactElement<{}> | null {
    const classNames = getClassNames(getStyles, { isExpanded: this.state.isExpanded, isNavCollapsed: this.props.isNavCollapsed });
    const { isNavCollapsed, hasSelectedNestedLink } = this.props;
    return (
      <div className={classNames.nestedNavMenuWhenNavCollapsed}>
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
        <div className={classNames.nestedNavLinksWrapper}>
          <ul className={classNames.nestedNavLinksWhenNavCollapsed}>
            {!!link.links
              ? link.links.map((nestedLink: INavLink, linkIndex: number) => {
                  return this._renderNestedLinks(nestedLink, linkIndex);
                })
              : null}
          </ul>
        </div>
      </div>
    );
  }

  private _renderWhenNavExpanded(link: INavLink): React.ReactElement<{}> | null {
    const classNames = getClassNames(getStyles, { isExpanded: this.state.isExpanded, isNavCollapsed: this.props.isNavCollapsed });
    return (
      <ul className={classNames.nestedNavMenu}>
        {!!link.links
          ? link.links.map((nestedLink: INavLink, linkIndex: number) => {
              return this._renderNestedLinks(nestedLink, linkIndex);
            })
          : null}
      </ul>
    );
  }

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
