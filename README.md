# Força Total Academia — Projeto Bibliotecas JavaScript

Página demonstrativa de academia para a atividade de Programação Web I. O projeto usa três bibliotecas JavaScript com funções diferentes:

| Biblioteca | Função na página | Onde testar |
| --- | --- | --- |
| [AOS 2.3.1](https://michalsnik.github.io/aos/) | Anima a entrada das seções ao rolar a página | Modalidades, planos e contato |
| [Swiper 12](https://swiperjs.com/get-started) | Transforma as modalidades em carrossel navegável por toque ou setas | Seção “Modalidades” |
| [SweetAlert2 11](https://sweetalert2.github.io/) | Exibe a confirmação em uma janela após validar o formulário | “Agendar aula gratuita” |

## Como executar

Abra `index.html` no navegador com internet. Para testar a instalação PWA, sirva os arquivos em `localhost` ou HTTPS. Exemplo: `python -m http.server 8000`, depois abra `http://localhost:8000`.

As bibliotecas são carregadas por CDN. Se alguma não carregar, a página ainda mostra as modalidades em grade e a confirmação do formulário em texto. O formulário é apenas uma demonstração: não envia nem armazena dados. A instalação PWA e os arquivos locais continuam disponíveis no modo offline, mas as bibliotecas externas precisam de conexão caso ainda não estejam em cache pelo navegador.

## Roteiro curto para apresentar

1. Abra o site e role a página para mostrar as animações de AOS.
2. Na seção de modalidades, arraste os cards e use os botões de navegação do Swiper.
3. Preencha o formulário e mostre o modal criado pelo SweetAlert2. Explique que a página demonstra o preenchimento sem enviar os dados.
4. Mostre no código as três tags `<script>` e as inicializações em `script.js`. Cada biblioteca resolve uma tarefa diferente com código pronto.
