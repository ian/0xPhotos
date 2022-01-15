import { useState } from 'react'
import { FormControl } from 'baseui/form-control'
import { Input } from 'baseui/input'

export default function AssetForm() {
  const [value, setValue] = useState('')

  return (
    <div>
      <FormControl label="Photo Credit">
        <div className="flex justify-between space-x-2">
          <Input
            value={value}
            // @ts-ignore
            onChange={(e) => setValue(e.target.value)}
            placeholder="First Name"
            clearOnEscape
          />
          <Input
            value={value}
            // @ts-ignore
            onChange={(e) => setValue(e.target.value)}
            placeholder="Last Name"
            clearOnEscape
          />
        </div>
      </FormControl>
    </div>
  )
}
