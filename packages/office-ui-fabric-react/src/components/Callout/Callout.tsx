
/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */
import { styled } from '../../Utilities';
import {
  ICalloutProps
} from './Callout.types';
import { CalloutBase } from './Callout.base';
import { getStyles } from './Callout.styles';

// Create a Callout variant which uses these default styles and this styled subcomponent.
export const Callout = styled(
  CalloutBase,
  getStyles
);
