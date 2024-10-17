import type { ValueConverter } from '@microsoft/fast-element';

export const getDataConverter = (chartType: string): ValueConverter => {
  let validate: (obj: any) => void;
  switch (chartType) {
    case 'donut-chart':
    default:
      validate = validateChartProps;
  }

  return {
    toView(value: any): string {
      return JSON.stringify(value);
    },
    fromView(value: string): any {
      const obj = JSON.parse(value);
      validate(obj);
      return obj;
    },
  };
};

type Dict = { [key: string]: any };

const validateChartProps = (obj: any) => {
  if (typeof obj !== 'object' || Array.isArray(obj) || obj === null) {
    throw TypeError('Invalid data: Expected an object.');
  }

  if ((obj as Dict).hasOwnProperty('chartData')) {
    if (!Array.isArray(obj.chartData)) {
      throw TypeError('Invalid data.chartData: Expected an array.');
    }

    (obj.chartData as any[]).forEach((item, idx) => {
      if (typeof item !== 'object' || Array.isArray(item) || item === null) {
        throw TypeError(`Invalid data.chartData[${idx}]: Expected an object.`);
      }

      if ((item as Dict).hasOwnProperty('legend') && typeof item.legend !== 'string') {
        throw TypeError(`Invalid data.chartData[${idx}].legend: Expected a string.`);
      }

      if ((item as Dict).hasOwnProperty('data') && typeof item.data !== 'number') {
        throw TypeError(`Invalid data.chartData[${idx}].data: Expected a number.`);
      }
    });
  }
};
