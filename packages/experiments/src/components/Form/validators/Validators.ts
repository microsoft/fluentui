/* tslint:disable:no-any */
export namespace Validators {
  'use strict';

  /**
   * Returns a validator that checks for null and whitespace
   * @param errorMessage Required error message to display
   */
  export function required(errorMessage: string): (value?: any | null) => string | undefined {
    'use strict';
    return (value?: any): string | undefined => {
      if (value === null || value === undefined || value === '' || (Array.isArray(value) && value.length === 0)) {
        return errorMessage;
      }
    };
  }

  /**
   * Returns a validator that checks the length of a string and ensures its equal to a value. If input null return -1
   * @param desiredLength The length of the string
   * @param formatError a callback which takes the length and formats an appropriate error message for validation failed
   */
  export function length(desiredLength: number, formatError: (length: number) => string): (value?: string | null) => string | undefined {
    'use strict';
    return (value?: string | null): string | undefined => {
      value = value !== null && value !== undefined ? value : '';
      if (value.length !== desiredLength) {
        return formatError(value.length);
      }
    };
  }

  /**
   * Returns a validator that checks the length of a string and ensures its greater than a value (inclusive)
   * @param lengthBound The min length of the string
   * @param formatError a callback which takes the values Length and formats an appropriate error message for validation failed
   */
  export function minLength(lengthBound: number, formatError: (length: number) => string): (value?: string | null) => string | undefined {
    'use strict';
    return (value?: string | null): string | undefined => {
      value = value !== null && value !== undefined ? value : '';
      if (value.length < lengthBound) {
        return formatError(value.length);
      }
    };
  }

  /**
   * Returns a validator that checks the length of a string and ensures its less than a value (inclusive)
   * @param lengthBound The max length of the string
   * @param formatError a callback which takes the values length and formats an appropriate error message for validation failed
   */
  export function maxLength(lengthBound: number, formatError: (length: number) => string): (value?: string | null) => string | undefined {
    'use strict';
    return (value?: string | null): string | undefined => {
      value = value !== null && value !== undefined ? value : '';
      if (value.length > lengthBound) {
        return formatError(value.length);
      }
    };
  }

  /**
   * Returns a validator that calls the passed in regular expression aganist the string using exec()
   * @param expression The regular expression to use.
   * @param errorMessage Required error message to display
   */
  export function regex(expression: RegExp, errorMessage: string): (value?: string | null) => string | undefined {
    'use strict';
    return (value?: string | null): string | undefined => {
      if (value) {
        const match = expression.exec(value);
        if (match === null || match === undefined) {
          return errorMessage;
        }
      }
    };
  }

  /**
   * Returns a validator that checks if a number is greater than the provided bound
   * @param bound The bound
   * @param formatError a callback which takes the length and formats an appropriate error message for validation failed
   */
  export function minValue(bound: number, formatError: (length: number) => string): (value?: string | null) => string | undefined {
    'use strict';
    return (value?: string | null): string | undefined => {
      if (value) {
        const intValue: number = Number(value);
        if (!isNaN(intValue) && intValue < bound) {
          return formatError(intValue);
        }
      }
    };
  }

  /**
   * Returns a validator that checks if a number is less than the provided bound
   * @param bound The bound
   * @param formatError a callback which takes the length and formats an appropriate error message for validation failed
   */
  export function maxValue(bound: number, formatError: (length: number) => string): (value?: string | null) => string | undefined {
    'use strict';
    return (value?: string | null): string | undefined => {
      if (value) {
        const intValue: number = Number(value);
        if (!isNaN(intValue) && intValue > bound) {
          return formatError(intValue);
        }
      }
    };
  }

  /**
   * Returns a validator that checks if a number is an integer
   * @param errorMessage Required error message to display
   */
  export function isInteger(errorMessage: string): (value?: string | null) => string | undefined {
    'use strict';
    return (value?: string | null): string | undefined => {
      if (value) {
        if (Number(value) % 1 !== 0) {
          return errorMessage;
        }
      }
    };
  }

  /**
   * Returns a validator that ensures the value is a number
   * @param errorMessage Required error message to display
   */
  export function isNumber(errorMessage: string): (value?: string | null) => string | undefined {
    'use strict';
    return (value?: string | null): string | undefined => {
      if (value) {
        if (isNaN(Number(value))) {
          return errorMessage;
        }
      }
    };
  }
}

export type IValidator = (value?: any) => string | undefined;
