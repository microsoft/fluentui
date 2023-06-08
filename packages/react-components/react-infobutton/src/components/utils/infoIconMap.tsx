import * as React from 'react';
import {
  Info12Regular,
  Info12Filled,
  Info16Regular,
  Info16Filled,
  Info20Regular,
  Info20Filled,
  bundleIcon,
} from '@fluentui/react-icons';

const DefaultInfoButtonIcon12 = bundleIcon(Info12Filled, Info12Regular);
const DefaultInfoButtonIcon16 = bundleIcon(Info16Filled, Info16Regular);
const DefaultInfoButtonIcon20 = bundleIcon(Info20Filled, Info20Regular);

export const infoIconMap = {
  small: <DefaultInfoButtonIcon12 />,
  medium: <DefaultInfoButtonIcon16 />,
  large: <DefaultInfoButtonIcon20 />,
} as const;
