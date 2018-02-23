/* tslint:disable:no-unused-variable */
import * as React from 'react';
import {
  styled
} from '../../Utilities';
import { ICalloutProps } from './Callout.types';
import { CalloutContentBase } from './CalloutContent.base';
import { getStyles } from './CalloutContent.styles';

export const CalloutContent = styled(
  CalloutContentBase,
  getStyles
);