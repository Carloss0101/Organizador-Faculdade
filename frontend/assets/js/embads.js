import adicionarTarefa from './adicionarTarefa.js'

export function criarEmbadTrabalhos(idUser) {
    //oculta o main
    document.querySelector('main').style.display = "none";

    const embadTrabalhos = document.createElement("div");
    embadTrabalhos.id = "embad-geral";

    const tituloTrabalhos = document.createElement("h1");
    tituloTrabalhos.textContent = "Cadastrar Trabalho";
    embadTrabalhos.appendChild(tituloTrabalhos);

    const formTrabalhos = document.createElement("div");
    formTrabalhos.id = "embad-form";

    const itemMateriaTrabalho = document.createElement("div");
    itemMateriaTrabalho.className = "embad-form-item";

    const labelMateriaTrabalho = document.createElement("label");
    labelMateriaTrabalho.setAttribute("for", "materia");
    labelMateriaTrabalho.textContent = "Nome da Matéria:";

    const inputMateriaTrabalho = document.createElement("input");
    inputMateriaTrabalho.type = "text";
    inputMateriaTrabalho.name = "materia";
    inputMateriaTrabalho.id = "materia";
    inputMateriaTrabalho.maxLength = 30;
    inputMateriaTrabalho.required = true;
    inputMateriaTrabalho.placeholder = "Algoritmos";

    itemMateriaTrabalho.appendChild(labelMateriaTrabalho);
    itemMateriaTrabalho.appendChild(inputMateriaTrabalho);

    const itemTrabalho = document.createElement("div");
    itemTrabalho.className = "embad-form-item";

    const labelTrabalho = document.createElement("label");
    labelTrabalho.setAttribute("for", "trabalhoInput");
    labelTrabalho.textContent = "Nome do Trabalho:";

    const inputTrabalho = document.createElement("input");
    inputTrabalho.type = "text";
    inputTrabalho.name = "trabalhoInput";
    inputTrabalho.id = "trabalhoInput";
    inputTrabalho.maxLength = 30;
    inputTrabalho.required = true;
    inputTrabalho.placeholder = "Seminário 01";

    itemTrabalho.appendChild(labelTrabalho);
    itemTrabalho.appendChild(inputTrabalho);

    const itemDataTrabalho = document.createElement("div");
    itemDataTrabalho.className = "embad-form-item";

    const labelDataTrabalho = document.createElement("label");
    labelDataTrabalho.setAttribute("for", "data");
    labelDataTrabalho.textContent = "Data do trabalho:";

    const inputDataTrabalho = document.createElement("input");
    inputDataTrabalho.type = "date";
    inputDataTrabalho.name = "data";
    inputDataTrabalho.id = "data";

    itemDataTrabalho.appendChild(labelDataTrabalho);
    itemDataTrabalho.appendChild(inputDataTrabalho);

    const btnTrabalhoDiv = document.createElement("div");
    btnTrabalhoDiv.id = "btn";

    const btnCadastrarTrabalho = document.createElement("button");
    btnCadastrarTrabalho.id = "cadastrarTrabalho";
    btnCadastrarTrabalho.textContent = "Cadastrar";

    btnCadastrarTrabalho.addEventListener('click', () => {
        const nomeMateria = document.getElementById('materia').value
        const nomeTrabalho = document.getElementById('trabalhoInput').value
        const data = document.getElementById('data').value

        //valida se todos os inputs estão preenchidos
        if(nomeMateria.trim() != '' && nomeTrabalho.trim() != '' && data.trim() != '') {
            embadTrabalhos.style.display = "none";
            document.querySelector('main').style.display = "block";

            adicionarTarefa(idUser, nomeMateria, nomeTrabalho,'trabalho',data)
        } else {
            window.alert('Todos os itens devem ser preenchidos.')
        }
    })

    btnTrabalhoDiv.appendChild(btnCadastrarTrabalho);

    formTrabalhos.appendChild(itemMateriaTrabalho);
    formTrabalhos.appendChild(itemTrabalho);
    formTrabalhos.appendChild(itemDataTrabalho);
    formTrabalhos.appendChild(btnTrabalhoDiv);

    embadTrabalhos.appendChild(formTrabalhos);

    document.body.appendChild(embadTrabalhos);
}

export function criarEmbadProvas(idUser) {
    //oculta o main
    document.querySelector('main').style.display = "none";

    const embadProvas = document.createElement("div");
    embadProvas.id = "embad-geral";

    const tituloProvas = document.createElement("h1");
    tituloProvas.textContent = "Cadastrar Prova";
    embadProvas.appendChild(tituloProvas);

    const formProvas = document.createElement("div");
    formProvas.id = "embad-form";

    const itemMateriaProva = document.createElement("div");
    itemMateriaProva.className = "embad-form-item";

    const labelMateriaProva = document.createElement("label");
    labelMateriaProva.setAttribute("for", "materia");
    labelMateriaProva.textContent = "Nome da Matéria:";

    const inputMateriaProva = document.createElement("input");
    inputMateriaProva.type = "text";
    inputMateriaProva.name = "materia";
    inputMateriaProva.id = "materia";
    inputMateriaProva.maxLength = 30;
    inputMateriaProva.required = true;
    inputMateriaProva.placeholder = "Algoritmos";

    itemMateriaProva.appendChild(labelMateriaProva);
    itemMateriaProva.appendChild(inputMateriaProva);

    const itemProva = document.createElement("div");
    itemProva.className = "embad-form-item";

    const labelProva = document.createElement("label");
    labelProva.setAttribute("for", "provainput");
    labelProva.textContent = "Nome da Prova:";

    const inputProva = document.createElement("input");
    inputProva.type = "text";
    inputProva.name = "provainput";
    inputProva.id = "provainput";
    inputProva.maxLength = 30;
    inputProva.required = true;
    inputProva.placeholder = "Prova 01";

    itemProva.appendChild(labelProva);
    itemProva.appendChild(inputProva);

    const itemDataProva = document.createElement("div");
    itemDataProva.className = "embad-form-item";

    const labelDataProva = document.createElement("label");
    labelDataProva.setAttribute("for", "data");
    labelDataProva.textContent = "data da prova:";

    const inputDataProva = document.createElement("input");
    inputDataProva.type = "date";
    inputDataProva.name = "data";
    inputDataProva.id = "data";

    itemDataProva.appendChild(labelDataProva);
    itemDataProva.appendChild(inputDataProva);

    const btnProvaDiv = document.createElement("div");
    btnProvaDiv.id = "btn";

    const btnCadastrarProva = document.createElement("button");
    btnCadastrarProva.id = "cadastrarProva";
    btnCadastrarProva.textContent = "Cadastrar";

    btnCadastrarProva.addEventListener('click', () => {
        const nomeMateria = document.getElementById('materia').value
        const nomeProva = document.getElementById('provainput').value
        const data = document.getElementById('data').value

        //valida se todos os inputs estão preenchidos
        if(nomeMateria.trim() != '' && nomeProva.trim() != '' && data.trim() != '') {
            embadProvas.style.display = "none";
            document.querySelector('main').style.display = "block";

            adicionarTarefa(idUser, nomeMateria, nomeProva,'prova' ,data)
        } else {
            window.alert('Todos os itens devem ser preenchidos.')
        }
    })


    btnProvaDiv.appendChild(btnCadastrarProva);

    formProvas.appendChild(itemMateriaProva);
    formProvas.appendChild(itemProva);
    formProvas.appendChild(itemDataProva);
    formProvas.appendChild(btnProvaDiv);

    embadProvas.appendChild(formProvas);

    document.body.appendChild(embadProvas);
}

