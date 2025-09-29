import { unstable_NormalPriority as NormalPriority, unstable_runWithPriority as runWithPriority } from 'scheduler';

export function runWithNormalPriority(thunk: () => void) {
  return runWithPriority(NormalPriority, thunk);
}
