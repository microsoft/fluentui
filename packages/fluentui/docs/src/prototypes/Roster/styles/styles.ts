import { colorScheme } from '@fluentui/react-northstar/src/themes/teams/colors';
import { ComponentSlotStyle, Icon, List } from '@fluentui/react-northstar';

export const rosterStyles: ComponentSlotStyle = {
  background: colorScheme.default.background,
  flex: '0 0 20rem',
  maxWidth: '20rem',
  width: '20rem',
  height: '40rem',
  border: `.2rem solid ${colorScheme.default!.background4}`,
  '&::-webkit-scrollbar': {
    width: '0.5rem',
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: colorScheme.default!.border,
    borderRadius: '0.8rem',
  },
  '&::-webkit-scrollbar-track': {
    borderRadius: '0.8rem',
  },
  overflowY: 'auto',
  overflowX: 'hidden',
  willChange: 'scroll-position',
  transform: 'translate3d(0, 0, 0)',
};

export const rosterTreeStyles: ComponentSlotStyle = {
  paddingLeft: '0rem',
  width: '100%',
};

export const rosterSectionStyles: ComponentSlotStyle = {
  marginLeft: '1rem',
};

export const rosterListItemStyles: ComponentSlotStyle = {
  '&:not(:hover):not(:focus)': {
    '& .show-only-on-list-item-hover:not(:focus)': {
      display: 'none',
    },
  },
  borderRadius: '.3rem',
  padding: '0 2rem',
  ':hover': {
    backgroundColor: colorScheme.default!.backgroundActive1,
    color: colorScheme.default!.foregroundFocus1,
    [`& .${Icon.className}`]: {
      color: colorScheme.default!.foregroundFocus1,
    },
    [`& .${List.Item.slotClassNames.contentWrapper}`]: {
      color: colorScheme.default!.foregroundFocus1,
    },
  },
  [`& .${List.Item.slotClassNames.contentWrapper}`]: {
    color: colorScheme.default!.foreground2,
  },
};

export const rosterAvatarStyles = (isSpeaking: boolean): ComponentSlotStyle => {
  return {
    ':before': {
      content: `" "`,
      position: 'absolute',
      top: '-.4rem',
      left: '-.4rem',
      width: 'calc(100% + .8rem)',
      height: 'calc(100% + .8rem)',
      border: `.2rem solid ${colorScheme.brand!.borderFocus1}`,
      borderRadius: '50%',
      opacity: '0',
      transition: 'opacity .25s cubic-bezier(.33,0,.67,1) .45s',
      display: 'block',
      ...(isSpeaking && {
        opacity: '1',
      }),
    },
  };
};

export const rosterTreeItemStyles: ComponentSlotStyle = { marginLeft: '-1rem' };

export const rosterMenuPopupStyles: ComponentSlotStyle = { padding: '0px' };

export const rosterTitleIconStyles: ComponentSlotStyle = {
  color: colorScheme.default!.foregroundActive,
  marginRight: '0.4rem',
};
