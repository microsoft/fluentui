import * as React from 'react';
import MarkdownToJsx, { MarkdownProps } from 'markdown-to-jsx';
import { DefaultButton, Image, IImageProps, Link, classNamesFunction, IStyleFunction, styled } from 'office-ui-fabric-react';
import * as MDTable from '../MarkdownTable/index';
import { MarkdownCode } from './MarkdownCode';
import { MarkdownHeader } from './MarkdownHeader';
import { MarkdownParagraph } from './MarkdownParagraph';
import { MarkdownImageSet, IMarkdownImageSetProps } from './MarkdownImageSet';
import { IMarkdownProps, IMarkdownSubComponentStyles, IMarkdownStyleProps, IMarkdownStyles } from './Markdown.types';

type PropsWithChildren = { children?: React.ReactNode };

const getStyles: IStyleFunction<IMarkdownStyleProps, IMarkdownStyles> = props => {
  const subComponentStyles: Partial<IMarkdownSubComponentStyles> = {
    image: {
      root: {
        maxWidth: '100%',
        margin: '8px 0'
      }
    }
  };

  return {
    root: 'ms-Markdown',
    subComponentStyles: subComponentStyles as IMarkdownSubComponentStyles
  };
};

const getClassNames = classNamesFunction<IMarkdownStyleProps, IMarkdownStyles>();

const MarkdownBase: React.StatelessComponent<IMarkdownProps> & { displayName?: string } = props => {
  const classNames = getClassNames(getStyles, { theme: props.theme! });
  return (
    <div className={classNames.root}>
      <MarkdownToJsx {...getMarkdownProps(props, classNames.subComponentStyles)}>{props.children}</MarkdownToJsx>
    </div>
  );
};
MarkdownBase.displayName = 'Markdown';

function _getImageSetProps(props: React.Props<PropsWithChildren>, markdownProps: IMarkdownProps): IMarkdownImageSetProps | undefined {
  const images: IImageProps[] = [];
  const { resources } = markdownProps;
  if (props && props.children && resources && resources.images) {
    React.Children.forEach(props.children, (child: React.ReactChild) => {
      if (isReactElement(child) && child.type === 'li') {
        const textContent = child.props.children;

        if (typeof textContent === 'string' && textContent.indexOf('image:') === 0) {
          const imageProps = resources.images![textContent.substr(6).trim()];

          if (imageProps) {
            images.push(imageProps);
          }
        }
      }
    });
  }

  if (images.length) {
    return { images };
  }
}

function isReactElement(child: React.ReactChild): child is React.ReactElement<PropsWithChildren> {
  return !!(child && (child as React.ReactElement<{}>).type);
}

function getMarkdownProps(markdownProps: IMarkdownProps, subComponentStyles: IMarkdownSubComponentStyles): MarkdownProps {
  return {
    options: {
      overrides: {
        h1: {
          component: MarkdownHeader,
          props: { styles: subComponentStyles.header }
        },
        h2: {
          component: MarkdownHeader,
          props: { as: 'h2', styles: subComponentStyles.header }
        },
        h3: {
          component: MarkdownHeader,
          props: { as: 'h3', styles: subComponentStyles.header }
        },
        h4: {
          component: MarkdownHeader,
          props: { as: 'h4', styles: subComponentStyles.header }
        },
        h5: {
          component: MarkdownHeader,
          props: { as: 'h5', styles: subComponentStyles.header }
        },
        h6: {
          component: MarkdownHeader,
          props: { as: 'h6', styles: subComponentStyles.header }
        },
        code: {
          component: MarkdownCode,
          props: { styles: subComponentStyles.code }
        },
        p: {
          component: (props: React.HTMLAttributes<HTMLElement>) => {
            const { resources } = markdownProps;
            const textContent = props.children;

            if (typeof textContent === 'string' && resources && textContent.indexOf('image:') === 0 && resources.images) {
              const imageProps = resources.images[textContent.substr(6).trim()];

              if (imageProps) {
                return <Image styles={subComponentStyles.image} {...imageProps} />;
              }
            }
            return <MarkdownParagraph {...props} styles={subComponentStyles.paragraph} />;
          }
        },
        a: {
          component: Link,
          props: { className: 'ms-mdLink', styles: subComponentStyles.link }
        },
        ul: {
          component: (props: React.HTMLAttributes<HTMLElement>) => {
            const imageSetProps = _getImageSetProps(props, markdownProps);

            if (imageSetProps) {
              return <MarkdownImageSet {...imageSetProps} styles={subComponentStyles.imageSet} />;
            }
            return <ul {...props} />;
          }
        },
        img: {
          component: Image,
          props: { className: 'ms-mdImage', styles: subComponentStyles.image }
        },
        button: {
          component: DefaultButton,
          props: { className: 'ms-mdButton', styles: subComponentStyles.button }
        },
        table: {
          component: MDTable.MarkdownTable,
          props: { styles: subComponentStyles.table }
        },
        thead: {
          component: MDTable.MarkdownTHead,
          props: { styles: subComponentStyles.table }
        },
        tbody: {
          component: MDTable.MarkdownTBody,
          props: { styles: subComponentStyles.table }
        },
        tr: {
          component: MDTable.MarkdownTr,
          props: { styles: subComponentStyles.table }
        },
        th: {
          component: MDTable.MarkdownCell,
          props: { as: 'th', styles: subComponentStyles.table }
        },
        td: {
          component: MDTable.MarkdownCell,
          props: { as: 'td', styles: subComponentStyles.table }
        }
      }
    }
  };
}

export const Markdown: React.StatelessComponent<IMarkdownProps> = styled<IMarkdownProps, IMarkdownStyleProps, IMarkdownStyles>(
  MarkdownBase,
  getStyles,
  undefined,
  { scope: 'Markdown' }
);
