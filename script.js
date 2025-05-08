const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');

mobileMenuButton.addEventListener('click', () => {
  mobileMenu.classList.toggle('hidden');
});

const mobileLinks = mobileMenu.querySelectorAll('a');
mobileLinks.forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.add('hidden');
  });
});

const themeToggle = document.getElementById('theme-toggle');
const themeToggleMobile = document.getElementById('theme-toggle-mobile');
const html = document.documentElement;

function toggleTheme() {
  if (html.classList.contains('dark')) {
    html.classList.remove('dark');
    themeToggle.classList.add('light');
    themeToggleMobile.classList.add('light');
    localStorage.setItem('theme', 'light');
  } else {
    html.classList.add('dark');
    themeToggle.classList.remove('light');
    themeToggleMobile.classList.remove('light');
    localStorage.setItem('theme', 'dark');
  }
}

themeToggle.addEventListener('click', toggleTheme);
themeToggleMobile.addEventListener('click', toggleTheme);

const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
  html.classList.add('dark');
  themeToggle.classList.remove('light');
  themeToggleMobile.classList.remove('light');
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();

    const targetId = this.getAttribute('href');
    if (targetId === '#') return;

    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  });
});

const sections = document.querySelectorAll('section');
sections.forEach(section => {
  section.classList.add('section-fade-in');
});

const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

sections.forEach(section => {
  observer.observe(section);
});

const skillBars = document.querySelectorAll('.skill-bar');

const skillObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const width = entry.target.style.width;
      entry.target.style.width = '0';
      setTimeout(() => {
        entry.target.style.width = width;
      }, 100);
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

skillBars.forEach(bar => {
  skillObserver.observe(bar);
});

const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 10) {
    navbar.classList.add('shadow-md');
  } else {
    navbar.classList.remove('shadow-md');
  }
});

// const contactForm = document.querySelector('form');
// if (contactForm) {
//   contactForm.addEventListener('submit', function(e) {
//     e.preventDefault();

//     const nameInput = document.getElementById('name');
//     const emailInput = document.getElementById('email');
//     const subjectInput = document.getElementById('subject');
//     const messageInput = document.getElementById('message');

//     if (!nameInput.value || !emailInput.value || !messageInput.value) {
//       alert('Por favor, preencha todos os campos obrigatÃ³rios.');
//       return;
//     }

//     const submitButton = contactForm.querySelector('button[type="submit"]');
//     const originalText = submitButton.innerHTML;

//     submitButton.disabled = true;
//     submitButton.innerHTML = 'Enviando...';

//     setTimeout(() => {
//       alert('Mensagem enviada com sucesso! Obrigado pelo contato.');
//       contactForm.reset();
//       submitButton.disabled = false;
//       submitButton.innerHTML = originalText;
//     }, 1500);
//   });
// }

const nomeMeses = ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"];

document.querySelectorAll(".data-experiencia").forEach(el => {
    const [anoInicio, mesInicio] = el.dataset.inicio.split("-").map(Number);
    const inicio = new Date(anoInicio, mesInicio - 1);

    let fim;
    if (el.dataset.fim) {
        const [anoFim, mesFim] = el.dataset.fim.split("-").map(Number);
        fim = new Date(anoFim, mesFim - 1);
    } else {
        fim = new Date();
    }

    let anos = fim.getFullYear() - inicio.getFullYear();
    let meses = fim.getMonth() - inicio.getMonth();

    if (meses < 0) {
        anos--;
        meses += 12;
    }

    const inicioStr = `${nomeMeses[inicio.getMonth()]} de ${inicio.getFullYear()}`;
    const fimStr = el.dataset.fim ?
        `${nomeMeses[fim.getMonth()]} de ${fim.getFullYear()}` :
        "o momento";

    let duracao = "";
    if (anos > 0)
        duracao += `${anos} ano${anos > 1 ? 's' : ''}`;
    if (meses > 0) {
        if (duracao)
            duracao += " ";
        duracao += `${meses} ${meses > 1 ? 'meses' : 'mês'}`;
    }

    el.textContent = `${inicioStr} - ${fimStr} · ${duracao}`;
});

function formatarWhatsapp(e) {
  let valor = e.target.value.replace(/\D/g, "");

  if (valor.length > 11) {
    valor = valor.slice(0, 11);
  }

  if (valor.length <= 10) {
    valor = valor.replace(/^(\d{2})(\d{4})(\d{0,4})/, "($1) $2-$3");
  } else {
    valor = valor.replace(/^(\d{2})(\d{5})(\d{0,4})/, "($1) $2-$3");
  }

  e.target.value = valor;
}

function permitirSomenteNumeros(e) {
  const codigo = e.charCode ? e.charCode : e.keyCode;
  if (codigo < 48 || codigo > 57) {
    e.preventDefault();
  }
}