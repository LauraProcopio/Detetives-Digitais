# 🔎 Detetives Digitais: O Jogo

Este é um jogo interativo para desktop, desenvolvido em JavaScript, HTML e CSS, projetado para ser uma dinâmica de 15 a 20 minutos para turmas do ensino médio. O objetivo é combater a desinformação digital, incentivando o pensamento crítico e a análise de dados.

## 🎮 Como Funciona o Jogo (Guia do Facilitador)

O jogo é exibido em um telão e controlado pelo professor, que atua como o mediador.

### 1. Configuração Inicial
- A turma é dividida em equipes (o número padrão é 5, mas pode ser alterado no código).
- Na tela de configuração, o professor insere o nome de cada equipe e seleciona um avatar para ela.

### 2. Fluxo das Rodadas (3 Rodadas)
- **Apresentação dos Suspeitos:** O jogo exibe 3 "Personas Digitais" em formato de perfil de rede social. As equipes têm cerca de 1 minuto para analisar as pistas.
- **Rodada da Notícia:** Uma notícia, que pode ser falsa ou verdadeira, é projetada na tela. Um cronômetro de 2 minutos é iniciado.
- **Fase de Investigação:** As equipes discutem e chegam a uma conclusão:
    1. Qual suspeito compartilhou a notícia.
    2. Se a notícia é Fake ou Verdadeira.
- **Painel do Professor:** Quando o tempo acaba (ou o professor clica em "Enviar Voto"), um painel de controle surge na mesma tela. Nele, o professor deve registrar a resposta de cada equipe.
- **Revelação e Pontuação:** Ao clicar em "Registrar e Revelar", o jogo exibe a resposta correta e a pontuação de cada equipe na tela.
    - Acertar o suspeito: **+2 pontos**
    - Acertar se a notícia é Fake ou Verdadeira: **+2 pontos**

### 3. Finalização
Após 3 rodadas, o jogo exibe o placar final e declara a equipe vencedora como "Mestre dos Detetives Digitais".

## 🛠️ Recursos e Funcionalidades

- **Interface Intuitiva:** Telas claras e fáceis de navegar.
- **Estilo Detetive:** Design com cores escuras e tipografia que remete a um ambiente de investigação.
- **Conteúdo Dinâmico:** Perfis e notícias gerados dinamicamente via JavaScript.
- **Painel de Controle:** Ferramenta para o professor registrar as respostas de cada equipe de forma prática.
- **Sistema de Pontuação:** Cálculo automático dos pontos por rodada.
- **Cronômetro:** Temporizador de 2 minutos por rodada para manter o ritmo da dinâmica.
- **Efeitos Sonoros:** Áudios para a revelação dos resultados, tornando a experiência mais imersiva.

## 🚀 Instalação e Execução (Guia do Desenvolvedor)

Este projeto não requer servidor nem bibliotecas externas, além do JavaScript puro.

### Pré-requisitos
- Um editor de código (como VS Code)
- Um navegador web moderno (como Chrome ou Firefox)

### Estrutura de Pastas
Certifique-se de que sua estrutura de arquivos está da seguinte forma:
