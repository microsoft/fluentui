import { runHeavy } from 'heavy-runtime';

export type WidgetProps = { tag: 'widget' };

// A component whose implementation is dirty but whose type surface is not.
export const Widget = (props: WidgetProps): { tag: 'heavy' } => {
  return runHeavy();
};
