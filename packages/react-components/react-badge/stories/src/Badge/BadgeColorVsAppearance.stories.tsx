import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';

import { Badge, makeStyles, tokens, BadgeProps } from '@fluentui/react-components';
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
    padding: tokens.spacingHorizontalXXS,
  },
});

const Badges = (props: BadgeProps) => {
  const styles = useStyles();
  const { appearance } = props;

  const colors: BadgeProps['color'][] = [
    'brand',
    'danger',
    'important',
    'informative',
    'severe',
    'subtle',
    'success',
    'warning',
  ];

  return (
    <div className={styles.badge}>
      {colors.map(color => {
        const BadgeWrapper =
          color === 'subtle' && (appearance === 'ghost' || appearance === 'outline')
            ? ({ children }: { children: React.ReactNode }) => <div className={styles.brand}>{children}</div>
            : React.Fragment;

        return (
          <BadgeWrapper key={`${appearance}-${color}`}>
            <Badge appearance={appearance} color={color} icon={<PasteIcon />}>
              999+
            </Badge>
          </BadgeWrapper>
        );
      })}
    </div>
  );
};

export const ColorAndAppearance = (): JSXElement => {
  const styles = useStyles();

  return (
    <div className={styles.example}>
      <h3>Filled</h3>
      <Badges appearance="filled" />
      <h3>Ghost</h3>
      <Badges appearance="ghost" />
      <h3>Outline</h3>
      <Badges appearance="outline" />
      <h3>Tint</h3>
      <Badges appearance="tint" />
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
