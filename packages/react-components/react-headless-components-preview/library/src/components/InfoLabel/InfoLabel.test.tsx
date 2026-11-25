import * as React from 'react';

import { createPortal } from 'react-dom';
import { renderToString } from 'react-dom/server';
import { fireEvent, render } from '@testing-library/react';
import type { ExtractSlotProps, SlotRenderFunction } from '@fluentui/react-utilities';
import { isConformant } from '../../testing/isConformant';
import { InfoLabel } from './InfoLabel';
import type { InfoButtonProps } from './InfoButton/InfoButton.types';

const strict = (element: React.ReactElement) => <React.StrictMode>{element}</React.StrictMode>;

describe('InfoLabel', () => {
  isConformant({
    Component: InfoLabel,
    displayName: 'InfoLabel',
    primarySlot: 'label',
    testOptions: {
      'has-static-classnames': [
        {
          props: {
            info: 'Test',
          },
        },
      ],
    },
  });

  it('renders an InfoButton when info is set', () => {
    const result = render(<InfoLabel info="Test">Test label</InfoLabel>);
    expect(result.getByRole('button')).toBeTruthy();
  });

  it("renders an InfoButton when the infoButton's info slot is set", () => {
    const result = render(<InfoLabel infoButton={{ info: 'Test' }}>Test label</InfoLabel>);
    expect(result.getByRole('button')).toBeTruthy();
  });

  it('does not render an InfoButton when info is not set', () => {
    const result = render(<InfoLabel>Test label</InfoLabel>);
    expect(result.queryByRole('button')).toBeNull();
  });

  it('sets the infoButton aria-labelledby to the label and infoButton', () => {
    const result = render(<InfoLabel info="Test">Test label</InfoLabel>);

    const infoButton = result.getByRole('button');
    const label = result.getByText('Test label') as HTMLLabelElement;

    expect(infoButton.getAttribute('aria-labelledby')).toBe(`${label.id} ${infoButton.id}`);
  });

  it('uses the trigger details relationship without generating wrapper ownership', () => {
    const { container } = render(
      <InfoLabel className="info-label-wrapper" infoButton={{ popover: { id: 'test-id' } }} info="Test" />,
    );
    expect(container.getElementsByClassName('info-label-wrapper')[0].getAttribute('aria-owns')).toBeNull();

    fireEvent.click(container.getElementsByTagName('button')[0]);

    expect(container.getElementsByClassName('info-label-wrapper')[0]).not.toHaveAttribute('aria-owns');
    expect(container.getElementsByTagName('button')[0]).toHaveAttribute('aria-details', 'test-id');
  });
});

describe('InfoLabel accessibility relationships', () => {
  it('links a portaled note without generating ownership or changing its role', () => {
    const portal = document.createElement('div');
    document.body.appendChild(portal);
    type NoteProps = Extract<ExtractSlotProps<InfoButtonProps['info']>, { as: 'div' }>;
    const renderNote: SlotRenderFunction<NoteProps> = (Component, props) =>
      createPortal(
        <Component {...props} as="div">
          Information
        </Component>,
        portal,
      );
    try {
      const { container, getByRole, unmount } = render(
        strict(
          <InfoLabel
            root={{ id: 'owner' }}
            info={{
              as: 'div',
              children: renderNote,
            }}
            infoButton={{ popover: { defaultOpen: true } }}
          >
            Label
          </InfoLabel>,
        ),
      );
      const note = getByRole('note', { hidden: true });
      expect(portal.contains(note)).toBe(true);
      expect(container.contains(note)).toBe(false);
      expect(getByRole('button')).toHaveAttribute('aria-details', note.id);
      expect(getByRole('button')).not.toHaveAttribute('aria-haspopup');
      expect(container.querySelector('#owner')).not.toHaveAttribute('aria-owns');
      unmount();
    } finally {
      portal.remove();
    }
  });

  it.each(['controlled', 'default'] as const)(
    'renders %s SSR relationships without ownership or menu semantics',
    mode => {
      const markup = renderToString(
        <InfoLabel
          info="Information"
          infoButton={{
            popover: { id: 'popup', ...(mode === 'controlled' ? { open: true } : { defaultOpen: true }) },
          }}
        >
          Label
        </InfoLabel>,
      );
      expect(markup).toContain('aria-expanded="true"');
      expect(markup).toContain('aria-details="popup"');
      expect(markup).not.toContain('aria-haspopup');
      expect(markup).not.toContain('aria-owns');
    },
  );
});
