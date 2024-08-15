import { GriffelStyle } from '@fluentui/react-components';

const getCSSTemplateValue = (template: string | number): string => {
  const templateAsNumber = Number(template);

  return !isNaN(templateAsNumber) && templateAsNumber > 0 ? `repeat(${template}, 1fr)` : String(template);
};

const columns = (template: string): GriffelStyle => ({
  gridTemplateColumns: getCSSTemplateValue(template),
});

const rows = (template: string): GriffelStyle => ({
  gridTemplateRows: getCSSTemplateValue(template),
});

export const grid = {
  columns,
  rows,
};
