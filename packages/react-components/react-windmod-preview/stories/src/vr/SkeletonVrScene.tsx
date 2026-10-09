// eslint-disable-next-line import/no-extraneous-dependencies -- story-only helper outside the *.stories.tsx devDependencies exemption
import * as React from 'react';

const sizes = [8, 12, 14, 16, 20, 22, 24, 28, 32, 36, 40, 48, 52, 56, 64, 72, 92, 96, 120, 128] as const;
const animations = ['wave', 'pulse'] as const;
const appearances = ['opaque', 'translucent'] as const;

type SkeletonLike = React.ComponentType<{
  animation?: (typeof animations)[number];
  appearance?: (typeof appearances)[number];
  size?: (typeof sizes)[number];
  shape?: 'circle' | 'rectangle' | 'square';
  as?: 'div' | 'span';
  style?: React.CSSProperties;
  children?: React.ReactNode;
}>;
type SkeletonItemLike = React.ComponentType<Omit<React.ComponentProps<SkeletonLike>, 'children'>>;

const column: React.CSSProperties = { display: 'flex', flexDirection: 'column', gap: 16 };
const wrap: React.CSSProperties = { width: 640, display: 'flex', flexWrap: 'wrap', gap: 8 };

/* translucent over white composites to the same hex as opaque, so the appearance dimension is
   only discriminable against a mid-grey ground. */
const strip: React.CSSProperties = { background: '#8a8a8a', padding: 12, ...column };

/** One scene, two implementations — the VR runner diffs the renders pixel for pixel. */
export const SkeletonVrScene = ({
  Skeleton,
  SkeletonItem,
}: {
  Skeleton: SkeletonLike;
  SkeletonItem: SkeletonItemLike;
}): React.ReactNode => (
  <div style={{ display: 'inline-flex', flexDirection: 'column', gap: 16, padding: 24, background: '#fff' }}>
    <div style={{ width: 320, ...column }}>
      {sizes.map(size => (
        <SkeletonItem key={size} size={size} />
      ))}
    </div>
    <div style={wrap}>
      {sizes.map(size => (
        <SkeletonItem key={size} shape="square" size={size} />
      ))}
    </div>
    <div style={wrap}>
      {sizes.map(size => (
        <SkeletonItem key={size} shape="circle" size={size} />
      ))}
    </div>

    <div style={strip}>
      {animations.map(animation =>
        appearances.map(appearance => (
          <Skeleton
            key={`${animation}-${appearance}`}
            animation={animation}
            appearance={appearance}
            style={{ width: 240, ...column }}
          >
            <SkeletonItem />
            <SkeletonItem shape="circle" size={48} />
            <SkeletonItem shape="square" size={32} />
          </Skeleton>
        )),
      )}
    </div>

    <div style={strip}>
      <Skeleton size={48} shape="circle" style={{ width: 240, ...column }}>
        <SkeletonItem />
        <SkeletonItem />
        <SkeletonItem />
      </Skeleton>
      <Skeleton size={92} shape="square" style={{ width: 240, ...column }}>
        <SkeletonItem />
        <SkeletonItem />
        <SkeletonItem />
      </Skeleton>
      <Skeleton size={24} style={{ width: 240, ...column }}>
        <SkeletonItem />
        <SkeletonItem />
        <SkeletonItem />
      </Skeleton>
    </div>

    <div style={strip}>
      <Skeleton animation="pulse" appearance="translucent" size={48} shape="circle" style={{ width: 320, ...column }}>
        <SkeletonItem />
        <SkeletonItem animation="wave" />
        <SkeletonItem appearance="opaque" />
        <SkeletonItem shape="rectangle" />
        <SkeletonItem shape="square" />
        <SkeletonItem size={16} />
        <SkeletonItem animation="wave" appearance="opaque" shape="rectangle" size={92} />
      </Skeleton>
    </div>

    <div style={strip}>
      <Skeleton animation="pulse" appearance="translucent" size={48} shape="circle" style={{ width: 240, ...column }}>
        <SkeletonItem />
        <Skeleton style={column}>
          <SkeletonItem />
        </Skeleton>
      </Skeleton>
    </div>

    {/* The only place display: block is observable — an inline style would mask it. */}
    <Skeleton as="span" style={{ width: 240 }}>
      <SkeletonItem as="span" size={24} />
      <SkeletonItem as="span" shape="circle" size={32} />
    </Skeleton>

    <div style={{ width: 240, ...column }}>
      <SkeletonItem />
      <SkeletonItem shape="circle" />
      <SkeletonItem shape="square" />
    </div>
  </div>
);
