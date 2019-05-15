import React from 'react'
import { Project } from '..'

const ProjectsList = ({ projects, fetchAllProjects}) => {
  return (
    <div className="projects-list">
      {
        projects.map((project) => {
        return (
          <Project project={project} fetchAllProjects={fetchAllProjects}/>
        )
      }
      )}
    </div>
  )
}

export default ProjectsList