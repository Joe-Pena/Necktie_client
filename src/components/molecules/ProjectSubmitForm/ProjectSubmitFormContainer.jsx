import { compose, withStateHandlers } from 'recompose'
import ProjectSubmitForm from './ProjectSubmitForm'

export default compose(
  withStateHandlers({
    inputFieldValue: ''
  },
  {
    setFieldValue: ({ inputFieldValue }) => (value) => ({
      inputFieldValue: value
    })
  })
)(ProjectSubmitForm)