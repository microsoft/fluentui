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
    <Flex fill gap="gap.small" space="between">
      {talking ? (
        <Animation name="talking">
          <Avatar variables={{ isTalking: true }} image={image} name={name} status={status} />
        </Animation>
      ) : (
        <Avatar image={image} name={name} status={status} />
      )}

      <Flex column>
        {talking ? <Text weight="bold" content={name} /> : <Text content={name} />}
        <Text variables={{ isRoleText: true }} content={role} size="smaller" />
      </Flex>

      {muted ? (
        <FlexItem push>
          <MicOffIcon />
        </FlexItem>
      ) : null}
      {muted ? (
        <MenuButton
          position="above"
          align="end"
          trigger={<MoreIcon />}
          menu={[
            {
              icon: (
                <MicIcon
                  onClick={() => {
                    setMuted(false);
                    setTalking(isTalking);
                  }}
                />
              ),
              content: (
                <Text
                  onClick={() => {
                    setMuted(false);
                    setTalking(isTalking);
                  }}
                  content="Unmute"
                />
              ),
            },
            {
              icon: <ParticipantRemoveIcon />,
              content: 'Remove',
            },
          ]}
        />
      ) : (
        <FlexItem push>
          <MenuButton
            position="above"
            align="end"
            trigger={<MoreIcon />}
            menu={[
              {
                icon: (
                  <MicOffIcon
                    onClick={() => {
                      setTalking(false);
                      setMuted(true);
                    }}
                  />
                ),
                content: (
                  <Text
                    onClick={() => {
                      setTalking(false);
                      setMuted(true);
                    }}
                    content="Mute"
                  />
                ),
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
