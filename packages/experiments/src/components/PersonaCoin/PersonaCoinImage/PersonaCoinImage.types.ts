import { ImageLoadState } from '@fluentui/react';
import { ISlotProp } from '../../../Foundation';
import { IPersonaCoinProps } from '../PersonaCoin.types';

export type IPersonaCoinImageSlot = ISlotProp<IPersonaCoinImageProps>;

export interface IPersonaCoinImageProps {
  src?: string;
  className?: string;
  dimension?: IPersonaCoinProps['size'];
  imageAlt?: string;
  onPhotoLoadingStateChange?: (loadState: ImageLoadState) => void;
  imageShouldFadeIn?: boolean;
  imageShouldStartVisible?: boolean;
}
