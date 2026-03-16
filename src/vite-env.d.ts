/// <reference types="vite/client" />

declare module "gsap-trial/SplitText" {
	export class SplitText {
		words: Element[];
		chars: Element[];
		lines: Element[];
		constructor(target: string | Element, vars?: Record<string, unknown>);
		revert(): void;
	}
}
