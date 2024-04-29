import { useRef, useState } from 'react';
import { Editor } from '@monaco-editor/react';
import keywordsSql from '../../utils/keyWords/sql/keyWordSql';
import axios from 'axios';
import themeFiles from '../../utils/keyWords/themes/keyWordTheme';


const MyQuery = () => {
    const [query, setQuery] = useState('');
    const [selectedTheme, setSelectedTheme] = useState('');
    const handleEditorChange = (value) => {
        setQuery(value);
    };

    const editorRef = useRef<any>(null);

    /*useEffect(() => {
        axios.get('./src/themes/Github.json')
            .then(response => {
                console.log(response.data);
                const themeData = response.data;

                if (editorRef.current && editorRef.current.editor) {
                    // Accede a la instancia de Monaco Editor y define el tema
                    editorRef.current.editor.defineTheme('myCustomTheme', {
                        base: themeData.base,
                        inherit: themeData.inherit,
                        rules: themeData.rules,
                        colors: themeData.colors
                    });

                    // Establece el tema personalizado en el editor
                    editorRef.current.editor.setTheme('myCustomTheme');
                }
            })
            .catch(error => {
                console.error('Error al cargar el archivo cloud.json:', error);
            });
    }, []);*/

    const handleThemeChange = (event) => {
        const selectedTheme = event.target.value;
        setSelectedTheme(selectedTheme);

        axios.get('./src/themes/' + selectedTheme)
            .then(response => {
                const themeData = response.data;

                if (editorRef.current && editorRef.current.editor) {
                    // Accede a la instancia de Monaco Editor y define el tema
                    editorRef.current.editor.defineTheme('myCustomTheme', {
                        base: themeData.base,
                        inherit: themeData.inherit,
                        rules: themeData.rules,
                        colors: themeData.colors
                    });

                    // Establece el tema personalizado en el editor
                    editorRef.current.editor.setTheme('myCustomTheme');
                }
            })
            .catch(error => {
                console.error('Error al cargar el archivo cloud.json:', error);
            });
    };

    const provideCompletionItems = (monaco) => {
        editorRef.current = monaco;
        monaco.languages.registerCompletionItemProvider('sql', {
            provideCompletionItems: () => {
                return {
                    suggestions: Array.from(keywordsSql).map(word => ({
                        label: word,
                        kind: monaco.languages.CompletionItemKind.Keyword,
                        insertText: word
                    }))
                };
            }
        });
    };



    return (
        <>
            <select value={selectedTheme} onChange={handleThemeChange}>

                {Array.from(themeFiles).map(theme => (
                    <option key={theme} value={theme}>{theme}</option>
                ))}
            </select>
            <Editor

                height="100%"
                defaultLanguage="sql"
                defaultValue={query}
                options={{
                    minimap: { enabled: true },
                    wordBasedSuggestions: true,
                    suggestOnTriggerCharacters: true,
                    readOnly: false,
                    lineNumbers: 'on',
                    theme: 'myCustomTheme'
                }}
                onChange={handleEditorChange}
                beforeMount={provideCompletionItems}
            />
        </>
    );
};

export default MyQuery;
