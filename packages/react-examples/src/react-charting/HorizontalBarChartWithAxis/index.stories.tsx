import * as React from 'react';

import { HorizontalBarChartWithAxisTooltipExample } from './HorizontalBarChartWithAxis.AxisTooltip.Example';
import { HorizontalBarChartWithAxisBasicExample } from './HorizontalBarChartWithAxis.Basic.Example';
import { HorizontalBarChartWithAxisStringAxisTooltipExample } from './HorizontalBarChartWithAxis.StringAxisTooltip.Example';
import { HorizontalBarChartWithAxisDynamicExample } from './HorizontalBarChartWithAxis.Dynamic.Example';
import { HorizontalBarChartWithAxisNegativeExample } from './HorizontalBarChartWithAxis.Negative.Example';
import { HBWAAxisCategoryOrderExample } from './HorizontalBarChartWithAxis.AxisCategoryOrder.Example';

export const Basic = () => <HorizontalBarChartWithAxisBasicExample />;

export const AxisTooltip = () => <HorizontalBarChartWithAxisTooltipExample />;

export const StringAxisTooltip = () => <HorizontalBarChartWithAxisStringAxisTooltipExample />;

export const Dynamic = () => <HorizontalBarChartWithAxisDynamicExample />;

export const Negative = () => <HorizontalBarChartWithAxisNegativeExample />;

export const AxisCategoryOrder = () => <HBWAAxisCategoryOrderExample />;

export default {
  title: 'Components/HorizontalBarChartWithAxis',
};
