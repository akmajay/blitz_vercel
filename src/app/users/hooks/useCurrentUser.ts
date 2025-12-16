import {useQuery} from "@blitzjs/next"
import getCurrentUser from "../queries/getCurrentUser"

export const useCurrentUser = () => {
  const [user] = useQuery(getCurrentUser, null)
  return user
}
