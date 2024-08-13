import * as React from 'react';
import { ActionButton } from '../../Button';
import { buttonStyles } from './Nav.styles';
import { classNamesFunction, divProperties, getNativeProps, getWindow, initializeComponentRef } from '../../Utilities';
import { FocusZone, FocusZoneDirection } from '../../FocusZone';
import { Icon } from '../../Icon';
import { composeComponentAs, composeRenderFunction } from '@fluentui/utilities';
import type { IFocusZone } from '../../FocusZone';
import type {
  INav,
  INavLink,
  INavLinkGroup,
  INavProps,
  INavStyleProps,
  INavStyles,
  IRenderGroupHeaderProps,
} from './Nav.types';
import { WindowContext } from '@fluentui/react-window-provider';
import { getDocumentEx } from '../../utilities/dom';

// The number pixels per indentation level for Nav links.
const _indentationSize = 14;

// The number of pixels of left margin
const _baseIndent = 3;

// global var used in _isLinkSelectedKey
let _urlResolver: HTMLAnchorElement | undefined;

export function isRelativeUrl(url: string): boolean {
  // A URL is relative if it has no protocol.
  return !!url && !/^[a-z0-9+-.]+:\/\//i.test(url);
}

const getClassNames = classNamesFunction<INavStyleProps, INavStyles>();

export interface INavState {
  isGroupCollapsed: { [key: string]: boolean };
  isLinkExpandStateChanged?: boolean;
  selectedKey?: string;
}

export class NavBase extends React.Component<INavProps, INavState> implements INav {
  public static defaultProps: INavProps = {
    groups: null,
  };

  public static contextType = WindowContext;

  private _focusZone = React.createRef<IFocusZone>();
  constructor(props: INavProps) {
    super(props);
    initializeComponentRef(this);
    this.state = {
      isGroupCollapsed: {},
      isLinkExpandStateChanged: false,
      selectedKey: props.initialSelectedKey || props.selectedKey,
    };
  }

  public render(): JSX.Element | null {
    const { styles, groups, className, isOnTop, role = 'navigation', theme } = this.props;

    if (!groups) {
      return null;
    }

    const groupElements: React.ReactElement<{}>[] = groups.map(this._renderGroup);

    const classNames = getClassNames(styles!, { theme: theme!, className, isOnTop, groups });

    return (
      <FocusZone direction={FocusZoneDirection.vertical} componentRef={this._focusZone} {...this.props.focusZoneProps}>
        <nav role={role} className={classNames.root} aria-label={this.props.ariaLabel}>
          {groupElements}
        </nav>
      </FocusZone>
    );
  }

  public get selectedKey(): string | undefined {
    return this.state.selectedKey;
  }

  /**
   * Sets focus to the first tabbable item in the zone.
   * @param forceIntoFirstElement - If true, focus will be forced into the first element, even
   * if focus is already in the focus zone.
   * @returns True if focus could be set to an active element, false if no operation was taken.
   */
  public focus(forceIntoFirstElement: boolean = false): boolean {
    if (this._focusZone && this._focusZone.current) {
      return this._focusZone.current.focus(forceIntoFirstElement);
    }
    return false;
  }

  private _onRenderLink = (link: INavLink): JSX.Element => {
    const { styles, groups, theme } = this.props;
    const classNames = getClassNames(styles!, { theme: theme!, groups });
    return <div className={classNames.linkText}>{link.name}</div>;
  };

  private _renderNavLink(link: INavLink, linkIndex: number, nestingLevel: number): JSX.Element {
    const { styles, groups, theme } = this.props;
    const isLinkWithIcon = link.icon || link.iconProps;
    const isSelectedLink = this._isLinkSelected(link);
    const { ariaCurrent = 'page' } = link;
    const classNames = getClassNames(styles!, {
      theme: theme!,
      isSelected: isSelectedLink,
      isDisabled: link.disabled,
      isButtonEntry: link.onClick && !link.forceAnchor,
      leftPadding: _indentationSize * nestingLevel + _baseIndent + (isLinkWithIcon ? 0 : 24),
      groups,
    });

    // Prevent hijacking of the parent window if link.target is defined
    const rel = link.url && link.target && !isRelativeUrl(link.url) ? 'noopener noreferrer' : undefined;

    const LinkAs = this.props.linkAs ? composeComponentAs(this.props.linkAs, ActionButton) : ActionButton;
    const onRenderLink = this.props.onRenderLink
      ? composeRenderFunction(this.props.onRenderLink, this._onRenderLink)
      : this._onRenderLink;

    return (
      <LinkAs
        className={classNames.link}
        styles={buttonStyles}
        href={link.url || (link.forceAnchor ? '#' : undefined)}
        iconProps={link.iconProps || { iconName: link.icon }}
        // eslint-disable-next-line react/jsx-no-bind
        onClick={
          link.onClick ? this._onNavButtonLinkClicked.bind(this, link) : this._onNavAnchorLinkClicked.bind(this, link)
        }
        title={link.title !== undefined ? link.title : link.name}
        target={link.target}
        rel={rel}
        disabled={link.disabled}
        aria-current={isSelectedLink ? ariaCurrent : undefined}
        aria-label={link.ariaLabel ? link.ariaLabel : undefined}
        link={link}
      >
        {onRenderLink(link)}
      </LinkAs>
    );
  }

  private _renderCompositeLink(link: INavLink, linkIndex: number, nestingLevel: number): React.ReactElement<{}> {
    const divProps: React.HTMLProps<HTMLDivElement> = { ...getNativeProps(link, divProperties, ['onClick']) };
    // eslint-disable-next-line deprecation/deprecation
    const { expandButtonAriaLabel, styles, groups, theme } = this.props;
    const classNames = getClassNames(styles!, {
      theme: theme!,
      isExpanded: !!link.isExpanded,
      isSelected: this._isLinkSelected(link),
      isLink: true,
      isDisabled: link.disabled,
      position: _indentationSize * nestingLevel + 1,
      groups,
    });

    let finalExpandBtnAriaLabel = '';
    if (link.links && link.links.length > 0) {
      if (link.collapseAriaLabel || link.expandAriaLabel) {
        // still respect link.collapseAriaLabel, even though it's deprecated in favor of expandAriaLabel
        const collapseAriaLabel = link.collapseAriaLabel ?? link.expandAriaLabel;

        finalExpandBtnAriaLabel = link.isExpanded ? collapseAriaLabel! : link.expandAriaLabel!;
      } else {
        // TODO remove when `expandButtonAriaLabel` is removed. This is not an ideal concatenation for localization.
        finalExpandBtnAriaLabel = expandButtonAriaLabel ? `${link.name} ${expandButtonAriaLabel}` : link.name;
      }
    }

    return (
      <div {...divProps} key={link.key || linkIndex} className={classNames.compositeLink}>
        {link.links && link.links.length > 0 ? (
          <button
            className={classNames.chevronButton}
            onClick={this._onLinkExpandClicked.bind(this, link)}
            aria-label={finalExpandBtnAriaLabel}
            aria-expanded={link.isExpanded ? 'true' : 'false'}
          >
            <Icon className={classNames.chevronIcon} iconName="ChevronDown" />
          </button>
        ) : null}
        {this._renderNavLink(link, linkIndex, nestingLevel)}
      </div>
    );
  }

  private _renderLink(link: INavLink, linkIndex: number, nestingLevel: number): React.ReactElement<{}> {
    const { styles, groups, theme } = this.props;
    const classNames = getClassNames(styles!, { theme: theme!, groups });

    return (
      <li key={link.key || linkIndex} role="listitem" className={classNames.navItem}>
        {this._renderCompositeLink(link, linkIndex, nestingLevel)}
        {link.isExpanded ? this._renderLinks(link.links, ++nestingLevel) : null}
      </li>
    );
  }

  private _renderLinks(links: INavLink[] | undefined, nestingLevel: number): React.ReactElement<{}> | null {
    if (!links || !links.length) {
      return null;
    }
    const linkElements: React.ReactElement<{}>[] = links.map((link: INavLink, linkIndex: number) =>
      this._renderLink(link, linkIndex, nestingLevel),
    );

    const { styles, groups, theme } = this.props;
    const classNames = getClassNames(styles!, { theme: theme!, groups });

    return (
      <ul role="list" className={classNames.navItems}>
        {linkElements}
      </ul>
    );
  }

  private _renderGroup = (group: INavLinkGroup, groupIndex: number): React.ReactElement<{}> => {
    const { styles, groups, theme, onRenderGroupHeader = this._renderGroupHeader } = this.props;

    const isExpanded = this._isGroupExpanded(group);

    const classNames = getClassNames(styles!, {
      theme: theme!,
      isGroup: true,
      isExpanded,
      groups,
    });

    const finalOnHeaderClick = (
      ev?: React.MouseEvent<HTMLElement, MouseEvent> | undefined,
      isCollapsing?: boolean | undefined,
    ) => {
      this._onGroupHeaderClicked(group, ev);
    };

    const groupProps: IRenderGroupHeaderProps = {
      ...group,
      isExpanded,
      onHeaderClick: finalOnHeaderClick,
    };

    return (
      <div key={groupIndex} className={classNames.group}>
        {groupProps.name ? onRenderGroupHeader(groupProps, this._renderGroupHeader) : null}
        <div className={classNames.groupContent}>{this._renderLinks(groupProps.links, 0 /* nestingLevel */)}</div>
      </div>
    );
  };

  private _renderGroupHeader = (group: IRenderGroupHeaderProps): React.ReactElement<{}> => {
    // eslint-disable-next-line deprecation/deprecation
    const { styles, groups, theme, expandButtonAriaLabel } = this.props;

    const { isExpanded } = group;

    const classNames = getClassNames(styles!, {
      theme: theme!,
      isGroup: true,
      isExpanded,
      groups,
    });

    // respect deprecated collapseAriaLabel, but default to expandAriaLabel for both states
    // eslint-disable-next-line deprecation/deprecation
    const collapseAriaLabel = group.collapseAriaLabel ?? group.expandAriaLabel;
    const label = (isExpanded ? collapseAriaLabel : group.expandAriaLabel) || expandButtonAriaLabel;

    const { onHeaderClick } = group;

    const onClick = onHeaderClick
      ? (ev?: React.MouseEvent<HTMLElement, MouseEvent> | undefined) => {
          onHeaderClick(ev, isExpanded);
        }
      : undefined;

    return (
      <button className={classNames.chevronButton} onClick={onClick} aria-label={label} aria-expanded={isExpanded}>
        <Icon className={classNames.chevronIcon} iconName="ChevronDown" />
        {group.name}
      </button>
    );
  };

  private _onGroupHeaderClicked(group: INavLinkGroup, ev?: React.MouseEvent<HTMLElement>): void {
    if (group.onHeaderClick) {
      group.onHeaderClick(ev, this._isGroupExpanded(group));
    }

    if (group.isExpanded === undefined) {
      this._toggleCollapsed(group);
    }

    if (ev) {
      ev.preventDefault();
      ev.stopPropagation();
    }
  }

  private _onLinkExpandClicked(link: INavLink, ev: React.MouseEvent<HTMLElement>): void {
    const { onLinkExpandClick } = this.props;

    if (onLinkExpandClick) {
      onLinkExpandClick(ev, link);
    }

    if (!ev.defaultPrevented) {
      link.isExpanded = !link.isExpanded;
      this.setState({ isLinkExpandStateChanged: true });
    }

    ev.preventDefault();
    ev.stopPropagation();
  }

  private _preventBounce(link: INavLink, ev: React.MouseEvent<HTMLElement>): void {
    if (!link.url && link.forceAnchor) {
      ev.preventDefault();
    }
  }

  private _onNavAnchorLinkClicked(link: INavLink, ev: React.MouseEvent<HTMLElement>): void {
    // If the href is "#" we should call preventDefault to prevent scrolling to the top of the page
    this._preventBounce(link, ev);

    if (this.props.onLinkClick) {
      this.props.onLinkClick(ev, link);
    }
    if (!link.url && link.links && link.links.length > 0) {
      this._onLinkExpandClicked(link, ev);
    }

    this.setState({ selectedKey: link.key });
  }

  private _onNavButtonLinkClicked(link: INavLink, ev: React.MouseEvent<HTMLElement>): void {
    // If the href is "#" we should call preventDefault to prevent scrolling to the top of the page
    this._preventBounce(link, ev);

    if (link.onClick) {
      link.onClick(ev, link);
    }
    if (!link.url && link.links && link.links.length > 0) {
      this._onLinkExpandClicked(link, ev);
    }

    this.setState({ selectedKey: link.key });
  }

  private _isLinkSelected(link: INavLink): boolean {
    // if caller passes in selectedKey, use it as first choice or
    // if current state.selectedKey (from addressbar) is match to the link or
    // check if URL is matching location.href (if link.url exists)
    if (this.props.selectedKey !== undefined) {
      return link.key === this.props.selectedKey;
    } else if (this.state.selectedKey !== undefined) {
      return link.key === this.state.selectedKey;
    } else if (typeof getWindow() === 'undefined' || !link.url) {
      // resolve is not supported for ssr
      return false;
    } else {
      const doc = getDocumentEx(this.context)!; // there is an SSR check above so this is safe
      // If selectedKey is undefined in props and state, then check URL
      _urlResolver = _urlResolver || doc.createElement('a');

      _urlResolver.href = link.url || '';
      const target: string = _urlResolver.href;

      if (location.href === target) {
        return true;
      }

      // If selectedKey is not defined in state, then check URL to determine link selected status
      if (location.protocol + '//' + location.host + location.pathname === target) {
        return true;
      }

      if (location.hash) {
        // Match the hash to the url.
        if (location.hash === link.url) {
          return true;
        }

        // Match a rebased url. (e.g. #foo becomes http://hostname/foo)
        _urlResolver.href = location.hash.substring(1);

        return _urlResolver.href === target;
      }
    }

    return false;
  }

  private _isGroupExpanded(group: INavLinkGroup): boolean {
    if (group.isExpanded !== undefined) {
      return group.isExpanded;
    }
    if (group.name && this.state.isGroupCollapsed.hasOwnProperty(group.name)) {
      return !this.state.isGroupCollapsed[group.name];
    }
    if (group.collapseByDefault !== undefined) {
      return !group.collapseByDefault;
    }
    return true;
  }

  private _toggleCollapsed(group: INavLinkGroup): void {
    if (group.name) {
      const newGroupCollapsed = {
        ...this.state.isGroupCollapsed, // Make a copy in order to not modify state
        [group.name]: this._isGroupExpanded(group), // sic - presently open will be collapsed after setState
      };
      this.setState({ isGroupCollapsed: newGroupCollapsed });
    }
  }
}
