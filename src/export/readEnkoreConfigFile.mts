import type {EnkoreConfig} from "@enkore/spec"
import path from "node:path"

export async function readEnkoreConfigFile(
	projectRoot: string
): Promise<EnkoreConfig> {
	//
	// Appending '#' as a temporary workaround for issue #17114
	//
	const tmp = await import(
		path.join(projectRoot, "enkore.config.mts#")
	)

	if ("default" in tmp) {
		console.warn(
			`using the default export to define the enkore config is deprecated.\n` +
			`please use the named export "config" instead.`
		)

		return tmp.default as EnkoreConfig
	}

	if (!("config" in tmp)) {
		throw new Error(
			`enkore.config.mts must export symbol "config".`
		)
	}

	return tmp.config as EnkoreConfig
}
