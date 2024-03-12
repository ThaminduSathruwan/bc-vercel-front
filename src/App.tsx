import React, { useState } from 'react';
import './App.css';
import { StackedCarousel, ResponsiveContainer } from 'react-stacked-center-carousel';
import Navbar from './components/Navbar';
import TransactionStream from './components/TransactionStream';
import DialogBoxModal from './components/DialogBoxModal';
import Service from './services/Service';
import PieChart from './components/PieChart';

interface TransactionData {
  txn_id: string;
  txn_size: number;
  txn_type: string;
}

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

function App() {
  const [isStatsOpen, setIsStatsOpen] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [isTransactionOpen, setIsTransactionOpen] = useState(false);
  const [transactionData, setTransactionData] = useState<TransactionData | null>(null);
  const [statsData, setStatsData] = useState<StatsData>();

  const renderStatsContent = (statsData: StatsData) => {
    if (!statsData) {
      return <div>Loading...</div>;
    }

    return (
      <div className="max-w-screen-lg mx-auto px-4">
        <ul className="mt-4 divide-y divide-gray-400">
          <li className="py-2 flex flex-wrap sm:flex-nowrap">
            <span className="w-full sm:w-1/2 font-bold text-right">Transaction Count (Last 1 Hour) :</span>
            <span className="w-full sm:w-1/2 font-bold">{statsData.transaction_count}</span>
          </li>
          <li className="py-2 flex flex-wrap sm:flex-nowrap">
            <span className="w-full sm:w-1/2 font-bold text-right">Block Count (Last 1 Hour) :</span>
            <span className="w-full sm:w-1/2 font-bold">{statsData.block_count}</span>
          </li>
          <li className="py-2 flex flex-wrap sm:flex-nowrap">
            <span className="w-full sm:w-1/2 font-bold text-right">Total Transaction Amount (Last 1 Hour) :</span>
            <span className="w-full sm:w-1/2 font-bold">{statsData.total_tx_amount}</span>
          </li>
        </ul>
        <div className="mt-8">
          <h2 className="text-lg font-semibold mb-2">Top Miners (Last 1000 Blocks)</h2>
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
            <span className="w-full sm:w-1/2 font-bold text-right">Transaction ID &nbsp;:</span>
            <span className="w-full sm:w-1/2 font-bold text-left">&nbsp;&nbsp;{transactionData.txn_id}</span>
          </li>
          <li className="py-2 flex flex-wrap sm:flex-nowrap">
            <span className="w-full sm:w-1/2 font-bold text-right">Transaction Size &nbsp;:</span>
            <span className="w-full sm:w-1/2 font-bold text-left">&nbsp;&nbsp;{transactionData.txn_size}</span>
          </li>
          <li className="py-2 flex flex-wrap sm:flex-nowrap">
            <span className="w-full sm:w-1/2 font-bold text-right">Transaction Type &nbsp;:</span>
            <span className="w-full sm:w-1/2 font-bold text-left">&nbsp;&nbsp;{transactionData.txn_type}</span>
          </li>
          <li className="py-2 flex flex-wrap sm:flex-nowrap">
            <span className="w-full sm:w-1/2 font-bold text-right">View More &nbsp;:</span>
            <a href={`https://etherscan.io/tx/${transactionData.txn_id}`} target="_blank" rel="noopener noreferrer" className="w-full sm:w-1/2 font-bold text-blue-500 hover:underline text-left">&nbsp;&nbsp;View on Etherscan</a>
          </li>
        </ul>
      </div>
    );
  }

  const renderHelpContent = () => {
    return (
      <div className="max-w-screen-md mx-auto px-4 py-8">
        <h2 className="text-2xl font-semibold mb-4 text-center">Welcome to the Help Center</h2>
        <div className="bg-gray-800 border border-gray-100 shadow-md rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-4 text-white">Getting Started</h3>
          <p className="mb-4 text-white">To begin exploring the Blockchain Visualizer, simply enter a transaction ID or block hash in the search bar. The visualizer will then display the transaction details or block information, allowing you to interactively explore the blockchain.</p>
          
          <h3 className="text-xl font-semibold mb-4 text-white">FAQs</h3>
          <div className="mb-4">
            <p className="mb-2 text-white"><strong>Q: What blockchain networks does the visualizer support?</strong></p>
            <p className="mb-4 text-white">A: Our visualizer currently supports popular blockchain networks such as Ethereum and Bitcoin. We're continuously expanding our support to include more networks in the future.</p>
            
            <p className="mb-2 text-white"><strong>Q: How frequently is the blockchain data updated?</strong></p>
            <p className="mb-4 text-white">A: The blockchain data displayed in our visualizer is updated in real-time, ensuring that you have access to the latest information.</p>
          </div>
          
          <h3 className="text-xl font-semibold mb-4 text-white">Contact Us</h3>
          <p className="text-white">If you have any further questions or encounter any issues while using our Blockchain Visualizer, please don't hesitate to contact our support team. We're here to help!</p>
        </div>
      </div>
    );
  }

  const openStatsModal = () => {
    const fetchStatsData = async () => {
      try {
        const statsData = await Service.getStatsData();
        setStatsData(statsData);
        setIsStatsOpen(true);
      } catch (error) {
        console.error(error);
      }
    }
    
    fetchStatsData();
  }

  const closeStatsModal = () => {
    setIsStatsOpen(false);
  }
  
  const openHelpModal = () => {
    setIsHelpOpen(true);
  }
  
  const closeHelpModal = () => {
    setIsHelpOpen(false);
  }
  
  const openTransactionModal = () => {
    setIsTransactionOpen(true);
  }
  
  const closeTransactionModal = () => {
    setIsTransactionOpen(false);
  }
  
  const handleSetTransactionData = (txnData: TransactionData) => {
    setTransactionData(txnData);
    openTransactionModal();
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
  
  const ref = React.useRef<StackedCarousel>(null);
  
  return (
    <div className="App bg-black text-white w-screen h-screen"> {/* Use overflow-hidden to prevent scrolling */}
      <Navbar openStatsModal={openStatsModal} openHelpModal={openHelpModal} onSearch={onSearch} />
      <TransactionStream setTransactionData={handleSetTransactionData}/>
      
      {/* Dialog Boxes */}
      <DialogBoxModal
        isOpen={isStatsOpen}
        title="Stats"
        body={renderStatsContent(statsData as StatsData)}
        buttons={[
          { text: "Close", onClick: closeStatsModal },
        ]}
        onClose={closeStatsModal}
      />
      <DialogBoxModal
        isOpen={isHelpOpen}
        title="Help"
        body={renderHelpContent()}
        buttons={[
          { text: "Close", onClick: closeHelpModal },
        ]}
        onClose = {closeHelpModal}
      />
      <DialogBoxModal
        isOpen={isTransactionOpen}
        title="Transaction Details"
        body={transactionData ? renderTransactionContent(transactionData) : <div>Loading...</div>}
        buttons={[
          { text: "Close", onClick: closeTransactionModal },
        ]}
        onClose={closeTransactionModal}
      />
    </div>
  );
}

export default App;
