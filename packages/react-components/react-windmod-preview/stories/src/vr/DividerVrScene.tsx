// eslint-disable-next-line import/no-extraneous-dependencies -- story-only helper outside the *.stories.tsx devDependencies exemption
import * as React from 'react';

const alignments = ['start', 'center', 'end'] as const;
const appearances = ['default', 'brand', 'subtle', 'strong'] as const;
const insets = [false, true] as const;
const withContents = [true, false] as const;

type DividerLike = React.ComponentType<{
  alignContent?: (typeof alignments)[number];
  appearance?: (typeof appearances)[number];
  inset?: boolean;
  vertical?: boolean;
  children?: React.ReactNode;
}>;

/**
 * No bare text in the scene: only the Griffel side inherits FluentProvider typography.
 * Childless cells must pass `undefined`, the value both renderDivider and the childless
 * style gate compare against. Vertical cells are auto-height so the 20px/84px minimums
 * are the observable geometry.
 */
export const DividerVrScene = ({ Divider }: { Divider: DividerLike }): React.ReactNode => (
  <div style={{ display: 'inline-flex', flexDirection: 'column', gap: 16, padding: 24, background: '#fff' }}>
    {appearances.map(appearance =>
      alignments.map(alignContent => (
        <div key={`h-${appearance}-${alignContent}`} style={{ display: 'flex', gap: 16 }}>
          {insets.map(inset =>
            withContents.map(withContent => (
              <div key={`${inset}-${withContent}`} style={{ width: 240 }}>
                <Divider appearance={appearance} alignContent={alignContent} inset={inset}>
                  {withContent ? 'Content' : undefined}
                </Divider>
              </div>
            )),
          )}
        </div>
      )),
    )}

    {appearances.map(appearance =>
      alignments.map(alignContent => (
        <div key={`v-${appearance}-${alignContent}`} style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
          {insets.map(inset =>
            withContents.map(withContent => (
              <div key={`${inset}-${withContent}`} style={{ display: 'flex', width: 160 }}>
                <Divider vertical appearance={appearance} alignContent={alignContent} inset={inset}>
                  {withContent ? 'Content' : undefined}
                </Divider>
              </div>
            )),
          )}
        </div>
      )),
    )}

    {/* Narrow containers: the only place the 8px min-width floor on ::before/::after binds. */}
    <div style={{ display: 'flex', gap: 16 }}>
      {alignments.map(alignContent => (
        <div key={`narrow-${alignContent}`} style={{ width: 88 }}>
          <Divider alignContent={alignContent}>A rather long divider caption</Divider>
        </div>
      ))}
    </div>
  </div>
);
