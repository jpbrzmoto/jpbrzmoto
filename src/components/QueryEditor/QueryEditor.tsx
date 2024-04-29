import { useEffect, useRef, useState } from 'react';
import { Editor } from '@monaco-editor/react';
import keywordsSql from '../../utils/keyWords/sql/keyWordSql';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setQuery } from '../../redux/querySlice';

const QueryEditor = () => {

	const editorRef = useRef<any>(null);
	const defaultTheme = useSelector((state) => state.theme);
	const queryList = useSelector((state) => state.query.queryList);
	const selectedIndex = useSelector((state) => state.query.selectedIndex);
	const previousIndex = useSelector((state) => state.query.previousIndex);
	const [editorValue, setEditorValue] = useState(queryList[selectedIndex] || '');

	const dispatch = useDispatch();

	const handleEditorChange = (value) => {
		setEditorValue(value);
	};

	useEffect(() => {
		handleThemeChange(defaultTheme);
	}, [defaultTheme]);

	useEffect(() => {
		setEditorValue(queryList[selectedIndex]);
		console.log("previo..", previousIndex);
		console.log("editorValue", editorValue);
		dispatch(setQuery({ index: previousIndex, query: editorValue }));
	}, [selectedIndex]);

	const handleThemeChange = (event) => {
		axios.get('./src/themes/' + defaultTheme.theme)

			.then(response => {
				const themeData = response.data;
				if (editorRef.current && editorRef.current.editor) {
					editorRef.current.editor.defineTheme('myCustomTheme', {
						base: themeData.base,
						inherit: themeData.inherit,
						rules: themeData.rules,
						colors: themeData.colors
					});

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
		<Editor
			height="100%"
			defaultLanguage="sql"
			defaultValue={editorValue}
			value={editorValue}
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
	);
};

export default QueryEditor;
