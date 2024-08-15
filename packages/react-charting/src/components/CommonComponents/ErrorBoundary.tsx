import * as React from 'react';
import { styled } from '@fluentui/react/lib/Utilities';
import { IErrorBoundaryProps, IErrorBoundaryStyleProps, IErrorBoundaryStyles } from './ErrorBoundary.types';
import { ErrorBoundaryBase } from './ErrorBoundary.base';
import { getErrorBoundaryStyles } from './ErrorBoundary.styles';

// Create a ErrorBoundary variant which uses these default styles and this styled subcomponent.
/**
 * ErrorBoundary component.
 * {@docCategory ErrorBoundary}
 */
export const ErrorBoundary: React.FunctionComponent<IErrorBoundaryProps> = styled<
  IErrorBoundaryProps,
  IErrorBoundaryStyleProps,
  IErrorBoundaryStyles
>(ErrorBoundaryBase, getErrorBoundaryStyles);
