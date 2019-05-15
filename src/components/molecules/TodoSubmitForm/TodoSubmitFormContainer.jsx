import { compose, withStateHandlers } from 'recompose'
import TodoSubmitForm from './TodoSubmitForm';

export default compose(
  withStateHandlers({
    inputValue: ''
  },
  {
    changeInputValue: ({inputValue}) => (e) => ({
      inputValue: e.target.value
    })
  })
)(TodoSubmitForm)