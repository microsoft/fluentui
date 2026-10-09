// eslint-disable-next-line import/no-extraneous-dependencies -- story-only helper outside the *.stories.tsx devDependencies exemption
import * as React from 'react';

const sizes = ['small', 'medium', 'large'] as const;
const appearances = ['primary', 'subtle', 'transparent'] as const;

type Appearance = (typeof appearances)[number];
type Size = (typeof sizes)[number];

type ToolbarLike = React.ComponentType<{
  size?: Size;
  vertical?: boolean;
  defaultCheckedValues?: Record<string, string[]>;
  style?: React.CSSProperties;
  'aria-label'?: string;
  children?: React.ReactNode;
}>;

type ToolbarButtonLike = React.ComponentType<{
  appearance?: Appearance;
  vertical?: boolean;
  disabled?: boolean;
  disabledFocusable?: boolean;
  icon?: React.ReactElement;
  'aria-label'?: string;
  children?: React.ReactNode;
}>;

type ToolbarToggleLike = React.ComponentType<{
  name: string;
  value: string;
  appearance?: Appearance;
  size?: Size;
  disabled?: boolean;
  disabledFocusable?: boolean;
  icon?: React.ReactElement;
  'aria-label'?: string;
  children?: React.ReactNode;
}>;

type ToolbarGroupLike = React.ComponentType<{ children?: React.ReactNode }>;
type ToolbarDividerLike = React.ComponentType<Record<string, never>>;

const band: React.CSSProperties = { display: 'flex', gap: 12, alignItems: 'flex-start', flexWrap: 'wrap' };

/**
 * One scene, two implementations — the VR runner diffs the renders pixel for pixel.
 *
 * No bare text may sit directly inside a Toolbar or a ToolbarGroup: neither root pins
 * typography, so loose text would compare inherited fonts rather than component styles.
 */
export const ToolbarVrScene = ({
  Toolbar,
  ToolbarButton,
  ToolbarToggleButton,
  ToolbarRadioButton,
  ToolbarDivider,
  ToolbarGroup,
  ToolbarRadioGroup,
  Icon,
}: {
  Toolbar: ToolbarLike;
  ToolbarButton: ToolbarButtonLike;
  ToolbarToggleButton: ToolbarToggleLike;
  ToolbarRadioButton: ToolbarToggleLike;
  ToolbarDivider: ToolbarDividerLike;
  ToolbarGroup: ToolbarGroupLike;
  ToolbarRadioGroup: ToolbarGroupLike;
  Icon: React.ComponentType;
}): React.ReactNode => (
  <div style={{ display: 'inline-flex', flexDirection: 'column', gap: 16, padding: 24, background: '#fff' }}>
    {/* The three paddings in both orientations. */}
    {[false, true].map(vertical =>
      sizes.map(size => (
        <Toolbar key={`size-${size}-${vertical}`} size={size} vertical={vertical} aria-label="sizes">
          <ToolbarButton icon={<Icon />} aria-label="icon" />
          <ToolbarButton icon={<Icon />}>Label</ToolbarButton>
          <ToolbarDivider />
          <ToolbarButton icon={<Icon />} aria-label="icon" />
        </Toolbar>
      )),
    )}

    {/* Every appearance against the three content shapes. */}
    <div style={band}>
      {appearances.map(appearance => (
        <Toolbar key={`appearance-${appearance}`} aria-label="appearances">
          <ToolbarButton appearance={appearance} icon={<Icon />}>
            Label
          </ToolbarButton>
          <ToolbarButton appearance={appearance} icon={<Icon />} aria-label="icon" />
          <ToolbarButton appearance={appearance}>Text</ToolbarButton>
        </Toolbar>
      ))}
    </div>

    {/* The composed disabled look on all three appearances. */}
    <div style={band}>
      {appearances.map(appearance => (
        <Toolbar key={`disabled-${appearance}`} aria-label="disabled">
          <ToolbarButton appearance={appearance} icon={<Icon />} disabled>
            Disabled
          </ToolbarButton>
          <ToolbarButton appearance={appearance} icon={<Icon />} disabledFocusable>
            Focusable
          </ToolbarButton>
        </Toolbar>
      ))}
    </div>

    {/* Vertical buttons: flex-col, the 24px glyph and the m-0 gap removal. */}
    <div style={band}>
      {appearances.map(appearance => (
        <Toolbar key={`vertical-button-${appearance}`} aria-label="vertical buttons">
          <ToolbarButton appearance={appearance} vertical icon={<Icon />}>
            Label
          </ToolbarButton>
          <ToolbarButton appearance={appearance} vertical icon={<Icon />} aria-label="icon" />
        </Toolbar>
      ))}
    </div>

    {/* The l3 checked override on every appearance, both toggle kinds. */}
    <div style={band}>
      {appearances.map(appearance => (
        <Toolbar
          key={`checked-${appearance}`}
          defaultCheckedValues={{ t: ['on'], r: ['on'] }}
          aria-label="checked states"
        >
          <ToolbarToggleButton name="t" value="on" appearance={appearance} icon={<Icon />}>
            On
          </ToolbarToggleButton>
          <ToolbarToggleButton name="t" value="off" appearance={appearance} icon={<Icon />}>
            Off
          </ToolbarToggleButton>
          <ToolbarRadioButton name="r" value="on" appearance={appearance} icon={<Icon />}>
            On
          </ToolbarRadioButton>
          <ToolbarRadioButton name="r" value="off" appearance={appearance} icon={<Icon />}>
            Off
          </ToolbarRadioButton>
        </Toolbar>
      ))}
    </div>

    {/* The three l3 disabled crossings the layer would otherwise invert. */}
    <div style={band}>
      <Toolbar defaultCheckedValues={{ t: ['on'], r: ['on'] }} aria-label="checked disabled">
        <ToolbarToggleButton name="t" value="on" appearance="subtle" icon={<Icon />} disabled>
          Subtle
        </ToolbarToggleButton>
        <ToolbarToggleButton name="t" value="on2" appearance="primary" icon={<Icon />} disabled>
          Primary
        </ToolbarToggleButton>
        <ToolbarToggleButton name="t" value="none" appearance="subtle" icon={<Icon />} disabled>
          Unchecked
        </ToolbarToggleButton>
        <ToolbarRadioButton name="r" value="on" appearance="subtle" icon={<Icon />} disabled>
          Subtle
        </ToolbarRadioButton>
        <ToolbarRadioButton name="r" value="on2" appearance="primary" icon={<Icon />} disabled>
          Primary
        </ToolbarRadioButton>
        <ToolbarRadioButton name="r" value="none" appearance="subtle" icon={<Icon />} disabled>
          Unchecked
        </ToolbarRadioButton>
      </Toolbar>
    </div>

    {/* Size crossing the context into the composed Button geometry. */}
    <div style={band}>
      {(['small', 'large'] as const).map(size => (
        <Toolbar
          key={`context-size-${size}`}
          size={size}
          defaultCheckedValues={{ t: ['on'] }}
          aria-label="sized toggles"
        >
          <ToolbarToggleButton name="t" value="on" icon={<Icon />}>
            On
          </ToolbarToggleButton>
          <ToolbarToggleButton name="t" value="off" icon={<Icon />}>
            Off
          </ToolbarToggleButton>
        </Toolbar>
      ))}
    </div>

    {/* Both group roots in both orientations. */}
    {[false, true].map(vertical => (
      <Toolbar key={`groups-${vertical}`} vertical={vertical} defaultCheckedValues={{ r: ['a'] }} aria-label="groups">
        <ToolbarGroup>
          <ToolbarButton icon={<Icon />}>One</ToolbarButton>
          <ToolbarButton icon={<Icon />}>Two</ToolbarButton>
        </ToolbarGroup>
        <ToolbarRadioGroup>
          <ToolbarRadioButton name="r" value="a" icon={<Icon />}>
            A
          </ToolbarRadioButton>
          <ToolbarRadioButton name="r" value="b" icon={<Icon />}>
            B
          </ToolbarRadioButton>
        </ToolbarRadioGroup>
      </Toolbar>
    ))}

    {/* The divider's inverted orientation in both toolbar directions. */}
    {[false, true].map(vertical => (
      <Toolbar key={`divider-${vertical}`} vertical={vertical} aria-label="divider">
        <ToolbarButton icon={<Icon />} aria-label="before" />
        <ToolbarDivider />
        <ToolbarButton icon={<Icon />} aria-label="after" />
      </Toolbar>
    ))}

    {/* The far-group shape, which also proves the consumer style survives. */}
    <Toolbar style={{ width: 360, justifyContent: 'space-between' }} aria-label="far group">
      <ToolbarGroup>
        <ToolbarButton icon={<Icon />}>Near</ToolbarButton>
      </ToolbarGroup>
      <ToolbarGroup>
        <ToolbarButton icon={<Icon />}>Far</ToolbarButton>
      </ToolbarGroup>
    </Toolbar>
  </div>
);
