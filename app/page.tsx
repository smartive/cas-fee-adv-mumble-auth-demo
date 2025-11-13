import LivePosts from "@/components/live-posts";
import LoginButton from "@/components/login-button";
import LogoutButton from "@/components/logout-button";
import NewPost from "@/components/new-post";
import Post from "@/components/post";
import { getSession } from "@/lib/auth";
import { getPostList } from "@/mumble/api";

export default async function Home() {
  const session = await getSession();
  const posts = await getPostList();

  return (
    <main>
      <h1>Hello In Mumble</h1>
      <p>This is a short demo for using the API with authentication.</p>
      {session?.user ? (
        <div>
          <p>
            You are logged in as {session.user?.name} ({session.user?.email}).
          </p>
          <div>
            <LogoutButton />
          </div>
        </div>
      ) : (
        <div>
          <p>You are not logged in.</p>
          <div>
            <LoginButton />
          </div>
        </div>
      )}
      {session?.user && (
        <div>
          <h2>Create a post</h2>
          <NewPost />
        </div>
      )}
      <div>
        <h2>Latest Posts</h2>
        <LivePosts />
        <ul>
          {posts.map((post) => (
            <li key={post.id}>
              <Post post={post} />
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
