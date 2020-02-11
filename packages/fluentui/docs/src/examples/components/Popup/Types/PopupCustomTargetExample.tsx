import * as React from 'react'
import { Popup, Button, Divider, Text, Grid } from '@fluentui/react'
import { findDOMNode } from 'react-dom'

class PopupExample extends React.Component {
  ref = React.createRef<any>()
  state = { popupTarget: undefined }

  componentDidMount() {
    this.setState({ popupTarget: findDOMNode(this.ref.current) })
  }

  render() {
    return (
      <Grid columns="auto 1fr">
        {/* CUSTOM DOM ELEMENT is used as target for Popup */}
        <Popup
          target={this.state.popupTarget}
          content="well, yes, I am just a garbish text ¯\_(ツ)_/¯"
          position="below"
        >
          <Button icon="qna" circular styles={{ cursor: 'pointer' }} title="Q&amp;A" />
        </Popup>

        <div style={{ marginLeft: 10 }}>
          <Text>Could you guess what does this text means? :)</Text>
          <Divider />
          <Text ref={this.ref}>
            "To the lascivious looking-glass I, that love's majesty to strut before a want love's
            majesto, to the souls of York."
          </Text>
        </div>
      </Grid>
    )
  }
}

export default PopupExample
