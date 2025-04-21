const mongoose = require("mongoose");

const Tarefa = mongoose.model("Tarefa", {
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  tipo: {
    type: String,
    enum: ["prova", "trabalho"],
    required: true,
  },
  dados: {
    materia: { type: String, required: true },
    titulo: {type: String, required: false},
    data: { type: String, required: true },
    concluido: { type: Boolean, default: false },
  },
});

module.exports = Tarefa;


