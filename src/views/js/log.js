export default function log(...args) {
  console.log.apply({}, args)
}
