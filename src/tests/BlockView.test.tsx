import React from "react";
import { render, fireEvent } from "@testing-library/react";
import BlockView from "../components/BlockView";

describe("BlockView", () => {
	const mockBlock = {
		block_hash: "0x1234567890abcdef",
		previous_block_hash: "0x0987654321fedcba",
		total_amount: 100,
		total_fee: 0.01,
		txn_cnt: 5,
		time_stamp: "2022-03-21T12:34:56Z",
		miner: "MinerName",
		nonce: 123456,
		difficulty: 123456789,
		height: 1000,
		transactions: ["txn1", "txn2", "txn3"],
		uncles: ["uncle1", "uncle2"],
		sidecar: [
			{ id: "sidecar1", size: 256 },
			{ id: "sidecar2", size: 512 },
		],
	};

	const mockSetBlockData = jest.fn();
	const mockCloseBlockModal = jest.fn();

	test("renders block details correctly", () => {
		const { getByText } = render(
			<BlockView
				block={mockBlock}
				setBlockData={mockSetBlockData}
				closeBlockModal={mockCloseBlockModal}
			/>
		);
		expect(
			getByText(`Block Hash: ${mockBlock.block_hash}`)
		).toBeInTheDocument();
		expect(getByText(`Previous Block Hash`)).toBeInTheDocument();
		expect(getByText(mockBlock.previous_block_hash)).toBeInTheDocument();
	});

	test('clicking "View on Etherscan" button opens correct URL', () => {
		const { getByText } = render(
			<BlockView
				block={mockBlock}
				setBlockData={mockSetBlockData}
				closeBlockModal={mockCloseBlockModal}
			/>
		);
		const etherscanButton = getByText("View on Etherscan");
		const expectedUrl = `https://etherscan.io/block/${mockBlock.block_hash}`;

		const originalOpen = window.open;
		window.open = jest.fn();
		fireEvent.click(etherscanButton);
		expect(window.open).toHaveBeenCalledWith(expectedUrl, "_blank");
		window.open = originalOpen;
	});

	// test("clicking on a transaction opens transaction details modal", () => {
	// 	const { getByText, queryByText } = render(
	// 		<BlockView
	// 			block={mockBlock}
	// 			setBlockData={mockSetBlockData}
	// 			closeBlockModal={mockCloseBlockModal}
	// 		/>
	// 	);
	// 	const txnElement = getByText("txn1");
	// 	fireEvent.click(txnElement);
	// 	expect(queryByText("Transaction Details")).toBeInTheDocument();
	// 	expect(queryByText("Loading...")).toBeInTheDocument();
	// });
});
