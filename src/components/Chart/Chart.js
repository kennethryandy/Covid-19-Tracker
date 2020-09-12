import React, { useState, useEffect } from "react";
import loadingSvg from "../../assets/loading.svg";
import { fetchDailyData } from "../../api";
//Material-ui
import { Line, Bar } from "react-chartjs-2";

const Chart = ({ data: { confirmed, recovered, deaths }, country }) => {
  const [dailyData, setDailyData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchedDailyData = async () => {
      const data = await fetchDailyData();
      setDailyData(data);
      setLoading(false);
    };
    fetchedDailyData();
  }, []);

  const barChart = confirmed ? (
    <Bar
      data={{
        labels: ["Infected", "Recovered", "Deaths"],
        datasets: [
          {
            label: "People",
            backgroundColor: [
              "rgba(0, 0, 255, 0.5)",
              "rgba(0, 255, 0, 0.5)",
              "rgba(255, 0, 0, 0.5)",
            ],
            data: [confirmed.value, recovered.value, deaths.value],
          },
        ],
      }}
      options={{
        legend: { display: false },
        title: { display: true, text: `Current state in ${country}` },
      }}
    />
  ) : null;

  const lineChart = dailyData.length ? (
    <Line
      data={{
        labels: dailyData.map((date) => date.date),
        datasets: [
          {
            data: dailyData.map((infected) => infected.confirmed),
            label: "Infected",
            borderColor: "#3333ff",
            fill: true,
          },
          {
            data: dailyData.map((death) => death.deaths),
            label: "Deaths",
            borderColor: "red",
            backgroundColor: "rgba(250,0,0,0.5)",
            fill: true,
          },
        ],
      }}
    />
  ) : null;

  if (loading) {
    return <img alt="loading" style={{ margin: "auto" }} src={loadingSvg} />;
  }

  return (
    <div style={{ margin: "auto", height: "100%" }}>
      {country ? barChart : lineChart}
    </div>
  );
};

export default Chart;
