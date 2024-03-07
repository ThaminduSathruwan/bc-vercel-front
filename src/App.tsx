import React, { useState } from 'react';
import './App.css';
import { StackedCarousel, ResponsiveContainer } from 'react-stacked-center-carousel';
import Navbar from './components/Navbar';
import TransactionStream from './components/TransactionStream';
import DialogBoxModal from './components/DialogBoxModal';

const data = [
    {
        image: "https://picsum.photos/200/300/?random=1",
        text: "hello"
    },
    {
        image: "https://picsum.photos/200/300/?random=12",
        text: "lel"
    },
    {
        image: "https://picsum.photos/200/300/?random=13",
        text: "kak"
    },
    {
        image: "https://picsum.photos/200/300/?random=15",
        text: "kk"
    },
    {
        image: "https://picsum.photos/200/300/?random=10",
        text: "hello"
    }
];

interface TransactionData {
  txn_id: string;
  txn_size: number;
  txn_type: string;
}

function App() {
  const [isStatsOpen, setIsStatsOpen] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [isTransactionOpen, setIsTransactionOpen] = useState(false);
  const [transactionData, setTransactionData] = useState<TransactionData | null>(null);
  
  const openStatsModal = () => {
    setIsStatsOpen(true);
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
    console.log(txnData);
    setTransactionData(txnData);
    openTransactionModal();
  }
  
  const ref = React.useRef<StackedCarousel>(null);
  
  return (
    <div className="App bg-black text-white w-screen h-screen"> {/* Use overflow-hidden to prevent scrolling */}
      <Navbar openStatsModal={openStatsModal} openHelpModal={openHelpModal} />
      <TransactionStream setTransactionData={handleSetTransactionData}/>
      {/* Dialog Boxes */}
      <DialogBoxModal
        isOpen={isStatsOpen}
        title="Stats"
        body={<div>Stats content goes here.</div>}
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
