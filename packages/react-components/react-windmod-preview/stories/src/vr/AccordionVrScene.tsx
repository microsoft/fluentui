// eslint-disable-next-line import/no-extraneous-dependencies -- story-only helper outside the *.stories.tsx devDependencies exemption
import * as React from 'react';

const sizes = ['small', 'medium', 'large', 'extra-large'] as const;
const positions = ['start', 'end'] as const;

type Size = (typeof sizes)[number];
type Position = (typeof positions)[number];

type AccordionLike = React.ComponentType<{
  multiple?: boolean;
  collapsible?: boolean;
  defaultOpenItems?: string[];
  children?: React.ReactNode;
}>;

type AccordionItemLike = React.ComponentType<{
  value: string;
  disabled?: boolean;
  children?: React.ReactNode;
}>;

type AccordionHeaderLike = React.ComponentType<{
  size?: Size;
  inline?: boolean;
  expandIconPosition?: Position;
  icon?: React.ReactElement;
  expandIcon?: null;
  children?: React.ReactNode;
}>;

type AccordionPanelLike = React.ComponentType<{ children?: React.ReactNode }>;

type Props = {
  Accordion: AccordionLike;
  AccordionItem: AccordionItemLike;
  AccordionHeader: AccordionHeaderLike;
  AccordionPanel: AccordionPanelLike;
  Icon: React.ComponentType;
};

// Every cell is the same width so the two sides cannot differ by available inline size alone.
const cell: React.CSSProperties = { width: 420 };
const band: React.CSSProperties = { display: 'flex', gap: 16, alignItems: 'flex-start', flexWrap: 'wrap' };

const LONG =
  'A panel body long enough to wrap across several lines, which is what makes the panel the only ' +
  'element in the family that paints inherited typography and therefore the band that fails first.';

/**
 * One scene, two implementations — the VR runner diffs the renders pixel for pixel.
 *
 * Open cells are reached through defaultOpenItems, never through a click: the Griffel panel
 * animates its height on toggle, so a clicked cell could be captured mid-animation.
 */
export const AccordionVrScene: React.FC<Props> = ({
  Accordion,
  AccordionItem,
  AccordionHeader,
  AccordionPanel,
  Icon,
}) => {
  const one = (
    key: string,
    header: React.ReactNode,
    { open = false, body = 'Panel body' }: { open?: boolean; body?: React.ReactNode } = {},
  ) => (
    <div key={key} style={cell}>
      <Accordion multiple defaultOpenItems={open ? ['one'] : []}>
        <AccordionItem value="one">
          {header}
          <AccordionPanel>{body}</AccordionPanel>
        </AccordionItem>
      </Accordion>
    </div>
  );

  return (
    <div style={{ display: 'inline-flex', flexDirection: 'column', gap: 16, padding: 24, background: '#fff' }}>
      {/* 1 — four sizes, closed and open */}
      {[false, true].map(open => (
        <div key={`size-${open}`} style={band}>
          {sizes.map(size => one(size, <AccordionHeader size={size}>{size}</AccordionHeader>, { open }))}
        </div>
      ))}

      {/* 2 — expand-icon position × open × icon presence */}
      {positions.map(position =>
        [false, true].map(open => (
          <div key={`pos-${position}-${open}`} style={band}>
            {[false, true].map(withIcon =>
              one(
                String(withIcon),
                <AccordionHeader expandIconPosition={position} icon={withIcon ? <Icon /> : undefined}>
                  {position}
                </AccordionHeader>,
                { open },
              ),
            )}
          </div>
        )),
      )}

      {/* 3 — a disabled item at every size */}
      <div style={band}>
        {sizes.map(size => (
          <div key={size} style={cell}>
            <Accordion multiple defaultOpenItems={[]}>
              <AccordionItem value="one" disabled>
                <AccordionHeader size={size}>{size}</AccordionHeader>
                <AccordionPanel>Panel body</AccordionPanel>
              </AccordionItem>
            </Accordion>
          </div>
        ))}
      </div>

      {/* 4 — inline, closed and open */}
      <div style={band}>
        {[false, true].map(open => one(String(open), <AccordionHeader inline>inline</AccordionHeader>, { open }))}
      </div>

      {/* 5 — the suppressed expand-icon slot, both positions */}
      <div style={band}>
        {positions.map(position =>
          one(
            position,
            <AccordionHeader expandIcon={null} expandIconPosition={position}>
              no chevron
            </AccordionHeader>,
          ),
        )}
      </div>

      {/* 6 — three items, one open and all open */}
      <div style={band}>
        {[['two'], ['one', 'two', 'three']].map(openItems => (
          <div key={openItems.join()} style={cell}>
            <Accordion multiple defaultOpenItems={openItems}>
              {['one', 'two', 'three'].map(value => (
                <AccordionItem key={value} value={value}>
                  <AccordionHeader>{value}</AccordionHeader>
                  <AccordionPanel>body {value}</AccordionPanel>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        ))}
      </div>

      {/* 7 — a wrapping panel body */}
      <div style={band}>{one('long', <AccordionHeader>long content</AccordionHeader>, { open: true, body: LONG })}</div>

      {/* 8 — the icon slot at every size, open */}
      <div style={band}>
        {sizes.map(size =>
          one(
            size,
            <AccordionHeader size={size} icon={<Icon />}>
              {size}
            </AccordionHeader>,
            { open: true },
          ),
        )}
      </div>
    </div>
  );
};
