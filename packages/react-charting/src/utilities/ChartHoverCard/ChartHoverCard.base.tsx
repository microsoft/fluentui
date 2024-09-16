import * as React from 'react';
import { IChartHoverCardStyles, IChartHoverCardStyleProps, IChartHoverCardProps } from './ChartHoverCard.types';
import { classNamesFunction, IProcessedStyleSet } from '@fluentui/react';
import { convertToLocaleString } from '../locale-util';

const getClassNames = classNamesFunction<IChartHoverCardStyleProps, IChartHoverCardStyles>();
export class ChartHoverCardBase extends React.Component<IChartHoverCardProps, {}> {
  private _classNames: IProcessedStyleSet<IChartHoverCardStyles>;
  public render(): React.ReactNode {
    const { color, Legend, XValue, YValue, styles, theme, ratio, descriptionMessage, culture } = this.props;
    this._classNames = getClassNames(styles!, {
      theme: theme!,
      color: color,
      XValue: XValue,
      isRatioPresent: !!ratio,
    });
    return (
      <div className={this._classNames.calloutContentRoot}>
        <div className={this._classNames.calloutDateTimeContainer}>
          <div className={this._classNames.calloutContentX}>{XValue} </div>
          {/*TO DO  if we add time for callout then will use this */}
          {/* <div className={this._classNames.calloutContentX}>07:00am</div> */}
        </div>
        <div className={this._classNames.calloutInfoContainer}>
          <div className={this._classNames.calloutBlockContainer}>
            <div className={this._classNames.calloutlegendText}>{convertToLocaleString(Legend, culture)}</div>
            <div className={this._classNames.calloutContentY}>{convertToLocaleString(YValue, culture)}</div>
          </div>
          {!!ratio && (
            <div className={this._classNames.ratio}>
              <>
                <span className={this._classNames.numerator}>{convertToLocaleString(ratio[0], culture)}</span>/
                <span className={this._classNames.denominator}>{convertToLocaleString(ratio[1], culture)}</span>
              </>
            </div>
          )}
        </div>
        {!!descriptionMessage && <div className={this._classNames.descriptionMessage}>{descriptionMessage}</div>}
      </div>
    );
  }
}
