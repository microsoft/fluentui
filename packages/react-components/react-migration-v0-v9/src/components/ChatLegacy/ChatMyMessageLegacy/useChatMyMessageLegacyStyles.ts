import { makeStyles, mergeClasses, shorthands, SlotClassNames, tokens } from '@fluentui/react-components';

import {
  statusRedStyles,
  bodyBaseStyles,
  reactionsBaseStyles,
  isOnlyReadableByScreenReaderStyles,
  highlightAnimation,
} from '../styles/shared.mixins';
import { useDecorationClasses } from '../styles/shared.styles';
import type { ChatMyMessageLegacySlots, ChatMyMessageLegacyState } from './ChatMyMessageLegacy.types';

const useChatMyMessageLegacyClasses = makeStyles({
  container: {
    alignSelf: 'end',
    marginLeft: '50px',

    columnGap: '8px',

    display: 'grid',
    gridTemplateAreas: `
      "body    status"
      "actions .     "
    `,
    gridTemplateColumns: 'auto 8px',

    paddingTop: '16px',
  },
  attachedContainer: {
    paddingTop: '2px',
  },

  statusIcon: {
    gridColumnStart: 'status',
    gridColumnEnd: 'status',
    gridRowStart: 'status',
    gridRowEnd: 'status',

    alignSelf: 'end',
    color: tokens.colorBrandForeground1,
  },
  statusIconFailed: statusRedStyles,

  actions: {
    gridColumnStart: 'actions',
    gridColumnEnd: 'actions',
    gridRowStart: 'actions',
    gridRowEnd: 'actions',
    justifySelf: 'end',
  },
});

const useChatMyMessageLegacyBodyClasses = makeStyles({
  base: {
    ...bodyBaseStyles,
    gridColumnStart: 'body',
    gridColumnEnd: 'body',
    gridRowStart: 'body',
    gridRowEnd: 'body',

    flexShrink: 0,

    ...shorthands.borderRadius('4px'),
    ...shorthands.padding('8px', '16px', '16px', '16px'),

    backgroundColor: tokens.colorBrandBackground2,

    justifySelf: 'end',
  },
  hasReactions: {
    marginBottom: '12px',
  },
  hasDecorationIcon: {
    ...shorthands.borderLeft('3px', 'solid', tokens.colorPaletteRedForeground3),
  },

  details: {
    display: 'flex',
    columnGap: '6px',
    alignItems: 'center',
  },

  statusMessage: {
    color: tokens.colorPaletteRedForeground3,
  },

  decorationLabel: {
    fontWeight: 700,
    fontSize: '12px',
    lineHeight: '16px',
    textTransform: 'uppercase',
  },

  reactions: {
    ...reactionsBaseStyles,
    paddingLeft: '20px',
    right: '0px',
    justifyContent: 'end',
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

  nameLineWrapper: {
    display: 'flex',
    columnGap: '12px',

    fontSize: '12px',
    lineHeight: '16px',
    color: tokens.colorNeutralForeground3,

    alignItems: 'center',
  },

  screenReaderContainer: isOnlyReadableByScreenReaderStyles,

  animation: highlightAnimation,
});

export const chatMyMessageLegacyClassNames: SlotClassNames<ChatMyMessageLegacySlots> = {
  root: 'fui-ChatMyMessageLegacy',
  actions: 'fui-ChatMyMessageLegacy__actions',
  author: 'fui-ChatMyMessageLegacy__author',
  body: 'fui-ChatMyMessageLegacy__body',
  decorationIcon: 'fui-ChatMyMessageLegacy__decorationIcon',
  decorationLabel: 'fui-ChatMyMessageLegacy__decorationLabel',
  details: 'fui-ChatMyMessageLegacy__details',
  reactions: 'fui-ChatMyMessageLegacy__reactions',
  statusIcon: 'fui-ChatMyMessageLegacy__statusIcon',
  statusMessage: 'fui-ChatMyMessageLegacy__statusMessage',
  timestamp: 'fui-ChatMyMessageLegacy__timestamp',
};

export const useChatMyMessageLegacyStyles_unstable = (state: ChatMyMessageLegacyState) => {
  const classes = useChatMyMessageLegacyClasses();

  state.root.className = mergeClasses(
    chatMyMessageLegacyClassNames.root,
    classes.container,
    state.attached && state.attached !== 'top' && classes.attachedContainer,
    state.root.className,
  );

  const bodyClasses = useChatMyMessageLegacyBodyClasses();
  if (state.body) {
    state.body.className = mergeClasses(
      chatMyMessageLegacyClassNames.body,
      bodyClasses.base,
      state.reactions && bodyClasses.hasReactions,
      state.decorationIcon && bodyClasses.hasDecorationIcon,
      state.showAnimation && bodyClasses.animation,
      state.body.className,
    );
  }

  if (state.timestamp) {
    state.timestamp.className = mergeClasses(
      chatMyMessageLegacyClassNames.timestamp,
      state.attached && state.attached !== 'top' && bodyClasses.screenReaderContainer,
      state.timestamp.className,
    );
  }

  if (state.details) {
    state.details.className = mergeClasses(
      chatMyMessageLegacyClassNames.details,
      bodyClasses.details,
      state.details.className,
    );
  }

  if (state.statusMessage) {
    state.statusMessage.className = mergeClasses(
      chatMyMessageLegacyClassNames.statusMessage,
      bodyClasses.statusMessage,
      state.statusMessage.className,
    );
  }

  const decorationClasses = useDecorationClasses();
  if (state.decorationLabel) {
    state.decorationLabel.className = mergeClasses(
      chatMyMessageLegacyClassNames.decorationLabel,
      bodyClasses.decorationLabel,
      state.decoration && decorationClasses.default,
      state.decorationLabel.className,
    );
  }

  if (state.decorationIcon) {
    state.decorationIcon.className = mergeClasses(
      chatMyMessageLegacyClassNames.decorationIcon,
      bodyClasses.decorationIcon,
      state.decorationIcon.className,
    );
  }

  if (state.reactions) {
    state.reactions.className = mergeClasses(
      chatMyMessageLegacyClassNames.reactions,
      bodyClasses.reactions,
      state.reactions.className,
    );
  }

  if (state.author) {
    state.author.className = mergeClasses(
      chatMyMessageLegacyClassNames.author,
      bodyClasses.screenReaderContainer,
      state.author.className,
    );
  }

  if (state.statusIcon) {
    state.statusIcon.className = mergeClasses(
      chatMyMessageLegacyClassNames.statusIcon,
      classes.statusIcon,
      (state.status === 'failed' || state.status === 'blocked') && classes.statusIconFailed,
      state.statusIcon.className,
    );
  }

  if (state.actions) {
    state.actions.className = mergeClasses(
      chatMyMessageLegacyClassNames.actions,
      classes.actions,
      state.actions.className,
    );
  }

  state.nameLineClassName = bodyClasses.nameLineWrapper;

  return state;
};
