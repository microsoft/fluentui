import { ComponentProps } from '../utils/commonTypes';
import { ComposeOptions, ComposeStandardStatics } from '../utils/compose';

// tslint:disable-next-line:no-any
export interface ImageProps extends ComponentProps, React.ImgHTMLAttributes<HTMLImageElement> {}

export interface ImageOptions extends ComposeOptions<ImageProps, {}, {}, ComposeStandardStatics> {}
