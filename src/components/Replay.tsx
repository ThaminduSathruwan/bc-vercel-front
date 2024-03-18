import React, { useState, useEffect } from 'react';
import Service from '../services/Service';
import Transaction from './Transaction';
import TransactionPool from './TransactionPool';
import BlockCarousel from './BlockCarousel';
import Card from './Card';
import DialogBoxModal from './DialogBoxModal';

const Replay: React.FC = () => {
    const [startTime, setStartTime] = useState('');
    const [replayedTransactions, setReplayedTransactions] = useState<any[]>([]);
    const [replayedBlocks, setReplayedBlocks] = useState<any[]>([]);
    const [replayTransactionPool, setReplayTransactionPool] = useState<any[]>([]);
    const [endTime, setEndTime] = useState('');
    const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);
    const [isBlockModalOpen, setIsBlockModalOpen] = useState(false);
    const [replayBlockData, setReplayBlockData] = useState<any | null>(null);
    const [isTxnModalOpen, setIsTxnModalOpen] = useState(false);
    const [replayTxnData, setReplayTxnData] = useState<any | null>(null);

    const [txnTypes, setTxnTypes] = useState(["Legacy", "Crypto", "Contract", "Shared-blob"]);

    
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
    
    const openReplayBlockModal = () => {
        setIsBlockModalOpen(true);
    };
    
    const closeReplayBlockModal = () => {
        setIsBlockModalOpen(false);
    };

    const handleSetBlockData = (blockData: any) => {
        setReplayBlockData(blockData);
        openReplayBlockModal();
    };
    
    const renderBlockContent = (blockData: any) => {
        return (
        <div>
            <ul className="mt-4 divide-y divide-gray-400">
            <li className="py-2 flex flex-wrap sm:flex-nowrap">
                <span className="w-full sm:w-1/2 font-bold text-right">Block Hash &nbsp;:</span>
                <span className="w-full sm:w-1/2 font-bold text-left">&nbsp;&nbsp;{blockData.block_hash}</span>
            </li>
            <li className="py-2 flex flex-wrap sm:flex-nowrap">
                <span className="w-full sm:w-1/2 font-bold text-right">Height &nbsp;:</span>
                <span className="w-full sm:w-1/2 font-bold text-left">&nbsp;&nbsp;{blockData.height}</span>
            </li>
            <li className="py-2 flex flex-wrap sm:flex-nowrap">
                <span className="w-full sm:w-1/2 font-bold text-right">Nonce &nbsp;:</span>
                <span className="w-full sm:w-1/2 font-bold text-left">&nbsp;&nbsp;{blockData.nonce}</span>
            </li>
            <li className="py-2 flex flex-wrap sm:flex-nowrap">
                <span className="w-full sm:w-1/2 font-bold text-right">Difficulty &nbsp;:</span>
                <span className="w-full sm:w-1/2 font-bold text-left">&nbsp;&nbsp;{blockData.difficulty}</span>
            </li>
            <li className="py-2 flex flex-wrap sm:flex-nowrap">
                <span className="w-full sm:w-1/2 font-bold text-right">Timestamp &nbsp;:</span>
                <span className="w-full sm:w-1/2 font-bold text-left">&nbsp;&nbsp;{blockData.timestamp}</span>
            </li>
            <li className="py-2 flex flex-wrap sm:flex-nowrap">
                <span className="w-full sm:w-1/2 font-bold text-right">View More &nbsp;:</span>
                <a href={`https://etherscan.io/block/${blockData.block_hash}`} target="_blank" rel="noopener noreferrer" className="w-full sm:w-1/2 font-bold text-blue-500 hover:underline text-left">&nbsp;&nbsp;View on Etherscan</a> 
            </li>
            </ul>
        </div>
        );
    }
    
    const openReplayTxnModal = () => {
        setIsTxnModalOpen(true);
    };
    
    const closeReplayTxnModal = () => {
        setIsTxnModalOpen(false);
    };

    const handleSetTxnData = (txnData: any) => {
        setReplayTxnData(txnData);
        openReplayTxnModal();
    };
    
    const renderTxnContent = (txnData: any) => {
    return (
      <div>
        <ul className="mt-4 divide-y divide-gray-400">
          <li className="py-2 flex flex-wrap sm:flex-nowrap">
            <span className="w-full sm:w-1/2 font-bold text-right">Transaction Hash &nbsp;:</span>
            <span className="w-full sm:w-1/2 font-bold text-left">&nbsp;&nbsp;{txnData.txn_hash}</span>
          </li>
          <li className="py-2 flex flex-wrap sm:flex-nowrap">
            <span className="w-full sm:w-1/2 font-bold text-right">Transaction Status &nbsp;:</span>
            <span className="w-full sm:w-1/2 font-bold text-left">&nbsp;&nbsp;{txnData.status}</span>
          </li>
          <li className="py-2 flex flex-wrap sm:flex-nowrap">
            <span className="w-full sm:w-1/2 font-bold text-right">Transaction Amount &nbsp;:</span>
            <span className="w-full sm:w-1/2 font-bold text-left">&nbsp;&nbsp;{txnData.amount}</span>
          </li>
          <li className="py-2 flex flex-wrap sm:flex-nowrap">
            <span className="w-full sm:w-1/2 font-bold text-right">Transaction Type &nbsp;:</span>
            <span className="w-full sm:w-1/2 font-bold text-left">&nbsp;&nbsp;{txnTypes[txnData.type]}</span>
          </li>
          <li className="py-2 flex flex-wrap sm:flex-nowrap">
            <span className="w-full sm:w-1/2 font-bold text-right">Transaction Fee &nbsp;:</span>
            <span className="w-full sm:w-1/2 font-bold text-left">&nbsp;&nbsp;{txnData.fee}</span>
          </li>
          <li className="py-2 flex flex-wrap sm:flex-nowrap">
            <span className="w-full sm:w-1/2 font-bold text-right">View More &nbsp;:</span>
            <a href={`https://etherscan.io/tx/${txnData.txn_hash}`} target="_blank" rel="noopener noreferrer" className="w-full sm:w-1/2 font-bold text-blue-500 hover:underline text-left">&nbsp;&nbsp;View on Etherscan</a>
          </li>
        </ul>
      </div>
    );
  }

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
            <TransactionPool poolTransaction={replayTransactionPool} setTransactionData={handleSetTxnData} count={0} />
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
                                setBlockData={handleSetBlockData}
                            />
                        ))}
                    </BlockCarousel>
                </div>
            )}
            <DialogBoxModal
                isOpen={isTxnModalOpen}
                title="Transaction Details"
                body={replayTxnData ? renderTxnContent(replayTxnData) : <div>Loading...</div>}
                buttons={[
                // { text: "Close", onClick: closeTransactionModal },
                ]}
                onClose={closeReplayTxnModal}
                width='60%'
                height='60%'
            />
            <DialogBoxModal
                isOpen={isBlockModalOpen}
                title="Block Details"
                body={replayBlockData ? renderBlockContent(replayBlockData) : <div>Loading...</div>}
                buttons={[
                // { text: "Close", onClick: closeBlockModal },
                ]}
                onClose={closeReplayBlockModal}
                width='60%'
                height='60%'
            />
        </div>
    );
};

export default Replay;
