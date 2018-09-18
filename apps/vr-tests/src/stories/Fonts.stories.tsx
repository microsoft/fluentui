/*! Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license. */
import * as React from 'react';
import Screener, { Steps } from 'screener-storybook/src/screener';
import { FabricDecorator, runStories } from '../utilities';
import { createFontStyles } from 'office-ui-fabric-react/lib/Styling';

const RepresentativeText = (props: { style: React.CSSProperties }) => (
  <div style={props.style}>
    <p id='ar'>استكشف بعض الميزات الجديدة.</p>
    <p id='bg'>Да разгледаме някои нови функции.</p>
    <p id='cs'>Podívejme se na některé nové funkce.</p>
    <p id='el'>Ας εξετάσουμε ορισμένες νέες δυνατότητες.</p>
    <p id='en'>Let's explore some new features.</p>
    <p id='he'>בוא נבחן כמה תכונות חדשות.</p>
    <p id='hi'>आइए कुछ नई सुविधाओं का अन्वेषण करें.</p>
    <p id='ja'>新しい機能をご紹介します。</p>
    <p id='ko'>몇 가지 새로운 기능을 살펴보겠습니다.</p>
    <p id='th'>มาดูฟีเจอร์ใหม่บางอย่างกัน</p>
    <p id='vi'>Hãy khám phá một số tính năng mới.</p>
    <p id='zh-Hans'>让我们来探索一些新功能。</p>
    <p id='zh-Hant'>讓我們探索一些新的功能。</p>
  </div>
);

const ScreenerDecorator = story => (
  <Screener
    steps={new Screener.Steps()
      .snapshot('default', { cropTo: '.testWrapper' })
      .end()
    }
  >
    {story()}
  </Screener>
);

const fontsStories = {
  decorators: [FabricDecorator, ScreenerDecorator],
  stories: {
    'Arabic': () => (
      <RepresentativeText style={createFontStyles('ar').medium as React.CSSProperties} />
    ),
    'Chinese (Simplified)': () => (
      <RepresentativeText style={createFontStyles('zh-Hans').medium as React.CSSProperties} />
    ),
    'Chinese (Traditional)': () => (
      <RepresentativeText style={createFontStyles('zh-Hant').medium as React.CSSProperties} />
    ),
    'Cyrillic': () => (
      <RepresentativeText style={createFontStyles('bg').medium as React.CSSProperties} />
    ),
    'East European': () => (
      <RepresentativeText style={createFontStyles('cs').medium as React.CSSProperties} />
    ),
    'Greek': () => (
      <RepresentativeText style={createFontStyles('el').medium as React.CSSProperties} />
    ),
    'Hebrew': () => (
      <RepresentativeText style={createFontStyles('he').medium as React.CSSProperties} />
    ),
    'Hindi': () => (
      <RepresentativeText style={createFontStyles('hi').medium as React.CSSProperties} />
    ),
    'Japanese': () => (
      <RepresentativeText style={createFontStyles('ja').medium as React.CSSProperties} />
    ),
    'Korean': () => (
      <RepresentativeText style={createFontStyles('ko').medium as React.CSSProperties} />
    ),
    'Thai': () => (
      <RepresentativeText style={createFontStyles('th').medium as React.CSSProperties} />
    ),
    'Vietnamese': () => (
      <RepresentativeText style={createFontStyles('vi').medium as React.CSSProperties} />
    ),
    'West European': () => (
      <RepresentativeText style={createFontStyles('en').medium as React.CSSProperties} />
    )
  }
};

runStories('Fonts', fontsStories);
