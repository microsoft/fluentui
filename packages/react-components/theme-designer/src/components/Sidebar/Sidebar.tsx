import * as React from 'react';
import { clsx } from 'clsx';
import { Form } from './Form';
import styles from './Sidebar.module.css';

export interface SidebarProps {
  className?: string;
}

export const Sidebar: React.FC<SidebarProps> = props => {
  return (
    <div className={clsx(styles.root, props.className)}>
      <Form />
    </div>
  );
};
