'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Excalidraw, MainMenu } from '@excalidraw/excalidraw';
import '@excalidraw/excalidraw/index.css'; 
import { FILE } from '../../dashboard/_components/FileList';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';

function Canvas({onSaveTrigger,fileld, fileData}:{onSaveTrigger:any,fileld:any, fileData:FILE}) {
  const excalidrawWrapperRef = useRef<HTMLDivElement>(null);
  const [whiteboardData, setWhiteboardData]=useState<any>();
  const updateWhiteboard = useMutation(api.files.updateWhiteboard)

  useEffect(()=>{
    onSaveTrigger&&saveWhiteboard()
  },[onSaveTrigger])
  const saveWhiteboard=()=>{
    updateWhiteboard({
      _id: fileld,
      whiteboard: JSON.stringify(whiteboardData)
    }).then(resp=>console.log(resp))
  }

  return (
    <div
      className="w-full h-screen" 
      ref={excalidrawWrapperRef}
    >
      {fileData&&<Excalidraw
        theme='light'
        initialData={{
          elements:fileData?.whiteboard&&JSON.parse(fileData.whiteboard)
        }}
        onChange={(excalidrawElements, appState, files) => 
          setWhiteboardData(excalidrawElements)}
        UIOptions={{
            canvasActions:{
                saveToActiveFile:false,
                loadScene: false,
                export: false,
                toggleTheme: false
            }
        }}
      >
        <MainMenu>
            <MainMenu.DefaultItems.ClearCanvas/>
            <MainMenu.DefaultItems.SaveAsImage/>
            <MainMenu.DefaultItems.ChangeCanvasBackground/>
        </MainMenu>
      </Excalidraw>}
    </div>
  );
}

export default Canvas;
