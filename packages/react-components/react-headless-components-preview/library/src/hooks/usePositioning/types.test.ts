import type { AutoSize } from '@fluentui/react-positioning';
import type { PositioningProps } from './types';

describe('PositioningProps', () => {
  it('accepts every autoSize value the canonical positioning package accepts', () => {
    // Migrating consumers pass their existing `positioning` object through unchanged, so the
    // headless surface must not reject any value `@fluentui/react-positioning` accepts — including
    // the obsolete `-always` aliases.
    const values: AutoSize[] = [true, false, 'always', 'height', 'height-always', 'width', 'width-always'];
    const props: PositioningProps[] = values.map(autoSize => ({ autoSize }));

    expect(props).toHaveLength(values.length);
  });

  it('leaves autoSize optional', () => {
    const props: PositioningProps = { position: 'below' };

    expect(props.autoSize).toBeUndefined();
  });
});
