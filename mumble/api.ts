'use server';

import { auth } from '@/app/api/auth/[...nextauth]/auth';
import { PaginatedResult, Post } from './types';
import { cookies, headers } from 'next/headers';

const apiUrl = 'https://mumble-api-prod-4cxdci3drq-oa.a.run.app';

function authHeader(accessToken?: string): HeadersInit {
  return accessToken ? { Authorization: `Bearer ${accessToken}` } : {};
}

export async function getPostList() {
  const req = {
    headers: Object.fromEntries(headers() as Headers),
    cookies: Object.fromEntries(
      cookies()
        .getAll()
        .map((c) => [c.name, c.value])
    ),
  };

  const token = await auth(req as any);
  const res = await fetch(`${apiUrl}/posts`, {
    headers: {
      ...authHeader(token?.accessToken),
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
