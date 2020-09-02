import * as React from 'react';

import { NestingContext } from '../NestingContext';
import { useNestingChild } from './useNestingChild';
import { useNestingRoot } from './useNestingRoot';
import { UseNestingHookResult } from './types';

// These hooks are not used currently
/* eslint-disable */

export const useNestingAuto = <T extends Node>(): UseNestingHookResult<T> => {
  const context = React.useContext(NestingContext);

  return context ? useNestingChild<T>() : useNestingRoot<T>();
};
