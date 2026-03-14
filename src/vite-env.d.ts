/// <reference types="vite/client" />

declare module "gsap-trial/SplitText" {
	export class SplitText {
		words: any[];
		chars: any[];
		lines: any[];
		constructor(target: string | Element, vars?: Record<string, unknown>);
		revert(): void;
	}
}
