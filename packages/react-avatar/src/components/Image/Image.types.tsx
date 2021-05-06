import { ComponentProps, ComponentState } from '@fluentui/react-utilities';
import * as React from 'react';

export interface ImageProps extends ComponentProps, React.ImgHTMLAttributes<HTMLImageElement> {}

export type ImageState = ComponentState<React.Ref<HTMLElement>, ImageProps>;
