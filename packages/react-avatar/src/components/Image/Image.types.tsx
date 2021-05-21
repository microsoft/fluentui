import { ComponentProps, ComponentState } from '@fluentui/react-utilities';
import * as React from 'react';

export interface ImageProps extends ComponentProps, React.ImgHTMLAttributes<HTMLImageElement> {}

export interface ImageState extends ComponentState<ImageProps> {
  ref: React.Ref<HTMLElement>;
}
