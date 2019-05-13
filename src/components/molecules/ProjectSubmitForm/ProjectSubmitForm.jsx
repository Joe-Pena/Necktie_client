import React from 'react'

const ProjectSubmitForm = ({ projectFormSubmit, inputFieldValue}) => {
  return(
  <form 
  className="home-page_welcome_project-submit-form"
  onSubmit={(e) => this.projectFormSubmit(e)}>
    <input
      type="text" 
      placeholder="Project name"
      onChange= {e => this.setState({projectField: e.target.value})}
      value= {this.state.projectField}/>
    <button type="submit">Add Project</button>
  </form>
  )
}

export default ProjectSubmitForm