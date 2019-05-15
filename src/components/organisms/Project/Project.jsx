import React from 'react'
import { DoneCheckbox, DeleteButton } from '../../atoms'
import { EditProjectForm } from '../../molecules'
import { TodoSection } from '..'

const Project = ({ fetchAllProjects, project, projectDone, toggleProjectDone, projectName, editProject, deleteProject }) => {
  return (
    <div className="projects-list_entry" key={project.id}>
      <div className="projects-list_entry_project">
        <h2 className="projects-list_entry_project_title">{projectName}</h2>
        <DoneCheckbox done={projectDone} handlerFunction={toggleProjectDone} />
        <EditProjectForm changeProjectName={editProject} />
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