import { IStyle } from '@uifabric/merge-styles';
import { ITheme } from '@fluentui/theme';
import { makeStyles } from './makeStyles';

/**
 * The `makeClasses` helper encapsulates `makeStyles`, and given a style map which follows
 * a specific naming convention, produces a hook function which takes in the component
 * draft state and auto distributes classes into the draft state. This removes a lot of
 * boilerplate code using `classnames` helpers to manage distributing classnames manually.
 *
 * Usage:
 *
 * ```tsx
 * const useButtonClasses makeClasses(theme => {
 *   root: { ... },
 *   _primary: { ... },
 *   _size_small: { ... }
 * });
 * ```
 *
 * The class naming convention is broken down as follows:
 *
 * * No underscores - a slot class name. (E.g. "root", "icon", etc)
 * * Prefixed with underscore - a modifier. (E.g. "_primary", "_fluid")
 * * Contains 2 underscores - a name/value matcher. (E.g. "_size_small")
 *
 * Modifier classnames are added to the root className when the state contains a truthy value
 * of the same name. For example, when the primary flag is present, the "_primary" modifier
 * class will be appended to the root className prop.
 *
 * Enum classnames are also added to the root className when teh state contains an enum value
 * which matches the value in the className. for example, when the `size` enum value is `small`,
 * the "_size_small" enum class will be appended to the root className prop.
 */
export const makeClasses = <TState extends {}>(
  styleOrFunction: Record<string, IStyle> | ((theme: ITheme) => Record<string, IStyle>),
) => {
  const useStyles = makeStyles(styleOrFunction);

  return (state: TState) => {
    const classes = useStyles();
    const slotNames = Object.keys(classes);

    for (const slotName of slotNames) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const value = (classes as any)[slotName];

      // If the renderer returns non-classNames (like subComponentStyles), ignore.
      if (typeof value === 'string') {
        const parts = slotName.split('_');

        switch (parts.length) {
          case 1:
            if (slotName === 'root') {
              _setClass(state, value);
            } else {
              _setClass(state, value, slotName);
            }
            break;

          case 2:
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            if ((state as any)[parts[1]]) {
              _setClass(state, value);
            }
            break;

          case 3:
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            if ((state as any)[parts[1]] === parts[2]) {
              _setClass(state, value);
            }
            break;
        }
      }
    }
  };
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function _setClass(state: Record<string, any>, className: string, slot?: string) {
  const currentSlot = slot ? (state[slot] = state[slot] || {}) : state;

  if (currentSlot.className) {
    currentSlot.className += ' ' + className;
  } else {
    currentSlot.className = className;
  }
}
