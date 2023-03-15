import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import type { ChatMessageLegacySlots, ChatMessageLegacyState } from './ChatMessageLegacy.types';
import type { SlotClassNames } from '@fluentui/react-utilities';
import { tokens } from '@fluentui/react-theme';
import {
  bodyBaseStyles,
  reactionsBaseStyles,
  isOnlyReadableByScreenReaderStyles,
  highlightAnimation,
} from '../styles/shared.mixins';
import { useDecorationClasses } from '../styles/shared.styles';

export const chatMessageLegacyClassNames: SlotClassNames<ChatMessageLegacySlots> = {
  root: 'fui-ChatMessageLegacy',
  author: 'fui-ChatMessageLegacy__author',
  avatar: 'fui-ChatMessageLegacy__avatar',
  body: 'fui-ChatMessageLegacy__body',
  decorationIcon: 'fui-ChatMessageLegacy__decorationIcon',
  decorationLabel: 'fui-ChatMessageLegacy__decorationLabel',
  details: 'fui-ChatMessageLegacy__details',
  reactions: 'fui-ChatMessageLegacy__reactions',
  timestamp: 'fui-ChatMessageLegacy__timestamp',
};

/**
 * Styles for the root slot
 */
export const useChatMessageLegacyClasses = makeStyles({
  container: {
    display: 'flex',
    columnGap: '8px',
    paddingTop: '16px',
  },
  attachedContainer: {
    paddingTop: '2px',
  },
  avatarLessContainer: {
    marginLeft: '40px',
  },
  avatar: {
    minWidth: '32px',
  },
});

export const useChatMessageLegacyBodyClasses = makeStyles({
  base: {
    ...bodyBaseStyles,

    ...shorthands.borderRadius('4px'),
    ...shorthands.padding('8px', '16px', '16px', '16px'),
    maxWidth: 'calc(100% - 100px)',

    backgroundColor: tokens.colorNeutralBackground3,
  },
  hasReactions: {
    marginBottom: '12px',
  },
  hasDecorationIcon: {
    ...shorthands.borderLeft('3px', 'solid', tokens.colorPaletteRedForeground3),
  },

  nameLineWrapper: {
    display: 'flex',
    columnGap: '12px',

    fontSize: '12px',
    lineHeight: '16px',
    color: tokens.colorNeutralForeground3,

    alignItems: 'center',
  },

  details: {
    display: 'flex',
    columnGap: '6px',
    alignItems: 'center',
  },

  decorationLabel: {
    fontWeight: 700,
    fontSize: '12px',
    lineHeight: '16px',
    textTransform: 'uppercase',
  },

  reactions: {
    ...reactionsBaseStyles,
    paddingRight: '20px',
  },

  decorationIcon: {
    color: 'white',
    backgroundColor: tokens.colorPaletteRedForeground3,
    height: '24px',
    width: '24px',
    ...shorthands.borderRadius('50%'),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

    fontSize: '20px',

    transform: 'translateX(50%)',
    position: 'absolute',
    top: '4px',
    right: '0px',
  },

  screenReaderContainer: isOnlyReadableByScreenReaderStyles,

  animation: highlightAnimation,
});

/**
 * Apply styling to the ChatMessageLegacy slots based on the state
 */
export const useChatMessageLegacyStyles_unstable = (state: ChatMessageLegacyState) => {
  const classes = useChatMessageLegacyClasses();
  state.root.className = mergeClasses(
    chatMessageLegacyClassNames.root,
    classes.container,
    state.attached && state.attached !== 'top' && classes.attachedContainer,
    !state.avatar && classes.avatarLessContainer,
    state.root.className,
  );

  if (state.avatar) {
    state.avatar.className = mergeClasses(chatMessageLegacyClassNames.avatar, classes.avatar, state.avatar.className);
  }

  const bodyClasses = useChatMessageLegacyBodyClasses();
  if (state.body) {
    state.body.className = mergeClasses(
      chatMessageLegacyClassNames.body,
      bodyClasses.base,
      state.reactions && bodyClasses.hasReactions,
      state.decorationIcon && bodyClasses.hasDecorationIcon,
      state.showAnimation && bodyClasses.animation,
      state.body.className,
    );
  }

  if (state.author) {
    state.author.className = mergeClasses(
      chatMessageLegacyClassNames.author,
      state.attached && state.attached !== 'top' && bodyClasses.screenReaderContainer,
      state.author.className,
    );
  }

  if (state.timestamp) {
    state.timestamp.className = mergeClasses(
      chatMessageLegacyClassNames.timestamp,
      state.attached && state.attached !== 'top' && bodyClasses.screenReaderContainer,
      state.timestamp.className,
    );
  }

  if (state.details) {
    state.details.className = mergeClasses(
      chatMessageLegacyClassNames.details,
      bodyClasses.details,
      state.details.className,
    );
  }

  const decorationClasses = useDecorationClasses();

  if (state.decorationLabel) {
    state.decorationLabel.className = mergeClasses(
      chatMessageLegacyClassNames.decorationLabel,
      bodyClasses.decorationLabel,
      state.decoration && decorationClasses.default,
      state.decoration === 'mention' && decorationClasses.mention,
      state.decorationLabel.className,
    );
  }

  if (state.decorationIcon) {
    state.decorationIcon.className = mergeClasses(
      chatMessageLegacyClassNames.decorationIcon,
      bodyClasses.decorationIcon,
      state.decorationIcon.className,
    );
  }

  if (state.reactions) {
    state.reactions.className = mergeClasses(
      chatMessageLegacyClassNames.reactions,
      bodyClasses.reactions,
      state.reactions.className,
    );
  }

  state.nameLineClassName = bodyClasses.nameLineWrapper;

  return state;
};
