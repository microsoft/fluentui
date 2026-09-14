import type { Widget } from './widget';

// `typeof Widget` extracts the component's type; it does not consume its runtime.
export type WidgetSlots = { widget: typeof Widget };

export type WidgetHostProps = { slots: WidgetSlots };
