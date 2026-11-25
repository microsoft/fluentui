import * as React from 'react';
import type { JSXElement, BadgeProps } from '@fluentui/react-components';

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
    alignItems: 'center',
    gap: tokens.spacingHorizontalS,
  },
  brand: {
    display: 'flex',
    alignItems: 'center',
    gap: tokens.spacingHorizontalS,
    backgroundColor: tokens.colorBrandBackground,
    padding: `${tokens.spacingVerticalS} ${tokens.spacingHorizontalM}`,
    borderRadius: tokens.borderRadiusMedium,
  },
  brandLabel: {
    color: tokens.colorNeutralForegroundOnBrand,
    fontFamily: tokens.fontFamilyBase,
    fontSize: tokens.fontSizeBase200,
    lineHeight: tokens.lineHeightBase200,
    fontWeight: tokens.fontWeightSemibold,
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

  const isSubtleOnBrandOnly = appearance === 'ghost' || appearance === 'outline';

  return (
    <div className={styles.badge}>
      {colors.map(color => {
        // `ghost-subtle` and `outline-subtle` are only meant to be used on a branded background,
        // so they are rendered within an explicit "brand surface" demo container instead of the
        // ambient story background.
        if (color === 'subtle' && isSubtleOnBrandOnly) {
          return (
            <div key={`${appearance}-${color}`} className={styles.brand}>
              <span className={styles.brandLabel}>On brand background:</span>
              <Badge appearance={appearance} color={color} icon={<PasteIcon />}>
                999+
              </Badge>
            </div>
          );
        }

        return (
          <Badge key={`${appearance}-${color}`} appearance={appearance} color={color} icon={<PasteIcon />}>
            999+
          </Badge>
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
      story:
        '`ghost-subtle` and `outline-subtle` are intended only for use on a branded background — ' +
        'the boxed "On brand background:" examples above demonstrate the intended usage context.',
    },
  },
};
