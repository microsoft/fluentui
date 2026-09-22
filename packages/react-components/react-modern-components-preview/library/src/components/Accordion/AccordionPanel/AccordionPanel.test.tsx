import * as React from 'react';
import { render } from '@testing-library/react';
import { AccordionPanel } from './AccordionPanel';
import { Accordion } from '../Accordion';
import { AccordionItem } from '../AccordionItem';
import { accordionPanelClassNames } from './useAccordionPanelStyles.styles';

describe('AccordionPanel', () => {
  it('renders the stable class name and preserves the consumer class', () => {
    const { getByText } = render(
      <Accordion defaultOpenItems="item">
        <AccordionItem value="item">
          <AccordionPanel className="custom-root" collapseMotion={null}>
            Panel
          </AccordionPanel>
        </AccordionItem>
      </Accordion>,
    );
    const root = getByText('Panel');

    expect(root).toHaveClass(accordionPanelClassNames.root, 'custom-root');
  });

  it('renders a custom collapse motion', () => {
    const { getByTestId } = render(
      <AccordionPanel
        collapseMotion={{
          children: (_, motionProps) => <div data-testid="custom-motion">{motionProps.children}</div>,
        }}
      >
        Panel
      </AccordionPanel>,
    );

    expect(getByTestId('custom-motion')).toHaveTextContent('Panel');
  });

  it('preserves unmount-on-exit when collapse motion is null', () => {
    const { queryByText, queryByTestId } = render(<AccordionPanel collapseMotion={null}>Panel</AccordionPanel>);

    expect(queryByText('Panel')).not.toBeInTheDocument();
    expect(queryByTestId('custom-motion')).not.toBeInTheDocument();
  });
});
