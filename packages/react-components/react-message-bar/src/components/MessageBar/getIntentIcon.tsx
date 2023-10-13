import * as React from 'react';
import { MessageBarProps } from './MessageBar.types';
import { CheckmarkCircleFilled, InfoFilled, WarningFilled, ErrorCircleFilled } from '@fluentui/react-icons';

export function getIntentIcon(intent: MessageBarProps['intent']) {
  switch (intent) {
    case 'info':
      return <InfoFilled />;
    case 'warning':
      return <WarningFilled />;
    case 'error':
      return <ErrorCircleFilled />;
    case 'success':
      return <CheckmarkCircleFilled />;

    default:
      return null;
  }
}
