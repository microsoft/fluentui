import * as React from 'react';
import { mergeClasses, makeStyles } from '@fluentui/react-make-styles';
import { ClockIcon } from './tmp-icons.stories';
import { Divider, DividerProps } from './index';

// eslint-disable-next-line @typescript-eslint/naming-convention
interface DividerStoryProps {
  label?: string;
  children?: React.ReactChild | React.ReactChild[];
  className?: string;
}

const useStyles = makeStyles({
  root: theme => ({
    margin: `10px 10px 60px 10px`,
    padding: 0,
    backgroundColor: theme.alias.color.neutral.neutralBackground1,
    '&>.story': {
      margin: 0,
      padding: 0,
      maxWidth: `100%`,
      fontFamily: `'Segoe UI', Tahoma, Geneva, Verdana, sans-serif`,
    },
    label: {
      fontWeight: 600,
      lineHeight: `28px`,
      margin: `10px 0`,
    },
    '& .item': {
      flex: 1,
      display: `flex`,
      alignItems: `flex-start`,
      flexDirection: `column`,
      justifyContent: `center`,
      margin: `10px 0`,
      width: `100%`,
      maxWidth: `100%`,
    },
    '& .vertical label': {
      flexShrink: 1,
      flexGrow: 0,
      flexBasis: `100%`,
    },
    '& .verticalContent': {
      display: `flex`,
      flexDirection: `row`,
      alignSelf: `stretch`,
      border: `dashed 1px #d0d0d0`,
    },
  }),
  red: {
    '--divider-color': 'red',
  },
  green: {
    '--divider-color': 'green',
  },
  blue: {
    '--divider-color': 'blue',
  },
  yellow: {
    '--divider-color': 'yellow',
  },
  customColor: {
    '--divider-color': '#FF00FF',
  },
  dashed: {
    margin: '10px 0',
    borderWidth: '2px',
    '--divider-borderStyle': 'dashed',
    '--divider-borderSize': '2px',
  },
});

const DividerStory = (props?: DividerStoryProps) => {
  return (
    <div className={mergeClasses('item', props?.className)}>
      <label>{props?.label}</label>
      {props?.children}
    </div>
  );
};

const DividerExamples = (props: DividerProps) => {
  const styles = useStyles();
  return (
    <div className={styles.root}>
      <div className="story">
        <h2>Horizontal Divider</h2>
        <DividerStory label="Default">
          <Divider {...props} />
          <Divider {...props}>With content</Divider>
        </DividerStory>

        <DividerStory label="With Icon">
          <Divider {...props}>
            <ClockIcon />
          </Divider>
        </DividerStory>

        <DividerStory label="Inset">
          <Divider {...props} inset />
          <Divider {...props} inset>
            Inset with content
          </Divider>
        </DividerStory>

        <DividerStory label="Important">
          <Divider {...props} important={true}>
            This is important!
          </Divider>
        </DividerStory>

        <DividerStory label="Alignments">
          <Divider {...props} alignContent="start">
            start
          </Divider>
          <Divider {...props} alignContent="center">
            center(default)
          </Divider>
          <Divider {...props} alignContent="end">
            end
          </Divider>
        </DividerStory>

        <DividerStory label="Appearance">
          <Divider {...props} appearance="default">
            default
          </Divider>
          <Divider {...props} appearance="subtle">
            subtle
          </Divider>
          <Divider {...props} appearance="brand">
            brand
          </Divider>
          <Divider {...props} appearance="strong">
            strong
          </Divider>
        </DividerStory>

        <DividerStory label="Colors">
          <Divider {...props} className={styles.red}>
            Red
          </Divider>
          <Divider {...props} className={styles.green}>
            Green
          </Divider>
          <Divider {...props} className={styles.blue}>
            Blue
          </Divider>
          <Divider {...props} className={styles.yellow}>
            Yellow
          </Divider>
          <Divider {...props} className={styles.customColor}>
            Custom (#FF00FF)
          </Divider>
        </DividerStory>

        <h2>Vertical</h2>
        <DividerStory label="Default without container height and content" className="vertical">
          <Divider {...props} vertical />
        </DividerStory>

        <DividerStory label="With and without content" className="vertical">
          <div className="verticalContent">
            <Divider {...props} vertical>
              With Content
            </Divider>
            <Divider {...props} vertical />
          </div>
        </DividerStory>

        <DividerStory label="With Icon">
          <div className="verticalContent">
            <Divider {...props} vertical>
              <ClockIcon />
            </Divider>
          </div>
        </DividerStory>

        <DividerStory label="Inset">
          <div className="verticalContent">
            <Divider {...props} inset vertical />
            <Divider {...props} inset vertical>
              Inset with content
            </Divider>
          </div>
        </DividerStory>

        <DividerStory label="Important">
          <div className="verticalContent">
            <Divider {...props} important vertical>
              Important!
            </Divider>
          </div>
        </DividerStory>

        <DividerStory label="Alignments" className="vertical">
          <div className="verticalContent">
            <Divider {...props} alignContent="start" vertical>
              start
            </Divider>
            <Divider {...props} alignContent="center" vertical>
              center(default)
            </Divider>
            <Divider {...props} alignContent="end" vertical>
              end
            </Divider>
          </div>
        </DividerStory>

        <DividerStory label="Appearance" className="vertical">
          <div className="verticalContent">
            <Divider {...props} appearance="default" vertical>
              default
            </Divider>
            <Divider {...props} appearance="subtle" vertical>
              subtle
            </Divider>
            <Divider {...props} appearance="brand" vertical>
              brand
            </Divider>
            <Divider {...props} appearance="strong" vertical>
              strong
            </Divider>
          </div>
        </DividerStory>

        <DividerStory label="Colors" className="vertical">
          <div className="verticalContent">
            <Divider {...props} className={styles.red} vertical>
              Red
            </Divider>
            <Divider {...props} className={styles.green} vertical>
              Green
            </Divider>
            <Divider {...props} className={styles.blue} vertical>
              Blue
            </Divider>
            <Divider {...props} className={styles.yellow} vertical>
              Yellow
            </Divider>
            <Divider {...props} className={styles.customColor} vertical>
              Custom (#FF00FF)
            </Divider>
          </div>
        </DividerStory>

        <DividerStory label="Specified Height" className="vertical">
          <div className="verticalContent" style={{ height: '200px', alignItems: 'center' }}>
            <Divider {...props} vertical style={{ height: 50 }}>
              50px
            </Divider>
            <Divider {...props} vertical style={{ height: 100 }}>
              100px
            </Divider>
            <Divider {...props} vertical style={{ height: 150 }}>
              150px
            </Divider>
            <Divider {...props} vertical style={{ height: '100%' }}>
              100%*
            </Divider>
          </div>
          <span>*100% requires parent container to have a set height</span>
        </DividerStory>

        <h2>Other Appearance Modifications</h2>
        <DividerStory>
          <Divider {...props} style={{ margin: 30, width: 8000 }}>
            30px margin, 800px width
          </Divider>
          <Divider {...props} style={{ fontWeight: 800, margin: '10px 0' }}>
            800 font weight
          </Divider>
          <Divider {...props} style={{ color: 'green', fontSize: 16, margin: '10px 0' }}>
            Green font color @ 16px font size
          </Divider>
          <Divider {...props} className={styles.dashed}>
            Dashed border with a size of 2
          </Divider>
        </DividerStory>
      </div>
    </div>
  );
};
export const DividerExample = () => <DividerExamples />;

export default {
  title: 'Components/Divider',
  component: Divider,
};
