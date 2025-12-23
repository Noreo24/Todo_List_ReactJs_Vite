import Header from './components/layout/header';
import Footer from './components/layout/footer';
import { Outlet } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { AuthContext } from './components/context/auth.context';
import { getAccountAPI } from './services/api.service';
import { Spin } from 'antd';

// Sử dụng component bên trong component khác
// Component cha (App) sử dụng component con (MyComponent)
const App = () => {

  const { setUser, appLoading, setAppLoading } = useContext(AuthContext);

  useEffect(() => {
    fetchAccount();
  }, []);

  const fetchAccount = async () => {
    const res = await getAccountAPI();
    if (res.data) {
      setUser(res.data.user);
    }
    setAppLoading(false);
  }
  return (
    <>
      {
        appLoading === true ?
          <div style={{ position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
            <Spin tip="Loading..." size="large" />
          </div>
          :
          <>

            <Header />
            <Outlet />
            <Footer />
          </>
      }
    </>
  )
}

export default App
