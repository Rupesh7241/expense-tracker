import React, { useEffect, useState } from 'react';
import CustomPieChart from '../../components/Charts/CustomPieChart';
const COLORS = ["#875CF5", "#FA2C37", "#FF6900", "#4f39f6"];

const RecentIncomeWithChart = ({data, totalIncome}) => {

    const [chartData, setCharData] = useState([]);

    const prepareCharData = () => {
        const dataArr = data?.map((item) => ({
            name: item?.source,
            amount: item?.amount,
        }));

        setCharData(dataArr);
    };

    useEffect(() => {
        prepareCharData();

        return () => {};
    },[data]);
  return (
    <div className="card">
        <div className="flex items-center justify-between ">
            <h5 className="text-lg">Last 60 Days Income</h5>
        </div>

        <CustomPieChart
        data={chartData}
        label="Total Income"
        totalAmount={`₹${totalIncome}`}
        showTextAnchor
        colors={COLORS}
        />
        
    
    </div>
  )
}

export default RecentIncomeWithChart
