import ApiService from "./ApiService";

const savedTransactions: any[] = [];

export const Service = {
    // get stream data
    // getStreamData: (start_time: string, end_time: string) => ApiService.get(`/stream/${ start_time }/${ end_time }`),
    // getStreamData: async (start_time: string, end_time: string) => {
    //     try {
    //         const response = await ApiService.post('/stream/', { start_time, end_time });
    //         return response.data;
    //     } catch (error) {
    //         console.error(error);
    //     }
    // },

    // get transaction data using txn_hash API call
    // getTransactionData: (txn_hash: string) => ApiService.get(`/transaction/${ txn_hash }`),
    // export const getTransactionData = (txn_hash: string) => ApiService.post('/transaction/', { txn_hash });
    

    //get stats data
    // getStatsData: (start_time: string) => ApiService.get('stats/', { start_time } as CustomAxiosRequestConfig),
    // export const getStatsData = () => ApiService.post('/stats/');

    // getStreamData: async (start_time: string, end_time: string): Promise<any[]> => {
    //     // console.log('start_time', start_time);
    //     // console.log('end_time', end_time);
    //     return new Promise((resolve) => {
    //         setTimeout(() => {
    //             resolve(Service.generateTransactions());
    //         }, 1000);
    //     });
    // },
    
    // getStreamData: (start_time: string, end_time: string): Promise<any[]> => {
    //     return new Promise((resolve) => {
    //         setTimeout(() => {
    //             resolve(Service.generateTransactions());
    //         }, 1000);
    //     });
    // },
    
    // get block data using block_hash API call
    getBlockData: async (block_hash: string): Promise<any> => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    block_hash: block_hash,
                    previous_block_hash: (Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)),
                    total_amount: Math.floor(Math.random() * 1000) + 1,
                    total_fee: Math.floor(Math.random() * 100000) + 1,
                    txn_cnt: Math.floor(Math.random() * 100000) + 1,
                    time_stamp: new Date().toISOString(),
                    miner: (Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)),
                    nonce: Math.floor(Math.random() * 100000) + 1,
                    difficulty: Math.floor(Math.random() * 100000) + 1,
                    height: Math.floor(Math.random() * 100000) + 1,
                    transactions: Array.from({ length: 50 }, () => (Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15))),
                    uncles: Array.from({ length: 5 }, () => (Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15))),
                    sidecar: Array.from({ length: 5 }, () => ({
                        id: (Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)),
                        size: Math.floor(Math.random() * 100000) + 1
                    }))
                });
            }, 1000);
        });
    },
    
    // generate random transaction
    generateRandomTransaction: (): any => {
        return {
            txn_hash: (Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)),
            status: Date.now().toString(),
            amount: Math.floor(Math.random() * 10) + 5,
            type: Math.floor(Math.random() * 4),
            fee: Math.floor(Math.random() * 100) + 1
        };
    },
    
    // generate random block
    generateRandomBlock: (): any => {
        return {
            block_hash: (Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)),
            previous_block_hash: (Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)),
            //get random Transaction hashes from savedTransactions
            txn_hashes: savedTransactions.splice(Math.floor(Math.random() * savedTransactions.length), Math.floor(Math.random() * savedTransactions.length)),
            total_amount: Math.floor(Math.random() * 1000) + 1,
            total_fee: Math.floor(Math.random() * 100000) + 1,
            txn_cnt: Math.floor(Math.random() * 100000) + 1,
            time_stamp: new Date().toISOString()
        };
    },
    
    // get 100 transactions and 1 block
    getStreamData: async (start_time: string, end_time: string): Promise<any> => {
        return new Promise((resolve) => {
            setTimeout(() => {
                const randomTransactions = Array.from({ length: 200 }, () => Service.generateRandomTransaction());
                const randomBlocks = Array.from({ length: 1 }, () => Service.generateRandomBlock());
                savedTransactions.push(...randomTransactions.map((txn: any) => txn.txn_hash));
                resolve({
                    transactions: randomTransactions,
                    blocks: randomBlocks
                });
            }, 1000);
        });
    },
    
    // get 10 initial blocks
    getInitialBlocks: async (): Promise<any[]> => {
        console.log('getInitialBlocks');
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(Array.from({ length: 10 }, () => Service.generateRandomBlock()));
            }, 1000);
        });
    },
    
    // get transaction data using txn_hash API call
    getTransactionData: async (txn_hash: string): Promise<any> => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    txn_hash: txn_hash,
                    status: Date.now().toString(),
                    amount: Math.floor(Math.random() * 10) + 5,
                    type: Math.floor(Math.random() * 4),
                    nonce: Math.floor(Math.random() * 100000) + 1,
                    fee: Math.floor(Math.random() * 100) + 1,
                    senders: Array.from({ length: 4 }, () => ({
                        sender_key: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
                        amount: 6
                    })),
                    receivers: Array.from({ length: 8 }, () => ({
                        receiver_key: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
                        amount: 3
                    }))
                });
            }, 1000);
        });
    },
    
    // get stats data
    getStatsData: async (start_time: String): Promise<any> => {
        console.log('getStatsData');
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    transaction_count:  Math.floor(Math.random() * 100) + 10,
                    block_count: Math.floor(Math.random() * 100) + 1,
                    total_tx_amount:  Math.floor(Math.random() * 100) + 100,
                    miners: Array.from({ length: 5 }, (_, index) => ({
                        miner: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
                        miner_count: Math.floor(Math.random() * 100) + 1
                    }))
                });
            }, 1000);
        });
    }
    
}

export default Service;