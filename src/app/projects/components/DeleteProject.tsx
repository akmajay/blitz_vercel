"use client"

import { useMutation } from "@blitzjs/next"
import { useRouter } from "next/navigation"
import deleteProject from "src/app/projects/mutations/deleteProject"

export function DeleteProject({ id }: { id: number }) {
  const [deleteProjectMutation] = useMutation(deleteProject)
  const router = useRouter()

  return (
    <button
      onClick={async () => {
        if (window.confirm("This will be deleted")) {
          await deleteProjectMutation({ id })
          router.push("/projects")
        }
      }}
    >
      Delete
    </button>
  )
}
