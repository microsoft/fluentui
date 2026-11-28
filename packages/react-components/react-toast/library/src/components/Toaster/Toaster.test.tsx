import * as React from 'react';
import { act, fireEvent, render } from '@testing-library/react';
import { Toaster } from './Toaster';
import { isConformant } from '../../testing/isConformant';
import { useToastController } from '../../state';
import type { ToasterProps } from './Toaster.types';

describe('Toaster', () => {
  const testid = 'test';
  isConformant<ToasterProps>({
    Component: Toaster,
    displayName: 'Toaster',
    requiredProps: { 'data-testid': testid } as ToasterProps,
    getTargetElement: result => result.getByTestId(testid),
    disabledTests: [
      // The component does not forward refs
      'component-has-root-ref',
      'component-handles-ref',
      // FIXME: can't find a way to dispatch a toast during a conformance test
      'component-has-static-classnames-object',
      'component-handles-classname',
      'make-styles-overrides-win',
    ],
  });

  it('renders a default state', () => {
    const result = render(<Toaster />);
    expect(result.container).toMatchSnapshot();
  });

  it('does not strand the queue when a toast is dismissed before rendering', () => {
    let controller: ReturnType<typeof useToastController>;
    const Test = () => {
      controller = useToastController('batched-dismiss');
      return <Toaster toasterId="batched-dismiss" limit={1} />;
    };
    const { getByRole, queryByText } = render(<Test />);

    act(() => {
      controller.dispatchToast('first', { toastId: 'first', timeout: -1 });
      controller.dispatchToast('second', { toastId: 'second', timeout: -1 });
      controller.dismissToast('first');
      controller.dispatchToast('third', { toastId: 'third', timeout: -1 });
    });

    expect(getByRole('listitem').textContent).toBe('second');
    expect(queryByText('third')).toBeNull();
  });

  it('reports a toast dismissed before rendering only once on Escape', () => {
    let controller: ReturnType<typeof useToastController>;
    const onStatusChange = jest.fn();
    const Test = () => {
      controller = useToastController('escape-before-render');
      return <Toaster toasterId="escape-before-render" />;
    };
    const { getByRole } = render(<Test />);

    act(() =>
      controller.dispatchToast(
        <button onKeyDown={() => controller.dispatchToast('new toast', { timeout: -1, onStatusChange })}>
          trigger
        </button>,
        { timeout: -1 },
      ),
    );
    fireEvent.keyDown(getByRole('button', { name: 'trigger' }), { key: 'Escape' });

    expect(onStatusChange.mock.calls.filter(([, data]) => data.status === 'dismissed')).toHaveLength(1);
  });
});
