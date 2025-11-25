import { jsPDF } from "jspdf";
import type { TChartData } from "../../model/Chart.type";
import ReactApexChart from "react-apexcharts";
import ApexCharts from "apexcharts";
import { Button } from "@mui/material";
import { useChartData } from "../../hooks/useChartData";

interface IProps {
  chartData: TChartData;
  withCumulate: boolean;
}

export const MainChart = (props: IProps) => {
  const { chartData, withCumulate } = props;

  console.log(withCumulate);

  const { viewData } = useChartData({ chartData, withCumulate });

  const getPDF = () => {
    ApexCharts.exec("main-chart-id", "dataURI").then(
      (data: { imgURI: string }) => {
        const pdf = new jsPDF({ orientation: "landscape" });
        pdf.addImage(data.imgURI, "PNG", 0, 0, 300, 200);
        pdf.save();
      }
    );
  };

  return (
    <div>
      <Button onClick={getPDF}>Экспорт в PDF</Button>
      <ReactApexChart
        type="bar"
        width={"1000"}
        options={{
          xaxis: {
            categories: ["2020", "2021", "2022", "2023", "2024", "2025"],
          },
          chart: {
            id: "main-chart-id",
          },
        }}
        series={viewData}
      />
    </div>
  );
};
