import * as React from 'react';
import { FunnelChartDataPoint } from './FunnelChart.types';

export interface FunnelSegmentGeometry {
  pathD: string;
  textX: number;
  textY: number;
  availableWidth: number;
}

export interface StackedFunnelSegmentGeometry {
  pathD: string;
  textX: number;
  textY: number;
  availableWidth: number;
}

interface SubValue {
  category: string;
  value: number;
  color: string;
}

interface Stage {
  subValues: SubValue[];
}

export function getVerticalFunnelSegmentGeometry({
  d,
  i,
  data,
  funnelWidth,
  funnelHeight,
  isRTL,
}: {
  d: FunnelChartDataPoint;
  i: number;
  data: FunnelChartDataPoint[];
  funnelWidth: number;
  funnelHeight: number;
  isRTL: boolean;
}): FunnelSegmentGeometry {
  const segmentHeight = funnelHeight / data.length;
  const widthScale = (value: number) => (value / Math.max(...data.map(dataPoint => dataPoint.value!))) * funnelWidth;
  const topWidth = widthScale(d.value!);
  const bottomWidth = i < data.length - 1 ? widthScale(data[i + 1].value!) : 0;
  const xOffset = (funnelWidth - topWidth) / 2;
  const nextXOffset = (funnelWidth - bottomWidth) / 2;
  const xStart = isRTL ? funnelWidth - xOffset : xOffset;
  const xEnd = isRTL ? funnelWidth - nextXOffset : nextXOffset;

  const isLastSegment = i === data.length - 1;
  const textY = isLastSegment ? i * segmentHeight + segmentHeight * 0.33 : i * segmentHeight + segmentHeight / 2;

  const textX = funnelWidth / 2;
  let availableWidth = topWidth;
  if (isLastSegment) {
    const yFromTop = textY - i * segmentHeight;
    const widthAtY = topWidth * (1 - yFromTop / segmentHeight);
    availableWidth = Math.max(widthAtY * 0.8, 0);
  } else {
    availableWidth = Math.min(topWidth, bottomWidth) * 0.9;
  }
  const pathD = `M${xStart},${i * segmentHeight}
    L${funnelWidth - xStart},${i * segmentHeight}
    L${funnelWidth - xEnd},${(i + 1) * segmentHeight}
    L${xEnd},${(i + 1) * segmentHeight}
    Z`;
  return { pathD, textX, textY, availableWidth };
}

export function getHorizontalFunnelSegmentGeometry({
  d,
  i,
  data,
  funnelWidth,
  funnelHeight,
  isRTL,
}: {
  d: FunnelChartDataPoint;
  i: number;
  data: FunnelChartDataPoint[];
  funnelWidth: number;
  funnelHeight: number;
  isRTL: boolean;
}): FunnelSegmentGeometry {
  const segmentWidth = funnelWidth / data.length;
  const heightScale = (value: number) => (value / Math.max(...data.map(dataPoint => dataPoint.value!))) * funnelHeight;
  const leftHeight = heightScale(d.value!);
  const rightHeight = i < data.length - 1 ? heightScale(data[i + 1].value!) : 0;
  const yOffset = (funnelHeight - leftHeight) / 2;
  const nextYOffset = (funnelHeight - rightHeight) / 2;
  const x0 = i * segmentWidth;
  const x1 = (i + 1) * segmentWidth;

  const isLastSegment = i === data.length - 1;
  let textX: number;
  let textY: number;
  let availableWidth = segmentWidth * 0.8;

  if (isLastSegment) {
    // For the triangular last segment, position text at 1/4 from the left edge
    textX = x0 + (x1 - x0) * 0.25;
    textY = funnelHeight / 2;

    // For triangular segments, we need to check both height and width constraints
    // The segment needs to be large enough to contain text
    const segmentArea = (leftHeight * segmentWidth) / 2; // Area of triangle
    const minAreaForText = 800; // Minimum area needed to show text

    if (leftHeight < 40 || segmentArea < minAreaForText) {
      // Hide text if height is too small or area is insufficient
      availableWidth = 0;
    } else {
      // Calculate available width at text position
      const widthAtTextPosition = (x1 - x0) * 0.75;
      availableWidth = widthAtTextPosition * 0.6;
    }
  } else {
    textX = (x0 + x1) / 2;
    textY = funnelHeight / 2;
    const minHeight = Math.min(leftHeight, rightHeight);
    availableWidth = minHeight > 20 ? segmentWidth * 0.8 : 0;
  }

  const pathD = `M${x0},${yOffset}
    L${x1},${nextYOffset}
    L${x1},${funnelHeight - nextYOffset}
    L${x0},${funnelHeight - yOffset}
    Z`;
  return { pathD, textX, textY, availableWidth };
}

export function getStackedVerticalFunnelSegmentGeometry({
  i,
  k,
  stages,
  totals,
  maxTotal,
  funnelWidth,
  funnelHeight,
}: {
  i: number;
  k: number;
  stages: Stage[];
  totals: number[];
  maxTotal: number;
  funnelWidth: number;
  funnelHeight: number;
}): StackedFunnelSegmentGeometry {
  const segmentHeight = funnelHeight / stages.length;
  const cur = stages[i];
  const next = stages[i + 1] || { subValues: [] };
  const curTotal = totals[i] || 1;
  const nextTotal = totals[i + 1] || 0;

  let cumTop = 0;
  let cumBot = 0;
  for (let idx = 0; idx < k; idx++) {
    const v = cur.subValues[idx];
    const vNext = next.subValues?.find((x: SubValue) => x.category === v.category);
    const val = v.value;
    const nextVal = vNext ? vNext.value : 0;
    cumTop += (val / curTotal) * (curTotal / maxTotal) * funnelWidth;
    cumBot += (nextVal / nextTotal || 0) * (nextTotal / maxTotal) * funnelWidth;
  }
  const v = cur.subValues[k];
  const vNext = next.subValues?.find((x: SubValue) => x.category === v.category);
  const val = v.value;
  const nextVal = vNext ? vNext.value : 0;
  const topW = (val / curTotal) * (curTotal / maxTotal) * funnelWidth;
  const botW = (nextVal / nextTotal || 0) * (nextTotal / maxTotal) * funnelWidth;
  const topStart = (funnelWidth - (curTotal / maxTotal) * funnelWidth) / 2 + cumTop;
  const topEnd = topStart + topW;
  const botStart = (funnelWidth - (nextTotal / maxTotal) * funnelWidth) / 2 + cumBot;
  const botEnd = botStart + botW;
  const textX = (topStart + topEnd + botStart + botEnd) / 4;

  const isLastSegment = i === stages.length - 1;
  const textY = isLastSegment ? i * segmentHeight + segmentHeight * 0.33 : (i + 0.5) * segmentHeight;

  // Calculate available width based on this specific segment's width
  let availableWidth: number;
  if (isLastSegment) {
    // For triangular last segment, use the width at text Y position
    const yFromTop = textY - i * segmentHeight;
    const widthRatio = 1 - yFromTop / segmentHeight;
    availableWidth = topW * widthRatio;
  } else {
    // For trapezoidal segments, use the actual segment width
    availableWidth = Math.min(topW, botW);
  }

  const pathD = `M${topStart},${i * segmentHeight}
    L${topEnd},${i * segmentHeight}
    L${botEnd},${(i + 1) * segmentHeight}
    L${botStart},${(i + 1) * segmentHeight}
    Z`;
  return { pathD, textX, textY, availableWidth };
}

export function getStackedHorizontalFunnelSegmentGeometry({
  i,
  k,
  stages,
  totals,
  maxTotal,
  funnelWidth,
  funnelHeight,
}: {
  i: number;
  k: number;
  stages: Stage[];
  totals: number[];
  maxTotal: number;
  funnelWidth: number;
  funnelHeight: number;
}): StackedFunnelSegmentGeometry {
  const segmentWidth = funnelWidth / stages.length;
  const cur = stages[i];
  const next = stages[i + 1] || { subValues: [] };
  const curTotal = totals[i] || 1;
  const nextTotal = totals[i + 1] || 0;

  let cumTop = 0;
  let cumBot = 0;
  for (let idx = 0; idx < k; idx++) {
    const v = cur.subValues[idx];
    const vNext = next.subValues?.find((x: SubValue) => x.category === v.category);
    const val = v.value;
    const nextVal = vNext ? vNext.value : 0;
    cumTop += (val / curTotal) * (curTotal / maxTotal) * funnelHeight;
    cumBot += (nextVal / nextTotal || 0) * (nextTotal / maxTotal) * funnelHeight;
  }
  const v = cur.subValues[k];
  const vNext = next.subValues?.find((x: SubValue) => x.category === v.category);
  const val = v.value;
  const nextVal = vNext ? vNext.value : 0;
  const topH = (val / curTotal) * (curTotal / maxTotal) * funnelHeight;
  const botH = (nextVal / nextTotal || 0) * (nextTotal / maxTotal) * funnelHeight;
  const leftStart = i * segmentWidth;
  const leftEnd = (i + 1) * segmentWidth;
  const topStart = (funnelHeight - (curTotal / maxTotal) * funnelHeight) / 2 + cumTop;
  const topEnd = topStart + topH;
  const botStart = (funnelHeight - (nextTotal / maxTotal) * funnelHeight) / 2 + cumBot;
  const botEnd = botStart + botH;

  const isLastSegment = i === stages.length - 1;
  let textX: number;
  let textY: number;
  let availableWidth: number;

  if (isLastSegment) {
    textX = leftStart + (leftEnd - leftStart) * 0.25;
    textY = (topStart + topEnd) / 2;
    // For triangular segments, calculate available width at text position
    const segmentWidthAtTextPos = (leftEnd - leftStart) * 0.5;
    availableWidth = segmentWidthAtTextPos * 0.8;

    // For triangular last segments, also check if there's enough height
    // The segment area should be large enough to contain text
    const segmentArea = (topH * segmentWidth) / 2;
    if (topH < 24 || segmentArea < 600) {
      availableWidth = 0;
    }
  } else {
    textX = (leftStart + leftEnd) / 2;
    textY = (topStart + topEnd + botStart + botEnd) / 4;
    // For trapezoidal segments, use full segment width
    availableWidth = Math.abs(leftEnd - leftStart) * 0.9;

    // Check if the segment has sufficient height for text
    // For non-last segments, we need to ensure there's enough vertical space
    const avgHeight = (topH + botH) / 2;
    if (avgHeight < 20) {
      availableWidth = 0;
    }
  }

  const pathD = `M${leftStart},${topStart}
    L${leftEnd},${botStart}
    L${leftEnd},${botEnd}
    L${leftStart},${topEnd}
    Z`;
  return { pathD, textX, textY, availableWidth };
}

export function getSegmentTextProps({
  availableWidth,
  minTextWidth = 24,
  textX,
  textY,
  value,
  culture,
  onMouseOver,
  onMouseMove,
  onMouseOut,
}: {
  availableWidth: number;
  minTextWidth?: number;
  textX: number;
  textY: number;
  value: number;
  culture: string | undefined;
  onMouseOver: ((event: React.MouseEvent<SVGElement>) => void) | undefined;
  onMouseMove: ((event: React.MouseEvent<SVGElement>) => void) | undefined;
  onMouseOut: (() => void) | undefined;
}): {
  show: boolean;
  x: number;
  y: number;
  value: number;
  culture: string | undefined;
  onMouseOver: ((event: React.MouseEvent<SVGElement>) => void) | undefined;
  onMouseMove: ((event: React.MouseEvent<SVGElement>) => void) | undefined;
  onMouseOut: (() => void) | undefined;
} {
  return {
    show: availableWidth > minTextWidth && availableWidth > 0,
    x: textX,
    y: textY,
    value,
    culture,
    onMouseOver,
    onMouseMove,
    onMouseOut,
  };
}
