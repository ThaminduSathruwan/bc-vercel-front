// DialogBoxModal.test.tsx

import React from "react";
import { render, fireEvent } from "@testing-library/react";
import DialogBoxModal from "../components/DialogBoxModal";

describe("DialogBoxModal", () => {
	test("renders with dummy props", () => {
		const title = "Modal Title";
		const body = <div>Modal Body</div>;
		const buttons = [
			{ text: "Button 1", onClick: jest.fn() },
			{ text: "Button 2", onClick: jest.fn() },
		];
		const onClose = jest.fn();

		const { getByText } = render(
			<DialogBoxModal
				isOpen={true}
				title={title}
				body={body}
				buttons={buttons}
				onClose={onClose}
				width="50%"
				height="50%"
			/>
		);

		expect(getByText(title)).toBeInTheDocument();
		expect(getByText("Modal Body")).toBeInTheDocument();

		buttons.forEach((button) => {
			expect(getByText(button.text)).toBeInTheDocument();
		});
	});

	test("calls onClose when close button is clicked", () => {
		const onClose = jest.fn();
		const { getByLabelText } = render(
			<DialogBoxModal
				isOpen={true}
				title="Test Title"
				body={<div>Test Body</div>}
				buttons={[{ text: "Button", onClick: jest.fn() }]}
				onClose={onClose}
			/>
		);

		fireEvent.click(getByLabelText("Close"));
		expect(onClose).toHaveBeenCalled();
	});

	test("calls onClick when button is clicked", () => {
		const onClick = jest.fn();
		const { getByText } = render(
			<DialogBoxModal
				isOpen={true}
				title="Test Title"
				body={<div>Test Body</div>}
				buttons={[{ text: "Button", onClick }]}
				onClose={jest.fn()}
			/>
		);

		fireEvent.click(getByText("Button"));
		expect(onClick).toHaveBeenCalled();
	});
});
