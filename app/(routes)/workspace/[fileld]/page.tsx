'use client';

import React, { useEffect, useState } from 'react'
import Editor from '../_components/Editor'
import WorkspaceHeader from '../_components/WorkspaceHeader'
import { useConvex } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { FILE } from '../../dashboard/_components/FileList';
import Canvas from '../_components/Canvas';

function Workspace({params}:any) {
  const [triggerSave, setTriggerSave] = useState(false);
  const convex = useConvex();
  const [fileData, setFileData] = useState<FILE|any>();
  useEffect(()=>{
    console.log("FILEID", params.fileld);
    if (params.fileld) {
      getFileData();
    }
  }, [])

  const getFileData=async()=>{
    const result = await convex.query(api.files.getFileById,{_id:params.fileld});
    setFileData(result);
  }
  return (
    <div>
      <WorkspaceHeader onSave={() => setTriggerSave(!triggerSave)}/>

      {/* Workspace Layout */}
      <div className='grid grid-cols-1 md:grid-cols-2'>
        {/* Document */}
        <div>
        {fileData && (
          <Editor 
            onSaveTrigger={triggerSave} 
            fileld={params.fileld}
            fileData={fileData}
          />
        )}
        </div>
        {/* Whiteboard canvas */}
        <div className='border-l'>
          <Canvas  
            onSaveTrigger={triggerSave}
            fileld={params.fileld}
            fileData={fileData}
          />
        </div>
      </div>
    </div>
  )
}

export default Workspace
