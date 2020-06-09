import { TeamsButtonProps, TeamsButtonStylesProps, useTeamsButtonClasses } from './TeamsButton';
import TeamsButton from './TeamsButton';
import styled from '../utils/styled';
import { UseButtonClassesInput } from '../hooks/useButtonClasses';

export interface CallingsButtonProps extends TeamsButtonProps {
  secondary?: boolean;
}

export interface CallingsButtonStylesProps extends TeamsButtonStylesProps {
  secondary?: boolean;
}

const CallingsButton = styled<CallingsButtonProps, CallingsButtonStylesProps>(TeamsButton, 'CallingsButton', {
  tokensMapping: ({ secondary }) => ({ secondary }),
});

export function useCallingsButtonClasses<
  P extends CallingsButtonProps = CallingsButtonProps,
  SP extends CallingsButtonStylesProps = CallingsButtonStylesProps
>({ props, displayName, overrides, options }: UseButtonClassesInput<P, SP>) {
  return useTeamsButtonClasses<P, SP>({
    props,
    displayName: displayName || 'CallingsButton',
    overrides: {
      ...(overrides || {}),
      // @ts-ignore TODO: figure out the issue here
      stylingTokens: {
        secondary: props.secondary,
        ...((overrides && overrides.stylingTokens) || {}),
      },
    },
    options: {
      overrideStyles: (options || {}).overrideStyles,
      displayNames: ['CallingsButton', ...(displayName ? [displayName] : [])],
    },
  });
}

export default CallingsButton;
