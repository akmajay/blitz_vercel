import { Metadata } from "next"
import Link from "next/link"
import { Suspense } from "react"

import { invoke } from "src/app/blitz-server"
import getProjects from "src/app/projects/queries/getProjects"

export async function ProjectsList() {
  const { projects } = await invoke(getProjects, {})

  return (
    <ul>
      {projects.map((project) => (
        <li key={project.id}>
          <Link href={`/projects/${project.id}`}>{project.name}</Link>
        </li>
      ))}
    </ul>
  )
}

export default function Page() {
  return (
    <div>
      <h1>Projects</h1>

      <p>
        <Link href="/projects/new">Create Project</Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <ProjectsList />
      </Suspense>
    </div>
  )
}

export const metadata: Metadata = {
  title: "Projects",
  description: "List of projects",
}
