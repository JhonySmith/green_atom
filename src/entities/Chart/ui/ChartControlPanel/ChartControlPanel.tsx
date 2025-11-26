import Select, { type SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import { JOBS, SUBJECTS } from "../../../../share/mocks/tableData";
import { Checkbox, Slider } from "@mui/material";
import type { TChartFilter } from "../../model/ChartControl.type";
import { ControlPanelBlock } from "./ChartControlPanel.style";
import { YEAR_END, YEAR_START } from "../../../../app/appConfig";
import { getCategories } from "../../../../share/utils/chart";

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

  console.log(filter.date);

  const changeDateHandler = (
    _: Event,
    newValue: number[],
    activeThumb: number
  ) => {
    const minDistance = 1;
    if (newValue[1] - newValue[0] < minDistance) {
      if (activeThumb === 0) {
        const clamped = Math.min(newValue[0], YEAR_END - minDistance);
        setFilter(
          Object.assign({
            ...filter,
            date: [clamped - minDistance, clamped],
          })
        );
      } else {
        const clamped = Math.max(newValue[1], minDistance);
        setFilter(
          Object.assign({ ...filter, date: [clamped, clamped + minDistance] })
        );
      }
    } else {
      setFilter(Object.assign({ ...filter, date: newValue }));
    }
  };

  const changeWithCumulateHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
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
        min={YEAR_START}
        max={YEAR_END}
        step={1}
        onChange={changeDateHandler}
        valueLabelDisplay="auto"
        getAriaValueText={(value: number) => {
          return String(value);
        }}
        marks={getCategories(YEAR_START, YEAR_END).map((cat) => {
          return { value: Number(cat), label: cat };
        })}
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
