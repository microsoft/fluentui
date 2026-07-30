import * as React from 'react';
import type { Meta } from '@storybook/react-webpack5';
import { Steps, type StoryParameters } from 'storywright';
import { DARK_MODE, getStoryVariant, RTL, TestWrapperDecorator } from '../../utilities';
import { ChartTable } from '@fluentui/react-charts';
import { tokens } from '@fluentui/react-components';

export default {
  title: 'Charts/ChartTable',

  decorators: [TestWrapperDecorator],
  parameters: {
    storyWright: {
      steps: new Steps().snapshot('default', { cropTo: '.testWrapper' }).end(),
    },
  } satisfies StoryParameters,
} satisfies Meta<typeof ChartTable>;

const basicHeaders = [{ value: 'Product' }, { value: 'Q1 Sales' }, { value: 'Q2 Sales' }, { value: 'Total' }];

const basicRows = [
  [{ value: 'Product A' }, { value: 25000 }, { value: 30000 }, { value: 55000 }],
  [{ value: 'Product B' }, { value: 18000 }, { value: 22000 }, { value: 40000 }],
  [{ value: 'Product C' }, { value: 32000 }, { value: 28000 }, { value: 60000 }],
];

const rootStyle = { width: '620px', height: '300px' };

export const Basic = () => {
  return (
    <div style={rootStyle}>
      <ChartTable
        chartTitle="Chart table basic example"
        width={600}
        height={280}
        headers={basicHeaders}
        rows={basicRows}
      />
    </div>
  );
};

export const BasicRTL = getStoryVariant(Basic, RTL);

export const BasicDarkMode = getStoryVariant(Basic, DARK_MODE);

/**
 * Per-cell inline styles — the getSafeBackgroundColor / contrast-inversion code path on
 * both header and body cells.
 */
export const StyledCells = () => {
  const styledHeaders = basicHeaders.map(header => ({
    ...header,
    style: { backgroundColor: tokens.colorNeutralBackground3, color: tokens.colorNeutralForeground1 },
  }));
  const styledRows = basicRows.map(row =>
    row.map((cell, cellIndex) => {
      if (cellIndex === 0) {
        return cell;
      }
      const value = cell.value as number;
      return {
        ...cell,
        style:
          value > 28000
            ? { backgroundColor: tokens.colorPaletteGreenBackground2, color: tokens.colorPaletteGreenForeground2 }
            : { backgroundColor: tokens.colorPaletteYellowBackground2, color: tokens.colorPaletteYellowForeground2 },
      };
    }),
  );

  return (
    <div style={rootStyle}>
      <ChartTable
        chartTitle="Chart table styled example"
        width={600}
        height={280}
        headers={styledHeaders}
        rows={styledRows}
      />
    </div>
  );
};

export const StyledCellsRTL = getStoryVariant(StyledCells, RTL);

export const StyledCellsDarkMode = getStoryVariant(StyledCells, DARK_MODE);
