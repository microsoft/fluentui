import * as React from 'react';
import { Image, ImageFit } from '@fluentui/react';
import { createComponent } from '@fluentui/foundation-legacy';
import { DEFAULT_PERSONA_COIN_SIZE } from '../PersonaCoin.styles';
import type { IPersonaCoinImageProps } from './PersonaCoinImage.types';
import type { IPersonaCoinComponent } from '../PersonaCoin.types';

const personaCoinImageStyles: IPersonaCoinComponent['styles'] = {
  root: {
    overflow: 'hidden',
    borderRadius: '50%',
  },
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
    imageShouldStartVisible,
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

export const PersonaCoinImage: React.FunctionComponent<IPersonaCoinImageProps> = createComponent(PersonaCoinImageView, {
  displayName: 'PersonaCoinImage',
  styles: personaCoinImageStyles,
});
