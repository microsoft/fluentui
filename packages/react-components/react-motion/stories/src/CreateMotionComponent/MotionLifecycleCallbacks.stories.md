A React component created with `createMotionComponent` has the following lifecycle callbacks:

- `onMotionStart` \- This is called when any motion has started
- `onMotionFinish` \- This is called when all motions have finished
- `onMotionCancel` \- This is called when the motion is cancelled, this called instead of `onMotionFinish`. This can happen when the motion component is unmounted before the full motion is finished.

These callbacks can be useful when orchestrating motions or running side effects resulting from a motion.
