import * as React from 'react';

import { Button, Menu, MenuItem, MenuList, MenuPopover, MenuTrigger, SplitButton } from '@fluentui/react-components';
import type { MenuButtonProps } from '@fluentui/react-components';

import { Scenario } from './utils';

export const EventReminderSplitButton: React.FunctionComponent = () => {
  const [statusText, setStatusText] = React.useState<string | undefined>(undefined);

  const focusStatus = () => {
    document.getElementById('statusText')?.focus();
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
      <h1>Event reminder</h1>
      {!statusText && (
        <>
          <p>Your meeting starts in 10 minutes.</p>
          <Button onClick={onDismissButtonClick}>Dismiss</Button>
          <Menu positioning="below-end">
            <MenuTrigger disableButtonEnhancement>
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
      <div id="statusText" tabIndex={-1}>
        {statusText && <p>{statusText}</p>}
      </div>
    </Scenario>
  );
};
