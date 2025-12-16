"use client"

import { FORM_ERROR, ProjectForm } from "src/app/projects/components/ProjectForm"
import { CreateProjectSchema } from "src/app/projects/schemas"
import { useMutation } from "@blitzjs/next"
import { useRouter } from "next/navigation"
import createProject from "src/app/projects/mutations/createProject"

export default function NewProjectPage() {
  const [createProjectMutation] = useMutation(createProject)
  const router = useRouter()

  return (
    <div>
      <h1>Create New Project</h1>

      <ProjectForm
        submitText="Create Project"
        schema={CreateProjectSchema}
        initialValues={{}}
        onSubmit={async (values) => {
          try {
            const project = await createProjectMutation(values)
            router.push(`/projects/${project.id}`)
          } catch (error: any) {
            console.error(error)
            return {
              [FORM_ERROR]: error.toString(),
            }
          }
        }}
      />
    </div>
  )
}
