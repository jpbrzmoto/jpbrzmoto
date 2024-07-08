import { useEffect, useRef, useState } from "react";
import { Editor } from "@monaco-editor/react";
import keywordsSql from "../../utils/keyWords/sql/keyWordSql";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setContextQuery } from "../../redux/contextDBSlice";
import React from "react";
import { configureTheme } from "../../redux/themeSlice";

const QueryEditor = React.memo(() => {
  const dispatch = useDispatch();
  const editorRef = useRef<any>(null);
  const defaultTheme = useSelector((state) => state.theme.defaultTheme);
  const theme = useSelector((state) => state.theme);
  const selectedTab = useSelector((state) => state.contextdb.selectedTab);
  const contextQuery = useSelector(
    (state) => state.contextdb.contextDB[selectedTab]?.sql
  );
  const [editorValue, setEditorValue] = useState(contextQuery || "");

  const handleEditorChange = (value) => {
    setEditorValue(value);
    dispatch(setContextQuery({ sql: value }));
  };
 
  
  useEffect(() => {
    handleThemeChange(theme);
  }, [theme]);

  useEffect(() => {
    setEditorValue(contextQuery);
  }, [selectedTab]);

  const handleThemeChange = (event) => {
    axios
      .get("./src/themes/" + theme.theme)

      .then((response) => {
        const themeData = response.data;
        if (editorRef.current && editorRef.current.editor) {
          editorRef.current.editor.defineTheme("myCustomTheme", {
            base: themeData.base,
            inherit: themeData.inherit,
            rules: themeData.rules,
            colors: themeData.colors,
          });

          editorRef.current.editor.setTheme("myCustomTheme");
        }
      })
      .catch((error) => {
        console.error("Error al cargar el tema:", error);
      });
  };

  const provideCompletionItems = (monaco) => {
    editorRef.current = monaco;
    monaco.languages.registerCompletionItemProvider("sql", {
      provideCompletionItems: () => {
        return {
          suggestions: Array.from(keywordsSql).map((word) => ({
            label: word,
            kind: monaco.languages.CompletionItemKind.Keyword,
            insertText: word,
          })),
        };
      },
    });
	dispatch(configureTheme(defaultTheme));
  };

  return (
    <Editor
      className="overflow-auto"
      height="100%"
      defaultLanguage="sql"
      defaultValue={editorValue}
      value={editorValue}
      options={{
        minimap: { enabled: true },
        wordBasedSuggestions: true,
        suggestOnTriggerCharacters: true,
        readOnly: false,
        lineNumbers: "on",
        theme: "myCustomTheme",
      }}
      onChange={handleEditorChange}
      beforeMount={provideCompletionItems}
    />
  );
});

export default QueryEditor;
