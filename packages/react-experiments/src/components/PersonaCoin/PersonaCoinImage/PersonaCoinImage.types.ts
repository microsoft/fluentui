import { ImageLoadState } from '@fluentui/react';
import type { ISlotProp } from '@fluentui/foundation-legacy';
import type { IPersonaCoinProps } from '../PersonaCoin.types';

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
