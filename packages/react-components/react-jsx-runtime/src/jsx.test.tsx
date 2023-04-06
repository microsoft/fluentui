/* eslint-disable jsdoc/check-tag-names */
/** @jsxRuntime classic */
/** @jsxFrag Fragment */
/** @jsx jsx */
/* eslint-enable jsdoc/check-tag-names */

import {
  ComponentProps,
  ComponentState,
  Slot,
  getSlots,
  getSlotsNext,
  resolveShorthand,
} from '@fluentui/react-utilities';
import { jsx, Fragment } from './index';
import { render } from '@testing-library/react';

type TestComponentSlots = { slot: Slot<'div'> };
type TestComponentState = ComponentState<TestComponentSlots>;
type TestComponentProps = ComponentProps<Partial<TestComponentSlots>> & {
  getSlots: typeof getSlots;
};

const TestComponent = (props: TestComponentProps) => {
  const state: TestComponentState = {
    components: {
      slot: 'div',
    },
    slot: resolveShorthand(
      props.slot ?? {
        children: (C, p) => (
          <>
            <div>before</div>
            <C {...p} />
            <div>after</div>
          </>
        ),
      },
      {
        required: true,
        defaultProps: {
          children: <div>this is internal children</div>,
        },
      },
    ),
  };
  const { slots, slotProps } = props.getSlots<TestComponentSlots>(state);
  return <slots.slot {...slotProps.slot} />;
};

describe('jsx', () => {
  it('should lose internal children while using getSlots', () => {
    const result = render(<TestComponent getSlots={getSlots} />);
    expect(result.container).toMatchInlineSnapshot(`
      <div>
        <div>
          before
        </div>
        <div />
        <div>
          after
        </div>
      </div>
    `);
  });
  it('should keep internal children while using getSlotsNext', () => {
    const result = render(<TestComponent getSlots={getSlotsNext} />);
    expect(result.container).toMatchInlineSnapshot(`
      <div>
        <div>
          before
        </div>
        <div>
          <div>
            this is internal children
          </div>
        </div>
        <div>
          after
        </div>
      </div>
    `);
  });
});
