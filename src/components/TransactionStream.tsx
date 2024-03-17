import React, { useEffect, useState } from "react";
import Transaction from "./Transaction";
import TransactionPool from "./TransactionPool";
import Service from "../services/Service";

interface TransactionStreamProps {
    setTransactionData: (txnData: any) => void;
}

const TransactionStream: React.FC<TransactionStreamProps> = ({setTransactionData}) => {
    const [transaction, setTransaction] = useState<any[]>([]);
    const [transactionPool, setTransactionPool] = useState<any[]>([]);
    const [initialTime, setInitialTime] = useState(new Date());

    const addTransactionToPool = (txn: any) => {
        setTransactionPool(prevTransactionPool => [...prevTransactionPool, txn]);
    };

    // generate random transaction to the transaction stream using seed as current time
    // const generateTransaction = () => {
    //     const randomTransaction = {
    //         txn_id: Date.now().toString(),
    //         txn_size: Math.floor(Math.random() * 10) + 5,
    //         txn_type: Math.random() > 0.5 ? "send" : "receive"
    //     };
    //     setTransaction(prevTransaction => [...prevTransaction, randomTransaction]);
    // };
    
    // useEffect(() => {
    //     generateTransaction();
    // }, []);

    // add transaction to the transaction stream every 1s
    // useEffect(() => {
    //     const intervalId = setInterval(generateTransaction, 200);
    //     return () => {
    //         clearInterval(intervalId);
    //     };
    // }, [transaction]);
    
    // get transactions from APIService getStream method
    useEffect(() => {
        const fetchStreamData = async () => {
            try {
                const current_time = new Date();
                const start_time = initialTime.toISOString();
                const end_time = current_time.toISOString();
                setInitialTime(current_time);
                const streamData: any[] = await Service.getStreamData(start_time, end_time);
                setTransaction(streamData);
            } catch (error) {
                console.error(error);
            }
        };
        
        const intervalId = setInterval(fetchStreamData, 500);
        return () => {
            clearInterval(intervalId);
        };
    },[transaction, initialTime]);
    
    const removeTransactionFromPool = (txnId: string) => {
        setTransactionPool(prevTransactionPool => prevTransactionPool.filter(txn => txn.txn_id !== txnId));
    };
    
    useEffect(() => {
            const intervalId = setInterval(() => {
            if (transactionPool.length > 0) {
                const randomIndex = Math.floor(Math.random() * transactionPool.length);
                const randomTransaction = transactionPool[randomIndex];
                removeTransactionFromPool(randomTransaction.txn_id);
            }
        }, 3000);
        return () => {
            clearInterval(intervalId);
        };
    }, [transactionPool]);
        

    return (
        <div className="">
            <Transaction transaction={transaction} addTransactionToPool={addTransactionToPool} />
        </div>
    );
}

export default TransactionStream;
