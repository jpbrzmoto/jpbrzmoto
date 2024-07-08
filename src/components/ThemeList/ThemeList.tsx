import {  useState } from "react";
import { ListBox } from "primereact/listbox";
import themeFiles from "../../utils/keyWords/themes/keyWordTheme";
import { useDispatch } from "react-redux";
import { configureTheme } from "../../redux/themeSlice";

const ThemeList = () => {
  const dispatch = useDispatch();
  const [selectedTheme, setSelectedTheme] = useState(null);

  const themes = themeFiles.map((theme) => ({
    name: theme.replace(".json", ""),
    filename: theme,
  }));

  const handleSelect = (theme) => {
    setSelectedTheme(theme);
    dispatch(configureTheme(theme.filename));
  };
 
  return (
    <>
      <ListBox
        filter
        value={selectedTheme}
        onChange={(e) => handleSelect(e.value)}
        options={themes}
        optionLabel="name"
        className="w-full"
      />
    </>
  );
};

export default ThemeList;
