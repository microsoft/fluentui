import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { Badge, BadgeProps } from '@fluentui/react-badge';
import { CircleRegular } from '@fluentui/react-icons';
import { mergeClasses } from '@griffel/react';
import { propValues, useStyles } from './utils';

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

// appearance stories
storiesOf('Badge Converged', module)
  .add('filled', () => <BadgeAppearanceTemplate appearance={'filled'} />, {
    includeHighContrast: true,
    includeDarkMode: true,
  })
  .add('outline', () => <BadgeAppearanceTemplate appearance={'outline'} />, {
    includeHighContrast: true,
    includeDarkMode: true,
  })
  .add('tint', () => <BadgeAppearanceTemplate appearance={'tint'} />, {
    includeHighContrast: true,
    includeDarkMode: true,
  })
  .add('ghost', () => <BadgeAppearanceTemplate appearance={'ghost'} />, {
    includeHighContrast: true,
    includeDarkMode: true,
  });
