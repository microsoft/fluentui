import * as React from 'react';
import { ImageLoadState } from '@fluentui/react';
import type { IPersonaCoinViewProps, IPersonaCoinComponent } from './PersonaCoin.types';

export const usePersonaCoinState: IPersonaCoinComponent['state'] = props => {
  // TODO: isPictureLoaded was controlled, does it need to be? it's not exposed through component props...
  //       For now use useState.
  const [isPictureLoaded, setIsPictureLoaded] = React.useState(false);

  const { onPhotoLoadingStateChange } = props;

  const _onPhotoLoadingStateChange = React.useCallback(
    (newImageLoadState: ImageLoadState): void => {
      if (onPhotoLoadingStateChange) {
        onPhotoLoadingStateChange(newImageLoadState);
      }

      setIsPictureLoaded(newImageLoadState === ImageLoadState.loaded);
    },
    [onPhotoLoadingStateChange],
  );

  const viewProps: IPersonaCoinViewProps = {
    ...props,
    isPictureLoaded,
    onPhotoLoadingStateChange: _onPhotoLoadingStateChange,
  };

  return viewProps;
};
