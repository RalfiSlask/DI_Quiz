import { createHashRouter } from 'react-router-dom';
import FinalPage from './components/FinalPage';
import Home from './components/Home';
import Layout from './components/Layout';
import NotFound from './components/NotFound';
import Questions from './components/Questions';

export const router = createHashRouter([
  {
    path: '/',
    element: <Layout></Layout>,
    errorElement: <NotFound></NotFound>,
    children: [
      {
        path: '/',
        element: <Home></Home>,
      },
      {
        path: '/fragor',
        element: <Questions />,
      },
      {
        path: '/resultat',
        element: <FinalPage />,
      },
    ],
  },
]);
