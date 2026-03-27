type Agenda = {
	events: AgendaEvent[];
};

type AgendaEvent = {
	id: string;
	date: string;
	title: string;
	location: string;
};
