export function validarNode22(nodeVersion, { plataforma = process.platform } = {}) {
  const major = Number(nodeVersion.match(/^v(\d+)/)?.[1]);
  if (major === 22) return;

  const dicas = [];
  if (plataforma === 'darwin') {
    dicas.push('No macOS com Homebrew: `brew install node@22` e coloque `/opt/homebrew/opt/node@22/bin` no PATH (Apple Silicon) ou `/usr/local/opt/node@22/bin` (Intel).');
  } else if (plataforma === 'win32') {
    dicas.push('No Windows, instale o Node 22 LTS em https://nodejs.org e reabra o terminal.');
  } else {
    dicas.push('Instale o Node 22 LTS (https://nodejs.org) e confirme com `node -v`.');
  }
  dicas.push(`Detectado: ${nodeVersion || 'desconhecido'}.`);

  throw new Error(`O GerontiCare requer Node 22. ${dicas.join(' ')}`);
}

export function validarPreflight({ nodeVersion, isTTY, plataforma = process.platform }) {
  validarNode22(nodeVersion, { plataforma });

  if (!isTTY) {
    throw new Error('A instalação requer um terminal interativo.');
  }
}
