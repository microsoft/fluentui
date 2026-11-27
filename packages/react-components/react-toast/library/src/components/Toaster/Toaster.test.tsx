import * as React from 'react';
import { act, render } from '@testing-library/react';
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

  it('should not write the position styles into the style prop', () => {
    const style = { zIndex: 5 };
    let dispatchToast: ReturnType<typeof useToastController>['dispatchToast'];
    const Test = () => {
      dispatchToast = useToastController().dispatchToast;
      return <Toaster style={style} />;
    };
    const { baseElement } = render(<Test />);

    act(() => {
      dispatchToast('first toast', { position: 'bottom-end', timeout: -1 });
    });
    // The Toaster renders again with the same style object, which React freezes in development
    act(() => {
      dispatchToast('second toast', { position: 'bottom-end', timeout: -1 });
    });

    const toaster = baseElement.querySelector<HTMLElement>('[data-toaster-position="bottom-end"]');

    expect(style).toEqual({ zIndex: 5 });
    expect(toaster?.style.zIndex).toBe('5');
    expect(toaster?.style.right).toBe('20px');
  });
});
