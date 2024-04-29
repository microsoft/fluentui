import * as _ from 'lodash';
import * as PropTypes from 'prop-types';
import * as React from 'react';
import AceEditor, { AceEditorProps } from 'react-ace';
// These are from react-ace and we don't want to depend on brace separately
/* eslint-disable import/no-extraneous-dependencies */
import * as ace from 'brace';
import 'brace/ext/language_tools';
import 'brace/mode/jsx';
import 'brace/theme/tomorrow_night_eighties';
/* eslint-enable import/no-extraneous-dependencies */

const parentComponents = [];

// Set up custom completers by using a ace extension
// https://github.com/thlorenz/brace/issues/19
const languageTools = ace.acequire('ace/ext/language_tools');

type Completion = {
  caption: string;
  value: string;
  meta: string;
};

const semanticUIReactCompleter = {
  getCompletions(editor, session, pos, prefix, callback) {
    const completions: Completion[] = [];

    _.each(parentComponents, component => {
      const { name } = component._meta;
      // Component
      completions.push({ caption: name, value: name, meta: 'Component' });

      // Its props (propTypes do not exist in prod, use handledProps added by babel)
      _.each(component.handledProps, propName => {
        // don't add duplicate prop completions
        if (_.find(completions, { value: propName })) return;

        completions.push({ caption: propName, value: propName, meta: 'Component Prop' });
      });
    });
    callback(null, completions);
  },
};

languageTools.addCompleter(semanticUIReactCompleter);

export interface EditorProps extends AceEditorProps {
  active?: boolean;
  highlightGutterLine?: boolean;
  mode?: 'html' | 'jsx' | 'sh' | 'json';
  value?: string;
  showCursor?: boolean;
}

export const EDITOR_BACKGROUND_COLOR = '#2D2D2D';
export const EDITOR_GUTTER_COLOR = '#272727';

export class Editor extends React.PureComponent<EditorProps> {
  editorRef = React.createRef<any>();
  name = `docs-editor-${_.uniqueId()}`;

  static propTypes = {
    value: PropTypes.string.isRequired,
    mode: PropTypes.oneOf(['html', 'json', 'jsx', 'sh']),
    active: PropTypes.bool,
    showCursor: PropTypes.bool,
  };

  static defaultProps = {
    value: '',
    mode: 'jsx',
    theme: 'tomorrow_night_eighties',
    height: '100px',
    width: '100%',
    active: true,
    enableBasicAutocompletion: true,
    enableLiveAutocompletion: true,
    editorProps: { $blockScrolling: Infinity },
    setOptions: { fixedWidthGutter: true, showFoldWidgets: false },
    showPrintMargin: false,
    tabSize: 2,
    maxLines: Infinity,
    readOnly: false,
    highlightActiveLine: true,
    highlightGutterLine: true,
    showCursor: true,
  };

  componentDidMount() {
    const { showCursor } = this.props;
    this.setCursorVisibility(showCursor);
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const previousPros = this.props;
    const { active, showCursor } = nextProps;

    if (showCursor !== previousPros.showCursor) {
      this.setCursorVisibility(showCursor);
    }

    // focus editor when editor it becomes active
    if (active !== previousPros.active && active) {
      this.editorRef.current.editor.focus();
    }
  }

  handleChange = _.debounce((value: string, e) => {
    _.invoke(this.props, 'onChange', value, e);
  }, 200);

  setCursorVisibility = visible => {
    const cursor = this.editorRef.current.editor.renderer.$cursorLayer.element;

    cursor.style.display = visible ? '' : 'none';
  };

  render() {
    return <AceEditor {...this.props} name={this.name} onChange={this.handleChange} ref={this.editorRef} />;
  }
}
