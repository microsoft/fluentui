import { Button as InternalButton } from '@fluentui/react-northstar';
import Button from '../Button';
import useButtonClasses, { UseButtonClassesInput } from '../hooks/useButtonClasses';
import styled from '../utils/styled';
import { ButtonProps, ButtonStylesProps } from '../Button';
import { withSafeTypeForAs } from '@fluentui/react-northstar';
import inlineStyled from '../utils/inlineStyled';

export interface TeamsButtonProps extends ButtonProps {
  danger?: boolean;
}

export interface TeamsButtonStylesProps extends ButtonStylesProps {
  danger?: boolean;
}

const TeamsButton = styled<TeamsButtonProps, TeamsButtonStylesProps>(Button, 'TeamsButton', {
  tokensMapping: ({ danger }) => ({ danger }),
});

// Alternative APIs

// atomic classes is breaking this :(
// const teamsButtonClasses = useStyles({...})
// <Button classes={classes} />

export const TeamsButtonWithInlineStyles = inlineStyled<TeamsButtonProps, TeamsButtonStylesProps>(InternalButton, {
  displayName: 'TeamsButton',
  // design prop?
  styles: ({ props, variables, theme: { siteVariables } }) => ({
    ...(props.danger && {
      backgroundColor: variables.dangerBackground,
      color: variables.dangerColor,
    }),
  }),
  // important note, we depend only on site variables for theme switching!
  variables: siteVars => ({
    dangerBackground: siteVars.colorScheme.red.background,
    dangerColor: siteVars.colors.white,
  }),
  tokensMapping: ({ danger }) => ({ danger }),
});

interface TertiaryButtonProps extends TeamsButtonProps {
  tertiery?: boolean;
}

interface TertiaryButtonStylesProps extends TeamsButtonStylesProps {
  tertiery?: boolean;
}

export const TertiaryButton = inlineStyled<TertiaryButtonProps, TertiaryButtonStylesProps>(
  TeamsButtonWithInlineStyles,
  {
    displayName: 'TertiaryButton',
    // design prop?
    styles: ({ props, variables, theme: { siteVariables } }) => ({
      ...(props.tertiery && {
        backgroundColor: siteVariables.colorScheme.yellow.background,
        color: siteVariables.colorScheme.grey.foreground,
      }),
    }),
    tokensMapping: ({ tertiery }) => ({ tertiery }),
  },
);

// codemods may be more difficult to write, as we will have different names for components

export function useTeamsButtonClasses<
  P extends TeamsButtonProps = TeamsButtonProps,
  SP extends TeamsButtonStylesProps = TeamsButtonStylesProps
>({ props, displayName, overrides, options }: UseButtonClassesInput<P, SP>) {
  return useButtonClasses<P, SP>({
    props,
    displayName: displayName || 'TeamsButton',
    overrides: {
      ...(overrides || {}),
      // @ts-ignore TODO: figure out what's happening here
      stylingTokens: {
        danger: props.danger,
        ...((overrides && overrides.stylingTokens) || {}),
      },
    },
    options: {
      overrideStyles: options.overrideStyles,
      displayNames: ['Button', 'TeamsButton', ...(options.displayNames || [displayName])],
    },
  });
}

export default withSafeTypeForAs<typeof TeamsButton, TeamsButtonProps, 'button'>(TeamsButton);
