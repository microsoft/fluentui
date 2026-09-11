// eslint-disable-next-line import/no-extraneous-dependencies -- story-only helper outside the *.stories.tsx devDependencies exemption
import * as React from 'react';

const appearances = ['secondary', 'primary', 'outline', 'subtle', 'transparent'] as const;
const sizes = ['small', 'medium', 'large'] as const;

type SplitButtonLike = React.ComponentType<{
  appearance?: (typeof appearances)[number];
  size?: (typeof sizes)[number];
  shape?: 'rounded' | 'circular' | 'square';
  disabled?: boolean;
  disabledFocusable?: boolean;
  icon?: React.ReactElement;
  iconPosition?: 'before' | 'after';
  menuButton?: { 'aria-expanded'?: boolean };
  children?: React.ReactNode;
}>;

const row = { display: 'flex', gap: 8, alignItems: 'center' } as const;

/** One scene, two implementations — the VR runner diffs the renders pixel for pixel. */
export const SplitButtonVrScene = ({
  SplitButton,
  Icon,
  Rtl,
}: {
  SplitButton: SplitButtonLike;
  Icon: React.ComponentType;
  Rtl: React.ComponentType<{ children: React.ReactNode }>;
}): React.ReactNode => (
  <div style={{ display: 'inline-flex', flexDirection: 'column', gap: 12, padding: 24, background: '#fff' }}>
    {appearances.map(appearance => (
      <div key={`size-${appearance}`} style={row}>
        {sizes.map(size => (
          <SplitButton key={size} appearance={appearance} size={size}>
            Send
          </SplitButton>
        ))}
      </div>
    ))}

    {appearances.map(appearance => (
      <div key={`disabled-${appearance}`} style={row}>
        <SplitButton appearance={appearance} disabled>
          Disabled
        </SplitButton>
        <SplitButton appearance={appearance} disabledFocusable>
          Disabled focusable
        </SplitButton>
      </div>
    ))}

    <div style={row}>
      {appearances.map(appearance => (
        <SplitButton key={`expanded-${appearance}`} appearance={appearance} menuButton={{ 'aria-expanded': true }}>
          Expanded
        </SplitButton>
      ))}
    </div>
    <div style={row}>
      <SplitButton appearance="outline" size="small" menuButton={{ 'aria-expanded': true }}>
        Expanded
      </SplitButton>
      <SplitButton appearance="outline" size="large" menuButton={{ 'aria-expanded': true }}>
        Expanded
      </SplitButton>
      <SplitButton appearance="outline" shape="circular" menuButton={{ 'aria-expanded': true }}>
        Expanded
      </SplitButton>
      <SplitButton appearance="outline" shape="square" menuButton={{ 'aria-expanded': true }}>
        Expanded
      </SplitButton>
    </div>

    {appearances.map(appearance => (
      <div key={`shape-${appearance}`} style={row}>
        <SplitButton appearance={appearance} shape="circular">
          Circular
        </SplitButton>
        <SplitButton appearance={appearance} shape="square">
          Square
        </SplitButton>
      </div>
    ))}

    {appearances.map(appearance => (
      <div key={`icon-${appearance}`} style={row}>
        <SplitButton appearance={appearance} icon={<Icon />}>
          Before
        </SplitButton>
        <SplitButton appearance={appearance} icon={<Icon />} iconPosition="after">
          After
        </SplitButton>
      </div>
    ))}

    <Rtl>
      <div style={{ display: 'inline-flex', flexDirection: 'column', gap: 12 }}>
        {appearances.map(appearance => (
          <div key={`rtl-${appearance}`} style={row}>
            <SplitButton appearance={appearance}>Send</SplitButton>
            <SplitButton appearance={appearance} icon={<Icon />}>
              Send
            </SplitButton>
          </div>
        ))}
      </div>
    </Rtl>

    <div style={row}>
      {appearances.map(appearance => (
        <SplitButton key={`empty-${appearance}`} appearance={appearance} />
      ))}
    </div>
  </div>
);
