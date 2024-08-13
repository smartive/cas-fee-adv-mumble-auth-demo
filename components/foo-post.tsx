'use client';

export default function FooPost() {
  return (
    <button
      className="bg-red-400 text-white font-bold py-2 px-4 rounded"
      onClick={() => fetch('/api/foo')}
    >
        Foo it
    </button>);

}
