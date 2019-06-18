/*! Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license. */
import * as React from 'react';
import Screener from 'screener-storybook/src/screener';
import { storiesOf } from '@storybook/react';
import { FabricDecorator } from '../utilities';
import { createFontStyles } from 'office-ui-fabric-react/lib/Styling';

const RepresentativeText = (props: { style: React.CSSProperties }) => (
  <div style={{ color: '#333333' }}>
    <div style={props.style}>
      <p id="ar">استكشف بعض الميزات الجديدة.</p>
      <p id="bg">Да разгледаме някои нови функции.</p>
      <p id="cs">Podívejme se na některé nové funkce.</p>
      <p id="el">Ας εξετάσουμε ορισμένες νέες δυνατότητες.</p>
      <p id="en">Let's explore some new features.</p>
      <p id="he">בוא נבחן כמה תכונות חדשות.</p>
      <p id="hi">आइए कुछ नई सुविधाओं का अन्वेषण करें.</p>
      <p id="ja">新しい機能をご紹介します。</p>
      <p id="ko">몇 가지 새로운 기능을 살펴보겠습니다.</p>
      <p id="th">มาดูฟีเจอร์ใหม่บางอย่างกัน</p>
      <p id="vi">Hãy khám phá một số tính năng mới.</p>
      <p id="zh-Hans">让我们来探索一些新功能。</p>
      <p id="zh-Hant">讓我們探索一些新的功能。</p>
    </div>
  </div>
);

function getStyle(lang: string) {
  return createFontStyles(lang).medium as React.CSSProperties;
}

storiesOf('Fonts', module)
  .addDecorator(FabricDecorator)
  .addDecorator(story =>
    // prettier-ignore
    <Screener
      steps={new Screener.Steps()
        .snapshot('default', { cropTo: '.testWrapper' })
        .end()}
    >
      {story()}
    </Screener>
  )
  .addStory('Arabic', () => <RepresentativeText style={getStyle('ar')} />)
  .addStory('Chinese (Simplified)', () => <RepresentativeText style={getStyle('zh-Hans')} />)
  .addStory('Chinese (Traditional)', () => <RepresentativeText style={getStyle('zh-Hant')} />)
  .addStory('Cyrillic', () => <RepresentativeText style={getStyle('bg')} />)
  .addStory('East European', () => <RepresentativeText style={getStyle('cs')} />)
  .addStory('Greek', () => <RepresentativeText style={getStyle('el')} />)
  .addStory('Hebrew', () => <RepresentativeText style={getStyle('he')} />)
  .addStory('Hindi', () => <RepresentativeText style={getStyle('hi')} />)
  .addStory('Japanese', () => <RepresentativeText style={getStyle('ja')} />)
  .addStory('Korean', () => <RepresentativeText style={getStyle('ko')} />)
  .addStory('Thai', () => <RepresentativeText style={getStyle('th')} />)
  .addStory('Vietnamese', () => <RepresentativeText style={getStyle('vi')} />)
  .addStory('West European', () => <RepresentativeText style={getStyle('en')} />);
