import { compose, withStateHandlers, lifecycle } from 'recompose'
import Axios from 'axios'

export default compose(
  withStateHandlers({
    projects: []
  },
  {
    fetchAllProjects: ({projects}) => () => {
      Axios.get(`${process.env.REACT_APP_API_URL}/api/v1/projects/`, {withCredentials: true})
      .then(res => ({
        projects: res.data.data
      }))
      .catch(err => alert(err.message))
    }
  }),
  lifecycle({
    componentDidMount() {
      this.props.fetchAllProjects()
    }
  })
)