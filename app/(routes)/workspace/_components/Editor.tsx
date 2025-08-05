'use client';

import React, { useEffect, useRef, useState } from 'react'
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import List from '@editorjs/list';
// import Checklist from '@editorjs/checklist';
import Paragraph from '@editorjs/paragraph';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { toast } from 'sonner';
import { FILE } from '../../dashboard/_components/FileList';

const rawDocument={
  "time": 1550476186479,
  "blocks": [{
    data: {
      text: 'Document Name',
      level: 2
    },
    id:"123",
    type:'header'
  }, {
    data: {
      level: 4
    },
    id: "1234",
    type: 'header'
  }],
  "version": "2.8.1"
}

function Editor({onSaveTrigger, fileld, fileData}:{onSaveTrigger:any, fileld:any, fileData:FILE}) {
  const ref = useRef<EditorJS>();
  const [document, setDocument] = useState(rawDocument);
  const updateDocument = useMutation(api.files.updateDocument);

  useEffect(() => {
    if (fileData) {
      initEditor();
    }

    return () => {
      if (ref.current) {
        ref.current.destroy();
        ref.current = undefined;
      }
    };
  }, [fileData]);

 useEffect(() => {
    if (onSaveTrigger && ref.current) {
      onSaveDocument();
    }
  }, [onSaveTrigger]);

 const initEditor = () => {
    if (ref.current) {
      ref.current.destroy();
      ref.current = undefined;
    }

  const editor = new EditorJS({
    holder: 'editorjs',
    data: fileData?.document ? JSON.parse(fileData.document) : rawDocument,
    tools: {
      header: {
        class: Header,
        shortcut: 'CMD+SHIFT+H',
        config: {
          placeholder: 'Enter a Header',
        },
      },
      list: {
        class: List,
        inlineToolbar: true,
        config: {
          defaultStyle: 'unordered',
        },
      },
      paragraph: {
        class: Paragraph,
        inlineToolbar: true,
      },
    },
  });

  editor.isReady.then(() => {
    ref.current = editor;
  });
};


  const onSaveDocument = async () => {
    if (ref.current) {
      try {
        const outputData = await ref.current.save();
        console.log('Article data: ', outputData);

        await updateDocument({
          _id: fileld,
          document: JSON.stringify(outputData),
        });

        toast.success('Document Updated!');
      } catch (error) {
        console.error('Saving failed: ', error);
        toast.error('Failed to update document.');
      }
    }
  };


  return (
    <div>
      <div id='editorjs' className='ml-20'></div>
    </div>
  )
}

export default Editor
