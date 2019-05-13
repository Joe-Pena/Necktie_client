import React from 'react'
import { Link } from 'react-router-dom'

const RestrictedProjects = ({ projects }) => {
  return (
  <div className="projects-list">
    {projects.map(project => {
      return (
        <div className="projects-list_entry--restricted" key={project.id}>
          <h2>{project.name}</h2>
          <Link to='/login'>Log in to see more</Link>
        </div>
      )
    })}
  </div>
  )
}

export default RestrictedProjects