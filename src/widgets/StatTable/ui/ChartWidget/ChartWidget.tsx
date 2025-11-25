import { useState } from "react";
import { MainChart } from "../../../../entities/Chart/ui/Chart";
import { ChartControlPanel } from "../../../../entities/Chart/ui/ChartControlPanel";
import type { TChartFilter } from "../../../../entities/Chart/model/ChartControl.type";
import { useServerData } from "../../../../share/hooks/useServerData";
import { WidgetBlock } from "./ChatWidget.style";
import { JOBS, SUBJECTS } from "../../../../share/mocks/tableData";

export const ChartWidget = () => {
  const { getDataByFilter } = useServerData();

  const [filter, setFilter] = useState<TChartFilter>({
    date: [2020, 2025],
    jobType: Object.values(JOBS).map((job) => job.id),
    subject: Object.values(SUBJECTS).map((subject) => subject.id),
    withCumulate: false,
  });

  return (
    <WidgetBlock>
      <MainChart
        chartData={getDataByFilter(filter)}
        withCumulate={filter.withCumulate}
      />
      <ChartControlPanel filter={filter} setFilter={setFilter} />
    </WidgetBlock>
  );
};
