import * as React from 'react';
import {
  ArgsTable,
  Description,
  DocsContext,
  HeaderMdx,
  Primary,
  PRIMARY_STORY,
  Stories,
  Subtitle,
  Title,
} from '@storybook/addon-docs';
import { makeStyles, shorthands } from '@griffel/react';
import { nameToHash, Toc } from './Toc.stories';
import { tokens } from '@fluentui/react-components';
import { THEME_ID, themes } from '@fluentui/react-storybook-addon';
import { ThemePicker } from './ThemePicker.stories';

const useStyles = makeStyles({
  divider: {
    height: '1px',
    backgroundColor: '#e1dfdd',
    ...shorthands.border('0px', 'none'),
    ...shorthands.margin('48px', '0px'),
  },
  wrapper: {
    display: 'flex',
    ...shorthands.gap('16px'),
  },
  toc: {
    flexBasis: '200px',
    flexShrink: 0,
    [`@media screen and (max-width: 1000px)`]: {
      display: 'none',
    },
  },
  container: {
    // without a width, this div grows wider than its parent
    width: '200px',
    flexGrow: 1,
  },
});

export const FluentDocsPage = () => {
  const context = React.useContext(DocsContext);

  const selectedTheme = themes.find(theme => theme.id === context.globals![THEME_ID]);
  const stories = context.componentStories();
  const primaryStory = stories[0];
  const styles = useStyles();
  // DEBUG
  // console.log('FluentDocsPage', context);
  // console.table(stories.map((s: StoreItem) => ({ id: s.id, kind: s.kind, name: s.name, story: s.story })));
  // console.table(
  //   Object.values((context as any).argTypes).map(arg => ({
  //     name: arg.name,
  //     description: arg.description,
  //     type: arg.table?.type?.summary ?? '?',
  //     default: arg.table?.defaultValue?.summary ?? '-',
  //   })),
  // );

  const camelCaseToTitleCase = (str: string) =>
    str
      .replace(/([A-Z])/g, ' $1')
      .charAt(0)
      .toUpperCase() + str.replace(/([A-Z])/g, ' $1').slice(1);

  const { slotsArgs, propArgs, eventArgs } = Object.values((context as any).argTypes)
    // .filter(arg => !/children|^default/.test(arg.name))
    .filter(arg => stories.every(s => s.name !== camelCaseToTitleCase(arg.name)))
    .reduce(
      (acc, arg) => {
        const element = (
          <>
            <h3 style={{ whiteSpace: 'nowrap' }}>{camelCaseToTitleCase(arg.name)}</h3>
            <p>
              <code>{arg.name}</code> {arg.description}
            </p>
          </>
        );

        if (arg.table?.type?.summary.includes('Slot') || /slot/gi.test(arg.description)) {
          acc.slotsArgs.push(element);
        } else if (arg.name.startsWith('on')) {
          acc.eventArgs.push(element);
        } else {
          acc.propArgs.push(element);
        }

        return acc;
      },
      { slotsArgs: [], propArgs: [], eventArgs: [] },
    );

  return (
    <div>
      {/*<div>*/}
      {/*  <h1>TODO</h1>*/}
      {/*  <p>*/}
      {/*    "On this page" should become something like:*/}
      {/*    <ul>*/}
      {/*      <li>Slots</li>*/}
      {/*      <li>Usage</li>*/}
      {/*      <li>Props</li>*/}
      {/*      <li>Events</li>*/}
      {/*    </ul>*/}
      {/*  </p>*/}
      {/*</div>*/}
      {/*{(slotsArgs.length || propArgs.length || eventArgs.length) && (*/}
      {/*  <div*/}
      {/*    style={{*/}
      {/*      display: 'grid',*/}
      {/*      gap: '0 16px',*/}
      {/*      gridTemplateColumns: 'min-content 1fr',*/}
      {/*      alignItems: 'center',*/}
      {/*      padding: `${tokens.spacingVerticalM} ${tokens.spacingHorizontalM}`,*/}
      {/*      backgroundColor: tokens.colorPaletteRedBackground1,*/}
      {/*      color: tokens.colorPaletteRedForeground1,*/}
      {/*    }}*/}
      {/*  >*/}
      {/*    <h1 style={{ textAlign: 'center', gridColumn: 'span 2' }}>Missing Stories!</h1>*/}
      {/*    {!!slotsArgs.length && (*/}
      {/*      <>*/}
      {/*        <h2 style={{ textAlign: 'center', gridColumn: 'span 2' }}>Slots</h2>*/}
      {/*        {slotsArgs}*/}
      {/*      </>*/}
      {/*    )}*/}
      {/*    {!!propArgs.length && (*/}
      {/*      <>*/}
      {/*        <h2 style={{ textAlign: 'center', gridColumn: 'span 2' }}>Props</h2>*/}
      {/*        {propArgs}*/}
      {/*      </>*/}
      {/*    )}*/}
      {/*    {!!eventArgs.length && (*/}
      {/*      <>*/}
      {/*        <h2 style={{ textAlign: 'center', gridColumn: 'span 2' }}>Events</h2>*/}
      {/*        {eventArgs}*/}
      {/*      </>*/}
      {/*    )}*/}
      {/*  </div>*/}
      {/*)}*/}
      <Title />

      <div className={styles.wrapper}>
        <div className={styles.container}>
          <ThemePicker selectedThemeId={selectedTheme?.id} />
          <Subtitle />
          <Description />
          <hr className={styles.divider} />
          <HeaderMdx as="h3" id={nameToHash(primaryStory.name)}>
            {primaryStory.name}
          </HeaderMdx>
          <Primary />
          <ArgsTable story={PRIMARY_STORY} />
          <Stories />
        </div>
        <div className={styles.toc}>
          <Toc stories={stories} />
        </div>
      </div>
    </div>
  );
};
