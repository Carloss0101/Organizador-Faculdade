import path from "path";

import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

const pagesPermitidas = ["login", "cadastro", "index"];

export function renderPage(req, res) {
    const page = req.path.replace("/", "");

    console.log(page);

    if (!pagesPermitidas.includes(page)) {
        return res.redirect("/login");
    }

    let filePath;

    filePath = path.join(__dirname, "..", "..", "frontend", "assets", "pages", `${page}.html`);

    return res.sendFile(filePath);
}