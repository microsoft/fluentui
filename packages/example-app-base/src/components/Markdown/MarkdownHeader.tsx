import * as React from 'react';
import { classNamesFunction, IStyleFunctionOrObject, styled, IStyleFunction } from 'office-ui-fabric-react/lib/Utilities';
import { ITheme, IStyle } from 'office-ui-fabric-react/lib/Styling';
import { FontSizes } from '@uifabric/fluent-theme';

/**
 * The getStyles props contract.
 */
export interface IMarkdownHeaderStyleProps {
  theme: ITheme;
  as: string;
}

/**
 * The styles produced by getStyles.
 */
export interface IMarkdownHeaderStyles {
  root: IStyle;
}

/**
 * The component props.
 */
export interface IMarkdownHeaderProps {
  as?: keyof React.ReactHTML;
  children?: React.ReactNode;
  id?: string;

  theme?: ITheme;
  styles?: IStyleFunctionOrObject<IMarkdownHeaderStyleProps, IMarkdownHeaderStyles>;
}

const getStyles: IStyleFunction<IMarkdownHeaderStyleProps, IMarkdownHeaderStyles> = props => {
  return {
    root: [
      {
        fontSize: FontSizes.size16,
        fontWeight: 600,
        padding: 0,
        margin: 0,
        marginTop: '32px',
        marginBottom: '12px',

        selectors: {
          '&:first-of-type': {
            marginTop: 0
          }
        }
      },

      props.as === 'h1' && [
        {
          fontSize: FontSizes.size32,
          marginBottom: '28px'
        }
      ],

      props.as === 'h2' && [
        {
          fontSize: FontSizes.size24,
          marginBottom: '20px'
        }
      ],

      props.as === 'h3' && [
        {
          fontSize: FontSizes.size20,
          marginBottom: '8px'
        }
      ]
    ]
  };
};

const getClassNames = classNamesFunction<IMarkdownHeaderStyleProps, IMarkdownHeaderStyles>();

const MarkdownHeaderBase: React.StatelessComponent<IMarkdownHeaderProps> = props => {
  const { as: RootType = 'h1', theme, children, id, styles } = props;

  const classNames = getClassNames(styles, { theme: theme!, as: RootType });
  return (
    <RootType className={classNames.root} id={id}>
      {children}
    </RootType>
  );
};

export const MarkdownHeader: React.StatelessComponent<IMarkdownHeaderProps> = styled<
  IMarkdownHeaderProps,
  IMarkdownHeaderStyleProps,
  IMarkdownHeaderStyles
>(MarkdownHeaderBase, getStyles);
