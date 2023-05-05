import * as React from 'react';

export const isNum = (v: unknown): v is number => typeof v === 'number' && !isNaN(v);

export const isStr = (v: unknown): v is String => typeof v === 'string';

export const isFn = (v: unknown): v is Function => typeof v === 'function';

export const getAutoCloseDelay = (toastAutoClose?: false | number, containerAutoClose?: false | number) =>
  toastAutoClose === false || (isNum(toastAutoClose) && toastAutoClose > 0) ? toastAutoClose : containerAutoClose;

export const canBeRendered = <T>(content: T): boolean =>
  React.isValidElement(content) || isStr(content) || isFn(content) || isNum(content);
