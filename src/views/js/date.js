import { html } from './preact.js'

export default function DateComponent({dt}) {
  return html`
    <div>
      <time datetime=${dt}>${dt.toISOString()}</time>
    </div>
  `
}
