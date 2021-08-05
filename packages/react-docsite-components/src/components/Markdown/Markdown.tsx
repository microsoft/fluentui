import * as React from 'react';
import MarkdownToJsx, { MarkdownProps as MarkdownToJsxProps } from 'markdown-to-jsx';
import { Image, IImageStyles, classNamesFunction, IStyleFunction, styled } from '@fluentui/react';
import { DefaultButton } from '@fluentui/react/lib/Button';
import { DisplayToggle } from '../DisplayToggle/index';
import * as MDTable from '../MarkdownTable/index';
import { MarkdownCode } from './MarkdownCode';
import { MarkdownHeader } from './MarkdownHeader';
import { MarkdownParagraph } from './MarkdownParagraph';
import { IMarkdownProps, IMarkdownSubComponentStyles, IMarkdownStyleProps, IMarkdownStyles } from './Markdown.types';
import { MarkdownLink } from './MarkdownLink';
import { MarkdownPre } from './MarkdownPre';

const getStyles: IStyleFunction<IMarkdownStyleProps, IMarkdownStyles> = props => {
  const imageStyles: Partial<IImageStyles> = {
    root: {
      maxWidth: '100%',
      margin: '8px 0',
    },
  };

  return {
    root: 'ms-Markdown',
    subComponentStyles: { image: imageStyles } as IMarkdownSubComponentStyles,
  };
};

const getClassNames = classNamesFunction<IMarkdownStyleProps, IMarkdownStyles>();

const MarkdownBase: React.FunctionComponent<IMarkdownProps> = props => {
  const { styles, theme, children } = props;
  const classNames = getClassNames(styles, { theme: theme! });

  return (
    <div className={classNames.root}>
      <MarkdownToJsx {...getMarkdownProps(classNames.subComponentStyles, props)}>{children}</MarkdownToJsx>
    </div>
  );
};
MarkdownBase.displayName = 'Markdown';

function getMarkdownProps(subComponentStyles: IMarkdownSubComponentStyles, props: IMarkdownProps): MarkdownToJsxProps {
  return {
    options: {
      overrides: {
        h1: {
          component: MarkdownHeader,
          props: { styles: subComponentStyles.header },
        },
        h2: {
          component: MarkdownHeader,
          props: { as: 'h2', styles: subComponentStyles.header },
        },
        h3: {
          component: MarkdownHeader,
          props: { as: 'h3', styles: subComponentStyles.header },
        },
        h4: {
          component: MarkdownHeader,
          props: { as: 'h4', styles: subComponentStyles.header },
        },
        h5: {
          component: MarkdownHeader,
          props: { as: 'h5', styles: subComponentStyles.header },
        },
        h6: {
          component: MarkdownHeader,
          props: { as: 'h6', styles: subComponentStyles.header },
        },
        code: {
          component: MarkdownCode,
          props: { styles: subComponentStyles.code },
        },
        p: {
          component: MarkdownParagraph,
          props: { styles: subComponentStyles.paragraph },
        },
        pre: {
          component: MarkdownPre,
          props: { enableRenderHtmlBlock: props.enableRenderHtmlBlock },
        },
        a: {
          component: MarkdownLink,
          props: { className: 'ms-mdLink', styles: subComponentStyles.link },
        },
        img: {
          component: Image,
          props: { className: 'ms-mdImage', styles: subComponentStyles.image },
        },
        button: {
          component: DefaultButton,
          props: { className: 'ms-mdButton', styles: subComponentStyles.button },
        },
        table: {
          component: MDTable.MarkdownTable,
          props: { styles: subComponentStyles.table },
        },
        thead: {
          component: MDTable.MarkdownTHead,
          props: { styles: subComponentStyles.table },
        },
        tbody: {
          component: MDTable.MarkdownTBody,
          props: { styles: subComponentStyles.table },
        },
        tr: {
          component: MDTable.MarkdownTr,
          props: { styles: subComponentStyles.table },
        },
        th: {
          component: MDTable.MarkdownCell,
          props: { as: 'th', styles: subComponentStyles.table },
        },
        td: {
          component: MDTable.MarkdownCell,
          props: { as: 'td', styles: subComponentStyles.table },
        },
        DisplayToggle: {
          component: DisplayToggle,
        },
        ...props.overrides,
      },
    },
  };
}

export const Markdown: React.FunctionComponent<IMarkdownProps> = styled<
  IMarkdownProps,
  IMarkdownStyleProps,
  IMarkdownStyles
>(MarkdownBase, getStyles, undefined, { scope: 'Markdown' });
