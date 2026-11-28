import * as React from 'react';
import { act, fireEvent, render } from '@testing-library/react';
import { flushSync } from 'react-dom';
import { useToastController } from '@fluentui/react-toast';
import type { ToastChangeHandler } from '@fluentui/react-toast';
import { isConformant } from '../../../testing/isConformant';
import { Toaster } from './Toaster';

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

  it('mounts an aria-live region on document.body by default', () => {
    // AriaLiveAnnouncer attaches its live region directly to document.body
    // (not inside the Toaster's React tree) so a single shared region serves
    // the whole app. The DOM fallback path only renders an assertive region;
    // polite messages on browsers without `ariaNotify` are announced assertively.
    const { baseElement } = render(<Toaster />);

    expect(baseElement.querySelector('[aria-live="assertive"]')).not.toBeNull();
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

  it('shows a queued toast once a visible toast is dismissed', () => {
    let controller: ReturnType<typeof useToastController>;
    const onStatusChange = jest.fn();
    const toasterId = 'queued-toaster';
    const Test = () => {
      controller = useToastController(toasterId);
      return <Toaster toasterId={toasterId} limit={1} />;
    };
    const { queryByText } = render(<Test />);

    act(() => {
      controller.dispatchToast('first toast', { toastId: 'first', timeout: -1 });
      controller.dispatchToast('second toast', { toastId: 'second', timeout: -1, onStatusChange });
    });

    expect(queryByText('second toast')).toBeNull();
    expect(onStatusChange).not.toHaveBeenCalledWith(null, expect.objectContaining({ status: 'dismissed' }));

    act(() => {
      controller.dismissToast('first');
    });

    expect(queryByText('first toast')).toBeNull();
    expect(queryByText('second toast')).not.toBeNull();
    expect(onStatusChange).toHaveBeenLastCalledWith(null, expect.objectContaining({ status: 'visible' }));
  });

  it('promotes a queued toast when the first toast is dismissed before rendering', () => {
    let controller: ReturnType<typeof useToastController>;
    const onStatusChange = jest.fn();
    const toasterId = 'cancel-before-render-toaster';
    const Test = () => {
      controller = useToastController(toasterId);
      return <Toaster toasterId={toasterId} limit={1} />;
    };
    const { queryByText } = render(<Test />);

    act(() => {
      controller.dispatchToast('first toast', { toastId: 'first', timeout: -1, onStatusChange });
      controller.dispatchToast('second toast', { toastId: 'second', timeout: -1 });
      controller.dismissToast('first');
    });

    expect(queryByText('first toast')).toBeNull();
    expect(queryByText('second toast')).not.toBeNull();
    expect(onStatusChange.mock.calls.map(([, data]) => data.status)).toEqual(['queued', 'dismissed', 'unmounted']);

    act(() => {
      controller.dismissToast('second');
      controller.dispatchToast('reused toast', { toastId: 'first', timeout: -1 });
    });

    expect(queryByText('reused toast')).not.toBeNull();
  });

  it('removes all toasts dismissed before rendering so their ids can be reused', () => {
    let controller: ReturnType<typeof useToastController>;
    const onStatusChange = jest.fn();
    const toasterId = 'dismiss-all-before-render-toaster';
    const Test = () => {
      controller = useToastController(toasterId);
      return <Toaster toasterId={toasterId} limit={1} />;
    };
    const { queryByText } = render(<Test />);

    act(() => {
      controller.dispatchToast('first toast', { toastId: 'first', timeout: -1, onStatusChange });
      controller.dispatchToast('second toast', { toastId: 'second', timeout: -1, onStatusChange });
      controller.dismissAllToasts();
    });

    expect(queryByText('first toast')).toBeNull();
    expect(queryByText('second toast')).toBeNull();
    expect(onStatusChange.mock.calls.filter(([, data]) => data.status === 'dismissed')).toHaveLength(2);

    act(() => {
      controller.dispatchToast('reused toast', { toastId: 'first', timeout: -1 });
    });

    expect(queryByText('reused toast')).not.toBeNull();
  });

  it('promotes an existing queued toast before a dismissal callback dispatches another', () => {
    let controller: ReturnType<typeof useToastController>;
    const toasterId = 'dismiss-callback-toaster';
    const Test = () => {
      controller = useToastController(toasterId);
      return <Toaster toasterId={toasterId} limit={1} />;
    };
    const { queryByText } = render(<Test />);
    const onStatusChange: ToastChangeHandler = (_, { status }) => {
      if (status === 'dismissed') {
        controller.dispatchToast('third toast', { toastId: 'third', timeout: -1 });
      }
    };

    act(() => {
      controller.dispatchToast('first toast', { toastId: 'first', timeout: -1, onStatusChange });
      controller.dispatchToast('second toast', { toastId: 'second', timeout: -1 });
      controller.dismissToast('first');
    });

    expect(queryByText('second toast')).not.toBeNull();
    expect(queryByText('third toast')).toBeNull();

    act(() => {
      controller.dismissToast('second');
    });

    expect(queryByText('third toast')).not.toBeNull();
  });

  it('keeps new arrivals behind queued toasts when dismissal is batched', () => {
    let controller: ReturnType<typeof useToastController>;
    const toasterId = 'batched-arrival-toaster';
    const Test = () => {
      controller = useToastController(toasterId);
      return <Toaster toasterId={toasterId} limit={1} />;
    };
    const { queryByText } = render(<Test />);

    act(() => {
      controller.dispatchToast('first toast', { toastId: 'first', timeout: -1 });
      controller.dispatchToast('second toast', { toastId: 'second', timeout: -1 });
      controller.dismissToast('first');
      controller.dispatchToast('third toast', { toastId: 'third', timeout: -1 });
    });

    expect(queryByText('second toast')).not.toBeNull();
    expect(queryByText('third toast')).toBeNull();
  });

  it('cleans up a same-id replacement dismissed before it renders', () => {
    let controller: ReturnType<typeof useToastController>;
    const toasterId = 'same-id-replacement-toaster';
    const Test = () => {
      controller = useToastController(toasterId);
      return <Toaster toasterId={toasterId} limit={1} />;
    };
    const { queryByText } = render(<Test />);
    const onStatusChange: ToastChangeHandler = (_, { status }) => {
      if (status === 'dismissed') {
        controller.dispatchToast('replacement toast', { toastId: 'first', timeout: -1 });
        controller.dismissAllToasts();
      }
    };

    act(() => {
      controller.dispatchToast('first toast', { toastId: 'first', timeout: -1, onStatusChange });
      controller.dispatchToast('second toast', { toastId: 'second', timeout: -1 });
      controller.dismissToast('first');
    });

    act(() => {
      controller.dispatchToast('reused toast', { toastId: 'first', timeout: -1 });
    });

    expect(queryByText('reused toast')).not.toBeNull();
  });

  it('dismisses queued toasts on Escape without promoting them', () => {
    let controller: ReturnType<typeof useToastController>;
    const firstStatus = jest.fn();
    const secondStatus = jest.fn();
    const toasterId = 'escape-queued-toaster';
    const Test = () => {
      controller = useToastController(toasterId);
      return <Toaster toasterId={toasterId} limit={1} />;
    };
    const { getByRole, queryByText } = render(<Test />);

    act(() => {
      controller.dispatchToast('first toast', { toastId: 'first', timeout: -1, onStatusChange: firstStatus });
      controller.dispatchToast('second toast', { toastId: 'second', timeout: -1, onStatusChange: secondStatus });
    });
    fireEvent.keyDown(getByRole('listitem'), { key: 'Escape' });

    expect(queryByText('first toast')).toBeNull();
    expect(queryByText('second toast')).toBeNull();
    expect(firstStatus.mock.calls.filter(([, data]) => data.status === 'dismissed')).toHaveLength(1);
    expect(secondStatus.mock.calls.filter(([, data]) => data.status === 'dismissed')).toHaveLength(1);

    act(() => controller.dispatchToast('reused toast', { toastId: 'second', timeout: -1 }));
    expect(queryByText('reused toast')).not.toBeNull();
  });

  it('reports a batched dismissal once when another dismissal triggers Escape', async () => {
    let controller: ReturnType<typeof useToastController>;
    const secondStatus = jest.fn();
    const Test = () => {
      controller = useToastController('reentrant-escape');
      return <Toaster toasterId="reentrant-escape" />;
    };
    const { getByText } = render(<Test />);

    await act(async () => {
      controller.dispatchToast('first', {
        toastId: 'first',
        timeout: -1,
        onStatusChange: (_, data) => {
          if (data.status === 'dismissed') {
            getByText('third').dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
          }
        },
      });
      controller.dispatchToast('second', { toastId: 'second', timeout: -1, onStatusChange: secondStatus });
      controller.dispatchToast('third', { toastId: 'third', timeout: -1 });
    });

    await act(async () => {
      controller.dismissToast('first');
      controller.dismissToast('second');
    });

    expect(secondStatus.mock.calls.filter(([, data]) => data.status === 'dismissed')).toHaveLength(1);
  });

  it('reports dismissal before unmount when a callback synchronously renders a replacement', () => {
    let controller: ReturnType<typeof useToastController>;
    const secondStatus = jest.fn();
    const Test = () => {
      controller = useToastController('synchronous-escape');
      return <Toaster toasterId="synchronous-escape" />;
    };
    const { getByText } = render(<Test />);

    act(() => {
      controller.dispatchToast('first', {
        toastId: 'first',
        timeout: -1,
        onStatusChange: (_, data) => {
          if (data.status === 'dismissed') {
            flushSync(() => controller.dispatchToast('replacement', { toastId: 'replacement', timeout: -1 }));
          }
        },
      });
      controller.dispatchToast('second', { toastId: 'second', timeout: -1, onStatusChange: secondStatus });
    });
    fireEvent.keyDown(getByText('first'), { key: 'Escape' });

    expect(secondStatus.mock.calls.map(([, data]) => data.status)).toEqual([
      'queued',
      'visible',
      'dismissed',
      'unmounted',
    ]);
  });

  it('runs same-batch dismissal callbacks after the commit', async () => {
    let controller: ReturnType<typeof useToastController>;
    const focusResults: boolean[] = [];
    const Test = () => {
      controller = useToastController('dismiss-before-render-focus');
      return <Toaster toasterId="dismiss-before-render-focus" />;
    };
    const { queryByText } = render(<Test />);

    await act(async () => {
      controller.dispatchToast('first', {
        toastId: 'first',
        timeout: -1,
        onStatusChange: (_, data) => {
          if (data.status === 'dismissed') {
            flushSync(() =>
              controller.dispatchToast(<button>replacement</button>, { toastId: 'replacement', timeout: -1 }),
            );
            const replacement = queryByText('replacement');
            replacement?.focus();
            focusResults.push(!!replacement && document.activeElement === replacement);
          }
        },
      });
      controller.dismissToast('first');
    });

    expect(focusResults).toEqual([true]);
  });

  it('does not report a queued toast unmounted during StrictMode effect replay', async () => {
    let controller: ReturnType<typeof useToastController>;
    const onStatusChange = jest.fn();
    const toasterId = 'strict-mode-queued-toaster';
    const Test = () => {
      controller = useToastController(toasterId);
      return (
        <React.StrictMode>
          <Toaster toasterId={toasterId} limit={1} />
        </React.StrictMode>
      );
    };
    const { queryByText } = render(<Test />);

    await act(async () => {
      controller.dispatchToast('first', { toastId: 'first', timeout: -1 });
      controller.dispatchToast('second', { toastId: 'second', timeout: -1, onStatusChange });
    });

    expect(onStatusChange.mock.calls.map(([, data]) => data.status)).toEqual(['queued']);

    await act(async () => {
      controller.dismissToast('first');
    });

    expect(queryByText('second')).not.toBeNull();
    expect(onStatusChange.mock.calls.map(([, data]) => data.status)).toEqual(['queued', 'visible']);
  });

  it('reports visible using the callback and content from the committed render', () => {
    let controller: ReturnType<typeof useToastController>;
    const reports: Array<{ callback: string; content: string | null }> = [];
    const Test = () => {
      controller = useToastController('committed-visible');
      return <Toaster toasterId="committed-visible" />;
    };
    const { queryByText } = render(<Test />);
    const record =
      (callback: string): ToastChangeHandler =>
      (_, data) => {
        if (data.status === 'visible') {
          const content = queryByText('second old')?.textContent ?? queryByText('second new')?.textContent ?? null;
          reports.push({ callback, content });
        }
      };

    act(() => {
      controller.dispatchToast('first', {
        toastId: 'first',
        timeout: -1,
        onStatusChange: (_, data) => {
          if (data.status === 'visible') {
            controller.updateToast({ toastId: 'second', content: 'second new', onStatusChange: record('new') });
          }
        },
      });
      controller.dispatchToast('second old', { toastId: 'second', timeout: -1, onStatusChange: record('old') });
    });

    expect(reports).toEqual([
      { callback: 'old', content: 'second old' },
      { callback: 'new', content: 'second new' },
    ]);
  });

  it('runs pending dismissal callbacks outside an unmount commit', () => {
    let controller: ReturnType<typeof useToastController>;
    const focusResults: boolean[] = [];
    const Test = () => {
      controller = useToastController('dismiss-outside-commit');
      return <Toaster toasterId="dismiss-outside-commit" />;
    };
    const { getByText, queryByText } = render(<Test />);

    act(() => {
      controller.dispatchToast('first', {
        toastId: 'first',
        timeout: -1,
        onStatusChange: (_, data) => {
          if (data.status === 'dismissed') {
            flushSync(() =>
              controller.dispatchToast('first replacement', { toastId: 'first-replacement', timeout: -1 }),
            );
          }
        },
      });
      controller.dispatchToast('second', {
        toastId: 'second',
        timeout: -1,
        onStatusChange: (_, data) => {
          if (data.status === 'dismissed') {
            flushSync(() =>
              controller.dispatchToast(<button>second replacement</button>, {
                toastId: 'second-replacement',
                timeout: -1,
              }),
            );
            const replacement = queryByText('second replacement');
            replacement?.focus();
            focusResults.push(!!replacement && document.activeElement === replacement);
          }
        },
      });
    });
    fireEvent.keyDown(getByText('first'), { key: 'Escape' });

    expect(focusResults).toEqual([true]);
  });

  it('uses the updated callback for dismissal and the committed callback for unmount', () => {
    let controller: ReturnType<typeof useToastController>;
    const oldStatus = jest.fn();
    const updatedStatus = jest.fn();
    const Test = () => {
      controller = useToastController('updated-callback-escape');
      return <Toaster toasterId="updated-callback-escape" />;
    };
    const { getByText } = render(<Test />);

    act(() => {
      controller.dispatchToast('first', {
        toastId: 'first',
        timeout: -1,
        onStatusChange: (_, data) => {
          if (data.status === 'dismissed') {
            flushSync(() => controller.dispatchToast('replacement', { toastId: 'replacement', timeout: -1 }));
          }
        },
      });
      controller.dispatchToast('second', { toastId: 'second', timeout: -1, onStatusChange: oldStatus });
    });

    act(() => {
      controller.updateToast({ toastId: 'second', onStatusChange: updatedStatus });
      getByText('first').dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
    });

    expect(oldStatus).not.toHaveBeenCalledWith(null, expect.objectContaining({ status: 'dismissed' }));
    expect(updatedStatus).toHaveBeenCalledWith(
      null,
      expect.objectContaining({ status: 'dismissed', updateId: 1, onStatusChange: updatedStatus }),
    );
    expect(updatedStatus.mock.calls.map(([, data]) => data.status)).toEqual(['dismissed']);
    expect(oldStatus.mock.calls.map(([, data]) => data.status)).toEqual(['queued', 'visible', 'unmounted']);
  });

  it('reports dismissal when the toaster unmounts during an Escape handler', () => {
    let controller: ReturnType<typeof useToastController>;
    const onStatusChange = jest.fn();
    const Test = () => {
      const [mounted, setMounted] = React.useState(true);
      controller = useToastController('unmount-on-escape');
      return mounted ? <Toaster toasterId="unmount-on-escape" onKeyDown={() => setMounted(false)} /> : null;
    };
    const { getByRole } = render(<Test />);

    act(() => {
      controller.dispatchToast('toast', { toastId: 'toast', timeout: -1, onStatusChange });
    });
    fireEvent.keyDown(getByRole('listitem'), { key: 'Escape' });

    expect(onStatusChange).toHaveBeenCalledWith(null, expect.objectContaining({ status: 'dismissed' }));
  });

  it('keeps a toast dispatched by a dismissal callback on Escape', () => {
    let controller: ReturnType<typeof useToastController>;
    const dismissed = jest.fn();
    const Test = () => {
      controller = useToastController('escape-dismissal-reentrancy');
      return <Toaster toasterId="escape-dismissal-reentrancy" />;
    };
    const { getByRole, queryByText } = render(<Test />);
    const onStatusChange: ToastChangeHandler = (_, data) => {
      if (data.status === 'dismissed') {
        dismissed();
        if (dismissed.mock.calls.length < 3) {
          controller.dispatchToast('replacement', {
            toastId: `replacement-${dismissed.mock.calls.length}`,
            timeout: -1,
            onStatusChange,
          });
        }
      }
    };

    act(() => controller.dispatchToast('first', { toastId: 'first', timeout: -1, onStatusChange }));
    fireEvent.keyDown(getByRole('listitem'), { key: 'Escape' });

    expect(dismissed).toHaveBeenCalledTimes(1);
    expect(queryByText('replacement')).not.toBeNull();
  });

  it('keeps a toast dispatched when Escape restores focus', async () => {
    let controller: ReturnType<typeof useToastController>;
    let dispatchOnFocus = false;
    const focusDispatch = jest.fn();
    const Test = () => {
      controller = useToastController('escape-focus-reentrancy');
      return (
        <>
          <button
            onFocus={() => {
              if (dispatchOnFocus) {
                focusDispatch();
                controller.dispatchToast('focus replacement', { toastId: 'focus-replacement', timeout: -1 });
              }
            }}
          >
            trigger
          </button>
          <Toaster toasterId="escape-focus-reentrancy" shortcuts={{ focus: e => e.key === 'F2' }} />
        </>
      );
    };
    const { getByRole, getByText, queryByText } = render(<Test />);
    const trigger = getByText('trigger');
    const focus = jest.spyOn(trigger, 'focus');
    act(() => controller.dispatchToast('first', { toastId: 'first', timeout: -1 }));
    act(() => trigger.focus());
    expect(trigger).toHaveFocus();
    await act(async () => {
      fireEvent.keyDown(document, { key: 'F2' });
    });
    expect(getByRole('listitem')).toHaveFocus();
    dispatchOnFocus = true;
    fireEvent.keyDown(getByRole('listitem'), { key: 'Escape' });

    expect(focus).toHaveBeenCalledTimes(2);
    expect(trigger).toHaveFocus();
    expect(focusDispatch).toHaveBeenCalledTimes(1);
    expect(queryByText('focus replacement')).not.toBeNull();
  });

  it('accepts a same-id replacement dispatched when Escape dismisses a toast', () => {
    let controller: ReturnType<typeof useToastController>;
    let replaced = false;
    const dismissed = jest.fn();
    const Test = () => {
      controller = useToastController('escape-same-id-replacement');
      return <Toaster toasterId="escape-same-id-replacement" />;
    };
    const { getByRole, queryByText } = render(<Test />);

    act(() =>
      controller.dispatchToast('first', {
        toastId: 'same',
        timeout: -1,
        onStatusChange: (_, data) => {
          if (data.status === 'dismissed') {
            dismissed();
            if (!replaced) {
              replaced = true;
              controller.dispatchToast('replacement', { toastId: 'same', timeout: -1 });
            }
          }
        },
      }),
    );
    fireEvent.keyDown(getByRole('listitem'), { key: 'Escape' });

    expect(dismissed).toHaveBeenCalledTimes(1);
    expect(queryByText('replacement')).not.toBeNull();
  });

  it('keeps toast instances distinct when lifecycle data is reused', () => {
    let controller: ReturnType<typeof useToastController>;
    const secondStatus = jest.fn();
    const consoleError = jest.spyOn(console, 'error').mockImplementation(() => undefined);
    const Test = () => {
      controller = useToastController('reused-lifecycle-data');
      return <Toaster toasterId="reused-lifecycle-data" />;
    };
    try {
      const { queryByText } = render(<Test />);

      act(() => {
        controller.dispatchToast('first toast', {
          toastId: 'first',
          timeout: -1,
          onStatusChange: (_, data) => {
            if (data.status === 'visible') {
              controller.dispatchToast('second toast', { ...data, toastId: 'second', onStatusChange: secondStatus });
            }
          },
        });
      });
      act(() => controller.dismissToast('first'));

      expect(queryByText('second toast')).not.toBeNull();
      expect(secondStatus).toHaveBeenCalledWith(null, expect.objectContaining({ status: 'queued' }));
      expect(secondStatus).not.toHaveBeenCalledWith(null, expect.objectContaining({ status: 'unmounted' }));
      expect(consoleError).not.toHaveBeenCalled();
    } finally {
      consoleError.mockRestore();
    }
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
