import { createRoot } from 'react-dom/client';
import './index.css';
import {Provider} from 'react-redux';
import { store } from './store/Store.jsx';
import Approuter from './router/Approuter.jsx'
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render( 
  <QueryClientProvider client={queryClient}>
    <Provider store={store}>
    <Approuter />
   </Provider>
  </QueryClientProvider>  
);