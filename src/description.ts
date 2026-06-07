import type { CTRFReport } from "ctrf";
import type { AdfDocument } from "./client";
import type { Options, TableHeader } from "./types/reporter";

const baseTable = {
	type: "table",
	attrs: {
		isNumberColumnEnabled: false,
		layout: "default",
		localId: "79158a8a-8c3c-4b2c-915d-f3423772f4be",
		width: 760,
	},
	content: [
		{
			type: "tableRow",
			content: [
				{
					type: "tableHeader",
					attrs: {},
					content: [
						{
							type: "paragraph",
							content: [
								{
									type: "text",
									text: "Tests ",
									marks: [
										{
											type: "strong",
										},
									],
								},
								{
									type: "emoji",
									attrs: {
										shortName: ":test_tube:",
										id: "1f9ea",
									},
								},
								{
									type: "text",
									text: " ",
								},
							],
						},
					],
				},
				{
					type: "tableHeader",
					attrs: {},
					content: [
						{
							type: "paragraph",
							content: [
								{
									type: "text",
									text: "Passed ",
									marks: [
										{
											type: "strong",
										},
									],
								},
								{
									type: "emoji",
									attrs: {
										shortName: ":check_mark:",
										id: "atlassian-check_mark",
										text: ":check_mark:",
									},
								},
								{
									type: "text",
									text: " ",
								},
							],
						},
					],
				},
				{
					type: "tableHeader",
					attrs: {},
					content: [
						{
							type: "paragraph",
							content: [
								{
									type: "text",
									text: "Failed ",
									marks: [
										{
											type: "strong",
										},
									],
								},
								{
									type: "emoji",
									attrs: {
										shortName: ":cross_mark:",
										id: "atlassian-cross_mark",
										text: ":cross_mark:",
									},
								},
								{
									type: "text",
									text: " ",
								},
							],
						},
					],
				},
				{
					type: "tableHeader",
					attrs: {},
					content: [
						{
							type: "paragraph",
							content: [
								{
									type: "text",
									text: "Skip ",
									marks: [
										{
											type: "strong",
										},
									],
								},
								{
									type: "emoji",
									attrs: {
										shortName: ":fast_forward:",
										id: "23e9",
									},
								},
								{
									type: "text",
									text: " ",
								},
							],
						},
					],
				},
				{
					type: "tableHeader",
					attrs: {},
					content: [
						{
							type: "paragraph",
							content: [
								{
									type: "text",
									text: "Pending ",
									marks: [
										{
											type: "strong",
										},
									],
								},
								{
									type: "emoji",
									attrs: {
										shortName: ":hourglass_flowing_sand:",
										id: "23f3",
									},
								},
								{
									type: "text",
									text: " ",
								},
							],
						},
					],
				},
				{
					type: "tableHeader",
					attrs: {},
					content: [
						{
							type: "paragraph",
							content: [
								{
									type: "text",
									text: "Other",
									marks: [
										{
											type: "strong",
										},
									],
								},
								{
									type: "emoji",
									attrs: {
										shortName: ":question:",
										id: "2753",
									},
								},
								{
									type: "text",
									text: " ",
								},
							],
						},
					],
				},
				{
					type: "tableHeader",
					attrs: {},
					content: [
						{
							type: "paragraph",
							content: [
								{
									type: "text",
									text: "Flaky ",
									marks: [
										{
											type: "strong",
										},
									],
								},
								{
									type: "emoji",
									attrs: {
										shortName: ":fallen_leaf:",
										id: "1f342",
									},
								},
								{
									type: "text",
									text: " ",
								},
							],
						},
					],
				},
				{
					type: "tableHeader",
					attrs: {},
					content: [
						{
							type: "paragraph",
							content: [
								{
									type: "text",
									text: "Duration ",
									marks: [
										{
											type: "strong",
										},
									],
								},
								{
									type: "emoji",
									attrs: {
										shortName: ":timer:",
										id: "23f2",
									},
								},
								{
									type: "text",
									text: " ",
								},
							],
						},
					],
				},
			],
		},
	],
};

/**
 * Creates a text node with the given text
 */
const createTextNode = (text: string) => ({
	type: "text",
	text,
});

/**
 * Creates a paragraph node with the given content
 */
const createParagraphNode = (content: any[]) => ({
	type: "paragraph",
	content,
});

/**
 * Creates a table cell with the given text
 */
const createTableCell = (text: string) => ({
	type: "tableCell",
	attrs: {},
	content: [
		{
			type: "paragraph",
			content: [
				{
					type: "text",
					text,
				},
			],
		},
	],
});

/**
 * Creates a heading node with the given text and level
 */
const createHeadingNode = (text: string, level: number) => ({
	type: "heading",
	attrs: { level },
	content: [{ type: "text", text }],
});

/**
 * Creates a bullet list item with the given text
 */
const createBulletListItem = (text: string) => ({
	type: "listItem",
	content: [
		{
			type: "paragraph",
			content: [
				{
					type: "text",
					text,
				},
			],
		},
	],
});

/**
 * Creates a bullet list with the given items
 */
const createBulletList = (items: any[]) => ({
	type: "bulletList",
	content: items,
});

/**
 * Creates a code block with the given text and language
 */
const createCodeBlock = (text: string, language: string = "text") => ({
	type: "codeBlock",
	attrs: { language },
	content: [
		{
			type: "text",
			text,
		},
	],
});

/**
 * Creates a collapsible expand node with the given title and block content
 */
const createExpand = (title: string, content: any[]) => ({
	type: "expand",
	attrs: { title },
	content,
});

/**
 * Creates a panel (callout box) with the given panelType and block content.
 * Valid panelTypes: 'info' | 'note' | 'warning' | 'success' | 'error'
 */
const createPanel = (panelType: string, content: any[]) => ({
	type: "panel",
	attrs: { panelType },
	content,
});

/**
 * Creates a horizontal rule (section divider)
 */
const createRule = () => ({ type: "rule" });

/**
 * Configuration for each table header
 */
const TABLE_HEADER_CONFIG: Record<
	TableHeader,
	{
		header: any;
		getCellValue: (ctrf: CTRFReport) => string;
	}
> = {
	tests: {
		header: {
			type: "tableHeader",
			attrs: {},
			content: [
				{
					type: "paragraph",
					content: [
						{
							type: "text",
							text: "Tests ",
							marks: [{ type: "strong" }],
						},
						{
							type: "emoji",
							attrs: { shortName: ":test_tube:", id: "1f9ea" },
						},
						{ type: "text", text: " " },
					],
				},
			],
		},
		getCellValue: (ctrf) => ctrf.results.summary.tests.toString(),
	},
	passed: {
		header: {
			type: "tableHeader",
			attrs: {},
			content: [
				{
					type: "paragraph",
					content: [
						{
							type: "text",
							text: "Passed ",
							marks: [{ type: "strong" }],
						},
						{
							type: "emoji",
							attrs: {
								shortName: ":check_mark:",
								id: "atlassian-check_mark",
								text: ":check_mark:",
							},
						},
						{ type: "text", text: " " },
					],
				},
			],
		},
		getCellValue: (ctrf) => ctrf.results.summary.passed.toString(),
	},
	failed: {
		header: {
			type: "tableHeader",
			attrs: {},
			content: [
				{
					type: "paragraph",
					content: [
						{
							type: "text",
							text: "Failed ",
							marks: [{ type: "strong" }],
						},
						{
							type: "emoji",
							attrs: {
								shortName: ":cross_mark:",
								id: "atlassian-cross_mark",
								text: ":cross_mark:",
							},
						},
						{ type: "text", text: " " },
					],
				},
			],
		},
		getCellValue: (ctrf) => ctrf.results.summary.failed.toString(),
	},
	skipped: {
		header: {
			type: "tableHeader",
			attrs: {},
			content: [
				{
					type: "paragraph",
					content: [
						{
							type: "text",
							text: "Skip ",
							marks: [{ type: "strong" }],
						},
						{
							type: "emoji",
							attrs: { shortName: ":fast_forward:", id: "23e9" },
						},
						{ type: "text", text: " " },
					],
				},
			],
		},
		getCellValue: (ctrf) => ctrf.results.summary.skipped.toString(),
	},
	pending: {
		header: {
			type: "tableHeader",
			attrs: {},
			content: [
				{
					type: "paragraph",
					content: [
						{
							type: "text",
							text: "Pending ",
							marks: [{ type: "strong" }],
						},
						{
							type: "emoji",
							attrs: { shortName: ":hourglass_flowing_sand:", id: "23f3" },
						},
						{ type: "text", text: " " },
					],
				},
			],
		},
		getCellValue: (ctrf) => ctrf.results.summary.pending.toString(),
	},
	other: {
		header: {
			type: "tableHeader",
			attrs: {},
			content: [
				{
					type: "paragraph",
					content: [
						{
							type: "text",
							text: "Other",
							marks: [{ type: "strong" }],
						},
						{
							type: "emoji",
							attrs: { shortName: ":question:", id: "2753" },
						},
						{ type: "text", text: " " },
					],
				},
			],
		},
		getCellValue: (ctrf) => ctrf.results.summary.other.toString(),
	},
	flaky: {
		header: {
			type: "tableHeader",
			attrs: {},
			content: [
				{
					type: "paragraph",
					content: [
						{
							type: "text",
							text: "Flaky ",
							marks: [{ type: "strong" }],
						},
						{
							type: "emoji",
							attrs: { shortName: ":fallen_leaf:", id: "1f342" },
						},
						{ type: "text", text: " " },
					],
				},
			],
		},
		getCellValue: (ctrf) =>
			ctrf.results.tests.filter((test) => test.flaky).length.toString(),
	},
	duration: {
		header: {
			type: "tableHeader",
			attrs: {},
			content: [
				{
					type: "paragraph",
					content: [
						{
							type: "text",
							text: "Duration ",
							marks: [{ type: "strong" }],
						},
						{
							type: "emoji",
							attrs: { shortName: ":timer:", id: "23f2" },
						},
						{ type: "text", text: " " },
					],
				},
			],
		},
		getCellValue: (ctrf) =>
			`${Math.round((ctrf.results.summary.stop - ctrf.results.summary.start) / 1000)}s`,
	},
};

const DEFAULT_TABLE_HEADERS: TableHeader[] = [
	"tests",
	"passed",
	"failed",
	"skipped",
	"pending",
	"other",
	"flaky",
	"duration",
];

export const buildDescription = (
	ctrf: CTRFReport,
	options?: Options,
): AdfDocument => {
	const { results } = ctrf;
	const { summary, environment } = results;
	const title = options?.title || "Test Results Summary";
	const prefix = options?.prefix || "";
	const suffix = options?.suffix || "";
	const isFlaky = title.includes("Flaky Tests Detected");

	const headersToShow = options?.tableHeaders || DEFAULT_TABLE_HEADERS;

	// Build header row
	const headerRow = {
		type: "tableRow",
		content: headersToShow.map(
			(headerName) => TABLE_HEADER_CONFIG[headerName].header,
		),
	};

	// Build data row
	const dataRow = {
		type: "tableRow",
		content: headersToShow.map((headerName) =>
			createTableCell(TABLE_HEADER_CONFIG[headerName].getCellValue(ctrf)),
		),
	};

	// Build the table
	const table = {
		type: "table",
		attrs: {
			isNumberColumnEnabled: false,
			layout: "default",
			localId: "79158a8a-8c3c-4b2c-915d-f3423772f4be",
			width: 760,
		},
		content: [headerRow, dataRow],
	};

	const content = [];

	if (prefix) {
		content.push(createParagraphNode([createTextNode(prefix)]));
	}

	content.push(createHeadingNode(title, 2));

	content.push(table);

	// Check for missing environment properties
	const missingEnvProperties = [];
	if (!environment?.buildName && !environment?.buildNumber) {
		missingEnvProperties.push("buildName/buildNumber");
	}
	if (!environment?.buildUrl) {
		missingEnvProperties.push("buildUrl");
	}

	// Add build information as heading 3 with only the build name/number as a link
	if (
		environment &&
		(environment.buildName || environment.buildNumber) &&
		environment.buildUrl
	) {
		// Build a label from whichever parts are present, avoiding "undefined" strings
		const buildLabel = [
			environment.buildName,
			environment.buildNumber ? `#${environment.buildNumber}` : undefined,
		]
			.filter(Boolean)
			.join(" ");

		content.push({
			type: "heading",
			attrs: { level: 3 },
			content: [
				{ type: "text", text: "Build: " },
				{
					type: "text",
					text: buildLabel,
					marks: [
						{
							type: "link",
							attrs: {
								href: environment.buildUrl,
							},
						},
					],
				},
			],
		});
	} else if (missingEnvProperties.length > 0) {
		content.push(
			createParagraphNode([
				{
					type: "emoji",
					attrs: {
						shortName: ":warning:",
						id: "26a0",
					},
				},
				{
					type: "text",
					text: ` Missing environment properties: ${missingEnvProperties.join(", ")}. Add these to your CTRF report for a better experience.`,
				},
			]),
		);
	}

	if (!isFlaky && summary.failed > 0) {
		content.push(createRule());
		content.push(createHeadingNode("Failed Tests", 3));

		const failedTests = results.tests.filter(
			(test) => test.status === "failed",
		);
		failedTests.forEach((test, index) => {
			const rawSuite = (test as any).suite;
			const suite: string | undefined = Array.isArray(rawSuite)
				? (rawSuite as string[]).join(" > ")
				: (rawSuite as string | undefined);

			// Test name (with suite) as a sub-heading
			content.push(
				createHeadingNode(suite ? `${test.name} (${suite})` : test.name, 4),
			);

			// Failure message — rendered as an error panel for immediate visibility
			if (test.message) {
				content.push(
					createPanel("error", [
						createParagraphNode([createTextNode(test.message)]),
					]),
				);
			}

			// Stack trace — rendered inside a collapsible expand
			if (test.trace) {
				content.push(
					createExpand("Stack Trace", [createCodeBlock(test.trace)]),
				);
			}

			// AI analysis — added by ai-ctrf, not part of the standard CTRF schema.
			// We access it via a type assertion so the standard CtrfTest type is unchanged.
			// The ai field is a plain string produced by ai-ctrf.
			const ai = (test as any).ai as string | undefined;
			if (ai) {
				content.push(
					createExpand("AI Analysis", [
						createParagraphNode([createTextNode(ai)]),
					]),
				);
			}

			// Divider between tests (not after the last one)
			if (index < failedTests.length - 1) {
				content.push(createRule());
			}
		});
	}

	const flakyTests = results.tests.filter((test) => test.flaky);
	if (flakyTests.length > 0) {
		content.push(createRule());
		content.push(createHeadingNode("Flaky Tests", 3));

		const flakyItems = flakyTests.map((test) => {
			const rawSuite = (test as any).suite;
			const suite: string | undefined = Array.isArray(rawSuite)
				? (rawSuite as string[]).join(" > ")
				: (rawSuite as string | undefined);
			return createBulletListItem(
				`${test.name}${suite ? ` (${suite})` : ""} — ${test.retries ?? 0} retries`,
			);
		});

		content.push(createBulletList(flakyItems));
	}

	// Overall AI summary — added by ai-ctrf in results.extra.ai
	const overallAi = (results as any).extra?.ai as string | undefined;
	if (overallAi) {
		content.push(createRule());
		content.push(createHeadingNode("AI Summary", 3));
		content.push(createParagraphNode([createTextNode(overallAi)]));
	}

	if (suffix) {
		content.push(createParagraphNode([createTextNode(suffix)]));
	}

	content.push(
		createParagraphNode([
			{
				type: "text",
				text: "Jira Test Reporter",
				marks: [
					{
						type: "link",
						attrs: {
							href: "https://github.com/ctrf-io/jira-test-reporter",
						},
					},
				],
			},
			{ type: "text", text: " by " },
			{
				type: "text",
				text: "CTRF",
				marks: [
					{
						type: "link",
						attrs: {
							href: "https://ctrf.io",
						},
					},
				],
			},
			{ type: "text", text: " " },
			{
				type: "emoji",
				attrs: {
					shortName: ":green_heart:",
					id: "1f49a",
				},
			},
		]),
	);

	return {
		version: 1,
		type: "doc",
		content,
	};
};

export const description = {
	version: 1,
	type: "doc",
	content: [baseTable],
};
