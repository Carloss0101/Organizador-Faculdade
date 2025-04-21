const path = require('path');
const express = require('express');
const router = express.Router();

router.get('/:pages', (req, res) => {
  const page = req.params.pages;
  const filePath = path.join(__dirname, '..', '..', '..', 'frontend', 'assets', 'pages', `${page}.html`);
  const loginPath = path.join(__dirname, '..', '..', '..', 'frontend', 'assets', 'pages', `login.html`);

  res.sendFile(filePath, (err) => {
    if (err) {

      //Se a pagina não for encontrada, redereciona para a index
      console.error(`Pagina ${page} não encontrada. Redirecionado para index.`);
      res.redirect('/index');
    }
  });
});


module.exports = router;
