import * as React from 'react';
import { Button, Dialog, Flex, FlexItem } from '@fluentui/react-northstar';
import { CloseIcon } from '@fluentui/react-icons-northstar';

const DialogExampleZoomContent: React.FC = () => (
  <Dialog
    cancelButton="Cancel"
    confirmButton="Confirm"
    content="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    footer={{
      children: (Component, props) => {
        const { styles, ...rest } = props;

        return (
          // Custom footer should be styled outside of the component
          <Flex styles={{ ...styles, width: '100%', gridColumn: '1 / span 2' }} wrap space="between">
            <Button
              content="Privacy notes"
              styles={{
                [`@media screen and (max-width: 400px )`]: {
                  width: '100%',
                  maxWidth: '100%',
                  margin: '0 0 0.5rem',
                },
              }}
            />
            <FlexItem
              styles={{
                marginLeft: 0,
                [`@media screen and (max-width: 400px)`]: {
                  width: '100%',
                },
              }}
            >
              <Component {...rest} />
            </FlexItem>
          </Flex>
        );
      },
    }}
    header="Action confirmation"
    headerAction={{ icon: <CloseIcon />, title: 'Close' }}
    trigger={<Button content="Open a dialog" />}
  />
);

export default DialogExampleZoomContent;
