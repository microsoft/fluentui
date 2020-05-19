import { memoizeFunction, css, useClasses } from '../../Utilities';
import { getGlobalClassNames, ITheme } from '../../Styling';
import { ILinkProps, ILinkStyleProps, ILinkStyles } from '../../Link';
import * as classes from './Link.scss';

export function useLinkClasses(props: ILinkProps): { [key in keyof ILinkStyles]: string } {
  return useClasses<ILinkProps['styles'], ILinkStyleProps, ILinkStyles>({
    customizationScopeName: 'Links',
    useStaticStyles: true,
    styles: props.styles,
    styleProps: {
      className: props.className,
      isButton: !props.href,
      isDisabled: props.disabled,
    },
    baseStyles: getStaticStyles,
  });
}

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
