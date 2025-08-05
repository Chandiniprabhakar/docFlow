import { Button } from '@/components/ui/button'
import { Archive, Flag, Github } from 'lucide-react'
import React, { useState } from 'react'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from '@/components/ui/input'

function SideNavBottomSection({onFileCreate, totalFiles}:any) {
    const menuList = [
        {
            id:1,
            name: 'Getting Started',
            icon: Flag,
            path: ''
        },
        {
            id:2,
            name: 'Github',
            icon: Github,
            path: ''
        },
        {
            id:3,
            name: 'Archive',
            icon: Archive,
            path: ''
        }
    ]
    const [fileInput, setFileInput] = useState('');
  return (
    <div>
      {menuList.map((menu,index)=>(
        <h2 key={index} className='flex gap-2 p-1 px-2 text-[14px] hover:bg-gray-100 rounded-md cursor-pointer'>
            <menu.icon className='h-5 w-5'/>
            {menu.name}
        </h2>
      ))}
      <Dialog>
        <DialogTrigger asChild>
            <Button className="w-full bg-[#1150ab] hover:bg-blue-900 justify-start mt-3">
            New File
            </Button>
        </DialogTrigger>

        <DialogContent>
            <DialogHeader>
            <DialogTitle>Create New File</DialogTitle>
            <DialogDescription>
                <Input
                placeholder="Enter File Name"
                className="mt-3"
                onChange={(e) => setFileInput(e.target.value)}
                />
            </DialogDescription>
            </DialogHeader>
            <DialogFooter>
            <DialogClose asChild>
                <Button
                type="button"
                className="bg-[#1150ab] hover:bg-blue-900"
                disabled={!(fileInput && fileInput.length > 2)}
                onClick={() => onFileCreate(fileInput)}
                >
                Create
                </Button>
            </DialogClose>
            </DialogFooter>
        </DialogContent>
    </Dialog>
    </div>
  )
}

export default SideNavBottomSection
