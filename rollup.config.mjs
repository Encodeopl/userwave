import commonjs from "@rollup/plugin-commonjs";
import packageJson from "./package.json" assert { type: "json" };
import resolve from "@rollup/plugin-node-resolve";
import typescript from "rollup-plugin-typescript2";
import dts from "rollup-plugin-dts";
export default [
  {
    input: "src/index.ts",
    output: [
      {
        file: packageJson.main,
        format: "cjs",
        sourcemap: true,
      },
      {
        file: packageJson.module,
        format: "esm",
        sourcemap: true,
      },
    ],
    plugins: [
      resolve(),
      commonjs(),
      typescript({
        tsconfig: "./tsconfig.json",
        exclude: ["**/*.test.ts", "**/*.test.tsx"],
      }),
    ],
  },
  {
    input: "dist/esm/index.d.ts",
    output: [
      {
        file: packageJson.types,
        format: "esm",
      },
    ],
    plugins: [dts()],
    external: [/\.css$/],
  },
];
