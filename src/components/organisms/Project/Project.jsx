import React from 'react'
import { DoneCheckbox, DeleteButton } from '../../atoms'
import { EditNameForm } from '../../molecules'
import { TodoSection } from '..'

const Project = ({ fetchAllProjects, project, projectDone, toggleProjectDone, projectName, editProject, deleteProject }) => {
  console.log('from project', project.todos)
  return (
    <div className="projects-list_entry" key={project.id}>
      <div className="projects-list_entry_project">
        <h2 className="projects-list_entry_project_title">{project.name}</h2>
        <DoneCheckbox done={projectDone} handlerFunction={toggleProjectDone} />
        <EditNameForm className="projects-list_entry_project_edit-form" handlerFunction={editProject} />
        <DeleteButton className="projects-list_entry_project_delete-btn" handlerFunction={deleteProject} />
      </div>
      {/* TODO SUBMIT FORM */}
      <TodoSection 
        fetchAllProjects={fetchAllProjects} 
        parentProjectId={project.id}
        todos={project.todos}
      />
    </div>
  )
}

export default Project