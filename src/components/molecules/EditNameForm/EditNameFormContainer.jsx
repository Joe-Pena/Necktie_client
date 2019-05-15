import { compose, withStateHandlers } from 'recompose'
import EditNameForm from './EditNameForm'

export default compose(
  withStateHandlers({
    activeEditForm: false,
    inputValue: ''
  },
  {
    editFormActivation: ({activeEditForm}) => (e) => {
      e.preventDefault()
      return ({
        activeEditForm: !activeEditForm
      })
    },
    changeInputValue: ({inputValue}) => (newName) => ({
      inputValue: newName
    })
  })
)(EditNameForm)