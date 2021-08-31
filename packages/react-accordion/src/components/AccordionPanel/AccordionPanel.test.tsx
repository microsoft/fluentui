import * as React from 'react';
import { AccordionPanel } from './AccordionPanel';
import * as renderer from 'react-test-renderer';
import { ReactWrapper, mount } from 'enzyme';
import { isConformant } from '../../common/isConformant';
import { AccordionItemContext } from '../AccordionItem';
import type { MountRendererProps } from 'enzyme';

describe('AccordionPanel', () => {
  isConformant({
    Component: AccordionPanel,
    displayName: 'AccordionPanel',
    customMount: (node: React.ReactElement, options?: MountRendererProps) =>
      mount(node, {
        ...options,
        wrappingComponent: AccordionItemContext.Provider,
        wrappingComponentProps: { value: { open: true } },
      }),
  });

  let wrapper: ReactWrapper | undefined;

  afterEach(() => {
    if (wrapper) {
      wrapper.unmount();
      wrapper = undefined;
    }
  });

  /**
   * Note: see more visual regression tests for AccordionPanel in /apps/vr-tests.
   */
  it('renders a default state', () => {
    const component = renderer.create(<AccordionPanel>Default AccordionPanel</AccordionPanel>);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
