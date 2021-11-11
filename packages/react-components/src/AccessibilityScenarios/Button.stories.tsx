import * as React from 'react';

// https://github.com/microsoft/fluentui/pull/18695#issuecomment-868432982
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { Button } from '@fluentui/react-button';
import { Scenario } from './utils';

export const CalendarButtonsAccessibilityScenario: React.FunctionComponent = () => {
  const [statusText, setStatusText] = React.useState('Not saved.');
  const onSaveButtonClick = React.useCallback(() => {
    setStatusText('The event has been saved.');
  }, []);

  return (
    <Scenario pageTitle="Calendar Buttons">
      <>
        <Button onClick={onSaveButtonClick}>Save event</Button>
        <Button disabled>Delete event</Button>
        <Button disabledFocusable>Show upcoming events</Button>
        <p>
          Event status: <span aria-live="polite">{statusText}</span>
        </p>
      </>
    </Scenario>
  );
};

export default {
  title: 'Accessibility Scenarios / Calendar Buttons',
  id: 'button-accessibility-scenario',
};
