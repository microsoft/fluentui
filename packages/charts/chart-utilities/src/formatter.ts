//for reference, go through this 'https://docs.python.org/release/2.5.1/tut/node16.html'
export function handleFloatingPointPrecisionError(num: number): number {
  const rounded = Math.round(num);
  return Math.abs(num - rounded) < 1e-6 ? rounded : num;
}

type LocaleStringDataProps = number | string | Date | undefined;

export const convertToLocaleString = (data: LocaleStringDataProps, culture?: string): LocaleStringDataProps => {
  if (data === undefined || data === null || data === '' || Number.isNaN(data)) {
    return data;
  }
  culture = culture || undefined;
  if (typeof data === 'number') {
    const toGroup = Math.abs(data) >= 10000;
    return handleFloatingPointPrecisionError(data).toLocaleString(culture, { useGrouping: toGroup });
  } else if (typeof data === 'string' && !window.isNaN(Number(data))) {
    const num = Number(data);
    const toGroup = Math.abs(num) >= 10000;
    return handleFloatingPointPrecisionError(num).toLocaleString(culture, { useGrouping: toGroup });
  } else if (data instanceof Date) {
    return data.toLocaleDateString(culture);
  }
  return data;
};
