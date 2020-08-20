import { useTheme } from './useTheme';
import { tokensToStyleObject } from './tokensToStyleObject';
import { TokenSetType, Variants } from './types';
import { mergeStyles, IStyle } from '@uifabric/merge-styles';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type GenericDictionary = Record<string, any>;

const parseVariants = (
  variants: Variants | undefined,
  state: GenericDictionary,
  variantKeys: string[],
  variantObjects: TokenSetType[],
) => {
  if (variants) {
    for (const variantName of Object.keys(variants)) {
      if (variants[variantName] && (variantName === 'base' || state[variantName])) {
        variantKeys.push(variantName);
        variantObjects.push(variants[variantName]!);
      }
    }
  }
};

export const makeVariants = <TTokenSetType extends TokenSetType>(
  componentName: string,
  prefix: string,
  defaultVariants: Variants,
) => {
  // Guarantee uniqueness of class name map.
  // const id = getId('variant_' + componentName);
  const variantToClassName: Record<string, string> = {}; // useThemeSettings(id);

  return (state: GenericDictionary) => {
    // Grab the theme.
    const theme = useTheme();
    const variantKeys: string[] = [];
    const variantObjects: TokenSetType[] = [];
    const themeVariants = theme?.variants?.[componentName];

    parseVariants(defaultVariants, state, variantKeys, variantObjects);
    parseVariants(themeVariants, state, variantKeys, variantObjects);

    const key = `${componentName}-${variantKeys.join('-')}`;
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

      // TODO: call theme.mergeStyles(tokens as IStyle);
      className = variantToClassName[key] = mergeStyles(tokens as IStyle[]);
    }

    state.className = `${state.className || ''} ${className}`;
  };
};
