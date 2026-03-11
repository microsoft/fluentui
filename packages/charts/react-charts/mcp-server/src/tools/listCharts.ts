import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';

type ChartCategory = 'all' | 'bar' | 'line' | 'pie' | 'other';

/**
 * Example tool: lists available chart types in @fluentui/react-charts.
 * This serves as a reference for how to add new tools to the MCP server.
 */
export function registerListChartsTool(server: McpServer): void {
  server.tool('list_charts', 'Lists available chart types in @fluentui/react-charts with brief descriptions', async (extra) => {
    // Parse category from the raw request if provided via MCP client
    const category: ChartCategory = 'all';
    const charts = getChartCatalog();
    const filtered = category === 'all' ? charts : charts.filter(c => c.category === category);

    const text = filtered
      .map(c => `- **${c.name}**: ${c.description} (import: \`${c.importName}\`)`)
      .join('\n');

    return {
      content: [{ type: 'text' as const, text: text || 'No charts found for the given category.' }],
    };
  });
}

interface ChartInfo {
  name: string;
  importName: string;
  description: string;
  category: 'bar' | 'line' | 'pie' | 'other';
}

function getChartCatalog(): ChartInfo[] {
  return [
    {
      name: 'AreaChart',
      importName: 'AreaChart',
      description: 'Displays quantitative data with filled areas under lines',
      category: 'line',
    },
    {
      name: 'DonutChart',
      importName: 'DonutChart',
      description: 'Circular chart with a hole in the center for part-to-whole relationships',
      category: 'pie',
    },
    {
      name: 'GaugeChart',
      importName: 'GaugeChart',
      description: 'Displays a value within a range using a semicircular gauge',
      category: 'other',
    },
    {
      name: 'GroupedVerticalBarChart',
      importName: 'GroupedVerticalBarChart',
      description: 'Vertical bar chart with grouped bars for comparing categories',
      category: 'bar',
    },
    {
      name: 'HeatMapChart',
      importName: 'HeatMapChart',
      description: 'Grid-based chart using color intensity to represent values',
      category: 'other',
    },
    {
      name: 'HorizontalBarChart',
      importName: 'HorizontalBarChart',
      description: 'Horizontal bars for comparing values across categories',
      category: 'bar',
    },
    {
      name: 'HorizontalBarChartWithAxis',
      importName: 'HorizontalBarChartWithAxis',
      description: 'Horizontal bar chart with labeled axes',
      category: 'bar',
    },
    {
      name: 'LineChart',
      importName: 'LineChart',
      description: 'Displays data points connected by straight line segments',
      category: 'line',
    },
    {
      name: 'PolarChart',
      importName: 'PolarChart',
      description: 'Plots data on a radial grid',
      category: 'other',
    },
    {
      name: 'SankeyChart',
      importName: 'SankeyChart',
      description: 'Flow diagram showing quantities between nodes',
      category: 'other',
    },
    {
      name: 'ScatterChart',
      importName: 'ScatterChart',
      description: 'Plots individual data points on a two-dimensional plane',
      category: 'other',
    },
    {
      name: 'Sparkline',
      importName: 'Sparkline',
      description: 'Small inline chart for showing trends',
      category: 'line',
    },
    {
      name: 'VerticalBarChart',
      importName: 'VerticalBarChart',
      description: 'Standard vertical bar chart for comparing values',
      category: 'bar',
    },
    {
      name: 'VerticalStackedBarChart',
      importName: 'VerticalStackedBarChart',
      description: 'Stacked vertical bars showing composition and totals',
      category: 'bar',
    },
    {
      name: 'DeclarativeChart',
      importName: 'DeclarativeChart',
      description: 'Renders charts from a declarative JSON/Plotly schema',
      category: 'other',
    },
    {
      name: 'FunnelChart',
      importName: 'FunnelChart',
      description: 'Funnel-shaped chart for visualizing progressive stages',
      category: 'other',
    },
    {
      name: 'GanttChart',
      importName: 'GanttChart',
      description: 'Timeline chart for project scheduling and task dependencies',
      category: 'other',
    },
  ];
}
