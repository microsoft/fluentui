import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { Badge, BadgeCommons } from '@fluentui/react-badge';

const colorAndAppearanceStories = storiesOf('Badge Converged', module);

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

badgeColors.forEach(color => {
  colorAndAppearanceStories.addStory(
    color,
    () => (
      <div style={{ display: 'flex', gap: 10 }}>
        {badgeAppearances.map(appearance => (
          <Badge appearance={appearance} key={appearance} color={color} />
        ))}
      </div>
    ),
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
