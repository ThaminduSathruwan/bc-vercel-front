import React from "react";
import { render } from "@testing-library/react";
import StatsView from "../components/StatsView";

describe("StatsView", () => {
	const statsData = {
		transaction_count: 10,
		block_count: 20,
		total_tx_amount: 1000,
		total_tx_fee: 50,
		txn_pool: 5,
		miners: [
			["Miner 1", "100"],
			["Miner 2", "200"],
		],
	};
});

// 	test("renders with provided stats data", () => {
// 		// const { getByText } = render(<StatsView StatsData={statsData} />);

// 		expect(
// 			getByText("Transaction Count (Last 1 Hour)")
// 		).toBeInTheDocument();
// 		expect(getByText("10")).toBeInTheDocument();

// 		expect(getByText("Block Count (Last 1 Hour)")).toBeInTheDocument();
// 		expect(getByText("20")).toBeInTheDocument();

// 		expect(
// 			getByText("Total Transaction Amount (Last 1 Hour)")
// 		).toBeInTheDocument();
// 		expect(getByText("1000")).toBeInTheDocument();

// 		expect(
// 			getByText("Total Transaction Fee (Last 1 Hour)")
// 		).toBeInTheDocument();
// 		expect(getByText("50")).toBeInTheDocument();

// 		expect(getByText("Transaction Pool")).toBeInTheDocument();
// 		expect(getByText("5")).toBeInTheDocument();
// 		expect(getByText("Top Miners (Last 1000 Blocks)")).toBeInTheDocument();
// 	});
// });
