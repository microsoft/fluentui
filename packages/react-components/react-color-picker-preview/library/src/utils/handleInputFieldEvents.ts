import * as React from 'react';

export const handleHexKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
  const hexColorRegex = /^#?([0-9A-Fa-f]{0,6})$/;
  const allowedKeys = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab', 'Enter', 'ArrowUp', 'ArrowDown'];

  const isCtrlCmd = e.ctrlKey || e.metaKey;

  if (isCtrlCmd && e.key) {
    return;
  }

  if (!allowedKeys.includes(e.key) && !hexColorRegex.test((e.target as HTMLInputElement).value + e.key)) {
    e.preventDefault();
  }
};
