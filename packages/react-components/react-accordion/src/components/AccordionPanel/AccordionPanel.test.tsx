import * as React from 'react';
import { AccordionPanel } from './AccordionPanel';
import * as renderer from 'react-test-renderer';
import { isConformant } from '../../common/isConformant';
import { AccordionItemContext } from '../AccordionItem';

describe('AccordionPanel', () => {
  const Wrapper: React.FC = props => (
    <AccordionItemContext.Provider value={{ open: true, disabled: false, onHeaderClick: () => undefined }}>
      {props.children}
    </AccordionItemContext.Provider>
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
