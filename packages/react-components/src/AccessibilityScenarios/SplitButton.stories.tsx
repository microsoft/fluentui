import * as React from 'react';

// https://github.com/microsoft/fluentui/pull/18695#issuecomment-868432982
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { Menu, MenuTrigger, MenuList, MenuPopover, MenuItem } from '@fluentui/react-menu';

// https://github.com/microsoft/fluentui/pull/18695#issuecomment-868432982
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { MenuButtonProps } from '@fluentui/react-menubutton';

// https://github.com/microsoft/fluentui/pull/18695#issuecomment-868432982
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { Button, SplitButton } from '@fluentui/react-button';

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
          <Menu positioning="below-end">
            <MenuTrigger>
              {(triggerProps: MenuButtonProps) => {
                triggerProps['aria-label'] = 'Postpone';

                return (
                  <SplitButton
                    menuButton={triggerProps}
                    primaryActionButton={{ children: 'Dismiss', onClick: onDismissButtonClick }}
                  />
                );
              }}
            </MenuTrigger>

            <MenuPopover>
              <MenuList>
                <MenuItem
                  onClick={() => {
                    showPostponeText('tenMinutes');
                  }}
                >
                  Postpone for 10 minutes
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
