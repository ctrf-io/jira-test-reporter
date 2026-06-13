import { sendFlakyResultsToJira, sendTestResultsToJira } from "jira-ctrf";

describe("package exports", () => {
	it("supports ESM imports from the package root", () => {
		expect(typeof sendTestResultsToJira).toBe("function");
		expect(typeof sendFlakyResultsToJira).toBe("function");
	});
});
