import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useEffect, useState } from "react";
import useFetchApi from "../Configs/FetchApi";
import { endpoints } from "../Configs/Apis";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function TeacherCoursePublicChart() {
     const  [data,setData]=useState([])
    const { loading, fetchApi } = useFetchApi();

  const loadData = async () => {
    let url = `${endpoints['get_teacher_public_and_not_courses']}`;
    // if (month) url = `${url}?month=${month}&year=${year}`;
    console.log(url);

    const res = await fetchApi({ url });
    if (res.status === 200) {
      setData(res.data);
      console.log(res.data);
    }
  }
  useEffect(() => {
      loadData();
    }, []);
  const labels = data.map((item) => item.teacher);

  const chartData = {
    labels,
    datasets: [
      {
        label: "Khóa học công khai",
        data: data.map((item) => item.coursePublic),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
      {
        label: "Chưa công khai",
        data: data.map((item) => item.courseNotPublicYet),
        backgroundColor: "rgba(255, 99, 132, 0.6)",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: {
        display: true,
        text: "Số lượng khóa học của giảng viên",
      },
    },
  };

  return <Bar data={chartData} options={options} />;
}
