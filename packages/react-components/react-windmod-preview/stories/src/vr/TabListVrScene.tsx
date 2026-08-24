// eslint-disable-next-line import/no-extraneous-dependencies -- story-only helper outside the *.stories.tsx devDependencies exemption
import * as React from 'react';

const appearances = ['transparent', 'subtle', 'subtle-circular', 'filled-circular'] as const;
const sizes = ['small', 'medium', 'large'] as const;

type TabListLike = React.ComponentType<{
  appearance?: (typeof appearances)[number];
  size?: (typeof sizes)[number];
  reserveSelectedTabSpace?: boolean;
  vertical?: boolean;
  disabled?: boolean;
  selectedValue?: string;
  children?: React.ReactNode;
}>;
// `icon` is a slot, so it is narrower than ReactNode — a boolean would not be assignable.
type TabLike = React.ComponentType<{
  value: string;
  disabled?: boolean;
  icon?: React.ReactElement;
  children?: React.ReactNode;
}>;
type IconLike = React.ComponentType<Record<string, never>>;

const column: React.CSSProperties = { display: 'flex', flexDirection: 'column', gap: 16 };
/* Bounded and wrapping: a band wider than the captured root is clipped at the boundary, and a
   partially clipped cell is not comparable. */
const row: React.CSSProperties = {
  display: 'flex',
  gap: 24,
  alignItems: 'flex-start',
  flexWrap: 'wrap',
  maxWidth: 1100,
};

/** One scene, two implementations — the VR runner diffs the renders pixel for pixel. */
export const TabListVrScene = ({
  TabList,
  Tab,
  CalendarIcon,
}: {
  TabList: TabListLike;
  Tab: TabLike;
  CalendarIcon: IconLike;
}): React.ReactNode => {
  const labelled = (
    <>
      <Tab value="a">Tab A</Tab>
      <Tab value="b">Tab B</Tab>
      <Tab value="c">Tab C</Tab>
    </>
  );

  return (
    <div style={{ display: 'inline-flex', flexDirection: 'column', gap: 16, padding: 24, background: '#fff' }}>
      {/* 1 — every appearance at every size, horizontal */}
      {sizes.map(size => (
        <div key={`h-${size}`} style={row}>
          {appearances.map(appearance => (
            <TabList key={appearance} appearance={appearance} size={size} selectedValue="a">
              {labelled}
            </TabList>
          ))}
        </div>
      ))}

      {/* 2 — the same, vertical */}
      {sizes.map(size => (
        <div key={`v-${size}`} style={row}>
          {appearances.map(appearance => (
            <TabList key={appearance} appearance={appearance} size={size} vertical selectedValue="a">
              {labelled}
            </TabList>
          ))}
        </div>
      ))}

      {/* 3 — the resting indicator across the whole rail, and an unselected list */}
      <div style={row}>
        {['a', 'b', 'c', undefined].map((selected, index) => (
          <TabList key={`sel-h-${index}`} selectedValue={selected}>
            {labelled}
          </TabList>
        ))}
      </div>
      <div style={row}>
        {['a', 'b', 'c', undefined].map((selected, index) => (
          <TabList key={`sel-v-${index}`} vertical selectedValue={selected}>
            {labelled}
          </TabList>
        ))}
      </div>

      {/* 4 — the icon slot: with content, icon-only, and both orientations */}
      <div style={row}>
        {sizes.map(size => (
          <TabList key={`icon-${size}`} size={size} selectedValue="a">
            <Tab value="a" icon={<CalendarIcon />}>
              Tab A
            </Tab>
            <Tab value="b" icon={<CalendarIcon />}>
              Tab B
            </Tab>
          </TabList>
        ))}
      </div>
      <div style={row}>
        {sizes.map(size => (
          <TabList key={`icon-only-${size}`} size={size} selectedValue="a">
            <Tab value="a" icon={<CalendarIcon />} />
            <Tab value="b" icon={<CalendarIcon />} />
          </TabList>
        ))}
        <TabList vertical selectedValue="a">
          <Tab value="a" icon={<CalendarIcon />}>
            Tab A
          </Tab>
          <Tab value="b" icon={<CalendarIcon />}>
            Tab B
          </Tab>
        </TabList>
        <TabList vertical selectedValue="a">
          <Tab value="a" icon={<CalendarIcon />} />
          <Tab value="b" icon={<CalendarIcon />} />
        </TabList>
      </div>

      {/* 5 — the reserved-space slot: the only thing holding an unselected tab at selected width */}
      <div style={row}>
        {sizes.slice(1).map(size => (
          <React.Fragment key={`reserve-${size}`}>
            <TabList size={size} selectedValue="a">
              {labelled}
            </TabList>
            <TabList size={size} reserveSelectedTabSpace={false} selectedValue="a">
              {labelled}
            </TabList>
          </React.Fragment>
        ))}
        <TabList selectedValue="a">
          <Tab value="a" icon={<CalendarIcon />}>
            Tab A
          </Tab>
          <Tab value="b" icon={<CalendarIcon />}>
            Tab B
          </Tab>
        </TabList>
      </div>

      {/* 6 — disabled at the list level, at the tab level, and vertical */}
      <div style={row}>
        {appearances.map(appearance => (
          <TabList key={`ld-${appearance}`} appearance={appearance} disabled selectedValue="a">
            {labelled}
          </TabList>
        ))}
      </div>
      <div style={row}>
        {appearances.map(appearance => (
          <TabList key={`td-${appearance}`} appearance={appearance} selectedValue="a">
            <Tab value="a">Tab A</Tab>
            <Tab value="b" disabled>
              Tab B
            </Tab>
            <Tab value="c">Tab C</Tab>
          </TabList>
        ))}
        <TabList vertical disabled selectedValue="a">
          {labelled}
        </TabList>
      </div>

      {/* 7 — long labels: overflow is hidden and the grid must not reflow */}
      <div style={row}>
        <div style={{ width: 220, ...column }}>
          <TabList selectedValue="a">
            <Tab value="a">A deliberately long tab label</Tab>
            <Tab value="b">Short</Tab>
          </TabList>
        </div>
        <div style={{ width: 220, ...column }}>
          <TabList vertical selectedValue="a">
            <Tab value="a">A deliberately long tab label</Tab>
            <Tab value="b">Short</Tab>
          </TabList>
        </div>
        <div style={{ width: 260, ...column }}>
          <TabList size="large" selectedValue="a">
            <Tab value="a" icon={<CalendarIcon />}>
              A deliberately long tab label
            </Tab>
            <Tab value="b">Short</Tab>
          </TabList>
        </div>
      </div>

      {/* 8 — circular gap, its small variant, and the circular disabled/selected crossings */}
      <div style={row}>
        {(['subtle-circular', 'filled-circular'] as const).map(appearance => (
          <React.Fragment key={`circ-${appearance}`}>
            <TabList appearance={appearance} size="small" selectedValue="a">
              {labelled}
            </TabList>
            <TabList appearance={appearance} vertical selectedValue="a">
              {labelled}
            </TabList>
            <TabList appearance={appearance} disabled selectedValue="a">
              {labelled}
            </TabList>
            <TabList appearance={appearance} selectedValue="a">
              <Tab value="a">Tab A</Tab>
              <Tab value="b" disabled>
                Tab B
              </Tab>
            </TabList>
          </React.Fragment>
        ))}
      </div>

      {/* 9 — the bundleIcon glyph swap: selected, unselected and disabled in one list */}
      <div style={row}>
        <TabList selectedValue="a">
          <Tab value="a" icon={<CalendarIcon />}>
            Tab A
          </Tab>
          <Tab value="b" icon={<CalendarIcon />}>
            Tab B
          </Tab>
          <Tab value="c" icon={<CalendarIcon />} disabled>
            Tab C
          </Tab>
        </TabList>
      </div>
    </div>
  );
};
