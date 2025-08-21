// Dados das Personas
const personas = [
    {
        id: 'ana-leitora',
        nome: 'Ana Lima',
        usuario: '@ana.leitora',
        bio: 'Vivendo em um mundo de palavras. 📚📖 Curadora de resenhas e indicações.',
        publicacoes: 120,
        seguidores: '5,2K',
        seguindo: 345,
        posts: [
            'assets/ana_post1.jpg', 'assets/ana_post2.jpg', 'assets/ana_post3.jpg', 
            'assets/ana_post4.jpg', 'assets/ana_post5.jpg', 'assets/ana_post6.jpg'
        ],
        stories: ['Livros', 'Filmes', 'Arte']
    },
    {
        id: 'bruno-tech',
        nome: 'Bruno Tech',
        usuario: '@bruno.tech',
        bio: 'Entusiasta de tecnologia e games. Sempre por dentro dos últimos lançamentos e rumores da indústria.',
        publicacoes: 85,
        seguidores: '2,5K',
        seguindo: 120,
        posts: [
            'assets/bruno_post1.jpg', 'assets/bruno_post2.jpg', 'assets/bruno_post3.jpg',
            'assets/bruno_post4.jpg', 'assets/bruno_post5.jpg', 'assets/bruno_post6.jpg'
        ],
        stories: ['Games', 'Gadgets', 'Notícias']
    },
    {
        id: 'clara-news',
        nome: 'Clara Rodrigues',
        usuario: '@clara.news',
        bio: 'Cidadã ativa. Defendendo causas e buscando a verdade. ⚖️🌎',
        publicacoes: 215,
        seguidores: '10,1K',
        seguindo: 890,
        posts: [
            'assets/clara_post1.jpg', 'assets/clara_post2.jpg', 'assets/clara_post3.jpg',
            'assets/clara_post4.jpg', 'assets/clara_post5.jpg', 'assets/clara_post6.jpg'
        ],
        stories: ['Política', 'Ativismo', 'Fatos']
    }
];

// Dados dos Avatares para as Equipes
const avatares = [
    'assets/avatar1.jpg', 'assets/avatar2.jpg', 'assets/avatar3.jpg', 
    'assets/avatar4.jpg', 'assets/avatar5.jpg', 'assets/avatar6.jpg'
];

// Dados das Notícias para o jogo
const noticias = [
    {
        titulo: "Robôs vão substituir professores em 2025, diz estudo da NASA",
        conteudo: "Um estudo secreto da NASA teria revelado que a inteligência artificial está avançando tão rápido que, até 2025, robôs humanoides estarão prontos para substituir professores em todas as escolas do mundo.",
        status: "fake",
        suspeito: "bruno-tech"
    },
    {
        titulo: "Antigo manuscrito revela cura para a timidez",
        conteudo: "Um pergaminho de 300 anos, encontrado em uma biblioteca na Áustria, descreve uma técnica de respiração e uma mistura de chás que eliminam completamente a timidez em apenas 7 dias.",
        status: "fake",
        suspeito: "ana-leitora"
    },
    {
        titulo: "Energia solar é a principal fonte de energia em 10 capitais brasileiras",
        conteudo: "Um novo relatório do Instituto de Pesquisa Energética Nacional mostra que a energia solar, impulsionada por políticas de incentivo, ultrapassou a energia hidrelétrica e se tornou a principal fonte em 10 capitais do Brasil.",
        status: "verdadeira",
        suspeito: "clara-news"
    }
];

// Variáveis de controle do jogo
let rodadaAtual = 0;
let equipes = {};
let cronometro;
const numEquipes = 5;

// --- Lógica de Funções do Jogo ---

// Função para mudar de tela
function mudarTela(telaId) {
    const telas = document.querySelectorAll('.tela');
    telas.forEach(tela => tela.classList.remove('active'));
    document.getElementById(telaId).classList.add('active');
}

function iniciarJogo() {
    gerarConfiguracaoEquipes();
    mudarTela('tela-personagens');
}

function gerarConfiguracaoEquipes() {
    const container = document.getElementById('configuracao-equipes');
    container.innerHTML = '';
    for (let i = 1; i <= numEquipes; i++) {
        const divEquipe = document.createElement('div');
        divEquipe.className = 'config-equipe';
        divEquipe.innerHTML = `
            <h3>Equipe ${i}</h3>
            <div class="avatar-escolha-container">
                ${avatares.map(avatar => `
                    <img src="${avatar}" alt="Avatar Equipe ${i}" class="avatar-escolha" data-equipe="${i}" data-avatar="${avatar}">
                `).join('')}
            </div>
            <input type="text" id="nome-equipe${i}" placeholder="Nome da Equipe ${i}" required>
        `;
        container.appendChild(divEquipe);
    }
}

function confirmarConfiguracao() {
    equipes = {};
    for (let i = 1; i <= numEquipes; i++) {
        const nomeEquipe = document.getElementById(`nome-equipe${i}`).value;
        const avatarSelecionado = document.querySelector(`.avatar-escolha[data-equipe="${i}"].selecionado`);
        if (!nomeEquipe || !avatarSelecionado) {
            alert(`Por favor, configure o nome e o avatar da Equipe ${i}.`);
            return;
        }
        equipes[`equipe${i}`] = {
            nome: nomeEquipe,
            avatar: avatarSelecionado.src,
            pontos: 0
        };
    }
    mudarTela('tela-suspeitos');
}

function gerarPerfisSuspeitos() {
    const suspeitosContainer = document.getElementById('suspeitos-container');
    let htmlContent = '';
    personas.forEach(persona => {
        htmlContent += `
            <div class="suspeito-perfil" data-id="${persona.id}">
                <div class="perfil-header">
                    <img src="assets/${persona.id}_perfil.jpg" alt="Perfil de ${persona.nome}" class="perfil-foto">
                    <div class="perfil-info">
                        <span class="nome">${persona.nome}</span>
                        <span class="usuario">${persona.usuario}</span>
                    </div>
                </div>
                <div class="perfil-stats">
                    <div><span class="stat-numero">${persona.publicacoes}</span><br>Publicações</div>
                    <div><span class="stat-numero">${persona.seguidores}</span><br>Seguidores</div>
                    <div><span class="stat-numero">${persona.seguindo}</span><br>Seguindo</div>
                </div>
                <p class="perfil-bio">${persona.bio}</p>
                <div class="perfil-stories">
                    ${persona.stories.map(story => `
                        <div class="story-destaque">
                            <span class="story-texto">${story}</span>
                        </div>
                    `).join('')}
                </div>
                <div class="perfil-posts-grid">
                    ${persona.posts.map(post => `
                        <img src="${post}" alt="Post de ${persona.nome}" class="post-mini">
                    `).join('')}
                </div>
            </div>
        `;
    });
    suspeitosContainer.innerHTML = htmlContent;
}

function iniciarRodada() {
    rodadaAtual++;
    if (rodadaAtual > noticias.length) {
        exibirPlacarFinal();
        return;
    }
    const noticiaAtual = noticias[rodadaAtual - 1];
    document.getElementById('rodada-info').textContent = `Rodada ${rodadaAtual} de ${noticias.length}`;
    document.getElementById('titulo-noticia').textContent = noticiaAtual.titulo;
    document.getElementById('conteudo-noticia').textContent = noticiaAtual.conteudo;
    iniciarCronometro(120);
    mudarTela('tela-jogo');
    document.getElementById('painel-interno-professor').classList.remove('ativo');
}

function iniciarCronometro(tempo) {
    const cronometroDisplay = document.getElementById('cronometro');
    let segundos = tempo;
    cronometro = setInterval(() => {
        segundos--;
        let minutos = Math.floor(segundos / 60);
        let segundosRestantes = segundos % 60;
        cronometroDisplay.textContent = `Tempo: ${minutos.toString().padStart(2, '0')}:${segundosRestantes.toString().padStart(2, '0')}`;
        if (segundos <= 0) {
            clearInterval(cronometro);
            gerarPainelControle();
        }
    }, 1000);
}

function gerarPainelControle() {
    const painel = document.getElementById('painel-interno-professor');
    painel.innerHTML = `<h2>Painel do Professor</h2><p>Preencha as respostas de cada equipe para a Rodada ${rodadaAtual}.</p>`;
    for (const equipeId in equipes) {
        const divEquipe = document.createElement('div');
        divEquipe.className = 'equipe-painel';
        divEquipe.innerHTML = `
            <h3>${equipes[equipeId].nome}</h3>
            <select id="select-${equipeId}-suspeito">
                <option value="">Suspeito...</option>
                ${personas.map(p => `<option value="${p.id}">${p.nome}</option>`).join('')}
            </select>
            <label><input type="radio" name="${equipeId}-status" value="fake"> Fake</label>
            <label><input type="radio" name="${equipeId}-status" value="verdadeira"> Verdadeira</label>
        `;
        painel.appendChild(divEquipe);
    }
    const btnRegistrar = document.createElement('button');
    btnRegistrar.id = 'btn-registrar-respostas';
    btnRegistrar.textContent = 'Registrar e Revelar';
    btnRegistrar.addEventListener('click', registrarRespostas);
    painel.appendChild(btnRegistrar);
    painel.classList.add('ativo'); // Ativa a visibilidade do painel
}

function registrarRespostas() {
    clearInterval(cronometro);
    const noticiaAtual = noticias[rodadaAtual - 1];
    const escolhasDasEquipes = {};
    for (const equipeId in equipes) {
        const equipeSuspeito = document.getElementById(`select-${equipeId}-suspeito`).value;
        const equipeStatus = document.querySelector(`input[name="${equipeId}-status"]:checked`)?.value;
        escolhasDasEquipes[equipeId] = {
            suspeito: equipeSuspeito,
            status: equipeStatus
        };
        if (equipeSuspeito === noticiaAtual.suspeito) {
            equipes[equipeId].pontos += 2;
        }
        if (equipeStatus === noticiaAtual.status) {
            equipes[equipeId].pontos += 2;
        }
    }
    exibirResultadoRodada(escolhasDasEquipes);
}

function exibirResultadoRodada(escolhasDasEquipes) {
    const noticiaAtual = noticias[rodadaAtual - 1];
    const resultadoRodada = document.getElementById('resultado-rodada');
    let htmlEscolhas = '<h3>Escolhas das Equipes:</h3><ul>';
    for (const equipeId in escolhasDasEquipes) {
        const escolha = escolhasDasEquipes[equipeId];
        const nomeSuspeitoEscolhido = personas.find(p => p.id === escolha.suspeito)?.nome || 'Não selecionado';
        const statusNoticiaEscolhido = escolha.status || 'Não selecionado';
        htmlEscolhas += `<li>**${equipes[equipeId].nome}**: Suspeito: ${nomeSuspeitoEscolhido} | Status: ${statusNoticiaEscolhido}</li>`;
    }
    htmlEscolhas += '</ul>';
    resultadoRodada.innerHTML = `
        <p>A notícia era **${noticiaAtual.status.toUpperCase()}**.</p>
        <p>O suspeito correto era: **${personas.find(p => p.id === noticiaAtual.suspeito).nome}**.</p>
        ${htmlEscolhas}
        <h3>Pontuação Atual:</h3>
        <ul>
            ${Object.values(equipes).map(equipe => `
                <li>${equipe.nome}: ${equipe.pontos} pontos</li>
            `).join('')}
        </ul>
    `;
    mudarTela('tela-revelacao');
}

function exibirPlacarFinal() {
    const placarFinal = document.getElementById('placar-final');
    placarFinal.innerHTML = Object.values(equipes)
        .sort((a, b) => b.pontos - a.pontos)
        .map(equipe => `<p>${equipe.nome}: ${equipe.pontos} pontos</p>`).join('');
    const vencedor = Object.values(equipes).reduce((a, b) => a.pontos > b.pontos ? a : b);
    document.getElementById('vencedor').textContent = `A equipe vencedora é: ${vencedor.nome}!`;
    mudarTela('tela-final');
}

// --- Eventos de Botões e Inicialização ---

document.getElementById('btn-enviar-voto').addEventListener('click', () => {
    clearInterval(cronometro);
    gerarPainelControle();
});

document.getElementById('btn-iniciar').addEventListener('click', iniciarJogo);
document.getElementById('btn-configurar-proxima').addEventListener('click', confirmarConfiguracao);
document.getElementById('btn-ver-noticia').addEventListener('click', iniciarRodada);
document.getElementById('btn-proxima-rodada').addEventListener('click', iniciarRodada);

document.addEventListener('click', (event) => {
    if (event.target.classList.contains('avatar-escolha')) {
        const equipeId = event.target.dataset.equipe;
        document.querySelectorAll(`.avatar-escolha[data-equipe="${equipeId}"]`).forEach(el => {
            el.classList.remove('selecionado');
        });
        event.target.classList.add('selecionado');
    }
});

document.addEventListener('DOMContentLoaded', () => {
    gerarPerfisSuspeitos();
});