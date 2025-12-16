import Link from "next/link"
import {invoke} from "./blitz-server"
import {LogoutButton} from "./(auth)/components/LogoutButton"
import styles from "./styles/Home.module.css"
import getCurrentUser from "./users/queries/getCurrentUser"
import { Projects } from "./projects/components/Projects"
import { Suspense } from "react"

export default async function Home() {
  const currentUser = await invoke(getCurrentUser, null)
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <div className={styles.wrapper}>
          <div className={styles.header}>
            {currentUser ? (
              <>
                <LogoutButton />
                <div>
                  User id: <code>{currentUser.id}</code>
                  <br />
                  User role: <code>{currentUser.role}</code>
                </div>
              </>
            ) : (
              <>
                <Link href="/signup" className={styles.button}>
                  <strong>Sign Up</strong>
                </Link>
                <Link href="/login" className={styles.loginButton}>
                  <strong>Login</strong>
                </Link>
              </>
            )}
          </div>
          {currentUser && (
            <Suspense fallback="Loading...">
              <Projects />
            </Suspense>
          )}
        </div>
      </main>
    </div>
  )
}
