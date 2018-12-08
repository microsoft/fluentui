import { ImageLoadState } from 'office-ui-fabric-react';
import { IPersonaCoinProps } from '../PersonaCoin.types';

export interface IPersonaCoinImageProps {
  src?: string;
  classNames: { image: string };
  dimension?: IPersonaCoinProps['size'];
  imageAlt?: string;
  onPhotoLoadingStateChange?: (loadState: ImageLoadState) => void;
  imageShouldFadeIn?: boolean;
  imageShouldStartVisible?: boolean;
}
