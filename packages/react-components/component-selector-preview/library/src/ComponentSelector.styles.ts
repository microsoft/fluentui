import { makeStyles, tokens } from '@fluentui/react-components';

export const useStyles = makeStyles({
  visuallyHidden: {
    clip: 'rect(0px, 0px, 0px, 0px)',
    height: '1px',
    width: '1px',
    margin: '-1px',
    padding: '0px',
    overflow: 'hidden',
    position: 'absolute',
  },
  secondLevel: { 'margin-left': '30px' },
  thirdLevel: { 'margin-left': '60px' },
  forthLevel: { 'margin-left': '90px' },
  heading: { margin: '30px 0 10px 0' },
  root: {
    // Stack the label above the field with a gap
    display: 'flex',
    flexWrap: 'wrap',
    gap: '2px',
    maxWidth: '1600px',
  },
  tagsList: {
    listStyleType: 'none',
    marginBottom: tokens.spacingVerticalXXS,
    marginTop: 0,
    paddingLeft: 0,
    display: 'flex',
    gridGap: tokens.spacingHorizontalXXS,
  },
  tooltip: { maxWidth: '500px important!', backgroundColor: 'red' },
  componentWrapper: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    overflow: 'hidden',
  },
  bodyWrapper: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    padding: '20px',
    overflowY: 'auto',
    maxHeight: 'calc(100vh - 490px)',
  },
  footerWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    position: 'sticky',
    bottom: '0',
    width: '100%',
    padding: '30px 0 0 0',
    overflowX: 'auto',
  },
  headerWrapper: {
    display: 'flex',
    flexDirection: 'column',
  },
  questionsWrapper: {
    padding: '20px',
    margin: '20px 0',
    backgroundColor: 'white',
    borderRadius: '16px',
    border: '1px solid var(--colorNeutralStroke1, #e1dfdd)',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  },
  questionsLabel: {
    color: '#ff00ff',
    fontWeight: tokens.fontWeightBold,
    marginRight: '8px',
  },
  questionsText: {
    fontWeight: tokens.fontWeightBold,
    fontSize: tokens.fontSizeBase400,
  },
  questionContainer: {
    display: 'flex',
  },
  questionRightSide: {
    borderLeft: '1px solid #ff00ff',
    padding: '0 10px',
  },
  radioItem: {
    display: 'flex',
  },
  selectedItemTag: {
    color: 'white',
    backgroundColor: '#5b5fc7',
  },
  selectedItemsContainer: {
    marginLeft: '10px',
  },
  selectedComponentTitle: {
    marginBottom: '10px',
  },
  actionsHeaderWrapper: {
    display: 'flex',
    margin: '15px 0',
  },
  searchComponentInput: {
    alignSelf: 'flex-start',
    width: '300px',
    marginLeft: '20px',
  },
  jumpToCategoryHeader: {
    alignSelf: 'flex-start',
    paddingLeft: '10px',
    fontSize: 'medium',
  },
  jumpToCategoryButtons: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: '20px',
  },
  jumpToCategoryTags: {
    overflowX: 'hidden',
    width: '800px',
  },
  jumpToCategoryTag: {
    cursor: 'pointer',
    color: 'white',
    backgroundColor: '#5b5fc7',
  },
  actionsHeader: {
    margin: 0,
  },
  actionsHeaderIcon: {
    marginLeft: '5px',
  },
  clearSelection: {
    flexShrink: 0,
    marginLeft: '10px',
  },
  moreButton: {
    color: 'white',
    backgroundColor: '#5b5fc7',
    maxHeight: '32px',
    margin: '0 10px',
    fontWeight: '400',
  },
  fillOutSection: {
    display: 'flex',
    justifyContent: 'end',
  },
  headerHeadingAndInput: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  QuestionsAndResults: {
    display: 'flex',
  },
  allQuestions: {
    width: '50%',
  },
  resultsWrapper: {
    width: '50%',
    paddingLeft: '50px',
  },
  results: {
    position: 'sticky',
    top: '5%',
  },
});
