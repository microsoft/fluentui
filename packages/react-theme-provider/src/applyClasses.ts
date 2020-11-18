/**
 * The `applyClasses` takes in a mutable state and a class map and, given the class map
 * follows the a naming convention described below, auto-applies classes to the appropriate places
 * in the state.
 *
 * Usage:
 *
 * ```tsx
 * const useButtonClasses = makeClasses(theme => {
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
export const applyClasses = <TState extends {}>(state: TState, classMap: Record<string, string>) => {
  for (const key of Object.keys(classMap)) {
    const value = classMap[key];
    const parts = key.split('_');

    switch (parts.length) {
      case 1:
        if (key === 'root') {
          _setClass(state, value);
        } else if (key !== 'subComponentStyles') {
          // The subComponentStyles check is an unfortunate workaround to avoid breaking partners.
          _setClass(state, value, key);
        }
        break;

      case 2:
        const modifierName = parts[1];

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        if ((state as any)[modifierName] || (state as any).variant === modifierName) {
          _setClass(state, value);
        }
        break;

      case 3:
        const enumName = parts[1];
        const enumValue = parts[2];

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        if ((state as any)[enumName] === enumValue) {
          _setClass(state, value);
        }
        break;
    }
  }
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
