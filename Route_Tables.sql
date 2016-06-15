create table public.terminal
(
	id_terminal serial primary key,
	nombre character varying(40),
	point geometry(Point)
)WITH (
	OIDS=FALSE
);

ALTER TABLE public.terminal
OWNER TO postgres;


create table public.ruta
(
	id_ruta serial primary key,
	nombre character varying(40),
	tiempo_estimado time,
	kilometros integer,
	id_terminal_origen integer references terminal (id_terminal),
	id_terminal_destino integer references terminal (id_terminal)
)WITH (
	OIDS = FALSE
);
ALTER TABLE public.ruta
OWNER TO postgres;


CREATE TABLE public.horario
(
	horario_salida time,
	dias_habiles character varying(40),
	id_ruta integer references ruta(id_ruta)
)WITH(
	OIDS = FALSE
);
ALTER TABLE public.horario
OWNER TO postgres;

