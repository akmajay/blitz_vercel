"use client"

import { Suspense } from "react"
import { useMutation, useQuery } from "@blitzjs/rpc"
import { useRouter } from "next/navigation"
import getProject from "src/app/projects/queries/getProject"
import updateProject from "src/app/projects/mutations/updateProject"
import { FORM_ERROR, ProjectForm } from "src/app/projects/components/ProjectForm"
import { UpdateProjectSchema } from "src/app/projects/schemas"
import { notFound } from "next/navigation"
import React from "react"

function EditProject({ id }: { id: number }) {
  const [project, { setQueryData }] = useQuery(getProject, { id })
  const [updateProjectMutation] = useMutation(updateProject)
  const router = useRouter()

  if (!project) return null

  return (
    <div>
      <h1>Edit Project {project.id}</h1>
      <pre>{JSON.stringify(project, null, 2)}</pre>

      <ProjectForm
        submitText="Update Project"
        schema={UpdateProjectSchema}
        initialValues={project}
        onSubmit={async (values) => {
          try {
            const updated = await updateProjectMutation({
              ...values,
              id: project.id,
            })
            await setQueryData(updated)
            router.push(`/projects/${updated.id}`)
          } catch (error: any) {
            console.error(error)
            return { [FORM_ERROR]: error.toString() }
          }
        }}
      />
    </div>
  )
}

type EditPageProps = {
  params: {
    id: string
  }
}

const EditPage: React.FC<EditPageProps> = ({ params }) => {
  const projectId = Number(params.id)
  if (isNaN(projectId)) {
    return notFound()
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <EditProject id={projectId} />
    </Suspense>
  )
}

export default EditPage
