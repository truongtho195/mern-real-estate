import './App.css'
// import Navbar from './components/navbar/Navbar.jsx'
import Layout from './pages/layout/Layout.jsx';
import HomePage from './pages/homePage'
import ListPage from './pages/listPage/listPage.jsx';
import SinglePage from './pages/singlePage/SinglePage.jsx';
import ProfilePage from './pages/profile/ProfilePage.jsx';
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
