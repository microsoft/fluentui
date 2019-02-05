import * as React from 'react';
import { AnnotationType, IMultiCountProps, IMultiCountRow, IMultiCountStyles } from './MultiCount.types';
import { getStyles } from './MultiCountStyles';
import { positiveChangeState } from './PositiveChangeState';
import { negativeStateChange } from './NegativeStateChange';
import { noStateChange } from './NoStateChange';

import { classNamesFunction } from 'office-ui-fabric-react/lib/Utilities';
import { HoverCard, HoverCardType } from 'office-ui-fabric-react/lib/HoverCard';

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
    const {
      multiCountRows,
      annotationTextFontSize,
      annotationTextColor,
      bodyTextFontSize,
      bodyTextColor,
      customMessage,
      href,
      onClicked
    } = this.props;
    const data: JSX.Element[] = this.getGeneratedData(
      multiCountRows,
      href,
      annotationTextFontSize,
      annotationTextColor,
      bodyTextFontSize,
      bodyTextColor,
      customMessage,
      onClicked
    );
    return <div>{data}</div>;
  }

  public getGeneratedData(
    rows: IMultiCountRow[],
    href?: string,
    annotationTextFontSize?: string,
    annotationTextColor?: string,
    bodyTextFontSize?: string,
    bodyTextColor?: string,
    customMessage?: string,
    onClicked?: VoidFunction
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
          href: href,
          onClicked: onClicked,
          hideIcon: row.hideIcon
        })
      );
      const hoverKey = row.data + row.bodyText + row.annotaionText;
      const plainCardProps = {
        onRenderPlainCard: this._onRenderCompactCard,
        renderData: [row, customMessage]
      };
      formattedRows.push(
        <HoverCard
          key={index}
          type={HoverCardType.plain}
          plainCardProps={plainCardProps}
          onCardHide={this._hoverStateUpdate.bind(this, hoverKey, false)}
          onCardVisible={this._hoverStateUpdate.bind(this, hoverKey, true)}
        >
          <div key={index} className={classNames.root} onClick={this._redirectToUrl.bind(this, href)}>
            <div className={classNames.data}>{formattedData + units[indexForUnits]}</div>
            <div className={classNames.bodyText}>{row.bodyText}</div>
            {!row.hideIcon && (
              <div className={classNames.icon}>
                <img src={changeIconIndicator} />
              </div>
            )}
            <div className={classNames.annotationText}>{row.annotaionText}</div>
          </div>
        </HoverCard>
      );
    });
    return formattedRows;
  }

  private _hoverStateUpdate = (hoverKey: string, hoverState: boolean): void => {
    if (hoverState) {
      setTimeout(() => {
        this.setState({
          hoveredText: hoverKey
        });
      }, 10);
    } else {
      this.setState({
        hoveredText: ''
      });
    }
  };

  private _redirectToUrl(href: string | undefined): void {
    href ? (window.location.href = href) : '';
    this.props.onClicked && this.props.onClicked();
  }

  // tslint:disable-next-line:no-any
  private _onRenderCompactCard = (data: any): JSX.Element => {
    const changeIconIndicator =
      AnnotationType[data[0].type] === AnnotationType.neutral
        ? noStateChange
        : AnnotationType[data[0].type] === AnnotationType.positive
        ? negativeStateChange
        : positiveChangeState;
    const getClassNames = classNamesFunction<IMultiCountProps, IMultiCountStyles>();
    const classNames = getClassNames(
      getStyles({
        color: data[0].color
      })
    );
    return (
      <div className={classNames.hoverCardRoot + ' hoverCardRoot'}>
        <div className={classNames.customMessage}>{data[1]}</div>
        <div className={classNames.hoverCardText}>
          <div className={classNames.hoverCardBodyText}>{data[0].bodyText}</div>
          {!data[0].hideIcon && (
            <div className={classNames.hoverCardIcon}>
              <img src={changeIconIndicator} />
            </div>
          )}
          <div className={classNames.hoverCardAnnotationText}>{data[0].annotaionText}</div>
        </div>
        <div className={classNames.hoverCardData}>{data[0].data.toLocaleString()}</div>
      </div>
    );
  };
}
