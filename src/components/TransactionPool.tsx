import React, { useState } from "react";
import './ToolTip.css'
import Service from "../services/Service";

interface PoolTransactionProps {
    poolTransaction: {
        txn_hash: string;
        status: string;
        amount: number;
        type: number;
        fee: number;
        txn_color: string;
    }[];
    setTransactionData: (txnData: any) => void;
    count: number;
}

const TransactionPool: React.FC<PoolTransactionProps> = ({ poolTransaction, setTransactionData, count }) => {

    const handleTransactionClick = (txnId: string) => {
        const fetchTransactionData = async () => {
            try {
                const transactonData: any[] = await Service.getTransactionData(txnId);
                setTransactionData(transactonData);
            } catch (error) {
                console.error(error);
            }
        };
        
        fetchTransactionData();
        };
    
    return (
        // <div className="absolute bottom-0 left-0 w-full max-h-80 overflow-y-auto">
        <div className="absolute bottom-0 left-0 w-full overflow-y-auto max-h-80">
            {/* <h1 className="text-left text-xl p-2">Transaction Mempool ({poolTransaction.length} transactions)</h1> */}
            <h1 className="text-left text-xl p-2">Transactions in the Mempool {Math.max(count, poolTransaction.length)} (showing {poolTransaction.length}) </h1>
                <div className="flex flex-wrap justify-center items-center p-2 rounded-lg">
                    {poolTransaction.map((txn, index) => (
                        <div key={index} className="m-1 tooltip">
                            {/* <div className="tooltiptext"> 
                                Transaction ID: {txn.txn_hash}<br />
                                Size: {txn.amount}<br />
                                Type: {txn.type}
                            </div> */}
                            <button onClick={() => handleTransactionClick(txn.txn_hash)}>
                                <svg width={txn.amount} height={txn.amount}>
                                    <circle cx={txn.amount / 2} cy={txn.amount / 2} r={txn.amount / 2} fill={txn.txn_color} />
                                </svg>
                            </button>
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default TransactionPool;