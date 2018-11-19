import * as React from 'react';
import { IPageImageSetProps, PageHeader, PageImageSet, PageParagraph, PageTag } from '../templates/index';
import { Link } from 'office-ui-fabric-react/lib/Link';
import { Image, IImageProps } from 'office-ui-fabric-react/lib/Image';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import Markdown, { IMarkdownProps } from 'markdown-to-jsx';

function _getImageSetProps(props: React.Props<{}>, markdownProps: IPageMarkdownProps): IPageImageSetProps | undefined {
  let imageSet: IImageProps[] | undefined;
  if (props && props.children) {
    // tslint:disable-next-line:no-any
    React.Children.forEach(props.children, (child: any) => {
      if (child && child.type === 'li') {
        const textContent = child.props.children;
        const { resources } = markdownProps;

        if (typeof textContent === 'string' && textContent.indexOf('image:') === 0 && resources && resources.images) {
          const imageProps = resources.images[textContent.substr(6).trim()];

          if (imageProps) {
            imageSet = imageSet || [];

            imageSet.push(imageProps);
          }
        }
      }
    });
  }

  if (imageSet) {
    return {
      images: imageSet
    };
  }
}

const getMarkdownProps = (markdownProps: IPageMarkdownProps): IMarkdownProps => ({
  options: {
    overrides: {
      h1: {
        component: PageHeader
      },
      h2: {
        component: PageHeader,
        props: { as: 'h2' }
      },
      h3: {
        component: PageHeader,
        props: { as: 'h3' }
      },
      code: {
        component: PageTag
      },
      p: {
        component: (props: React.HTMLAttributes<HTMLElement>) => {
          const { resources } = markdownProps;
          const textContent = props.children;

          if (typeof textContent === 'string' && resources) {
            if (textContent.indexOf('image:') === 0 && resources.images) {
              const imageProps = resources.images[textContent.substr(6).trim()];

              if (imageProps) {
                return <Image {...imageProps} />;
              }
            }
          }
          return <PageParagraph {...props} />;
        }
      },
      a: {
        component: Link
      },
      ul: {
        component: (props: React.HTMLAttributes<HTMLElement>) => {
          let imageSetProps = _getImageSetProps(props, markdownProps);

          if (imageSetProps) {
            return <PageImageSet {...imageSetProps} />;
          }
          return <ul {...props} />;
        }
      },
      img: {
        component: Image
      },
      button: {
        component: DefaultButton
      }
    }
  }
});

export interface IPageMarkdownResources {
  images?: {
    [key: string]: IImageProps;
  };
}

export interface IPageMarkdownProps {
  resources?: IPageMarkdownResources;
  children: string;
}
export const PageMarkdown = (props: IPageMarkdownProps) => <Markdown {...getMarkdownProps(props)}>{props.children}</Markdown>;
