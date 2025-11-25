import Select, { type SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import { JOBS, SUBJECTS } from "../../../../share/mocks/tableData";
import { Checkbox, Slider } from "@mui/material";
import type { TChartFilter } from "../../model/ChartControl.type";
import { ControlPanelBlock } from "./ChartControlPanel.style";

interface IProps {
  filter: TChartFilter;
  setFilter: (filter: TChartFilter) => void;
}

const sx = { maxWidth: 300, marginBottom: 3 };

export const ChartControlPanel = (props: IProps) => {
  const { filter, setFilter } = props;

  const changeSubjectHandler = (event: SelectChangeEvent<number[]>) => {
    setFilter(Object.assign({ ...filter, subject: event.target.value }));
  };

  const changeJobsHandler = (event: SelectChangeEvent<number[]>) => {
    setFilter(Object.assign({ ...filter, jobType: event.target.value }));
  };

  const changeDateHandler = (_: Event, newValue: number[]) => {
    setFilter(Object.assign({ ...filter, date: newValue }));
  };

  const changeWithCumulateHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    console.log(event.target.checked);
    setFilter(Object.assign({ ...filter, withCumulate: event.target.checked }));
  };

  return (
    <ControlPanelBlock>
      <InputLabel>Объект:</InputLabel>
      <Select
        multiple
        value={filter.subject}
        onChange={changeSubjectHandler}
        sx={sx}
      >
        {SUBJECTS.map((subject) => (
          <MenuItem value={subject.id}>{subject.label}</MenuItem>
        ))}
      </Select>
      <InputLabel>Вид работ:</InputLabel>
      <Select
        multiple
        size="medium"
        sx={sx}
        value={filter.jobType}
        onChange={changeJobsHandler}
      >
        {JOBS.map((job) => (
          <MenuItem value={job.id}>{job.label}</MenuItem>
        ))}
      </Select>
      <InputLabel>Период:</InputLabel>
      <Slider
        value={filter.date}
        sx={{ ...sx, marginLeft: 2 }}
        min={2020}
        max={2025}
        step={1}
        onChange={changeDateHandler}
        valueLabelDisplay="auto"
        getAriaValueText={(value: number) => {
          return String(value);
        }}
        marks={[
          { value: 2020, label: "2020" },
          { value: 2021, label: "2021" },
          { value: 2022, label: "2022" },
          { value: 2023, label: "2023" },
          { value: 2024, label: "2024" },
          { value: 2025, label: "2025" },
        ]}
        disableSwap
      />
      <InputLabel>Накопительный итог:</InputLabel>
      <Checkbox
        checked={filter.withCumulate}
        onChange={changeWithCumulateHandler}
      />
    </ControlPanelBlock>
  );
};
