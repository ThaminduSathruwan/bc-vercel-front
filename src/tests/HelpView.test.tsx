import { render, fireEvent } from "@testing-library/react";
import HelpView from "../components/HelpView";

describe("HelpView", () => {
	test("GitHub link opens in new tab", () => {
		const { getByText } = render(<HelpView />);
		const githubLink = getByText("GitHub Organization: OneBCVis");
		expect(githubLink).toHaveAttribute("target", "_blank");
		expect(githubLink).toHaveAttribute("rel", "noopener noreferrer");
	});

	test("Support email link opens in email client", () => {
		const { getByText } = render(<HelpView />);
		const emailLink = getByText("onebcviz@gmail.com");
		expect(emailLink).toHaveAttribute("href", "mailto:onebcviz@gmail.com");
	});

	// Check if the url is not opening in the same tab
	test("GitHub link navigates to the correct URL", () => {
		const { getByText } = render(<HelpView />);
		const githubLink = getByText("GitHub Organization: OneBCVis");
		fireEvent.click(githubLink);
		expect(window.location.href).not.toBe("https://github.com/OneBCVis");
	});
});
