import * as React from 'react';
import { act, render, screen } from '@testing-library/react';
import { useToastController } from '@fluentui/react-toast';
import type { ToastAnnounce } from '@fluentui/react-toast';
import { isConformant } from '../../../testing/isConformant';
import { Toaster } from './Toaster';

function renderWithController(announce?: ToastAnnounce) {
  let dispatchToast: ReturnType<typeof useToastController>['dispatchToast'];
  const toasterId = 'announcement-toaster';
  const Test = () => {
    dispatchToast = useToastController(toasterId).dispatchToast;
    return (
      <>
        <button>Previous focus</button>
        <Toaster toasterId={toasterId} announce={announce} />
      </>
    );
  };
  render(<Test />);
  return dispatchToast!;
}

describe('Toaster', () => {
  isConformant({
    Component: Toaster,
    displayName: 'Toaster',
    disabledTests: [
      // Toaster is a wrapper that does not expose a single root element.
      'component-has-root-ref',
      'component-handles-ref',
      'component-handles-classname',
      'component-has-static-classnames-object',
      'make-styles-overrides-win',
      // Toaster is exported from `toast.ts` rather than top-level `toaster.ts`.
      'has-top-level-file-extra',
      'export-map-entry-exists',
    ],
  });

  it('mounts polite and assertive live regions on document.body by default', () => {
    const { baseElement } = render(<Toaster />);

    expect(baseElement.querySelector('[aria-live="assertive"]')).not.toBeNull();
    expect(baseElement.querySelector('[aria-live="polite"]')).not.toBeNull();
  });

  it('does not render position containers when there are no toasts', () => {
    const { container } = render(<Toaster />);

    expect(container.querySelector('[data-toaster-position]')).toBeNull();
  });

  it('does not mount its own live region when a custom `announce` prop is supplied', () => {
    const before = document.body.querySelectorAll('[aria-live]').length;

    render(<Toaster announce={jest.fn()} />);

    expect(document.body.querySelectorAll('[aria-live]').length).toBe(before);
  });

  it('passes default and explicit politeness to a custom announcer', () => {
    const announce = jest.fn();
    const dispatchToast = renderWithController(announce);
    const previousFocus = screen.getByRole('button', { name: 'Previous focus' });
    previousFocus.focus();

    act(() => {
      dispatchToast('routine warning', { intent: 'warning', timeout: -1 });
      dispatchToast('critical error', { intent: 'error', politeness: 'assertive', timeout: -1 });
    });

    expect(screen.getByText('routine warning')).toBeInTheDocument();
    expect(screen.getByText('critical error')).toBeInTheDocument();
    expect(previousFocus).toHaveFocus();
    expect(announce).toHaveBeenCalledTimes(2);
    expect(announce).toHaveBeenCalledWith('routine warning', { politeness: 'polite' });
    expect(announce).toHaveBeenCalledWith('critical error', { politeness: 'assertive' });
  });

  it('restores focus inside a shadow root after opening a toast', () => {
    const host = document.createElement('div');
    const previousFocus = document.createElement('button');
    const shadow = host.attachShadow({ mode: 'open' });
    shadow.append(previousFocus);
    document.body.append(host);
    const dispatchToast = renderWithController(jest.fn());

    try {
      previousFocus.focus();
      act(() => {
        dispatchToast('toast', { timeout: -1 });
      });

      expect(shadow.activeElement).toBe(previousFocus);
    } finally {
      host.remove();
    }
  });

  it('keeps focus in an existing toast when another position opens', () => {
    const announce = jest.fn();
    const dispatchToast = renderWithController(announce);

    act(() => {
      dispatchToast(<button>Existing toast action</button>, { position: 'bottom', timeout: -1 });
    });
    const action = screen.getByRole('button', { name: 'Existing toast action' });
    action.focus();

    act(() => {
      dispatchToast('New toast', { position: 'top', timeout: -1 });
    });

    expect(action).toHaveFocus();
    expect(announce).toHaveBeenLastCalledWith('New toast', { politeness: 'polite' });
  });

  it('preserves focus deliberately moved within the toaster while it opens', () => {
    let dispatchToast: ReturnType<typeof useToastController>['dispatchToast'];
    const insideRef = React.createRef<HTMLButtonElement>();
    const Test = () => {
      dispatchToast = useToastController().dispatchToast;
      return (
        <>
          <button>Previous focus</button>
          <Toaster
            announce={jest.fn()}
            onFocus={event => {
              if (!insideRef.current?.contains(event.target)) {
                insideRef.current?.focus();
              }
            }}
          />
        </>
      );
    };
    render(<Test />);
    screen.getByRole('button', { name: 'Previous focus' }).focus();

    act(() => {
      dispatchToast(<button ref={insideRef}>Inside toast</button>, { timeout: -1 });
    });

    expect(insideRef.current).toHaveFocus();
  });

  it('preserves focus deliberately redirected during restoration', () => {
    let dispatchToast: ReturnType<typeof useToastController>['dispatchToast'];
    const insideRef = React.createRef<HTMLButtonElement>();
    const Test = () => {
      dispatchToast = useToastController().dispatchToast;
      return (
        <>
          <button onFocus={() => insideRef.current?.focus()}>Previous focus</button>
          <Toaster announce={jest.fn()} />
        </>
      );
    };
    render(<Test />);
    screen.getByRole('button', { name: 'Previous focus' }).focus();

    act(() => {
      dispatchToast(<button ref={insideRef}>Inside toast</button>, { timeout: -1 });
    });

    expect(insideRef.current).toHaveFocus();
  });

  it('clears polyfill focus when the previous control can no longer be focused', () => {
    let dispatchToast: ReturnType<typeof useToastController>['dispatchToast'];
    const previousRef = React.createRef<HTMLButtonElement>();
    const announce = jest.fn();
    const Test = () => {
      dispatchToast = useToastController().dispatchToast;
      return (
        <>
          <button ref={previousRef}>Previous focus</button>
          <Toaster
            announce={announce}
            onFocus={() => {
              if (previousRef.current) {
                previousRef.current.disabled = true;
              }
            }}
          />
        </>
      );
    };
    render(<Test />);
    previousRef.current?.focus();

    act(() => {
      dispatchToast('toast', { timeout: -1 });
    });

    expect(document.body).toHaveFocus();
    expect(announce).toHaveBeenCalledWith('toast', { politeness: 'polite' });
  });

  it('preserves an autofocus target in the toast', () => {
    const dispatchToast = renderWithController(jest.fn());
    screen.getByRole('button', { name: 'Previous focus' }).focus();

    act(() => {
      dispatchToast(<button autoFocus>Autofocus target</button>, { timeout: -1 });
    });

    expect(screen.getByRole('button', { name: 'Autofocus target' })).toHaveFocus();
  });

  it('honors an autofocus target when opening the popover', () => {
    const dispatchToast = renderWithController(jest.fn());
    screen.getByRole('button', { name: 'Previous focus' }).focus();

    act(() => {
      dispatchToast(<button ref={element => element?.setAttribute('autofocus', '')}>Popover autofocus target</button>, {
        timeout: -1,
      });
    });

    expect(screen.getByRole('button', { name: 'Popover autofocus target' })).toHaveFocus();
  });

  describe('built-in announcements', () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });

    afterEach(() => {
      jest.useRealTimers();
    });

    it('routes default and explicit politeness through DOM live regions', () => {
      const dispatchToast = renderWithController();

      act(() => {
        dispatchToast('routine warning', { intent: 'warning', timeout: -1 });
        dispatchToast('critical error', { intent: 'error', politeness: 'assertive', timeout: -1 });
      });
      act(() => {
        jest.advanceTimersByTime(0);
      });

      const polite = document.body.querySelector<HTMLElement>('[aria-live="polite"] span');
      const assertive = document.body.querySelector<HTMLElement>('[aria-live="assertive"] span');
      expect(document.body).toHaveFocus();
      expect(polite?.innerText).toContain('routine warning');
      expect(assertive?.innerText).toContain('critical error');
    });

    it('uses normal and high native ariaNotify priorities for polite and assertive toasts', () => {
      const previousDescriptor = Object.getOwnPropertyDescriptor(document, 'ariaNotify');
      const ariaNotify = jest.fn();
      Object.defineProperty(document, 'ariaNotify', { configurable: true, value: ariaNotify });

      try {
        const dispatchToast = renderWithController();

        act(() => {
          dispatchToast('routine warning', { intent: 'warning', timeout: -1 });
          dispatchToast('critical error', { intent: 'error', politeness: 'assertive', timeout: -1 });
        });

        expect(ariaNotify).toHaveBeenCalledTimes(2);
        expect(ariaNotify).toHaveBeenCalledWith('routine warning', { priority: 'normal' });
        expect(ariaNotify).toHaveBeenCalledWith('critical error', { priority: 'high' });
      } finally {
        if (previousDescriptor) {
          Object.defineProperty(document, 'ariaNotify', previousDescriptor);
        } else {
          Reflect.deleteProperty(document, 'ariaNotify');
        }
      }
    });
  });

  it('uses list semantics with native block-axis focusgroup navigation', () => {
    let dispatchToast: ReturnType<typeof useToastController>['dispatchToast'];
    const Test = () => {
      dispatchToast = useToastController().dispatchToast;
      return <Toaster />;
    };
    const { getByRole } = render(<Test />);

    act(() => {
      dispatchToast('toast', { timeout: -1 });
    });

    expect(getByRole('list')).toHaveAttribute('focusgroup', 'toolbar block itemcontrols');
  });

  it('limits the number of rendered toasts', () => {
    let dispatchToast: ReturnType<typeof useToastController>['dispatchToast'];
    const toasterId = 'limited-toaster';
    const Test = () => {
      dispatchToast = useToastController(toasterId).dispatchToast;
      return <Toaster toasterId={toasterId} limit={1} />;
    };
    const { queryByText } = render(<Test />);

    act(() => {
      dispatchToast('first toast', { toastId: 'first', timeout: -1 });
      dispatchToast('second toast', { toastId: 'second', timeout: -1 });
    });

    expect(queryByText('first toast')).not.toBeNull();
    expect(queryByText('second toast')).toBeNull();
  });

  it('forwards default toast options to toast state', () => {
    let dispatchToast: ReturnType<typeof useToastController>['dispatchToast'];
    const onStatusChange = jest.fn();
    const toasterId = 'default-options-toaster';
    const Test = () => {
      dispatchToast = useToastController(toasterId).dispatchToast;
      return (
        <Toaster
          toasterId={toasterId}
          position="top"
          timeout={1000}
          pauseOnWindowBlur
          pauseOnHover={false}
          priority={1}
          offset={{ horizontal: 10 }}
        />
      );
    };
    render(<Test />);

    act(() => {
      dispatchToast('toast with defaults', { toastId: 'defaults', onStatusChange });
    });

    expect(onStatusChange).toHaveBeenCalledWith(
      null,
      expect.objectContaining({
        position: 'top',
        timeout: 1000,
        pauseOnWindowBlur: true,
        pauseOnHover: false,
        priority: 1,
      }),
    );
    expect(onStatusChange.mock.calls[0][1]).not.toHaveProperty('offset');
  });
});
