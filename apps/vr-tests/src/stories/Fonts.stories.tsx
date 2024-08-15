import * as React from 'react';
import { Steps } from 'storywright';
import { StoryWrightDecorator, TestWrapperDecorator } from '../utilities';
import { createFontStyles } from '@fluentui/react/lib/Styling';

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
      <p id="hy">Եկեք ուսումնասիրենք մի քանի նոր առանձնահատկություններ:</p>
      <p id="ka">მოდით შეისწავლონ ახალი ფუნქციები.</p>
    </div>
  </div>
);

const Weights = [300, 400, 600, 700];

function getStyle(lang: string) {
  return createFontStyles(lang).medium as React.CSSProperties;
}

export default {
  title: 'Fonts',

  decorators: [
    TestWrapperDecorator,
    StoryWrightDecorator(new Steps().snapshot('default', { cropTo: '.testWrapper' }).end()),
  ],
};

export const _Weights = () => (
  <div style={getStyle('en')}>
    {Weights.map(weight => (
      <p key={weight} style={{ fontWeight: weight }}>
        Weight {weight}: Testing fontweight
      </p>
    ))}
  </div>
);

export const Arabic = () => <RepresentativeText style={getStyle('ar')} />;
export const ChineseSimplified = () => <RepresentativeText style={getStyle('zh-Hans')} />;

ChineseSimplified.storyName = 'Chinese (Simplified)';

export const ChineseTraditional = () => <RepresentativeText style={getStyle('zh-Hant')} />;

ChineseTraditional.storyName = 'Chinese (Traditional)';

export const Cyrillic = () => <RepresentativeText style={getStyle('bg')} />;
export const EastEuropean = () => <RepresentativeText style={getStyle('cs')} />;
export const Greek = () => <RepresentativeText style={getStyle('el')} />;
export const Hebrew = () => <RepresentativeText style={getStyle('he')} />;
export const Hindi = () => <RepresentativeText style={getStyle('hi')} />;
export const Japanese = () => <RepresentativeText style={getStyle('ja')} />;
export const Korean = () => <RepresentativeText style={getStyle('ko')} />;
export const Thai = () => <RepresentativeText style={getStyle('th')} />;
export const Vietnamese = () => <RepresentativeText style={getStyle('vi')} />;
export const WestEuropean = () => <RepresentativeText style={getStyle('en')} />;
export const Armenian = () => <RepresentativeText style={getStyle('hy')} />;
export const Georgian = () => <RepresentativeText style={getStyle('ka')} />;
