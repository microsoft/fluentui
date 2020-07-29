import * as React from 'react';
import { Avatar, Flex, Text, Menu } from '@fluentui/react-northstar';
import { CallIcon, CallVideoIcon } from '@fluentui/react-icons-northstar';

const Contact: React.FC<{
  image?: string;
  name: string;
  status: object;
}> = ({ image, name, status }) => {
  return (
    <Flex fill gap="gap.small" space="between">
      <div>
        <Avatar image={`data:image/jpeg;base64,${image}`} name={name} status={status} />
        <Text content={name} variables={{ isNameText: true }} />
      </div>
      <Menu
        iconOnly
        items={[
          {
            icon: <CallIcon outline />,
            key: 'star',
          },
          {
            icon: <CallVideoIcon outline />,
            key: 'search',
          },
        ]}
        variables={{ isContactMenu: true }}
      />
    </Flex>
  );
};

export default Contact;
