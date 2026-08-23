import * as React from 'react';
import { Card, CardFooter, CardHeader, CardPreview, FluentProvider } from '@fluentui/react-windmod-preview';

import styles from '../compare.module.css';

const sizes = ['small', 'medium', 'large'] as const;
const appearances = ['filled', 'filled-alternative', 'outline', 'subtle'] as const;

const card: React.CSSProperties = { width: 240 };
const media = <span style={{ background: '#8a8886', paddingBlock: 20 }} />;
const glyph = <i style={{ display: 'block', width: 32, height: 32, background: '#605e5c' }} />;
const button = <i style={{ display: 'block', width: 40, height: 20, background: '#0078d4' }} />;
const noop = () => undefined;

export const Default = (): React.ReactNode => (
  <FluentProvider>
    <div className={styles.stack}>
      <div className={styles.row}>
        {sizes.map(size => (
          <Card key={size} style={card} size={size}>
            <p style={{ margin: 0 }}>size {size}</p>
          </Card>
        ))}
      </div>

      <div className={styles.row}>
        {appearances.map(appearance => (
          <Card key={appearance} style={card} appearance={appearance}>
            <p style={{ margin: 0 }}>{appearance}</p>
          </Card>
        ))}
      </div>

      <div className={styles.row}>
        <Card style={card} orientation="horizontal">
          <CardPreview>{media}</CardPreview>
          <p style={{ margin: 0 }}>horizontal</p>
        </Card>
        <Card style={card}>
          <CardPreview>{media}</CardPreview>
          <p style={{ margin: 0 }}>vertical</p>
        </Card>
      </div>

      <div className={styles.row}>
        <Card style={card} selected onSelectionChange={noop}>
          <p style={{ margin: 0 }}>selected</p>
        </Card>
        <Card style={card} selected={false} onSelectionChange={noop}>
          <p style={{ margin: 0 }}>selectable</p>
        </Card>
        <Card style={card} floatingAction={{ children: button }} selected={false} onSelectionChange={noop}>
          <CardPreview>{media}</CardPreview>
          <p style={{ margin: 0 }}>floating action</p>
        </Card>
      </div>

      <div className={styles.row}>
        <Card style={card} disabled>
          <p style={{ margin: 0 }}>disabled</p>
        </Card>
        <Card style={card} appearance="outline" disabled>
          <p style={{ margin: 0 }}>outline disabled</p>
        </Card>
      </div>

      <div className={styles.row}>
        <Card style={card}>
          <CardPreview logo={{ children: glyph }}>{media}</CardPreview>
          <p style={{ margin: 0 }}>preview with a logo</p>
        </Card>
      </div>

      <div className={styles.row}>
        <Card style={card}>
          <CardHeader header="Header" />
          <p style={{ margin: 0 }}>no description</p>
          <CardFooter action={{ children: button }}>{button}</CardFooter>
        </Card>
        <Card style={card}>
          <CardHeader
            image={{ children: glyph }}
            header="Header"
            description="Description"
            action={{ children: button }}
          />
          <p style={{ margin: 0 }}>with a description</p>
          <CardFooter action={{ children: button }}>{button}</CardFooter>
        </Card>
      </div>
    </div>
  </FluentProvider>
);
