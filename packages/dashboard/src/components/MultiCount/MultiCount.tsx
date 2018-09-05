import * as React from 'react';
import { AnnotationType, IMultiCountProps, IMultiCountRow, IMultiCountStyles } from './MultiCount.types';
import { getStyles } from './MultiCountStyles';
import { positiveChangeState } from './PositiveChangeState';
import { negativeStateChange } from './NegativeStateChange';
import { noStateChange } from './NoStateChange';

import { classNamesFunction } from 'office-ui-fabric-react/lib/Utilities';
import { HoverCard, IExpandingCardProps, ExpandingCardMode } from 'office-ui-fabric-react/lib/HoverCard';

export interface IMultiCountState {
  hoveredText: string;
}

export class MultiCount extends React.Component<IMultiCountProps, IMultiCountState> {
  constructor(props: IMultiCountProps) {
    super(props);
    this.state = {
      hoveredText: ''
    };
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
        AnnotationType[row.type] === AnnotationType.neutral
          ? noStateChange
          : AnnotationType[row.type] === AnnotationType.positive
            ? negativeStateChange
            : positiveChangeState;
      const getClassNames = classNamesFunction<IMultiCountProps, IMultiCountStyles>();
      const classNames = getClassNames(
        getStyles({
          color: row.color,
          annotationTextFontSize: annotationTextFontSize,
          annotationTextColor: annotationTextColor,
          bodyTextColor: bodyTextColor,
          bodyTextFontSize: bodyTextFontSize,
          hoveredText: this.state.hoveredText,
          currentText: row.data + row.bodyText + row.annotaionText,
          href: row.href
        })
      );
      const expandingCardProps: IExpandingCardProps = {
        onRenderCompactCard: this._onRenderCompactCard,
        renderData: row,
        mode: ExpandingCardMode.compact,
        styles: {
          root: {
            width: 'auto',
            height: 'auto'
          },
          compactCard: {
            width: 'auto',
            height: 'auto'
          }
        }
      };
      const hoverKey = row.data + row.bodyText + row.annotaionText;
      formattedRows.push(
        <HoverCard
          key={index}
          expandingCardProps={expandingCardProps}
          instantOpenOnClick={true}
          onCardHide={this._hoverStateUpdate.bind(this, hoverKey, false)}
          onCardVisible={this._hoverStateUpdate.bind(this, hoverKey, true)}
        >
          <div key={index} className={classNames.root} onClick={this._redirectToUrl.bind(this, row.href)}>
            <div className={classNames.bodyText}>
              <span className={classNames.data}>{formattedData + units[indexForUnits]}</span>
              <span>{row.bodyText}</span>
            </div>
            <div className={classNames.annotationText}>
              <span className={classNames.icon}>
                <img src={changeIconIndicator} />
              </span>
              <span className={classNames.annotationText}>{row.annotaionText}</span>
            </div>
          </div>
        </HoverCard>
      );
    });
    return formattedRows;
  }

  private _hoverStateUpdate = (hoverKey: string, hoverState: boolean): void => {
    if (hoverState) {
      this.setState({
        hoveredText: hoverKey
      });
    } else {
      this.setState({
        hoveredText: ''
      });
    }
  };

  private _redirectToUrl(href: string | undefined): void {
    href ? (window.location.href = href) : '';
  }

  private _onRenderCompactCard = (data: IMultiCountRow): JSX.Element => {
    const changeIconIndicator =
      AnnotationType[data.type] === AnnotationType.neutral
        ? noStateChange
        : AnnotationType[data.type] === AnnotationType.positive
          ? negativeStateChange
          : positiveChangeState;
    const getClassNames = classNamesFunction<IMultiCountProps, IMultiCountStyles>();
    const classNames = getClassNames(
      getStyles({
        color: data.color
      })
    );
    return (
      <div className={classNames.hoverCardRoot}>
        <div />
        <div className={classNames.hoverCardText}>
          <div className={classNames.hoverCardBodyText}>{data.bodyText}</div>
          <div className={classNames.icon}>
            <img src={changeIconIndicator} />
          </div>
          <div className={classNames.hoverCardAnnotationText}>{data.annotaionText}</div>
        </div>
        <div className={classNames.hoverCardData}>{data.data.toLocaleString()}</div>
      </div>
    );
  };
}
