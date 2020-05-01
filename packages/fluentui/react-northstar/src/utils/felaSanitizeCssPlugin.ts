import { ICSSInJSStyle } from '@fluentui/styles';
import { Renderer, RendererParam } from '@fluentui/react-bindings';
import { TRuleType } from 'fela-utils';

/**
 * Checks whether provided CSS property value is safe for being rendered by Fela engine.
 */
const isValidCssValue = (value: any) => {
  if (typeof value !== 'string') {
    return true;
  }

  const openingBrackets = '({[';
  const closingBrackets = ')}]';

  const openingBracketsStack: string[] = [];

  /**
   * This loop logic checks whether braces sequence of input argument is valid.
   * Essentially, it ensures that each of the '(', '{', '[' braces
   * - is properly matched by its complementary closing character
   * - closing brace properly corresponds to the last opened one
   */
  for (let i = 0; i < value.length; ++i) {
    const currentCharacter = value[i];
    if (openingBrackets.includes(currentCharacter)) {
      openingBracketsStack.push(currentCharacter);
    } else if (closingBrackets.includes(currentCharacter)) {
      const lastOpeningBracket = openingBracketsStack.pop();
      if (
        lastOpeningBracket &&
        openingBrackets.indexOf(lastOpeningBracket) !== closingBrackets.indexOf(currentCharacter)
      ) {
        return false;
      }
    }
  }

  return openingBracketsStack.length === 0;
};

export default (config?: { skip?: string[] }) => {
  const cssPropertiesToSkip = [...((config && config.skip) || [])];

  const sanitizeCssStyleObject = (
    styles: ICSSInJSStyle,
    type: TRuleType,
    renderer: Renderer,
    params: RendererParam,
  ) => {
    if (!params.sanitizeCss) {
      return styles;
    }

    const processedStyles = Array.isArray(styles) ? [] : {};

    Object.keys(styles).forEach(cssPropertyNameOrIndex => {
      const cssPropertyValue = styles[cssPropertyNameOrIndex];

      if (typeof cssPropertyValue === 'object') {
        processedStyles[cssPropertyNameOrIndex] = sanitizeCssStyleObject(cssPropertyValue, type, renderer, params);
        return;
      }

      const isPropertyToSkip = cssPropertiesToSkip.some(propToExclude => propToExclude === cssPropertyNameOrIndex);

      if (isPropertyToSkip) {
        processedStyles[cssPropertyNameOrIndex] = cssPropertyValue;
        return;
      }

      if (isValidCssValue(cssPropertyValue)) {
        processedStyles[cssPropertyNameOrIndex] = cssPropertyValue;
      } else if (process.env.NODE_ENV !== 'production') {
        // eslint-disable-next-line no-console
        console.warn(
          `fela-sanitize-css: An invalid value "${cssPropertyValue}" was passed to property "${cssPropertyNameOrIndex}"`,
        );
      }
    });

    return processedStyles;
  };

  return sanitizeCssStyleObject;
};
