import { pxToRem } from '../../../../utils';

export type ImageVariables = {
  width?: string;
  height?: string;
  avatarRadius: string;
  avatarSize: string;
  circularRadius: string;
};

export const imageVariables = (): ImageVariables => ({
  width: undefined,
  height: undefined,
  avatarRadius: pxToRem(9999),
  avatarSize: pxToRem(32),
  circularRadius: pxToRem(9999),
});
