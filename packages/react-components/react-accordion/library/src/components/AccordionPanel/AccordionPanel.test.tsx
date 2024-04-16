import * as React from 'react';
import { AccordionPanel } from './AccordionPanel';
import * as renderer from 'react-test-renderer';
import { isConformant } from '../../testing/isConformant';
import { AccordionItemProvider } from '../../contexts/accordionItem';
import { mockAccordionItemContextValue } from '../../testing/mockContextValue';

describe('AccordionPanel', () => {
  const Wrapper: React.FC = props => (
    <AccordionItemProvider
      value={mockAccordionItemContextValue({
        open: true,
      })}
    >
      {props.children}
    </AccordionItemProvider>
  );

  isConformant({
    Component: AccordionPanel,
    displayName: 'AccordionPanel',
    renderOptions: { wrapper: Wrapper },
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
