import { render, screen } from "@testing-library/react";
import Card from "../components/Card";

describe("Card Component", () => {
	it("renders with dummy props", () => {
		const dummyProps = {
			title: "Dummy Title",
			content: {
				block_hash: "dummy_block_hash",
				total_amount: 100,
				total_fee: 10,
				txn_cnt: 5,
			},
			setBlockData: jest.fn(),
		};

		const { getByText } = render(<Card {...dummyProps} />);
		expect(getByText("BLOCK : Dummy Title")).toBeInTheDocument();
		expect(getByText("100")).toBeInTheDocument();
		expect(getByText("5")).toBeInTheDocument();
		expect(getByText("10")).toBeInTheDocument();
	});
});
