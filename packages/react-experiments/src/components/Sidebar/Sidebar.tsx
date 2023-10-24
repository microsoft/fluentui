/*!
 * Copyright (C) Microsoft Corporation. All rights reserved.
 */

import { FocusZone, FocusZoneDirection } from '@fluentui/react/lib/FocusZone';
import { DirectionalHint } from '@fluentui/react/lib/Callout';
import { ScrollablePane } from '@fluentui/react/lib/ScrollablePane';
import { concatStyleSets } from '@fluentui/react/lib/Styling';
import { KeyCodes, initializeComponentRef, FocusRects } from '@fluentui/react/lib/Utilities';
import * as React from 'react';
import { Accordion } from '../BAFAccordion/Accordion';
import { getSidebarClassNames } from './Sidebar.classNames';
import { getButtonColoredStyles, getSidebarStyles, SidebarColors } from './Sidebar.styles';
import { SidebarButton } from './SidebarButton';
import { getSidebarChildrenStyles } from './SidebarButton.styles';
import type { IButtonStyles } from '@fluentui/react/lib/Button';
import type { ITheme } from '@fluentui/react/lib/Styling';
import type { ISidebarClassNames } from './Sidebar.classNames';
import type { ISidebar, ISidebarItemProps, ISidebarProps } from './Sidebar.types';

export interface ISidebarState {
  // whether the sidebar is currently collapsed or not.
  isCollapsed: boolean;
}

export class Sidebar extends React.Component<ISidebarProps, ISidebarState> implements ISidebar {
  private _theme: ITheme;
  private _classNames: ISidebarClassNames;
  private _colors: SidebarColors;
  private _buttonStyles: IButtonStyles;

  constructor(props: ISidebarProps) {
    super(props);

    initializeComponentRef(this);
    this.state = {
      isCollapsed: false,
    };
  }

  /*
   * ComponentDidMount is used in the sidebar to adjust the height of the sidebar content
   * to allow the content scrollbar to be correctly sized.
   */
  public componentDidMount(): void {
    const parentId = this.props.id ? this.props.id : '';
    const sidebar = document.getElementsByClassName(`ba-Sidebar-${parentId}`)[0] as HTMLElement;
    const sidebarFooter = document.getElementsByClassName(`ba-SidebarFooter-${parentId}`)[0] as HTMLElement;
    const sidebarContent = document.getElementsByClassName(`ba-SidebarContent-${parentId}`)[0] as HTMLElement;
    if (sidebarContent && sidebar && sidebarFooter) {
      sidebarContent.setAttribute('style', 'height: ' + (sidebar.offsetHeight - sidebarFooter.offsetHeight + 'px'));
    }
  }

  public render(): JSX.Element {
    const { theme, styles, collapseButtonStyles, className, collapseButtonAriaLabel, footerItems, id, items } =
      this.props;

    this._theme = theme!;
    this._colors = this.props.colors !== undefined ? this.props.colors : SidebarColors.Light;
    this._buttonStyles = getButtonColoredStyles(theme!, this._colors, this.props.buttonStyles);

    this._classNames = getSidebarClassNames(
      getSidebarStyles(theme!, this._colors, styles),
      className,
      this.state.isCollapsed,
    );

    const ButtonAs = this._getButtonAs();

    return (
      <div
        className={this._classNames.root}
        role="menu"
        aria-orientation={'vertical'}
        aria-expanded={!this.state.isCollapsed}
      >
        <ScrollablePane
          className={this._classNames.content}
          styles={{
            contentContainer: {
              overflowX: 'hidden',
            },
          }}
        >
          {this.props.collapsible && (
            <ButtonAs
              key={'baSidebarCollapsibleButton'}
              iconProps={{ iconName: 'GlobalNavButton' }}
              onClick={this.toggleCollapsed}
              ariaLabel={collapseButtonAriaLabel}
              theme={this._theme}
              aria-expanded={!this.state.isCollapsed}
              styles={concatStyleSets(this._buttonStyles, collapseButtonStyles)}
            />
          )}
          <FocusZone direction={FocusZoneDirection.vertical}>
            {items && items.map((item: ISidebarItemProps) => this._renderItemInSidebar(item))}
          </FocusZone>
        </ScrollablePane>
        {footerItems && (
          <FocusZone
            direction={FocusZoneDirection.vertical}
            className={this._classNames.footer}
            key={`baSidebarFooter${id}`}
          >
            {footerItems.map((item: ISidebarItemProps) => this._renderItemInSidebar(item))}
          </FocusZone>
        )}
        <FocusRects />
      </div>
    );
  }

  public toggleCollapsed = () => {
    this.setState((prevState: ISidebarState) => {
      return { isCollapsed: !this.state.isCollapsed };
    });

    if (this.props.onCollapseChanged) {
      this.props.onCollapseChanged();
    }
  };

  public setCollapsed(newValue: boolean): void {
    this.setState((prevState: ISidebarState) => {
      return { isCollapsed: newValue };
    });

    if (this.props.onCollapseChanged) {
      this.props.onCollapseChanged();
    }
  }

  public getCollapsed(): boolean {
    return this.state.isCollapsed;
  }

  private _renderItemInSidebar(item: ISidebarItemProps): JSX.Element | null {
    if (!item) {
      return null;
    }
    if (item.onRender) {
      return item.onRender(item, () => undefined) as JSX.Element;
    } else if (item.items && item.items.length > 0) {
      return this._renderSidebarItemWithChildren(item);
    }
    return this._renderSidebarButton(item);
  }

  private _renderSidebarButton(item: ISidebarItemProps, overrideCollapse: boolean = false): JSX.Element | null {
    if (!item) {
      return null;
    }

    const ButtonAs = this._getButtonAs(item);
    // eslint-disable-next-line deprecation/deprecation
    const name = item.text || item.name;

    return (
      <div key={item.key}>
        <ButtonAs
          text={this.state.isCollapsed && !overrideCollapse ? null : name}
          iconProps={item.iconProps ? item.iconProps : { iconName: '' }}
          menuIconProps={this.state.isCollapsed ? null : item.subMenuIconProps}
          className={this._getClassNames('ba-SidebarButton', item)}
          role="menuitem"
          ariaLabel={name}
          title={item.title ? item.title : name}
          styles={concatStyleSets(this._buttonStyles, item.styles)}
          theme={this._theme}
          checked={item.active}
          disabled={item.disabled}
          onClick={this._onItemClick(item)}
          aria-current={item.active}
        />
      </div>
    );
  }

  private _renderSidebarItemWithChildren(item: ISidebarItemProps): JSX.Element | null {
    if (!item || !item.items) {
      return null;
    }

    if (!this.state.isCollapsed && item.items) {
      return this._renderSidebarAccordion(item);
    }

    return this._renderSidebarButtonWithMenu(item);
  }

  private _renderSidebarAccordion(item: ISidebarItemProps): JSX.Element | null {
    if (!item || !item.items) {
      return null;
    }

    let numActiveChildren = 0;

    if (item.items) {
      numActiveChildren = item.items.filter((child: ISidebarItemProps) => {
        return child.active;
      }).length;
    }

    const ButtonAs = this._getButtonAs(item);
    // eslint-disable-next-line deprecation/deprecation
    const name = item.text || item.name;

    return (
      <div className={this._getClassNames('ba-SidebarAccordion', item)} key={item.key}>
        <Accordion
          text={name}
          iconProps={item.iconProps}
          menuIconProps={item.subMenuIconProps}
          role={'menuitem'}
          ariaLabel={name}
          title={item.tooltip}
          styles={concatStyleSets(this._buttonStyles, item.styles as IButtonStyles)}
          theme={this._theme}
          checked={numActiveChildren > 0 ? true : false}
          aria-current={numActiveChildren > 0 ? true : false}
          buttonAs={ButtonAs}
          // eslint-disable-next-line react/jsx-no-bind
          onRenderContent={() => {
            return this._renderAccordionItems(item.items);
          }}
          // eslint-disable-next-line react/jsx-no-bind
          onOpen={() => {
            this.componentDidMount();
          }}
          // eslint-disable-next-line react/jsx-no-bind
          onClose={() => {
            this.componentDidMount();
          }}
        />
      </div>
    );
  }

  private _renderAccordionItems(items: ISidebarItemProps[] | undefined): JSX.Element | null {
    if (!items) {
      return null;
    }

    const children = items.map((item: ISidebarItemProps) => {
      const style = item.styles;
      item.styles = getSidebarChildrenStyles(this._theme!, item.styles)!;
      const button = this._renderSidebarButton(item);
      item.styles = style;
      return button;
    });

    return <div>{children}</div>;
  }

  private _renderSidebarButtonWithMenu(item: ISidebarItemProps): JSX.Element | null {
    if (!item || !item.items) {
      return null;
    }

    const numActiveChildren = item.items.filter((child: ISidebarItemProps) => {
      return child.active;
    }).length;

    const children = item.items.map((child: ISidebarItemProps) => {
      child.onRender = this._renderSidebarButtonMenuItem;
      return child;
    });

    // eslint-disable-next-line deprecation/deprecation
    const name = item.text || item.name;

    if (name) {
      children.unshift({
        key: name + '-header',
        name: name,
        iconProps: { iconName: '' },
        className: 'ba-SidebarContextualMenuButton-header ',
        disabled: true,
        styles: concatStyleSets(item.styles, {
          root: {
            borderBottomWidth: '1px',
            borderBottomStyle: 'solid',
            borderBottomColor: this._theme.semanticColors.bodyDivider,
          },
          icon: {
            width: '0',
            marginRight: '0',
          },
        }),
        onRender: this._renderSidebarButtonMenuItem,
      });
    }

    const ButtonAs = this._getButtonAs(item);

    return (
      <div key={item.key}>
        <ButtonAs
          key={item.key}
          text={this.state.isCollapsed ? '' : name}
          iconProps={item.iconProps}
          menuIconProps={this.state.isCollapsed ? { iconName: '' } : item.subMenuIconProps}
          menuProps={{
            items: children,
            directionalHint: DirectionalHint.rightTopEdge,
            ariaLabel: name,
            calloutProps: {
              styles: {
                root: {
                  borderWidth: '0',
                },
              },
            },
          }}
          menuTriggerKeyCode={KeyCodes.right}
          className={this._getClassNames('ba-SidebarContextualMenuButton', item)}
          role="menuitem"
          ariaLabel={name}
          title={item.title ? item.title : name}
          styles={concatStyleSets(this._buttonStyles, item.styles)}
          theme={this._theme}
          checked={numActiveChildren > 0 ? true : false}
          aria-current={numActiveChildren > 0 ? true : false}
          disabled={item.disabled}
          onClick={this._onItemClick(item)}
        />
      </div>
    );
  }

  private _onItemClick(item: ISidebarItemProps): (ev: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void {
    return (ev: React.MouseEvent<HTMLButtonElement>): void => {
      if (item.active) {
        return;
      }

      if (item.onClick) {
        item.onClick(ev, item);
      }
    };
  }

  private _getButtonAs(item?: ISidebarItemProps): any {
    if (item && item.buttonAs) {
      return item.buttonAs;
    } else if (this.props.defaultButton) {
      return this.props.defaultButton;
    }

    return SidebarButton;
  }

  private _getClassNames(defaultClass: string, item: ISidebarItemProps): string {
    let className = defaultClass + ' ';
    className += item.className ? item.className : '';
    return className;
  }

  private _renderSidebarButtonMenuItem = (item: any, dismissMenu: () => void): JSX.Element | null => {
    return this._renderSidebarButton(item, true);
  };
}
