import * as React from 'react'
import { TeamsProcessedSvgIconSpec } from '../types'

export default {
  icon: ({ classes }) => (
    <svg role="presentation" focusable="false" viewBox="8 8 16 16" className={classes.svg}>
      <g>
        <path d="M20.5 8H15c-.4 0-.777.156-1.083.463l-3.478 3.968c-.283.283-.439.66-.439 1.06V22.5c0 .827.673 1.5 1.5 1.5h9c.827 0 1.5-.673 1.5-1.5v-13c0-.827-.673-1.5-1.5-1.5zm-6.514 1.9V13h-2.718l2.718-3.1zM21 22.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V14h3.986V9.003c.005 0 .01-.003.014-.003h5.5a.5.5 0 0 1 .5.5v13zm-6.098-6.407L13.65 20h.736l.336-1.107h1.24L16.318 20h.765l-1.27-3.907h-.91zm-.064 2.26l.302-.962c.07-.231.127-.504.185-.73h.012c.058.226.122.493.197.73l.307.963h-1.003zM17.72 16c-.237 0-.4.168-.4.389 0 .214.157.382.395.382.249 0 .405-.168.405-.383a.381.381 0 0 0-.4-.388z" />
        <path d="M17.36 17.177h.719V20h-.719z" />
      </g>
    </svg>
  ),
  styles: {},
} as TeamsProcessedSvgIconSpec
