import * as React from 'react';
import { getGlobalClassNames, ITheme } from '@uifabric/styling';
import { css, memoizeFunction, styled } from '@uifabric/utilities';
import { LinkBase } from './LinkBase';
import { ILinkStyleProps, ILinkStyles } from '../Link';
import { ILinkProps } from './Link.types';
import * as classes from './Link.scss';

const GlobalClassNames = {
  root: 'ms-Link',
};

const getStaticStylesMemoized = memoizeFunction(
  (theme: ITheme, className?: string, isButton?: boolean, isDisabled?: boolean) => {
    const globalClassNames = getGlobalClassNames(GlobalClassNames, theme);

    const propControlledClasses = [isButton && classes.button, isDisabled && classes.disabled];

    const rootStaticClasses = [isDisabled && 'is-disabled'];

    return {
      root: css(className, classes.root, globalClassNames.root, ...rootStaticClasses, ...propControlledClasses),
    };
  },
);

const getStaticStyles = (props: ILinkStyleProps): Required<ILinkStyles> => {
  const { className, isButton, isDisabled, theme } = props;

  return getStaticStylesMemoized(theme!, className, isButton, isDisabled);
};

export const Link: React.FunctionComponent<ILinkProps> = styled<ILinkProps, ILinkStyleProps, ILinkStyles>(
  LinkBase,
  getStaticStyles,
  undefined,
  {
    scope: 'Link',
  },
);
