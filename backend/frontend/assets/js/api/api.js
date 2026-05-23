const API_URL = "http://localhost:8080";

export async function login(data) {
  const response = await fetch(`${API_URL}/api/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
    credentials: "include",
  });

  const resultado = await response.json();

  return {
    status: response.status,
    ok: response.ok,
    resultado,
  };
}

export async function cadastro(data) {
  const response = await fetch(`${API_URL}/api/auth/cadastro`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
    credentials: "include",
  });

  const resultado = await response.json();

  return {
    status: response.status,
    ok: response.ok,
    resultado,
  };
}

export async function criarTarefa(dados) {
  const response = await fetch(`${API_URL}/api/tarefas/criar`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dados),
    credentials: "include",
  });

  const resultado = await response.json();

  return {
    status: response.status,
    ok: response.ok,
    resultado,
  };
}

export async function buscarTarefas(mes) {
  const response = await fetch(
    `${API_URL}/api/tarefas/${mes}`,
    {
      credentials: "include",
    }
  );

  const resultado = await response.json();

  return {
    status: response.status,
    ok: response.ok,
    resultado,
  };
}

export async function alterarStatus(idTarefa, novoStatus) {
  const response = await fetch(
    `${API_URL}/api/tarefas/status/${idTarefa}/${novoStatus}`,
    {
      method: "PATCH",
      credentials: "include",
    }
  );

  const resultado = await response.json();

  return {
    status: response.status,
    ok: response.ok,
    resultado,
  };
}

export async function deletarTarefaApi(id) {
  const response = await fetch(`${API_URL}/api/tarefas/${id}`, {
    method: "DELETE",
    credentials: "include",
  });

  const resultado = await response.json();

  return {
    ok: response.ok,
    status: response.status,
    resultado,
  };
}

export async function editarTarefaApi(id, dados) {
  const response = await fetch(`${API_URL}/api/tarefas/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dados),
    credentials: "include",
  });

  const resultado = await response.json();

  return {
    ok: response.ok,
    status: response.status,
    resultado,
  };
}

export async function enviarPlanejamentoApi(materia, arquivo) {
  const formData = new FormData();
  formData.append("planejamento", arquivo); 
  formData.append("materia", materia);

  const response = await fetch(`${API_URL}/api/tarefas/upload-planejamento`, {
    method: "POST",
    body: formData,
    credentials: "include", 
  });

  const resultado = await response.json();

  return {
    status: response.status,
    ok: response.ok,
    resultado,
  };
}