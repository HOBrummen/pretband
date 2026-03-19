/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	safelist: ["animate-lamp-flicker"],
	theme: {
		extend: {
			colors: {
				"pret-red": "#E53433",
				"pret-yellow": "#EBB64D",
				"pret-dark": "#2A2324",
				"pret-white": "#FFFFFF",
			},
			borderRadius: {
				"4xl": "2rem",
				"5xl": "3rem",
			},
			fontFamily: {
				display: ["Bevellier", "sans-serif"],
				body: ["Fredoka", "sans-serif"],
			},
			animation: {
				"bounce-slow": "bounce 3s infinite",
				"pulse-fast": "pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite",
				"pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
				wiggle: "wiggle 1s ease-in-out infinite",
				// Like a dying lamp: long calm periods with irregular flickers + brief "off" moments.
				"lamp-flicker": "lampFlicker 2s infinite ease-in-out",
				float: "float 6s ease-in-out infinite",
				tilt: "tilt 10s infinite linear",
			},
			keyframes: {
				wiggle: {
					"0%, 100%": {
						transform: "rotate(-3deg)",
					},
					"50%": {
						transform: "rotate(3deg)",
					},
				},
				float: {
					"0%, 100%": {
						transform: "translateY(0px)",
					},
					"50%": {
						transform: "translateY(-20px)",
					},
				},
				tilt: {
					"0%, 50%, 100%": {
						transform: "rotate(0deg)",
					},
					"25%": {
						transform: "rotate(1deg)",
					},
					"75%": {
						transform: "rotate(-1deg)",
					},
				},
				lampFlicker: {
					"0%, 58%": {
						opacity: "1",
					},
					"59%": { opacity: "0.55" },
					"60%": {
						opacity: "1",
					},
					"61%": { opacity: "0.12" },
					"62%": {
						opacity: "1",
					},
					"64%": { opacity: "0.02" },
					"66%": {
						opacity: "1",
					},
					"72%": { opacity: "0.35" },
					"74%": {
						opacity: "1",
					},
					"78%": { opacity: "0.06" },
					"80%": {
						opacity: "1",
					},
					"86%": { opacity: "0.25" },
					"88%, 100%": {
						opacity: "1",
					},
				},
			},
		},
	},
	plugins: [],
};
