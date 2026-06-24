// eslint-disable-next-line import/no-extraneous-dependencies
import * as React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { TagPickerOption } from '@fluentui/react-headless-components-preview/tag-picker';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Tag } from '@fluentui/react-headless-components-preview/tag';
import type { TagProps } from '@fluentui/react-headless-components-preview/tag';
import type { JSXElement } from '@fluentui/react-utilities';
// eslint-disable-next-line import/no-extraneous-dependencies
import { DismissRegular } from '@fluentui/react-icons';

import styles from './tag-picker.module.css';

/** Returns up to two uppercase initials from a person's name. */
export const getInitials = (name: string): string =>
  name
    .split(' ')
    .map(part => part[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase();

/** A lightweight avatar-like media badge used by the TagPicker stories. */
export const Media = ({ name, square }: { name: string; square?: boolean }): JSXElement => (
  <span className={square ? `${styles.media} ${styles.mediaSquare}` : styles.media} aria-hidden>
    {getInitials(name)}
  </span>
);

/** A selected tag inside a `TagPickerGroup` (dismissal is wired by the group via context). */
export const SelectedTag = ({
  value,
  primaryText,
}: {
  value: string;
  primaryText?: TagProps['primaryText'];
}): JSXElement => (
  <Tag
    value={value}
    className={styles.tag}
    media={<Media name={value} />}
    primaryText={primaryText}
    dismissIcon={{ className: styles.dismissIcon, 'aria-label': 'remove', children: <DismissRegular aria-hidden /> }}
  >
    {value}
  </Tag>
);

/** A person option for the `TagPickerList`, with square media and secondary text. */
export const PersonOption = ({ value }: { value: string }): JSXElement => (
  <TagPickerOption
    value={value}
    className={styles.option}
    media={<Media name={value} square />}
    secondaryContent={{ className: styles.secondaryContent, children: 'Microsoft FTE' }}
  >
    {value}
  </TagPickerOption>
);
