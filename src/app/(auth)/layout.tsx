import {AuthRedirector} from "./components/AuthRedirector"

export default async function AuthLayout({children}: {children: React.ReactNode}) {
  return (
    <>
      <AuthRedirector redirectAuthenticatedTo="/" />
      {children}
    </>
  )
}
