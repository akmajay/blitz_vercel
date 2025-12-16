import {rpcAppHandler} from "@blitzjs/next"
import {withBlitzAuth} from "src/app/blitz-server"

export const {GET, HEAD, POST} = withBlitzAuth(rpcAppHandler())
