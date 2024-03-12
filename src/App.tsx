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

const renderStatsContent = (statsData: StatsData) => {
  if (!statsData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-screen-lg mx-auto px-4">
      <ul className="mt-4 divide-y divide-gray-400">
        <li className="py-2 flex flex-wrap sm:flex-nowrap">
          <span className="w-full sm:w-1/2 font-bold text-right">Transaction Count (Last 1 Hour):</span>
          <span className="w-full sm:w-1/2 font-bold">{statsData.transaction_count}</span>
        </li>
        <li className="py-2 flex flex-wrap sm:flex-nowrap">
          <span className="w-full sm:w-1/2 font-bold text-right">Block Count (Last 1 Hour):</span>
          <span className="w-full sm:w-1/2 font-bold">{statsData.block_count}</span>
        </li>
        <li className="py-2 flex flex-wrap sm:flex-nowrap">
          <span className="w-full sm:w-1/2 font-bold text-right">Total Transaction Amount (Last 1 Hour):</span>
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
    console.log(txnData);
    setTransactionData(txnData);
    openTransactionModal();
  }
  
  const ref = React.useRef<StackedCarousel>(null);
  
  return (
    <div className="App bg-black text-white w-screen h-screen"> {/* Use overflow-hidden to prevent scrolling */}
      <Navbar openStatsModal={openStatsModal} openHelpModal={openHelpModal} />
      {/* <TransactionStream setTransactionData={handleSetTransactionData}/> */}
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
        body={<div>Help content goes here.</div>}
        buttons={[
          { text: "Close", onClick: closeHelpModal },
        ]}
        onClose = {closeHelpModal}
      />
      <DialogBoxModal
        isOpen={isTransactionOpen}
        title="Transaction Details"
        // show transaction data in the body like txn_hash, txn_size, txn_type, txn_fee, etc.
        body={<div>
          <ul className="mt-4 divide-y divide-gray-400">
            <li className="py-2 flex">
              <span className="w-1/3">Transaction ID:</span>
              <span className="w-2/3">{transactionData?.txn_id}</span>
            </li>
            <li className="py-2 flex">
              <span className="w-1/3">Transaction Size:</span>
              <span className="w-2/3">{transactionData?.txn_size}</span>
            </li>
            <li className="py-2 flex">
              <span className="w-1/3">Transaction Type:</span>
              <span className="w-2/3">{transactionData?.txn_type}</span>
            </li>
          </ul>
        </div>}
        buttons={[
          { text: "Close", onClick: closeTransactionModal },
        ]}
        onClose={closeTransactionModal}
      />
    </div>
  );
}

export default App;
