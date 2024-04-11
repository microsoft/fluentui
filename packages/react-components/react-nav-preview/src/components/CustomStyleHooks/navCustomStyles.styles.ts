/* eslint-disable @typescript-eslint/naming-convention */
import { makeStyles } from '@griffel/react';
import { CustomStyleHooksContextValue } from '@fluentui/react-shared-contexts/src/CustomStyleHooksContext';
import { tokens } from '@fluentui/react-theme';
import { useNavDrawerBodyStyles } from './useDrawerBodyStyles.styles';
import { useNavDrawerFooterStyles } from './useDrawerFooterStyles.styles';
import { useNavDrawerHeaderStyles } from './useDrawerHeaderStyles.styles';

export const navCustomStyleHooks: CustomStyleHooksContextValue = {
  useDrawerBodyStyles_unstable: useNavDrawerBodyStyles,
  useDrawerFooterStyles_unstable: useNavDrawerFooterStyles,
  useDrawerHeaderStyles_unstable: useNavDrawerHeaderStyles,
};

export const useSharedNavBackgroundStyles = makeStyles({
  base: {
    backgroundColor: tokens.colorNeutralBackground4,
  },
});
