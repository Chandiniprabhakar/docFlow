'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import { Search } from 'lucide-react';
import Image from 'next/image';
import React, { useState } from 'react';
import { useConvex } from 'convex/react';
import { api } from '@/convex/_generated/api';

function Header() {
  const { user }: any = useKindeBrowserClient();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const convex = useConvex();

  const handleSearch = async () => {
    if (!query.trim()) return;
    try {
      const res = await convex.query(api.files.searchFiles, { query });
      setResults(res);
    } catch (err) {
      console.error("Search error:", err);
    }
  };

  return (
    <div className='flex flex-col gap-2 w-full'>
      <div className='flex justify-end items-center gap-2'>
        <div className='flex gap-2 items-center border rounded-md p-1'>
          <Search
            className='h-4 w-4 cursor-pointer'
            onClick={handleSearch}
          />
          <Input
            type='text'
            placeholder='Search'
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          />
        </div>
        {user?.picture && (
          <Image
            src={user.picture}
            alt='user'
            width={30}
            height={30}
            className='rounded-full'
          />
        )}
      </div>

      {results.length > 0 && (
        <div className='border p-2 rounded-md mt-2 bg-white shadow'>
          <h3 className='text-sm font-semibold'>Search Results:</h3>
          <ul className='mt-1 space-y-1'>
            {results.map((file) => (
              <li key={file._id}>
                <a
                  href={`/workspace/${file._id}`}
                  className='text-blue-600 hover:underline text-sm'
                >
                  {file.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Header;
