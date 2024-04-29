import * as React from 'react';
import { Avatar, Flex, Text, Animation, MenuButton, FlexItem } from '@fluentui/react-northstar';
import { MoreIcon, MicOffIcon, ParticipantRemoveIcon, MicIcon } from '@fluentui/react-icons-northstar';

const Participant: React.FC<{
  image?: string;
  name: string;
  status: object;
  position: string;
  isTalking?: boolean;
  isMuted?: boolean;
}> = ({ image, name, status, position, isTalking, isMuted }) => {
  const [muted, setMuted] = React.useState(isMuted);
  const [talking, setTalking] = React.useState(isTalking);
  const [openMenu, setOpenMenu] = React.useState(false);

  return (
    <Flex
      fill
      gap="gap.small"
      space="between"
      onContextMenu={e => {
        setOpenMenu(!openMenu);
        e.preventDefault();
      }}
      variables={{ isRelative: true }}
    >
      {talking ? (
        <Animation name="talking">
          <Avatar
            variables={{ isTalking: true }}
            image={`data:image/jpeg;base64,${image}`}
            name={name}
            status={status}
          />
        </Animation>
      ) : (
        <Avatar image={`data:image/jpeg;base64,${image}`} name={name} status={status} />
      )}

      <Flex column>
        <Text weight={(talking && 'bold') || 'regular'} content={name} variables={{ isNameText: true }} />
        <Text variables={{ isRoleText: true }} content={position} />
      </Flex>

      {muted ? (
        <>
          <FlexItem push>
            <MicOffIcon />
          </FlexItem>
          <MenuButton
            open={openMenu}
            onClick={() => setOpenMenu(!openMenu)}
            position="above"
            align="end"
            trigger={<MoreIcon />}
            menu={[
              {
                icon: <MicIcon />,
                content: 'Unmute',
                onClick: () => {
                  setMuted(false);
                  setTalking(isTalking);
                },
              },
              {
                icon: <ParticipantRemoveIcon />,
                content: 'Remove',
              },
            ]}
          />
        </>
      ) : (
        <FlexItem push>
          <MenuButton
            open={openMenu}
            onClick={() => setOpenMenu(!openMenu)}
            position="above"
            align="end"
            trigger={<MoreIcon />}
            menu={[
              {
                icon: <MicOffIcon />,
                content: 'Mute',
                onClick: () => {
                  setTalking(false);
                  setMuted(true);
                },
              },
              { icon: <ParticipantRemoveIcon />, content: 'Remove' },
            ]}
          />
        </FlexItem>
      )}
    </Flex>
  );
};

export default Participant;
