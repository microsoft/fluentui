import * as _ from 'lodash';
import * as PropTypes from 'prop-types';

import leven from './leven';

type ObjectOf<T> = Record<string, T>;

const typeOf = (x: any) => Object.prototype.toString.call(x);

/**
 * Ensure a prop is a valid DOM node.
 */
export const domNode = (props: ObjectOf<any>, propName: string) => {
  // skip if prop is undefined
  if (props[propName] === undefined) return undefined;
  // skip if prop is null
  if (props[propName] === null) return null;
  // skip if prop is valid
  if (props[propName] instanceof Element) return undefined;

  return new Error(`Invalid prop "${propName}" supplied, expected a DOM node.`);
};

/**
 * Similar to PropTypes.oneOf but shows closest matches.
 * Word order is ignored allowing `left chevron` to match `chevron left`.
 * Useful for very large lists of options (e.g. Icon name, Flag name, etc.)
 * @param suggestions - An array of allowed values.
 */
export const suggest = (suggestions: string[]) => {
  if (!Array.isArray(suggestions)) {
    throw new Error('Invalid argument supplied to suggest, expected an instance of array.');
  }

  const findBestSuggestions = _.memoize((str: string) => {
    const propValueWords = str.split(' ');

    return _.take(
      _.sortBy(
        _.map(suggestions, (suggestion: string) => {
          const suggestionWords = suggestion.split(' ');

          const propValueScore = _.sum(
            _.map(
              _.map(propValueWords, x => _.map(suggestionWords, y => leven(x, y))),
              _.min,
            ),
          );

          const suggestionScore = _.sum(
            _.map(
              _.map(suggestionWords, x => _.map(propValueWords, y => leven(x, y))),
              _.min,
            ),
          );

          return { suggestion, score: propValueScore + suggestionScore };
        }),
        ['score', 'suggestion'],
      ),
      3,
    );
  });

  // Convert the suggestions list into a hash map for O(n) lookup times. Ensure
  // the words in each key are sorted alphabetically so that we have a consistent
  // way of looking up a value in the map, i.e. we can sort the words in the
  // incoming propValue and look that up without having to check all permutations.
  const suggestionsLookup: Record<string, boolean> = suggestions.reduce((acc: Record<string, boolean>, key: string) => {
    acc[key.split(' ').sort().join(' ')] = true;
    return acc;
  }, {});

  return (props: ObjectOf<any>, propName: string, componentName: string) => {
    const propValue = props[propName];

    // skip if prop is undefined or is included in the suggestions
    if (!propValue || suggestionsLookup[propValue]) return undefined;

    // check if the words were correct but ordered differently.
    // Since we're matching for classNames we need to allow any word order
    // to pass validation, e.g. `left chevron` vs `chevron left`.
    const propValueSorted = propValue.split(' ').sort().join(' ');
    if (suggestionsLookup[propValueSorted]) return undefined;

    // find best suggestions
    const bestMatches = findBestSuggestions(propValue);

    // skip if a match scored 0
    if (bestMatches.some(x => x.score === 0)) return undefined;

    return new Error(
      [
        `Invalid prop \`${propName}\` of value \`${propValue}\` supplied to \`${componentName}\`.`,
        `\n\nInstead of \`${propValue}\`, did you mean:`,
        bestMatches.map(x => `\n  - ${x.suggestion}`).join(''),
        '\n',
      ].join(''),
    );
  };
};

/**
 * The prop cannot be used.
 * Similar to `deprecate` but with different error message.
 */
export const never = (props: ObjectOf<any>, propName: string, componentName: string) => {
  if (_.isNil(props[propName]) || props[propName] === false) return undefined;

  return new Error(`Prop \`${propName}\` in \`${componentName}\` cannot be used.`);
};

/**
 * Disallow other props from being defined with this prop.
 * @param disallowedProps - An array of props that cannot be used with this prop.
 */
export const disallow =
  (disallowedProps: string[]) => (props: ObjectOf<any>, propName: string, componentName: string) => {
    if (!Array.isArray(disallowedProps)) {
      throw new Error(
        [
          'Invalid argument supplied to disallow, expected an instance of array.',
          ` See \`${propName}\` prop in \`${componentName}\`.`,
        ].join(''),
      );
    }

    // skip if prop is undefined
    if (_.isNil(props[propName]) || props[propName] === false) return undefined;

    // find disallowed props with values
    const disallowed = disallowedProps.reduce((acc, disallowedProp) => {
      if (!_.isNil(props[disallowedProp]) && props[disallowedProp] !== false) {
        return [...acc, disallowedProp];
      }
      return acc;
    }, []);

    if (disallowed.length > 0) {
      return new Error(
        [
          `Prop \`${propName}\` in \`${componentName}\` conflicts with props: \`${disallowed.join('`, `')}\`.`,
          'They cannot be defined together, choose one or the other.',
        ].join(' '),
      );
    }

    return undefined;
  };

/**
 * Ensure a prop adherers to multiple prop type validators.
 * @param validators - An array of propType functions.
 */
export const every =
  (validators: Function[]) =>
  (props: ObjectOf<any>, propName: string, componentName: string, ...args: any[]) => {
    if (!Array.isArray(validators)) {
      throw new Error(
        [
          'Invalid argument supplied to every, expected an instance of array.',
          `See \`${propName}\` prop in \`${componentName}\`.`,
        ].join(' '),
      );
    }

    return _.first(
      _.compact(
        _.map(validators, validator => {
          if (typeof validator !== 'function') {
            throw new Error(`every() argument "validators" should contain functions, found: ${typeOf(validator)}.`);
          }
          return validator(props, propName, componentName, ...args);
        }),
      ),
    ); // we can only return one error at a time
  };

/**
 * Ensure a prop adherers to at least one of the given prop type validators.
 * @param validators - An array of propType functions.
 */
export const some =
  (validators: Function[]) =>
  (props: ObjectOf<any>, propName: string, componentName: string, ...args: any[]) => {
    if (!Array.isArray(validators)) {
      throw new Error(
        [
          'Invalid argument supplied to some, expected an instance of array.',
          `See \`${propName}\` prop in \`${componentName}\`.`,
        ].join(' '),
      );
    }

    const errors = _.compact(
      _.map(validators, validator => {
        if (!_.isFunction(validator)) {
          throw new Error(`some() argument "validators" should contain functions, found: ${typeOf(validator)}.`);
        }
        return validator(props, propName, componentName, ...args);
      }),
    );

    // fail only if all validators failed
    if (errors.length === validators.length) {
      const error = new Error('One of these validators must pass:');
      error.message += `\n${_.map(errors, err => `- ${err.message}`).join('\n')}`;
      return error;
    }

    return undefined;
  };

/**
 * Ensure a validator passes only when a component has a given propsShape.
 * @param propsShape - An object describing the prop shape.
 * @param validator - A propType function.
 */
export const givenProps =
  (propsShape: Record<string, any>, validator: Function) =>
  (props: ObjectOf<any>, propName: string, componentName: string, ...args: any) => {
    if (!_.isPlainObject(propsShape)) {
      throw new Error(
        [
          'Invalid argument supplied to givenProps, expected an object.',
          `See \`${propName}\` prop in \`${componentName}\`.`,
        ].join(' '),
      );
    }

    if (typeof validator !== 'function') {
      throw new Error(
        [
          'Invalid argument supplied to givenProps, expected a function.',
          `See \`${propName}\` prop in \`${componentName}\`.`,
        ].join(' '),
      );
    }

    const shouldValidate = _.keys(propsShape).every((key: string) => {
      const val = propsShape[key];
      // require propShape validators to pass or prop values to match
      return typeof val === 'function' ? !val(props, key, componentName, ...args) : val === props[propName];
    });

    if (!shouldValidate) return undefined;

    const error = validator(props, propName, componentName, ...args);

    if (error) {
      // poor mans shallow pretty print, prevents JSON circular reference errors
      const prettyProps = `{ ${_.keys(_.pick(props, _.keys(propsShape)))
        .map(key => {
          const val = props[key];
          let renderedValue = val;
          if (typeof val === 'string') renderedValue = `"${val}"`;
          else if (Array.isArray(val)) renderedValue = `[${val.join(', ')}]`;
          else if (_.isObject(val)) renderedValue = '{...}';

          return `${key}: ${renderedValue}`;
        })
        .join(', ')} }`;

      error.message = `Given props ${prettyProps}: ${error.message}`;
      return error;
    }
  };

/**
 * Define prop dependencies by requiring other props.
 * @param requiredProps - An array of required prop names.
 */
export const demand = (requiredProps: string[]) => (props: ObjectOf<any>, propName: string, componentName: string) => {
  if (!Array.isArray(requiredProps)) {
    throw new Error(
      [
        'Invalid `requiredProps` argument supplied to require, expected an instance of array.',
        ` See \`${propName}\` prop in \`${componentName}\`.`,
      ].join(''),
    );
  }

  // skip if prop is undefined
  if (props[propName] === undefined) return undefined;

  const missingRequired = requiredProps.filter(requiredProp => props[requiredProp] === undefined);
  if (missingRequired.length > 0) {
    return new Error(
      `\`${propName}\` prop in \`${componentName}\` requires props: \`${missingRequired.join('`, `')}\`.`,
    );
  }

  return undefined;
};

/**
 * Ensure an multiple prop contains a string with only possible values.
 * @param possible - An array of possible values to prop.
 */
export const multipleProp =
  (possible: string[]) => (props: ObjectOf<string | false>, propName: string, componentName: string) => {
    if (!Array.isArray(possible)) {
      throw new Error(
        [
          'Invalid argument supplied to some, expected an instance of array.',
          `See \`${propName}\` prop in \`${componentName}\`.`,
        ].join(' '),
      );
    }

    const propValue = props[propName];

    // skip if prop is undefined
    if (_.isNil(propValue) || propValue === false) return undefined;

    const values = propValue
      .replace('large screen', 'large-screen')
      .replace(/ vertically/g, '-vertically')
      .split(' ')
      .map(val => _.trim(val).replace('-', ' '));
    const invalid = _.difference(values, possible);

    // fail only if there are invalid values
    if (invalid.length > 0) {
      return new Error(`\`${propName}\` prop in \`${componentName}\` has invalid values: \`${invalid.join('`, `')}\`.`);
    }

    return undefined;
  };

/**
 * Ensure a component can render as a node passed as a prop value in place of children.
 */
export const nodeContent = every([disallow(['children']), PropTypes.node]);

export const wrapperShorthand = PropTypes.oneOfType([
  PropTypes.node,
  PropTypes.object,
  PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.node, PropTypes.object])),
]);

/**
 * A shorthand prop which can be used together with `children`.
 */
export const shorthandAllowingChildren = PropTypes.oneOfType([PropTypes.node, PropTypes.object, PropTypes.func]);

export const shorthandObjectAllowingChildren = PropTypes.oneOfType([PropTypes.object, PropTypes.func]);

/**
 * ObjectItemShorthand is a description of a component that can be
 * a props object or a render function.
 */
export const objectItemShorthand = every([disallow(['children']), shorthandAllowingChildren]);

/**
 * Item shorthand is a description of a component that can be a literal,
 * a props object, an element or a render function.
 */
export const itemShorthand = every([disallow(['children']), shorthandAllowingChildren]);
export const itemShorthandWithKindProp = (kindPropValues: string[]) => {
  return every([
    disallow(['children']),
    PropTypes.oneOfType([
      PropTypes.node,
      PropTypes.shape({
        kind: PropTypes.oneOf(kindPropValues),
      }),
      PropTypes.func,
    ]),
  ]);
};
export const itemShorthandWithoutJSX = every([
  disallow(['children']),
  PropTypes.oneOfType([PropTypes.func, PropTypes.number, PropTypes.object, PropTypes.string, PropTypes.oneOf([false])]),
]);

/**
 * Collection shorthand ensures a prop is an array of item shorthand.
 */
export const collectionObjectShorthand = every([disallow(['children']), PropTypes.arrayOf(objectItemShorthand)]);

/**
 * Collection shorthand ensures a prop is an array of item shorthand.
 */
export const collectionShorthand = every([disallow(['children']), PropTypes.arrayOf(itemShorthand)]);
export const collectionShorthandWithKindProp = (kindPropValues: string[]) => {
  return every([disallow(['children']), PropTypes.arrayOf(itemShorthandWithKindProp(kindPropValues))]);
};

/**
 * Show a deprecated warning for component props with a help message and optional validator.
 * @param help - A help message to display with the deprecation warning.
 * @param validator - A propType function.
 */
export const deprecate =
  (help: string, validator?: Function) =>
  (props: ObjectOf<any>, propName: string, componentName: string, ...args: any[]) => {
    if (typeof help !== 'string') {
      throw new Error(
        [
          'Invalid `help` argument supplied to deprecate, expected a string.',
          `See \`${propName}\` prop in \`${componentName}\`.`,
        ].join(' '),
      );
    }

    // skip if prop is undefined
    if (props[propName] === undefined) return undefined;

    // deprecation error and help
    const error = new Error(`The \`${propName}\` prop in \`${componentName}\` is deprecated.`);
    if (help) error.message += ` ${help}`;

    // add optional validation error message
    if (validator) {
      if (typeof validator === 'function') {
        const validationError = validator(props, propName, componentName, ...args);
        if (validationError) {
          error.message = `${error.message} ${validationError.message}`;
        }
      } else {
        throw new Error(
          [
            'Invalid argument supplied to deprecate, expected a function.',
            `See \`${propName}\` prop in \`${componentName}\`.`,
          ].join(' '),
        );
      }
    }

    return error;
  };

export const accessibility = PropTypes.func;

export const size = PropTypes.oneOf<'smallest' | 'smaller' | 'small' | 'medium' | 'large' | 'larger' | 'largest'>([
  'smallest',
  'smaller',
  'small',
  'medium',
  'large',
  'larger',
  'largest',
]);

export const align = PropTypes.oneOf<'start' | 'end' | 'center' | 'justify'>(['start', 'end', 'center', 'justify']);

export const animation = PropTypes.oneOfType([
  // Validator is broken in the latest @react/types
  PropTypes.shape({
    name: PropTypes.string.isRequired,
    delay: PropTypes.string,
    direction: PropTypes.string,
    duration: PropTypes.string,
    fillMode: PropTypes.string,
    iterationCount: PropTypes.string,
    playState: PropTypes.string,
    timingFunction: PropTypes.string,
  }) as any,
  PropTypes.string,
]);

// Heads Up!
// Keep in sync with packages/react/src/themes/types.ts
export const design = PropTypes.shape({
  position: PropTypes.string as PropTypes.Requireable<any>,
  display: PropTypes.string as PropTypes.Requireable<any>,

  top: PropTypes.string,
  right: PropTypes.string,
  bottom: PropTypes.string,
  left: PropTypes.string,

  padding: PropTypes.string,
  paddingTop: PropTypes.string,
  paddingRight: PropTypes.string,
  paddingBottom: PropTypes.string,
  paddingLeft: PropTypes.string,

  margin: PropTypes.string,
  marginTop: PropTypes.string,
  marginRight: PropTypes.string,
  marginBottom: PropTypes.string,
  marginLeft: PropTypes.string,

  width: PropTypes.string,
  height: PropTypes.string,
  minWidth: PropTypes.string,
  maxWidth: PropTypes.string,
  minHeight: PropTypes.string,
  maxHeight: PropTypes.string,
});

/** A checker that matches the React.Ref type. */
export const ref = PropTypes.oneOfType([PropTypes.func, PropTypes.object as PropTypes.Validator<{ current: any }>]);
