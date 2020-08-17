import { useTheme } from './useTheme';
import { tokensToStyleObject } from './tokensToStyleObject';
import { TokenSetType } from './types';
import { mergeStyles, IStyle } from '@uifabric/merge-styles';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type GenericDictionary = Record<string, any>;

const parseVariants = (
  variants: Record<string, TokenSetType> | undefined,
  state: GenericDictionary,
  variantKeys: string[],
  variantObjects: TokenSetType[],
) => {
  if (variants) {
    for (const variantName of Object.keys(variants)) {
      if (variants[variantName] && (variantName === 'base' || state[variantName])) {
        variantKeys.push(variantName);
        variantObjects.push(variants[variantName]);
      }
    }
  }
};

export const makeVariants = (componentName: string, prefix: string, defaultVariants: Record<string, TokenSetType>) => {
  // Guarantee uniqueness of class name map.
  // const id = getId('variant_' + componentName);
  const variantToClassName: Record<string, string> = {}; // useThemeSettings(id);

  return (state: GenericDictionary) => {
    const theme = useTheme();
    const variantKeys: string[] = [];
    const variantObjects: TokenSetType[] = [];
    let themeVariants: Record<string, TokenSetType> | undefined = undefined;

    if (theme && theme.components && theme.components[componentName]) {
      themeVariants = theme.variants[componentName];
    }

    parseVariants(defaultVariants, state, variantKeys, variantObjects);
    parseVariants(themeVariants, state, variantKeys, variantObjects);

    const key = variantKeys.join('-');
    let className = variantToClassName[key];

    if (!className) {
      const tokens = variantObjects.map(obj => {
        if (typeof obj === 'object') {
          const newObj = tokensToStyleObject(obj, prefix);
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (newObj as any).displayName = key;

          return newObj;
        }
        return obj;
      });

      // shouldn't be here; call register instead.
      className = variantToClassName[key] = mergeStyles(tokens as IStyle[]);
    }

    state.className = `${state.className || ''} ${className}`;
  };
};
