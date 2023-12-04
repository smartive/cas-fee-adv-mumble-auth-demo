import { auth } from '@/app/api/auth/[...nextauth]/auth';
import { PaginatedResult, Post } from './types';

const apiUrl = 'https://mumble-api-prod-4cxdci3drq-oa.a.run.app';

function authHeader(accessToken?: string): HeadersInit {
  return accessToken ? { Authorization: `Bearer ${accessToken}` } : {};
}

export async function getPostList() {
  const session = await auth();

  const res = await fetch(`${apiUrl}/posts`, {
    headers: {
      ...authHeader(session?.accessToken),
    },
  });
  const posts = (await res.json()) as PaginatedResult<Post>;
  return posts.data;
}

export async function createPost(text: string) {
  const session = await auth();
  const body = new FormData();
  body.append('text', text);

  const res = await fetch(`${apiUrl}/posts`, {
    method: 'POST',
    body,
    headers: {
      ...authHeader(session?.accessToken),
    },
  });

  const post = (await res.json()) as Post;
  return post;
}

export enum PostEvents {
  created = 'postCreated',
  updated = 'postUpdated',
  deleted = 'postDeleted',
  liked = 'postLiked',
  unliked = 'postUnliked',
}

export function getPostEventSource() {
  return new EventSource(`${apiUrl}/posts/_sse`);
}
