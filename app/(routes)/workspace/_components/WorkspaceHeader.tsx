'use client';

import { Button } from '@/components/ui/button';
import { Link, Save } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

interface Props {
  onSave: () => void;
  fileId: string;
}

function WorkspaceHeader({ onSave, fileId }: Props) {
  const handleShare = async () => {
    try {
      const shareURL = `${window.location.origin}/workspace/${fileId}`;
      await navigator.clipboard.writeText(shareURL);
      alert("Link copied to clipboard!");
    } catch (err) {
      console.error("Failed to copy:", err);
      alert("Failed to copy link.");
    }
  };

  return (
    <div className="p-3 border-b flex justify-between items-center">
      <div className="flex gap-2 items-center">
        <Image src={'/logo.png'} alt="logo" height={50} width={50} />
        <h2>File Name</h2>
      </div>
      <div className="flex items-center gap-2">
        <Button
          className="h-8 text-[12px] gap-2 bg-yellow-500 hover:bg-yellow-600"
          onClick={onSave}
        >
          Save <Save className="h-4 w-4" />
        </Button>
        <Button
          className="h-8 text-[12px] gap-2 bg-[#1150ab] hover:bg-blue-900"
          onClick={handleShare}
        >
          Share <Link className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

export default WorkspaceHeader;

