import * as React from 'react';
import { BaseComponent, classNamesFunction, divProperties, getNativeProps } from '../../Utilities';
import { FocusZone, FocusZoneDirection } from '../../FocusZone';
import { ActionButton } from '../../Button';
import { Icon } from '../../Icon';
import { buttonStyles } from './Nav.styles';
import { INav, INavProps, INavLinkGroup, INavLink, INavStyles, INavStyleProps } from './Nav.types';

// The number pixels per indentation level for Nav links.
const _indentationSize = 14;

// The number of pixels of left margin
const _baseIndent = 3;

// global var used in _isLinkSelectedKey
let _urlResolver: HTMLAnchorElement | undefined;

export function isRelativeUrl(url: string): boolean {
  // A URL is relative if it has no protocol.
  return !!url && !/^[a-z0-9+-.]:\/\//i.test(url);
}

const getClassNames = classNamesFunction<INavStyleProps, INavStyles>();

export interface INavState {
  isGroupCollapsed?: { [key: string]: boolean };
  isLinkExpandStateChanged?: boolean;
  selectedKey?: string;
}

export class NavBase extends BaseComponent<INavProps, INavState> implements INav {
  public static defaultProps: INavProps = {
    groups: null
  };

  constructor(props: INavProps) {
    super(props);

    this.state = {
      isGroupCollapsed: {},
      isLinkExpandStateChanged: false,
      selectedKey: props.initialSelectedKey || props.selectedKey
    };

    if (props.groups) {
      for (const group of props.groups) {
        if (group.collapseByDefault && group.name) {
          this.state.isGroupCollapsed![group.name] = true;
        }
      }
    }
  }

  public componentWillReceiveProps(newProps: INavProps): void {
    const newGroups = newProps.groups || [];
    const isGroupCollapsed = this.state.isGroupCollapsed!;

    // If the component's props were updated, new groups may have been added, which may have
    // collapseByDefault set. Ensure that setting is respected for any new groups.
    // (If isGroupCollapsed is already set for a group, don't overwrite that.)
    let hasUpdated = false;
    for (const newGroup of newGroups) {
      if (newGroup.name && newGroup.collapseByDefault && !isGroupCollapsed.hasOwnProperty(newGroup.name)) {
        isGroupCollapsed[newGroup.name] = true;
        hasUpdated = true;
      }
    }

    if (hasUpdated) {
      this.setState({
        isGroupCollapsed: isGroupCollapsed
      });
    }
  }

  public render(): JSX.Element | null {
    const { styles, groups, className, isOnTop, theme } = this.props;

    if (!groups) {
      return null;
    }

    const groupElements: React.ReactElement<{}>[] = groups.map(this._renderGroup);

    const classNames = getClassNames(styles!, { theme: theme!, className, isOnTop, groups });

    return (
      <FocusZone direction={FocusZoneDirection.vertical}>
        <nav role="navigation" className={classNames.root} aria-label={this.props.ariaLabel}>
          {groupElements}
        </nav>
      </FocusZone>
    );
  }

  public get selectedKey(): string | undefined {
    return this.state.selectedKey;
  }

  private _onRenderLink = (link: INavLink): JSX.Element => {
    const { styles, groups, theme } = this.props;
    const classNames = getClassNames(styles!, { theme: theme!, groups });
    return <div className={classNames.linkText}>{link.name}</div>;
  };

  private _renderNavLink(link: INavLink, linkIndex: number, nestingLevel: number): JSX.Element {
    const { styles, groups, theme, onRenderLink = this._onRenderLink, linkAs: LinkAs = ActionButton } = this.props;

    const classNames = getClassNames(styles!, {
      theme: theme!,
      isSelected: this._isLinkSelected(link),
      isDisabled: link.disabled,
      isButtonEntry: link.onClick && !link.forceAnchor,
      leftPadding: _indentationSize * nestingLevel + _baseIndent,
      groups
    });

    // Prevent hijacking of the parent window if link.target is defined
    const rel = link.url && link.target && !isRelativeUrl(link.url) ? 'noopener noreferrer' : undefined;

    return (
      <LinkAs
        className={classNames.link}
        styles={buttonStyles}
        href={link.url || (link.forceAnchor ? 'javascript:' : undefined)}
        iconProps={link.iconProps || { iconName: link.icon || '' }}
        onClick={link.onClick ? this._onNavButtonLinkClicked.bind(this, link) : this._onNavAnchorLinkClicked.bind(this, link)}
        title={link.title || link.name}
        target={link.target}
        rel={rel}
        disabled={link.disabled}
        aria-label={link.ariaLabel}
      >
        {onRenderLink(link, this._onRenderLink)}
      </LinkAs>
    );
  }

  private _renderCompositeLink(link: INavLink, linkIndex: number, nestingLevel: number): React.ReactElement<{}> {
    const divProps: React.HTMLProps<HTMLDivElement> = { ...getNativeProps(link, divProperties, ['onClick']) };
    const { styles, groups, theme } = this.props;
    const classNames = getClassNames(styles!, {
      theme: theme!,
      isExpanded: !!link.isExpanded,
      isSelected: this._isLinkSelected(link),
      isLink: true,
      isDisabled: link.disabled,
      position: _indentationSize * nestingLevel + 1,
      groups
    });

    return (
      <div {...divProps} key={link.key || linkIndex} className={classNames.compositeLink}>
        {link.links && link.links.length > 0 ? (
          <button
            className={classNames.chevronButton}
            onClick={this._onLinkExpandClicked.bind(this, link)}
            aria-label={this.props.expandButtonAriaLabel}
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
      this._renderLink(link, linkIndex, nestingLevel)
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
    const classNames = getClassNames(styles!, {
      theme: theme!,
      isGroup: true,
      isExpanded: !this.state.isGroupCollapsed![group.name!],
      groups
    });

    return (
      <div key={groupIndex} className={classNames.group}>
        {group.name ? onRenderGroupHeader(group, this._renderGroupHeader) : null}
        <div className={classNames.groupContent}>{this._renderLinks(group.links, 0 /* nestingLevel */)}</div>
      </div>
    );
  };

  private _renderGroupHeader = (group: INavLinkGroup): React.ReactElement<{}> => {
    const { styles, groups, theme, expandButtonAriaLabel } = this.props;
    const classNames = getClassNames(styles!, {
      theme: theme!,
      isGroup: true,
      isExpanded: !this.state.isGroupCollapsed![group.name!],
      groups
    });

    return (
      <button
        className={classNames.chevronButton}
        onClick={this._onGroupHeaderClicked.bind(this, group)}
        aria-label={expandButtonAriaLabel}
        aria-expanded={!this.state.isGroupCollapsed![group.name!]}
      >
        <Icon className={classNames.chevronIcon} iconName="ChevronDown" />
        {group.name}
      </button>
    );
  };

  private _onGroupHeaderClicked(group: INavLinkGroup, ev: React.MouseEvent<HTMLElement>): void {
    const { isGroupCollapsed } = this.state;
    const groupKey = group.name!;
    const isCollapsed = !isGroupCollapsed![groupKey];

    if (group.onHeaderClick) {
      group.onHeaderClick(ev, isCollapsed);
    }

    isGroupCollapsed![groupKey] = isCollapsed;
    this.setState({ isGroupCollapsed: isGroupCollapsed });

    ev.preventDefault();
    ev.stopPropagation();
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

  private _onNavAnchorLinkClicked(link: INavLink, ev: React.MouseEvent<HTMLElement>): void {
    if (this.props.onLinkClick) {
      this.props.onLinkClick(ev, link);
    }
    if (!link.url && link.links && link.links.length > 0) {
      this._onLinkExpandClicked(link, ev);
    }

    this.setState({ selectedKey: link.key });
  }

  private _onNavButtonLinkClicked(link: INavLink, ev: React.MouseEvent<HTMLElement>): void {
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
    // if current state.selectedKey (from addressbar) is match to the link
    if (this.props.selectedKey !== undefined) {
      return link.key === this.props.selectedKey;
    } else if (this.state.selectedKey !== undefined && link.key === this.state.selectedKey) {
      return true;
    }

    // resolve is not supported for ssr
    if (typeof window === 'undefined') {
      return false;
    }

    if (!link.url) {
      return false;
    }

    _urlResolver = _urlResolver || document.createElement('a');

    _urlResolver.href = link.url || '';
    const target: string = _urlResolver.href;

    if (location.href === target) {
      return true;
    }

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
    return false;
  }
}
