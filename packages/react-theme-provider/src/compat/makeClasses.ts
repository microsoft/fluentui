import { IStyle } from '@fluentui/merge-styles';
import { Theme } from './types';
import { applyClasses } from './applyClasses';
import { makeStyles, UseStylesOptions } from './makeStyles';

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
  styleOrFunction: Record<string, IStyle> | ((theme: Theme) => Record<string, IStyle>),
) => {
  const useStyles = makeStyles(styleOrFunction);

  return (state: TState, options?: UseStylesOptions) => {
    const classes = useStyles(options);

    applyClasses(state, classes);
  };
};
