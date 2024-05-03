import { render } from "@testing-library/react";
import Transaction from "../components/Transaction";

describe("Transaction Component", () => {
	test("renders without crashing", () => {
		const mockTransaction = [
			{
				txn_hash: "hash1",
				status: "Success",
				amount: 100,
				type: 1,
				fee: 5,
			},
			{
				txn_hash: "hash2",
				status: "Pending",
				amount: 50,
				type: 0,
				fee: 2,
			},
		];

		const addTransactionToPool = jest.fn();

		const { container } = render(
			<Transaction
				transaction={mockTransaction}
				addTransactionToPool={addTransactionToPool}
			/>
		);

		const svgElement = container.querySelector("svg");
		expect(svgElement).toBeInTheDocument();

		const transactionCircles = container.querySelectorAll("circle");
		expect(transactionCircles.length).toBe(mockTransaction.length);

		// jest.advanceTimersByTime(50;
		// expect(addTransactionToPool).toHaveBeenCalledTimes(2);
	});
});
