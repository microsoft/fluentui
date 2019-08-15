import * as React from 'react';
import { Image, ImageFit } from 'office-ui-fabric-react';
import { createComponent } from '../../../Foundation';
import { IPersonaCoinImageProps } from './PersonaCoinImage.types';
import { IPersonaCoinComponent } from '../PersonaCoin.types';
import { DEFAULT_PERSONA_COIN_SIZE } from '../PersonaCoin.styles';

const personaCoinImageStyles: IPersonaCoinComponent['styles'] = {
  root: {
    overflow: 'hidden',
    borderRadius: '50%'
  }
};

const PersonaCoinImageView = (props: IPersonaCoinImageProps): JSX.Element | null => {
  if (!props.src) {
    return null;
  }

  const {
    dimension = DEFAULT_PERSONA_COIN_SIZE,
    src,
    imageAlt = '',
    onPhotoLoadingStateChange,
    imageShouldFadeIn,
    imageShouldStartVisible
  } = props;

  return (
    <Image
      imageFit={ImageFit.cover}
      src={src}
      width={dimension}
      height={dimension}
      alt={imageAlt}
      shouldFadeIn={imageShouldFadeIn}
      shouldStartVisible={imageShouldStartVisible}
      onLoadingStateChange={onPhotoLoadingStateChange}
      className={props.className}
    />
  );
};

export const PersonaCoinImage: React.StatelessComponent<IPersonaCoinImageProps> = createComponent(PersonaCoinImageView, {
  displayName: 'PersonaCoinImage',
  styles: personaCoinImageStyles
});
