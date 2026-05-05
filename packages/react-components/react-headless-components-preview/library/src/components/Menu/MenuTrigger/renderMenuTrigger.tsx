import { renderMenuTrigger_unstable } from '@fluentui/react-menu';

/**
 * Renders the MenuTrigger by reusing v9's render function, which clones the
 * single child element with the trigger's props and wraps it in
 * `MenuTriggerContextProvider`.
 */
export const renderMenuTrigger = renderMenuTrigger_unstable;
