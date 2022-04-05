import { resetIdsForTests } from '@fluentui/react-utilities';
import * as React from 'react';
import { AccordionHeader } from './AccordionHeader';
import { AccordionHeaderProps } from './AccordionHeader.types';
import * as renderer from 'react-test-renderer';
import { isConformant } from '../../common/isConformant';
import { Accordion } from '../Accordion/Accordion';
import { AccordionItem } from '../AccordionItem';
import { AccordionPanel } from '../AccordionPanel';

describe('AccordionHeader', () => {
  isConformant<AccordionHeaderProps>({
    Component: AccordionHeader,
    displayName: 'AccordionHeader',
    testOptions: {
      'has-static-classnames': [
        {
          props: {
            icon: 'Test Icon',
          },
        },
      ],
    },
  });

  afterEach(() => {
    resetIdsForTests();
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
      <Accordion collapsible openItems={0} onToggle={mockClick}>
        <AccordionItem value={0}>
          <AccordionHeader button={{ onClick: mockClick }}>Header</AccordionHeader>
          <AccordionPanel>Panel</AccordionPanel>
        </AccordionItem>
      </Accordion>,
    );
    renderer.act(() => {
      component.root.findAllByType('button')[0].props.onClick({ defaultPrevented: false });
    });
    expect(mockClick).toBeCalledTimes(2);
  });

  it('should invoke click and prevent toggle', () => {
    const mockClick = jest.fn();
    const component = renderer.create(
      <Accordion collapsible openItems={0} onToggle={mockClick}>
        <AccordionItem value={0}>
          <AccordionHeader button={{ onClick: mockClick }}>Header</AccordionHeader>
          <AccordionPanel>Panel</AccordionPanel>
        </AccordionItem>
      </Accordion>,
    );
    renderer.act(() => {
      component.root.findAllByType('button')[0].props.onClick({ defaultPrevented: true });
    });
    expect(mockClick).toBeCalledTimes(1);
  });
});
