import { pxToRem } from '../../../../utils';

import { FlexItemProps } from '../../../../components/Flex/FlexItem';

type SizeValues = Record<FlexItemProps['size'], string>;

export type FlexItemVariables = SizeValues;

export const flexItemVariables = (): FlexItemVariables => ({
  'size.half': '50%',
  'size.quarter': '25%',

  'size.small': pxToRem(150),
  'size.medium': pxToRem(200),
  'size.large': pxToRem(300),
});
