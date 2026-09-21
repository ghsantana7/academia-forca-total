const menuBotao = document.querySelector('#menuBotao');
const menu = document.querySelector('#menu');
const formulario = document.querySelector('#formularioContato');
const mensagemFormulario = document.querySelector('#mensagemFormulario');
const instalarApp = document.querySelector('#instalarApp');

let avisoInstalacao;

menuBotao.addEventListener('click', () => {
  const aberto = menu.classList.toggle('aberto');
  menuBotao.setAttribute('aria-expanded', String(aberto));
  menuBotao.setAttribute('aria-label', aberto ? 'Fechar menu' : 'Abrir menu');
});

menu.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    menu.classList.remove('aberto');
    menuBotao.setAttribute('aria-expanded', 'false');
    menuBotao.setAttribute('aria-label', 'Abrir menu');
  });
});

formulario.addEventListener('submit', (evento) => {
  evento.preventDefault();
  const nome = document.querySelector('#nome').value.trim().split(' ')[0];
  mensagemFormulario.textContent = `Tudo certo, ${nome}! Em breve entraremos em contato.`;
  formulario.reset();
});

window.addEventListener('beforeinstallprompt', (evento) => {
  evento.preventDefault();
  avisoInstalacao = evento;
  instalarApp.hidden = false;
});

instalarApp.addEventListener('click', async () => {
  if (!avisoInstalacao) return;
  avisoInstalacao.prompt();
  await avisoInstalacao.userChoice;
  avisoInstalacao = null;
  instalarApp.hidden = true;
});

window.addEventListener('appinstalled', () => {
  instalarApp.hidden = true;
  avisoInstalacao = null;
});

document.querySelector('#anoAtual').textContent = new Date().getFullYear();

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js').catch((erro) => {
      console.error('Não foi possível registrar o Service Worker:', erro);
    });
  });
}
