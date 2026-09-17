// eslint-disable-next-line import/no-extraneous-dependencies -- story-only helper outside the *.stories.tsx devDependencies exemption
import * as React from 'react';

const sizes = ['small', 'medium', 'large'] as const;

type Size = (typeof sizes)[number];

type BreadcrumbLike = React.ComponentType<{
  size?: Size;
  children?: React.ReactNode;
}>;

type BreadcrumbItemLike = React.ComponentType<{ children?: React.ReactNode }>;

type BreadcrumbDividerLike = React.ComponentType<Record<string, never>>;

type BreadcrumbButtonLike = React.ComponentType<{
  current?: boolean;
  disabled?: boolean;
  disabledFocusable?: boolean;
  href?: string;
  icon?: React.ReactElement;
  iconPosition?: 'before' | 'after';
  children?: React.ReactNode;
}>;

type ProviderLike = React.ComponentType<{ dir?: 'ltr' | 'rtl'; children?: React.ReactNode }>;

type Props = {
  Breadcrumb: BreadcrumbLike;
  BreadcrumbItem: BreadcrumbItemLike;
  BreadcrumbDivider: BreadcrumbDividerLike;
  BreadcrumbButton: BreadcrumbButtonLike;
  Provider: ProviderLike;
  Icon: React.ComponentType;
};

const band: React.CSSProperties = { display: 'flex', gap: 24, alignItems: 'flex-start', flexWrap: 'wrap' };

/**
 * One scene, two implementations — the VR runner diffs the renders pixel for pixel.
 *
 * The RTL band is the only cell family that can show the divider's direction-aware chevron; the
 * anchor band is the only one that reaches the current-plus-disabled branch on an <a>, which no
 * <button> cell can express.
 */
export const BreadcrumbVrScene: React.FC<Props> = ({
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbDivider,
  BreadcrumbButton,
  Provider,
  Icon,
}) => {
  const trail = (size: Size, key: string) => (
    <Breadcrumb key={key} size={size}>
      <BreadcrumbItem>
        <BreadcrumbButton>Item 1</BreadcrumbButton>
      </BreadcrumbItem>
      <BreadcrumbDivider />
      <BreadcrumbItem>
        <BreadcrumbButton icon={<Icon />}>Item 2</BreadcrumbButton>
      </BreadcrumbItem>
      <BreadcrumbDivider />
      <BreadcrumbItem>
        <BreadcrumbButton>Item 3</BreadcrumbButton>
      </BreadcrumbItem>
      <BreadcrumbDivider />
      <BreadcrumbItem>
        <BreadcrumbButton current>Item 4</BreadcrumbButton>
      </BreadcrumbItem>
    </Breadcrumb>
  );

  const one = (size: Size, key: string, button: React.ReactNode) => (
    <Breadcrumb key={key} size={size}>
      <BreadcrumbItem>{button}</BreadcrumbItem>
    </Breadcrumb>
  );

  return (
    <div style={{ display: 'inline-flex', flexDirection: 'column', gap: 16, padding: 24, background: '#fff' }}>
      {/* 1 — a full four-item trail at every size */}
      <div style={band}>{sizes.map(size => trail(size, size))}</div>

      {/* 2 — text, icon + text, and icon-only at every size */}
      <div style={band}>
        {sizes.map(size => (
          <React.Fragment key={size}>
            {one(size, `${size}-text`, <BreadcrumbButton>{size}</BreadcrumbButton>)}
            {one(size, `${size}-icon-text`, <BreadcrumbButton icon={<Icon />}>{size}</BreadcrumbButton>)}
            {one(size, `${size}-icon-only`, <BreadcrumbButton icon={<Icon />} />)}
          </React.Fragment>
        ))}
      </div>

      {/* 3 — the current weight step, with and without a glyph */}
      <div style={band}>
        {sizes.map(size => (
          <React.Fragment key={size}>
            {one(size, `${size}-current`, <BreadcrumbButton current>{size}</BreadcrumbButton>)}
            {one(
              size,
              `${size}-current-icon`,
              <BreadcrumbButton current icon={<Icon />}>
                {size}
              </BreadcrumbButton>,
            )}
          </React.Fragment>
        ))}
      </div>

      {/* 4 — the disabled looks, including the current-plus-disabled crossing */}
      <div style={band}>
        {sizes.map(size => (
          <React.Fragment key={size}>
            {one(
              size,
              `${size}-disabled`,
              <BreadcrumbButton disabled icon={<Icon />}>
                {size}
              </BreadcrumbButton>,
            )}
            {one(
              size,
              `${size}-disabled-focusable`,
              <BreadcrumbButton disabledFocusable icon={<Icon />}>
                {size}
              </BreadcrumbButton>,
            )}
            {one(
              size,
              `${size}-current-disabled`,
              <BreadcrumbButton current disabled icon={<Icon />}>
                {size}
              </BreadcrumbButton>,
            )}
          </React.Fragment>
        ))}
      </div>

      {/* 5 — a bare divider between two entries: the chevron's inherited colour and its three sizes */}
      <div style={band}>
        {sizes.map(size => (
          <Breadcrumb key={size} size={size}>
            <BreadcrumbItem>
              <BreadcrumbButton>A</BreadcrumbButton>
            </BreadcrumbItem>
            <BreadcrumbDivider />
            <BreadcrumbItem>
              <BreadcrumbButton>B</BreadcrumbButton>
            </BreadcrumbItem>
          </Breadcrumb>
        ))}
      </div>

      {/* 6 — the trailing glyph, which keeps its leading margin as well */}
      <div style={band}>
        {one(
          'medium',
          'icon-after',
          <BreadcrumbButton icon={<Icon />} iconPosition="after">
            after
          </BreadcrumbButton>,
        )}
      </div>

      {/* 7 — a bare-text item at every size */}
      <div style={band}>
        {sizes.map(size => (
          <Breadcrumb key={size} size={size}>
            <BreadcrumbItem>{size}</BreadcrumbItem>
          </Breadcrumb>
        ))}
      </div>

      {/* 8 — RTL: the chevron swaps to its mirror glyph */}
      <div style={band}>
        <Provider dir="rtl">
          <div style={band}>{(['medium', 'large'] as const).map(size => trail(size, `rtl-${size}`))}</div>
        </Provider>
      </div>

      {/* 9 — current and disabled on an anchor: the branch no button cell reaches */}
      <div style={band}>
        {(['medium', 'large'] as const).map(size => (
          <React.Fragment key={size}>
            {one(
              size,
              `${size}-anchor`,
              <BreadcrumbButton href="#a" icon={<Icon />}>
                link
              </BreadcrumbButton>,
            )}
            {one(
              size,
              `${size}-anchor-current-disabled`,
              <BreadcrumbButton href="#a" current disabled icon={<Icon />}>
                link
              </BreadcrumbButton>,
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};
