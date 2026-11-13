// eslint-disable-next-line import/no-extraneous-dependencies -- story-only helper outside the *.stories.tsx devDependencies exemption
import * as React from 'react';

const sizes = ['small', 'medium', 'large'] as const;
const appearances = ['filled', 'filled-alternative', 'outline', 'subtle'] as const;
const orientations = ['horizontal', 'vertical'] as const;

type CardLike = React.ComponentType<{
  appearance?: (typeof appearances)[number];
  orientation?: (typeof orientations)[number];
  size?: (typeof sizes)[number];
  disabled?: boolean;
  selected?: boolean;
  onClick?: () => void;
  onSelectionChange?: () => void;
  floatingAction?: { children: React.ReactNode };
  style?: React.CSSProperties;
  children?: React.ReactNode;
}>;
// The two text slots are typed as `string`, not ReactNode: a slot shorthand excludes `boolean`,
// so a ReactNode here makes neither implementation assignable to this scene's parameter.
type CardHeaderLike = React.ComponentType<{
  image?: { children: React.ReactNode };
  header?: string;
  description?: string;
  action?: { children: React.ReactNode };
}>;
type CardFooterLike = React.ComponentType<{ action?: { children: React.ReactNode }; children?: React.ReactNode }>;
type CardPreviewLike = React.ComponentType<{ logo?: { children: React.ReactNode }; children?: React.ReactNode }>;

/* A span, not an img: it makes CardPreview's `> :not(.logo) { display: block; width: 100% }` rule
   observable while keeping image-decode timing out of the capture entirely. */
const media = <span style={{ background: '#8a8886', paddingBlock: 20 }} />;
const glyph = <i style={{ display: 'block', width: 32, height: 32, background: '#605e5c' }} />;
const button = <i style={{ display: 'block', width: 40, height: 20, background: '#0078d4' }} />;

const card: React.CSSProperties = { width: 240 };
const row: React.CSSProperties = { display: 'flex', gap: 16, alignItems: 'flex-start' };
const noop = () => undefined;

/** One scene, two implementations — the VR runner diffs the renders pixel for pixel. */
export const CardVrScene = ({
  Card,
  CardHeader,
  CardFooter,
  CardPreview,
  interactiveProps,
}: {
  Card: CardLike;
  CardHeader: CardHeaderLike;
  CardFooter: CardFooterLike;
  CardPreview: CardPreviewLike;
  /** Griffel pins `focusMode="off"`: the headless Card cannot express focusMode at all, so the
      default groupper would add a tabindex and tabster dummies windmod never produces. */
  interactiveProps?: Record<string, unknown>;
}): React.ReactNode => {
  const text = <p style={{ margin: 0 }}>Card body</p>;
  const header = <CardHeader header="Header" />;
  const headerFull = (
    <CardHeader image={{ children: glyph }} header="Header" description="Description" action={{ children: button }} />
  );
  const footer = <CardFooter action={{ children: button }}>{button}</CardFooter>;
  const preview = <CardPreview>{media}</CardPreview>;
  const previewLogo = <CardPreview logo={{ children: glyph }}>{media}</CardPreview>;
  const interactive = { onClick: noop, ...interactiveProps };
  const selectable = (selected: boolean) => ({ selected, onSelectionChange: noop, ...interactiveProps });

  return (
    <div style={{ display: 'inline-flex', flexDirection: 'column', gap: 16, padding: 24, background: '#fff' }}>
      {/* 1 — the reset, three radii and paddings, four appearances, both orientations */}
      {sizes.map(size =>
        orientations.map(orientation => (
          <div key={`${size}-${orientation}`} style={row}>
            {appearances.map(appearance => (
              <Card key={appearance} style={card} size={size} appearance={appearance} orientation={orientation}>
                {text}
              </Card>
            ))}
          </div>
        )),
      )}

      {/* 2-5 — interactive, selected, selectable at rest, disabled */}
      <div style={row}>
        {appearances.map(appearance => (
          <Card key={appearance} style={card} appearance={appearance} {...interactive}>
            {text}
          </Card>
        ))}
      </div>
      <div style={row}>
        {appearances.map(appearance => (
          <Card key={appearance} style={card} appearance={appearance} {...selectable(true)}>
            {text}
          </Card>
        ))}
      </div>
      <div style={row}>
        {appearances.map(appearance => (
          <Card key={appearance} style={card} appearance={appearance} {...selectable(false)}>
            {text}
          </Card>
        ))}
      </div>
      <div style={row}>
        {appearances.map(appearance => (
          <Card key={appearance} style={card} appearance={appearance} disabled>
            {text}
          </Card>
        ))}
      </div>

      {/* 6 — the disabled look must beat the selected look by source order */}
      <div style={row}>
        <Card style={card} appearance="outline" disabled {...selectable(true)}>
          {text}
        </Card>
      </div>

      {/* 7-8 — the first-of-type and last-of-type flush margins on both axes */}
      {orientations.map(orientation => (
        <div key={`first-${orientation}`} style={row}>
          {sizes.map(size => (
            <Card key={size} style={card} size={size} orientation={orientation}>
              {preview}
              {text}
            </Card>
          ))}
        </div>
      ))}
      {orientations.map(orientation => (
        <div key={`last-${orientation}`} style={row}>
          {sizes.map(size => (
            <Card key={size} style={card} size={size} orientation={orientation}>
              {text}
              {preview}
            </Card>
          ))}
        </div>
      ))}

      {/* 9-10 — the logo's absolute placement, and the floating action's own box */}
      <div style={row}>
        <Card style={card}>
          {previewLogo}
          {text}
        </Card>
        <Card style={card} floatingAction={{ children: button }} {...selectable(false)}>
          {preview}
          {text}
        </Card>
      </div>

      {/* The sibling-combinator adjacency: the preview keeps its flush top margin only when it
          directly follows the floating action, exactly as Griffel's `+` rule resolves it. */}
      <div style={row}>
        <Card style={card} floatingAction={{ children: button }} {...selectable(false)}>
          {header}
          {preview}
          {text}
        </Card>
        <Card style={card} floatingAction={{ children: button }} {...selectable(false)}>
          {preview}
          {header}
          {text}
        </Card>
        <Card style={card} orientation="horizontal" floatingAction={{ children: button }} {...selectable(false)}>
          {preview}
          {text}
        </Card>
      </div>

      {/* 11-12 — the flex and the grid header box models, and the footer's ms-auto action */}
      <div style={row}>
        <Card style={card}>
          {header}
          {text}
          {footer}
        </Card>
        <Card style={card}>
          {headerFull}
          {text}
          {footer}
        </Card>
      </div>

      {/* 13-15 — grow on the last-of-type child, and the densest crossings */}
      <div style={row}>
        <Card style={card} orientation="horizontal">
          {preview}
          {headerFull}
        </Card>
        <Card style={card} orientation="horizontal">
          {preview}
          {footer}
        </Card>
      </div>
      <div style={row}>
        <Card style={card}>
          {preview}
          {headerFull}
          {footer}
        </Card>
        <Card style={card} size="large" appearance="outline" orientation="horizontal">
          {previewLogo}
          {headerFull}
        </Card>
      </div>
    </div>
  );
};
