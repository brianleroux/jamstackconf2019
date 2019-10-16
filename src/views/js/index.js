// https://unpkg.com/htm@2.2.1/preact/standalone.module.js
import { html, render } from './preact.js'
import log from './log.js'
import DateComponent from './date.js'

const app = html`
  <${DateComponent} dt=${new Date(Date.now())} //>
`

render(app, document.getElementById('app'))

log('app running')
