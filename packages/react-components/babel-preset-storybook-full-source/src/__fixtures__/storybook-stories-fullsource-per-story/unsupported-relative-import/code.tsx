import * as React from 'react';
import { makeLabel } from './utils';

export const Supported = () => <span>Supported</span>;
export const Unsupported = () => <span>{makeLabel()}</span>;
