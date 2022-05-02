import * as React from 'react';

import { Menu, MenuTrigger, MenuList, MenuPopover, MenuItem } from '@fluentui/react-menu';

import { Button, MenuButtonProps, SplitButton } from '@fluentui/react-button';

import { Scenario } from './utils';

export const EventReminderAccessibilityScenario: React.FunctionComponent = () => {
  const [statusText, setStatusText] = React.useState<string | undefined>(undefined);
  const statusRef = React.useRef<HTMLParagraphElement>(null);

  const focusStatus = () => {
    statusRef.current!.focus();
  };

  const onDismissButtonClick = () => {
    setStatusText('The reminder has been dismissed.');
    focusStatus();
  };

  const showPostponeText = (duration: string) => {
    const postponeMessages: Record<string, string> = {
      tenMinutes: 'for 10 minutes',
      thirtyMinutes: 'for 30 minutes',
      oneHour: 'for 1 hour',
      tomorrow: 'until tomorrow',
    };
    setStatusText(`The event has been postponed ${postponeMessages[duration]}.`);
    focusStatus();
  };

  return (
    <Scenario pageTitle="Event reminder split button">
      {!statusText && (
        <>
          <p>Your meeting starts in 10 minutes.</p>
          <Button onClick={onDismissButtonClick}>Dismiss</Button>
          <Menu positioning="below-end">
            <MenuTrigger>
              {(menuButtonProps: MenuButtonProps) => {
                const extendedMenuButtonProps = {
                  ...menuButtonProps,
                  'aria-label': 'Postpone for later',
                };

                return (
                  <SplitButton
                    menuButton={extendedMenuButtonProps}
                    primaryActionButton={{
                      children: 'Postpone for 10 minutes',
                      onClick: () => {
                        showPostponeText('tenMinutes');
                      },
                    }}
                  />
                );
              }}
            </MenuTrigger>

            <MenuPopover>
              <MenuList>
                <MenuItem
                  onClick={() => {
                    showPostponeText('thirtyMinutes');
                  }}
                >
                  Postpone for 30 minutes
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    showPostponeText('oneHour');
                  }}
                >
                  Postpone for 1 hour
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    showPostponeText('tomorrow');
                  }}
                >
                  Postpone until tomorrow
                </MenuItem>
              </MenuList>
            </MenuPopover>
          </Menu>
        </>
      )}
      <div ref={statusRef} tabIndex={0}>
        {statusText && <p>{statusText}</p>}
      </div>
    </Scenario>
  );
};

export default {
  title: 'Accessibility Scenarios/ Event reminder split button',
  id: 'split-button-accessibility-scenario',
};
