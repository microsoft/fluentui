/* eslint-disable @fluentui/no-restricted-imports */
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { makeStyles, tokens } from '@fluentui/react-components';
import { FileTypeIcon, FileTypeIconProps } from '@fluentui/react-file-type-icons';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  preview: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '12px',
    borderRadius: tokens.borderRadiusMedium,
    border: `1px solid ${tokens.colorNeutralStroke1}`,
  },
  note: {
    color: tokens.colorNeutralForeground3,
    fontSize: tokens.fontSizeBase200,
  },
});

export const Playground = (args: FileTypeIconProps): JSXElement => {
  const styles = useStyles();

  return (
    <div className={styles.container}>
      <div className={styles.preview}>
        <FileTypeIcon {...args} />
        <span>Preview using current controls</span>
      </div>
      <span className={styles.note}>
        Tip: Set either extension or type. When both are provided, extension takes precedence.
      </span>
    </div>
  );
};

Playground.args = {
  extension: 'docx',
  size: 32,
  imageFileType: 'svg',
};

Playground.parameters = {
  docs: {
    description: {
      story:
        'Interactive playground for trying file extensions, special FileIconType values, size variants, and image format. Use this as the fastest way to validate behavior for your scenario.',
    },
  },
};
