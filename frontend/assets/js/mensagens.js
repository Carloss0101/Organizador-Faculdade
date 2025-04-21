export default function gerarMensagemNaTela(msg, color) {
    const div = document.createElement("div");
    div.id = "embadmsg";

    const p = document.createElement("p");
    p.innerText = msg;

    const barraProgresso = document.createElement("div");
    barraProgresso.id = "progress";
    barraProgresso.style.backgroundColor = color;

    div.appendChild(p);
    div.appendChild(barraProgresso);
    document.body.appendChild(div);

    setTimeout(() => {
        div.classList.add("fadeOut");
        setTimeout(() => div.remove(), 500);
    }, 2000);
}