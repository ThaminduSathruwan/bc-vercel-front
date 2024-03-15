import React from 'react';
import './Carousel.css'; 
import Service from '../services/Service';

interface CardProps {
    title: string;
    content: Block;
    setBlockData: (blockData: any) => void;
}

interface Block {
    block_hash: string;
    height: number;
    nonce: number;
    difficulty: number;
    timestamp: string;
}

const Card: React.FC<CardProps> = ({ title, content, setBlockData }) => {
    
    const handleViewBlock = (blockId: string) => {
        const fetchBlockData = async () => {
            try {
                const blockData: any = await Service.getBlockData(blockId);
                setBlockData(blockData);
            } catch (error) {
                console.error(error);
            }
        };
        
        fetchBlockData();
    }
    
    return (
        <div className="card bg-gray-800 text-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-2">{title}</h2>
            <div className="block-card bg-gray-700 rounded-lg p-4 mb-4 text-center">
                <p className="font-semibold text-gray-300">Height:</p>
                <p className="text-green-400">{content.height}</p>
                <p className="font-semibold text-gray-300">Nonce:</p>
                <p className="text-green-400">{content.nonce}</p>
                <p className="font-semibold text-gray-300">Difficulty:</p>
                <p className="text-green-400">{content.difficulty}</p>
                <p className="font-semibold text-gray-300">Timestamp:</p>
                <p className="text-green-400">{content.timestamp}</p>
            </div>
            <div className='text-center'>
                <button onClick={() => handleViewBlock(content.block_hash)}><span className="font-bold">View More</span></button>
            </div>
        </div>
    );
};

export default Card;
