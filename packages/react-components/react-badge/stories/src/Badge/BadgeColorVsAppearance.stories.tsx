import * as React from 'react';

import { Badge, makeStyles, tokens } from '@fluentui/react-components';
import { ClipboardPasteRegular as PasteIcon } from '@fluentui/react-icons';

const useStyles = makeStyles({
  example: {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacingVerticalS,
  },
  badge: {
    display: 'flex',
    gap: tokens.spacingHorizontalS,
  },
  brand: {
    display: 'flex',
    backgroundColor: tokens.colorBrandBackground,
    borderRadius: tokens.borderRadiusCircular,
    padding: tokens.spacingHorizontalXXS,
  },
});

export const ColorAndAppearance = () => {
  const styles = useStyles();

  return (
    <div className={styles.example}>
      <h3>Filled</h3>
      <div className={styles.badge}>
        <Badge appearance="filled" color="brand" icon={<PasteIcon />}>
          999+
        </Badge>
        <Badge appearance="filled" color="danger" icon={<PasteIcon />}>
          999+
        </Badge>
        <Badge appearance="filled" color="important" icon={<PasteIcon />}>
          999+
        </Badge>
        <Badge appearance="filled" color="informative" icon={<PasteIcon />}>
          999+
        </Badge>
        <Badge appearance="filled" color="severe" icon={<PasteIcon />}>
          999+
        </Badge>
        <Badge appearance="filled" color="subtle" icon={<PasteIcon />}>
          999+
        </Badge>
        <Badge appearance="filled" color="success" icon={<PasteIcon />}>
          999+
        </Badge>
        <Badge appearance="filled" color="warning" icon={<PasteIcon />}>
          999+
        </Badge>
      </div>
      <h3>Ghost</h3>
      <div className={styles.badge}>
        <Badge appearance="ghost" color="brand" icon={<PasteIcon />}>
          999+
        </Badge>
        <Badge appearance="ghost" color="danger" icon={<PasteIcon />}>
          999+
        </Badge>
        <Badge appearance="ghost" color="important" icon={<PasteIcon />}>
          999+
        </Badge>
        <Badge appearance="ghost" color="informative" icon={<PasteIcon />}>
          999+
        </Badge>
        <Badge appearance="ghost" color="severe" icon={<PasteIcon />}>
          999+
        </Badge>
        <div className={styles.brand}>
          <Badge appearance="ghost" color="subtle" icon={<PasteIcon />}>
            999+
          </Badge>
        </div>
        <Badge appearance="ghost" color="success" icon={<PasteIcon />}>
          999+
        </Badge>
        <Badge appearance="ghost" color="warning" icon={<PasteIcon />}>
          999+
        </Badge>
      </div>
      <h3>Outline</h3>
      <div className={styles.badge}>
        <Badge appearance="outline" color="brand" icon={<PasteIcon />}>
          999+
        </Badge>
        <Badge appearance="outline" color="danger" icon={<PasteIcon />}>
          999+
        </Badge>
        <Badge appearance="outline" color="important" icon={<PasteIcon />}>
          999+
        </Badge>
        <Badge appearance="outline" color="informative" icon={<PasteIcon />}>
          999+
        </Badge>
        <Badge appearance="outline" color="severe" icon={<PasteIcon />}>
          999+
        </Badge>
        <div className={styles.brand}>
          <Badge appearance="outline" color="subtle" icon={<PasteIcon />}>
            999+
          </Badge>
        </div>
        <Badge appearance="outline" color="success" icon={<PasteIcon />}>
          999+
        </Badge>
        <Badge appearance="outline" color="warning" icon={<PasteIcon />}>
          999+
        </Badge>
      </div>
      <h3>Tint</h3>
      <div className={styles.badge}>
        <Badge appearance="tint" color="brand" icon={<PasteIcon />}>
          999+
        </Badge>
        <Badge appearance="tint" color="danger" icon={<PasteIcon />}>
          999+
        </Badge>
        <Badge appearance="tint" color="important" icon={<PasteIcon />}>
          999+
        </Badge>
        <Badge appearance="tint" color="informative" icon={<PasteIcon />}>
          999+
        </Badge>
        <Badge appearance="tint" color="severe" icon={<PasteIcon />}>
          999+
        </Badge>
        <Badge appearance="tint" color="subtle" icon={<PasteIcon />}>
          999+
        </Badge>
        <Badge appearance="tint" color="success" icon={<PasteIcon />}>
          999+
        </Badge>
        <Badge appearance="tint" color="warning" icon={<PasteIcon />}>
          999+
        </Badge>
      </div>
    </div>
  );
};

ColorAndAppearance.parameters = {
  docs: {
    description: {
      story: 'Note: `ghost-subtle` and `outline-subtle` are intended only for use on brand background.',
    },
  },
};
