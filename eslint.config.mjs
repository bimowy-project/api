import { dirname } from "path"
import { fileURLToPath } from "url"
import { FlatCompat } from "@eslint/eslintrc"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
	baseDirectory: __dirname
})

const eslintConfig = [
	...compat.config({
		extends: ["next/core-web-vitals", "next/typescript"],
		rules: {
			"import/no-anonymous-default-export": "off",
			"react-hooks/exhaustive-deps": "off"
		}
	})
]

export default eslintConfig
