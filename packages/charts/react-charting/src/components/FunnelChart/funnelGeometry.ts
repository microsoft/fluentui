import { IFunnelChartDataPoint } from './FunnelChart.types';

export interface FunnelSegmentGeometry {
  pathD: string;
  textX: number;
  textY: number;
  availableWidth: number;
}

export function getHorizontalFunnelSegmentGeometry({
  d,
  i,
  data,
  funnelWidth,
  funnelHeight,
  isRTL,
}: {
  d: IFunnelChartDataPoint;
  i: number;
  data: IFunnelChartDataPoint[];
  funnelWidth: number;
  funnelHeight: number;
  isRTL: boolean;
}): FunnelSegmentGeometry {
  const segmentHeight = funnelHeight / data.length;
  const widthScale = (value: number) => (value / Math.max(...data.map(d => d.value!))) * funnelWidth;
  const topWidth = widthScale(d.value!);
  const bottomWidth = i < data.length - 1 ? widthScale(data[i + 1].value!) : 0;
  const xOffset = (funnelWidth - topWidth) / 2;
  const nextXOffset = (funnelWidth - bottomWidth) / 2;
  const xStart = isRTL ? funnelWidth - xOffset : xOffset;
  const xEnd = isRTL ? funnelWidth - nextXOffset : nextXOffset;
  const segmentY = i * segmentHeight + segmentHeight / 2;
  const textY = i === data.length - 1 ? i * segmentHeight + Math.min(segmentHeight * 0.6, segmentHeight - 8) : segmentY;
  const textX = funnelWidth / 2;
  let availableWidth = topWidth;
  if (i === data.length - 1) {
    const yFromTop = textY - i * segmentHeight;
    const widthAtY = topWidth * (1 - yFromTop / segmentHeight);
    availableWidth = Math.max(widthAtY, 0);
  }
  const pathD = `M${xStart},${i * segmentHeight}
    L${funnelWidth - xStart},${i * segmentHeight}
    L${funnelWidth - xEnd},${(i + 1) * segmentHeight}
    L${xEnd},${(i + 1) * segmentHeight}
    Z`;
  return { pathD, textX, textY, availableWidth };
}

export function getVerticalFunnelSegmentGeometry({
  d,
  i,
  data,
  funnelWidth,
  funnelHeight,
  isRTL,
}: {
  d: IFunnelChartDataPoint;
  i: number;
  data: IFunnelChartDataPoint[];
  funnelWidth: number;
  funnelHeight: number;
  isRTL: boolean;
}): FunnelSegmentGeometry {
  const segmentWidth = funnelWidth / data.length;
  const heightScale = (value: number) => (value / Math.max(...data.map(d => d.value!))) * funnelHeight;
  const leftHeight = heightScale(d.value!);
  const rightHeight = i < data.length - 1 ? heightScale(data[i + 1].value!) : 0;
  const yOffset = (funnelHeight - leftHeight) / 2;
  const nextYOffset = (funnelHeight - rightHeight) / 2;
  const x0 = isRTL ? funnelWidth - (i + 1) * segmentWidth : i * segmentWidth;
  const x1 = isRTL ? funnelWidth - i * segmentWidth : (i + 1) * segmentWidth;
  const textY = funnelHeight / 2;
  const textX = (x0 + x1) / 2;
  const availableWidth = segmentWidth;
  const pathD = `M${x0},${yOffset}
    L${x1},${nextYOffset}
    L${x1},${funnelHeight - nextYOffset}
    L${x0},${funnelHeight - yOffset}
    Z`;
  return { pathD, textX, textY, availableWidth };
}

export interface StackedFunnelSegmentGeometry {
  pathD: string;
  textX: number;
  textY: number;
  availableWidth: number;
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
  stages: any[];
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
    const vNext = next.subValues?.find((x: any) => x.category === v.category);
    const val = v.value;
    const nextVal = vNext ? vNext.value : 0;
    cumTop += (val / curTotal) * (curTotal / maxTotal) * funnelWidth;
    cumBot += (nextVal / nextTotal || 0) * (nextTotal / maxTotal) * funnelWidth;
  }
  const v = cur.subValues[k];
  const vNext = next.subValues?.find((x: any) => x.category === v.category);
  const val = v.value;
  const nextVal = vNext ? vNext.value : 0;
  const topW = (val / curTotal) * (curTotal / maxTotal) * funnelWidth;
  const botW = (nextVal / nextTotal || 0) * (nextTotal / maxTotal) * funnelWidth;
  const topStart = (funnelWidth - (curTotal / maxTotal) * funnelWidth) / 2 + cumTop;
  const topEnd = topStart + topW;
  const botStart = (funnelWidth - (nextTotal / maxTotal) * funnelWidth) / 2 + cumBot;
  const botEnd = botStart + botW;
  const textX = (topStart + topEnd + botStart + botEnd) / 4;
  const textY = (i + 0.5) * segmentHeight;
  const availableWidth = topW;
  const pathD = `M${topStart},${i * segmentHeight}
    L${topEnd},${i * segmentHeight}
    L${botEnd},${(i + 1) * segmentHeight}
    L${botStart},${(i + 1) * segmentHeight}
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
  stages: any[];
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
    const vNext = next.subValues?.find((x: any) => x.category === v.category);
    const val = v.value;
    const nextVal = vNext ? vNext.value : 0;
    cumTop += (val / curTotal) * (curTotal / maxTotal) * funnelHeight;
    cumBot += (nextVal / nextTotal || 0) * (nextTotal / maxTotal) * funnelHeight;
  }
  const v = cur.subValues[k];
  const vNext = next.subValues?.find((x: any) => x.category === v.category);
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
  const textX = (leftStart + leftEnd) / 2;
  const textY = (topStart + topEnd + botStart + botEnd) / 4;
  const availableWidth = Math.abs(leftEnd - leftStart);
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
  onMouseOver: (event: React.MouseEvent<SVGElement>) => void;
  onMouseMove: (event: React.MouseEvent<SVGElement>) => void;
  onMouseOut: () => void;
}) {
  return {
    show: availableWidth > minTextWidth,
    x: textX,
    y: textY,
    value,
    culture,
    onMouseOver,
    onMouseMove,
    onMouseOut,
  };
}
