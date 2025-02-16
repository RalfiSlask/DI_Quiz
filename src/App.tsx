import { RouterProvider } from 'react-router-dom';
import { router } from './Router';
import { QuestionsProvider } from './context/Context';

function App() {
  return (
    <>
      <QuestionsProvider>
        <RouterProvider router={router}></RouterProvider>
      </QuestionsProvider>
    </>
  );
}

export default App;
