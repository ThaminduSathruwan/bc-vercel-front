import React, { useEffect, useState } from 'react';
import './index.css'; // Import Tailwind CSS
import Navbar from './components/Navbar';
import Service from './services/Service';
import DialogBoxModal from './components/DialogBoxModal';
import Stream from './components/Stream';
import Replay from './components/Replay';
import BlockView from './components/BlockView';
import TxnView from './components/TxnView';
import StatsView from './components/StatsView';

function App() {
  const [isStatsOpen, setIsStatsOpen] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [isTransactionOpen, setIsTransactionOpen] = useState(false);
  const [isBlockOpen, setIsBlockOpen] = useState(false);
  const [isReplayOpen, setIsReplayOpen] = useState(false);
  const [transactionData, setTransactionData] = useState<any | null>(null);
  const [blockData, setBlockData] = useState<any | null>(null);
  const [statsData, setStatsData] = useState<any>();
  
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
  
  const handleSetTransactionData = (txnData: any) => {
    setTransactionData(txnData);
    openTransactionModal();
  }
  
  const handleSetBlockData = (blockData: any) => {
    setBlockData(blockData);
    openBlockModal();
  }
  
  const renderStatsContent = (statsData: any) => {
    return (
      <StatsView StatsData={statsData} />
    );
  };
  
  const renderTransactionContent = (transactionData: any) => {
    return (
        <TxnView txn={transactionData} />
    );
  }
  
  const renderBlockContent = (blockData: any) => {
    return (
      <BlockView block={blockData} setBlockData={handleSetBlockData} closeBlockModal={closeBlockModal} />
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
        body={renderStatsContent(statsData)}
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
