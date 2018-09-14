import * as React from 'react';
import { INavLinkGroupProps, INavLink } from './Nav.types';
import { NavLink } from './NavLink';
// import { getStyles } from './Nav.styles';
// import { classNamesFunction } from 'office-ui-fabric-react/lib/Utilities';
// import { AnimationClassNames, mergeStyles } from 'office-ui-fabric-react/lib/Styling';

// const getClassNames = classNamesFunction<INavStyleProps, INavStyles>();
// const classNames = getClassNames(getStyles);

class NavigationLinkGroup extends React.Component<INavLinkGroupProps, {}> {
  constructor(props: INavLinkGroupProps) {
    super(props);

    this.state = {
      isExpanded: this.props.isExpanded ? this.props.isExpanded : null
    };
  }

  public render(): JSX.Element {
    const { link, isNavCollapsed } = this.props;
    return (
      <li role="listitem">
        <NavLink
          isNavCollapsed={isNavCollapsed}
          id={link.name}
          name={link.name}
          href={link.href}
          target={link.target}
          onClick={link.onClick}
          ariaExpanded={isNavCollapsed}
          dataValue={link.name}
          ariaLabel={link.ariaLabel}
          primaryIconName={link.icon}
          isSelected={link.isSelected}
          hasNestedMenu={true}
          isNested={false}
          role="menuitem"
        />
        <ul>
          {!!link.links
            ? link.links.map((nestedLink: INavLink, linkIndex: number) => {
                return this._renderNestedLinks(nestedLink, linkIndex);
              })
            : null}
        </ul>
      </li>
    );
  }

  private _renderNestedLinks(nestedLink: INavLink, linkIndex: number): React.ReactElement<{}> | null {
    if (!nestedLink) {
      return null;
    }

    const { isNavCollapsed } = this.props;
    const keyIndex = linkIndex.toString();

    return (
      <li role="listitem" key={keyIndex}>
        <NavLink
          key={keyIndex}
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
          isNested={true}
          isSelected={nestedLink.isSelected}
          role="menuitem"
        />
      </li>
    );
  }

  //
  //
  // CUT LINE
  //
  //

  // private _renderCompositeLink(link: INavLink, keyIndex: string, nestingLevel: number): React.ReactElement<{}> | null {
  //   if (!link) {
  //     return null;
  //   }

  //   // TODO - move this down into the nav group that folds nested links
  //   // let ariaProps = {};
  //   const hasChildren = !!link.links && link.links.length > 0;
  //   const { onShowNestedLink, dataHint, isNavCollapsed } = this.props;

  //   let isSelected = undefined;
  //   if (hasChildren) {
  //     // Nav is expanded and the nested links are exposed, L1 has no selected indicator
  //     if (link.isExpanded && !isNavCollapsed) {
  //       isSelected = false;
  //       // L1 has indicator when...
  //       // Nav is collapsed, nested link menu is expanded, and a nested link is selected or
  //       // Nav is expanded, nested link menu is collapsed
  //     } else if (
  //       (link.isExpanded && isNavCollapsed && this.isChildLinkSelected(link)) ||
  //       (!link.isExpanded && this.isChildLinkSelected(link))
  //     ) {
  //       isSelected = true;
  //     }
  //   } else {
  //     isSelected = link.isSelected;
  //   }

  //   // show nav icon for the first level only
  //   const primaryIconName = nestingLevel === 0 ? link.icon : undefined;
  //   const onClickHandler = link.isShowMoreLink && onShowNestedLink ? onShowNestedLink : this._onLinkClicked.bind(this, link);

  //   return (
  //     <NavLink
  //       id={keyIndex}
  //       href={link.url}
  //       name={link.name}
  //       target={link.target}
  //       onClick={onClickHandler}
  //       dataHint={dataHint}
  //       dataValue={keyIndex}
  //       ariaLabel={link.name}
  //       // {...ariaProps}
  //       hasNestedMenu={hasChildren}
  //       isNested={nestingLevel > 0 ? true : false}
  //       isExpanded={link.isExpanded}
  //       isSelected={isSelected}
  //       role="menu"
  //       primaryIconName={primaryIconName}
  //       isNavCollapsed={isNavCollapsed}
  //     />
  //   );
  // }
}

export const NavLinkGroup = NavigationLinkGroup;
