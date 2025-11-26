import type { TChartFilter } from "../../entities/Chart/model/ChartControl.type";
import { getData } from "../mocks/tableData";

const SERVER_DATA = getData();

export const useServerData = () => {
  const getDataByFilter = (filter: TChartFilter) => {
    return SERVER_DATA.filter((data) => {
      return (
        (filter.jobType.length
          ? filter.jobType.includes(data.jobType)
          : true) &&
        (filter.subject.length
          ? filter.subject.includes(data.subject)
          : true) &&
        data.date.getFullYear() < filter.date[1] &&
        data.date.getFullYear() >= filter.date[0]
      );
    });
  };

  return { getDataByFilter };
};
