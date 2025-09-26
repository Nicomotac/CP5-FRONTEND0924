
export default function PaginaInicial(){
    return(
        <section className="grid md:grid-cols-2 gap-8 items-start">
            <body>
                <h1 className="text-3xl font-semibold mb-4">
                    Bem-vindo ao Hospital das Clínicas
                </h1>
                <p className="text-gray-700 mb-3">
                    Excelência em saúde, ensino e pesquisa. Nosso corpo clínico e equipes
                    multiprofissionais atuam 24h para oferecer atendimento humanizado.
                </p>
                <p className="text-gray-700">
                 Confira também o cadastro de funcionários do hospital — mantenha
                registros atualizados e garanta a gestão eficiente de pessoas.
                </p>
            </body>

            <img className="w-full rounded-2xl shadow" src="https://www.educacao.sp.gov.br/wp-content/uploads/2020/10/37878126725_16c0583b18_k.jpg" alt="Hospital" />

        </section>
        
    );
}