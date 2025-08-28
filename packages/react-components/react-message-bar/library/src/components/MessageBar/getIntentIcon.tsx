import * as React from 'react';
import { MessageBarProps } from './MessageBar.types';
import { CheckmarkCircleFilled, InfoFilled, WarningFilled, DismissCircleFilled } from '@fluentui/react-icons';
import type { JSXElement } from '@fluentui/react-utilities';

export function getIntentIcon(intent: MessageBarProps['intent']): JSXElement | null {
  switch (intent) {
    case 'info':
      return <InfoFilled />;
    case 'warning':
      return <WarningFilled />;
    case 'error':
      return <DismissCircleFilled />;
    case 'success':
      return <CheckmarkCircleFilled />;

    default:
      return null;
  }
}
