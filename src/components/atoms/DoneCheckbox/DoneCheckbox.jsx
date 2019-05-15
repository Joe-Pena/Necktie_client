import React from 'react'

const DoneCheckbox = ({done, handlerFunction}) => {
  if(done) {
    return (
      <React.Fragment> 
        <input 
          type="checkbox" 
          className="projects-list_entry_project_checkbox" 
          onChange={(e) => handlerFunction(e)} 
          checked
        />
      </React.Fragment>
    )
  }
  return (
    <React.Fragment> 
      <input 
        type="checkbox" 
        className="projects-list_entry_project_checkbox" 
        onChange={(e) => handlerFunction(e)}       
      />
    </React.Fragment>
  )
}

export default DoneCheckbox