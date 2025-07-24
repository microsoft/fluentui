import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import { teachingPopoverFooterClassNames, type TeachingPopoverFooterState } from '@fluentui/react-teaching-popover';
import { getSlotClassNameProp_unstable } from '@fluentui/react-utilities';
import * as semanticTokens from '@fluentui/semantic-tokens';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    gap: semanticTokens.gapBetweenCtrlDefault,
    paddingTop: semanticTokens.paddingCtrlHorizontalDefault,
  },
  rootVertical: {
    flexDirection: 'column',
  },
  rootHorizontal: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  buttonRootVertical: {
    width: 'auto',
    borderRadius: semanticTokens.cornerCtrlRest,
  },
  buttonRootHorizontal: {
    minWidth: '96px',
    borderRadius: semanticTokens.cornerCtrlRest,
  },
  brandSecondary: {
    ...shorthands.borderColor(semanticTokens.foregroundCtrlOnBrandRest),
  },
  brandPrimary: {
    color: semanticTokens.foregroundContentBrandPrimary,
    backgroundColor: semanticTokens.foregroundCtrlOnBrandRest,
    ':hover': {
      color: semanticTokens.foregroundCtrlActiveBrandHover,
      backgroundColor: semanticTokens.foregroundCtrlOnBrandHover,
    },
    ':hover:active': {
      color: semanticTokens.foregroundCtrlActiveBrandPressed,
      backgroundColor: semanticTokens.foregroundCtrlOnBrandPressed,
    },
  },
});

/** Applies style classnames to slots */
export const useSemanticTeachingPopoverFooterStyles = (_state: unknown) => {
  'use no memo';

  const state = _state as TeachingPopoverFooterState;

  const styles = useStyles();
  const { appearance, footerLayout } = state;

  state.root.className = mergeClasses(
    state.root.className,
    teachingPopoverFooterClassNames.root,
    styles.root,
    footerLayout === 'horizontal' ? styles.rootHorizontal : styles.rootVertical,
    getSlotClassNameProp_unstable(state.root),
  );
  if (state.secondary) {
    state.secondary.className = mergeClasses(
      state.secondary.className,
      teachingPopoverFooterClassNames.secondary,
      footerLayout === 'horizontal' ? styles.buttonRootHorizontal : styles.buttonRootVertical,
      appearance === 'brand' ? styles.brandSecondary : undefined,
      getSlotClassNameProp_unstable(state.secondary),
    );
  }
  state.primary.className = mergeClasses(
    state.primary.className,
    teachingPopoverFooterClassNames.primary,
    footerLayout === 'horizontal' ? styles.buttonRootHorizontal : styles.buttonRootVertical,
    appearance === 'brand' ? styles.brandPrimary : undefined,
    getSlotClassNameProp_unstable(state.primary),
  );

  return state;
};
