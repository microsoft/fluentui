import { renderHook } from '@testing-library/react-hooks';
import { useBody1Styles } from './Body1/useBody1Styles.styles.css';
import { useBody1StrongStyles } from './Body1Strong/useBody1StrongStyles.styles.css';
import { useBody1StrongerStyles } from './Body1Stronger/useBody1StrongerStyles.styles.css';
import { useBody2Styles } from './Body2/useBody2Styles.styles.css';
import { useCaption1Styles } from './Caption1/useCaption1Styles.styles.css';
import { useCaption1StrongStyles } from './Caption1Strong/useCaption1StrongStyles.styles.css';
import { useCaption1StrongerStyles } from './Caption1Stronger/useCaption1Stronger.styles.css';
import { useCaption2Styles } from './Caption2/useCaption2Styles.styles.css';
import { useCaption2StrongStyles } from './Caption2Strong/useCaption2StrongStyles.styles.css';
import { useDisplayStyles } from './Display/useDisplayStyles.styles.css';
import { useLargeTitleStyles } from './LargeTitle/useLargeTitleStyles.styles.css';
import { useSubtitle1Styles } from './Subtitle1/useSubtitle1Styles.styles.css';
import { useSubtitle2Styles } from './Subtitle2/useSubtitle2Styles.styles.css';
import { useSubtitle2StrongerStyles } from './Subtitle2Stronger/useSubtitle2Stronger.styles.css';
import { useTitle1Styles } from './Title1/useTitle1Styles.styles.css';
import { useTitle2Styles } from './Title2/useTitle2Styles.styles.css';
import { useTitle3Styles } from './Title3/useTitle3Styles.styles.css';

jest.mock('./TextPresets.module.css', () => ({
  body1: 'css-body1',
  body1Strong: 'css-body1-strong',
  body1Stronger: 'css-body1-stronger',
  body2: 'css-body2',
  caption1: 'css-caption1',
  caption1Strong: 'css-caption1-strong',
  caption1Stronger: 'css-caption1-stronger',
  caption2: 'css-caption2',
  caption2Strong: 'css-caption2-strong',
  display: 'css-display',
  largeTitle: 'css-large-title',
  subtitle1: 'css-subtitle1',
  subtitle2: 'css-subtitle2',
  subtitle2Stronger: 'css-subtitle2-stronger',
  title1: 'css-title1',
  title2: 'css-title2',
  title3: 'css-title3',
}));

describe('Text preset CSS Modules styles', () => {
  it('returns a root class for every typography preset', () => {
    const { result } = renderHook(useTextPresetStyles);

    expect(result.current).toEqual({
      body1: { root: 'css-body1' },
      body1Strong: { root: 'css-body1-strong' },
      body1Stronger: { root: 'css-body1-stronger' },
      body2: { root: 'css-body2' },
      caption1: { root: 'css-caption1' },
      caption1Strong: { root: 'css-caption1-strong' },
      caption1Stronger: { root: 'css-caption1-stronger' },
      caption2: { root: 'css-caption2' },
      caption2Strong: { root: 'css-caption2-strong' },
      display: { root: 'css-display' },
      largeTitle: { root: 'css-large-title' },
      subtitle1: { root: 'css-subtitle1' },
      subtitle2: { root: 'css-subtitle2' },
      subtitle2Stronger: { root: 'css-subtitle2-stronger' },
      title1: { root: 'css-title1' },
      title2: { root: 'css-title2' },
      title3: { root: 'css-title3' },
    });
  });
});

const useTextPresetStyles = () => ({
  body1: useBody1Styles(),
  body1Strong: useBody1StrongStyles(),
  body1Stronger: useBody1StrongerStyles(),
  body2: useBody2Styles(),
  caption1: useCaption1Styles(),
  caption1Strong: useCaption1StrongStyles(),
  caption1Stronger: useCaption1StrongerStyles(),
  caption2: useCaption2Styles(),
  caption2Strong: useCaption2StrongStyles(),
  display: useDisplayStyles(),
  largeTitle: useLargeTitleStyles(),
  subtitle1: useSubtitle1Styles(),
  subtitle2: useSubtitle2Styles(),
  subtitle2Stronger: useSubtitle2StrongerStyles(),
  title1: useTitle1Styles(),
  title2: useTitle2Styles(),
  title3: useTitle3Styles(),
});
