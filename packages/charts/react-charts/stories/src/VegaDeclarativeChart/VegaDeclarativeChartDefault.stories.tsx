import * as React from 'react';
import { VegaDeclarativeChart } from '../../../library/src/components/VegaDeclarativeChart';
import {
  Dropdown,
  Field,
  Input,
  InputOnChangeData,
  Option,
  OptionOnSelectData,
  SelectionEvents,
} from '@fluentui/react-components';

// Dynamically import all schemas
// @ts-ignore
const schemasContext = require.context('./schemas', false, /\.json$/);
const ALL_SCHEMAS: Record<string, any> = {};
const SCHEMA_NAMES: string[] = [];

schemasContext.keys().forEach((key: string) => {
  const schemaName = key.replace('./', '').replace('.json', '');
  ALL_SCHEMAS[schemaName] = schemasContext(key);
  SCHEMA_NAMES.push(schemaName);
});

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: string;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  public static getDerivedStateFromError(error: Error) {
    return { hasError: true, error: `${error.message}\n${error.stack}` };
  }

  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: '' };
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div style={{ color: 'red', padding: '20px', border: '1px solid red', borderRadius: '4px' }}>
          <h3>Error rendering chart:</h3>
          <pre style={{ whiteSpace: 'pre-wrap' }}>{this.state.error}</pre>
        </div>
      );
    }

    return this.props.children;
  }
}

// Categorize schemas for better organization
function categorizeSchemas(): Map<string, string[]> {
  const categories = new Map<string, string[]>();
  
  SCHEMA_NAMES.forEach(name => {
    let category = 'Other';
    
    // Categorization logic based on schema name patterns
    if (name.includes('stock') || name.includes('portfolio') || name.includes('profit') || 
        name.includes('revenue') || name.includes('cashflow') || name.includes('budget') || 
        name.includes('expense') || name.includes('roi') || name.includes('financial') || 
        name.includes('dividend')) {
      category = 'Financial';
    } else if (name.includes('orders') || name.includes('conversion') || name.includes('product') || 
               name.includes('inventory') || name.includes('customer') || name.includes('price') || 
               name.includes('seasonal') || name.includes('category') || name.includes('shipping') || 
               name.includes('discount') || name.includes('sales') || name.includes('market')) {
      category = 'E-Commerce';
    } else if (name.includes('campaign') || name.includes('engagement') || name.includes('social') || 
               name.includes('ad') || name.includes('ctr') || name.includes('channel') || 
               name.includes('influencer') || name.includes('viral') || name.includes('sentiment') || 
               name.includes('impression') || name.includes('lead')) {
      category = 'Marketing';
    } else if (name.includes('patient') || name.includes('age') || name.includes('disease') || 
               name.includes('treatment') || name.includes('hospital') || name.includes('bmi') || 
               name.includes('recovery') || name.includes('medication') || name.includes('symptom') || 
               name.includes('health')) {
      category = 'Healthcare';
    } else if (name.includes('test') || name.includes('grade') || name.includes('course') || 
               name.includes('student') || name.includes('attendance') || name.includes('study') || 
               name.includes('graduation') || name.includes('skill') || name.includes('learning') || 
               name.includes('dropout')) {
      category = 'Education';
    } else if (name.includes('production') || name.includes('defect') || name.includes('machine') || 
               name.includes('downtime') || name.includes('quality') || name.includes('shift') || 
               name.includes('turnover') || name.includes('supply') || name.includes('efficiency') || 
               name.includes('maintenance')) {
      category = 'Manufacturing';
    } else if (name.includes('temperature') || name.includes('precipitation') || name.includes('co2') || 
               name.includes('renewable') || name.includes('air') || name.includes('weather') || 
               name.includes('sea') || name.includes('biodiversity') || name.includes('energy') || 
               name.includes('climate')) {
      category = 'Climate';
    } else if (name.includes('api') || name.includes('error') || name.includes('server') || 
               name.includes('deployment') || name.includes('user_sessions') || name.includes('bug') || 
               name.includes('performance') || name.includes('code') || name.includes('bandwidth') || 
               name.includes('system') || name.includes('website') || name.includes('log_scale')) {
      category = 'Technology';
    } else if (name.includes('player') || name.includes('team') || name.includes('game') || 
               name.includes('season') || name.includes('attendance_bar') || name.includes('league') || 
               name.includes('streaming') || name.includes('genre') || name.includes('tournament')) {
      category = 'Sports';
    } else if (name.includes('linechart') || name.includes('areachart') || name.includes('barchart') || 
               name.includes('scatterchart') || name.includes('donutchart') || name.includes('heatmapchart') ||
               name.includes('grouped_bar') || name.includes('stacked_bar') || name.includes('line_bar_combo')) {
      category = 'Basic Charts';
    }
    
    if (!categories.has(category)) {
      categories.set(category, []);
    }
    categories.get(category)!.push(name);
  });
  
  return categories;
}

const SCHEMA_CATEGORIES = categorizeSchemas();

// Generate options from all schemas
const ALL_OPTIONS: Array<{key: string, text: string, category: string}> = [];
SCHEMA_CATEGORIES.forEach((schemas, category) => {
  schemas.forEach(schemaName => {
    const text = schemaName
      .split(/[-_]/)
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
    ALL_OPTIONS.push({ key: schemaName, text, category });
  });
});

// Sort options by category and name
ALL_OPTIONS.sort((a, b) => {
  if (a.category !== b.category) {
    // Priority order for categories
    const categoryOrder = ['Basic Charts', 'Financial', 'E-Commerce', 'Marketing', 'Healthcare', 'Education', 'Manufacturing', 'Climate', 'Technology', 'Sports', 'Other'];
    return categoryOrder.indexOf(a.category) - categoryOrder.indexOf(b.category);
  }
  return a.text.localeCompare(b.text);
});

export const Default = () => {
  const [selectedChart, setSelectedChart] = React.useState<string>('linechart');
  const [schemaText, setSchemaText] = React.useState<string>(JSON.stringify(ALL_SCHEMAS.linechart, null, 2));
  const [width, setWidth] = React.useState<number>(600);
  const [height, setHeight] = React.useState<number>(400);
  const [selectedCategory, setSelectedCategory] = React.useState<string>('All');

  const handleChartChange = (_e: SelectionEvents, data: OptionOnSelectData) => {
    const chartKey = data.optionValue || 'linechart';
    setSelectedChart(chartKey);
    setSchemaText(JSON.stringify(ALL_SCHEMAS[chartKey], null, 2));
  };

  const handleCategoryChange = (_e: SelectionEvents, data: OptionOnSelectData) => {
    setSelectedCategory(data.optionValue || 'All');
  };

  const handleSchemaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setSchemaText(e.target.value);
  };

  const handleWidthChange = (_e: React.ChangeEvent<HTMLInputElement>, data: InputOnChangeData) => {
    const value = parseInt(data.value);
    if (!isNaN(value) && value > 0) {
      setWidth(value);
    }
  };

  const handleHeightChange = (_e: React.ChangeEvent<HTMLInputElement>, data: InputOnChangeData) => {
    const value = parseInt(data.value);
    if (!isNaN(value) && value > 0) {
      setHeight(value);
    }
  };

  let parsedSchema: any;
  let parseError: string | null = null;
  try {
    parsedSchema = JSON.parse(schemaText);
  } catch (e: any) {
    parsedSchema = null;
    parseError = e.message;
  }

  const filteredOptions =
    selectedCategory === 'All'
      ? ALL_OPTIONS
      : ALL_OPTIONS.filter(opt => opt.category === selectedCategory);

  const categories = ['All', ...Array.from(SCHEMA_CATEGORIES.keys())].sort((a, b) => {
    if (a === 'All') return -1;
    if (b === 'All') return 1;
    const categoryOrder = ['Basic Charts', 'Financial', 'E-Commerce', 'Marketing', 'Healthcare', 'Education', 'Manufacturing', 'Climate', 'Technology', 'Sports', 'Other'];
    return categoryOrder.indexOf(a) - categoryOrder.indexOf(b);
  });

  return (
    <div style={{ padding: '20px' }}>
      <h1>Vega-Lite Declarative Chart - {SCHEMA_NAMES.length} Schemas</h1>
      <p>
        This component renders charts from Vega-Lite specifications. Browse through {SCHEMA_NAMES.length} real-world chart examples
        across {SCHEMA_CATEGORIES.size} categories. Select a chart type or edit the JSON schema below to customize the visualization.
      </p>

      <div style={{ display: 'flex', gap: '20px', marginBottom: '20px', flexWrap: 'wrap' }}>
        <Field label="Category">
          <Dropdown
            value={selectedCategory}
            onOptionSelect={handleCategoryChange}
            style={{ width: '150px' }}
          >
            {categories.map(category => (
              <Option key={category} value={category} text={`${category} (${category === 'All' ? SCHEMA_NAMES.length : (SCHEMA_CATEGORIES.get(category)?.length || 0)})`}>
                {category} ({category === 'All' ? SCHEMA_NAMES.length : (SCHEMA_CATEGORIES.get(category)?.length || 0)})
              </Option>
            ))}
          </Dropdown>
        </Field>
        
        <Field label="Chart Type">
          <Dropdown
            value={filteredOptions.find(opt => opt.key === selectedChart)?.text || 'Line Chart'}
            onOptionSelect={handleChartChange}
            style={{ width: '300px' }}
          >
            {filteredOptions.map(option => (
              <Option key={option.key} value={option.key} text={option.text}>
                {option.text}
              </Option>
            ))}
          </Dropdown>
        </Field>

        <Field label="Width (px)">
          <Input type="number" value={width.toString()} onChange={handleWidthChange} style={{ width: '100px' }} />
        </Field>

        <Field label="Height (px)">
          <Input type="number" value={height.toString()} onChange={handleHeightChange} style={{ width: '100px' }} />
        </Field>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        <div>
          <Field label="Vega-Lite Schema (JSON)">
            <textarea
              value={schemaText}
              onChange={handleSchemaChange}
              style={{
                width: '100%',
                height: '500px',
                fontFamily: 'monospace',
                fontSize: '12px',
                padding: '10px',
                border: '1px solid #ccc',
              borderRadius: '4px',
            }}
          />
        </Field>
        {parseError && (
          <div style={{ color: 'red', marginTop: '10px' }}>
            <strong>JSON Parse Error:</strong> {parseError}
          </div>
        )}
      </div>

      <div>
        <Field label="Chart Preview">
          <ErrorBoundary>
            {parsedSchema ? (
              <div style={{ width: `${width}px`, height: `${height}px` }}>
                <VegaDeclarativeChart chartSchema={{ vegaLiteSpec: parsedSchema }} />
              </div>
            ) : (
              <div style={{ color: 'red' }}>Invalid JSON schema. Please check your syntax.</div>
            )}
          </ErrorBoundary>
        </Field>
      </div>
    </div>

    <div style={{ marginTop: '20px' }}>
      <h3>Chart Categories ({SCHEMA_NAMES.length} Total):</h3>
      <ul style={{ columns: 3 }}>
        {Array.from(SCHEMA_CATEGORIES.entries())
          .sort((a, b) => {
            const categoryOrder = ['Basic Charts', 'Financial', 'E-Commerce', 'Marketing', 'Healthcare', 'Education', 'Manufacturing', 'Climate', 'Technology', 'Sports', 'Other'];
            return categoryOrder.indexOf(a[0]) - categoryOrder.indexOf(b[0]);
          })
          .map(([cat, schemas]) => (
            <li key={cat}>
              <strong>{cat}:</strong> {schemas.length} charts
            </li>
          ))}
      </ul>
      
      <h3 style={{ marginTop: '20px' }}>Features Supported:</h3>
      <ul>
        <li><strong>Line Charts:</strong> Temporal or quantitative x-axis with multiple series</li>
        <li><strong>Area Charts:</strong> Filled line charts for showing trends</li>
        <li><strong>Scatter Charts:</strong> Point marks with optional size encoding</li>
        <li><strong>Bar Charts:</strong> Horizontal and vertical bar visualizations, stacked and grouped</li>
        <li><strong>Donut Charts:</strong> Arc marks with innerRadius for donut effect</li>
        <li><strong>Heatmaps:</strong> Rect marks with color scale</li>
        <li><strong>Combo Charts:</strong> Layered visualizations (line + bar, line + area, etc.)</li>
        <li><strong>Scale Types:</strong> Linear, logarithmic, temporal, ordinal, nominal</li>
        <li><strong>Transforms:</strong> Data transformations like fold for reshaping</li>
      </ul>
    </div>
  </div>
  );
};Default.parameters = {
  docs: {
    description: {
      story:
        `A comprehensive showcase of ${SCHEMA_NAMES.length} Vega-Lite chart schemas covering real-world scenarios across Financial, Healthcare, Education, Manufacturing, Climate, Technology, Sports, and more domains. Demonstrates line, area, scatter, bar, donut, heatmap charts with various axis types, scales, and combo visualizations.`,
    },
  },
};

export default {
  title: 'Charts/VegaDeclarativeChart',
  component: VegaDeclarativeChart,
};
