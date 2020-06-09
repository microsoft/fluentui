import { Button, Dialog, Flex, Text } from '@fluentui/react-northstar';
import * as React from 'react';

const DialogExampleFooter: React.FC = () => (
  <Dialog
    cancelButton="Cancel"
    confirmButton="Create"
    content="Are you sure you want to create a new project?"
    header="Project creation"
    trigger={<Button content="Open a dialog" />}
    footer={{
      children: (Component, props) => {
        const { styles, ...rest } = props;

        return (
          <Flex styles={styles}>
            <Text as="a" href="" target="_blank" content="Privacy notes" color="brand" />
            <Flex.Item push>
              <Component {...rest} />
            </Flex.Item>
          </Flex>
        );
      },
    }}
  />
);

export default DialogExampleFooter;
