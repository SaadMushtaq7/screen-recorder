import React, { FC, useState, Dispatch, SetStateAction } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

interface RT {
  value: string;
  option: string;
}

interface Props {
  title: string;
  defaultValue: number;
  recordTypes: RT[];
  setRecordType: Dispatch<SetStateAction<string>>;
}

const DropDown: FC<Props> = ({
  title,
  defaultValue,
  recordTypes,
  setRecordType,
}) => {
  const [mode, setMode] = useState<string>(recordTypes[defaultValue].value);

  const handleChange = (event: SelectChangeEvent) => {
    setMode(event.target.value);
    setRecordType(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl variant="standard" fullWidth>
        <InputLabel id="demo-simple-select-label">{title}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={mode}
          label="mode"
          onChange={handleChange}
        >
          {recordTypes.map((recordType) => (
            <MenuItem key={recordType.value} value={recordType.value}>
              {recordType.option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default DropDown;
