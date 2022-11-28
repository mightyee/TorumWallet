import React, { useEffect } from 'react';
import AppNavigation from './src/navigation'
import { ThemeProvider } from './src/theme/Theme';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ToastProvider } from './src/contexts/ToastContext';
import Toast from './src/components/Toast';

const App = () => {

  const queryClient = new QueryClient();

  return (
    <ToastProvider>
      <Toast />
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <AppNavigation />
        </ThemeProvider>
      </QueryClientProvider>
    </ToastProvider>
  );
};

export default App;
