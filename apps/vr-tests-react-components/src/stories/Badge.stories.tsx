import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { Badge, BadgeProps } from '@fluentui/react-badge';
import { CircleRegular } from '@fluentui/react-icons';
import { mergeClasses, makeStyles, shorthands } from '@griffel/react';
import { tokens, typographyStyles } from '@fluentui/react-theme';

type ValueArrays<T> = {
  [K in keyof T]: T[K][];
};

const propValues: ValueArrays<Pick<Required<BadgeProps>, 'size' | 'color' | 'appearance' | 'shape'>> = {
  size: ['tiny', 'extra-small', 'small', 'medium', 'large', 'extra-large'],
  color: ['brand', 'danger', 'severe', 'warning', 'success', 'important', 'informative', 'subtle'],
  appearance: ['filled', 'outline', 'tint', 'ghost'],
  shape: ['circular', 'rounded', 'square'],
};

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

  groupSet: {
    display: 'inline-flex',
    flexDirection: 'column',
    ...shorthands.padding(0, tokens.spacingHorizontalL),
    rowGap: tokens.spacingVerticalL,
  },

  group: {
    display: 'inline-flex',
    flexDirection: 'column',
    alignItems: 'start',
    rowGap: tokens.spacingVerticalS,
  },

  groupLabel: {
    ...typographyStyles.subtitle2Stronger,
  },

  row: {
    display: 'inline-flex',
    alignItems: 'center',
    columnGap: tokens.spacingHorizontalS,
  },
});

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

const BadgeSampleRow: React.FC<BadgeProps> = props => {
  const styles = useStyles();

  // Text content is not supported for tiny and extra-small
  if (props.size === 'tiny' || props.size === 'extra-small') {
    return (
      <div className={styles.row}>
        <Badge {...props} icon={props.size === 'tiny' ? null : <CircleRegular />} />
      </div>
    );
  }

  return (
    <div className={styles.row}>
      <Badge {...props}>1</Badge>
      <Badge {...props} icon={<CircleRegular />} />
      <Badge {...props}>BADGE</Badge>
      <Badge {...props} icon={<CircleRegular />}>
        BADGE
      </Badge>
      <Badge {...props} icon={<CircleRegular />} iconPosition="after">
        BADGE
      </Badge>
      {props.children}
    </div>
  );
};

const badgeStories = storiesOf('Badge Converged', module);

// appearance stories
propValues.appearance.forEach(appearance => {
  badgeStories.addStory(appearance, () => <BadgeAppearanceTemplate appearance={appearance} />, {
    includeHighContrast: true,
    includeDarkMode: true,
  });
});

// size stories
propValues.size.forEach(size =>
  badgeStories.addStory(
    `size: ${size}`,
    () => {
      const styles = useStyles();
      return (
        <div className={styles.groupSet}>
          {propValues.appearance.map(appearance =>
            // tiny + ghost is not supported
            size === 'tiny' && appearance === 'ghost' ? null : (
              <div key={appearance} className={styles.group}>
                <span className={styles.groupLabel}>appearance: {appearance}</span>
                {propValues.shape.map(shape => (
                  <BadgeSampleRow key={shape} shape={shape} appearance={appearance} size={size} />
                ))}
              </div>
            ),
          )}
        </div>
      );
    },
    { includeRtl: true },
  ),
);
