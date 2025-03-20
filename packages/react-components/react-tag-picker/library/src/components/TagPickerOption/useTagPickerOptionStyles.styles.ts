import { makeResetStyles, makeStyles, mergeClasses } from '@griffel/react';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { TagPickerOptionSlots, TagPickerOptionState } from './TagPickerOption.types';
import { useOptionStyles_unstable } from '@fluentui/react-combobox';
import { typographyStyles } from '@fluentui/react-theme';

export const tagPickerOptionClassNames: SlotClassNames<TagPickerOptionSlots> = {
  root: 'fui-TagPickerOption',
  media: 'fui-TagPickerOption__media',
  secondaryContent: 'fui-TagPickerOption__secondaryContent',
};

const useRootBaseStyle = makeResetStyles({
  display: 'flex',
  alignItems: 'center',
});

const useRootStyles = makeStyles({
  secondaryContent: {
    display: 'grid',
    gridTemplateColumns: 'auto 1fr',
  },
});

const useSecondaryContentBaseStyle = makeResetStyles({
  gridColumnStart: 2,
  gridRowStart: 2,
  ...typographyStyles.caption1,
});

const useMediaBaseStyle = makeResetStyles({
  gridRowStart: 'span 2',
});

/**
 * Apply styling to the TagPickerOption slots based on the state
 */
export const useTagPickerOptionStyles_unstable = (state: TagPickerOptionState): TagPickerOptionState => {
  'use no memo';

  const rootBaseStyle = useRootBaseStyle();
  const rootStyles = useRootStyles();
  const secondaryContentBaseStyle = useSecondaryContentBaseStyle();
  const mediaBaseStyle = useMediaBaseStyle();

  state.root.className = mergeClasses(
    tagPickerOptionClassNames.root,
    rootBaseStyle,
    state.secondaryContent && rootStyles.secondaryContent,
    state.root.className,
  );
  useOptionStyles_unstable({
    ...state,
    active: false,
    disabled: false,
    focusVisible: false,
    checkIcon: undefined,
    selected: false,
  });
  if (state.media) {
    state.media.className = mergeClasses(tagPickerOptionClassNames.media, mediaBaseStyle, state.media.className);
  }

  if (state.secondaryContent) {
    state.secondaryContent.className = mergeClasses(
      tagPickerOptionClassNames.secondaryContent,
      secondaryContentBaseStyle,
      state.secondaryContent.className,
    );
  }

  return state;
};
