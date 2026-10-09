'use client';

// eslint-disable-next-line import/no-extraneous-dependencies -- story-only helper outside the *.stories.tsx devDependencies exemption
import * as React from 'react';

type ProgressBarLike = React.ComponentType<{
  value?: number;
  max?: number;
  color?: 'brand' | 'success' | 'warning' | 'error';
  shape?: 'rounded' | 'square';
  thickness?: 'medium' | 'large';
}>;

const colors = ['brand', 'success', 'warning', 'error'] as const;
const thicknesses = ['medium', 'large'] as const;
const shapes = ['rounded', 'square'] as const;

const frame: React.CSSProperties = {
  display: 'inline-flex',
  flexDirection: 'column',
  gap: 24,
  padding: 24,
  background: '#ffffff',
  fontSize: 0,
  lineHeight: 0,
};
const track: React.CSSProperties = { width: 240 };

/* run.mjs's determinism sheet stops CSS animations but not the Web Animations API ones the
   Griffel indeterminate bar uses; committing each animation's value at a fixed time and
   cancelling it leaves both implementations on the same static frame. Adding state to this
   scene would let React reconcile the inline style commitStyles() wrote and undo the freeze. */
const useFrozenAnimations = (ref: React.RefObject<HTMLElement | null>): void => {
  // eslint-disable-next-line no-restricted-properties -- capture-browser-only fixture; SSR never renders it
  React.useLayoutEffect(() => {
    const freeze = () => {
      ref.current?.querySelectorAll<HTMLElement>('[data-vr-freeze]').forEach(host => {
        const at = Number(host.dataset.vrFreeze);
        host.getAnimations({ subtree: true }).forEach(animation => {
          animation.currentTime = at;
          animation.commitStyles();
          animation.cancel();
        });
      });
    };

    freeze();
    // eslint-disable-next-line @nx/workspace-no-restricted-globals -- capture-browser-only fixture; no provider in scope
    const handle = requestAnimationFrame(freeze);
    // eslint-disable-next-line @nx/workspace-no-restricted-globals -- capture-browser-only fixture; no provider in scope
    return () => cancelAnimationFrame(handle);
  }, [ref]);
};

/** One scene, two implementations — the VR runner diffs the renders pixel for pixel. */
export const ProgressBarVrScene = ({ ProgressBar }: { ProgressBar: ProgressBarLike }): React.ReactNode => {
  const sceneRef = React.useRef<HTMLDivElement>(null);

  useFrozenAnimations(sceneRef);

  return (
    <div ref={sceneRef} style={frame}>
      {[0, 0.005, 0.25, 0.5, 0.75, 1].map(value => (
        <div key={`value-${value}`} style={track}>
          <ProgressBar value={value} />
        </div>
      ))}

      <div style={track}>
        <ProgressBar value={42} max={100} />
      </div>
      <div style={track}>
        <ProgressBar value={5} max={5} />
      </div>

      {thicknesses.map(thickness =>
        shapes.map(shape => (
          <div key={`look-${thickness}-${shape}`} style={track}>
            <ProgressBar value={0.5} thickness={thickness} shape={shape} />
          </div>
        )),
      )}

      {colors.map(color => (
        <div key={`color-${color}`} style={track}>
          <ProgressBar value={0.6} color={color} />
        </div>
      ))}

      {colors.map(color => (
        <div key={`full-${color}`} style={track}>
          <ProgressBar value={1} color={color} shape="square" thickness="large" />
        </div>
      ))}

      {[0, 750, 1500, 2250, 4500].map(at => (
        <div key={`frozen-${at}`} data-vr-freeze={at} style={track}>
          <ProgressBar />
        </div>
      ))}

      {thicknesses.map(thickness =>
        shapes.map(shape => (
          <div key={`frozen-look-${thickness}-${shape}`} data-vr-freeze={1500} style={track}>
            <ProgressBar thickness={thickness} shape={shape} />
          </div>
        )),
      )}

      {colors.map(color => (
        <div key={`frozen-color-${color}`} data-vr-freeze={1500} style={track}>
          <ProgressBar color={color} />
        </div>
      ))}
    </div>
  );
};
