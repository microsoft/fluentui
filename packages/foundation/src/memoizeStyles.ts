import { IStyle, mergeStyles } from '@uifabric/styling';
import { classNameToComponentDictionary, componentToPrecedenceListDictionary } from './createComponent';

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
  }

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

    // Traverse map with sorted list of classnames to get classname and return.
    classNames.sort();
    return _traverseMap(selectedStateMap, defaultStyles, classNames, 0);
  }

  // Else use the regular mergeStyles implementation.
  return mergeStyles(defaultStyles, classNames);
}

function _traverseMap(current: IClassNamesMapNode, defaultStyles: IStyle, classNames: string[], classNameIndex: number): string {
  // If we've arrived to the end of the classnames array, then return correct classname.
  if (classNames.length === classNameIndex) {
    // If the current node make check on styles, else get a classname from mergeStyles, set that as the classname value for the
    // current node and return it.
    if (current.className !== null && current.styles !== null) {
      const currentNodeStyles = current.styles;
      const componentStyles = JSON.stringify(defaultStyles);
      // If the styles of the current node are the same as the ones we are testing agains return memoized classname.
      // Else check if the current styles are the default ones.
      if (currentNodeStyles === componentStyles) {
        return current.className;
      } else {
        // If the user specified styles or tokens then the styles object will be bigger (extra object styles or extra classnames if tokens
        // have changed). Given this, we get the classname to return from mergeStyles and then change the classname and styles of the
        // current node to the ones we are testing against since they have been shown to be the vanilla ones.
        const className = mergeStyles(defaultStyles, classNames);
        if (componentStyles.length < currentNodeStyles.length) {
          current.className = className;
          current.styles = componentStyles;
        }
        return className;
      }
    } else {
      const className = mergeStyles(defaultStyles, classNames);
      current.className = className;
      current.styles = JSON.stringify(defaultStyles);
      return className;
    }
  }

  // Else check if the current classname is on the current node's map, create a new entry if not, and then traverse it.
  const nextClassName = classNames[classNameIndex];
  if (!current.map.hasOwnProperty(nextClassName)) {
    current.map[nextClassName] = { className: null, styles: null, map: {} };
  }
  return _traverseMap(current.map[nextClassName], defaultStyles, classNames, classNameIndex + 1);
}
