import React, { useState, useEffect } from 'react';
import Service from '../services/Service';
import Transaction from './Transaction';
import TransactionPool from './TransactionPool';
import BlockCarousel from './BlockCarousel';
import Card from './Card';

interface ReplayProps {
    setTransactionData: (txnData: any) => void;
    setBlockData: (blockData: any) => void;
}

const Replay: React.FC<ReplayProps> = ({setTransactionData, setBlockData}) => {
    const [startTime, setStartTime] = useState('');
    const [replayedTransactions, setReplayedTransactions] = useState<any[]>([]);
    const [replayedBlocks, setReplayedBlocks] = useState<any[]>([]);
    const [replayTransactionPool, setReplayTransactionPool] = useState<any[]>([]);
    const [endTime, setEndTime] = useState('');
    const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);

    const handleStartTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setStartTime(event.target.value);
    };
    
    const addTransactionToReplayPool = (txn: any) => {
        setReplayTransactionPool(prevReplayTransactionPool => [...prevReplayTransactionPool, txn]);
    };
    
    const addBlocks = (newBlocks: any) => {
        setReplayedBlocks(prevBlocks => [...prevBlocks, ...newBlocks]);
    };

    const replayTransactions = async () => {
        try {
            if (startTime === '') {
                console.error('Start time is required.');
                return;
            }
            
            setReplayedTransactions([]); // Clear replayed transactions
            setReplayedBlocks([]); // Clear replayed blocks
            setReplayTransactionPool([]); // Clear replay transaction pool
                        
            const endDateTime = new Date(new Date(startTime).getTime() + 0.25 * 60000); // 5 minutes
            setEndTime(endDateTime.toISOString());

            let currentStartTime = new Date(startTime);
            const id = setInterval(async () => {
                if (currentStartTime >= endDateTime) {
                    clearInterval(id);
                    setStartTime('');
                    return;
                }

                const endOfWindow = new Date(currentStartTime);
                endOfWindow.setSeconds(endOfWindow.getSeconds() + 5);
                await fetchStreamData(currentStartTime.toISOString(), endOfWindow.toISOString());
                currentStartTime = endOfWindow;
            }, 1000);

            setIntervalId(id);
        } catch (error) {
            console.error(error);
        }
    };

    const fetchStreamData = async (start_time: string, end_time: string) => {
        try {
            const response = await Service.getStreamData(start_time, end_time);
            setReplayedTransactions(response.transactions);
            addBlocks(response.blocks);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="">
            <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-gray-800 rounded-lg shadow-lg w-auto p-2">
                <form onSubmit={(e) => e.preventDefault()} className="flex flex-col lg:flex-row gap-4 items-center">
                    <label htmlFor="start-time" className="text-white text-lg font-bold">Start Time:</label>
                    <input
                        type="datetime-local"
                        id="start-time"
                        value={startTime}
                        onChange={handleStartTimeChange}
                        className="px-4 py-2 rounded-lg bg-gray-700 text-white focus:outline-none dark:bg-gray-900 dark:text-gray-300"
                    />
                    <button type="submit" onClick={replayTransactions} className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none">
                        Replay
                    </button>
                </form>
            </div>
            <Transaction transaction={replayedTransactions} addTransactionToPool={addTransactionToReplayPool} />
            <TransactionPool poolTransaction={replayTransactionPool} setTransactionData={setTransactionData} count={0} />
            {replayedBlocks.length === 0 && (
                <div className='flex items-center justify-center mt-8'>
                    <BlockCarousel children={undefined} />
                </div>
            )}
            {replayedBlocks.length > 0 && (
                <div className='flex items-center justify-center mt-8'>
                    <BlockCarousel>
                        {replayedBlocks.map((b, index) => (
                            <Card
                                key={index}
                                title={b.block_hash}
                                content={b}
                                setBlockData={setBlockData}
                            />
                        ))}
                    </BlockCarousel>
                </div>
            )}
        </div>
    );
};

export default Replay;
