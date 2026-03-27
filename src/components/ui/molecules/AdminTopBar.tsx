import { ArrowBigLeft, Plus, Save } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "../atoms/Button";
import { Heading } from "../atoms/Heading";
import { SaveFlash } from "../atoms/SaveFlash";

type AdminTopBarProps = {
	title: string;
	stat: string;
	onBack: () => void;
	onSave: () => void;
	isSyncing: boolean;
	flash: boolean;
	addItem?: () => void;
	addItemLabel?: string;
	children?: React.ReactNode;
};

export const AdminTopBar = ({
	title,
	stat,
	onBack,
	onSave,
	isSyncing,
	flash,
	addItem,
	addItemLabel,
	children,
}: AdminTopBarProps) => {
	const { t } = useTranslation();

	return (
		<div className="flex items-center gap-6 mb-12 animate-fade-in">
			<Button
				className="inline-flex items-center gap-2"
				variant="ghost"
				size="sm"
				onClick={onBack}
			>
				<ArrowBigLeft />
			</Button>
			<div className="flex-1">
				<Heading level={2} variant="yellow" className="text-5xl md:text-6xl">
					{title}
				</Heading>
				<div className="text-white/60 text-xs tracking-[2px] uppercase mt-2">
					{stat}
				</div>
			</div>
			<SaveFlash visible={flash} />
			<div className="flex gap-2">
				{children}
				<Button
					className="inline-flex items-center gap-2"
					variant="primary"
					size="sm"
					onClick={onSave}
					disabled={isSyncing}
				>
					<Save />{" "}
					{isSyncing
						? t("admin.landing.saving")
						: t("admin.members.save_cloud")}
				</Button>
				{addItem && (
					<Button
						className="inline-flex items-center gap-2"
						variant="outline"
						size="sm"
						onClick={addItem}
					>
						<Plus />
						{addItemLabel}
					</Button>
				)}
			</div>
		</div>
	);
};
