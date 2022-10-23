import * as React from 'react';
import { Badge, BadgeProps } from '@fluentui/react-badge';
import { CircleRegular } from '@fluentui/react-icons';
import { mergeClasses } from '@griffel/react';
import { propValues, useStyles } from './utils';
import { ComponentMeta } from '@storybook/react';
import { getStoryVariant, DARK_MODE, HIGH_CONTRAST } from '../../utilities';

const BadgeAppearanceTemplate: React.FC<{ appearance: Required<BadgeProps>['appearance'] }> = ({ appearance }) => {
  const styles = useStyles();

  const badges = new Map<BadgeProps['color'], JSX.Element[]>();
  badges.set('brand', []);
  badges.set('danger', []);
  badges.set('severe', []);
  badges.set('warning', []);
  badges.set('success', []);
  badges.set('important', []);
  badges.set('informative', []);
  badges.set('subtle', []);

  propValues.color.forEach(color => {
    const circularWithText = (
      <Badge color={color} appearance={appearance}>
        1
      </Badge>
    );
    const circularWithIcon = <Badge color={color} appearance={appearance} icon={<CircleRegular />} />;
    const roundedWithIcon = <Badge color={color} appearance={appearance} shape="rounded" icon={<CircleRegular />} />;
    const roundedWithText = (
      <Badge color={color} appearance={appearance} shape="rounded">
        {appearance.toUpperCase()}
      </Badge>
    );
    const roundedWithTextAndIconBefore = (
      <Badge color={color} appearance={appearance} shape="rounded" icon={<CircleRegular />} iconPosition="before">
        {appearance.toUpperCase()}
      </Badge>
    );
    const roundedWithTextAndIconAfter = (
      <Badge color={color} appearance={appearance} shape="rounded" icon={<CircleRegular />} iconPosition="after">
        {appearance.toUpperCase()}
      </Badge>
    );

    badges
      .get(color)!
      .push(
        circularWithText,
        circularWithIcon,
        roundedWithIcon,
        roundedWithText,
        roundedWithTextAndIconAfter,
        roundedWithTextAndIconBefore,
      );
  });

  return (
    <div>
      {Array.from(badges.keys()).map((color: BadgeProps['color'], i) => (
        <div key={i} className={styles.container}>
          <div
            className={mergeClasses(
              styles.badgeContainer,
              color === 'subtle' && appearance === 'outline' && styles.brandContainer,
              color === 'subtle' && appearance === 'ghost' && styles.brandContainer,
            )}
          >
            {badges.get(color)}
          </div>
          <div className={styles.label}>{color}</div>
        </div>
      ))}
    </div>
  );
};

export default {
  title: 'Badge Converged',
} as ComponentMeta<typeof Badge>;

export const Filled = () => <BadgeAppearanceTemplate appearance={'filled'} />;

Filled.storyName = 'filled';

export const FilledDarkMode = getStoryVariant(Filled, DARK_MODE);
export const FilledHighContrast = getStoryVariant(Filled, HIGH_CONTRAST);

export const Outline = () => <BadgeAppearanceTemplate appearance={'outline'} />;

Outline.storyName = 'outline';

export const OutlineDarkMode = getStoryVariant(Outline, DARK_MODE);
export const OutlineHighContrast = getStoryVariant(Outline, HIGH_CONTRAST);

export const Tint = () => <BadgeAppearanceTemplate appearance={'tint'} />;

Tint.storyName = 'tint';

export const TintDarkMode = getStoryVariant(Tint, DARK_MODE);
export const TintHighContrast = getStoryVariant(Tint, HIGH_CONTRAST);

export const Ghost = () => <BadgeAppearanceTemplate appearance={'ghost'} />;

Ghost.storyName = 'ghost';

export const GhostDarkMode = getStoryVariant(Ghost, DARK_MODE);
export const GhostHighContrast = getStoryVariant(Ghost, HIGH_CONTRAST);
