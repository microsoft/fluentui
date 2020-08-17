import * as React from 'react';
import { useImage } from './useImage';
import { ImageProps } from './Image.types';

export const Image = React.forwardRef((props: ImageProps, ref: React.Ref<HTMLElement>) => {
  const { render, state } = useImage(props, ref);

  return render(state);
});
