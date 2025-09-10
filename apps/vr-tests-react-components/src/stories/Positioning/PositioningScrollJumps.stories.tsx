import * as React from 'react';
import { usePositioning } from '@fluentui/react-positioning';
import { createContext, useContextSelector } from '@fluentui/react-context-selector';
import * as ReactDOM from 'react-dom';
import { Steps, StoryWright } from 'storywright';

import { Box } from './utils';

const ScrollJump: React.FC = () => {
  const buttonRef = React.useRef<HTMLButtonElement>(null);
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    if (open && buttonRef.current) {
      const scrollY = window.scrollY;
      buttonRef.current.focus();

      setTimeout(() => {
        const element = document.querySelector<HTMLElement>(
          scrollY === window.scrollY ? '#test-passed' : '#test-failed',
        );

        if (element) {
          element.style.setProperty('display', 'block');
          element.setAttribute('id', 'test-completed');
        }
      }, 500);
    }
  }, [open]);

  const { containerRef, targetRef } = usePositioning({
    position: 'above',
    align: 'start',
  });

  const floating = ReactDOM.createPortal(
    <Box ref={containerRef}>
      Focusable element <button ref={buttonRef}>Focus me</button>
    </Box>,
    document.body,
  );

  return (
    <>
      <div
        style={{
          position: 'fixed',
          top: 10,
          left: 100,
          right: 100,

          background: 'white',
        }}
      >
        <p style={{ fontWeight: 20, border: '8px dotted magenta', padding: 10, margin: 0 }}>
          This example simulates a scroll jump on autofocus when opening a floating element. The example uses a layout
          effect to focus on the content of the floating box before usePopper is called. This results in the focus
          executing before the layout effect to position the floating is executed. The scroll jump is fixed internally
          in usePositioning by using position: fixed on the floating element before it is first positioned.
        </p>
        <div
          id="test-failed"
          style={{
            border: '8px dotted magenta',
            borderTop: 'none',
            padding: 10,
            fontSize: 20,
            color: 'red',
            display: 'none',
          }}
        >
          Test failed, scroll jump occurred 💥
        </div>
        <div
          id="test-passed"
          style={{
            border: '8px dotted magenta',
            borderTop: 'none',
            padding: 10,
            fontSize: 20,
            color: 'green',
            display: 'none',
          }}
        >
          Test passed ✅
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          background: 'repeating-linear-gradient(45deg, transparent, transparent 10px, #ccc 10px, #ccc 20px)',
        }}
      >
        <div style={{ background: 'white', border: '4px dotted green', margin: 10 }}>
          <div
            style={{
              display: 'flex',

              background:
                'repeating-linear-gradient(135deg, transparent, transparent 15px, #0f6cbd 10px, #0f6cbd 20px)',
              margin: 30,
              height: '100vh',
            }}
          />

          <div style={{ border: '4px dotted black', padding: 10, margin: 100 }}>
            <button id="target" ref={targetRef} onClick={() => setOpen(s => !s)}>
              Target
            </button>
          </div>

          <div
            style={{
              display: 'flex',

              background:
                'repeating-linear-gradient(135deg, transparent, transparent 15px, #0f6cbd 10px, #0f6cbd 20px)',
              margin: 30,
              height: '100vh',
            }}
          />

          {open && floating}
        </div>
      </div>
    </>
  );
};

//
//
//

const Context = createContext<
  | {
      containerRef: React.RefObject<HTMLDivElement>;
      targetRef: React.RefObject<HTMLDivElement>;
      open: boolean;
      setOpen: (open: boolean) => void;
    }
  | undefined
>(undefined);

const Controller: React.FC<React.PropsWithChildren<{}>> = props => {
  const [open, setOpen] = React.useState(false);
  const children = React.Children.toArray(props.children);

  const { containerRef, targetRef } = usePositioning({
    position: 'above',
    align: 'center',
  });

  React.useEffect(() => {
    if (open) {
      const scrollY = window.scrollY;
      const button = containerRef.current?.querySelector('button');

      button.focus();

      setTimeout(() => {
        const element = document.querySelector<HTMLElement>(
          scrollY === window.scrollY ? '#test-passed' : '#test-failed',
        );

        if (element) {
          element.style.setProperty('display', 'block');
          element.setAttribute('id', 'test-completed');
        }
      }, 500);
    }
  }, [containerRef, open]);

  return (
    <Context.Provider value={{ setOpen, containerRef, targetRef, open }}>
      {children[0]}
      {open && children[1]}
    </Context.Provider>
  );
};

const Target: React.FC<{ children?: React.ReactNode }> = props => {
  const open = useContextSelector(Context, v => v!.open);
  const setOpen = useContextSelector(Context, v => v!.setOpen);
  const targetRef = useContextSelector(Context, v => v!.targetRef);

  return React.cloneElement(props.children as React.ReactElement, {
    'aria-expanded': `${open}`,
    onClick: () => setOpen(true),
    ref: targetRef,
  });
};

const Container: React.FC<{ children?: React.ReactNode }> = props => {
  const containerRef = useContextSelector(Context, v => v!.containerRef);

  return ReactDOM.createPortal(
    <div style={{ position: 'absolute', left: 0, top: 0, right: 0, zIndex: 1000 }}>
      <div ref={containerRef} style={{ background: 'white', padding: 20, border: '5px solid blue' }}>
        {props.children}
      </div>
    </div>,
    document.body,
  );
};

const ScrollJumpContext = () => {
  return (
    <>
      <div
        style={{
          position: 'fixed',
          top: 10,
          left: 100,
          right: 100,

          background: 'white',
        }}
      >
        <p style={{ fontWeight: 20, border: '8px dotted magenta', padding: 10, margin: 0 }}>
          This example simulates a scroll jump on autofocus when opening a floating element. The example uses a layout
          effect to focus on the content of the floating box before usePopper is called. This results in the focus
          executing before the layout effect to position the floating is executed. The scroll jump is fixed internally
          in usePositioning by using position: fixed on the floating element before it is first positioned.
        </p>
        <div
          id="test-failed"
          style={{
            border: '8px dotted magenta',
            borderTop: 'none',
            padding: 10,
            fontSize: 20,
            color: 'red',
            display: 'none',
          }}
        >
          Test failed, scroll jump occurred 💥
        </div>
        <div
          id="test-passed"
          style={{
            border: '8px dotted magenta',
            borderTop: 'none',
            padding: 10,
            fontSize: 20,
            color: 'green',
            display: 'none',
          }}
        >
          Test passed ✅
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          background: 'repeating-linear-gradient(45deg, transparent, transparent 10px, #ccc 10px, #ccc 20px)',
        }}
      >
        <div style={{ background: 'white', border: '4px dotted green', margin: 10, padding: 40 }}>
          <div
            style={{
              display: 'flex',

              background:
                'repeating-linear-gradient(135deg, transparent, transparent 15px, #0f6cbd 10px, #0f6cbd 20px)',
              margin: 30,
              height: '100vh',
            }}
          />

          <Controller>
            <Target>
              <button id="target">Popover trigger</button>
            </Target>

            <Container>
              <button>Action</button>
            </Container>
          </Controller>
        </div>
      </div>
    </>
  );
};

export default {
  title: 'Positioning (no decorator)',
};

export const ScrollJumpUsage = () => (
  <StoryWright
    steps={new Steps()
      .focus('#target')
      .click('#target')
      .wait('#test-completed')
      .snapshot('positions without scroll jump')
      .end()}
  >
    <ScrollJump />
  </StoryWright>
);
ScrollJumpUsage.storyName = 'scroll jumps';

export const ScrollJumpsWithContextUsage = () => (
  <StoryWright
    steps={new Steps()
      .focus('#target')
      .click('#target')
      .wait('#test-completed')
      .snapshot('positions without scroll jump')
      .end()}
  >
    <ScrollJumpContext />
  </StoryWright>
);
ScrollJumpsWithContextUsage.storyName = 'scroll jumps (with context usage)';
