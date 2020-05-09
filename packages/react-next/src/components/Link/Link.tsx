import * as React from 'react';
import { getGlobalClassNames, ITheme } from '../../Styling';
import { memoizeFunction, styled } from '../../Utilities';
import { LinkBase } from './Link.base';
import { ILinkProps, ILinkStyleProps, ILinkStyles } from './Link.types';
import * as classes from './Link.scss';
import { css } from 'office-ui-fabric-react/lib/Utilities';

const GlobalClassNames = {
  root: 'ms-Link',
};

const getStaticStylesMemoized = memoizeFunction(
  (theme: ITheme, className?: string, isButton?: boolean, isDisabled?: boolean) => {
    const globalClassNames = getGlobalClassNames(GlobalClassNames, theme);

    const propControlledClasses = [isButton && classes.button, isDisabled && classes.disabled];

    const rootStaticClasses = [isButton && 'is-button', isDisabled && 'is-disabled'];

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
