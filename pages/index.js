import Head from 'next/head';
import Link from 'next/link';
import Navbar from '/components/navbar'
import {useSession, signIn, signOut } from 'next-auth/react'

export default function Home() {
  const { data: session } = useSession()

  if (session) {
    return (
      <>
        <div className="container">
          <Head>
            <title>Create Next App</title>
            <link rel="icon" href="/favicon.ico" />
          </Head>

          <main>
            <Navbar></Navbar>
            <h1 className="title">
                Read{' '}
                <Link href='/posts/first-post'>
                    <a>this page!</a>
                </Link>
            </h1>
          </main>
        </div>
      </>
    )
  }

  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button>
    </>
  )
}
