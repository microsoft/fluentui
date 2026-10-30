import * as React from 'react';
import { Avatar } from '@fluentui/react-windmod-preview/avatar';
import { FluentProvider } from '@fluentui/react-windmod-preview/provider';

import styles from '../compare.module.css';

/* A self-contained source: the storybook build serves no outbound network. */
const src = `data:image/svg+xml,${encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40">' +
    '<rect width="40" height="40" fill="#e8ecfb"/>' +
    '<rect x="0" y="0" width="10" height="10" fill="#c50f1f"/>' +
    '<rect x="30" y="30" width="10" height="10" fill="#107c10"/>' +
    '</svg>',
)}`;

const sizes = [16, 24, 32, 48, 72, 96, 128] as const;
const swatches = ['neutral', 'brand', 'dark-red', 'forest', 'teal', 'royal-blue', 'purple', 'anchor'] as const;
const names = ['Katri Athokas', 'Elvia Atkins', 'Cameron Evans', 'Wanda Howard', 'Mona Kane', 'Allan Munger'];

export const Default = (): React.ReactNode => (
  <FluentProvider>
    <div className={styles.stack}>
      <div className={styles.row}>
        {sizes.map(size => (
          <Avatar key={size} name="Katri Athokas" size={size} />
        ))}
      </div>
      <div className={styles.row}>
        <Avatar name="Katri Athokas" shape="square" size={48} />
        <Avatar shape="square" size={48} />
        <Avatar image={{ src }} shape="square" size={48} />
      </div>
      <div className={styles.row}>
        {swatches.map(color => (
          <Avatar key={color} color={color} name="Katri Athokas" size={48} />
        ))}
      </div>
      <div className={styles.row}>
        {names.map(name => (
          <Avatar key={name} color="colorful" name={name} size={48} />
        ))}
      </div>
      <div className={styles.row} style={{ gap: 24 }}>
        <Avatar active="active" activeAppearance="ring" name="Katri Athokas" size={64} />
        <Avatar active="active" activeAppearance="shadow" name="Katri Athokas" size={64} />
        <Avatar active="active" activeAppearance="ring-shadow" name="Katri Athokas" size={64} />
        <Avatar active="inactive" name="Katri Athokas" size={64} />
      </div>
      <div className={styles.row}>
        <Avatar name="Katri Athokas" size={48} />
        <Avatar size={48} />
        <Avatar image={{ src }} name="Katri Athokas" size={48} />
      </div>
    </div>
  </FluentProvider>
);
