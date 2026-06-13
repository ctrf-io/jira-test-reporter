import { postFlakyTestsToJira, postResultsToJira } from "./jira-reporter";
import type { Options } from "./types/reporter";

const sendTestResultsToJira = postResultsToJira;
const sendFlakyResultsToJira = postFlakyTestsToJira;

export {
	postFlakyTestsToJira,
	postResultsToJira,
	sendFlakyResultsToJira,
	sendTestResultsToJira,
	type Options,
};
