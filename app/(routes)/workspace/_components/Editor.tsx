'use client';

import React, { useEffect, useRef } from 'react';
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import List from '@editorjs/list';
import Paragraph from '@editorjs/paragraph';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { toast } from 'sonner';
import { FILE } from '../../dashboard/_components/FileList';

const rawDocument = {
  time: 1550476186479,
  blocks: [
    {
      data: { text: 'Document Name', level: 2 },
      id: '123',
      type: 'header',
    },
    {
      data: { level: 4 },
      id: '1234',
      type: 'header',
    },
  ],
  version: '2.8.1',
};

function Editor({
  onSaveTrigger,
  fileld,
  fileData,
}: {
  onSaveTrigger: any;
  fileld: any;
  fileData: FILE;
}) {
  const ref = useRef<EditorJS | null>(null);
  const updateDocument = useMutation(api.files.updateDocument);

  useEffect(() => {
    if (fileData) {
      initEditor();
    }

    return () => {
      if (ref.current) {
        ref.current.destroy();
        ref.current = null;
      }
    };
  }, [fileData]);

  useEffect(() => {
    if (onSaveTrigger) {
      onSaveDocument();
    }
  }, [onSaveTrigger]);

  const initEditor = () => {
    if (ref.current) {
      ref.current.destroy();
      ref.current = null;
    }

    const editor = new EditorJS({
      holder: 'editorjs',
      data: fileData?.document
        ? JSON.parse(fileData.document)
        : rawDocument,
      tools: {
        header: {
          class: Header,
          config: {
            placeholder: 'Enter a Header',
          },
        } as any,
        list: {
          class: List,
          inlineToolbar: true,
          config: {
            defaultStyle: 'unordered',
          },
        } as any,
        paragraph: {
          class: Paragraph,
          inlineToolbar: true,
        } as any,
      }

    });

    editor.isReady.then(() => {
      ref.current = editor;
    });
  };

  const onSaveDocument = async () => {
    if (!ref.current) return;

    try {
      await ref.current.isReady;
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
  };

  return <div id="editorjs" className="ml-20" />;
}

export default Editor;
