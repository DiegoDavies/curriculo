const nomeMeses = ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"];

document.querySelectorAll(".data-experiencia").forEach(el => {
    const [anoInicio, mesInicio] = el.dataset.inicio.split("-").map(Number);
    const inicio = new Date(anoInicio, mesInicio - 1);

    let fim;
    if (el.dataset.fim) {
        const [anoFim, mesFim] = el.dataset.fim.split("-").map(Number);
        fim = new Date(anoFim, mesFim - 1);
    } else {
        fim = new Date(); // usa a data atual se não tiver fim
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

document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });

            // Remove o hash da URL
            history.pushState(null, null, ' ');
        }
    });
});