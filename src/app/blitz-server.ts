import {setupBlitzServer} from "blitz"
import {AuthServerPlugin, PrismaStorage, simpleRolesIsAuthorized} from "blitz"
import db from "db"
import {BlitzLogger} from "blitz"
import {authConfig} from "./blitz-auth-config"

const {api, getBlitzContext, useAuthenticatedBlitzContext} = setupBlitzServer({
  plugins: [
    AuthServerPlugin({
      ...authConfig,
      storage: PrismaStorage(db),
      isAuthorized: simpleRolesIsAuthorized,
    }),
  ],
      // logger: BlitzLogger({}),
})

export {api, getBlitzContext, useAuthenticatedBlitzContext}
