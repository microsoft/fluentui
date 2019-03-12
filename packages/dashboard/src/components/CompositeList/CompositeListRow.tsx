import * as React from 'react';
import { DetailsRowCheck, IColumn, IDetailsRowCheckProps } from 'office-ui-fabric-react/lib/DetailsList';
import { mergeStyles } from 'office-ui-fabric-react/lib/Styling';

import { getfocusStyle, getListActionColumnStyle, getListActionFieldStyle, getListRowFocusStyles } from './CompositeListRow.styles';

import { ICompositeListRowProps, ICompositeListRowItem } from './CompositeList.types';

import { CompositeListRowActions } from './CompositeListRowActions';

export class CompositeListRow<T extends ICompositeListRowItem> extends React.PureComponent<ICompositeListRowProps<T>> {
  public render(): React.ReactNode {
    const { renderFunction, rowProps, actionKey, actionItems } = this.props;

    rowProps.styles = getListRowFocusStyles();

    if (!rowProps.onRenderCheck) {
      rowProps.onRenderCheck = (props: IDetailsRowCheckProps): JSX.Element => {
        return <DetailsRowCheck {...props} data-is-focusable={true} />;
      };
    }

    if (!rowProps.onRenderItemColumn) {
      rowProps.onRenderItemColumn = (item: T, _index: number, column: IColumn) => {
        if (column.key && actionKey && column.key === actionKey) {
          return (
            <div className={mergeStyles(column.className, getListActionColumnStyle(!!rowProps.compact))}>
              <span
                className={mergeStyles(getListActionFieldStyle(!!rowProps.compact), getfocusStyle())}
                data-is-focusable={true}
                title={`${item[column.key]}`}
              >
                {`${item[column.key]}`}
              </span>

              <CompositeListRowActions ActionItems={actionItems} />
            </div>
          );
        }

        return (
          column.key && (
            <span className={mergeStyles(column.className, getfocusStyle())} data-is-focusable={true}>
              {item[column.key]}
            </span>
          )
        );
      };
    }

    return <div>{renderFunction({ ...rowProps })}</div>;
  }
}
