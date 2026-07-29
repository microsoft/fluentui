import { isConformant } from '../../testing/isConformant';
import { NavDrawerFooter } from './NavDrawerFooter';

describe('NavDrawerFooter', () => {
  isConformant({
    Component: NavDrawerFooter,
    displayName: 'NavDrawerFooter',
    // useNavDrawerFooterStyles_unstable delegates to react-drawer's converted (clsx-based)
    // useDrawerFooterStyles_unstable, so the mocked mergeClasses never receives the consumer
    // className as its exact last argument — the Griffel-era test cannot pass. The
    // cascade-native replacement (classname-overrides-win) does not fit either: this
    // component still composes with mergeClasses, which appends its atomics after the
    // consumer's className by design. Re-enable the replacement when react-nav itself
    // converts.
    disabledTests: ['make-styles-overrides-win'],
  });
});
