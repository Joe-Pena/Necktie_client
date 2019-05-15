import React from 'react'

const EditProjectForm = ({ activeEditForm, editFormActivation, inputValue, changeInputValue, changeProjectName}) => {
return (
  <form 
  className="projects-list_entry_project_edit-form"
  onSubmit={(e) => changeProjectName(e, inputValue)}
  >
    {activeEditForm ?
      <React.Fragment> 
        <input 
          type="text" 
          placeholder="New Name"
          onChange={(e) => changeInputValue(e)} 
          value={inputValue}
        />
        <button type="submit">Edit Name</button>
      </React.Fragment>
    : 
    <button onClick={(e) => editFormActivation(e)}>
    Edit Name
    </button>}
  </form>
)
}

export default EditProjectForm