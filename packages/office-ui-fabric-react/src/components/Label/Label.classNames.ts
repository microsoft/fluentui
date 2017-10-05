import { memoizeFunction } from '../../Utilities';
import { ITheme, mergeStyles, FontSizes } from '../../Styling';

export interface ILabelClassNames {
  root: string;
}

export const getLabelClassNames = memoizeFunction((theme: ITheme, className: string | undefined, disabled: boolean, required: boolean): ILabelClassNames => {
  return {
    root: mergeStyles(
      'ms-Label',
      className,
      {
        color: theme.semanticColors.bodyText,
        boxSizing: 'border-box',
        boxShadow: 'none',
        margin: 0,
        display: 'block',
        padding: '5px 0',
        wordWrap: 'break-word',
        overflowWrap: 'break-word',
      },
      disabled && {
        color: theme.semanticColors.disabledText
      },
      required && {
        selectors: {
          '::after': {
            content: `' *'`,
            color: theme.semanticColors.errorText,
            paddingRight: 12
          }
        }
      }
    )
  }
});