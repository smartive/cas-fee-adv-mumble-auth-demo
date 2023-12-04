'use client';

import { PostEvents, getPostEventSource } from '@/mumble/api';
import { Post as ApiPost } from '@/mumble/types';
import { useEffect, useState } from 'react';
import Post from './post';

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
