import { resetIdsForTests } from '@fluentui/react-utilities';
import * as React from 'react';
import { AccordionHeader } from './AccordionHeader';
import * as renderer from 'react-test-renderer';
import { ReactWrapper } from 'enzyme';
import { isConformant } from '../../common/isConformant';
import { AccordionHeaderContext } from './AccordionHeaderContext';
import { Accordion } from '../Accordion/Accordion';
import { AccordionItem } from '../AccordionItem';
import { AccordionPanel } from '../AccordionPanel';

describe('AccordionHeader', () => {
  isConformant({
    Component: AccordionHeader,
    displayName: 'AccordionHeader',
    helperComponents: [AccordionHeaderContext.Provider],
  });

  let wrapper: ReactWrapper | undefined;

  afterEach(() => {
    resetIdsForTests();

    if (wrapper) {
      wrapper.unmount();
      wrapper = undefined;
    }
  });

  /**
   * Note: see more visual regression tests for AccordionHeader in /apps/vr-tests.
   */
  it('renders a default state', () => {
    const component = renderer.create(<AccordionHeader>Default AccordionHeader</AccordionHeader>);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should invoke click and toggle', () => {
    const mockClick = jest.fn();
    const component = renderer.create(
      <Accordion index={0} onToggle={mockClick}>
        <AccordionItem>
          <AccordionHeader button={{ onClick: mockClick }}>Header</AccordionHeader>
          <AccordionPanel>Panel</AccordionPanel>
        </AccordionItem>
      </Accordion>,
    );
    renderer.act(() => {
      component.root.findByType('button').props.onClick({ defaultPrevented: false });
    });
    expect(mockClick).toBeCalledTimes(2);
  });

  it('should invoke click and prevent toggle', () => {
    const mockClick = jest.fn();
    const component = renderer.create(
      <Accordion index={0} onToggle={mockClick}>
        <AccordionItem>
          <AccordionHeader button={{ onClick: mockClick }}>Header</AccordionHeader>
          <AccordionPanel>Panel</AccordionPanel>
        </AccordionItem>
      </Accordion>,
    );
    renderer.act(() => {
      component.root.findByType('button').props.onClick({ defaultPrevented: true });
    });
    expect(mockClick).toBeCalledTimes(1);
  });
});
