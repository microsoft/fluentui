import { ComponentProps } from '../temp/commonTypes';
import { ComposeOptions, ComposeStandardStatics } from '../temp/compose';

// tslint:disable-next-line:no-any
export interface ImageProps extends ComponentProps, React.ImgHTMLAttributes<HTMLImageElement> {}

export interface ImageOptions extends ComposeOptions<ImageProps, {}, {}, ComposeStandardStatics> {}
