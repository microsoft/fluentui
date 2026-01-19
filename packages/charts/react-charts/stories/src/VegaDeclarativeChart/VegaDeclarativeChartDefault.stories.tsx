import * as React from 'react';
import { VegaDeclarativeChart } from '../../../library/src/components/VegaDeclarativeChart';
import {
  Button,
  Dropdown,
  Field,
  Input,
  InputOnChangeData,
  Option,
  OptionOnSelectData,
  SelectionEvents,
  Spinner,
  Switch,
} from '@fluentui/react-components';

// Inline schemas (25 total covering various chart types)
// These are the default schemas shown in "show few" mode
const ALL_SCHEMAS: Record<string, any> = {
  adCtrScatter: {
    $schema: 'https://vega.github.io/schema/vega-lite/v5.json',
    description: 'Ad click-through rate analysis',
    data: {
      values: [
        { impressions: 50000, clicks: 1250, campaign: 'Summer Sale', ctr: 2.5 },
        { impressions: 75000, clicks: 2625, campaign: 'Back to School', ctr: 3.5 },
        { impressions: 120000, clicks: 3600, campaign: 'Holiday Special', ctr: 3.0 },
        { impressions: 45000, clicks: 1800, campaign: 'Flash Deal', ctr: 4.0 },
        { impressions: 90000, clicks: 3150, campaign: 'Spring Collection', ctr: 3.5 },
        { impressions: 60000, clicks: 1440, campaign: 'Clearance', ctr: 2.4 },
        { impressions: 100000, clicks: 4500, campaign: 'Black Friday', ctr: 4.5 },
      ],
    },
    mark: 'point',
    encoding: {
      x: { field: 'impressions', type: 'quantitative', axis: { title: 'Impressions', format: ',.0f' } },
      y: { field: 'ctr', type: 'quantitative', axis: { title: 'Click-Through Rate (%)' } },
      size: {
        field: 'clicks',
        type: 'quantitative',
        legend: { title: 'Total Clicks' },
        scale: { range: [100, 1000] },
      },
      color: { field: 'ctr', type: 'quantitative', scale: { scheme: 'blues' }, legend: null },
      tooltip: [
        { field: 'campaign', type: 'nominal' },
        { field: 'impressions', type: 'quantitative', format: ',.0f' },
        { field: 'clicks', type: 'quantitative', format: ',.0f' },
        { field: 'ctr', type: 'quantitative', format: '.1f', title: 'CTR %' },
      ],
    },
    title: 'Ad Performance - CTR Analysis',
  },
  ageDistributionBar: {
    $schema: 'https://vega.github.io/schema/vega-lite/v5.json',
    description: 'Patient age distribution',
    data: {
      values: [
        { ageGroup: '0-10', patients: 145 },
        { ageGroup: '11-20', patients: 98 },
        { ageGroup: '21-30', patients: 234 },
        { ageGroup: '31-40', patients: 312 },
        { ageGroup: '41-50', patients: 287 },
        { ageGroup: '51-60', patients: 342 },
        { ageGroup: '61-70', patients: 398 },
        { ageGroup: '71-80', patients: 276 },
        { ageGroup: '81+', patients: 189 },
      ],
    },
    mark: 'bar',
    encoding: {
      x: { field: 'ageGroup', type: 'ordinal', axis: { title: 'Age Group', labelAngle: 0 } },
      y: { field: 'patients', type: 'quantitative', axis: { title: 'Number of Patients' } },
      color: { field: 'patients', type: 'quantitative', scale: { scheme: 'teal' }, legend: null },
    },
    title: 'Patient Age Distribution',
  },
  airQualityHeatmap: {
    $schema: 'https://vega.github.io/schema/vega-lite/v5.json',
    description: 'Air quality index by location',
    data: {
      values: [
        { city: 'New York', time: 'Morning', aqi: 45 },
        { city: 'New York', time: 'Afternoon', aqi: 62 },
        { city: 'New York', time: 'Evening', aqi: 58 },
        { city: 'Los Angeles', time: 'Morning', aqi: 85 },
        { city: 'Los Angeles', time: 'Afternoon', aqi: 95 },
        { city: 'Los Angeles', time: 'Evening', aqi: 78 },
        { city: 'Chicago', time: 'Morning', aqi: 52 },
        { city: 'Chicago', time: 'Afternoon', aqi: 68 },
        { city: 'Chicago', time: 'Evening', aqi: 61 },
        { city: 'Houston', time: 'Morning', aqi: 72 },
        { city: 'Houston', time: 'Afternoon', aqi: 88 },
        { city: 'Houston', time: 'Evening', aqi: 75 },
      ],
    },
    mark: 'rect',
    encoding: {
      x: { field: 'time', type: 'ordinal', axis: { title: 'Time of Day' } },
      y: { field: 'city', type: 'ordinal', axis: { title: 'City' } },
      color: {
        field: 'aqi',
        type: 'quantitative',
        scale: { scheme: 'redyellowgreen', domain: [0, 150], reverse: true },
        legend: { title: 'AQI' },
      },
      tooltip: [
        { field: 'city', type: 'ordinal' },
        { field: 'time', type: 'ordinal' },
        { field: 'aqi', type: 'quantitative', title: 'Air Quality Index' },
      ],
    },
    title: 'Air Quality Index Heatmap',
  },
  apiResponseLine: {
    $schema: 'https://vega.github.io/schema/vega-lite/v5.json',
    description: 'API response time monitoring',
    data: {
      values: [
        { timestamp: '2024-11-27T08:00:00', responseTime: 145 },
        { timestamp: '2024-11-27T09:00:00', responseTime: 132 },
        { timestamp: '2024-11-27T10:00:00', responseTime: 158 },
        { timestamp: '2024-11-27T11:00:00', responseTime: 142 },
        { timestamp: '2024-11-27T12:00:00', responseTime: 178 },
        { timestamp: '2024-11-27T13:00:00', responseTime: 165 },
        { timestamp: '2024-11-27T14:00:00', responseTime: 152 },
        { timestamp: '2024-11-27T15:00:00', responseTime: 138 },
        { timestamp: '2024-11-27T16:00:00', responseTime: 148 },
        { timestamp: '2024-11-27T17:00:00', responseTime: 156 },
      ],
    },
    mark: { type: 'line', point: true, strokeWidth: 2 },
    encoding: {
      x: { field: 'timestamp', type: 'temporal', axis: { title: 'Time', format: '%H:%M' } },
      y: { field: 'responseTime', type: 'quantitative', axis: { title: 'Response Time (ms)' } },
      tooltip: [
        { field: 'timestamp', type: 'temporal', format: '%H:%M' },
        { field: 'responseTime', type: 'quantitative', title: 'Response (ms)' },
      ],
    },
    title: 'API Response Time Monitoring',
  },
  areaMultiSeriesNoStack: {
    $schema: 'https://vega.github.io/schema/vega-lite/v5.json',
    description: 'Multiple area series without stacking - each fills to zero independently',
    title: 'Department Performance - Overlapping Areas (No Stack)',
    width: 600,
    height: 300,
    data: {
      values: [
        { quarter: 'Q1 2024', department: 'Sales', performance: 85 },
        { quarter: 'Q1 2024', department: 'Marketing', performance: 70 },
        { quarter: 'Q1 2024', department: 'Support', performance: 60 },
        { quarter: 'Q2 2024', department: 'Sales', performance: 88 },
        { quarter: 'Q2 2024', department: 'Marketing', performance: 75 },
        { quarter: 'Q2 2024', department: 'Support', performance: 65 },
        { quarter: 'Q3 2024', department: 'Sales', performance: 92 },
        { quarter: 'Q3 2024', department: 'Marketing', performance: 82 },
        { quarter: 'Q3 2024', department: 'Support', performance: 70 },
        { quarter: 'Q4 2024', department: 'Sales', performance: 95 },
        { quarter: 'Q4 2024', department: 'Marketing', performance: 88 },
        { quarter: 'Q4 2024', department: 'Support', performance: 75 },
      ],
    },
    mark: {
      type: 'area',
      fillOpacity: 0.5,
    },
    encoding: {
      x: {
        field: 'quarter',
        type: 'ordinal',
        axis: {
          title: 'Quarter',
        },
      },
      y: {
        field: 'performance',
        type: 'quantitative',
        stack: null,
        axis: {
          title: 'Performance Score',
        },
      },
      color: {
        field: 'department',
        type: 'nominal',
        legend: {
          title: 'Department',
        },
      },
    },
  },
  areaSingleTozeroy: {
    $schema: 'https://vega.github.io/schema/vega-lite/v5.json',
    description: 'Single series area chart with fill to zero baseline (tozeroy mode)',
    title: 'Monthly Revenue - Single Series (Fill to Zero)',
    width: 600,
    height: 300,
    data: {
      values: [
        { month: '2024-01', revenue: 12000 },
        { month: '2024-02', revenue: 15000 },
        { month: '2024-03', revenue: 18000 },
        { month: '2024-04', revenue: 16000 },
        { month: '2024-05', revenue: 22000 },
        { month: '2024-06', revenue: 25000 },
        { month: '2024-07', revenue: 28000 },
        { month: '2024-08', revenue: 26000 },
        { month: '2024-09', revenue: 30000 },
        { month: '2024-10', revenue: 32000 },
        { month: '2024-11', revenue: 35000 },
        { month: '2024-12', revenue: 38000 },
      ],
    },
    mark: 'area',
    encoding: {
      x: {
        field: 'month',
        type: 'temporal',
        axis: {
          title: 'Month',
          format: '%b %Y',
        },
      },
      y: {
        field: 'revenue',
        type: 'quantitative',
        stack: null,
        axis: {
          title: 'Revenue ($)',
          format: '$,.0f',
        },
      },
    },
  },
  areaStackedTonexty: {
    $schema: 'https://vega.github.io/schema/vega-lite/v5.json',
    description: 'Stacked area chart with multiple series (tonexty mode)',
    title: 'Product Sales by Category - Stacked Areas',
    width: 600,
    height: 300,
    data: {
      values: [
        { month: '2024-01', category: 'Electronics', sales: 5000 },
        { month: '2024-01', category: 'Clothing', sales: 3000 },
        { month: '2024-01', category: 'Home', sales: 2000 },
        { month: '2024-02', category: 'Electronics', sales: 5500 },
        { month: '2024-02', category: 'Clothing', sales: 3500 },
        { month: '2024-02', category: 'Home', sales: 2200 },
        { month: '2024-03', category: 'Electronics', sales: 6000 },
        { month: '2024-03', category: 'Clothing', sales: 4000 },
        { month: '2024-03', category: 'Home', sales: 2500 },
        { month: '2024-04', category: 'Electronics', sales: 5800 },
        { month: '2024-04', category: 'Clothing', sales: 3800 },
        { month: '2024-04', category: 'Home', sales: 2300 },
        { month: '2024-05', category: 'Electronics', sales: 6500 },
        { month: '2024-05', category: 'Clothing', sales: 4200 },
        { month: '2024-05', category: 'Home', sales: 2700 },
        { month: '2024-06', category: 'Electronics', sales: 7000 },
        { month: '2024-06', category: 'Clothing', sales: 4500 },
        { month: '2024-06', category: 'Home', sales: 3000 },
        { month: '2024-07', category: 'Electronics', sales: 7500 },
        { month: '2024-07', category: 'Clothing', sales: 5000 },
        { month: '2024-07', category: 'Home', sales: 3200 },
        { month: '2024-08', category: 'Electronics', sales: 7200 },
        { month: '2024-08', category: 'Clothing', sales: 4800 },
        { month: '2024-08', category: 'Home', sales: 3000 },
        { month: '2024-09', category: 'Electronics', sales: 8000 },
        { month: '2024-09', category: 'Clothing', sales: 5500 },
        { month: '2024-09', category: 'Home', sales: 3500 },
        { month: '2024-10', category: 'Electronics', sales: 8500 },
        { month: '2024-10', category: 'Clothing', sales: 6000 },
        { month: '2024-10', category: 'Home', sales: 3800 },
        { month: '2024-11', category: 'Electronics', sales: 9000 },
        { month: '2024-11', category: 'Clothing', sales: 6500 },
        { month: '2024-11', category: 'Home', sales: 4000 },
        { month: '2024-12', category: 'Electronics', sales: 9500 },
        { month: '2024-12', category: 'Clothing', sales: 7000 },
        { month: '2024-12', category: 'Home', sales: 4500 },
      ],
    },
    mark: 'area',
    encoding: {
      x: {
        field: 'month',
        type: 'temporal',
        axis: {
          title: 'Month',
          format: '%b',
        },
      },
      y: {
        field: 'sales',
        type: 'quantitative',
        stack: 'zero',
        axis: {
          title: 'Sales ($)',
          format: '$,.0f',
        },
      },
      color: {
        field: 'category',
        type: 'nominal',
        legend: {
          title: 'Product Category',
        },
      },
    },
  },
  areachart: {
    $schema: 'https://vega.github.io/schema/vega-lite/v5.json',
    description: 'Area chart with temporal data.',
    data: {
      values: [
        { date: '2023-01-01', value: 28, category: 'A' },
        { date: '2023-01-02', value: 55, category: 'A' },
        { date: '2023-01-03', value: 43, category: 'A' },
        { date: '2023-01-04', value: 91, category: 'A' },
        { date: '2023-01-05', value: 81, category: 'A' },
        { date: '2023-01-01', value: 20, category: 'B' },
        { date: '2023-01-02', value: 40, category: 'B' },
        { date: '2023-01-03', value: 30, category: 'B' },
        { date: '2023-01-04', value: 70, category: 'B' },
        { date: '2023-01-05', value: 60, category: 'B' },
      ],
    },
    mark: 'area',
    encoding: {
      x: { field: 'date', type: 'temporal', axis: { title: 'Date' } },
      y: { field: 'value', type: 'quantitative', axis: { title: 'Value' } },
      color: { field: 'category', type: 'nominal' },
    },
    title: 'Simple Area Chart',
  },
  attendanceBar: {
    $schema: 'https://vega.github.io/schema/vega-lite/v5.json',
    description: 'Stadium attendance figures',
    data: {
      values: [
        { game: 'Game 1', attendance: 42500 },
        { game: 'Game 2', attendance: 45200 },
        { game: 'Game 3', attendance: 38900 },
        { game: 'Game 4', attendance: 51000 },
        { game: 'Game 5', attendance: 48700 },
        { game: 'Game 6', attendance: 52500 },
      ],
    },
    mark: 'bar',
    encoding: {
      x: { field: 'game', type: 'ordinal', axis: { title: 'Game' } },
      y: { field: 'attendance', type: 'quantitative', axis: { title: 'Attendance', format: ',.0f' } },
      color: { field: 'attendance', type: 'quantitative', scale: { scheme: 'oranges' }, legend: null },
    },
    title: 'Home Game Attendance',
  },
  attendanceHeatmap: {
    $schema: 'https://vega.github.io/schema/vega-lite/v5.json',
    description: 'Class attendance patterns',
    data: {
      values: [
        { day: 'Monday', period: 'Period 1', attendance: 92 },
        { day: 'Monday', period: 'Period 2', attendance: 89 },
        { day: 'Monday', period: 'Period 3', attendance: 87 },
        { day: 'Monday', period: 'Period 4', attendance: 85 },
        { day: 'Tuesday', period: 'Period 1', attendance: 90 },
        { day: 'Tuesday', period: 'Period 2', attendance: 88 },
        { day: 'Tuesday', period: 'Period 3', attendance: 91 },
        { day: 'Tuesday', period: 'Period 4', attendance: 86 },
        { day: 'Wednesday', period: 'Period 1', attendance: 94 },
        { day: 'Wednesday', period: 'Period 2', attendance: 92 },
        { day: 'Wednesday', period: 'Period 3', attendance: 90 },
        { day: 'Wednesday', period: 'Period 4', attendance: 88 },
        { day: 'Thursday', period: 'Period 1', attendance: 91 },
        { day: 'Thursday', period: 'Period 2', attendance: 89 },
        { day: 'Thursday', period: 'Period 3', attendance: 87 },
        { day: 'Thursday', period: 'Period 4', attendance: 84 },
        { day: 'Friday', period: 'Period 1', attendance: 88 },
        { day: 'Friday', period: 'Period 2', attendance: 85 },
        { day: 'Friday', period: 'Period 3', attendance: 83 },
        { day: 'Friday', period: 'Period 4', attendance: 79 },
      ],
    },
    mark: 'rect',
    encoding: {
      x: { field: 'day', type: 'ordinal', axis: { title: 'Day of Week' } },
      y: { field: 'period', type: 'ordinal', axis: { title: 'Class Period' } },
      color: {
        field: 'attendance',
        type: 'quantitative',
        scale: { scheme: 'blues' },
        legend: { title: 'Attendance %' },
      },
      tooltip: [
        { field: 'day', type: 'ordinal' },
        { field: 'period', type: 'ordinal' },
        { field: 'attendance', type: 'quantitative', title: 'Attendance %', format: '.0f' },
      ],
    },
    title: 'Weekly Attendance Patterns',
  },
  bandwidthStackedArea: {
    $schema: 'https://vega.github.io/schema/vega-lite/v5.json',
    description: 'Network bandwidth usage',
    data: {
      values: [
        { hour: '2024-11-27T00:00:00', inbound: 125, outbound: 95 },
        { hour: '2024-11-27T04:00:00', inbound: 85, outbound: 65 },
        { hour: '2024-11-27T08:00:00', inbound: 245, outbound: 185 },
        { hour: '2024-11-27T12:00:00', inbound: 385, outbound: 295 },
        { hour: '2024-11-27T16:00:00', inbound: 425, outbound: 325 },
        { hour: '2024-11-27T20:00:00', inbound: 285, outbound: 215 },
      ],
    },
    transform: [{ fold: ['inbound', 'outbound'], as: ['direction', 'bandwidth'] }],
    mark: 'area',
    encoding: {
      x: { field: 'hour', type: 'temporal', axis: { title: 'Hour', format: '%H:%M' } },
      y: { field: 'bandwidth', type: 'quantitative', axis: { title: 'Bandwidth (Mbps)' } },
      color: { field: 'direction', type: 'nominal', legend: { title: 'Direction' } },
      opacity: { value: 0.7 },
    },
    title: 'Network Bandwidth Usage',
  },
  barchart: {
    $schema: 'https://vega.github.io/schema/vega-lite/v5.json',
    description: 'A simple bar chart.',
    data: {
      values: [
        { category: 'A', value: 28 },
        { category: 'B', value: 55 },
        { category: 'C', value: 43 },
        { category: 'D', value: 91 },
        { category: 'E', value: 81 },
      ],
    },
    mark: 'bar',
    encoding: {
      x: { field: 'value', type: 'quantitative', axis: { title: 'Value' } },
      y: { field: 'category', type: 'nominal', axis: { title: 'Category' } },
    },
    title: 'Horizontal Bar Chart',
  },
  biodiversityGrouped: {
    $schema: 'https://vega.github.io/schema/vega-lite/v5.json',
    description: 'Biodiversity counts by region',
    data: {
      values: [
        { region: 'Amazon', category: 'Mammals', count: 427 },
        { region: 'Amazon', category: 'Birds', count: 1300 },
        { region: 'Amazon', category: 'Reptiles', count: 378 },
        { region: 'Congo', category: 'Mammals', count: 268 },
        { region: 'Congo', category: 'Birds', count: 700 },
        { region: 'Congo', category: 'Reptiles', count: 280 },
        { region: 'Borneo', category: 'Mammals', count: 222 },
        { region: 'Borneo', category: 'Birds', count: 420 },
        { region: 'Borneo', category: 'Reptiles', count: 254 },
      ],
    },
    mark: 'bar',
    encoding: {
      x: { field: 'region', type: 'nominal', axis: { title: 'Region' } },
      y: { field: 'count', type: 'quantitative', axis: { title: 'Species Count' } },
      color: { field: 'category', type: 'nominal', legend: { title: 'Category' } },
      xOffset: { field: 'category' },
    },
    title: 'Biodiversity by Rainforest Region',
  },
  bmiScatter: {
    $schema: 'https://vega.github.io/schema/vega-lite/v5.json',
    description: 'BMI distribution analysis',
    data: {
      values: [
        { height: 160, weight: 52, bmi: 20.3, category: 'Normal' },
        { height: 165, weight: 68, bmi: 25.0, category: 'Overweight' },
        { height: 170, weight: 75, bmi: 25.9, category: 'Overweight' },
        { height: 175, weight: 70, bmi: 22.9, category: 'Normal' },
        { height: 180, weight: 95, bmi: 29.3, category: 'Overweight' },
        { height: 158, weight: 45, bmi: 18.0, category: 'Underweight' },
        { height: 172, weight: 82, bmi: 27.7, category: 'Overweight' },
        { height: 168, weight: 58, bmi: 20.5, category: 'Normal' },
        { height: 177, weight: 88, bmi: 28.1, category: 'Overweight' },
        { height: 162, weight: 48, bmi: 18.3, category: 'Underweight' },
      ],
    },
    mark: 'point',
    encoding: {
      x: { field: 'height', type: 'quantitative', axis: { title: 'Height (cm)' } },
      y: { field: 'weight', type: 'quantitative', axis: { title: 'Weight (kg)' } },
      color: {
        field: 'category',
        type: 'nominal',
        scale: { domain: ['Underweight', 'Normal', 'Overweight'], range: ['#ff7f0e', '#2ca02c', '#d62728'] },
        legend: { title: 'BMI Category' },
      },
      size: { value: 100 },
      tooltip: [
        { field: 'height', type: 'quantitative', title: 'Height (cm)' },
        { field: 'weight', type: 'quantitative', title: 'Weight (kg)' },
        { field: 'bmi', type: 'quantitative', title: 'BMI', format: '.1f' },
        { field: 'category', type: 'nominal', title: 'Category' },
      ],
    },
    title: 'BMI Distribution Scatter',
  },
  budgetActualGrouped: {
    $schema: 'https://vega.github.io/schema/vega-lite/v5.json',
    description: 'Budget vs Actual spending by department',
    data: {
      values: [
        { department: 'Marketing', category: 'Budget', amount: 250000 },
        { department: 'Marketing', category: 'Actual', amount: 235000 },
        { department: 'Engineering', category: 'Budget', amount: 450000 },
        { department: 'Engineering', category: 'Actual', amount: 478000 },
        { department: 'Sales', category: 'Budget', amount: 320000 },
        { department: 'Sales', category: 'Actual', amount: 310000 },
        { department: 'Operations', category: 'Budget', amount: 180000 },
        { department: 'Operations', category: 'Actual', amount: 192000 },
      ],
    },
    mark: 'bar',
    encoding: {
      x: { field: 'department', type: 'nominal', axis: { title: 'Department' } },
      y: { field: 'amount', type: 'quantitative', axis: { title: 'Amount ($)', format: '$,.0f' } },
      color: {
        field: 'category',
        type: 'nominal',
        scale: { domain: ['Budget', 'Actual'], range: ['#1f77b4', '#ff7f0e'] },
      },
      xOffset: { field: 'category' },
    },
    title: 'Budget vs Actual - Department Comparison',
  },
  bugPriorityDonut: {
    $schema: 'https://vega.github.io/schema/vega-lite/v5.json',
    description: 'Bug priority distribution',
    data: {
      values: [
        { priority: 'Critical', count: 12 },
        { priority: 'High', count: 28 },
        { priority: 'Medium', count: 45 },
        { priority: 'Low', count: 67 },
      ],
    },
    mark: { type: 'arc', innerRadius: 55 },
    encoding: {
      theta: { field: 'count', type: 'quantitative' },
      color: {
        field: 'priority',
        type: 'nominal',
        scale: {
          domain: ['Critical', 'High', 'Medium', 'Low'],
          range: ['#d62728', '#ff7f0e', '#ffcc00', '#2ca02c'],
        },
        legend: { title: 'Priority' },
      },
      tooltip: [
        { field: 'priority', type: 'nominal' },
        { field: 'count', type: 'quantitative', title: 'Open Bugs' },
      ],
    },
    title: 'Open Bugs by Priority',
  },
  campaignPerformanceCombo: {
    $schema: 'https://vega.github.io/schema/vega-lite/v5.json',
    description: 'Marketing campaign performance',
    layer: [
      {
        mark: 'bar',
        encoding: {
          x: { field: 'week', type: 'temporal', axis: { title: 'Week', format: '%b %d' } },
          y: { field: 'spend', type: 'quantitative', axis: { title: 'Spend ($)', format: '$,.0f' } },
          color: { value: 'lightblue' },
        },
      },
      {
        mark: { type: 'line', point: true, color: 'darkgreen' },
        encoding: {
          x: { field: 'week', type: 'temporal' },
          y: { field: 'conversions', type: 'quantitative', axis: { title: 'Conversions' } },
        },
      },
    ],
    data: {
      values: [
        { week: '2024-10-01', spend: 12000, conversions: 240 },
        { week: '2024-10-08', spend: 15000, conversions: 315 },
        { week: '2024-10-15', spend: 18000, conversions: 378 },
        { week: '2024-10-22', spend: 14000, conversions: 294 },
        { week: '2024-10-29', spend: 16000, conversions: 336 },
        { week: '2024-11-05', spend: 20000, conversions: 440 },
      ],
    },
    resolve: { scale: { y: 'independent' } },
    title: 'Campaign Spend vs Conversions',
  },
  cashflowCombo: {
    $schema: 'https://vega.github.io/schema/vega-lite/v5.json',
    description: 'Monthly cash flow analysis',
    layer: [
      {
        mark: 'bar',
        encoding: {
          x: { field: 'month', type: 'temporal', axis: { title: 'Month', format: '%b' } },
          y: { field: 'cashflow', type: 'quantitative', axis: { title: 'Cash Flow ($)', format: '$,.0f' } },
          color: {
            condition: {
              test: 'datum.cashflow > 0',
              value: '#2ca02c',
            },
            value: '#d62728',
          },
        },
      },
      {
        mark: { type: 'line', point: true, color: 'orange' },
        encoding: {
          x: { field: 'month', type: 'temporal' },
          y: { field: 'balance', type: 'quantitative', axis: { title: 'Running Balance' } },
        },
      },
    ],
    data: {
      values: [
        { month: '2024-01', cashflow: 85000, balance: 285000 },
        { month: '2024-02', cashflow: -42000, balance: 243000 },
        { month: '2024-03', cashflow: 95000, balance: 338000 },
        { month: '2024-04', cashflow: 112000, balance: 450000 },
        { month: '2024-05', cashflow: -28000, balance: 422000 },
        { month: '2024-06', cashflow: 138000, balance: 560000 },
      ],
    },
    resolve: { scale: { y: 'independent' } },
    title: 'Cash Flow Analysis',
  },
  categorySalesStacked: {
    $schema: 'https://vega.github.io/schema/vega-lite/v5.json',
    description: 'Category sales breakdown',
    data: {
      values: [
        { quarter: 'Q1', category: 'Electronics', sales: 125000 },
        { quarter: 'Q1', category: 'Clothing', sales: 78000 },
        { quarter: 'Q1', category: 'Home & Garden', sales: 52000 },
        { quarter: 'Q1', category: 'Sports', sales: 38000 },
        { quarter: 'Q2', category: 'Electronics', sales: 142000 },
        { quarter: 'Q2', category: 'Clothing', sales: 95000 },
        { quarter: 'Q2', category: 'Home & Garden', sales: 68000 },
        { quarter: 'Q2', category: 'Sports', sales: 45000 },
        { quarter: 'Q3', category: 'Electronics', sales: 138000 },
        { quarter: 'Q3', category: 'Clothing', sales: 88000 },
        { quarter: 'Q3', category: 'Home & Garden', sales: 61000 },
        { quarter: 'Q3', category: 'Sports', sales: 52000 },
      ],
    },
    mark: 'bar',
    encoding: {
      x: { field: 'quarter', type: 'nominal', axis: { title: 'Quarter' } },
      y: { field: 'sales', type: 'quantitative', axis: { title: 'Sales ($)', format: '$,.0f' } },
      color: { field: 'category', type: 'nominal', legend: { title: 'Category' } },
    },
    title: 'Category Sales - Stacked View',
  },
  channelDistributionDonut: {
    $schema: 'https://vega.github.io/schema/vega-lite/v5.json',
    description: 'Marketing channel distribution',
    data: {
      values: [
        { channel: 'Email', budget: 45000 },
        { channel: 'Social Media', budget: 85000 },
        { channel: 'Search Ads', budget: 120000 },
        { channel: 'Display Ads', budget: 65000 },
        { channel: 'Content Marketing', budget: 55000 },
        { channel: 'Influencer', budget: 75000 },
      ],
    },
    mark: { type: 'arc', innerRadius: 60, padAngle: 0.015 },
    encoding: {
      theta: { field: 'budget', type: 'quantitative' },
      color: {
        field: 'channel',
        type: 'nominal',
        scale: { scheme: 'set2' },
        legend: { title: 'Marketing Channel' },
      },
      tooltip: [
        { field: 'channel', type: 'nominal' },
        { field: 'budget', type: 'quantitative', format: '$,.0f', title: 'Budget' },
      ],
    },
    title: 'Marketing Budget by Channel',
  },
  climateZonesScatter: {
    $schema: 'https://vega.github.io/schema/vega-lite/v5.json',
    description: 'Climate zone temperature distribution',
    data: {
      values: [
        { avgTemp: -15, precipitation: 250, zone: 'Arctic' },
        { avgTemp: 5, precipitation: 800, zone: 'Temperate' },
        { avgTemp: 15, precipitation: 650, zone: 'Subtropical' },
        { avgTemp: 25, precipitation: 2000, zone: 'Tropical' },
        { avgTemp: -8, precipitation: 300, zone: 'Subarctic' },
        { avgTemp: 22, precipitation: 450, zone: 'Arid' },
        { avgTemp: 18, precipitation: 900, zone: 'Mediterranean' },
      ],
    },
    mark: { type: 'point', size: 200 },
    encoding: {
      x: { field: 'avgTemp', type: 'quantitative', axis: { title: 'Average Temperature (°C)' } },
      y: { field: 'precipitation', type: 'quantitative', axis: { title: 'Annual Precipitation (mm)' } },
      color: { field: 'zone', type: 'nominal', legend: { title: 'Climate Zone' } },
      tooltip: [
        { field: 'zone', type: 'nominal', title: 'Zone' },
        { field: 'avgTemp', type: 'quantitative', title: 'Avg Temp (°C)' },
        { field: 'precipitation', type: 'quantitative', title: 'Precipitation (mm)' },
      ],
    },
    title: 'Climate Zones Classification',
  },
  co2EmissionsArea: {
    $schema: 'https://vega.github.io/schema/vega-lite/v5.json',
    description: 'CO2 emissions over time',
    data: {
      values: [
        { year: '1990', emissions: 22.7 },
        { year: '1995', emissions: 23.5 },
        { year: '2000', emissions: 25.1 },
        { year: '2005', emissions: 28.8 },
        { year: '2010', emissions: 32.5 },
        { year: '2015', emissions: 35.2 },
        { year: '2020', emissions: 33.8 },
        { year: '2023', emissions: 36.1 },
      ],
    },
    mark: { type: 'area', line: true, point: true, color: 'gray', opacity: 0.7 },
    encoding: {
      x: { field: 'year', type: 'ordinal', axis: { title: 'Year' } },
      y: { field: 'emissions', type: 'quantitative', axis: { title: 'CO₂ Emissions (Gt)', format: '.1f' } },
      tooltip: [
        { field: 'year', type: 'ordinal' },
        { field: 'emissions', type: 'quantitative', title: 'Emissions (Gt)', format: '.1f' },
      ],
    },
    title: 'Global CO₂ Emissions Trend',
  },
  codeCommitsCombo: {
    $schema: 'https://vega.github.io/schema/vega-lite/v5.json',
    description: 'Code commit activity',
    layer: [
      {
        mark: 'bar',
        encoding: {
          x: { field: 'week', type: 'ordinal', axis: { title: 'Week' } },
          y: { field: 'commits', type: 'quantitative', axis: { title: 'Commits' } },
          color: { value: 'lightcoral' },
        },
      },
      {
        mark: { type: 'line', point: true, color: 'navy' },
        encoding: {
          x: { field: 'week', type: 'ordinal' },
          y: { field: 'contributors', type: 'quantitative', axis: { title: 'Active Contributors' } },
        },
      },
    ],
    data: {
      values: [
        { week: 'Week 1', commits: 142, contributors: 12 },
        { week: 'Week 2', commits: 158, contributors: 14 },
        { week: 'Week 3', commits: 135, contributors: 11 },
        { week: 'Week 4', commits: 178, contributors: 15 },
        { week: 'Week 5', commits: 165, contributors: 13 },
        { week: 'Week 6', commits: 192, contributors: 16 },
      ],
    },
    resolve: { scale: { y: 'independent' } },
    title: 'Code Commits & Contributors',
  },
  conversionFunnel: {
    $schema: 'https://vega.github.io/schema/vega-lite/v5.json',
    description: 'E-commerce conversion funnel',
    data: {
      values: [
        { stage: 'Page Views', count: 50000 },
        { stage: 'Product Views', count: 12500 },
        { stage: 'Add to Cart', count: 3750 },
        { stage: 'Checkout Started', count: 2250 },
        { stage: 'Payment Info', count: 1800 },
        { stage: 'Order Completed', count: 1575 },
      ],
    },
    mark: 'bar',
    encoding: {
      y: { field: 'stage', type: 'nominal', axis: { title: 'Funnel Stage' }, sort: null },
      x: { field: 'count', type: 'quantitative', axis: { title: 'Users', format: ',.0f' } },
      color: { field: 'count', type: 'quantitative', scale: { scheme: 'blues' }, legend: null },
    },
    title: 'Conversion Funnel Analysis',
  },
  courseEnrollmentDonut: {
    $schema: 'https://vega.github.io/schema/vega-lite/v5.json',
    description: 'Course enrollment breakdown',
    data: {
      values: [
        { course: 'Computer Science', enrolled: 450 },
        { course: 'Engineering', enrolled: 380 },
        { course: 'Business', enrolled: 520 },
        { course: 'Arts & Humanities', enrolled: 290 },
        { course: 'Natural Sciences', enrolled: 360 },
        { course: 'Social Sciences', enrolled: 310 },
      ],
    },
    mark: { type: 'arc', innerRadius: 65, padAngle: 0.01 },
    encoding: {
      theta: { field: 'enrolled', type: 'quantitative' },
      color: {
        field: 'course',
        type: 'nominal',
        scale: { scheme: 'category20' },
        legend: { title: 'Course' },
      },
      tooltip: [
        { field: 'course', type: 'nominal' },
        { field: 'enrolled', type: 'quantitative', title: 'Students', format: ',.0f' },
      ],
    },
    title: 'Course Enrollment Distribution',
  },
};

const SCHEMA_NAMES: string[] = Object.keys(ALL_SCHEMAS);

// Convert ALL_SCHEMAS to array format for easier handling
const DEFAULT_SCHEMAS: Array<{ key: string; schema: any }> = SCHEMA_NAMES.map(key => ({
  key,
  schema: ALL_SCHEMAS[key],
}));

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
    if (
      name.includes('stock') ||
      name.includes('portfolio') ||
      name.includes('profit') ||
      name.includes('revenue') ||
      name.includes('cashflow') ||
      name.includes('budget') ||
      name.includes('expense') ||
      name.includes('roi') ||
      name.includes('financial') ||
      name.includes('dividend')
    ) {
      category = 'Financial';
    } else if (
      name.includes('orders') ||
      name.includes('conversion') ||
      name.includes('product') ||
      name.includes('inventory') ||
      name.includes('customer') ||
      name.includes('price') ||
      name.includes('seasonal') ||
      name.includes('category') ||
      name.includes('shipping') ||
      name.includes('discount') ||
      name.includes('sales') ||
      name.includes('market')
    ) {
      category = 'E-Commerce';
    } else if (
      name.includes('campaign') ||
      name.includes('engagement') ||
      name.includes('social') ||
      name.includes('ad') ||
      name.includes('ctr') ||
      name.includes('channel') ||
      name.includes('influencer') ||
      name.includes('viral') ||
      name.includes('sentiment') ||
      name.includes('impression') ||
      name.includes('lead')
    ) {
      category = 'Marketing';
    } else if (
      name.includes('patient') ||
      name.includes('age') ||
      name.includes('disease') ||
      name.includes('treatment') ||
      name.includes('hospital') ||
      name.includes('bmi') ||
      name.includes('recovery') ||
      name.includes('medication') ||
      name.includes('symptom') ||
      name.includes('health')
    ) {
      category = 'Healthcare';
    } else if (
      name.includes('test') ||
      name.includes('grade') ||
      name.includes('course') ||
      name.includes('student') ||
      name.includes('attendance') ||
      name.includes('study') ||
      name.includes('graduation') ||
      name.includes('skill') ||
      name.includes('learning') ||
      name.includes('dropout')
    ) {
      category = 'Education';
    } else if (
      name.includes('production') ||
      name.includes('defect') ||
      name.includes('machine') ||
      name.includes('downtime') ||
      name.includes('quality') ||
      name.includes('shift') ||
      name.includes('turnover') ||
      name.includes('supply') ||
      name.includes('efficiency') ||
      name.includes('maintenance')
    ) {
      category = 'Manufacturing';
    } else if (
      name.includes('temperature') ||
      name.includes('precipitation') ||
      name.includes('co2') ||
      name.includes('renewable') ||
      name.includes('air') ||
      name.includes('weather') ||
      name.includes('sea') ||
      name.includes('biodiversity') ||
      name.includes('energy') ||
      name.includes('climate')
    ) {
      category = 'Climate';
    } else if (
      name.includes('api') ||
      name.includes('error') ||
      name.includes('server') ||
      name.includes('deployment') ||
      name.includes('user_sessions') ||
      name.includes('bug') ||
      name.includes('performance') ||
      name.includes('code') ||
      name.includes('bandwidth') ||
      name.includes('system') ||
      name.includes('website') ||
      name.includes('log_scale')
    ) {
      category = 'Technology';
    } else if (
      name.includes('player') ||
      name.includes('team') ||
      name.includes('game') ||
      name.includes('season') ||
      name.includes('attendance_bar') ||
      name.includes('league') ||
      name.includes('streaming') ||
      name.includes('genre') ||
      name.includes('tournament')
    ) {
      category = 'Sports';
    } else if (
      name.includes('linechart') ||
      name.includes('areachart') ||
      name.includes('barchart') ||
      name.includes('scatterchart') ||
      name.includes('donutchart') ||
      name.includes('heatmapchart') ||
      name.includes('grouped_bar') ||
      name.includes('stacked_bar') ||
      name.includes('line_bar_combo')
    ) {
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
const ALL_OPTIONS: Array<{ key: string; text: string; category: string }> = [];
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
    const categoryOrder = [
      'Basic Charts',
      'Financial',
      'E-Commerce',
      'Marketing',
      'Healthcare',
      'Education',
      'Manufacturing',
      'Climate',
      'Technology',
      'Sports',
      'Other',
    ];
    return categoryOrder.indexOf(a.category) - categoryOrder.indexOf(b.category);
  }
  return a.text.localeCompare(b.text);
});

type LoadingState = 'initial' | 'loading' | 'partially_loaded' | 'loaded';

export const Default = (): React.ReactElement => {
  const [selectedChart, setSelectedChart] = React.useState<string>('linechart');
  const [schemaText, setSchemaText] = React.useState<string>(
    JSON.stringify(DEFAULT_SCHEMAS.find(s => s.key === 'linechart')?.schema || {}, null, 2),
  );
  const [width, setWidth] = React.useState<number>(600);
  const [height, setHeight] = React.useState<number>(400);
  const [selectedCategory, setSelectedCategory] = React.useState<string>('All');
  const [showMore, setShowMore] = React.useState(false);
  const [loadingState, setLoadingState] = React.useState<LoadingState>('initial');
  const loadedSchemas = React.useRef<Array<{ key: string; schema: any }>>([]);

  // Load schemas from GitHub fluentui-charting-contrib repository
  const loadSchemas = React.useCallback(
    async (startLoadingState: LoadingState = 'loading') => {
      setLoadingState(startLoadingState);
      let disableLoadMore = false;
      const offset = loadedSchemas.current.length;
      const promises = Array.from({ length: 100 }, (_, index) => {
        const id = offset + index + 1;
        const filename = `data_${id < 100 ? ('00' + id).slice(-3) : id}_vega`;
        return fetch(
          `https://raw.githubusercontent.com/microsoft/fluentui-charting-contrib/refs/heads/main/vega_data/${filename}.json`,
        )
          .then(response => {
            if (response.status === 404) {
              disableLoadMore = true;
              return null;
            }
            return response.json();
          })
          .then(schema => {
            if (!schema) {
              return null;
            }
            return { key: filename, schema };
          })
          .catch(() => null);
      });

      const results = await Promise.all(promises);
      loadedSchemas.current.push(...(results.filter(item => item !== null) as Array<{ key: string; schema: any }>));
      setLoadingState(disableLoadMore ? 'loaded' : 'partially_loaded');
    },
    [],
  );

  React.useEffect(() => {
    if (showMore) {
      loadSchemas('initial');
    }
  }, [showMore, loadSchemas]);

  const getSchemaByKey = React.useCallback(
    (key: string): any => {
      // First check DEFAULT_SCHEMAS
      const defaultSchema = DEFAULT_SCHEMAS.find(x => x.key === key);
      if (defaultSchema) {
        return defaultSchema.schema;
      }
      // Then check loaded schemas if in showMore mode
      if (showMore) {
        const loadedSchema = loadedSchemas.current.find(x => x.key === key);
        if (loadedSchema) {
          return loadedSchema.schema;
        }
      }
      return null;
    },
    [showMore],
  );

  const onSwitchDataChange = React.useCallback((ev: React.ChangeEvent<HTMLInputElement>) => {
    setShowMore(ev.currentTarget.checked);
    // Reset to first chart when switching modes
    if (!ev.currentTarget.checked) {
      setSelectedChart('linechart');
      setSchemaText(JSON.stringify(DEFAULT_SCHEMAS[0].schema, null, 2));
    }
  }, []);

  const handleChartChange = (_e: SelectionEvents, data: OptionOnSelectData) => {
    const chartKey = data.optionValue || 'linechart';
    setSelectedChart(chartKey);
    const schema = getSchemaByKey(chartKey);
    setSchemaText(JSON.stringify(schema || {}, null, 2));
  };

  const handleCategoryChange = (_e: SelectionEvents, data: OptionOnSelectData) => {
    setSelectedCategory(data.optionValue || 'All');
  };

  const handleSchemaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setSchemaText(e.target.value);
  };

  const handleWidthChange = (_e: React.ChangeEvent<HTMLInputElement>, data: InputOnChangeData) => {
    const value = parseInt(data.value, 10);
    if (!isNaN(value) && value > 0) {
      setWidth(value);
    }
  };

  const handleHeightChange = (_e: React.ChangeEvent<HTMLInputElement>, data: InputOnChangeData) => {
    const value = parseInt(data.value, 10);
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

  // Get available schemas based on showMore mode
  const availableSchemas = React.useMemo(() => {
    if (showMore) {
      return loadedSchemas.current.length > 0 ? loadedSchemas.current : [];
    }
    return DEFAULT_SCHEMAS;
  }, [showMore, loadedSchemas.current.length]);

  // Generate options from available schemas
  const currentOptions = React.useMemo(() => {
    const schemas = showMore
      ? [...DEFAULT_SCHEMAS, ...loadedSchemas.current]
      : DEFAULT_SCHEMAS;
    return schemas.map(item => {
      const text = item.key
        .split(/[-_]/)
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
      return { key: item.key, text, category: 'All' };
    });
  }, [showMore, loadedSchemas.current.length]);

  const filteredOptions = currentOptions;

  const schemaCount = showMore ? DEFAULT_SCHEMAS.length + loadedSchemas.current.length : DEFAULT_SCHEMAS.length;

  const categories = React.useMemo(() => {
    // In "show few" mode, only show "All" category
    if (!showMore) {
      return ['All'];
    }
    // In "show more" mode, show all categories
    return ['All', ...Array.from(SCHEMA_CATEGORIES.keys())].sort((a, b) => {
      if (a === 'All') {
        return -1;
      }
      if (b === 'All') {
        return 1;
      }
      const categoryOrder = [
        'Basic Charts',
        'Financial',
        'E-Commerce',
        'Marketing',
        'Healthcare',
        'Education',
        'Manufacturing',
        'Climate',
        'Technology',
        'Sports',
        'Other',
      ];
      return categoryOrder.indexOf(a) - categoryOrder.indexOf(b);
    });
  }, [showMore]);

  return (
    <div style={{ padding: '20px' }}>
      <h1>Vega-Lite Declarative Chart - {schemaCount} Schemas</h1>
      <p>
        This component renders charts from Vega-Lite specifications. Browse through {schemaCount}
        {showMore ? ' chart examples (including additional schemas from GitHub)' : ' chart examples'}.
        {showMore
          ? ' Use "Load more" to load additional schemas from the fluentui-charting-contrib repository.'
          : ' Enable "Show more" to load thousands of additional examples from GitHub.'}
      </p>

      <div style={{ marginBottom: '20px' }}>
        <Switch checked={showMore} onChange={onSwitchDataChange} label={showMore ? 'Show more' : 'Show few'} />
      </div>

      <div style={{ display: 'flex', gap: '20px', marginBottom: '20px', flexWrap: 'wrap' }}>
        <Field label="Category">
          <Dropdown value={selectedCategory} onOptionSelect={handleCategoryChange} style={{ width: '150px' }}>
            {categories.map(category => (
              <Option
                key={category}
                value={category}
                text={`${category} (${
                  category === 'All'
                    ? schemaCount
                    : showMore
                      ? SCHEMA_CATEGORIES.get(category)?.length || 0
                      : 0
                })`}
              >
                {category} (
                {category === 'All'
                  ? schemaCount
                  : showMore
                    ? SCHEMA_CATEGORIES.get(category)?.length || 0
                    : 0}
                )
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

        {showMore && (
          <div>
            <Button
              icon={loadingState.includes('loaded') ? undefined : <Spinner size="tiny" />}
              onClick={() => loadSchemas()}
              disabled={loadingState !== 'partially_loaded'}
            >
              {loadingState.includes('loaded') ? 'Load more' : 'Loading'}
            </Button>
          </div>
        )}
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
                  <VegaDeclarativeChart
                    key={selectedChart}
                    chartSchema={{ vegaLiteSpec: { ...parsedSchema, width, height } }}
                  />
                </div>
              ) : (
                <div style={{ color: 'red' }}>Invalid JSON schema. Please check your syntax.</div>
              )}
            </ErrorBoundary>
          </Field>
        </div>
      </div>

      <div style={{ marginTop: '20px' }}>
        <h3>Chart Categories ({schemaCount} Total):</h3>
        <ul style={{ columns: showMore ? 3 : 2 }}>
          {Array.from(SCHEMA_CATEGORIES.entries())
            .sort((a, b) => {
              const categoryOrder = [
                'Basic Charts',
                'Financial',
                'E-Commerce',
                'Marketing',
                'Healthcare',
                'Education',
                'Manufacturing',
                'Climate',
                'Technology',
                'Sports',
                'Other',
              ];
              return categoryOrder.indexOf(a[0]) - categoryOrder.indexOf(b[0]);
            })
            .map(([cat, schemas]) => (
              <li key={cat}>
                <strong>{cat}:</strong> {schemas.length} charts
              </li>
            ))}
        </ul>
        {showMore && loadedSchemas.current.length > 0 && (
          <p>
            <strong>Additional GitHub Examples:</strong> {loadedSchemas.current.length} schemas loaded from{' '}
            fluentui-charting-contrib
          </p>
        )}

        <h3 style={{ marginTop: '20px' }}>Features Supported:</h3>
        <ul>
          <li>
            <strong>Line Charts:</strong> Temporal or quantitative x-axis with multiple series
          </li>
          <li>
            <strong>Area Charts:</strong> Filled line charts for showing trends
          </li>
          <li>
            <strong>Scatter Charts:</strong> Point marks with optional size encoding
          </li>
          <li>
            <strong>Bar Charts:</strong> Horizontal and vertical bar visualizations, stacked and grouped
          </li>
          <li>
            <strong>Donut Charts:</strong> Arc marks with innerRadius for donut effect
          </li>
          <li>
            <strong>Heatmaps:</strong> Rect marks with color scale
          </li>
          <li>
            <strong>Combo Charts:</strong> Layered visualizations (line + bar, line + area, etc.)
          </li>
          <li>
            <strong>Scale Types:</strong> Linear, logarithmic, temporal, ordinal, nominal
          </li>
          <li>
            <strong>Transforms:</strong> Data transformations like fold for reshaping
          </li>
        </ul>
      </div>
    </div>
  );
};
Default.parameters = {
  docs: {
    description: {
      story: `A comprehensive showcase of ${SCHEMA_NAMES.length} Vega-Lite chart schemas covering real-world scenarios across Financial, Healthcare, Education, Manufacturing, Climate, Technology, Sports, and more domains. Demonstrates line, area, scatter, bar, donut, heatmap charts with various axis types, scales, and combo visualizations.`,
    },
  },
};

export default {
  title: 'Charts/VegaDeclarativeChart',
  component: VegaDeclarativeChart,
};
