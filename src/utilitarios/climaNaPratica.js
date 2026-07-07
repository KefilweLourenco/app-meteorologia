function criarInsight({
  id,
  titulo,
  categoria,
  nivel,
  descricao,
  recomendacao,
  dadoUsado,
  confiabilidade
}) {
  return {
    id,
    titulo,
    categoria,
    nivel,
    descricao,
    recomendacao,
    dadoUsado,
    confiabilidade
  };
}

function normalizarTexto(texto = "") {
  return texto.toLowerCase();
}

function obterHoraAtual(dadosClima) {
  if (typeof dadosClima?.horario === "number") {
    return dadosClima.horario;
  }

  return new Date().getHours();
}

function climaTemChuva(descricao, chanceChuva) {
  const texto = normalizarTexto(descricao);

  return (
    texto.includes("chuva") ||
    texto.includes("garoa") ||
    texto.includes("pancada") ||
    texto.includes("trovo") ||
    (typeof chanceChuva === "number" && chanceChuva >= 60)
  );
}

function climaTemSol(descricao) {
  const texto = normalizarTexto(descricao);
  return texto.includes("limpo") || texto.includes("sol");
}

function climaMuitoFechado(descricao) {
  const texto = normalizarTexto(descricao);
  return texto.includes("nublado") || texto.includes("neblina") || texto.includes("trovo");
}

function gerarRoupaDoDia({ temperatura, sensacaoTermica, chanceChuva, velocidadeVento }) {
  const fazFrio = temperatura < 18 || sensacaoTermica < 17;
  const fazCalor = temperatura >= 26 || sensacaoTermica >= 28;
  const chuvaProvavel = typeof chanceChuva === "number" && chanceChuva >= 45;
  const ventoPresente = velocidadeVento >= 18;

  if (fazFrio) {
    return criarInsight({
      id: "roupa-do-dia",
      titulo: "Roupa do dia",
      categoria: "rotina urbana",
      nivel: "Atenção",
      descricao: "O dia pode pedir blusa ou casaco em parte da rotina.",
      recomendacao: chuvaProvavel || ventoPresente
        ? "Leve blusa e tenha guarda-chuva ou capa por perto."
        : "Leve blusa ou casaco leve para sair com mais conforto.",
      dadoUsado: "temperatura, sensação térmica, chuva e vento",
      confiabilidade: "estimativa"
    });
  }

  if (fazCalor) {
    return criarInsight({
      id: "roupa-do-dia",
      titulo: "Roupa do dia",
      categoria: "rotina urbana",
      nivel: chuvaProvavel ? "Atenção" : "Favorável",
      descricao: chuvaProvavel
        ? "O dia tende a ser quente, mas o tempo pode mudar."
        : "O clima favorece roupa leve e mais ventilada.",
      recomendacao: chuvaProvavel
        ? "Prefira roupa leve e leve guarda-chuva ou capa."
        : "Use roupa leve e mantenha água por perto em saídas longas.",
      dadoUsado: "temperatura, sensação térmica, chuva e vento",
      confiabilidade: "estimativa"
    });
  }

  return criarInsight({
    id: "roupa-do-dia",
    titulo: "Roupa do dia",
    categoria: "rotina urbana",
    nivel: chuvaProvavel ? "Atenção" : "Favorável",
    descricao: chuvaProvavel
      ? "O clima está ameno, mas pode virar ao longo do dia."
      : "O dia tende a ser confortável para a rotina urbana.",
    recomendacao: chuvaProvavel
      ? "Vale levar blusa leve e proteção para chuva."
      : "Use roupa confortável e, se quiser, leve blusa leve.",
    dadoUsado: "temperatura, sensação térmica, chuva e vento",
    confiabilidade: "estimativa"
  });
}

function gerarLavarRoupa({ chanceChuva, umidade, velocidadeVento, descricao }) {
  const chuvaProvavel = climaTemChuva(descricao, chanceChuva);
  const umidadeAlta = umidade >= 78;
  const ventoAjuda = velocidadeVento >= 8 && velocidadeVento <= 24;

  if (chuvaProvavel || umidadeAlta) {
    return criarInsight({
      id: "lavar-roupa",
      titulo: "Lavar roupa",
      categoria: "casa",
      nivel: chuvaProvavel ? "Evite" : "Atenção",
      descricao: chuvaProvavel
        ? "A roupa pode demorar mais para secar hoje."
        : "A umidade alta pode atrapalhar a secagem.",
      recomendacao: chuvaProvavel
        ? "Se puder, deixe para outro dia ou use área coberta."
        : "Vale usar área ventilada e evitar muito volume de roupa.",
      dadoUsado: "chuva, umidade do ar, vento e condição do céu",
      confiabilidade: "estimativa"
    });
  }

  return criarInsight({
    id: "lavar-roupa",
    titulo: "Lavar roupa",
    categoria: "casa",
    nivel: ventoAjuda ? "Favorável" : "Moderado",
    descricao: ventoAjuda
      ? "O clima tende a ajudar a secagem ao longo do dia."
      : "A secagem pode acontecer, mas talvez mais devagar.",
    recomendacao: ventoAjuda
      ? "Hoje pode ser um bom dia para roupas leves e médias."
      : "Prefira peças menores ou deixe mais espaço entre elas."
      ,
    dadoUsado: "chuva, umidade do ar, vento e condição do céu",
    confiabilidade: "estimativa"
  });
}

function gerarPeleRessecada({ umidade }) {
  if (umidade < 40) {
    return criarInsight({
      id: "pele-ressecada",
      titulo: "Pele ressecada",
      categoria: "bem-estar",
      nivel: "Alto",
      descricao: "O ar seco pode incomodar mais ao longo do dia.",
      recomendacao: "Vale hidratar a pele e beber água com frequência.",
      dadoUsado: "umidade do ar",
      confiabilidade: "estimativa"
    });
  }

  if (umidade < 55) {
    return criarInsight({
      id: "pele-ressecada",
      titulo: "Pele ressecada",
      categoria: "bem-estar",
      nivel: "Moderado",
      descricao: "Pessoas sensíveis podem sentir mais a pele repuxando.",
      recomendacao: "Se fizer sentido para você, leve hidratante ou protetor labial.",
      dadoUsado: "umidade do ar",
      confiabilidade: "estimativa"
    });
  }

  return criarInsight({
    id: "pele-ressecada",
    titulo: "Pele ressecada",
    categoria: "bem-estar",
    nivel: "Baixo",
    descricao: "A umidade do ar está em uma faixa mais confortável.",
    recomendacao: "A rotina de cuidado pode seguir normalmente.",
    dadoUsado: "umidade do ar",
    confiabilidade: "estimativa"
  });
}

function gerarMosquitos({ temperatura, umidade }) {
  if (temperatura >= 24 && umidade >= 70) {
    return criarInsight({
      id: "mosquitos",
      titulo: "Mosquitos",
      categoria: "ambiente",
      nivel: "Alto",
      descricao: "Calor e umidade podem favorecer mais insetos no ambiente.",
      recomendacao: "Vale lembrar repelente, telas e evitar água parada.",
      dadoUsado: "temperatura e umidade do ar",
      confiabilidade: "estimativa"
    });
  }

  if (temperatura >= 20 && umidade >= 55) {
    return criarInsight({
      id: "mosquitos",
      titulo: "Mosquitos",
      categoria: "ambiente",
      nivel: "Moderado",
      descricao: "O clima pode favorecer mosquitos em alguns momentos.",
      recomendacao: "Se ficar em área aberta, vale algum cuidado extra.",
      dadoUsado: "temperatura e umidade do ar",
      confiabilidade: "estimativa"
    });
  }

  return criarInsight({
    id: "mosquitos",
    titulo: "Mosquitos",
    categoria: "ambiente",
    nivel: "Baixo",
    descricao: "O clima de hoje tende a favorecer menos mosquitos.",
    recomendacao: "Os cuidados podem seguir no ritmo habitual.",
    dadoUsado: "temperatura e umidade do ar",
    confiabilidade: "estimativa"
  });
}

function gerarVitaminaD({ descricao, horario, indiceUv }) {
  const ehDia = horario >= 6 && horario < 18;
  const temSol = climaTemSol(descricao);
  const ceuFechado = climaMuitoFechado(descricao);
  const uvAlto = typeof indiceUv === "number" && indiceUv >= 8;

  if (!ehDia) {
    return criarInsight({
      id: "vitamina-d",
      titulo: "Vitamina D",
      categoria: "bem-estar",
      nivel: "Baixo",
      descricao: "Fora do período de sol, esse apoio natural tende a ser menor.",
      recomendacao: "Acompanhe a luz do dia com cuidado quando houver sol novamente.",
      dadoUsado: "horário, clima agora e índice UV quando disponível",
      confiabilidade: "estimativa"
    });
  }

  if (temSol && !uvAlto) {
    return criarInsight({
      id: "vitamina-d",
      titulo: "Vitamina D",
      categoria: "bem-estar",
      nivel: "Favorável",
      descricao: "O clima pode favorecer uma exposição breve e cuidadosa ao sol.",
      recomendacao: "Se for se expor, faça isso com proteção e sem exagero.",
      dadoUsado: "horário, clima agora e índice UV quando disponível",
      confiabilidade: "estimativa"
    });
  }

  if (ceuFechado || uvAlto) {
    return criarInsight({
      id: "vitamina-d",
      titulo: "Vitamina D",
      categoria: "bem-estar",
      nivel: "Atenção",
      descricao: "O clima de hoje pode limitar esse momento ou pedir mais cuidado.",
      recomendacao: "Use esta leitura apenas como orientação geral, não como regra médica.",
      dadoUsado: "horário, clima agora e índice UV quando disponível",
      confiabilidade: "estimativa"
    });
  }

  return criarInsight({
    id: "vitamina-d",
    titulo: "Vitamina D",
    categoria: "bem-estar",
    nivel: "Moderado",
    descricao: "Pode haver alguma luz solar útil, mas o clima parece variável.",
    recomendacao: "Se ficar ao ar livre, prefira cuidado e proteção durante a exposição.",
    dadoUsado: "horário, clima agora e índice UV quando disponível",
    confiabilidade: "estimativa"
  });
}

function obterNomeCurtoDaCidade(cidade) {
  if (!cidade) {
    return "sua cidade";
  }

  return cidade.split(",")[0].trim();
}

function gerarMobilidadeUrbana({ temperatura, chanceChuva, velocidadeVento, descricao, cidade }) {
  const chuva = climaTemChuva(descricao, chanceChuva);
  const ventoForte = velocidadeVento >= 22;
  const frio = temperatura < 17;
  const calor = temperatura >= 29;
  const nomeCidade = obterNomeCurtoDaCidade(cidade);
  const titulo = `Mobilidade em ${nomeCidade}`;

  if (chuva) {
    return criarInsight({
      id: "mobilidade-urbana",
      titulo,
      categoria: "rotina urbana",
      nivel: "Atenção",
      descricao: `Chuva pode deixar os deslocamentos em ${nomeCidade} mais lentos, com pisos mais escorregadios.`,
      recomendacao: "Leve guarda-chuva e saia alguns minutos antes.",
      dadoUsado: "chuva, temperatura e vento",
      confiabilidade: "estimativa"
    });
  }

  if (frio || ventoForte) {
    return criarInsight({
      id: "mobilidade-urbana",
      titulo,
      categoria: "rotina urbana",
      nivel: "Moderado",
      descricao: `Frio e vento podem incomodar mais quem se desloca em ${nomeCidade}, principalmente em pontos de ônibus e áreas abertas.`,
      recomendacao: "Vale levar blusa e se preparar para trechos ao ar livre.",
      dadoUsado: "temperatura, vento e condição do tempo",
      confiabilidade: "estimativa"
    });
  }

  if (calor) {
    return criarInsight({
      id: "mobilidade-urbana",
      titulo,
      categoria: "rotina urbana",
      nivel: "Moderado",
      descricao: `Calor forte pode cansar mais quem faz deslocamentos longos em ${nomeCidade}.`,
      recomendacao: "Se o trajeto for maior, leve água e prefira pausas na sombra.",
      dadoUsado: "temperatura e condição do tempo",
      confiabilidade: "estimativa"
    });
  }

  return criarInsight({
    id: "mobilidade-urbana",
    titulo,
    categoria: "rotina urbana",
    nivel: "Favorável",
    descricao: `O clima tende a ajudar os deslocamentos em ${nomeCidade} a serem mais estáveis hoje.`,
    recomendacao: "A rotina urbana pode seguir com menos impacto do tempo.",
    dadoUsado: "temperatura, chuva, vento e condição do tempo",
    confiabilidade: "estimativa"
  });
}

export function gerarClimaNaPratica(dadosClima) {
  if (!dadosClima) {
    return [];
  }

  const base = {
    temperatura: dadosClima.temperatura,
    sensacaoTermica: dadosClima.sensacaoTermica,
    chanceChuva: dadosClima.chanceChuva,
    umidade: dadosClima.umidade,
    velocidadeVento: dadosClima.velocidadeVento,
    descricao: dadosClima.descricao,
    horario: obterHoraAtual(dadosClima),
    indiceUv: dadosClima.indiceUv,
    cidade: dadosClima.cidade
  };

  return [
    gerarRoupaDoDia(base),
    gerarLavarRoupa(base),
    gerarPeleRessecada(base),
    gerarMosquitos(base),
    gerarVitaminaD(base),
    gerarMobilidadeUrbana(base)
  ];
}

export function formatarResumoPratica(insights) {
  if (!insights || insights.length === 0) {
    return "";
  }

  return insights
    .map(
      (insight) =>
        `${insight.titulo}, nível ${insight.nivel.toLowerCase()}. ${insight.descricao} ${insight.recomendacao}`
    )
    .join(" ");
}
