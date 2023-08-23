import { InteractionTag } from './InteractionTag';
import { isConformant } from '../../testing/isConformant';

const requiredProps = {
  children: 'test',
};

describe('InteractionTag', () => {
  isConformant({
    Component: InteractionTag,
    displayName: 'InteractionTag',
    requiredProps,
  });
});
