import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { verifyAuthCookie } from '../utils/auth';

const page = () => {
  const router = useRouter();

  useEffect(() => {
    // Ao carregar a página, verifique se o usuário está autenticado.
    // Se não estiver autenticado, redirecione-o para a página de login.
    const userId = verifyAuthCookie(document);
    if (!userId) {
      router.push('/login');
    }
  }, []);

  return (
    <div>
      <h1>Página Protegida</h1>
      <p>Esta página só é acessível para usuários autenticados.</p>
    </div>
  );
};

export default page;