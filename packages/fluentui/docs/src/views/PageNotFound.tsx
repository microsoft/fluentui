import * as React from 'react';
import DocumentTitle from 'react-document-title';
import { Grid, Segment, Header } from '@fluentui/react-northstar';

const PageNotFound = () => (
  <Grid>
    <DocumentTitle title={`Fluent UI - 404`} />
    <div>
      <Header as="h1" align="center">
        :( 404
        <Header.Description>How about some good old Atari?</Header.Description>
      </Header>
    </div>

    <div>
      <Segment>
        <embed
          src="http://www.pizn.com/swf/classic-asteroids.swf"
          width="425"
          height="318"
          {...{
            align: 'center',
            quality: 'high',
            pluginspage: 'http://www.macromedia.com/go/getflashplayer',
            type: 'application/x-shockwave-flash',
          }}
          style={{ zoom: '1.13' }}
        />
      </Segment>
    </div>
    <div>
      <Segment>
        <embed
          src="http://www.pizn.com/swf/1-space-invaders.swf"
          width="425"
          height="359"
          {...{
            align: 'center',
            quality: 'high',
            pluginspage: 'http://www.macromedia.com/go/getflashplayer',
            type: 'application/x-shockwave-flash',
          }}
        />
      </Segment>
    </div>
  </Grid>
);

export default PageNotFound;
