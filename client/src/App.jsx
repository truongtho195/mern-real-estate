import './App.css'
// import Navbar from './components/navbar/Navbar.jsx'
import Layout from './pages/layout/Layout.jsx';
import HomePage from './pages/homePage/homePage.jsx'
import ListPage from './pages/listPage/listPage.jsx';
import SinglePage from './pages/singlePage/SinglePage.jsx';
import ProfilePage from './pages/profile/ProfilePage.jsx';
import RegisterPage from './pages/registerPage/registerPage.jsx';
import LoginPage from './pages/loginPage/loginPage.jsx';
import {createBrowserRouter,RouterProvider,} from 'react-router-dom';

function App() {
  

  const router = createBrowserRouter([
    {
      path:"/",
      element: <Layout/>,
      children:[
        {
          path:"/",
          element:<HomePage/>
        },
        {
          path:"/list",
          element:<ListPage/>
        },
        {
          path:"/singlePage",
          element:<SinglePage/>
        },
        {
          path:"/profile",
          element:<ProfilePage/>
        },
        {
          path:"/register",
          element:<RegisterPage/>
        },
        {
          path:"/login",
          element:<LoginPage/>
        }

    ],
    },
    
  ]);
  return (
    <RouterProvider router={router}/>
  );

  // return (
  //   //container
  //   <div className='layout container mx-auto flex flex-col'>
  //     <div className='navbar'> 
  //       <Navbar/>
  //     </div>
  //     <div className='content'>
  //       <HomePage/> 
  //     </div>     
  //   </div>
  // )
}

export default App
