

import React from 'react';
import { LuArrowRight } from 'react-icons/lu';
import moment from 'moment';
import TrasactionInfoCard from "../Cards/TransactionInfoCard";

const RecentTransactions = ({ transactions, onSeeMore }) => {
  const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <h5 className="text-lg font-semibold">Recent Transactions</h5>
        <button
          className="flex items-center gap-1 px-3 py-1 border rounded-md text-sm text-gray-600 hover:bg-gray-100"
          onClick={onSeeMore}
        >
          See All <LuArrowRight className="text-base" />
        </button>
      </div>

      <div className="mt-6">
        {transactions && transactions.length > 0 ? (
          transactions.slice(0, 5).map((item) => (
            <div key={item._id} className="mb-3">
              <TrasactionInfoCard
                title={
                  item.type === 'expense'
                    ? capitalize(item.category)
                    : capitalize(item.source)
                }
                icon={item.icon}
                date={moment(item.date).format("Do MMM YYYY")}
                amount={item.amount}
                type={item.type}
                hideDeleteBtn
              />
            </div>
          ))
        ) : (
          <p className="text-sm text-gray-500">No recent transactions found.</p>
        )}
      </div>
    </div>
  );
};

export default RecentTransactions;
