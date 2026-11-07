import * as React from 'react';
import { Persona } from '@fluentui/react-windmod-preview/persona';
import { FluentProvider } from '@fluentui/react-windmod-preview/provider';

import styles from '../compare.module.css';

const sizes = ['extra-small', 'small', 'medium', 'large', 'extra-large', 'huge'] as const;
const textPositions = ['after', 'before', 'below'] as const;

const name = 'Kevin Sturgis';
const lines = {
  secondaryText: 'Available',
  tertiaryText: 'Software Engineer',
  quaternaryText: 'Microsoft',
} as const;

export const Default = (): React.ReactNode => (
  <FluentProvider>
    <div className={styles.stack}>
      <div className={styles.row}>
        {sizes.map(size => (
          <Persona key={size} name={name} size={size} {...lines} />
        ))}
      </div>

      <div className={styles.row}>
        {textPositions.map(textPosition => (
          <Persona key={textPosition} name={name} textPosition={textPosition} {...lines} />
        ))}
      </div>

      <div className={styles.row}>
        {(['start', 'center'] as const).map(textAlignment => (
          <Persona key={textAlignment} name={name} size="extra-large" textAlignment={textAlignment} {...lines} />
        ))}
      </div>

      <div className={styles.row}>
        <Persona name={name} />
        <Persona name={name} secondaryText={lines.secondaryText} />
        <Persona name={name} secondaryText={lines.secondaryText} tertiaryText={lines.tertiaryText} />
        <Persona name={name} {...lines} />
      </div>

      <div className={styles.row}>
        <Persona avatar={null} name={name} {...lines} />
        <Persona avatar={{ color: 'brand' }} name={name} {...lines} />
      </div>
    </div>
  </FluentProvider>
);
