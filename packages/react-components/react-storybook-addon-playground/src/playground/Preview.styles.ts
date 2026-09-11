import { makeStyles, tokens } from '@fluentui/react-components';

const fadeIn = {
  from: { opacity: 0, transform: 'translateY(6px) scale(0.995)' },
  to: { opacity: 1, transform: 'translateY(0) scale(1)' },
};

export const usePreviewStyles = makeStyles({
  root: {
    height: '100%',
    minHeight: 0,
    overflow: 'auto',
    boxSizing: 'border-box',
    padding: '28px',
    backgroundColor: tokens.colorNeutralBackground1,
    // Design-canvas dot grid; the top layer fades the dots out towards the edges so they never compete with the
    // rendered component (a mask would fade the component too)
    backgroundImage: [
      `radial-gradient(ellipse at center, transparent 50%, ${tokens.colorNeutralBackground1} 100%)`,
      'radial-gradient(var(--pg-dot, rgba(0, 0, 0, 0.1)) 1px, transparent 1.5px)',
    ].join(', '),
    backgroundSize: '100% 100%, 22px 22px',
    backgroundPosition: '0 0, 11px 11px',
    backgroundAttachment: 'local, local',
  },
  content: {
    animationName: fadeIn,
    animationDuration: '260ms',
    animationTimingFunction: 'cubic-bezier(0.2, 0.8, 0.2, 1)',
  },
});
