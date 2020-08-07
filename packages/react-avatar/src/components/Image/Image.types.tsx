import { ComponentProps } from '../utils/commonTypes';

// tslint:disable-next-line:no-any
export interface ImageProps extends ComponentProps, React.ImgHTMLAttributes<HTMLImageElement> {}

export type ImageState = ImageProps;
