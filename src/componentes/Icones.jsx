function IconeBase({ children, className = "", title }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden={title ? undefined : "true"}
      role={title ? "img" : undefined}
      className={`icone ${className}`.trim()}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {title ? <title>{title}</title> : null}
      {children}
    </svg>
  );
}

export function IconeBusca(props) {
  return (
    <IconeBase {...props}>
      <circle cx="11" cy="11" r="6" />
      <path d="M20 20l-4.2-4.2" />
    </IconeBase>
  );
}

export function IconeLocalizacao(props) {
  return (
    <IconeBase {...props}>
      <path d="M12 3l2.5 6.5L21 12l-6.5 2.5L12 21l-2.5-6.5L3 12l6.5-2.5L12 3z" />
    </IconeBase>
  );
}

export function IconeTermometro(props) {
  return (
    <IconeBase {...props}>
      <path d="M10 14.5V6a2 2 0 114 0v8.5a4 4 0 11-4 0z" />
      <path d="M12 11v6" />
    </IconeBase>
  );
}

export function IconeTemperaturaAtual(props) {
  return (
    <IconeBase {...props}>
      <circle cx="12" cy="12" r="6.5" />
      <path d="M12 8v4" />
      <path d="M12 16h.01" />
      <path d="M8.5 12h7" />
    </IconeBase>
  );
}

export function IconeSol(props) {
  return (
    <IconeBase {...props}>
      <circle cx="12" cy="12" r="4.5" />
      <path d="M12 2.5v2.5M12 19v2.5M21.5 12H19M5 12H2.5M18.7 5.3l-1.8 1.8M7.1 16.9l-1.8 1.8M18.7 18.7l-1.8-1.8M7.1 7.1L5.3 5.3" />
    </IconeBase>
  );
}

export function IconeChuva(props) {
  return (
    <IconeBase {...props}>
      <path d="M8 14h8a4 4 0 001-7.9A5.5 5.5 0 006.2 4.6 4.5 4.5 0 008 14z" />
      <path d="M9 17l-.8 2M13 17l-.8 2M17 17l-.8 2" />
    </IconeBase>
  );
}

export function IconeTrovoada(props) {
  return (
    <IconeBase {...props}>
      <path d="M8 13h8a4 4 0 001-7.9A5.5 5.5 0 006.2 3.6 4.5 4.5 0 008 13z" />
      <path d="M12 13l-2 4h2l-1 4 4-6h-2l1-2" />
    </IconeBase>
  );
}

export function IconeGota(props) {
  return (
    <IconeBase {...props}>
      <path d="M12 3s-5 5.5-5 9a5 5 0 0010 0c0-3.5-5-9-5-9z" />
    </IconeBase>
  );
}

export function IconeVento(props) {
  return (
    <IconeBase {...props}>
      <path d="M4 9h10a3 3 0 100-6" />
      <path d="M3 13h14a3 3 0 110 6" />
      <path d="M2 17h6" />
    </IconeBase>
  );
}

export function IconeCalendario(props) {
  return (
    <IconeBase {...props}>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M8 3v4M16 3v4M3 10h18" />
    </IconeBase>
  );
}

export function IconeMicrofone(props) {
  return (
    <IconeBase {...props}>
      <rect x="9" y="3" width="6" height="11" rx="3" />
      <path d="M5 11a7 7 0 0014 0" />
      <path d="M12 18v3" />
      <path d="M9 21h6" />
    </IconeBase>
  );
}

export function IconeNuvem(props) {
  return (
    <IconeBase {...props}>
      <path d="M8 18h8a4 4 0 001-7.9A5.5 5.5 0 006.2 8.6 4.5 4.5 0 008 18z" />
    </IconeBase>
  );
}

export function IconeAcessibilidade(props) {
  return (
    <IconeBase {...props}>
      <circle cx="12" cy="4.5" r="1.7" />
      <path d="M12 8v5.5M8.5 10.2L12 9l3.5 1.2M9 20.5l1.6-6.3h2.8l1.6 6.3" />
    </IconeBase>
  );
}

export function IconeFonte(props) {
  return (
    <IconeBase {...props}>
      <path d="M6 19L11 5h2l5 14" />
      <path d="M8.2 14h7.6" />
    </IconeBase>
  );
}

export function IconeContraste(props) {
  return (
    <IconeBase {...props}>
      <circle cx="12" cy="12" r="8" />
      <path d="M12 4v16" />
    </IconeBase>
  );
}

export function IconeTela(props) {
  return (
    <IconeBase {...props}>
      <rect x="3" y="4" width="18" height="12" rx="2" />
      <path d="M8 20h8M12 16v4" />
    </IconeBase>
  );
}

export function IconeMovimento(props) {
  return (
    <IconeBase {...props}>
      <rect x="7" y="5" width="3.2" height="14" rx="1" />
      <rect x="13.8" y="5" width="3.2" height="14" rx="1" />
    </IconeBase>
  );
}

export function IconeVoz(props) {
  return (
    <IconeBase {...props}>
      <path d="M4 9v6h4l5 4V5L8 9H4z" />
      <path d="M17 9a5 5 0 010 6" />
    </IconeBase>
  );
}

export function IconeTeclado(props) {
  return (
    <IconeBase {...props}>
      <rect x="2.5" y="6" width="19" height="12" rx="2" />
      <path d="M6.5 14h11" />
    </IconeBase>
  );
}

export function IconeTexto(props) {
  return (
    <IconeBase {...props}>
      <path d="M4 6h16M4 12h10M4 18h13" />
    </IconeBase>
  );
}

export function IconeFechar(props) {
  return (
    <IconeBase {...props}>
      <path d="M6 6l12 12M18 6L6 18" />
    </IconeBase>
  );
}
