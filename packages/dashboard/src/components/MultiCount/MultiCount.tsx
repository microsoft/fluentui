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
    const { multiCountRows, annotationTextFontSize, annotationTextColor, bodyTextFontSize, bodyTextColor } = this.props;
    const data: JSX.Element[] = this.getGeneratedData(
      multiCountRows,
      annotationTextFontSize,
      annotationTextColor,
      bodyTextFontSize,
      bodyTextColor
    );
    return <div>{data}</div>;
  }

  public getGeneratedData(
    rows: IMultiCountRow[],
    annotationTextFontSize?: string,
    annotationTextColor?: string,
    bodyTextFontSize?: string,
    bodyTextColor?: string
  ): JSX.Element[] {
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
      let formattedData = data % 1 === 0 ? data : data.toFixed(1);
      if (Math.floor(data) >= 100) {
        formattedData = Math.floor(data);
      }
      const changeIconIndicator =
        AnnotationType[row.type] === 'neutral' ? '' : AnnotationType[row.type] === 'positive' ? 'FlickDown' : 'FlickUp';
      const getClassNames = classNamesFunction<IMultiCountProps, IMultiCountStyles>();
      const classNames = getClassNames(
        getStyles({
          color: row.color,
          iconName: changeIconIndicator,
          annotationTextFontSize: annotationTextFontSize,
          annotationTextColor: annotationTextColor,
          bodyTextColor: bodyTextColor,
          bodyTextFontSize: bodyTextFontSize
        })
      );
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
