import WORKS_COUNT, {
  SUM_MAX,
  SUM_MIN,
  YEAR_END,
  YEAR_START,
} from "../../app/appConfig";
import { getRandom } from "../utils/random";

export const SUBJECTS = [
  {
    id: 1,
    label: "Дом",
  },
  {
    id: 2,
    label: "Мост",
  },
  {
    id: 3,
    label: "Дорога",
  },
  {
    id: 4,
    label: "Трубопровод",
  },
  {
    id: 5,
    label: "Электростанция",
  },
];

export const JOBS = [
  {
    id: 1,
    label: "Проектирование",
  },
  {
    id: 2,
    label: "Подготовительные работы",
  },
  {
    id: 3,
    label: "Запуск",
  },
  {
    id: 4,
    label: "Доп. работы",
  },
];

export const getData = () => {
  const tableData = [];

  for (let i = 0; i < WORKS_COUNT; i++) {
    tableData.push({
      subject: getRandom(1, 5),
      jobType: getRandom(1, 4),
      date: new Date(
        getRandom(YEAR_START, YEAR_END),
        getRandom(0, 11),
        getRandom(1, 31)
      ),
      planSum: getRandom(SUM_MIN, SUM_MAX),
      factSum: getRandom(SUM_MIN, SUM_MAX),
    });
  }

  return tableData;
};
