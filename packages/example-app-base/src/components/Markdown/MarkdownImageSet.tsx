import * as React from 'react';
import { ITheme, IStyle } from 'office-ui-fabric-react/lib/Styling';
import { IImageProps } from 'office-ui-fabric-react/lib/Image';
import { IStyleFunctionOrObject, classNamesFunction, styled, IStyleFunction } from 'office-ui-fabric-react/lib/Utilities';

export interface IMarkdownImageSetStyles {
  root: IStyle;
  imageWrapper: IStyle;
  image: IStyle;
}

export interface IMarkdownImageSetStyleProps {
  theme: ITheme;
}

export interface IMarkdownImageSetProps {
  images: IImageProps[];

  theme?: ITheme;
  styles?: IStyleFunctionOrObject<IMarkdownImageSetStyleProps, IMarkdownImageSetStyles>;
}

const getStyles: IStyleFunction<IMarkdownImageSetStyleProps, IMarkdownImageSetStyles> = props => ({
  root: {
    display: 'flex',
    flexFlow: 'row nowrap',
    margin: '12px -4px'
  },
  imageWrapper: {
    margin: '4px'
  },
  image: {
    maxWidth: '100%',
    boxSizing: 'border-box',
    border: '1px solid ' + props.theme.palette.neutralTertiaryAlt
  }
});

const getClassNames = classNamesFunction<IMarkdownImageSetStyleProps, IMarkdownImageSetStyles>();

const MarkdownImageSetBase: React.StatelessComponent<IMarkdownImageSetProps> = props => {
  const { theme, styles, images } = props;
  const classNames = getClassNames(styles, { theme: theme! });

  return (
    <div className={classNames.root}>
      {images.map((imageProps: IImageProps) => (
        <div key={imageProps.src} className={classNames.imageWrapper}>
          <img className={classNames.image} src={imageProps.src} />
        </div>
      ))}
    </div>
  );
};

export const MarkdownImageSet: React.StatelessComponent<IMarkdownImageSetProps> = styled<
  IMarkdownImageSetProps,
  IMarkdownImageSetStyleProps,
  IMarkdownImageSetStyles
>(MarkdownImageSetBase, getStyles);
