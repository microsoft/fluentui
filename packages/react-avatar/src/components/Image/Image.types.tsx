import { ComponentProps } from '@fluentui/react-utils';
import * as React from 'react';

export interface ImageProps extends ComponentProps, React.ImgHTMLAttributes<HTMLImageElement> {}

export type ImageState = ImageProps;
