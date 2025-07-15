import React, { useEffect, useState } from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import IncomeOverview from "../../components/Income/IncomeOverview";
import axiosInstanse from "../../utils/axiosInstance"; 
import { API_PATHS } from "../../utils/apiPath";  
import Model from "../../components/Model";
import AddIncomeForm from "../../components/Income/AddIncomeForm";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import IncomeList from "../../components/Income/IncomeList";
import DeleteAlert from "../../components/DeleteAlert";
import { useUserAuth} from "../../hooks/useUserAuth";





const Income = () => {
   useUserAuth();
  const [IncomeData, setIncomeData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    data: null,
  });
  const [openAddIncomeModel, setOpenAddIncomeModel] = useState(false);

  // ✅ Get All Income Details
  const fetchIncomeDetails = async () => {
    if (loading) return;

    setLoading(true);

    try {
      const response = await axiosInstanse.get(`${API_PATHS.INCOME.GET_ALL_INCOME}`);
      
      // ✅ Ab yaha pe sahi hai:
      console.log("✅ API Response: ", response.data);

      if (response.data) {
        setIncomeData(response.data);
      }
    } catch (error) {
      console.log("❌ Something went wrong. Please try again.", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle add income
  const handleAddIncome = async (income) => {
      const { source, amount, date, icon } = income;

      // Validation Checks
      if (!source.trim()) {
        toast.error("Source is required.");
        return;
      }

      if (!amount || isNaN(amount) || Number(amount) <= 0) {
        toast.error("Amount should be a valid number greater than 0.")
        return;
      }

      if (!date) {
        toast.error("Date is required.");
        return;
      }

      try{
        await axiosInstanse.post(API_PATHS.INCOME.ADD_INCOME, {
          source,
          amount,
          date,
          icon,
        });

        setOpenAddIncomeModel(false);
        toast.success("Income added successfully");
        fetchIncomeDetails();
      } catch (error) {
        console.error(
          "Error adding income:",
          error.response?.data?.message || error.message
        );
      }
  };

  //DeleteIncome
  const deleteIncome = async (id) => {
    try{
      await axiosInstanse.delete(API_PATHS.INCOME.DELETE_INCOME(id));

      setOpenDeleteAlert({ show: false, data: null });
      toast.success("Income details deleted successfully");
      fetchIncomeDetails();
    } catch (error) {
      console.error(
        "Error deleting income:",
        error.response?.data?.message || error.message
      );
    }
  };
  //HandleDownloadIncomeDetails
  const handleDownloadIncomeDetails = async () => {
     try {
      const response = await axiosInstanse.get(
        API_PATHS.INCOME.DOWNLOAD_INCOME,
        {
          responseType: "blob",
        }
      );

      //Create a url for the blob
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "income_detail.xlsx");
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading income details:", error);
      toast.error("Failed to download income details. please try again.");

    }
  };

  useEffect(() => {
    fetchIncomeDetails();
    return () => {};
  }, []);

  return (
    <DashboardLayout activeMenu="Income">
      <div className="my-5 mx-auto">
        <div className="grid grid-cols-1 gap-6">
          <div>
            <IncomeOverview 
              transactions={IncomeData}
              onAddIncome={() => setOpenAddIncomeModel(true)}
            />
          </div>
          <IncomeList 
            transactions={IncomeData}
            onDelete={(id) => {
              setOpenDeleteAlert({ show: true, data: id});
            }}
            onDownload={handleDownloadIncomeDetails}
            />
        </div>
       
        <Model 
          isOpen={openAddIncomeModel}
          onClose={() => setOpenAddIncomeModel(false)}
          title="Add Income"
          >
            <AddIncomeForm onAddIncome={handleAddIncome} />
          </Model>

          <Model 
            isOpen={openDeleteAlert.show}
            onClose={() =>setOpenDeleteAlert({ show: false, data:null})}
            title="Delete Income"
            >
              <DeleteAlert
              content="Are you sure you want to delete this income datail?"
              onDelete={() => deleteIncome(openDeleteAlert.data)}
              />
            </Model>
      </div>
    </DashboardLayout>
  );
};

export default Income;
