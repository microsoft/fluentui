import { ICSSInJSStyle } from '@fluentui/styles';

export function isStyleObject(val: any): val is ICSSInJSStyle {
  return val != null && typeof val === 'object' && Array.isArray(val) === false;
}
