import { AccessibilityHandlerProps, KeyboardEventHandler } from '@fluentui/react-bindings';
import * as _ from 'lodash';
import * as React from 'react';

import { Props, ShorthandValue } from '../types';

// Makes sure that 'onKeyDown' is correctly overriden on the slots.
// It should be applied after 'unhandledProps' because they can contain 'onKeyDown' from user and is handled by UTs in isConformant()
const applyAccessibilityKeyHandlers = (
  keyHandlers: AccessibilityHandlerProps,
  value: Props | ShorthandValue<Props>,
): Partial<Record<keyof AccessibilityHandlerProps, (e: React.KeyboardEvent, ...args: any[]) => void>> => {
  const valIsPropsObject = _.isPlainObject(value);
  const valIsReactElement = React.isValidElement(value);

  const slotProps =
    (valIsReactElement && (value as React.ReactElement<Props>).props) || (valIsPropsObject && (value as Props)) || {};

  return _.mapValues(
    keyHandlers,
    (accessibilityHandler: KeyboardEventHandler, handleName: string) => (e: React.KeyboardEvent, ...args: any[]) => {
      accessibilityHandler(e);
      _.invoke(slotProps, handleName, e, ...args);
    },
  );
};

export default applyAccessibilityKeyHandlers;
