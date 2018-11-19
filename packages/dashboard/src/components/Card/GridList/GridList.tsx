import * as React from 'react';
import { IGridListProps, IGridListStyles, IGridColumn, IGridRow, GridColumnContentType } from './GridList.types';
import {
  DetailsList,
  IColumn,
  ColumnActionsMode,
  DetailsListLayoutMode,
  ConstrainMode,
  DetailsRow,
  IDetailsRowProps,
  IDetailsRowStyles
} from 'office-ui-fabric-react/lib/DetailsList';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import { Image, ImageFit } from 'office-ui-fabric-react/lib/Image';
import { CheckboxVisibility } from 'office-ui-fabric-react';
import { getStyles } from './GridList.styles';
import { classNamesFunction } from 'office-ui-fabric-react/lib/Utilities';
import { ActionButton } from 'office-ui-fabric-react/lib/Button';

const getClassNames = classNamesFunction<IGridListProps, IGridListStyles>();
const classNames = getClassNames(getStyles({}));

export class GridList extends React.Component<IGridListProps> {
  constructor(props: IGridListProps) {
    super(props);
  }

  public render(): JSX.Element {
    const rows = this._generateRowItems(this.props.gridRows, this.props.isRowClickable);
    const columns = this._generateColumn(this.props.gridColumns);
    const actionButton = this._renderActionButton(this.props.actionButtonText, this.props.onActionLinkClicked);
    return (
      <div className={classNames.root}>
        <DetailsList
          items={rows}
          setKey="set"
          columns={columns}
          onRenderRow={this._onRenderRow}
          onRenderItemColumn={this._renderItemColumn}
          isHeaderVisible={this.props.isHeaderVisible}
          checkboxVisibility={CheckboxVisibility.hidden}
          onItemInvoked={this._onItemInvoked}
          layoutMode={DetailsListLayoutMode.justified}
          constrainMode={ConstrainMode.unconstrained}
        />
        {actionButton}
      </div>
    );
  }

  private _onRenderRow(props: IDetailsRowProps): JSX.Element {
    const styles: Partial<IDetailsRowStyles> = {
      root: {
        borderBottom: '0px'
      },
      cell: {
        paddingLeft: '0px'
      }
    };
    return <DetailsRow {...props} styles={styles} />;
  }
  // Disabling ts-lint for the signature because Details List expects row parameter as any
  // tslint:disable-next-line
  private _renderItemColumn(row: any, index: number, column: IColumn): JSX.Element | undefined {
    let cell;
    if (column.fieldName === 'c1') {
      cell = row.c1;
    } else if (column.fieldName === 'c2') {
      cell = row.c2;
    } else {
      cell = row.c3;
    }
    const customColorCss = getClassNames(getStyles({ iconColor: cell.iconColor, textColor: cell.textColor, boldText: cell.boldText }));
    switch (column.key) {
      case 'facepile':
        return (
          <div data-selection-invoke={row.isClickable} className={row.isClickable ? classNames.cursonPointer : ''}>
            <span className={classNames.imageAlignment}>
              <Image src={cell.facepileImageSrc} width={24} height={24} imageFit={ImageFit.cover} />
            </span>
            <span className={customColorCss.text}>{cell.content}</span>
          </div>
        );
      case 'icon':
        return (
          <div data-selection-invoke={row.isClickable}>
            <span className={customColorCss.imageAlignment}>
              <Icon iconName={cell.iconName} />
            </span>
            <span className={customColorCss.text}>{cell.content}</span>
          </div>
        );
      case 'textOnly':
        return (
          <span className={customColorCss.text} data-selection-invoke={row.isClickable}>
            {cell.content}
          </span>
        );
    }
  }

  private _renderActionButton(actionButtonText: string | undefined, onActionLinkClicked: VoidFunction | undefined): JSX.Element | null {
    if (actionButtonText !== undefined) {
      return (
        <ActionButton onClick={onActionLinkClicked}>
          <div className={classNames.actionButton}>{actionButtonText}</div>
        </ActionButton>
      );
    }
    return null;
  }

  // Disabling ts-lint for the signature because Details List expects the return parameter as any
  // tslint:disable-next-line
  private _generateRowItems(gridRows: IGridRow[], isClickable?: boolean): any[] {
    // Disabling ts-lint for the because Details List expects row as any
    // tslint:disable-next-line
    const rows: any[] = [];
    gridRows.forEach((gridRow: IGridRow, index: number) => {
      const rowItem = {
        key: index,
        isClickable: isClickable !== undefined ? isClickable : false,
        onRowClicked: gridRow.onRowClicked,
        c1: {
          content: gridRow.c1.content,
          facepileImageSrc: gridRow.c1.facepileImageSrc,
          iconName: gridRow.c1.iconName,
          textColor: gridRow.c1 !== undefined ? gridRow.c1.textColor : undefined,
          iconColor: gridRow.c1 !== undefined ? gridRow.c1.iconColor : undefined,
          boldText: gridRow.c1 !== undefined ? gridRow.c1.boldText : undefined
        },
        c2: {
          content: gridRow.c2 !== undefined ? gridRow.c2.content : undefined,
          facepileImageSrc: gridRow.c2 !== undefined ? gridRow.c2.facepileImageSrc : undefined,
          iconName: gridRow.c2 !== undefined ? gridRow.c2.iconName : undefined,
          textColor: gridRow.c1 !== undefined ? gridRow.c1.textColor : undefined,
          iconColor: gridRow.c1 !== undefined ? gridRow.c1.iconColor : undefined,
          boldText: gridRow.c1 !== undefined ? gridRow.c1.boldText : undefined
        },
        c3: {
          content: gridRow.c3 !== undefined ? gridRow.c3.content : undefined,
          facepileImageSrc: gridRow.c3 !== undefined ? gridRow.c3.facepileImageSrc : undefined,
          iconName: gridRow.c3 !== undefined ? gridRow.c3.iconName : undefined,
          textColor: gridRow.c1 !== undefined ? gridRow.c1.textColor : undefined,
          iconColor: gridRow.c1 !== undefined ? gridRow.c1.iconColor : undefined,
          boldText: gridRow.c1 !== undefined ? gridRow.c1.boldText : undefined
        }
      };
      rows.push(rowItem);
    });

    return rows;
  }

  private _generateColumn(gridColumns: IGridColumn[]): IColumn[] {
    const columns: IColumn[] = [];
    gridColumns.forEach((gridColumn: IGridColumn, index: number) => {
      const column: IColumn = {
        key: GridColumnContentType[gridColumn.key],
        name: gridColumn.name,
        columnActionsMode: ColumnActionsMode.disabled,
        minWidth: 150,
        isResizable: false,
        fieldName: 'c' + (index + 1)
      };
      columns.push(column);
    });

    return columns;
  }

  // Disabling ts-lint for the signature because Details List expects item as any
  // tslint:disable-next-line
  private _onItemInvoked(item: any): void {
    item.onRowClicked(item);
  }
}
