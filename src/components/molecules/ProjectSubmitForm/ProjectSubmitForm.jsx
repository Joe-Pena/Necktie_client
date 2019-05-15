import React from 'react'

const ProjectSubmitForm = ({ projectFormSubmit, setFieldValue, inputFieldValue}) => {
  return(
  <form
  className="home-page_welcome_project-submit-form"
  onSubmit={(e) => {
    projectFormSubmit(e, inputFieldValue)
    setFieldValue('')
  }}>
    <input
      type="text" 
      placeholder="Project name"
      onChange= {e => setFieldValue(e.target.value)}
      value= {inputFieldValue}/>
    <button type="submit">Add Project</button>
  </form>
  )
}

export default ProjectSubmitForm