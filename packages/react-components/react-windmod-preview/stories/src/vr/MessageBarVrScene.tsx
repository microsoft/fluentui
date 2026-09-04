// eslint-disable-next-line import/no-extraneous-dependencies -- story-only helper outside the *.stories.tsx devDependencies exemption
import * as React from 'react';

const intents = ['info', 'success', 'warning', 'error'] as const;
const layouts = ['singleline', 'multiline'] as const;

type Intent = (typeof intents)[number];
type Layout = (typeof layouts)[number];

type MessageBarLike = React.ComponentType<{
  intent?: Intent;
  layout?: Layout;
  shape?: 'rounded' | 'square';
  icon?: null;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}>;
type RegionLike = React.ComponentType<{ children?: React.ReactNode }>;
type ActionsLike = React.ComponentType<{ containerAction?: React.ReactElement; children?: React.ReactNode }>;
type ButtonLike = React.ComponentType<{
  appearance?: 'transparent';
  icon?: React.ReactElement;
  'aria-label'?: string;
  children?: React.ReactNode;
}>;
type LinkLike = React.ComponentType<{ children?: React.ReactNode }>;

const bar: React.CSSProperties = { width: 460 };

const longBody =
  'A message long enough to need a second line once the bar stops refusing to wrap, which is the ' +
  'only way the white-space and align-items halves of the layout contract become visible.';

/** One scene, two implementations — the VR runner diffs the renders pixel for pixel. */
export const MessageBarVrScene = ({
  MessageBar,
  MessageBarTitle,
  MessageBarBody,
  MessageBarActions,
  Button,
  Link,
  DismissIcon,
}: {
  MessageBar: MessageBarLike;
  MessageBarTitle: RegionLike;
  MessageBarBody: RegionLike;
  MessageBarActions: ActionsLike;
  Button: ButtonLike;
  Link: LinkLike;
  DismissIcon: React.ComponentType;
}): React.ReactNode => {
  // No `size` on either button: MessageBarActions publishes `{ size: 'small' }` through
  // ButtonContext and the button reads it, on both sides. This is the scene's ButtonContext
  // coverage — pinning the size here would hide a missing read.
  // `appearance` is not part of the published shape, so the dismiss button still states it.
  const dismiss = <Button appearance="transparent" icon={<DismissIcon />} aria-label="dismiss" />;
  const action = (label: string) => <Button>{label}</Button>;

  const cell = (key: string, props: React.ComponentProps<MessageBarLike>, children: React.ReactNode) => (
    <MessageBar key={key} style={bar} {...props}>
      {children}
    </MessageBar>
  );

  // Keyed because several cells below pass their children as an array.
  const body = (text: React.ReactNode) => <MessageBarBody key="b">{text}</MessageBarBody>;
  const titledBody = (text: React.ReactNode) => (
    <MessageBarBody key="b">
      <MessageBarTitle>Heads up</MessageBarTitle>
      {text}
    </MessageBarBody>
  );

  return (
    <div style={{ display: 'inline-flex', flexDirection: 'column', gap: 16, padding: 24, background: '#fff' }}>
      {/* 1 — reset, both grid templates, every intent background/border and icon colour */}
      {layouts.map(layout =>
        intents.map(intent => cell(`b1-${layout}-${intent}`, { layout, intent }, body('Descriptive message text.'))),
      )}

      {/* 2 — square corners over every intent, both layouts */}
      {layouts.map(layout =>
        intents.map(intent =>
          cell(`b2-${layout}-${intent}`, { layout, intent, shape: 'square' }, body('Square corners.')),
        ),
      )}

      {/* 3 — title metrics and the separating space */}
      {layouts.map(layout =>
        intents.map(intent => cell(`b3-${layout}-${intent}`, { layout, intent }, titledBody('Body after the title.'))),
      )}

      {/* 4 — the actions row: column gap, grid area, multiline justification and margins */}
      {layouts.map(layout => (
        <React.Fragment key={`b4-${layout}`}>
          {cell(`b4-${layout}-one`, { layout }, [
            body('One action.'),
            <MessageBarActions key="a">{action('Action')}</MessageBarActions>,
          ])}
          {cell(`b4-${layout}-two`, { layout }, [
            body('Two actions.'),
            <MessageBarActions key="a">
              {action('Action')}
              {action('Cancel')}
            </MessageBarActions>,
          ])}
        </React.Fragment>
      ))}

      {/* 5 — the container action area, and the empty actions root collapsing */}
      {layouts.map(layout => (
        <React.Fragment key={`b5-${layout}`}>
          {cell(`b5-${layout}-both`, { layout }, [
            body('Actions and dismiss.'),
            <MessageBarActions key="a" containerAction={dismiss}>
              {action('Action')}
            </MessageBarActions>,
          ])}
          {cell(`b5-${layout}-dismiss`, { layout }, [
            body('Dismiss only.'),
            <MessageBarActions key="a" containerAction={dismiss} />,
          ])}
        </React.Fragment>
      ))}

      {/* 6 — every region at once */}
      {layouts.map(layout =>
        cell(`b6-${layout}`, { layout, intent: 'warning' }, [
          titledBody('Everything at once.'),
          <MessageBarActions key="a" containerAction={dismiss}>
            {action('Action')}
          </MessageBarActions>,
        ]),
      )}

      {/* 7 — the grid without its icon column */}
      {layouts.map(layout => cell(`b7-${layout}`, { layout, icon: null }, body('No icon column.')))}

      {/* 8 — the bottom reflow spacer holding the gutter open with no actions present */}
      {cell('b8-plain', { layout: 'multiline' }, body('Multiline, no actions.'))}
      {cell('b8-title', { layout: 'multiline' }, titledBody('Multiline with a title, no actions.'))}

      {/* 9 — nowrap vs normal, and centre vs start alignment */}
      {layouts.map(layout => cell(`b9-${layout}`, { layout }, body(longBody)))}

      {/* 10 — every axis crossed */}
      {cell('b10', { layout: 'multiline', intent: 'error', shape: 'square' }, [
        titledBody('Square, multiline, error, everything.'),
        <MessageBarActions key="a" containerAction={dismiss}>
          {action('Retry')}
          {action('Cancel')}
        </MessageBarActions>,
      ])}

      {/* 11 — LinkContext: MessageBarBody publishes `{ inline: true }`, and the Link reads it.
          No `inline` prop on either side, mirroring Griffel's own Default/Intent stories. */}
      {layouts.map(layout =>
        cell(
          `b11-${layout}`,
          { layout },
          body(
            <>
              Message providing information to the user with actionable insights. <Link>Link</Link>
            </>,
          ),
        ),
      )}
    </div>
  );
};
