import * as React from 'react';
import { Image, ImageFit } from 'office-ui-fabric-react';
import { IPersonaCoinImageProps } from './PersonaCoinImage.types';
import { IPersonaCoinComponent } from '../PersonaCoin.types';
import { DEFAULT_PERSONA_COIN_SIZE } from '../PersonaCoin.styles';

const personaCoinImageStyles: Partial<IPersonaCoinComponent['styles']> = {
  root: {
    overflow: 'hidden',
    borderRadius: '50%'
  }
};

export const PersonaCoinImage = (props: IPersonaCoinImageProps): JSX.Element | null => {
  if (!props.src) {
    return null;
  }

  const {
    dimension = DEFAULT_PERSONA_COIN_SIZE,
    src,
    classNames,
    imageAlt = '',
    onPhotoLoadingStateChange,
    imageShouldFadeIn,
    imageShouldStartVisible
  } = props;

  return (
    <Image
      className={classNames.image}
      imageFit={ImageFit.cover}
      src={src}
      width={dimension}
      height={dimension}
      alt={imageAlt}
      shouldFadeIn={imageShouldFadeIn}
      shouldStartVisible={imageShouldStartVisible}
      styles={personaCoinImageStyles}
      onLoadingStateChange={onPhotoLoadingStateChange}
    />
  );
};
