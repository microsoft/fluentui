import { Props, ShorthandValue } from '../types';

export const getKindProp = (item: ShorthandValue<Props>, defaultValue: string) => {
  return typeof item === 'object' && (item as any).kind ? (item as any).kind : defaultValue;
};
