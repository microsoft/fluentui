import * as React from 'react';
import { Avatar, FluentProvider } from '@fluentui/react-windmod-preview';
import {
  Avatar as GriffelAvatar,
  FluentProvider as GriffelFluentProvider,
  webLightTheme,
} from '@fluentui/react-components';

import styles from '../compare.module.css';

// See AvatarDefault.stories for why the source is an inline data URI.
const src = `data:image/svg+xml,${encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40">' +
    '<rect width="40" height="40" fill="#e8ecfb"/>' +
    '<rect x="0" y="0" width="10" height="10" fill="#c50f1f"/>' +
    '<rect x="30" y="30" width="10" height="10" fill="#107c10"/>' +
    '</svg>',
)}`;

type LookProps = {
  active?: 'active' | 'inactive';
  activeAppearance?: 'ring' | 'shadow' | 'ring-shadow';
  color?: 'neutral' | 'brand' | 'colorful' | 'dark-red' | 'anchor';
  image?: { src: string };
  name?: string;
  shape?: 'circular' | 'square';
  size?: 16 | 32 | 48 | 96;
};

/**
 * Every windmod variant next to its Griffel-suite twin (inside a Griffel FluentProvider).
 * The pair in each row must be pixel-identical.
 */
export const GriffelComparison = (): React.ReactNode => {
  const variants: Array<{ label: string; props: LookProps }> = [
    { label: 'default', props: {} },
    { label: 'initials', props: { name: 'Katri Athokas' } },
    { label: 'initials at 16', props: { name: 'Katri Athokas', size: 16 } },
    { label: 'image', props: { image: { src }, size: 48 } },
    { label: 'square', props: { name: 'Katri Athokas', shape: 'square', size: 48 } },
    { label: 'square icon', props: { shape: 'square', size: 48 } },
    { label: 'brand', props: { color: 'brand', name: 'Katri Athokas', size: 48 } },
    { label: 'dark-red', props: { color: 'dark-red', name: 'Katri Athokas', size: 48 } },
    { label: 'colorful', props: { color: 'colorful', name: 'Elvia Atkins', size: 48 } },
    { label: 'active ring', props: { active: 'active', name: 'Katri Athokas', size: 48 } },
    {
      label: 'active shadow',
      props: { active: 'active', activeAppearance: 'shadow', name: 'Katri Athokas', size: 48 },
    },
    {
      label: 'active ring-shadow',
      props: { active: 'active', activeAppearance: 'ring-shadow', name: 'Katri Athokas', size: 96 },
    },
    { label: 'inactive', props: { active: 'inactive', name: 'Katri Athokas', size: 48 } },
    { label: 'anchor active', props: { active: 'active', color: 'anchor', name: 'Katri Athokas', size: 48 } },
  ];

  return (
    <div className={styles.grid}>
      <div className={styles.header}>Variant</div>
      <div className={styles.header}>Windmod</div>
      <div className={styles.header}>Griffel</div>
      {variants.map(({ label, props }) => (
        <React.Fragment key={label}>
          <div className={styles.label}>{label}</div>
          <div>
            <FluentProvider>
              <Avatar {...props} />
            </FluentProvider>
          </div>
          <div>
            <GriffelFluentProvider theme={webLightTheme}>
              <GriffelAvatar {...props} />
            </GriffelFluentProvider>
          </div>
        </React.Fragment>
      ))}
    </div>
  );
};
