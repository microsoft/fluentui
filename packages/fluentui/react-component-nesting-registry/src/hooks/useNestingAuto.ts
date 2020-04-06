import * as React from 'react';

import NestingContext from '../NestingContext';
import useNestingChild from './useNestingChild';
import useNestingRoot from './useNestingRoot';
import { UseNestingHookResult } from './types';

const useNestingAuto = <T extends Node>(): UseNestingHookResult<T> => {
  const context = React.useContext(NestingContext);

  return context ? useNestingChild<T>() : useNestingRoot<T>();
};

export default useNestingAuto;
