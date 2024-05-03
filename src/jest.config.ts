module.exports = {
	transformIgnorePatterns: [
		"node_modules/(?!d3|internmap|delaunator|robust-predicates)",
	],
	moduleNameMapper: {
		d3: "node_modules/d3/dist/d3.min.js",
		"^d3-(.*)$": `d3-$1/dist/d3-$1`,
	},
};
