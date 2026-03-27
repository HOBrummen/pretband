export const SaveFlash = ({ visible }: { visible: boolean }) => (
	<span
		className={`text-pret-yellow text-sm font-bold transition-opacity duration-300 ${visible ? "opacity-100 animate-pulse" : "opacity-0"}`}
	>
		✓ Opgeslagen
	</span>
);
