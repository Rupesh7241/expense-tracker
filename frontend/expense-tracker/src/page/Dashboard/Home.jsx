
import React, { useEffect, useState } from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { useUserAuth } from "../../hooks/useUserAuth";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPath";
import InfoCard from "../../components/Cards/InfoCard";
import { LuHandCoins, LuWalletMinimal, LuCreditCard } from "react-icons/lu";
import { addThousandsSeparator } from "../../utils/helper";
import RecentTransactions from "../../components/Dashboard/RecentTransactions";
import FinanceOverview from "./FinanceOverview";
import ExpenseTransactions from "./ExpenseTransactions";
import Last30DaysExpenses from "./Last30DaysExpenses";
import RecentIncomeWithChart from "./RecentIncomeWithChart";
import RecentIncome from "../../components/Dashboard/RecentIncome";




const Home = () => {
  useUserAuth();
  const navigate = useNavigate();

  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchDashboardData = async () => {
    if (loading) return;
    setLoading(true);

    try {
      const response = await axiosInstance.get(
        `${API_PATHS.DASHBOARD.GET_DATA}`
      );

      if (response.data) {
        setDashboardData(response.data);
      }
    } catch (error) {
      console.log("Something went wrong. Please try again.", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  return (
    <DashboardLayout activeMenu="Dashboard">
      <div className="my-5 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <InfoCard
            icon={<LuCreditCard />} // ✅ sahi icon yahan use hua
            label="Total Balance"
            value={addThousandsSeparator(dashboardData?.totalBalance || 0)}
            color="bg-primary"
          />

          <InfoCard
            icon={<LuWalletMinimal />} // ✅ sahi icon yahan use hua
            label="Total Income"
            value={addThousandsSeparator(dashboardData?.totalIncome || 0)}
            color="bg-orange-500"
          />

          <InfoCard
            icon={<LuHandCoins />} // ✅ sahi icon yahan use hua
            label="Total Expense"
            value={addThousandsSeparator(dashboardData?.totalExpenses || 0)}
            color="bg-red-500"
          />

          
        </div>

        <div className="grid grid-cols-1  md:grid-cols-2 gap-6 mt-6">
          <RecentTransactions
           transactions={dashboardData?.recentTransactions}
           onSeeMore={() => navigate("/expense")}
           />

           <FinanceOverview
              totalBalance={dashboardData?.totalBalance || 0}
              totalIncome={dashboardData?.totalIncome || 0}
              totalExpense={dashboardData?.totalExpenses || 0}
              />

              <ExpenseTransactions
               transactions={dashboardData?.last30DaysExpenses?.transaction || []}
               onSeeMore={() => navigate("/expense")}
               />

               <Last30DaysExpenses
               data={dashboardData?.last30DaysExpenses?.transaction || []}
               />
               <RecentIncomeWithChart
                  data={dashboardData?.last60DaysIncome?.transaction?.slice(0,4) || []}
                  totalIncome={dashboardData?.totalIncome || 0}
                />  

                <RecentIncome
                  transactions={dashboardData?.last60DaysIncome?.transaction || []}
                  onSeeMore={() => navigate("/income")}
                  />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Home;
