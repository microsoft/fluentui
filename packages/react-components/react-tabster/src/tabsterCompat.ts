import * as tabsterModule from 'tabster';

export const tabster =
  (tabsterModule as typeof tabsterModule & { default?: typeof tabsterModule }).default ?? tabsterModule;
