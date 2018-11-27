import * as React from 'react';
import { Image, ImageFit, ImageLoadState } from 'office-ui-fabric-react';

import { IPersonaCoinComponent } from './PersonaCoin.types';

export const PersonaCoinView: IPersonaCoinComponent['view'] = props => {
  return (
    <div className={props.classNames.root}>
      {props.initials}
      {props.imageUrl ? (
        <PersonaCoinImage
          classNames={props.classNames}
          src={props.imageUrl}
          dimension={props.size}
          onPhotoLoadingStateChange={props.onPhotoLoadingStateChange}
        />
      ) : null}
    </div>
  );
};

interface IPersonaCoinImageProps {
  src: string;
  classNames: { image: string };
  dimension: 56 | 72 | 100;
  imageAlt?: string;
  onPhotoLoadingStateChange?: (loadState: ImageLoadState) => void;
}

class PersonaCoinImage extends React.Component<IPersonaCoinImageProps> {
  public render(): JSX.Element {
    const { dimension, src, classNames, imageAlt, onPhotoLoadingStateChange } = this.props;

    return (
      <Image
        className={classNames.image}
        imageFit={ImageFit.cover}
        src={src}
        width={dimension}
        height={dimension}
        alt={imageAlt}
        shouldFadeIn={true}
        shouldStartVisible={false}
        styles={{
          root: {
            overflow: 'hidden',
            borderRadius: '50%'
          }
        }}
        onLoadingStateChange={onPhotoLoadingStateChange}
      />
    );
  }
}
