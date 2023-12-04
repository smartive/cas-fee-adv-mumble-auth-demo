import { Post } from '@/mumble/types';

export default function Post({ post }: { post: Post }) {
  return (
    <div className="border">
      {post.text && <p>{post.text}</p>}
      <div className="flex">
        <div className="mr-2">{post.likes ?? 0} likes</div>
        <div>{post.replies ?? 0} replies</div>
      </div>
    </div>
  );
}
