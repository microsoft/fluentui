import { IStyleFunction, IRawStyle } from '@fluentui/react';
import { FontSizes, NeutralColors } from '@fluentui/theme';
import { ICodeSnippetStyleProps, ICodeSnippetStyles } from './CodeSnippet';

export const codeFontFamily = 'Monaco, Menlo, Consolas, "Droid Sans Mono", "Inconsolata", "Courier New", monospace';

export const baseCodeStyle: IRawStyle = {
  fontFamily: codeFontFamily,
  fontSize: FontSizes.size14,
  background: NeutralColors.gray10,
  color: NeutralColors.gray160,
};

export const getStyles: IStyleFunction<ICodeSnippetStyleProps, ICodeSnippetStyles> = props => {
  return {
    root: [
      {
        overflowY: 'auto',
        maxHeight: '400px',
        display: 'flex',
        margin: '12px 0',

        selectors: {
          code: {
            fontFamily: codeFontFamily,
            lineHeight: '1.6',
          },
        },
      },
      props.className,
    ],
  };
};
