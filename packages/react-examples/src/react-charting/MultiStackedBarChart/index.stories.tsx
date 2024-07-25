import * as React from 'react';

import { MultiStackedBarChartBasicExample } from './MultiStackedBarChart.Example';
import { MultiStackedBarChartVariantExample } from './MultiStackedBarChart.Variant.Example';
import { MultiStackedBarChartWithPlaceholderExample } from './MultiStackedBarChartWithPlaceHolder.Example';

export const Basic = () => <MultiStackedBarChartBasicExample />;

export const Variant = () => <MultiStackedBarChartVariantExample />;

export const WithPlaceHolder = () => <MultiStackedBarChartWithPlaceholderExample />;

export default {
  title: 'Components/MultiStackedBarChart',
};
