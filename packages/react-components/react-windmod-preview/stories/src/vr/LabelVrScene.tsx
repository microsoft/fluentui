// eslint-disable-next-line import/no-extraneous-dependencies -- story-only helper outside the *.stories.tsx devDependencies exemption
import * as React from 'react';

const sizes = ['small', 'medium', 'large'] as const;
const weights = ['regular', 'semibold'] as const;

type LabelLike = React.ComponentType<{
  size?: (typeof sizes)[number];
  weight?: (typeof weights)[number];
  disabled?: boolean;
  required?: boolean | string;
  children?: React.ReactNode;
}>;

/** No bare text in the scene: only the Griffel side inherits FluentProvider typography. */
export const LabelVrScene = ({ Label }: { Label: LabelLike }): React.ReactNode => (
  <div style={{ display: 'inline-flex', flexDirection: 'column', gap: 12, padding: 24, background: '#fff' }}>
    {sizes.map(size =>
      weights.map(weight => (
        <div key={`${size}-${weight}`} style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <Label size={size} weight={weight}>
            Label
          </Label>
          <Label size={size} weight={weight} required>
            Required
          </Label>
          <Label size={size} weight={weight} required="(required)">
            Custom indicator
          </Label>
          <Label size={size} weight={weight} disabled>
            Disabled
          </Label>
          <Label size={size} weight={weight} disabled required>
            Disabled required
          </Label>
        </div>
      )),
    )}
  </div>
);
