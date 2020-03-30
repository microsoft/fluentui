import * as React from 'react';
import { useActions } from '../actionsContext';
import {
  ShorthandCollection,
  MenuItemProps,
  MenuShorthandKinds,
  Text,
  IconProps,
  Popup,
  Menu,
  Button,
} from '@fluentui/react-northstar';
import { rosterMenuPopupStyles } from '../styles/styles';
import { IRosterItemInternalProps, IRosterItemProps } from '../RosterItemCustom';

export const withRosterActions: (
  C: React.ComponentType<IRosterItemInternalProps>,
) => React.ComponentType<IRosterItemProps> = Component => props => {
  const { toggleMute, togglePromote, toggleSelect } = useActions();

  const [isOpen, setOpen] = React.useState(false);
  const [isContextOpen, setContextOpen] = React.useState(false);

  const { userId, type, isMuted } = props;

  const closeAll = () => {
    setOpen(false);
    setContextOpen(false);
  };

  const items: ShorthandCollection<MenuItemProps, MenuShorthandKinds> = [];
  if (type !== 'suggestions') {
    items.push(
      {
        key: 'mute',
        content: <Text content={isMuted ? 'Unmute' : 'Mute'} />,
        icon: {
          name: isMuted ? 'mic' : 'mic-off',
          outline: true,
          xSpacing: 'after',
        } as IconProps,
        onClick: () => toggleMute(userId, type),
      },
      {
        key: type === 'presenters' ? 'demote' : 'promote',
        content: <Text content={type === 'presenters' ? 'Demote' : 'Promote'} />,
        icon: {
          name: 'presenter',
          outline: true,
          xSpacing: 'after',
        } as IconProps,
        onClick: () => togglePromote(userId, type),
      },
    );
  }

  if (!items.length) {
    return <Component {...props} action={null} />;
  }

  const menu = <Menu vertical items={items} onItemClick={closeAll} />;

  const actionButton = (
    <Popup
      open={isOpen}
      on="click"
      onOpenChange={(_, { open }) => setOpen(open)}
      position="below"
      align="end"
      trigger={
        <Button
          iconOnly
          text
          onClick={e => {
            e.preventDefault();
            e.stopPropagation();
            isOpen ? setOpen(false) : setOpen(true);
          }}
          variables={{
            isCallingSidePanelIconOnlyButton: true,
            isCallingRosterPopupButton: true,
          }}
          className="show-only-on-list-item-hover"
          icon="more"
          data-cid="ts-participant-action-button"
        />
      }
      content={{ content: menu, variables: rosterMenuPopupStyles }}
    />
  );

  return (
    <Popup
      open={isContextOpen}
      on="context"
      onOpenChange={(_, { open }) => setContextOpen(open)}
      trigger={
        <div>
          <Component
            {...props}
            action={actionButton}
            toggleSelect={() => {
              toggleSelect(userId, type);
            }}
          />
        </div>
      }
      tabbableTrigger={false}
      content={{ content: menu, variables: rosterMenuPopupStyles }}
    />
  );
};
