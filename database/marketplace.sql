--
-- PostgreSQL database dump
--

\restrict BHzBnCe5dmW2crJ82E36G4F8GMaMcsgf0ensaIyfI9OadSM9EcnGVm2UVhSVPtN

-- Dumped from database version 18.3
-- Dumped by pg_dump version 18.3

-- Started on 2026-05-17 17:13:55

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 222 (class 1259 OID 16469)
-- Name: perfil; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.perfil (
    id integer NOT NULL,
    user_id integer,
    telefono character varying(20),
    direccion text,
    ciudad character varying(100),
    foto text
);


ALTER TABLE public.perfil OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 16468)
-- Name: perfil_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.perfil_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.perfil_id_seq OWNER TO postgres;

--
-- TOC entry 5026 (class 0 OID 0)
-- Dependencies: 221
-- Name: perfil_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.perfil_id_seq OWNED BY public.perfil.id;


--
-- TOC entry 220 (class 1259 OID 16453)
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    nombre character varying(100) NOT NULL,
    email character varying(100) NOT NULL,
    password text NOT NULL,
    created_at timestamp without time zone DEFAULT now(),
    reset_token text,
    reset_expires timestamp without time zone,
    role character varying(20) DEFAULT 'user'::character varying
);


ALTER TABLE public.users OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 16452)
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_id_seq OWNER TO postgres;

--
-- TOC entry 5027 (class 0 OID 0)
-- Dependencies: 219
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- TOC entry 4864 (class 2604 OID 16472)
-- Name: perfil id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.perfil ALTER COLUMN id SET DEFAULT nextval('public.perfil_id_seq'::regclass);


--
-- TOC entry 4861 (class 2604 OID 16456)
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- TOC entry 4870 (class 2606 OID 16477)
-- Name: perfil perfil_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.perfil
    ADD CONSTRAINT perfil_pkey PRIMARY KEY (id);


--
-- TOC entry 4872 (class 2606 OID 16673)
-- Name: perfil unique_user_profile; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.perfil
    ADD CONSTRAINT unique_user_profile UNIQUE (user_id);


--
-- TOC entry 4866 (class 2606 OID 16467)
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- TOC entry 4868 (class 2606 OID 16465)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- TOC entry 4873 (class 2606 OID 16478)
-- Name: perfil perfil_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.perfil
    ADD CONSTRAINT perfil_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


-- Completed on 2026-05-17 17:13:55

--
-- PostgreSQL database dump complete
--

\unrestrict BHzBnCe5dmW2crJ82E36G4F8GMaMcsgf0ensaIyfI9OadSM9EcnGVm2UVhSVPtN

