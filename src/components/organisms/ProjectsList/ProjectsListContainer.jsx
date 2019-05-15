import { compose, withStateHandlers, lifecycle } from 'recompose'
import Axios from 'axios'
import ProjectsList from './ProjectsList';

export default compose(
  withStateHandlers({
    projects: []
  },
  {
    fetchAllProjects: ({projects}) => () => {
      Axios.get(`${process.env.REACT_APP_API_URL}/api/v1/projects/`, {withCredentials: true})
      .then(res => {
        this.setState({projects: res.data.data})
      })
      .catch(err => alert(err.message))
    }
  }),
  lifecycle({
    componentDidMount() {
      Axios.get(`${process.env.REACT_APP_API_URL}/api/v1/projects/`, {withCredentials: true})
      .then(res => {
        this.setState({projects: res.data.data})
      })
      .catch(err => alert(err.message))
    }
  })
)(ProjectsList)