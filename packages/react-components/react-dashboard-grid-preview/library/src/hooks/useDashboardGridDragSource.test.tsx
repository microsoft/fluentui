import * as React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { DashboardGridProvider } from '../components/DashboardGridProvider/DashboardGridProvider';
import { useDashboardGridDragSource } from './useDashboardGridDragSource';

describe('useDashboardGridDragSource', () => {
  it('wires a provider-scoped keyboard activation callback', async () => {
    const onKeyboardActivate = jest.fn();
    const Source = () => {
      const source = useDashboardGridDragSource<HTMLDivElement>({
        id: 'external',
        descriptor: () => ({ id: 'external', columnSpan: 2 }),
        onKeyboardActivate,
      });
      return (
        <div
          ref={source.sourceRef}
          data-testid="external-source"
          tabIndex={0}
          onKeyDown={source.onKeyDown}
          onPointerDown={source.onPointerDown}
        >
          External source
          <div ref={source.previewRef}>Preview</div>
        </div>
      );
    };

    render(
      <DashboardGridProvider targetDocument={document}>
        <Source />
      </DashboardGridProvider>,
    );
    const root = screen.getByTestId('external-source');
    await waitFor(() => expect(root).toBeInTheDocument());
    fireEvent.keyDown(root, { key: 'Enter' });

    expect(onKeyboardActivate).toHaveBeenCalledWith(
      expect.objectContaining({ id: 'external' }),
      expect.any(KeyboardEvent),
    );
  });
});
