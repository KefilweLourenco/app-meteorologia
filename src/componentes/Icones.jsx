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

export function IconeNuvem(props) {
  return (
    <IconeBase {...props}>
      <path d="M8 18h8a4 4 0 001-7.9A5.5 5.5 0 006.2 8.6 4.5 4.5 0 008 18z" />
    </IconeBase>
  );
}
