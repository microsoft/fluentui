import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as stickyfill from 'stickyfilljs';

import { CommandBar, ICommandBarItemProps } from 'office-ui-fabric-react/lib/CommandBar';
import {
  ConstrainMode,
  DetailsListLayoutMode,
  IColumn as ICompositeListColumn,
  IDetailsList,
  IDetailsRowProps
} from 'office-ui-fabric-react/lib/DetailsList';
import { SearchBox } from 'office-ui-fabric-react/lib/SearchBox';
import { ISelection, Selection, SelectionMode } from 'office-ui-fabric-react/lib/Selection';
import { ShimmeredDetailsList } from 'office-ui-fabric-react/lib/ShimmeredDetailsList';
import { mergeStyles, mergeStyleSets } from 'office-ui-fabric-react/lib/Styling';
import { IRenderFunction } from 'office-ui-fabric-react/lib/Utilities';

import {
  getCommandBarItemStyle,
  getCommandBarSearchBoxStyle,
  getCommandBarSelectionCountItemStyles,
  getCommandBarStyle,
  getCommandBarWrapperStyle,
  getDetailsListStyle
} from './CompositeList.styles';

import { ICompositeListFarItemOptions, ICompositeListProps } from './CompositeList.types';

export interface ICompositeListStates {
  numberOfItemsSelected: number;
  isCompactMode: boolean;
}

export class CompositeList extends React.PureComponent<ICompositeListProps, ICompositeListStates> {
  private readonly selection: ISelection;
  private readonly selectionMode: SelectionMode;
  private readonly commandBarRef = React.createRef<HTMLDivElement>();
  private readonly detailsListRef = React.createRef<IDetailsList>();

  constructor(props: ICompositeListProps) {
    super(props);

    this.selectionMode = props.detailsListProps.selectionMode || SelectionMode.multiple;

    this.selection =
      this.props.detailsListProps.selection ||
      new Selection({
        onSelectionChanged: () => {
          this.setState({
            numberOfItemsSelected: this.selection.getSelectedCount()
          });
        },
        selectionMode: this.selectionMode
      });

    this.state = {
      numberOfItemsSelected: 0,
      isCompactMode: false
    };
  }
  public render(): React.ReactNode {
    const wrappedColumns =
      this.props.detailsListProps.columns === undefined
        ? undefined
        : this.props.detailsListProps.columns.map((column: ICompositeListColumn) => {
            return {
              isResizable: true,
              ...column
            };
          });

    const useReducedRowRenderer =
      wrappedColumns === undefined || !wrappedColumns.some((column: ICompositeListColumn) => column.isResizable === true);

    const farItems =
      this.props.onGetFarItems !== undefined ? this.props.onGetFarItems(this.defaultFarItemsFactory) : this.defaultFarItemsFactory({});
    const showCommandBar = this.props.hideCommandBar === undefined || !this.props.hideCommandBar;

    const wrappedCommandBarItems = this.props.commandBarProps.items.map((item: ICommandBarItemProps) => {
      const mergedButtonStyles = mergeStyleSets(getCommandBarItemStyle(), item.buttonStyles);
      return {
        ...item,
        buttonStyles: mergedButtonStyles
      };
    });

    const mergedCommandBarStyle = mergeStyleSets(getCommandBarStyle(), this.props.commandBarProps.styles);
    const commandBarWrapperStyle = getCommandBarWrapperStyle();

    return (
      <>
        <div ref={this.commandBarRef} className={mergeStyles(commandBarWrapperStyle)}>
          {showCommandBar && (
            <CommandBar farItems={farItems} {...this.props.commandBarProps} styles={mergedCommandBarStyle} items={wrappedCommandBarItems} />
          )}
        </div>
        <ShimmeredDetailsList
          shimmerLines={20}
          enableShimmer={this.props.detailsListProps.items.length === 0}
          componentRef={this.detailsListRef}
          layoutMode={DetailsListLayoutMode.fixedColumns}
          constrainMode={ConstrainMode.unconstrained}
          onShouldVirtualize={this.defaultOnShouldVirtualize}
          useReducedRowRenderer={useReducedRowRenderer}
          onRenderRow={this.defaultOnRenderRow}
          className={mergeStyles(getDetailsListStyle(showCommandBar))}
          {...this.props.detailsListProps}
          styles={this.props.detailsListProps.styles}
          selection={this.selection}
          compact={this.isCompactMode}
          columns={wrappedColumns}
        />
      </>
    );
  }

  public componentDidMount(): void {
    stickyfill.addOne(this.commandBarRef.current!);

    // tslint:disable-next-line:no-any
    const titleWrapper = (ReactDOM.findDOMNode((this.detailsListRef.current! as any) as React.ReactInstance) as Element).querySelector(
      '.ms-DetailsList-headerWrapper'
    );

    if (titleWrapper) {
      stickyfill.addOne(titleWrapper as HTMLElement);
    }
  }

  private readonly defaultOnRenderRow = (props: IDetailsRowProps, defaultRender: IRenderFunction<IDetailsRowProps>): JSX.Element => {
    return <div>{defaultRender({ ...props })}</div>;
  };

  private get isCompactMode(): boolean {
    return this.props.isCompactMode || this.state.isCompactMode;
  }
  private get numberOfItemsSelected(): number {
    return this.props.numberOfItemsSelected || this.state.numberOfItemsSelected;
  }
  private readonly defaultOnShouldVirtualize = () => this.props.detailsListProps.items.length >= 50;
  private readonly defaultOnClickSelected = () => this.selection.setAllSelected(false);
  private readonly defaultNormalListOnClick = () => {
    this.setState({
      isCompactMode: false
    });
  };
  private readonly defaultCompactListOnClick = () => {
    this.setState({
      isCompactMode: true
    });
  };
  private readonly defaultFarItemsFactory = (options: ICompositeListFarItemOptions) => {
    const getSelectedText = options.getSelectedText || ((count: number) => `${count} selected`);
    const getSelectedAriaLable = options.getSelectedAriaLabel || ((count: number) => `${count} selected items`);

    const mergedCommandBarItemStyle = mergeStyleSets(
      getCommandBarItemStyle(),
      options.compactMenuProps ? options.compactMenuProps.buttonStyles : undefined
    );

    const farItems: ICommandBarItemProps[] = [
      {
        key: 'search',
        onRender: (): React.ReactNode => {
          const mergedCommandBarSearchBoxStyle = mergeStyleSets(
            getCommandBarSearchBoxStyle(),
            options.searchBoxProps ? options.searchBoxProps.styles : undefined
          );
          return (
            <SearchBox
              ariaLabel={'Input for searching this list'}
              placeholder="Search"
              underlined={true}
              {...options.searchBoxProps}
              styles={mergedCommandBarSearchBoxStyle}
            />
          );
        },
        ...options.searchMenuItemProps
      },
      {
        key: 'listStyle',
        iconProps: { iconName: this.isCompactMode ? 'AlignLeft' : 'List' },
        title: 'Change view',
        subMenuProps: {
          items: [
            {
              key: 'normalList',
              text: 'Normal list',
              canCheck: true,
              checked: !this.isCompactMode,
              iconProps: { iconName: 'List' },
              onClick: this.props.onCompactModeChanged ? this.props.onCompactModeChanged.bind(false) : this.defaultNormalListOnClick,
              ...options.compactMenuNormalListItemProps
            },
            {
              key: 'compactList',
              text: 'Compact list',
              canCheck: true,
              checked: this.props.isCompactMode,
              iconProps: { iconName: 'AlignLeft' },
              onClick: this.props.onCompactModeChanged ? this.props.onCompactModeChanged.bind(true) : this.defaultCompactListOnClick,
              ...options.compactMenuCompactListItemProps
            }
          ]
        },
        ...options.compactMenuProps,
        buttonStyles: mergedCommandBarItemStyle
      }
    ];

    if (this.numberOfItemsSelected > 0) {
      const mergedCommandBarSelectionCountItemStyle = mergeStyleSets(
        getCommandBarSelectionCountItemStyles(),
        options.selectedMenuItemProps ? options.selectedMenuItemProps.buttonStyles : undefined
      );
      farItems.unshift({
        key: 'selectionCount',
        text: getSelectedText(this.numberOfItemsSelected),
        ariaLabel: getSelectedAriaLable(this.numberOfItemsSelected),
        iconProps: { iconName: 'Clear' },
        onClick: this.defaultOnClickSelected,
        ...options.selectedMenuItemProps,
        buttonStyles: mergedCommandBarSelectionCountItemStyle
      });
    }

    return farItems;
  };
}

export { ICompositeListColumn };
