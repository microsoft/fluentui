import * as React from 'react';
import { AnnotationType, IMultiCountProps, IMultiCountRow, IMultiCountStyles } from './MultiCount.types';
import { getStyles } from './MultiCountStyles';

import { Icon } from 'office-ui-fabric-react/lib/Icon';
import { classNamesFunction } from 'office-ui-fabric-react/lib/Utilities';

export class MultiCount extends React.Component<IMultiCountProps, {}> {
  constructor(props: IMultiCountProps) {
    super(props);
  }

  public render(): JSX.Element {
    const multiCountRows = this.props.multiCountRows;
    const data: JSX.Element[] = this.getGeneratedData(multiCountRows);
    return <div>{data}</div>;
  }

  public getGeneratedData(rows: IMultiCountRow[]): JSX.Element[] {
    const formattedRows: JSX.Element[] = [];
    const units = ['', 'k', 'm', 'b'];
    rows.forEach((row: IMultiCountRow, index: number) => {
      let data = row.data;
      let indexForUnits = 0;
      while (data > 1000) {
        if (indexForUnits >= 3) {
          break;
        }
        indexForUnits++;
        data = data / 1000;
      }
      const formattedData = data % 1 === 0 ? data : data.toFixed(1);
      const changeIconIndicator =
        AnnotationType[row.type] === 'nuetral' ? '' : AnnotationType[row.type] === 'positive' ? 'FlickDown' : 'FlickUp';
      const getClassNames = classNamesFunction<IMultiCountProps, IMultiCountStyles>();
      const classNames = getClassNames(getStyles({ color: row.color, iconName: changeIconIndicator }));
      formattedRows.push(
        <div key={index} className={classNames.root}>
          <div className={classNames.bodyText}>
            <span className={classNames.data}>{formattedData + units[indexForUnits]}</span>
            <span>{row.bodyText}</span>
          </div>
          <div className={classNames.annotationText}>
            <span className={classNames.icon}>
              <Icon iconName={changeIconIndicator} />
            </span>
            <span className={classNames.annotationText}>{row.annotaionText}</span>
          </div>
        </div>
      );
    });
    return formattedRows;
  }
}
