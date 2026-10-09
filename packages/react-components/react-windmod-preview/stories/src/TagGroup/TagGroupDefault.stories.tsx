import * as React from 'react';
import { FluentProvider } from '@fluentui/react-windmod-preview/provider';
import { Tag } from '@fluentui/react-windmod-preview/tag';
import { TagGroup } from '@fluentui/react-windmod-preview/tag-group';

import styles from '../compare.module.css';

const appearances = ['filled', 'outline', 'brand'] as const;
const sizes = ['medium', 'small', 'extra-small'] as const;

export const Default = (): React.ReactNode => {
  const [dismissed, setDismissed] = React.useState<string[]>([]);

  return (
    <FluentProvider>
      <div className={styles.stack}>
        <div className={styles.row}>
          {sizes.map(size => (
            <TagGroup key={size} size={size}>
              <Tag>{size}</Tag>
              <Tag>Primary</Tag>
              <Tag>Primary</Tag>
            </TagGroup>
          ))}
        </div>
        <div className={styles.row}>
          {appearances.map(appearance => (
            <TagGroup key={appearance} appearance={appearance}>
              <Tag>{appearance}</Tag>
              <Tag>Primary</Tag>
            </TagGroup>
          ))}
        </div>
        <div className={styles.row}>
          <TagGroup dismissible onDismiss={(_event, { value }) => setDismissed(prev => [...prev, value])}>
            {['1', '2', '3']
              .filter(value => !dismissed.includes(value))
              .map(value => (
                <Tag key={value} value={value}>
                  Dismissible {value}
                </Tag>
              ))}
          </TagGroup>
        </div>
        <div className={styles.row}>
          <TagGroup disabled>
            <Tag>Disabled</Tag>
            <Tag>Disabled</Tag>
          </TagGroup>
        </div>
        {/* A local prop on a Tag beats the group's, on both channels. */}
        <div className={styles.row}>
          <TagGroup size="extra-small" appearance="brand">
            <Tag>From the group</Tag>
            <Tag size="medium" appearance="outline">
              Its own
            </Tag>
          </TagGroup>
        </div>
      </div>
    </FluentProvider>
  );
};
