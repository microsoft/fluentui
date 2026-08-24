import * as React from 'react';
import { CheckmarkCircleFilled } from '@fluentui/react-icons/headless/svg/checkmark-circle';
import { DiamondDismissFilled } from '@fluentui/react-icons/headless/svg/diamond-dismiss';
import { InfoFilled } from '@fluentui/react-icons/headless/svg/info';
import { WarningFilled } from '@fluentui/react-icons/headless/svg/warning';

import type { MessageBarIntent } from './MessageBar.types';

const intentIcons: Record<MessageBarIntent, React.ReactElement> = {
  info: <InfoFilled />,
  success: <CheckmarkCircleFilled />,
  warning: <WarningFilled />,
  error: <DiamondDismissFilled />,
};

export const getIntentIcon = (intent: MessageBarIntent): React.ReactElement => intentIcons[intent];
