import * as React from 'react';
import * as _ from 'lodash';
import { ScaleTime } from 'd3-scale';
import { EventAnnotation } from './BubbleChart.types';
import { LineDef, LabelLink, LabelDef } from './LabelLink';

interface EventsAnnotationProps {
  events: EventAnnotation[];
  scale: ScaleTime<number, number>;
  chartYBottom: number;
  chartYTop: number;
  color: string;
  referenceDate?: Date;
}

export function EventsAnnotation(props: EventsAnnotationProps) {
  const textWidth = 105;
  const textY = props.chartYTop - 20;
  const lineTopY = textY + 7;
  const textPadding = 5;
  const lineHeight = 18;
  const fontSize = '10pt';
  const range = props.scale.range();

  const lineDefs: LineDef[] = props.events.map(e => ({ ...e, x: props.scale(e.date) }));

  lineDefs.sort((e1, e2) => +e1.date - +e2.date);

  const lines = lineDefs.map((x, i) => (
    <line key={i} x1={x.x} x2={x.x} y1={lineTopY} y2={props.chartYBottom} stroke={props.color} strokeDasharray="4" />
  ));

  const labelLinks = calculateLabels(lineDefs, textWidth + textPadding, range[1], range[0]).map((x, i) => (
    <LabelLink
      key={i}
      {...{
        lineDefs,
        labelDef: x,
        textY,
        textWidth,
        textLineHeight: lineHeight,
        textFontSize: fontSize,
        textColor: props.color,
      }}
    />
  ));

  return (
    <>
      {lines}
      {labelLinks}
    </>
  );
}

function calculateLabels(lineDefs: LineDef[], textWidth: number, maxX: number, minX: number): LabelDef[] {
  const calculateLabel = (lastX: number, currentIdx: number): LabelDef[] => {
    // base case 1
    if (currentIdx == lineDefs.length) {
      return [];
    }

    const { x } = lineDefs[currentIdx];
    const leftXBoundary = x - textWidth;

    // cannot render on top of other text
    if (x < lastX) {
      return [];
    }

    // base case 2
    if (currentIdx == lineDefs.length - 1) {
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

  const backtrack = (currentIdx: number, anchor: 'start' | 'end'): LabelDef[] => {
    const bd = anchor === 'end' ? lineDefs[currentIdx].x : lineDefs[currentIdx].x + textWidth;

    let idx = _.findIndex(
      lineDefs,
      ds => ds.x >= bd && (ds.x - textWidth >= bd || ds.x + textWidth < maxX),
      currentIdx + 1,
    );
    if (idx == -1) {
      idx = lineDefs.length;
    }

    const aggregatedIdx = _.range(currentIdx, idx);
    let next = calculateLabel(bd, idx);

    next.unshift({ x: lineDefs[currentIdx].x, anchor, aggregatedIdx });
    return next;
  };

  return calculateLabel(minX, 0);
}
