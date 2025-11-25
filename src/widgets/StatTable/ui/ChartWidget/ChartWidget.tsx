import { useState } from "react";
import { MainChart } from "../../../../entities/Chart/ui/Chart";
import { ChartControlPanel } from "../../../../entities/Chart/ui/ChartControlPanel";
import type { TChartFilter } from "../../../../entities/Chart/model/ChartControl.type";
import { useServerData } from "../../../../share/hooks/useServerData";
import { WidgetBlock } from "./ChatWidget.style";
import { JOBS, SUBJECTS } from "../../../../share/mocks/tableData";
import { YEAR_END, YEAR_START } from "../../../../app/appConfig";

export const ChartWidget = () => {
  const { getDataByFilter } = useServerData();

  const [filter, setFilter] = useState<TChartFilter>({
    date: [YEAR_START, YEAR_END],
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
