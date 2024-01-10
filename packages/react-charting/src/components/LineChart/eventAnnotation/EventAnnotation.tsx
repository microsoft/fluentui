import * as React from 'react';
import { ScaleTime } from 'd3-scale';
import { findIndex } from '@fluentui/react/lib/Utilities';
import { ILineDef, LabelLink, ILabelDef } from './LabelLink';
import { IEventsAnnotationProps } from '../LineChart.types';
import { ITheme } from '@fluentui/react/lib/Styling';
import { getColorFromToken } from '../../../utilities/colors';

interface IEventsAnnotationExtendProps extends IEventsAnnotationProps {
  scale: ScaleTime<number, number>;
  chartYBottom: number;
  chartYTop: number;
  theme: ITheme | undefined;
}

export const EventsAnnotation: React.FunctionComponent<IEventsAnnotationExtendProps> = props => {
  const textWidth = props.labelWidth ? props.labelWidth : 105;
  const textY = props.chartYTop - 20;
  const lineTopY = textY + 7;
  const textPadding = 5;
  const lineHeight = 18;
  const fontSize = '10pt';
  const axisRange = props.scale.range();

  const lineDefs: ILineDef[] = props.events.map(e => ({ ...e, x: props.scale(e.date) }));

  lineDefs.sort((e1, e2) => +e1.date - +e2.date);

  const fill: string | undefined = props.strokeColor
    ? getColorFromToken(props.strokeColor, props.theme?.isInverted)
    : props.theme?.palette.black;

  const lines = uniqBy(lineDefs, x => x.date.toString()).map((x, i) => (
    <line key={i} x1={x.x} x2={x.x} y1={lineTopY} y2={props.chartYBottom} stroke={fill} strokeDasharray="8" />
  ));

  const labelLinks = calculateLabels(lineDefs, textWidth + textPadding, axisRange[1], axisRange[0]).map((x, i) => (
    <LabelLink
      key={i}
      theme={props.theme}
      {...{
        lineDefs,
        labelDef: x,
        textY,
        textWidth,
        textLineHeight: lineHeight,
        textFontSize: fontSize,
        textColor: props.labelColor,
        mergedLabel: props.mergedLabel,
      }}
    />
  ));

  return (
    <>
      {lines}
      {labelLinks}
    </>
  );
};

function calculateLabels(lineDefs: ILineDef[], textWidth: number, maxX: number, minX: number): ILabelDef[] {
  const calculateLabel = (lastX: number, currentIdx: number): ILabelDef[] => {
    // base case 1
    if (currentIdx === lineDefs.length) {
      return [];
    }

    const { x } = lineDefs[currentIdx];
    const leftXBoundary = x - textWidth;

    // cannot render on top of other text
    if (x < lastX) {
      return [];
    }

    // base case 2
    if (currentIdx === lineDefs.length - 1) {
      if (lastX < leftXBoundary) {
        return [{ x: x, anchor: 'end', aggregatedIdx: [currentIdx] }];
      } else if (x + textWidth < maxX) {
        return [{ x: x, anchor: 'start', aggregatedIdx: [currentIdx] }];
      }

      return [];
    }

    if (lastX < leftXBoundary) {
      // label on left side
      return backtrack(currentIdx, 'end');
    } else {
      // label on right side
      return backtrack(currentIdx, 'start');
    }
  };

  const backtrack = (currentIdx: number, anchor: 'start' | 'end'): ILabelDef[] => {
    const bd = anchor === 'end' ? lineDefs[currentIdx].x : lineDefs[currentIdx].x + textWidth;

    let idx = findIndex(
      lineDefs,
      ds => ds.x > bd && (ds.x - textWidth >= bd || ds.x + textWidth < maxX),
      currentIdx + 1,
    );
    if (idx === -1) {
      idx = lineDefs.length;
    }

    const aggregatedIdx: number[] = [];
    for (let i = currentIdx; i < idx; i++) {
      aggregatedIdx.push(i);
    }
    const next = calculateLabel(bd, idx);

    next.unshift({ x: lineDefs[currentIdx].x, anchor, aggregatedIdx });
    return next;
  };

  return calculateLabel(minX, 0);
}

/** Get unique items of `arr`, comparing based on the result of calling `iteratee` on each item. */
function uniqBy<T>(arr: T[], iteratee: (x: T) => string): T[] {
  const seen: string[] = [];
  const result: T[] = [];
  for (const x of arr) {
    const comp = iteratee(x);
    if (seen.indexOf(comp) === -1) {
      result.push(x);
      seen.push(comp);
    }
  }
  return result;
}
