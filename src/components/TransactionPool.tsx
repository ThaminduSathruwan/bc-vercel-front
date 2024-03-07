import React, { useState } from "react";
import './ToolTip.css'
import Service from "../services/Service";

interface PoolTransactionProps {
    poolTransaction: {
        txn_id: string;
        txn_size: number;
        txn_type: string;
        x: number;
        y: number;
        txn_color: string;
    }[];
    setTransactionData: (txnData: any) => void;
}

const TransactionPool: React.FC<PoolTransactionProps> = ({ poolTransaction, setTransactionData }) => {

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
        <div className="absolute bottom-0 left-0 w-full max-h-80 overflow-hidden">
            <h1 className="text-center text-xl">Transaction Mempool ({poolTransaction.length} transactions)</h1>
            <div className="flex flex-wrap justify-center items-center p-2 rounded-lg">
                {poolTransaction.map((txn, index) => (
                    <div key={index} className="m-1 tooltip">
                        {/* <div className="tooltiptext"> 
                            Transaction ID: {txn.txn_id}<br />
                            Size: {txn.txn_size}<br />
                            Type: {txn.txn_type}
                        </div> */}
                        <button onClick={() => handleTransactionClick(txn.txn_id)}>
                            <svg width={txn.txn_size} height={txn.txn_size}>
                            <circle cx={txn.txn_size / 2} cy={txn.txn_size / 2} r={txn.txn_size / 2} fill={txn.txn_color} />
                        </svg>
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TransactionPool;