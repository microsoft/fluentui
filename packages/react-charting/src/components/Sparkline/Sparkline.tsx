import * as React from 'react';
import { styled } from '@fluentui/react/lib/Utilities';
import { ISparklineStyles, ISparklineProps, ISparklineStyleProps } from '../../index';
import { SparklineBase } from './Sparkline.base';
import { getStyles } from './Sparkline.styles';

// Create a Sparkline variant which uses these default styles and this styled subcomponent.
/**
 * Sparkline component
 * {@docCategory Sparkline}
 */
export const Sparkline: React.FunctionComponent<ISparklineProps> = styled<
  ISparklineProps,
  ISparklineStyleProps,
  ISparklineStyles
>(SparklineBase, getStyles);
