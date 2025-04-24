document.getElementById('form-agendamento').addEventListener('submit', function(e) {
    e.preventDefault();

    const nome = document.getElementById('nome').value;
    const servico = document.getElementById('servico').value;
    const data = document.getElementById('data').value;
    const hora = document.getElementById('hora').value;

    // Monta datas para o Google Calendar (30 minutos de duração)
    const start = new Date(`${data}T${hora}`);
    const end = new Date(start.getTime() + 30 * 60000);

    function formatDateGoogle(d) {
        // Retorna no formato YYYYMMDDTHHmmssZ (UTC)
        return d.toISOString().replace(/-|:|\.\d\d\d/g, "");
    }

    const startStr = formatDateGoogle(start);
    const endStr = formatDateGoogle(end);

    // Link para o Google Calendar (preenchido)
    const calendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=Agendamento+${encodeURIComponent(servico)}+-+${encodeURIComponent(nome)}&dates=${startStr}/${endStr}&details=Agendamento+de+${encodeURIComponent(servico)}+realizado+por+${encodeURIComponent(nome)}&location=Barbearia+Oficina+do+Corte`;

    window.open(calendarUrl, '_blank');

    // Mensagem para o WhatsApp
    const dataFormatada = data.split('-').reverse().join('/');
    const mensagem = `Olá! Meu nome é ${nome} e gostaria de agendar um horário para ${servico} em ${dataFormatada} às ${hora}.`;
    const whatsappUrl = `https://wa.me/558193060011?text=${encodeURIComponent(mensagem)}`;

    window.open(whatsappUrl, '_blank');
});