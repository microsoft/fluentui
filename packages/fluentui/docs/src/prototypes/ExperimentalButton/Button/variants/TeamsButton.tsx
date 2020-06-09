import Button from '../Button';
import useButtonClasses, { UseButtonClassesInput } from '../hooks/useButtonClasses';
import styled from '../utils/styled';
import { ButtonProps, ButtonStylesProps } from '../Button';
import { withSafeTypeForAs } from '@fluentui/react-northstar';

export interface TeamsButtonProps extends ButtonProps {
  danger?: boolean;
}

export interface TeamsButtonStylesProps extends ButtonStylesProps {
  danger?: boolean;
}

const TeamsButton = styled<TeamsButtonProps, TeamsButtonStylesProps>(Button, 'TeamsButton', {
  tokensMapping: ({ danger }) => ({ danger }),
});

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
