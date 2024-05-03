import { render, fireEvent } from "@testing-library/react";
import TxnView from "../components/TxnView";

describe("TxnView", () => {
	const mockTxn = {
		txn_hash: "0x1234567890abcdef",
		status: "Confirmed",
		amount: 100,
		type: 1,
		nonce: 123,
		fee: 0.01,
		senders: [
			{ sender_key: "Sender1", amount: 50 },
			{ sender_key: "Sender2", amount: 50 },
		],
		receivers: [
			{ receiver_key: "Receiver1", amount: 50 },
			{ receiver_key: "Receiver2", amount: 50 },
		],
	};

	test("renders transaction hash correctly", () => {
		const { getByText } = render(<TxnView txn={mockTxn} />);
		const txnHashElement = getByText(
			`Transaction Hash : ${mockTxn.txn_hash}`
		);
		expect(txnHashElement).toBeInTheDocument();
	});

	test('clicking "View on Etherscan" button opens correct URL', () => {
		const { getByText } = render(<TxnView txn={mockTxn} />);
		const etherscanButton = getByText("View on Etherscan");
		const expectedUrl = `https://etherscan.io/tx/${mockTxn.txn_hash}`;
		const originalOpen = window.open;
		window.open = jest.fn();
		fireEvent.click(etherscanButton);
		expect(window.open).toHaveBeenCalledWith(expectedUrl, "_blank");
		window.open = originalOpen;
	});
});
