import * as React from 'react';
import { styled } from '../../Utilities';
import { CalloutContentBase } from './CalloutContent.base';
import { getStyles } from './CalloutContent.styles';
import type { ICalloutProps } from './Callout.types';

export const CalloutContent: React.FunctionComponent<ICalloutProps> = styled(CalloutContentBase, getStyles, undefined, {
  scope: 'CalloutContent',
});
