import { FindDocIcon } from "@/components/assets/svg/FindDocIcon";
import { SaveIcon } from "@/components/assets/svg/SaveIcon";

export default function Home() {
  return (<>

    <h1 className="text-orange-500 mt-5 font-bold text-xl text-center">Home ConfSys </h1>
      <main className="flex md:flex-row sm:flex-wrap justify-between p-10 ">
        <div className="m-5">
          <div className="bg-orange-400 rounded-lg w-12 mb-3"><SaveIcon /></div>
          <h2 className="text-orange-500 mb-1 font-bold" >BACKUP ARQUIVOS </h2>
          <p className='mb-5 text-justify'>
          O backup dos documentos de configuração dos servidores é de extrema importância para garantir a continuidade e a segurança das operações de uma empresa.
          Primeiramente, ao realizar o backup dos documentos de configuração dos servidores, é possível evitar a perda de informações críticas em caso de falhas no hardware, erros humanos ou até mesmo ataques de malwares. Isso significa que a empresa estará preparada para restaurar rapidamente suas configurações e minimizar o tempo de inatividade, mantendo sua produtividade.
          </p>

          <ul>
              <li> <span className="font-bold">-</span> Proteção contra ataques de segurança;</li>
              <li> <span className="font-bold">-</span> Testes e experimentação seguros;</li>
              <li> <span className="font-bold">-</span> Realizado todo dia;</li>
              <li> <span className="font-bold">-</span> Salvo em um servidor de segurança.</li>

          </ul>
          
        </div>
        <div className="m-5">
          <div className="bg-orange-400 rounded-lg w-12 mb-3"><FindDocIcon /></div>
          <h2 className="text-orange-500 mb-1 font-bold" >VIZUALIZAÇÃO ARQUIVOS </h2>
          <p className='mb-5 text-justify'>
          Verificar os arquivos de configuração é uma tarefa importante na operação de servidores, pois permite garantir que as configurações do sistema ou de um programa estejam corretas e atualizadas. Aqui estão algumas informações sobre como realizar essa verificação de forma eficiente:
          Determine quais arquivos de configuração precisam ser verificados: Identifique os arquivos de configuração específicos que você precisa verificar.
          </p>

          <ul>
              <li><span className="font-bold">-</span> Verificar falhas;</li>
              <li><span className="font-bold">-</span> Alteração de configuração;</li>
              <li><span className="font-bold">-</span> Manter histórico.</li>
          </ul>
        </div>
      </main>


    </>
  )
}
