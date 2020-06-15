import { ComposePreparedOptions } from './types';
export const defaultComposeOptions: Required<ComposePreparedOptions> = {
  className: process.env.NODE_ENV === 'production' ? '' : 'no-classname-🙉',
  classes: [],
  displayName: '',
  displayNames: [],
  mapPropsToStylesPropsChain: [],
  render: () => null,
  handledProps: [] as never[],
  overrideStyles: false,
  slots: { __self: () => null },
  slotProps: [],
  state: props => props,
  resolveSlotProps: () => ({}),
  shorthandConfig: {},
};
