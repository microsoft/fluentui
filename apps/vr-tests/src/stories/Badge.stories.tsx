import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { Badge, BadgeCommons } from '@fluentui/react-badge';
import { Circle12Regular } from '@fluentui/react-icons';
import { mergeClasses, makeStyles } from '@fluentui/react-make-styles';

const badgeColors: BadgeCommons['color'][] = [
  'brand',
  'danger',
  'important',
  'informative',
  'severe',
  'subtle',
  'success',
  'warning',
];

const badgeAppearances: BadgeCommons['appearance'][] = ['filled', 'outline', 'tint', 'ghost'];

const useStyles = makeStyles({
  container: {
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
    padding: '5px',
  },
  subtleContainer: theme => ({
    backgroundColor: theme.colorBrandBackground,
  }),
});

const BadgeAppearanceTemplate: React.FC<{ appearance: BadgeCommons['appearance'] }> = ({
  appearance,
}) => {
  const styles = useStyles();

  const badges: Record<BadgeCommons['color'], JSX.Element[]> = {
    brand: [],
    danger: [],
    important: [],
    informative: [],
    severe: [],
    subtle: [],
    success: [],
    warning: [],
  };

  badgeColors.forEach(color => {
    const circularWithText = (
      <Badge color={color} appearance={appearance}>
        1
      </Badge>
    );
    const circularWithIcon = (
      <Badge color={color} appearance={appearance} icon={<Circle12Regular />} />
    );
    const roundedWithIcon = (
      <Badge color={color} appearance={appearance} shape="rounded" icon={<Circle12Regular />} />
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
        icon={<Circle12Regular />}
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
        icon={<Circle12Regular />}
        iconPosition="after"
      >
        {appearance.toUpperCase()}
      </Badge>
    );

    badges[color].push(
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
      {Object.keys(badges)
        .sort()
        .map((color: BadgeCommons['color'], i) => (
          <div
            key={i}
            className={mergeClasses(
              styles.container,
              (color === 'subtle' || color === 'informative') &&
                (appearance === 'ghost' || appearance === 'outline') &&
                styles.subtleContainer,
            )}
          >
            {badges[color]} {color}
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
      ] as BadgeCommons['size'][]).map(size => (
        <Badge key={size} size={size} />
      ))}
    </div>
  ),
  { includeRtl: true, includeHighContrast: true, includeDarkMode: true },
);
