import { format as d3Format } from 'd3-format';
import { formatPrefix as d3FormatPrefix } from 'd3-format';

type LocaleStringDataProps = number | string | Date | { [id: string]: number } | undefined;

export function numberFormatter(value: number, limitWidth: boolean = false): string {
  // Use SI format prefix with 2 decimal places without insignificant trailing zeros
  let formatter = d3FormatPrefix('.2~', value);

  if (Math.abs(value) < 1) {
    // Don't use SI notation for small numbers as it is less readable
    formatter = d3Format('.2~g');
  } else if (limitWidth && Math.abs(value) >= 1000) {
    // If width is limited, use SI format prefix with 1 point precision
    formatter = d3FormatPrefix('.1~', value);
  }
  const formattedValue = formatter(value);

  // Replace 'G' with 'B' if the value is greater than 10^9 as it is a more common convention
  if (Math.abs(value) >= 1e9) {
    return formattedValue.replace('G', 'B');
  }

  return formattedValue;
}

export const convertToLocaleString = (data: LocaleStringDataProps, culture?: string): LocaleStringDataProps => {
  if (data === undefined || data === null || Number.isNaN(data)) {
    return data;
  }
  culture = culture || undefined;
  if (typeof data === 'number') {
    if (Math.abs(data) < 10000) {
      return numberFormatter(data);
    }
    return data.toLocaleString(culture);
  } else if (typeof data === 'string' && !isNaN(Number(data))) {
    const num = Number(data);
    if (Math.abs(num) < 10000) {
      return numberFormatter(num);
    }
    return num.toLocaleString(culture);
  } else if (data instanceof Date) {
    return data.toLocaleDateString(culture);
  }
  return data;
};
