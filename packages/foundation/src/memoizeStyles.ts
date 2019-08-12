import { IStyle, mergeStyles } from '@uifabric/styling';
import { classNameToComponentDictionary, componentToPrecedenceListDictionary } from './createComponent';
import { IStyleBaseArray } from '@uifabric/merge-styles';

interface IClassNamesMapNode {
  className: string | null;
  styles: string | null;
  map: IStateToClassNameDictionary;
}

interface IStateToClassNameDictionary {
  [key: string]: IClassNamesMapNode;
}

interface IClassNamesMap {
  [key: string]: IStateToClassNameDictionary;
}

const memoizedClassNamesMap: IClassNamesMap = {};

export function memoizeStyles<TProps extends any>(defaultStyles: IStyle, mixedProps: TProps | undefined, classNames: string[]): string {
  let className: string | undefined = undefined;
  if (Array.isArray(defaultStyles) && defaultStyles.length > 0 && typeof defaultStyles[0] === 'string') {
    className = defaultStyles[0] as string;

    // Memoize for cases where the defaultStyles have been passed a className and a precedence state list has been passed for the
    // component with tha className.
    // If the defaultStyles have been passed a className this should come as the first element of the array.
    if (
      className &&
      classNameToComponentDictionary.hasOwnProperty(className) &&
      componentToPrecedenceListDictionary.hasOwnProperty(classNameToComponentDictionary[className])
    ) {
      const component = classNameToComponentDictionary[className];
      const componentPartKey = '(' + component + ')+(' + className + ')';
      const precedenceList = componentToPrecedenceListDictionary[component];

      // If the (component + component part) key didn't exist in the memoized classnames map, then add it with a map of possible states
      // to null objects as its value.
      if (!memoizedClassNamesMap.hasOwnProperty(componentPartKey)) {
        memoizedClassNamesMap[componentPartKey] = { default: { className: null, styles: null, map: {} } };
        for (const state of precedenceList) {
          memoizedClassNamesMap[componentPartKey][state.toString()] = { className: null, styles: null, map: {} };
        }
      }

      // Check each state of the precedence list from right to left to get correct state key or get default state key otherwise.
      let selectedState: string = 'default';
      let selectedStateMap: IClassNamesMapNode = memoizedClassNamesMap[componentPartKey][selectedState];
      if (mixedProps) {
        for (let i = precedenceList.length - 1; i >= 0; i--) {
          selectedState = precedenceList[i].toString();
          if (mixedProps.hasOwnProperty(selectedState) && mixedProps[selectedState]) {
            selectedStateMap = memoizedClassNamesMap[componentPartKey][selectedState];
            break;
          }
        }
      }

      // Traverse map with sorted list of classnames and sorted list of tokenKeys to get classname and return.
      classNames.sort();
      return mixedProps && mixedProps.tokens
        ? _traverseMap(selectedStateMap, defaultStyles, classNames, mixedProps.tokens)
        : _traverseMap(selectedStateMap, defaultStyles, classNames);
    }
  }

  // Else use the regular mergeStyles implementation.
  return mergeStyles(defaultStyles, classNames);
}

function _traverseMap<TTokens extends any>(
  current: IClassNamesMapNode,
  defaultStyles: IStyleBaseArray,
  classNames: string[],
  tokens?: TTokens
): string {
  // If the tokens object is defined, iterate through its keys to traverse map or create it if it hasn't been created before.
  if (tokens) {
    const tokenKeys = Object.keys(tokens).sort();
    for (const key of tokenKeys) {
      let nextToken = tokens[key];
      if (nextToken === undefined) {
        nextToken = '__undefined__';
      }
      if (!current.map.hasOwnProperty(nextToken)) {
        current.map[nextToken] = { className: null, styles: null, map: {} };
      }
      current = current.map[nextToken];
    }
  }

  // Once finished with the tokens, iterate through the classnames array to traverse map or create it if it hasn't been created before.
  for (const cn of classNames) {
    if (!current.map.hasOwnProperty(cn)) {
      current.map[cn] = { className: null, styles: null, map: {} };
    }
    current = current.map[cn];
  }

  let className: string;
  // Finally, once we've finished with classnames array, return the current classname.
  // If the current node already has a classname on it, check its styles, else get a classname from mergeStyles, set that as the classname
  // value for the current node and return it.
  if (current.className !== null && current.styles !== null) {
    const currentNodeStyles = current.styles;
    const componentStyles = JSON.stringify(defaultStyles);
    // If the styles of the current node are the same as the ones we are testing against, then return memoized classname.
    // Else check if the current styles are the default ones.
    if (currentNodeStyles === componentStyles) {
      return current.className;
    } else {
      // If the user specified the styles prop then the styles object will be bigger with extra styles object at the end.
      // Given this, we get the classname to return from mergeStyles and then change the classname and styles of the
      // current node to the ones we are testing against since they have been shown to be the vanilla ones.
      className = mergeStyles(defaultStyles, classNames);
      if (componentStyles.length < currentNodeStyles.length) {
        current.className = className;
        current.styles = componentStyles;
      }
      return className;
    }
  }

  className = mergeStyles(defaultStyles, classNames);
  current.className = className;
  current.styles = JSON.stringify(defaultStyles);
  return className;
}
