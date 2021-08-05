import * as React from 'react';
import { IProcessedStyleSet, ITheme } from '../../Styling';
import { composeRenderFunction, classNamesFunction, getId, getRTL, getRTLSafeKeyCode, KeyCodes } from '../../Utilities';
import { SelectionMode } from '../../Selection';
import { Check } from '../../Check';
import { Icon } from '../../Icon';
import { GroupSpacer } from './GroupSpacer';
import { Spinner } from '../../Spinner';
import {
  IGroupHeaderStyleProps,
  IGroupHeaderStyles,
  IGroupHeaderProps,
  IGroupHeaderCheckboxProps,
} from './GroupHeader.types';
import { CHECK_CELL_WIDTH } from '../DetailsList/DetailsRowCheck.styles';

const getClassNames = classNamesFunction<IGroupHeaderStyleProps, IGroupHeaderStyles>();

export interface IGroupHeaderState {
  isCollapsed: boolean;
  isLoadingVisible: boolean;
}

export class GroupHeaderBase extends React.Component<IGroupHeaderProps, IGroupHeaderState> {
  public static defaultProps: IGroupHeaderProps = {
    expandButtonProps: { 'aria-label': 'expand collapse group' },
  };

  private _classNames: IProcessedStyleSet<IGroupHeaderStyles>;
  private _id: string;

  public static getDerivedStateFromProps(
    nextProps: IGroupHeaderProps,
    previousState: IGroupHeaderState,
  ): IGroupHeaderState {
    if (nextProps.group) {
      const newCollapsed = nextProps.group.isCollapsed;
      const isGroupLoading = nextProps.isGroupLoading;
      const newLoadingVisible = !newCollapsed && isGroupLoading && isGroupLoading(nextProps.group);

      return {
        ...previousState,
        isCollapsed: newCollapsed || false,
        isLoadingVisible: newLoadingVisible || false,
      };
    }

    return previousState;
  }

  constructor(props: IGroupHeaderProps) {
    super(props);

    this._id = getId('GroupHeader');

    this.state = {
      isCollapsed: (this.props.group && this.props.group.isCollapsed) as boolean,
      isLoadingVisible: false,
    };
  }

  public render(): JSX.Element | null {
    const {
      group,
      groupLevel = 0,
      viewport,
      selectionMode,
      loadingText,
      // eslint-disable-next-line deprecation/deprecation
      isSelected = false,
      selected = false,
      indentWidth,
      onRenderTitle = this._onRenderTitle,
      onRenderGroupHeaderCheckbox,
      isCollapsedGroupSelectVisible = true,
      expandButtonProps,
      expandButtonIcon,
      selectAllButtonProps,
      theme,
      styles,
      className,
      compact,
      ariaPosInSet,
      ariaSetSize,
      ariaRowIndex,
      useFastIcons,
    } = this.props;

    const defaultCheckboxRender = useFastIcons ? this._fastDefaultCheckboxRender : this._defaultCheckboxRender;

    const onRenderCheckbox = onRenderGroupHeaderCheckbox
      ? composeRenderFunction(onRenderGroupHeaderCheckbox, defaultCheckboxRender)
      : defaultCheckboxRender;

    const { isCollapsed, isLoadingVisible } = this.state;

    const canSelectGroup = selectionMode === SelectionMode.multiple;
    const isSelectionCheckVisible = canSelectGroup && (isCollapsedGroupSelectVisible || !(group && group.isCollapsed));
    const currentlySelected = selected || isSelected;

    const isRTL = getRTL(theme);

    this._classNames = getClassNames(styles, {
      theme: theme!,
      className,
      selected: currentlySelected,
      isCollapsed,
      compact,
    });

    if (!group) {
      return null;
    }

    return (
      <div
        className={this._classNames.root}
        style={viewport ? { minWidth: viewport.width } : {}}
        onClick={this._onHeaderClick}
        role="row"
        aria-setsize={ariaSetSize}
        aria-posinset={ariaPosInSet}
        aria-rowindex={ariaRowIndex}
        data-is-focusable={true}
        onKeyUp={this._onKeyUp}
        aria-label={group.ariaLabel}
        aria-labelledby={group.ariaLabel ? undefined : this._id}
        aria-expanded={!this.state.isCollapsed}
        aria-selected={canSelectGroup ? currentlySelected : undefined}
        aria-level={groupLevel + 1}
      >
        <div className={this._classNames.groupHeaderContainer} role="presentation">
          {isSelectionCheckVisible ? (
            <div role="gridcell">
              <button
                data-is-focusable={false}
                type="button"
                className={this._classNames.check}
                role="checkbox"
                id={`${this._id}-check`}
                aria-checked={currentlySelected}
                aria-labelledby={`${this._id}-check ${this._id}`}
                data-selection-toggle={true}
                onClick={this._onToggleSelectGroupClick}
                {...selectAllButtonProps}
              >
                {onRenderCheckbox({ checked: currentlySelected, theme }, onRenderCheckbox)}
              </button>
            </div>
          ) : (
            // To make the group header align properly with the column headers, this spacer
            // needs to be the same width as the check cell in the column header.
            selectionMode !== SelectionMode.none && <GroupSpacer indentWidth={CHECK_CELL_WIDTH} count={1} />
          )}

          <GroupSpacer indentWidth={indentWidth} count={groupLevel!} />

          <div className={this._classNames.dropIcon} role="presentation">
            <Icon iconName="Tag" />
          </div>
          <div role="gridcell">
            <button
              data-is-focusable={false}
              type="button"
              className={this._classNames.expand}
              onClick={this._onToggleClick}
              aria-expanded={!this.state.isCollapsed}
              {...expandButtonProps}
            >
              <Icon
                className={this._classNames.expandIsCollapsed}
                iconName={expandButtonIcon || (isRTL ? 'ChevronLeftMed' : 'ChevronRightMed')}
              />
            </button>
          </div>

          {onRenderTitle(this.props, this._onRenderTitle)}
          {isLoadingVisible && <Spinner label={loadingText} />}
        </div>
      </div>
    );
  }

  private _toggleCollapse = () => {
    const { group, onToggleCollapse, isGroupLoading } = this.props;
    const { isCollapsed } = this.state;

    const newCollapsed = !isCollapsed;
    const newLoadingVisible = !newCollapsed && isGroupLoading && isGroupLoading(group!);

    this.setState({
      isCollapsed: newCollapsed,
      isLoadingVisible: newLoadingVisible as boolean,
    });
    if (onToggleCollapse) {
      onToggleCollapse(group!);
    }
  };

  private _onKeyUp = (ev: React.KeyboardEvent<HTMLElement>): void => {
    const { group, onGroupHeaderKeyUp } = this.props;

    if (onGroupHeaderKeyUp) {
      onGroupHeaderKeyUp(ev, group);
    }

    if (!ev.defaultPrevented) {
      // eslint-disable-next-line deprecation/deprecation
      const shouldOpen = this.state.isCollapsed && ev.which === getRTLSafeKeyCode(KeyCodes.right, this.props.theme);
      // eslint-disable-next-line deprecation/deprecation
      const shouldClose = !this.state.isCollapsed && ev.which === getRTLSafeKeyCode(KeyCodes.left, this.props.theme);
      if (shouldClose || shouldOpen) {
        this._toggleCollapse();
        ev.stopPropagation();
        ev.preventDefault();
      }
    }
  };

  private _onToggleClick = (ev: React.MouseEvent<HTMLElement>): void => {
    this._toggleCollapse();
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

  private _defaultCheckboxRender(checkboxProps: IGroupHeaderCheckboxProps) {
    return <Check checked={checkboxProps.checked} />;
  }

  private _fastDefaultCheckboxRender(checkboxProps: IGroupHeaderCheckboxProps) {
    return <FastCheck theme={checkboxProps.theme} checked={checkboxProps.checked} />;
  }

  private _onRenderTitle = (props: IGroupHeaderProps): JSX.Element | null => {
    const { group, ariaColSpan } = props;

    if (!group) {
      return null;
    }

    return (
      <div className={this._classNames.title} id={this._id} role="gridcell" aria-colspan={ariaColSpan}>
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

const FastCheck = React.memo((props: { theme?: ITheme; checked?: boolean; className?: string }) => {
  return <Check theme={props.theme} checked={props.checked} className={props.className} useFastIcons />;
});
