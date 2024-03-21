import React, { useState } from 'react';
import './index.css'; 
import Navbar from './components/Navbar';
import Service from './services/Service';
import DialogBoxModal from './components/DialogBoxModal';
import Stream from './components/Stream';
import Replay from './components/Replay';
import BlockView from './components/BlockView';
import TxnView from './components/TxnView';
import StatsView from './components/StatsView';
import HelpView from './components/HelpView';

function App() {
  const [isStatsOpen, setIsStatsOpen] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [isTransactionOpen, setIsTransactionOpen] = useState(false);
  const [isBlockOpen, setIsBlockOpen] = useState(false);
  const [isReplayOpen, setIsReplayOpen] = useState(false);
  const [transactionData, setTransactionData] = useState<any | null>(null);
  const [blockData, setBlockData] = useState<any | null>(null);
  const [statsData, setStatsData] = useState<any>();
    
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
      <HelpView />
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
        buttons={[]}
        onClose={closeStatsModal}
      />
      <DialogBoxModal
        isOpen={isHelpOpen}
        title="Help"
        body={renderHelpContent()}
        buttons={[]}
        onClose = {closeHelpModal}
      />
      <DialogBoxModal
        isOpen={isTransactionOpen}
        title="Transaction Details"
        body={transactionData ? renderTransactionContent(transactionData) : <div>Loading...</div>}
        buttons={[]}
        onClose={closeTransactionModal}
      />
      <DialogBoxModal
        isOpen={isBlockOpen}
        title="Block Details"
        body={blockData ? renderBlockContent(blockData) : <div>Loading...</div>}
        buttons={[]}
        onClose={closeBlockModal}
      />
      <DialogBoxModal
        isOpen={isReplayOpen}
        title=""
        body={renderReplayContent()}
        buttons={[]}
        onClose={closeReplayModal}
      />
    </div>
  );
}

export default App;
