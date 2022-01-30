import { Accordion, Panel } from 'baseui/accordion'

export default function BrowseFilters() {
  return (
    <Accordion onChange={({ expanded }) => console.log(expanded)} accordion>
      <Panel title="Orientation">Content 1</Panel>
      <Panel title="People">Content 2</Panel>
      <Panel title="Age">Content 3</Panel>
      <Panel title="Ethnicity">Content 3</Panel>
      <Panel title="Location">Content 3</Panel>
      <Panel title="Color">Content 3</Panel>
      <Panel title="Copy Space">Content 3</Panel>
      <Panel title="Camera Type">Content 3</Panel>
    </Accordion>
  )
}
