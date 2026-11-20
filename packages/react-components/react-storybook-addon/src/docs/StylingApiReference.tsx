import * as React from 'react';
import { makeStyles } from '@griffel/react';
import { Accordion, AccordionHeader, AccordionItem, AccordionPanel } from '@fluentui/react-accordion';
import { Tab, TabList, type TabListProps, type TabValue } from '@fluentui/react-tabs';
import { tokens, webLightTheme } from '@fluentui/react-theme';
import { FluentProvider } from '@fluentui/react-provider';
import { useId } from '@fluentui/react-utilities';

import { getClassNameGroups, getDataAttributeGroups, type StylingMetadata } from './stylingMetadata';

const useStyles = makeStyles({
  section: {
    '& + &': {
      borderTop: `${tokens.strokeWidthThin} solid ${tokens.colorNeutralStroke2}`,
    },
  },
  heading: {
    margin: tokens.spacingVerticalNone,
  },
  headerButton: {
    paddingInline: tokens.spacingHorizontalS,
    color: tokens.colorNeutralForeground3,
    fontSize: tokens.fontSizeBase300,
    fontWeight: tokens.fontWeightBold,
    lineHeight: tokens.lineHeightBase300,
    textTransform: 'uppercase',
  },
  panel: {
    margin: tokens.spacingHorizontalNone,
    padding: `${tokens.spacingVerticalM} ${tokens.spacingHorizontalS} ${tokens.spacingVerticalL}`,
  },
  tabs: {
    overflowX: 'auto',
  },
  tab: {
    fontWeight: tokens.fontWeightBold,
  },
  tabPanel: {
    borderTop: `${tokens.strokeWidthThin} solid ${tokens.colorNeutralStroke2}`,
  },
  scroll: {
    overflowX: 'auto',
  },
  reference: {
    // Scope overrides of Storybook and legacy docs CSS to the opt-in API reference.
    '&:is(#storybook-docs *)': {
      '& table': {
        width: '100%',
        margin: tokens.spacingVerticalNone,
        border: 'none',
        borderCollapse: 'separate',
        borderSpacing: 0,
        boxShadow: 'none',
        fontFamily: tokens.fontFamilyBase,
        fontSize: tokens.fontSizeBase400,
        lineHeight: tokens.lineHeightBase400,
        textAlign: 'start',
      },
      '& table caption': {
        textAlign: 'start',
        fontWeight: tokens.fontWeightSemibold,
        paddingBlock: tokens.spacingVerticalS,
      },
      '& table thead, & table tbody tr': {
        border: 'none',
      },
      '& table thead th': {
        padding: `${tokens.spacingVerticalM} ${tokens.spacingHorizontalL}`,
        border: 'none',
        textAlign: 'start',
        color: tokens.colorNeutralForeground3,
        fontFamily: tokens.fontFamilyBase,
        fontSize: tokens.fontSizeBase400,
        fontWeight: tokens.fontWeightBold,
        lineHeight: tokens.lineHeightBase400,
        letterSpacing: 'normal',
      },
      '& table tbody': {
        boxShadow: tokens.shadow2,
        border: 'none',
      },
      '& table.docblock-argstable tbody.docblock-argstable-body td, & table.fluent-docs-styling-table tbody th, & table.fluent-docs-styling-table tbody td':
        {
          padding: `${tokens.spacingVerticalM} ${tokens.spacingHorizontalL}`,
          border: 'none',
          borderTop: `${tokens.strokeWidthThin} solid ${tokens.colorNeutralStroke2}`,
          textAlign: 'start',
          verticalAlign: 'top',
          backgroundColor: tokens.colorNeutralBackground1,
          fontWeight: tokens.fontWeightRegular,
        },
      '& .docblock-argstable-body > tr > td:first-child': {
        // Storybook locks the name cell's padding with !important.
        paddingLeft: `${tokens.spacingHorizontalL} !important`,
      },
      '& table tbody th, & .docblock-argstable tbody tr td:nth-child(1) span': {
        color: tokens.colorNeutralForeground3,
        fontFamily: tokens.fontFamilyBase,
        fontSize: tokens.fontSizeBase400,
        lineHeight: tokens.lineHeightBase400,
        letterSpacing: 'normal',
      },
      '& .docblock-argstable-body > tr > td:nth-child(2) p, & .docblock-argstable-body > tr > td:nth-child(2) > div:nth-child(1) > span':
        {
          fontFamily: tokens.fontFamilyBase,
          fontSize: tokens.fontSizeBase400,
          lineHeight: tokens.lineHeightBase400,
          letterSpacing: 'normal',
          color: tokens.colorNeutralForeground1,
        },
      '& .docblock-argstable-body > tr > td:nth-child(2) p': {
        marginBlock: tokens.spacingVerticalS,
      },
      '& .docblock-argstable-body > tr > td:nth-child(2) p:first-child': {
        marginTop: tokens.spacingVerticalNone,
      },
      '& .docblock-argstable-body > tr > td:nth-child(2) p:last-child': {
        marginBottom: tokens.spacingVerticalNone,
      },
      '& table.docblock-argstable code, & table.fluent-docs-styling-table code, & .docblock-argstable tbody tr td:nth-child(3) > div > span, & .docblock-argstable-body > tr > td:nth-child(2) > div:nth-child(2) span, & .docblock-argstable-body > tr > td:nth-child(2) > div:nth-child(1) > div > span':
        {
          display: 'inline-block',
          fontFamily: tokens.fontFamilyMonospace,
          fontSize: tokens.fontSizeBase300,
          fontWeight: tokens.fontWeightRegular,
          lineHeight: tokens.lineHeightBase300,
          letterSpacing: 'normal',
          margin: tokens.spacingHorizontalNone,
          padding: `${tokens.spacingVerticalNone} ${tokens.spacingHorizontalXS}`,
          border: 'none',
          borderRadius: tokens.borderRadiusSmall,
          backgroundColor: tokens.colorNeutralBackground2,
          color: tokens.colorNeutralForeground2,
          whiteSpace: 'normal',
        },
      '@media (forced-colors: active)': {
        '& table tbody th, & table tbody td, & table code': {
          border: `${tokens.strokeWidthThin} solid CanvasText`,
        },
      },
    },
  },
});

const ApiSection = ({ title, children }: { title: string; children: React.ReactNode }) => {
  const styles = useStyles();
  const headerId = useId('styling-api-header');
  const panelId = useId('styling-api-panel');
  return (
    <AccordionItem value={title} className={styles.section}>
      <AccordionHeader
        as="h3"
        className={styles.heading}
        button={{ id: headerId, 'aria-controls': panelId, className: styles.headerButton }}
        expandIconPosition="start"
      >
        {title}
      </AccordionHeader>
      <AccordionPanel id={panelId} role="region" aria-labelledby={headerId} className={styles.panel}>
        {children}
      </AccordionPanel>
    </AccordionItem>
  );
};

const StylingTable = ({
  label,
  caption,
  headers,
  children,
}: {
  label: string;
  caption?: string;
  headers: readonly string[];
  children: React.ReactNode;
}) => {
  const styles = useStyles();
  return (
    <div className={styles.scroll} role="region" aria-label={label} tabIndex={0}>
      <table className="fluent-docs-styling-table" aria-label={label}>
        {caption && <caption>{caption}</caption>}
        <thead>
          <tr>
            {headers.map(header => (
              <th key={header} scope="col">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  );
};

const ComponentTables = ({
  label,
  groups,
}: {
  label: string;
  groups: readonly { name: string; table: React.ReactElement }[];
}) => {
  const styles = useStyles();
  const id = useId('styling-api-tabs');
  const [selectedValue, setSelectedValue] = React.useState<TabValue>(groups[0]?.name);
  const selected = groups.find(group => group.name === selectedValue) ?? groups[0];
  const onTabSelect = React.useCallback<NonNullable<TabListProps['onTabSelect']>>(
    (_, data) => setSelectedValue(data.value),
    [],
  );

  if (groups.length < 2) {
    return selected?.table ?? null;
  }
  return (
    <>
      <TabList
        aria-label={`${label} components`}
        selectedValue={selected.name}
        onTabSelect={onTabSelect}
        selectTabOnFocus
        className={styles.tabs}
      >
        {groups.map((group, index) => (
          <Tab
            key={group.name}
            id={`${id}-tab-${index}`}
            aria-controls={`${id}-panel-${index}`}
            value={group.name}
            content={{ className: styles.tab }}
          >
            {group.name}
          </Tab>
        ))}
      </TabList>
      {groups.map((group, index) => (
        <div
          key={group.name}
          id={`${id}-panel-${index}`}
          role="tabpanel"
          className={styles.tabPanel}
          aria-labelledby={`${id}-tab-${index}`}
          hidden={group !== selected}
        >
          {group === selected && group.table}
        </div>
      ))}
    </>
  );
};

export const StylingApiReference = ({
  metadata,
  children,
}: {
  metadata: StylingMetadata;
  children: React.ReactNode;
}): React.ReactElement => {
  const styles = useStyles();
  const classGroups = getClassNameGroups(metadata.classNames);
  const dataGroups = getDataAttributeGroups(metadata.dataAttributes);

  if (!classGroups.length && !dataGroups.length) {
    return <>{children}</>;
  }
  return (
    <FluentProvider theme={webLightTheme}>
      <section aria-label="API Reference" className={styles.reference}>
        <h2>API Reference</h2>
        <Accordion multiple collapsible>
          <ApiSection title="Props">{children}</ApiSection>
          {dataGroups.length > 0 && (
            <ApiSection title="Data attributes">
              <ComponentTables
                label="Data attributes"
                groups={dataGroups.map(({ name, rows }) => ({
                  name,
                  table: (
                    <StylingTable
                      label={name ? `${name} data attributes` : 'Data attributes'}
                      caption={dataGroups.length === 1 ? name : undefined}
                      headers={['Slot', 'Attribute', 'Value']}
                    >
                      {rows.map(({ slot, attribute, values }) => (
                        <tr key={`${slot}-${attribute}`}>
                          <th scope="row">{slot}</th>
                          <td>
                            <code>{attribute}</code>
                          </td>
                          <td>
                            <code>
                              {values === undefined
                                ? 'presence'
                                : values.length
                                ? values.map(value => JSON.stringify(value)).join(' | ')
                                : 'string'}
                            </code>
                          </td>
                        </tr>
                      ))}
                    </StylingTable>
                  ),
                }))}
              />
            </ApiSection>
          )}
          {classGroups.length > 0 && (
            <ApiSection title="Classes">
              <ComponentTables
                label="Classes"
                groups={classGroups.map(({ name, rows }) => ({
                  name,
                  table: (
                    <StylingTable
                      label={name ? `${name} classes` : 'Classes'}
                      caption={classGroups.length === 1 ? name : undefined}
                      headers={['Slot', 'Class name']}
                    >
                      {rows.map(([slot, className]) => (
                        <tr key={slot}>
                          <th scope="row">{slot}</th>
                          <td>
                            <code>{className}</code>
                          </td>
                        </tr>
                      ))}
                    </StylingTable>
                  ),
                }))}
              />
            </ApiSection>
          )}
        </Accordion>
      </section>
    </FluentProvider>
  );
};
