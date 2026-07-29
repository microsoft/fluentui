import type { GriffelStyle } from '@fluentui/react-components';
import { tokens } from '@fluentui/react-components';

const v0Inline = (): GriffelStyle => ({ display: 'inline-flex' });

/*
 * The selector was `` [`& .${labelClassNames.root}`] `` — react-label's BEM static,
 * `fui-Label`. That static is gone (DECISIONS.md D16.1) and react-label's public identity
 * class is now its Tailwind named-group marker, `group/fui-label`.
 *
 * Written as a LITERAL rather than re-derived from `labelClassNames.root`, per
 * statics-removal design §2.9: the mixin should read the public contract directly. The `/`
 * is legal in a class token but terminates a class name inside a SELECTOR, so it has to be
 * escaped — `\\/` in this string literal is a single backslash in the emitted selector.
 * (`fuiSelector()` from `@fluentui/react-utilities` does the same escaping for the
 * `'.' + x.root` shape; it does not apply here because this key is a descendant selector,
 * not a bare class selector.)
 */
const v0SpinnerLabelStyle = (): GriffelStyle => ({
  ['& .group\\/fui-label']: {
    fontSize: '14px',
    fontWeight: tokens.fontWeightMedium,
  },
});

export const spinner = {
  v0Inline,
  v0SpinnerLabelStyle,
};
