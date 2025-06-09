/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import { SVGTooltipText } from '../../utilities/SVGTooltipText';
import { useAxis } from './hooks/useAxis';
import { ICartesianChartStyles, IMargins } from '../../index';
import { IProcessedStyleSet, ITheme } from '@fluentui/react';
import * as d3 from 'd3';

interface IAxisProps {
  xAxisTitle?: string;
  yAxisTitle?: string;
  secondaryYAxistitle?: string;
  margins: IMargins;
  svgDimensions: { width: number; height: number };
  isRtl: boolean;
  classNames: IProcessedStyleSet<ICartesianChartStyles>;
  theme: ITheme;
  wrapContent: any;
  titleMargin: number;
  startFromX: number;
  yAxisTitleMaximumAllowedHeight: number;
  xAxisTitleMaximumAllowedWidth: number;
  xScale: any;
  yScale: any;
  xAxis: any;
  xAxisElement: React.RefObject<SVGGElement>;
  yAxisElement: React.RefObject<SVGGElement>;
  yAxisElementSecondary: React.RefObject<SVGGElement>;
}

export const Axis: React.FC<IAxisProps> = props => {
  const {
    xAxisTitle,
    yAxisTitle,
    secondaryYAxistitle,
    margins,
    svgDimensions,
    isRtl,
    classNames,
    theme,
    wrapContent,
    titleMargin,
    startFromX,
    yAxisTitleMaximumAllowedHeight,
    xAxisTitleMaximumAllowedWidth,
    xScale,
    yScale,
    xAxis,
    xAxisElement,
    yAxisElement,
    yAxisElementSecondary,
  } = props;

  React.useEffect(() => {
    if (xAxisElement.current) {
      d3.select(xAxisElement.current).call(xAxis);
    }
  }, [xAxisElement, yAxisElement, yAxisElementSecondary, margins, svgDimensions, xScale, yScale, xAxis]);

  return (
    <>
      <g
        ref={xAxisElement}
        id="xAxisGElement"
        transform={`translate(${margins.left!}, ${svgDimensions.height - margins.bottom!})`}
        className={classNames.xAxis}
      />
      {xAxisTitle && (
        <SVGTooltipText
          content={xAxisTitle}
          textProps={{
            x: margins.left! + startFromX + xAxisTitleMaximumAllowedWidth / 2,
            y: svgDimensions.height - titleMargin,
            className: classNames.axisTitle!,
            textAnchor: 'middle',
            'aria-hidden': true,
          }}
          maxWidth={xAxisTitleMaximumAllowedWidth}
          wrapContent={wrapContent}
          theme={theme}
          showBackground={true}
        />
      )}
      <g
        ref={yAxisElement}
        id="yAxisGElement"
        transform={`translate(${margins.left!}, ${margins.top!})`}
        className={classNames.yAxis}
      />
      {yAxisTitle && (
        <SVGTooltipText
          content={yAxisTitle}
          textProps={{
            x: (yAxisTitleMaximumAllowedHeight - margins.bottom!) / 2,
            y: isRtl ? svgDimensions.width - margins.right! / 2 : margins.left! / 2,
            textAnchor: 'middle',
            transform: `translate(0, ${svgDimensions.height - margins.bottom! - margins.top!})rotate(-90)`,
            className: classNames.axisTitle!,
            'aria-hidden': true,
          }}
          maxWidth={yAxisTitleMaximumAllowedHeight}
          wrapContent={wrapContent}
          theme={theme}
          showBackground={true}
        />
      )}
      {secondaryYAxistitle && (
        <g>
          <g
            ref={yAxisElementSecondary}
            id="yAxisGElementSecondary"
            transform={`translate(${svgDimensions.width - margins.right!}, ${margins.top!})`}
            className={classNames.yAxis}
          />
          <SVGTooltipText
            content={secondaryYAxistitle}
            textProps={{
              x: (yAxisTitleMaximumAllowedHeight - margins.bottom!) / 2,
              y: svgDimensions.width - margins.right!,
              textAnchor: 'middle',
              transform: `translate(${margins.right! / 2}, ${
                svgDimensions.height - margins.bottom! - margins.top!
              })rotate(-90)`,
              className: classNames.axisTitle!,
              'aria-hidden': true,
            }}
            maxWidth={yAxisTitleMaximumAllowedHeight}
            wrapContent={wrapContent}
            theme={theme}
            showBackground={true}
          />
        </g>
      )}
    </>
  );
};
