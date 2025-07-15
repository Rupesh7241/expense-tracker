import moment from "moment";
import { data } from "react-router-dom";


export const validateEmail=(email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
};

export const getInitials = (name) => {
    if (!name) return "";

    const words = name.split(" ");
    let initials = "";

    for (let i =0; i< Math.min(words.length, 2); i++){
        initials += words[i][0];
    }

    return initials.toUpperCase();
};


export const addThousandsSeparator = (num) => {
    if (num == null || isNaN(num)) return "";

    const [integerPart, fractionalPart] = num.toString().split(".");
    const formattedinteger = integerPart.replace(/\B(?=(\d{})+(?!\d))/g,",");

    return fractionalPart
    ? `${formattedinteger}.${fractionalPart}`
    : formattedinteger;
};

export const prepareExpenseBarChartData =(data = []) => {
    const chartData = data.map((item) => ({
        category: item?.category,
        amount: item?.amount
    }));

    return chartData;
};

export const prepareIncomeBarChartData = (data= []) => {
   // const sortedData = [...data]. sort((a, b) => new Date(a.date)- new date(b.date));
    const sortedData = [...data].sort((a, b) => new Date(a.date) - new Date(b.date));

    const chartData = sortedData.map((item) => ({
        month:moment(item?.date).format('DD MMM '),
        amount: item?.amount,
        source: item?.source,
    }));

    return chartData;
};

export const prepareExpenseLineChartData = (data=[]) => {
    const sortedData = [...data].sort((a, b) => new Date(a.date) - new Date(b.date));
    const chartData = sortedData.map((item) =>({
        month: moment(item?.date).format('DD MMM'),
        amount: item?.amount,
        category: item?.category,
    }));

    return chartData;
}