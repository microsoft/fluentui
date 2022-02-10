import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { Badge, BadgeProps } from '@fluentui/react-badge';
import { CircleRegular } from '@fluentui/react-icons';
import { mergeClasses, makeStyles, shorthands } from '@griffel/react';
import { tokens } from '@fluentui/react-theme';

const badgeColors: Required<BadgeProps>['color'][] = [
  'brand',
  'danger',
  'important',
  'informative',
  'severe',
  'subtle',
  'success',
  'warning',
];

const badgeAppearances: Required<BadgeProps>['appearance'][] = [
  'filled',
  'outline',
  'tint',
  'ghost',
];

const useStyles = makeStyles({
  container: {
    display: 'flex',
    alignItems: 'center',
  },

  badgeContainer: {
    display: 'flex',
    alignItems: 'center',
    ...shorthands.gap('5px'),
    ...shorthands.padding('5px'),
  },

  label: {
    marginLeft: '10px',
  },

  brandContainer: {
    backgroundColor: tokens.colorBrandBackgroundStatic,
  },
});

const BadgeAppearanceTemplate: React.FC<{ appearance: Required<BadgeProps>['appearance'] }> = ({
  appearance,
}) => {
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

  badgeColors.forEach(color => {
    const circularWithText = (
      <Badge color={color} appearance={appearance}>
        1
      </Badge>
    );
    const circularWithIcon = (
      <Badge color={color} appearance={appearance} icon={<CircleRegular />} />
    );
    const roundedWithIcon = (
      <Badge color={color} appearance={appearance} shape="rounded" icon={<CircleRegular />} />
    );
    const roundedWithText = (
      <Badge color={color} appearance={appearance} shape="rounded">
        {appearance.toUpperCase()}
      </Badge>
    );
    const roundedWithTextAndIconBefore = (
      <Badge
        color={color}
        appearance={appearance}
        shape="rounded"
        icon={<CircleRegular />}
        iconPosition="before"
      >
        {appearance.toUpperCase()}
      </Badge>
    );
    const roundedWithTextAndIconAfter = (
      <Badge
        color={color}
        appearance={appearance}
        shape="rounded"
        icon={<CircleRegular />}
        iconPosition="after"
      >
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

const appearanceStories = storiesOf('Badge Converged', module);

badgeAppearances.forEach(appearance => {
  appearanceStories.addStory(
    appearance,
    () => <BadgeAppearanceTemplate appearance={appearance} />,
    { includeRtl: true, includeHighContrast: true, includeDarkMode: true },
  );
});

storiesOf('Badge Converged - sizes', module).addStory(
  'default',
  () => (
    <div style={{ display: 'flex', gap: 10 }}>
      {([
        'tiny',
        'extra-small',
        'small',
        'medium',
        'large',
        'extra-large',
      ] as BadgeProps['size'][]).map(size => (
        <Badge key={size} size={size} />
      ))}
    </div>
  ),
  { includeRtl: true, includeHighContrast: true, includeDarkMode: true },
);
