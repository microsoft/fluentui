import { IStyle, mergeStyles } from '@uifabric/styling';
import { classNameToComponentDictionary, componentToPrecedenceListDictionary } from './createComponent';

const memoizedClassNamesMap = {};

export function memoizeStyles<TProps>(defaultStyles: IStyle, classNames: string[]): string {
  let className: string | undefined = undefined;
  if (Array.isArray(defaultStyles) && defaultStyles.length > 0 && typeof defaultStyles[0] === 'string') {
    className = defaultStyles[0] as string;
  }

  // Memoize for cases where the defaultStyles have been passed a className and a precedence state list has been passed for the
  // component with tha className.
  // If the defaultStyles have been passed a className this should come as the first element of the array.
  if (
    className &&
    classNameToComponentDictionary.hasOwnProperty(className) &&
    componentToPrecedenceListDictionary.hasOwnProperty(classNameToComponentDictionary[className])
  ) {
    classNames.splice(0, 0, className);

    console.log('-------------------------------------------------------START---------------------------------------------------------');
    console.log(defaultStyles);
    console.log(classNames);
    console.log('--------------------------------------------------------END----------------------------------------------------------');
  } else {
    className = mergeStyles(defaultStyles, classNames);
  }

  return className;
}
