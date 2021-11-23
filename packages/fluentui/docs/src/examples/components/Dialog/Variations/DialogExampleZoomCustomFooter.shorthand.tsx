import * as React from 'react';
import { Button, Dialog, Flex, FlexItem } from '@fluentui/react-northstar';
import { useBooleanKnob } from '@fluentui/docs-components';
import { CloseIcon } from '@fluentui/react-icons-northstar';

const DialogExampleZoomContent: React.FC = () => {
  const [open, setOpen] = useBooleanKnob({ name: 'open' });
  const dialogVariables = {
    footerActionsBreakpoint: '400px',
  };
  return (
    <Dialog
      open={open}
      onOpen={() => setOpen(true)}
      onCancel={() => setOpen(false)}
      onConfirm={() => setOpen(false)}
      cancelButton="Cancel"
      confirmButton="Confirm"
      variables={dialogVariables}
      content="Pretty big content: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
      footer={{
        children: (Component, props) => {
          const { styles, ...rest } = props;

          return (
            <Flex styles={{ ...styles, width: '100%', gridColumn: '1 / span 2' }} wrap space="between">
              <Button
                content="Privacy notes"
                styles={{
                  // custom elements should be styled outside of component
                  [`@media screen and (max-width: ${dialogVariables.footerActionsBreakpoint})`]: {
                    width: '100%',
                    maxWidth: '100%',
                    margin: '0 0 0.5rem',
                  },
                }}
              />
              <FlexItem
                styles={{
                  marginLeft: 0,
                  [`@media screen and (max-width: ${dialogVariables.footerActionsBreakpoint})`]: {
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
      headerAction={{ icon: <CloseIcon />, title: 'Close', onClick: () => setOpen(false) }}
      trigger={<Button content="Open a dialog" />}
    />
  );
};

export default DialogExampleZoomContent;
