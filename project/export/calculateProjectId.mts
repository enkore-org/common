import {createHash} from "node:crypto"
import type {NodePackageJSON} from "@anio-software/enkore-private.spec/primitives"

export function calculateProjectId(
	projectPackageJSON: NodePackageJSON
): string {
	return createHash("sha256").update(
		`${projectPackageJSON.name}@${projectPackageJSON.version}`
	).digest("hex")
}
