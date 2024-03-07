// store transactions in array
const transactions_demo: any[] = [];

export const Service = {

    // get stream data
    // getStreamData: (start_time: string, end_time: string) => ApiService.get(`/stream/${ start_time }/${ end_time }`),
    // export const getStreamData = (start_time: string, end_time: string) => ApiService.post('/stream/', { start_time, end_time });

    // get transaction data using txn_hash API call
    // getTransactionData: (txn_hash: string) => ApiService.get(`/transaction/${ txn_hash }`),
    // export const getTransactionData = (txn_hash: string) => ApiService.post('/transaction/', { txn_hash });
    

    //get stats data
    // getStatsData: () => ApiService.get('/stats/'),
    // export const getStatsData = () => ApiService.post('/stats/');

    getStreamData: async (start_time: string, end_time: string): Promise<any[]> => {
        // console.log('start_time', start_time);
        // console.log('end_time', end_time);
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(Service.generateTransactions());
            }, 1000);
        });
    },
    
    getTransactionData: async (txn_hash: string): Promise<any> => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(transactions_demo.find(txn => txn.txn_id === txn_hash));
            }, 1000);
        });
    },
    
    //generate 500 random transactions using timestamp as seed loop
    generateTransactions: (): any[] => {
        const transactions: any[] = [];
        for (let i = 0; i < 100; i++) {
            const txn_id = Date.now().toString()
            const txn_size = Math.floor(Math.random() * 10) + 5
            const txn_type = Math.random() > 0.5 ? "send" : "receive"
            transactions.push({ txn_id, txn_size, txn_type });
            transactions_demo.push({ txn_id, txn_size, txn_type });
        }
        return transactions;
    }
    
}

export default Service;