import * as React from 'react';
import { BaseComponent, IBaseProps, IClassNames, customizable } from 'office-ui-fabric-react/lib/Utilities';
import { ITheme, IStyle, mergeStyleSets, IStyleSet } from 'office-ui-fabric-react/lib/Styling';
import { IImageProps } from 'office-ui-fabric-react/lib/Image';

export interface IPageImageSetStyles {
  root: IStyle;
  imageWrapper: IStyle;
  image: IStyle;
}

export interface IPageImageSetStyleProps {
  theme: ITheme;
}

export interface IPageImageSetProps extends React.Props<PageImageSet>, IBaseProps {
  theme?: ITheme;
  getStyles?: (props: IPageImageSetStyleProps) => IPageImageSetStyles;

  images: IImageProps[];
}

const getDefaultStyles = (props: IPageImageSetStyleProps): IStyleSet<IPageImageSetStyles> => ({
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

@customizable('PageImageSet', ['theme', 'styles'])
export class PageImageSet extends BaseComponent<IPageImageSetProps, {}> {
  public render(): JSX.Element {
    const { theme, getStyles, images } = this.props;
    const styleProps: IPageImageSetStyleProps = { theme: theme! };
    const classNames = getStyles
      ? mergeStyleSets(getDefaultStyles(styleProps), getStyles(styleProps))
      : mergeStyleSets(getDefaultStyles(styleProps));

    return (
      <div className={classNames.root}>
        {images.map((imageProps: IImageProps) => (
          <div key={imageProps.src} className={classNames.imageWrapper}>
            <img className={classNames.image} src={imageProps.src} />
          </div>
        ))}
      </div>
    );
  }
}
