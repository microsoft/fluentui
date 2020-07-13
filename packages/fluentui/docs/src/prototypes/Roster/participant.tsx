import * as React from 'react';
import { Avatar, Flex, Text, Animation, MenuButton, FlexItem } from '@fluentui/react-northstar';
import { MoreIcon, MicOffIcon, ParticipantRemoveIcon, MicIcon } from '@fluentui/react-icons-northstar';

const Participant: React.FC<{
  image?: string;
  name: string;
  status: object;
  role: string;
  isTalking?: boolean;
  isMuted?: boolean;
}> = ({ image, name, status, role, isTalking, isMuted }) => {
  const [muted, setMuted] = React.useState(isMuted);
  const [talking, setTalking] = React.useState(isTalking);
  return (
    <Flex fill gap="gap.small" space="between" variables={{ isRelative: true }}>
      {talking ? (
        <Animation name="talking">
          <Avatar variables={{ isTalking: true }} image={image} name={name} status={status} />
        </Animation>
      ) : (
        <Avatar image={image} name={name} status={status} />
      )}

      <Flex column>
        <Text weight={talking && 'bold'} content={name} variables={{ isNameText: true }} />
        <Text variables={{ isRoleText: true }} content={role} />
      </Flex>

      {muted ? (
        <>
          <FlexItem push>
            <MicOffIcon />
          </FlexItem>
          <MenuButton
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
