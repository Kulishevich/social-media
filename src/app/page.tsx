import Auth from "@/components/auth/Auth";
import Loader from "@/components/Loader/Loader";
import dynamic from "next/dynamic";
// import '../firebase'

const AuthPage = dynamic(() => import('../components/auth/Auth'), {
  loading: () => <Loader/>, // Компонент-заполнитель, отображаемый во время загрузки
  ssr: false, // Отключение серверного рендеринга для этого компонента (опционально)
});

export default function Home() {
  return (
    <main>
      <AuthPage/>
    </main>
  );
}
