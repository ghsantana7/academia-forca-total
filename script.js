const menuBotao = document.querySelector('#menuBotao');
const menu = document.querySelector('#menu');
const formulario = document.querySelector('#formularioContato');
const mensagemFormulario = document.querySelector('#mensagemFormulario');
const instalarApp = document.querySelector('#instalarApp');

// AOS anima os blocos quando entram na tela. Respeita a preferência por menos movimento.
if (window.AOS && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  AOS.init({ duration: 650, once: true, offset: 70 });
}

// Swiper permite percorrer as modalidades pelo toque ou pelos botões.
if (window.Swiper) {
  const controles = document.querySelector('.controles-modalidades');
  const carrossel = document.querySelector('.modalidades-carrossel');
  carrossel.classList.add('swiper-ready');
  controles.hidden = false;
  new Swiper(carrossel, {
    slidesPerView: 1,
    spaceBetween: 16,
    navigation: {
      nextEl: '.carrossel-proximo',
      prevEl: '.carrossel-anterior'
    },
    pagination: {
      el: '.carrossel-paginacao',
      type: 'fraction'
    },
    breakpoints: {
      700: { slidesPerView: 1.5 },
      1100: { slidesPerView: 2.25 }
    }
  });
}

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
  const mensagem = `${nome}, esta é uma demonstração: seus dados não foram enviados.`;
  mensagemFormulario.textContent = mensagem;
  // SweetAlert2 mostra um modal de confirmação para o formulário demonstrativo.
  if (window.Swal) {
    Swal.fire({
      title: 'Formulário preenchido!',
      text: mensagem,
      icon: 'success',
      confirmButtonText: 'Entendi',
      confirmButtonColor: '#e52727',
      background: '#171717',
      color: '#f5f5f3'
    });
  }
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
