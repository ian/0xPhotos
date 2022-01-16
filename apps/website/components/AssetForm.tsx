import * as yup from 'yup'
import { FormControl } from 'baseui/form-control'
import { Input } from 'baseui/input'
import { Button } from 'baseui/button'
import { Textarea } from 'baseui/textarea'
import { Radio, RadioGroup } from 'baseui/radio'

import { useFormik } from 'formik'

export default function AssetForm(props) {
  const { disabled, onSubmit } = props
  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
      license: 'rm',
      photoCredit: '',
    },
    validationSchema: yup.object().shape({
      name: yup.string().required('Required'),
      description: yup.string().required('Required'),
      license: yup.string().required('Required'),
      photoCredit: yup.string().required('Required'),
    }),
    onSubmit,
  })

  console.log({ formik })

  return (
    <div>
      <FormControl label="Name of the asset" error={formik.errors.name}>
        <Input
          name="name"
          value={formik.values.name}
          onChange={formik.handleChange}
          placeholder="Label"
          clearOnEscape
        />
      </FormControl>

      <FormControl label="Description" error={formik.errors.description}>
        <Textarea
          name="description"
          value={formik.values.description}
          onChange={formik.handleChange}
          placeholder="Label"
          clearOnEscape
        />
      </FormControl>

      <FormControl label="Photo Credit" error={formik.errors.photoCredit}>
        <Input
          name="photoCredit"
          value={formik.values.photoCredit}
          onChange={formik.handleChange}
          placeholder="First Name"
          clearOnEscape
        />
      </FormControl>

      <RadioGroup
        align="horizontal"
        name="horizontal"
        onChange={formik.handleChange}
        value={formik.values.license}
      >
        <Radio value="rf">Royalty Free</Radio>
        <Radio value="rm">Rights Managed</Radio>
      </RadioGroup>

      <div className="mt-5">
        <Button
          disabled={disabled}
          onClick={() => formik.handleSubmit()}
          type="submit"
        >
          {disabled ? 'Please upload photo first' : 'Mint Photo as NFT'}
        </Button>
      </div>
    </div>
  )
}
