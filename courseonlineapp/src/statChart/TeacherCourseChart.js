import React, { useCallback, useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import useFetchApi from "../Configs/FetchApi";
import { endpoints } from "../Configs/Apis";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const TeacherCourseChart = ({month,year }) => {
    const  [data,setData]=useState([])
  // Chuẩn bị labels & values từ props data
  const labels = data.map((item) => item.teacher);
  const courseCounts = data.map((item) => item.courseCount);


  const { loading, fetchApi } = useFetchApi();

  const loadData = async () => {
    let url = `${endpoints["get_teacher_course_create"]}`;
    if (month) url = `${url}?month=${month}&year=${year}`;
    console.log(url);

    const res = await fetchApi({ url });
    if (res.status === 200) {
      setData(res.data);
      console.log(res.data);
    }
  }

//   useEffect(() => {
//     loadData();
//   }, []);
  useEffect(() => {
    loadData();
  }, [month,year]);

  

  const chartData = {
    labels,
    datasets: [
      {
        label: "Số lượng khóa học",
        data: courseCounts,
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
        borderRadius: 8,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
      title: {
        display: true,
        text: "Thống kê số lượng khóa học theo giáo viên",
        font: {
          size: 18,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
        },
      },
    },
  };

  return (
    <div className="max-w-3xl mx-auto p-4 bg-white shadow rounded-2xl">
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default TeacherCourseChart;
