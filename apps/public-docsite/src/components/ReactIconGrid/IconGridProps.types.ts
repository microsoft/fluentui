import * as React from 'react';
import { FluentIconsProps } from '@fluentui/react-icons';

export interface IIconGridProps {
  /**
   * An array of icons using react functional components
   */
  icons: React.FC<FluentIconsProps>[];
}
