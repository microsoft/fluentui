import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { ChartTable } from '@fluentui/react-charts';
import { Switch, Field, Radio, RadioGroup, makeStyles, tokens } from '@fluentui/react-components';

const useStyles = makeStyles({
  tableContainer: {
    margin: tokens.spacingVerticalM,
  },
});

export const ChartTableBasic = (): JSXElement => {
  const [width, setWidth] = React.useState<number>(700);
  const [height, setHeight] = React.useState<number>(200);
  const [showStyledCells, setShowStyledCells] = React.useState<boolean>(false);
  const [tableVariant, setTableVariant] = React.useState<string>('basic');
  const classes = useStyles();

  const _onWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWidth(parseInt(e.target.value, 10));
  };

  const _onHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHeight(parseInt(e.target.value, 10));
  };

  const _onSwitchStyledCells = React.useCallback((ev: any) => {
    setShowStyledCells(ev.currentTarget.checked);
  }, []);

  // Basic table headers
  const basicHeaders = [
    { value: 'Product' },
    { value: 'Q1 Sales' },
    { value: 'Q2 Sales' },
    { value: 'Q3 Sales' },
    { value: 'Q4 Sales' },
    { value: 'Total' },
  ];

  // Basic table rows
  const basicRows = [
    [{ value: 'Product A' }, { value: 25000 }, { value: 30000 }, { value: 28000 }, { value: 35000 }, { value: 118000 }],
    [{ value: 'Product B' }, { value: 18000 }, { value: 22000 }, { value: 25000 }, { value: 27000 }, { value: 92000 }],
    [{ value: 'Product C' }, { value: 32000 }, { value: 28000 }, { value: 31000 }, { value: 29000 }, { value: 120000 }],
    [{ value: 'Product D' }, { value: 15000 }, { value: 19000 }, { value: 21000 }, { value: 23000 }, { value: 78000 }],
  ];

  // Styled table rows with conditional formatting
  const styledRows = basicRows.map((row, rowIndex) => {
    return row.map((cell, cellIndex) => {
      if (cellIndex === 0) {
        // Product name column - keep original
        return cell;
      } else if (cellIndex === row.length - 1) {
        // Total column - highlight with background color
        return {
          ...cell,
          style: {
            backgroundColor: tokens.colorNeutralBackground3,
            fontWeight: '600',
            color: tokens.colorNeutralForeground1,
          },
        };
      } else {
        // Sales columns - color based on value
        const value = cell.value as number;
        let backgroundColor = tokens.colorNeutralBackground1;
        let color = tokens.colorNeutralForeground1;

        if (value > 30000) {
          backgroundColor = tokens.colorPaletteGreenBackground2;
          color = tokens.colorPaletteGreenForeground2;
        } else if (value > 20000) {
          backgroundColor = tokens.colorPaletteYellowBackground2;
          color = tokens.colorPaletteYellowForeground2;
        } else {
          backgroundColor = tokens.colorPaletteRedBackground2;
          color = tokens.colorPaletteRedForeground2;
        }

        return {
          ...cell,
          style: showStyledCells
            ? {
                backgroundColor,
                color,
                textAlign: 'right' as const,
                padding: '8px',
              }
            : {
                textAlign: 'right' as const,
                padding: '8px',
              },
        };
      }
    });
  });

  // Financial data example
  const financialHeaders = [
    { value: 'Metric' },
    { value: '2021' },
    { value: '2022' },
    { value: '2023' },
    { value: 'Change %' },
  ];

  const financialRows = [
    [
      { value: 'Revenue ($M)' },
      { value: 150.5 },
      { value: 175.2 },
      { value: 198.7 },
      { value: '+13.4%', style: { color: tokens.colorPaletteGreenForeground2 } },
    ],
    [
      { value: 'Operating Income ($M)' },
      { value: 45.2 },
      { value: 52.8 },
      { value: 59.1 },
      { value: '+11.9%', style: { color: tokens.colorPaletteGreenForeground2 } },
    ],
    [
      { value: 'Net Income ($M)' },
      { value: 32.1 },
      { value: 38.9 },
      { value: 42.3 },
      { value: '+8.7%', style: { color: tokens.colorPaletteGreenForeground2 } },
    ],
    [
      { value: 'Expenses ($M)' },
      { value: 105.3 },
      { value: 122.4 },
      { value: 139.6 },
      { value: '+14.1%', style: { color: tokens.colorPaletteRedForeground2 } },
    ],
  ];

  const getCurrentData = () => {
    switch (tableVariant) {
      case 'financial':
        return { headers: financialHeaders, rows: financialRows };
      default:
        return { headers: basicHeaders, rows: showStyledCells ? styledRows : basicRows };
    }
  };

  const { headers, rows } = getCurrentData();

  React.useEffect(() => {
    const style = document.createElement('style');
    const tableStylingCSS = `
      .chart-table table {
        border-collapse: collapse;
        border: 1px solid ${tokens.colorNeutralStroke1};
      }
      .chart-table th,
      .chart-table td {
        border: 1px solid ${tokens.colorNeutralStroke1};
        padding: 8px 12px;
      }
      .chart-table th {
        background-color: ${tokens.colorNeutralBackground3};
        font-weight: 600;
        text-align: left;
      }
    `;
    style.appendChild(document.createTextNode(tableStylingCSS));
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <>
      <div style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
        <div>
          <label htmlFor="changeWidth_ChartTable">Change Width:</label>
          <input
            type="range"
            value={width}
            min={300}
            max={1200}
            id="changeWidth_ChartTable"
            onChange={_onWidthChange}
            aria-valuetext={`ChangeWidthSlider${width}`}
          />
          <span>{width}px</span>
        </div>
        <div>
          <label htmlFor="changeHeight_ChartTable">Change Height:</label>
          <input
            type="range"
            value={height}
            min={200}
            max={800}
            id="changeHeight_ChartTable"
            onChange={_onHeightChange}
            aria-valuetext={`ChangeHeightSlider${height}`}
          />
          <span>{height}px</span>
        </div>
      </div>

      <Field label="Table Type">
        <RadioGroup
          defaultValue="basic"
          onChange={(_ev, option) => {
            setTableVariant(option.value);
          }}
        >
          <Radio value="basic" label="Sales Data Example" />
          <Radio value="financial" label="Financial Data Example" />
        </RadioGroup>
      </Field>

      <div style={{ marginTop: '10px' }}>
        <Switch
          label={showStyledCells ? 'Styled cells ON' : 'Styled cells OFF'}
          checked={showStyledCells}
          onChange={_onSwitchStyledCells}
          disabled={tableVariant === 'financial'}
        />
      </div>

      <div style={{ marginTop: '20px' }}>
        <ChartTable
          width={width}
          height={height}
          headers={headers}
          rows={rows}
          styles={{ root: classes.tableContainer, table: 'chart-table' }}
        />
      </div>
    </>
  );
};

ChartTableBasic.parameters = {
  docs: {
    description: {
      story: 'Basic chart table example with customizable width, height, styling options, and different data sets.',
    },
  },
};
