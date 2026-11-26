import * as React from 'react';
import { act, render } from '@testing-library/react';
import { Toaster } from './Toaster';
import { isConformant } from '../../testing/isConformant';
import { Toast } from '../Toast/Toast';
import { useToastController } from '../../state/useToastController';
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

  it('does not mutate the style object passed in and keeps toast positions separate', () => {
    // React freezes style objects in development once rendered, so writing to one throws.
    const toasterId = 'style-test-toaster';
    const style = Object.freeze({ zIndex: 5 });
    let controller: ReturnType<typeof useToastController> | undefined;
    const Harness = () => {
      controller = useToastController(toasterId);
      return <Toaster toasterId={toasterId} style={style} />;
    };
    const { container } = render(<Harness />);

    act(() => {
      controller?.dispatchToast(<Toast>start</Toast>, { position: 'bottom-start' });
    });
    act(() => {
      controller?.dispatchToast(<Toast>end</Toast>, { position: 'bottom-end' });
    });

    expect(style).toEqual({ zIndex: 5 });
    const positioned = Array.from(container.ownerDocument.querySelectorAll<HTMLElement>('div')).filter(
      el => el.style.bottom === '16px',
    );
    expect(positioned).toHaveLength(2);
    expect(positioned.every(el => el.style.zIndex === '5')).toBe(true);
    expect(new Set(positioned.map(el => `${el.style.left}|${el.style.right}`)).size).toBe(2);
  });
});
