'use client';

import { Post as ApiPost, PostEvents } from "@/mumble/types";
import { useEffect, useState } from 'react';
import Post from './post';

function getPostEventSource() {
  return new EventSource(
    `${
      process.env.API_URL ||
      "https://qwacker-api-http-prod-927407260649.europe-west6.run.app"
    }/posts/_sse`
  );
}

export default function LivePosts() {
  const [posts, setPosts] = useState<ApiPost[]>([]);

  useEffect(() => {
    const events = getPostEventSource();
    events.addEventListener(PostEvents.created, (event: MessageEvent<string>) => {
      const post = JSON.parse(event.data) as ApiPost;
      setPosts([post, ...posts]);
    });
    return () => events.close();
  }, []);

  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>
          <Post post={post} />
        </li>
      ))}
    </ul>
  );
}
