A React component created with `createPresenceComponent` has the following lifecycle callbacks

- `onMotionStart` \- This is called when any motion has started
- `onMotionFinish` \- This is called when all motions have finished

These callbacks can be useful when orchestrating motions or running side effects resulting from a motion.
The lifecycle callbacks apply to both `enter` and `exit` motion definitions.
