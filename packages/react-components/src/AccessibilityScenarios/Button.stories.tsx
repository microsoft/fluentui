import * as React from 'react';

// https://github.com/microsoft/fluentui/pull/18695#issuecomment-868432982
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { Button } from '@fluentui/react-button';
import { Scenario, APP_TITLE, APP_TITLE_SEPARATOR } from './utils';

export const CalendarButtonsAccessibilityScenario: React.FunctionComponent = () => {
  const onSaveButtonClick = React.useCallback(() => {
    alert('The calendar event would have been saved.');
  }, []);

  return (
    <Scenario pageTitle="Calendar Buttons">
      <>
        <Button onClick={onSaveButtonClick}>Save event</Button>
        <Button disabled>Delete event</Button>
        <Button disabledFocusable>Show upcoming events</Button>
      </>
    </Scenario>
  );
};

export default {
  title: `Calendar Buttons${APP_TITLE_SEPARATOR}${APP_TITLE}`,
  id: 'button-accessibility-scenario',
};
