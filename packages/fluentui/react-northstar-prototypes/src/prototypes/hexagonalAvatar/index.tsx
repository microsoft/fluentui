import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Flex, StatusProps, Extendable, Text } from '@fluentui/react-northstar';
import CustomAvatar from './CustomAvatar';
import { AcceptIcon } from '@fluentui/react-icons-northstar';

const statusProps: Extendable<StatusProps> = {
  icon: <AcceptIcon />,
  state: 'success',
  title: 'Available',
};

const HexagonalAvatarPrototype = () => {
  return (
    <div>
      {/* Make sure that this is rendered only once in the application tree. */}
      {ReactDOM.createPortal(
        <svg xmlns="http://w3.org/2000/svg" style={{ width: 0, height: 0, position: 'absolute' }}>
          <defs role="presentation">
            <clipPath id="bot-hexagon-clip-path">
              <path d="M23.93,2H10.07C9,2,8.01,2.57,7.47,3.5l-6.92,12c-0.54,0.93-0.54,2.07,0,3l6.93,12c0.54,0.93,1.53,1.5,2.6,1.5h13.85c1.07,0,2.06-0.57,2.6-1.5l6.93-12c0.54-0.93,0.54-2.07,0-3l-6.93-12C25.99,2.57,25,2,23.93,2z" />
            </clipPath>
          </defs>
        </svg>,
        document.body,
        'bot-hexagon-clip-path',
      )}
      <Flex column padding="padding.medium" gap="gap.medium">
        <div>
          <Text content="Hexagonal Avatar" />
          &emsp;
          <CustomAvatar
            hexagonal
            image="https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/RobertTolbert.jpg"
            status={statusProps}
          />
        </div>
        <div>
          <Text content="Regular Avatar" />
          &emsp;
          <CustomAvatar
            image="https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/RobertTolbert.jpg"
            status={statusProps}
          />
        </div>
      </Flex>
    </div>
  );
};

export default HexagonalAvatarPrototype;
