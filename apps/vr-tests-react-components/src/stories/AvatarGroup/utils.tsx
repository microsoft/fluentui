import * as React from 'react';
import {
  AvatarGroup,
  AvatarGroupItem,
  AvatarGroupPopover,
  AvatarGroupPopoverProps,
  AvatarGroupProps,
  partitionAvatarGroupItems,
} from '@fluentui/react-avatar';

export const names = [
  'Katri Athokas',
  'Elvia Atkins',
  'Mauricio August',
  'Colin Ballinger',
  'Lydia Bauer',
  'Amanda Brady',
  'Henry Brill',
  'Celeste Burton',
  'Robin Counts',
  'Tim Deboer',
  'Cameron Evans',
  'Isaac Fielder',
  'Cecil Folk',
  'Miguel Garcia',
  'Wanda Howard',
  'Mona Kane',
  'Kat Larsson',
  'Ashley McCarthy',
  'Johnie McConnell',
  'Allan Munger',
  'Erik Nason',
  'Kristin Patterson',
  'Daisy Phillips',
  'Carole Poland',
  'Carlos Slattery',
  'Robert Tolbert',
  'Kevin Sturgis',
  'Charlotte Waltson',
  'Elliot Woodward',
];

export const sizes = [16, 20, 24, 28, 32, 36, 40, 48, 56, 64, 72, 96, 120, 128];

export const AvatarGroupList: React.FC<
  AvatarGroupProps & { overflowIndicator?: AvatarGroupPopoverProps['indicator'] }
> = props => {
  const { inlineItems, overflowItems } = partitionAvatarGroupItems({ items: names, layout: props.layout });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', flexWrap: 'wrap', gap: '10px', padding: '20px' }}>
      {sizes.map(size => (
        <AvatarGroup key={size} size={size as AvatarGroupProps['size']} {...props}>
          {inlineItems.map(name => (
            <AvatarGroupItem key={name} name={name} />
          ))}
          {overflowItems && (
            <AvatarGroupPopover indicator={props.overflowIndicator}>
              {overflowItems.map(name => (
                <AvatarGroupItem key={name} name={name} />
              ))}
            </AvatarGroupPopover>
          )}
        </AvatarGroup>
      ))}
    </div>
  );
};
