import * as React from 'react';
import { BaseComponent, classNamesFunction, IClassNames, getRTL } from '../../Utilities';
import { SelectionMode } from '../../utilities/selection/index';
import { Check } from '../../Check';
import { Icon } from '../../Icon';
import { GroupSpacer } from './GroupSpacer';
import { Spinner } from '../../Spinner';
import { FocusZone, FocusZoneDirection } from '../../FocusZone';
import { IGroupHeaderStyleProps, IGroupHeaderStyles, IGroupHeaderProps } from './GroupHeader.types';

const getClassNames = classNamesFunction<IGroupHeaderStyleProps, IGroupHeaderStyles>();

export interface IGroupHeaderState {
  isCollapsed: boolean;
  isLoadingVisible: boolean;
}

export class GroupHeaderBase extends BaseComponent<IGroupHeaderProps, IGroupHeaderState> {
  public static defaultProps: IGroupHeaderProps = {
    expandButtonProps: { 'aria-label': 'expand collapse group' }
  };

  private _classNames: IClassNames<IGroupHeaderStyles>;

  constructor(props: IGroupHeaderProps) {
    super(props);

    this.state = {
      isCollapsed: (this.props.group && this.props.group.isCollapsed) as boolean,
      isLoadingVisible: false
    };
  }

  public componentWillReceiveProps(newProps: any): void {
    if (newProps.group) {
      const newCollapsed = newProps.group.isCollapsed;
      const isGroupLoading = newProps.headerProps && newProps.headerProps.isGroupLoading;
      const newLoadingVisible = !newCollapsed && isGroupLoading && isGroupLoading(newProps.group);

      this.setState({
        isCollapsed: newCollapsed,
        isLoadingVisible: newLoadingVisible
      });
    }
  }

  public render(): JSX.Element | null {
    const {
      group,
      groupLevel,
      viewport,
      selectionMode,
      loadingText,
      isSelected,
      selected,
      indentWidth,
      onRenderTitle = this._onRenderTitle,
      isCollapsedGroupSelectVisible = true,
      expandButtonProps,
      selectAllButtonProps,
      theme,
      styles,
      className,
      groupedListId,
      compact
    } = this.props;

    const { isCollapsed, isLoadingVisible } = this.state;

    const canSelectGroup = selectionMode === SelectionMode.multiple;
    const isSelectionCheckVisible = canSelectGroup && (isCollapsedGroupSelectVisible || !(group && group.isCollapsed));
    const currentlySelected = isSelected || selected;

    const isRTL = getRTL();

    this._classNames = getClassNames(styles, {
      theme: theme!,
      className,
      selected: currentlySelected,
      isCollapsed,
      compact
    });

    if (!group) {
      return null;
    }
    return (
      <div
        className={this._classNames.root}
        style={viewport ? { minWidth: viewport.width } : {}}
        onClick={this._onHeaderClick}
        aria-label={group.ariaLabel || group.name}
        data-is-focusable={true}
      >
        <FocusZone className={this._classNames.groupHeaderContainer} direction={FocusZoneDirection.horizontal}>
          {isSelectionCheckVisible ? (
            <button
              type="button"
              className={this._classNames.check}
              role="checkbox"
              aria-checked={!!currentlySelected}
              data-selection-toggle={true}
              onClick={this._onToggleSelectGroupClick}
              {...selectAllButtonProps}
            >
              <Check checked={currentlySelected} />
            </button>
          ) : (
            selectionMode !== SelectionMode.none && <GroupSpacer indentWidth={indentWidth} count={1} />
          )}

          <GroupSpacer indentWidth={indentWidth} count={groupLevel!} />

          <div className={this._classNames.dropIcon}>
            <Icon iconName="Tag" />
          </div>
          <button
            type="button"
            className={this._classNames.expand}
            onClick={this._onToggleCollapse}
            aria-expanded={group ? !group.isCollapsed : undefined}
            aria-controls={group && !group.isCollapsed ? groupedListId : undefined}
            {...expandButtonProps}
          >
            <Icon className={this._classNames.expandIsCollapsed} iconName={isRTL ? 'ChevronLeftMed' : 'ChevronRightMed'} />
          </button>

          {onRenderTitle(this.props, this._onRenderTitle)}

          {isLoadingVisible && <Spinner label={loadingText} />}
        </FocusZone>
      </div>
    );
  }

  private _onToggleCollapse = (ev: React.MouseEvent<HTMLElement>): void => {
    const { group, onToggleCollapse, isGroupLoading } = this.props;
    const { isCollapsed } = this.state;

    const newCollapsed = !isCollapsed;
    const newLoadingVisible = !newCollapsed && isGroupLoading && isGroupLoading(group!);

    this.setState({
      isCollapsed: newCollapsed,
      isLoadingVisible: newLoadingVisible as boolean
    });
    if (onToggleCollapse) {
      onToggleCollapse(group!);
    }

    ev.stopPropagation();
    ev.preventDefault();
  };

  private _onToggleSelectGroupClick = (ev: React.MouseEvent<HTMLElement>): void => {
    const { onToggleSelectGroup, group } = this.props;

    if (onToggleSelectGroup) {
      onToggleSelectGroup(group!);
    }

    ev.preventDefault();
    ev.stopPropagation();
  };

  private _onHeaderClick = (): void => {
    const { group, onGroupHeaderClick, onToggleSelectGroup } = this.props;

    if (onGroupHeaderClick) {
      onGroupHeaderClick(group!);
    } else if (onToggleSelectGroup) {
      onToggleSelectGroup(group!);
    }
  };

  private _onRenderTitle = (props: IGroupHeaderProps): JSX.Element | null => {
    const { group } = props;

    if (!group) {
      return null;
    }

    return (
      <div className={this._classNames.title}>
        <span>{group.name}</span>
        {
          // hasMoreData flag is set when grouping is throttled by SPO server which in turn resorts to regular
          // sorting to simulate grouping behaviors, in which case group count is the number of items returned
          // so far. That's the reason we need to use "+" to show we might have more items than count
          // indicates.
        }
        <span className={this._classNames.headerCount}>
          ({group.count}
          {group.hasMoreData && '+'})
        </span>
      </div>
    );
  };
}
