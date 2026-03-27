const BASE_API = "https://pretband-backend.vercel.app/api";
const MEMBERS_URL = `${BASE_API}/members`;
const AGENDA_URL = `${BASE_API}/agenda`;
const TRANSLATIONS_URL = `${BASE_API}/translations`;

export function loadData(): SiteData | undefined {
	try {
		const raw = localStorage.getItem("band_admin_v1");
		if (!raw) return undefined;
		return JSON.parse(raw);
	} catch {
		return undefined;
	}
}

export function persistData(data: SiteData) {
	localStorage.setItem("band_admin_v1", JSON.stringify(data));
}

export async function fetchMembers(token?: string) {
	const headers: Record<string, string> = {};
	if (token) headers.Authorization = `Bearer ${token}`;
	const res = await fetch(MEMBERS_URL, { headers });
	if (!res.ok) throw new Error("Could not fetch members");
	return res.json();
}

export async function fetchAgenda(token?: string) {
	const headers: Record<string, string> = {};
	if (token) headers.Authorization = `Bearer ${token}`;
	const res = await fetch(AGENDA_URL, { headers });
	if (!res.ok) throw new Error("Could not fetch agenda");
	return res.json();
}

export async function saveMembers(token: string, data: Members) {
	const res = await fetch(MEMBERS_URL, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
		body: JSON.stringify(data),
	});
	if (!res.ok) throw new Error("Could not save members");
	return res.json();
}

export async function saveAgenda(token: string, data: Agenda) {
	const res = await fetch(AGENDA_URL, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
		body: JSON.stringify(data),
	});
	if (!res.ok) throw new Error("Could not save agenda");
	return res.json();
}

export async function fetchTranslations(token?: string) {
	const headers: Record<string, string> = {};
	if (token) headers.Authorization = `Bearer ${token}`;
	const res = await fetch(TRANSLATIONS_URL, { headers });
	if (!res.ok) throw new Error("Could not fetch translations");
	return res.json();
}

export async function saveTranslations(
	token: string,
	data: { nl: any; en: any },
) {
	const res = await fetch(TRANSLATIONS_URL, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
		body: JSON.stringify(data),
	});
	if (!res.ok) throw new Error("Could not save translations");
	return res.json();
}
