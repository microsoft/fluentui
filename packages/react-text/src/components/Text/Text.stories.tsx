import { makeStyles } from '@fluentui/react-make-styles';
import * as React from 'react';
import { Text } from './Text';

const useStyles = makeStyles({
  exampleContainer: {
    width: '200px',
    padding: '20px',
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
  },
  propTogglesContainer: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'whitesmoke',
    padding: '20px',
  },
  option: {
    padding: '10px 0',
  },
});

const textSizes = [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000];
const fonts = ['base', 'monospace', 'numeric'];
const weightOptions = ['regular', 'medium', 'semibold']; // medium & semibold not working!!
const alignmentOptions = ['start', 'center', 'end', 'justify'];

export const TextStory = () => <Text> This is text with default style values </Text>;

export const TextWithStyles = () => {
  const styles = useStyles();
  const [wrap, setWrap] = React.useState(false);
  const [truncate, setTruncate] = React.useState(false);
  const [block, setBlock] = React.useState(false);
  const [italic, setItalic] = React.useState(false);
  const [underline, setUnderline] = React.useState(false);
  const [strikethrough, setStrikethrough] = React.useState(false);
  const [size, setSize] = React.useState(300);
  const [font, setFont] = React.useState('base');
  const [weight, setWeight] = React.useState('regular');
  const [align, setAlign] = React.useState('start');

  return (
    <div className={styles.container}>
      <div className={styles.propTogglesContainer}>
        <Text>Text props:</Text>
        <div className={styles.option}>
          <input id="propToggle2" type="checkbox" onChange={() => setStrikethrough(!strikethrough)} />
          <label htmlFor="propToggle2">strikethrough</label>
        </div>
        <div className={styles.option}>
          <input id="propToggle3" type="checkbox" onChange={() => setUnderline(!underline)} />
          <label htmlFor="propToggle3">underline</label>
        </div>
        <div className={styles.option}>
          <input id="propToggle4" type="checkbox" onChange={() => setItalic(!italic)} />
          <label htmlFor="propToggle4">italic</label>
        </div>
        <div className={styles.option}>
          <input id="propToggle5" type="checkbox" onChange={() => setBlock(!block)} />
          <label htmlFor="propToggle5">block</label>
        </div>
        <div className={styles.option}>
          <input id="propToggle6" type="checkbox" onChange={() => setTruncate(!truncate)} />
          <label htmlFor="propToggle6">truncate</label>
        </div>
        <div className={styles.option}>
          <input id="propToggle7" type="checkbox" onChange={() => setWrap(!wrap)} />
          <label htmlFor="propToggle7">wrap</label>
        </div>
        <div className={styles.option}>
          <label htmlFor="propSize">Font size: </label>
          <select id="propSize" defaultValue="300" onChange={e => setSize(+e.currentTarget.value)}>
            {textSizes.map(sizeOption => (
              <option key={sizeOption} value={sizeOption}>
                {sizeOption}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.option}>
          <label htmlFor="propFontFamily">Font family: </label>
          <select id="propFontFamily" defaultValue="base" onChange={e => setFont(e.currentTarget.value)}>
            {fonts.map(fontOption => (
              <option key={fontOption} value={fontOption}>
                {fontOption}
              </option>
            ))}
          </select>
        </div>
        {/* TODO: check the weights again */}
        <div className={styles.option}>
          <label htmlFor="propWeight">Font weight: </label>
          <select id="propWeight" defaultValue="regular" onChange={e => setWeight(e.currentTarget.value)}>
            {weightOptions.map(weightOption => (
              <option key={weightOption} value={weightOption}>
                {weightOption}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.option}>
          <label htmlFor="propAlign">Alignment: </label>
          <select id="propAlign" defaultValue="start" onChange={e => setAlign(e.currentTarget.value)}>
            {alignmentOptions.map(alignOption => (
              <option key={alignOption} value={alignOption}>
                {alignOption}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className={styles.exampleContainer}>
        <Text
          strikethrough={strikethrough}
          underline={underline}
          italic={italic}
          block={block}
          truncate={truncate}
          wrap={wrap}
          size={size}
          font={font}
          weight={weight}
          align={align}
        >
          Jelly beans biscuit jelly oat cake cheesecake. Liquorice jelly beans cupcake. Apple pie croissant sugar plum
          carrot cake.
        </Text>
      </div>
    </div>
  );
};

export default {
  title: 'Components/Text',
  component: Text,
};
