import { pxToRem } from '../../../../utils';
import { FlexProps } from '../../../../components/Flex/Flex';

type GapValues = Record<FlexProps['gap'], string>;
type PaddingValues = Record<FlexProps['padding'], string>;

export type FlexVariables = GapValues & PaddingValues;

export const flexVariables = (): FlexVariables => ({
  // GAP VALUES
  'gap.smaller': pxToRem(8),
  'gap.small': pxToRem(10),
  'gap.medium': pxToRem(15),
  'gap.large': pxToRem(30),

  // PADDING VALUES
  'padding.medium': pxToRem(10),
});
