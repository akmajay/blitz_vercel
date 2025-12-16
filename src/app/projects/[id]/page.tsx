"use client"

import { useQuery } from "@blitzjs/next"
import getProject from "src/app/projects/queries/getProject"
import { DeleteProject } from "../components/DeleteProject"
import Link from "next/link"
import { Suspense } from "react"
import { notFound } from "next/navigation"

function ProjectComponent({ id }: { id: number }) {
  const [project] = useQuery(getProject, { id })

  if (!project) return null

  return (
    <div>
      <h1>Project {project.id}</h1>
      <pre>{JSON.stringify(project, null, 2)}</pre>
      <Link href={`/projects/${project.id}/edit`}>Edit</Link>
      <DeleteProject id={project.id} />
    </div>
  )
}

export default function Page({ params }: { params: { id: string } }) {
  const projectId = Number(params.id)
  if (isNaN(projectId)) return notFound()

  return (
    <div>
      <p>
        <Link href="/projects">Projects</Link>
      </p>
      <Suspense fallback={<div>Loading...</div>}>
        <ProjectComponent id={projectId} />
      </Suspense>
    </div>
  )
}
