import { useEffect, useState } from "react";
import type { TChartData } from "../model/Chart.type";

interface IProps {
  chartData: TChartData;
  withCumulate: boolean;
}

const baseData = [
  { name: "План", data: [] },
  { name: "Факт", data: [] },
  { name: "Разница", data: [] },
];

export const useChartData = (props: IProps) => {
  const { chartData, withCumulate } = props;

  const [viewData, setViewData] = useState<{ name: string; data: number[] }[]>(
    structuredClone(baseData)
  );

  useEffect(() => {
    const dataDate: {
      [key: string]: { plan: number; fact: number; diff: number };
    } = {};

    const preViewData: { name: string; data: number[] }[] =
      structuredClone(baseData);

    for (let data of chartData) {
      const date = data.date.getFullYear();
      if (!dataDate[date]) {
        dataDate[date] = { plan: 0, fact: 0, diff: 0 };
      }

      dataDate[date].plan += data.planSum;
      dataDate[date].fact += data.factSum;
      dataDate[date].diff = dataDate[date].plan - dataDate[date].fact;
    }

    const years = Object.keys(dataDate).sort();

    for (let year of years) {
      preViewData[0].data.push(
        dataDate[year].plan +
          (withCumulate ? preViewData[0].data.at(-1) ?? 0 : 0)
      );
      preViewData[1].data.push(
        dataDate[year].fact +
          (withCumulate ? preViewData[1].data.at(-1) ?? 0 : 0)
      );
      preViewData[2].data.push(
        dataDate[year].diff +
          (withCumulate ? preViewData[2].data.at(-1) ?? 0 : 0)
      );
    }

    setViewData(preViewData);
  }, [chartData]);

  return { viewData };
};
