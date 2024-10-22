import MonacoEditor  from '@monaco-editor/react';
import checkMobile from 'ismobilejs';
import { useState, useEffect } from 'react';
import MobileEditor from './MobileEditor';

export interface EditorOpts {
  contents?: string;
  readOnly?: boolean;
  language: string;
  setContents?(contents: string): any;
}

const Editor = ({ contents, readOnly, language, setContents }: EditorOpts) => {
  const editorOptions = {
    fontFamily: '"Fira Code", "Consolas", "Courier New", monospace',
    fontLigatures: true,
    lineHeight: 22,
    selectOnLineNumbers: true,
    roundedSelection: false,
    wordWrap: "on",
    dragAndDrop: false,
    readOnly
  };

  const [ isMobile, setIsMobile ] = useState(false);

  useEffect(() => {
    setIsMobile(checkMobile(window.navigator).any);
  }, []);

  if (isMobile) {
    return (
      <MobileEditor
        contents={contents}
        readOnly={readOnly}
        setContents={setContents}
      />
    );
  }

  return (
    <MonacoEditor 
      language={language}
      value={contents}
      onChange={setContents}
      theme="vs-dark"
      className="editor"
      options={editorOptions}
    />
  );
};

export default Editor;
