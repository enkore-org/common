export function fileNameIndicatesPreprocessable(
	fileName: string
) : boolean {
	const extensions = [
		".mts",
		".ts",
		".cts",
		".mjs",
		".js",
		".cjs",
		".html",
		".htm",
		".php",
		".css",
		".styl",
		".c",
		".cpp",
		".h",
		".hpp",
		".txt",
		".svg",
		".vue",
		".json",
		".yaml",
		".md"
	]

	for (const extension of extensions) {
		if (fileName.endsWith(extension)) {
			return true
		}
	}

	return false
}
