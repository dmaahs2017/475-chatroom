import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";

export default function Index() {
  const { data: session } = useSession();
  if (session) {
    return (
      <>
        Signed in as {session.user.email} <br />
        <Link href="/chatroom">
          <a>Chatroom</a>
        </Link>
        <br />
        <button onClick={() => signOut()}>Sign out</button>
      </>
    );
  }
  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button>
    </>
  );
}
