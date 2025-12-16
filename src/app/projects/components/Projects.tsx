"use client"

import { useQuery } from "@blitzjs/rpc"
import getProjects from "src/app/projects/queries/getProjects"
import Link from "next/link"

export const Projects = () => {
  const [result] = useQuery(getProjects, {})
  const projects = result?.projects

  // useQuery will suspend rendering, so projects should not be undefined
  // when the component renders. But as a safeguard:
  if (!projects) return null

  return (
    <div>
      <h2>Projects</h2>
      <ul>
        {projects.map((project) => (
          <li key={project.id}>
            <Link href={`/projects/${project.id}`}>{project.name}</Link>
          </li>
        ))}
      </ul>
      <Link href="/projects/new">Create New Project</Link>
    </div>
  )
}
