import React, { useEffect, useState } from 'react';
import './index.css'; // Import Tailwind CSS
import Navbar from './components/Navbar';
import Service from './services/Service';
import DialogBoxModal from './components/DialogBoxModal';
import PieChart from './components/PieChart';
import Stream from './components/Stream';
import Replay from './components/Replay';

interface Miner {
  miner: string;
  miner_count: number;
}

interface StatsData {
  transaction_count: number;
  block_count: number;
  total_tx_amount: number;
  miners: Miner[];
}

interface TransactionData {
  txn_hash: string;
  status: string;
  amount: number;
  type: number;
  fee: number;
}

function App() {
  const [isStatsOpen, setIsStatsOpen] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [isTransactionOpen, setIsTransactionOpen] = useState(false);
  const [isBlockOpen, setIsBlockOpen] = useState(false);
  const [isReplayOpen, setIsReplayOpen] = useState(false);
  const [transactionData, setTransactionData] = useState<TransactionData | null>(null);
  const [blockData, setBlockData] = useState<any | null>(null);
  const [statsData, setStatsData] = useState<StatsData>();
  
  const [transactionTypes, setTransactionTypes] = useState(["Legacy", "Crypto", "Contract", "Shared-blob"]);
  
  const openStatsModal = () => {
    const fetchStatsData = async () => {
      try {
        const start_time = new Date().toISOString();
        const response = await Service.getStatsData(start_time);
        const statsData = response;
        setStatsData(statsData);
        setIsStatsOpen(true);
      } catch (error) {
        console.error(error);
      }
    }
    
    fetchStatsData();
  }
  
  const openHelpModal = () => {
    setIsHelpOpen(true);
  }
  
  const openTransactionModal = () => {
    setIsTransactionOpen(true);
  }
  
  const openBlockModal = () => {
    setIsBlockOpen(true);
  }
  
  const openReplayModal = () => {
    setIsReplayOpen(true);
  }
  
  const closeStatsModal = () => {
    setIsStatsOpen(false);
  }
  
  const closeHelpModal = () => {
    setIsHelpOpen(false);
  }
  
  const closeTransactionModal = () => {
    setIsTransactionOpen(false);
  }
  
  const closeBlockModal = () => {
    setIsBlockOpen(false);
  }
  
  const closeReplayModal = () => {
    setIsReplayOpen(false);
  }
  
  const onSearch = (searchQuery: string) => {
    const fetchTransactionData = async () => {
            try {
              const transactonData = await Service.getTransactionData(searchQuery);
              handleSetTransactionData(transactonData);
            } catch (error) {
              console.error(error);
            }
        };
        
    fetchTransactionData();
  }
  
  const handleSetTransactionData = (txnData: TransactionData) => {
    setTransactionData(txnData);
    openTransactionModal();
  }
  
  const handleSetBlockData = (blockData: any) => {
    setBlockData(blockData);
    openBlockModal();
  }
  
  const renderStatsContent = (statsData: StatsData) => {
    if (!statsData) {
      return <div>Loading...</div>;
    }

    return (
      <div className="max-w-screen-lg mx-auto px-4">
        <ul className="mt-4 divide-y divide-gray-400">
          <li className="py-2 flex flex-wrap sm:flex-nowrap">
            <span className="w-full sm:w-1/2 font-bold text-right">Transaction Count (Last 1 Hour) :</span>
            <span className="w-full sm:w-1/2 font-bold text-center">{statsData.transaction_count}</span>
          </li>
          <li className="py-2 flex flex-wrap sm:flex-nowrap">
            <span className="w-full sm:w-1/2 font-bold text-right">Block Count (Last 1 Hour) :</span>
            <span className="w-full sm:w-1/2 font-bold text-center">{statsData.block_count}</span>
          </li>
          <li className="py-2 flex flex-wrap sm:flex-nowrap">
            <span className="w-full sm:w-1/2 font-bold text-right">Total Transaction Amount (Last 1 Hour) :</span>
            <span className="w-full sm:w-1/2 font-bold text-center">{statsData.total_tx_amount}</span>
          </li>
        </ul>
        <div className="mt-8">
          <h2 className="text-lg font-semibold mb-2 text-center">Top Miners (Last 1000 Blocks)</h2>
          <div className="w-full sm:w-64 h-auto mx-auto">
            <PieChart miners={statsData.miners} />
          </div>
        </div>
      </div>
    );
  };
  
  const renderTransactionContent = (transactionData: TransactionData) => {
    return (
      <div>
        <ul className="mt-4 divide-y divide-gray-400">
          <li className="py-2 flex flex-wrap sm:flex-nowrap">
            <span className="w-full sm:w-1/2 font-bold text-right">Transaction Hash &nbsp;:</span>
            <span className="w-full sm:w-1/2 font-bold text-left">&nbsp;&nbsp;{transactionData.txn_hash}</span>
          </li>
          <li className="py-2 flex flex-wrap sm:flex-nowrap">
            <span className="w-full sm:w-1/2 font-bold text-right">Transaction Status &nbsp;:</span>
            <span className="w-full sm:w-1/2 font-bold text-left">&nbsp;&nbsp;{transactionData.status}</span>
          </li>
          <li className="py-2 flex flex-wrap sm:flex-nowrap">
            <span className="w-full sm:w-1/2 font-bold text-right">Transaction Amount &nbsp;:</span>
            <span className="w-full sm:w-1/2 font-bold text-left">&nbsp;&nbsp;{transactionData.amount}</span>
          </li>
          <li className="py-2 flex flex-wrap sm:flex-nowrap">
            <span className="w-full sm:w-1/2 font-bold text-right">Transaction Type &nbsp;:</span>
            <span className="w-full sm:w-1/2 font-bold text-left">&nbsp;&nbsp;{transactionTypes[transactionData.type]}</span>
          </li>
          <li className="py-2 flex flex-wrap sm:flex-nowrap">
            <span className="w-full sm:w-1/2 font-bold text-right">Transaction Fee &nbsp;:</span>
            <span className="w-full sm:w-1/2 font-bold text-left">&nbsp;&nbsp;{transactionData.fee}</span>
          </li>
          <li className="py-2 flex flex-wrap sm:flex-nowrap">
            <span className="w-full sm:w-1/2 font-bold text-right">View More &nbsp;:</span>
            <a href={`https://etherscan.io/tx/${transactionData.txn_hash}`} target="_blank" rel="noopener noreferrer" className="w-full sm:w-1/2 font-bold text-blue-500 hover:underline text-left">&nbsp;&nbsp;View on Etherscan</a>
          </li>
        </ul>
      </div>
    );
  }
  
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

  const renderHelpContent = () => {
    return (
      <div className="max-w-screen-md mx-auto px-4 py-8">
        <h2 className="text-2xl font-semibold mb-4 text-center text-gray-300">Welcome to the Help Center</h2>
        <div className="bg-gray-900 border border-gray-700 shadow-md rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-4 text-white text-center">Getting Started</h3>
          <p className="mb-4 text-gray-400">To begin exploring the Blockchain Visualizer, simply enter a transaction ID or block hash in the search bar. The visualizer will then display the transaction details or block information, allowing you to interactively explore the blockchain.</p>
          
          <h3 className="text-xl font-semibold mb-4 text-white text-center">FAQs</h3>
          <div className="mb-4">
            <p className="mb-2 text-white"><strong>Q: What blockchain networks does the visualizer support?</strong></p>
            <p className="mb-4 text-gray-400">A: Our visualizer currently supports popular blockchain networks such as Ethereum and Bitcoin. We're continuously expanding our support to include more networks in the future.</p>
            
            <p className="mb-2 text-white"><strong>Q: How frequently is the blockchain data updated?</strong></p>
            <p className="mb-4 text-gray-400">A: The blockchain data displayed in our visualizer is updated in real-time, ensuring that you have access to the latest information.</p>
          </div>
          
          <h3 className="text-xl font-semibold mb-4 text-white text-center">Contact Us</h3>
          <p className="text-gray-400">If you have any further questions or encounter any issues while using our Blockchain Visualizer, please don't hesitate to contact our support team. We're here to help!</p>
        </div>
      </div>
    );
  }
  
  const renderReplayContent = () => {
    return (
      <Replay />
    );
  }
  
  return (
    <div className="App bg-black text-white w-screen h-screen"> {/* Use overflow-hidden to prevent scrolling */}
      <Navbar openStatsModal={openStatsModal} openHelpModal={openHelpModal} onSearch={onSearch} openReplayModal={openReplayModal}/>
      <Stream setTransactionData={handleSetTransactionData} setBlockData={handleSetBlockData}/>
      {/* Dialog Boxes */}
      <DialogBoxModal
        isOpen={isStatsOpen}
        title="Stats"
        body={renderStatsContent(statsData as StatsData)}
        buttons={[
          // { text: "Close", onClick: closeStatsModal },
        ]}
        onClose={closeStatsModal}
      />
      <DialogBoxModal
        isOpen={isHelpOpen}
        title="Help"
        body={renderHelpContent()}
        buttons={[
          // { text: "Close", onClick: closeHelpModal },
        ]}
        onClose = {closeHelpModal}
      />
      <DialogBoxModal
        isOpen={isTransactionOpen}
        title="Transaction Details"
        body={transactionData ? renderTransactionContent(transactionData) : <div>Loading...</div>}
        buttons={[
          // { text: "Close", onClick: closeTransactionModal },
        ]}
        onClose={closeTransactionModal}
      />
      <DialogBoxModal
        isOpen={isBlockOpen}
        title="Block Details"
        body={blockData ? renderBlockContent(blockData) : <div>Loading...</div>}
        buttons={[
          // { text: "Close", onClick: closeBlockModal },
        ]}
        onClose={closeBlockModal}
      />
      <DialogBoxModal
        isOpen={isReplayOpen}
        title="Replay"
        body={renderReplayContent()}
        buttons={[
          // { text: "Close", onClick: closeBlockModal },
        ]}
        onClose={closeReplayModal}
      />
    </div>
  );
}

export default App;
