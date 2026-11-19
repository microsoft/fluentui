// eslint-disable-next-line import/no-extraneous-dependencies -- story-only helper outside the *.stories.tsx devDependencies exemption
import * as React from 'react';

const appearances = ['secondary', 'primary', 'outline', 'subtle', 'transparent'] as const;
const sizes = ['small', 'medium', 'large'] as const;
const shapes = ['rounded', 'circular', 'square'] as const;

type CompoundButtonLike = React.ComponentType<{
  appearance?: (typeof appearances)[number];
  size?: (typeof sizes)[number];
  shape?: (typeof shapes)[number];
  disabled?: boolean;
  disabledFocusable?: boolean;
  icon?: React.ReactElement;
  iconPosition?: 'before' | 'after';
  secondaryContent?: string;
  'aria-label'?: string;
  children?: React.ReactNode;
}>;

const secondary = 'Secondary content';

/** One scene, two implementations — the VR runner diffs the renders pixel for pixel. */
export const CompoundButtonVrScene = ({
  CompoundButton,
  Icon,
}: {
  CompoundButton: CompoundButtonLike;
  Icon: React.ComponentType;
}): React.ReactNode => (
  <div style={{ display: 'inline-flex', flexDirection: 'column', gap: 12, padding: 24, background: '#fff' }}>
    {appearances.map(appearance =>
      [true, false].map(withSecondary => {
        const secondaryContent = withSecondary ? secondary : undefined;

        return (
          <div
            key={`${appearance}-${withSecondary}`}
            style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'nowrap' }}
          >
            {sizes.map(size => (
              <CompoundButton key={size} appearance={appearance} size={size} secondaryContent={secondaryContent}>
                Compound
              </CompoundButton>
            ))}
            <CompoundButton appearance={appearance} icon={<Icon />} secondaryContent={secondaryContent}>
              Icon
            </CompoundButton>
            <CompoundButton appearance={appearance} size="small" icon={<Icon />} secondaryContent={secondaryContent}>
              Icon
            </CompoundButton>
            <CompoundButton appearance={appearance} size="large" icon={<Icon />} secondaryContent={secondaryContent}>
              Icon
            </CompoundButton>
            <CompoundButton
              appearance={appearance}
              icon={<Icon />}
              iconPosition="after"
              secondaryContent={secondaryContent}
            >
              Icon
            </CompoundButton>
            {withSecondary ? (
              <CompoundButton appearance={appearance} icon={<Icon />} secondaryContent={secondary} />
            ) : (
              <CompoundButton appearance={appearance} icon={<Icon />} aria-label="icon" />
            )}
            <CompoundButton appearance={appearance} secondaryContent={secondaryContent} disabled>
              Disabled
            </CompoundButton>
            <CompoundButton appearance={appearance} secondaryContent={secondaryContent} disabledFocusable>
              Disabled
            </CompoundButton>
          </div>
        );
      }),
    )}
    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
      {shapes.map(shape => (
        <CompoundButton key={shape} shape={shape} secondaryContent={secondary}>
          Shape
        </CompoundButton>
      ))}
      {shapes.map(shape => (
        <CompoundButton key={shape} shape={shape} icon={<Icon />} aria-label="icon" />
      ))}
    </div>
    {/* Falsy-but-rendered children. Griffel keeps the icon margin for anything that is not
        null/undefined, so `0` and `''` hold the gap while `null` drops it — the one row where a
        falsiness reading of the children and a nullish one disagree. */}
    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
      <CompoundButton icon={<Icon />} secondaryContent={secondary}>
        {0}
      </CompoundButton>
      <CompoundButton icon={<Icon />} iconPosition="after" secondaryContent={secondary}>
        {0}
      </CompoundButton>
      <CompoundButton icon={<Icon />} secondaryContent={secondary}>
        {''}
      </CompoundButton>
      <CompoundButton icon={<Icon />} secondaryContent={secondary}>
        {null}
      </CompoundButton>
      <CompoundButton icon={<Icon />} secondaryContent={secondary} />
    </div>
  </div>
);
