"use client"
import { useAuthenticatedBlitzContext } from "../../blitz-server"

export function AuthRedirector({ redirectAuthenticatedTo }: { redirectAuthenticatedTo: string }) {
  useAuthenticatedBlitzContext({
    redirectAuthenticatedTo: redirectAuthenticatedTo,
  })
  return null
}
