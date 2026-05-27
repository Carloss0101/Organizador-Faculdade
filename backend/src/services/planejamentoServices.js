import * as cheerio from "cheerio";
import Tarefa from "../models/tarefa.js";

export async function processarPlanejamentoPdf(buffer, userId, nomeMateria) {
  console.log(`INICIANDO CONTROLO DE DUPLICAÇÃO DE ITENS: [${nomeMateria}]`);

  const html = buffer.toString("latin1");
  const $ = cheerio.load(html);
  const tarefasCriadas = [];
  
  const chavesProcessadas = new Map();

  const regexDataValida = /(\d{2}\/\d{2}\/\d{4})/;
  const regexPalavrasChave = /(prova|trabalho|teste|exame|entrega de projeto|avaliação|recuperação)/i;

  let dataSemanaAtual = null;

  $("table").each((tIdx, tabelaElemento) => {
    const tabela = $(tabelaElemento);
    const textoCabecalhoTabela = tabela.find("th").text().trim();

    if (
      textoCabecalhoTabela.includes("Histórico") || 
      textoCabecalhoTabela.includes("Totais") || 
      tabela.text().includes("Procedimentos de Ensino") ||
      tabela.text().includes("Orientações Gerais")
    ) {
      return; 
    }

    tabela.find("tr").each((rIdx, ImageElemento) => {
      const linha = $(ImageElemento);
      const textoLinha = linha.text().replace(/\s+/g, " ").trim();

      if (textoLinha.includes("Semana") && regexDataValida.test(textoLinha)) {
        const match = textoLinha.match(regexDataValida);
        if (match) {
          const [dia, mes, ano] = match[0].split("/");
          dataSemanaAtual = `${ano}-${mes}-${dia}`;
        }
      }

      if (regexPalavrasChave.test(textoLinha)) {
        if (
          textoLinha.includes("Conteúdo previsto") || 
          textoLinha.includes("Data de início") || 
          textoLinha.includes("Descrição") ||
          textoLinha.includes("Professor")
        ) {
          return;
        }

        let dataTarefa = dataSemanaAtual;
        const primeiraCelulaTexto = linha.find("td").first().text().trim();
        
        if (regexDataValida.test(primeiraCelulaTexto)) {
          const dataEspecificaMatch = primeiraCelulaTexto.match(regexDataValida)[0];
          const [dia, mes, ano] = dataEspecificaMatch.split("/");
          dataTarefa = `${ano}-${mes}-${dia}`;
        }

        if (!dataTarefa) return;

        let tituloTarefa = "";
        linha.find("td").each((i, td) => {
          const txtTd = $(td).text().replace(/\s+/g, " ").trim();
          if (regexPalavrasChave.test(txtTd) && !regexDataValida.test(txtTd)) {
            tituloTarefa = txtTd.substring(0, 60);
          }
        });

        if (!tituloTarefa) {
          tituloTarefa = linha.find("td").last().text().replace(/\s+/g, " ").trim().substring(0, 60);
        }

        if (tituloTarefa.length < 4 || /lançar|aprovado|visto/i.test(tituloTarefa) && tituloTarefa.length < 15) {
          return;
        }

        const tipo = /prova|teste|exame|avaliação|recuperação/i.test(tituloTarefa) ? "prova" : "trabalho";

        const [anoForm, mesForm, diaForm] = dataTarefa.split("-");
        const dataLocalCorreta = `${anoForm}-${mesForm}-${diaForm}`;

        const chaveUnica = `${dataLocalCorreta}_${tipo}`;

        if (chavesProcessadas.has(chaveUnica)) {
          const indiceExistente = chavesProcessadas.get(chaveUnica);
          const tarefaExistente = tarefasCriadas[indiceExistente];
          
          if (tituloTarefa.length > tarefaExistente.dados.titulo.length) {
            tarefaExistente.dados.titulo = tituloTarefa;
          } else {
            console.log(`[IGNORADO] Item duplicado detectado para o mesmo dia e tipo: ${dataLocalCorreta} [${tipo.toUpperCase()}]`);
          }
          return;
        }

        const novaTarefa = new Tarefa({
          userId: userId,
          tipo: tipo,
          dados: {
            materia: nomeMateria,
            titulo: tituloTarefa,
            data: dataLocalCorreta,
            concluido: false,
          },
        });

        tarefasCriadas.push(novaTarefa);
        chavesProcessadas.set(chaveUnica, tarefasCriadas.length - 1);
        
        console.log(`[CAPTURADO] Tipo: ${tipo.toUpperCase()} | Data Real: ${dataLocalCorreta} | Título: "${tituloTarefa}"`);
      }
    });
  });

  if (tarefasCriadas.length > 0) {
    await Tarefa.insertMany(tarefasCriadas);
  }

  return tarefasCriadas;
}