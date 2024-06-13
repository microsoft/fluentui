import { useRenderer_unstable, makeStylesCore, mergeClasses } from '@fluentui/react-platform-adapter-preview';
import { tokens, typographyStyles } from '@fluentui/react-theme';
import type { FluentProviderSlots, FluentProviderState } from './FluentProvider.types';
import { SlotClassNames } from '@fluentui/react-utilities';

export const fluentProviderClassNames: SlotClassNames<FluentProviderSlots> = {
  root: 'fui-FluentProvider',
};

const useStyles = makeStylesCore({
  root: {
    color: tokens.colorNeutralForeground1,
    backgroundColor: tokens.colorNeutralBackground1,
    textAlign: 'left',
    ...typographyStyles.body1,
  },
});

/** Applies style classnames to slots */
export const useFluentProviderStyles_unstable = (state: FluentProviderState) => {
  const renderer = useRenderer_unstable();
  const styles = useStyles({ dir: state.dir, renderer });

  state.root.className = mergeClasses(
    fluentProviderClassNames.root,
    state.themeClassName,
    styles.root,
    state.root.className,
  );

  return state;
};
