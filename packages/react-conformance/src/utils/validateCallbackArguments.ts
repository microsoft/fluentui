import { getCallbackArguments } from './getCallbackArguments';
import type { ArgumentValue } from './getCallbackArguments';

function validateEventArgument(value: ArgumentValue | ArgumentValue[]): void {
  const normalizedValue = Array.isArray(value) ? value : [value];

  normalizedValue.forEach(valueInUnion => {
    if (typeof valueInUnion === 'undefined') {
      return;
    }

    if (typeof valueInUnion === 'string') {
      if (valueInUnion === 'Event' || valueInUnion === 'React.SyntheticEvent') {
        throw new Error(
          [
            'A first (event) argument cannot use generic React.SyntheticEvent or Event types.',
            'Please use more specific types like React.MouseEvent/MouseEvent',
          ].join(' '),
        );
      }

      if (valueInUnion.endsWith('Event')) {
        return;
      }
    }

    throw new Error(`A first (event) argument may only have type "undefined", React.*Event or *Event`);
  });
}

function validateDataArgument(value: ArgumentValue | ArgumentValue[]): void {
  if (Array.isArray(value)) {
    throw new Error('A second (data) argument cannot be a union');
  }

  if (value === null || typeof value !== 'object') {
    throw new Error('A second (data) argument should be represented by a type declaration or interface');
  }
}

export function validateCallbackArguments(callbackArguments: ReturnType<typeof getCallbackArguments>): void {
  const argumentNames = Object.keys(callbackArguments);

  if (argumentNames.length !== 2) {
    throw new Error(`A callback should have two arguments, it has ${argumentNames.length}`);
  }

  validateEventArgument(callbackArguments[0][1]);
  validateDataArgument(callbackArguments[1][1]);
}
