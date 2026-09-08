import * as React from 'react';
import { Tag } from '@fluentui/react-headless-components-preview/tag';

import styles from './tag.module.css';

export const Default = (): React.ReactNode => <Tag className={styles.tag}>Primary text</Tag>;
