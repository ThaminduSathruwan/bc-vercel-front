import { render, fireEvent, waitFor } from "@testing-library/react";
import Replay from "../components/Replay";
import Service from "../services/Service"; // Import Service for mocking

// Mock Service module
jest.mock("../services/Service", () => ({
	getStreamData: jest.fn(),
}));

describe("Replay", () => {
	beforeEach(() => {
		jest.clearAllMocks(); // Clear mock calls before each test
	});

	test("renders the Replay component correctly", () => {
		const { getByText, getByLabelText } = render(<Replay />);
		// Write assertions to verify that necessary elements are present
		expect(getByText("Start Time:")).toBeInTheDocument();
		expect(getByLabelText("Start Time:")).toBeInTheDocument();
		expect(getByText("Replay")).toBeInTheDocument();
	});

	// test("fetches stream data and updates state when replayTransactions function is called", async () => {
	// 	const mockedGetStreamData =
	// 		Service.getStreamData as jest.MockedFunction<
	// 			typeof Service.getStreamData
	// 		>;
	// 	mockedGetStreamData.mockResolvedValueOnce({
	// 		transactions: [{ txnId: "1", data: "transaction1" }],
	// 		blocks: [{ blockId: "1", data: "block1" }],
	// 	});

	// 	const { getByLabelText, getByText } = render(<Replay />);
	// 	const startTimeInput = getByLabelText(
	// 		"Start Time:"
	// 	) as HTMLInputElement;
	// 	fireEvent.change(startTimeInput, {
	// 		target: { value: "2024-03-21T12:00" },
	// 	});

	// 	const replayButton = getByText("Replay");
	// 	fireEvent.click(replayButton);

	// 	await waitFor(() => {
	// 		expect(mockedGetStreamData).toHaveBeenCalledTimes(1);
	// 		expect(mockedGetStreamData).toHaveBeenCalledWith(
	// 			"2024-03-21T12:00:00.000Z",
	// 			expect.any(String)
	// 		);
	// 	});
	// });
});
