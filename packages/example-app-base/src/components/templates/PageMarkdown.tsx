import * as React from 'react';
import Markdown, { IMarkdownProps } from 'markdown-to-jsx';
import { DefaultButton, Image, IImageProps, Link } from 'office-ui-fabric-react';
import * as MDTable from '../MarkdownTable/index';
import { IPageImageSetProps, PageHeader, PageImageSet, PageParagraph, PageTag } from '../templates/index';

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
        component: Link,
        props: { className: 'ms-mdLink' }
      },
      ul: {
        component: (props: React.HTMLAttributes<HTMLElement>) => {
          const imageSetProps = _getImageSetProps(props, markdownProps);

          if (imageSetProps) {
            return <PageImageSet {...imageSetProps} />;
          }
          return <ul {...props} />;
        }
      },
      img: {
        component: Image,
        props: { className: 'ms-mdImage' }
      },
      button: {
        component: DefaultButton,
        props: { className: 'ms-mdButton' }
      },
      table: {
        component: MDTable.MarkdownTable
      },
      thead: {
        component: MDTable.MarkdownTHead
      },
      tbody: {
        component: MDTable.MarkdownTBody
      },
      tr: {
        component: MDTable.MarkdownTr
      },
      th: {
        component: MDTable.MarkdownCell,
        props: { as: 'th' }
      },
      td: {
        component: MDTable.MarkdownCell,
        props: { as: 'td' }
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

export class PageMarkdown extends React.Component<IPageMarkdownProps, {}> {
  public static displayName = 'PageMarkdown';

  public render(): JSX.Element {
    return (
      <div className="ms-PageMarkdown">
        <Markdown {...getMarkdownProps(this.props)}>{this.props.children}</Markdown>
      </div>
    );
  }
}
