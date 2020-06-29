export type ComponentAPI<T> = {
  name: string;
  fileSuffix: string;
} & T;

export type ComponentAPIs<T = {}> = {
  children: ComponentAPI<T>;
  shorthand: ComponentAPI<T>;
};

export const componentAPIs: ComponentAPIs = {
  children: { name: 'Children API', fileSuffix: '' },
  shorthand: { name: 'Shorthand API', fileSuffix: '.shorthand' },
};
