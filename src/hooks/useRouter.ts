import { useState, useEffect } from 'react';
import { Route } from '@/types';

export const useRouter = () => {
  const [route, setRoute] = useState<Route>({ view: 'home', params: {} });

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(2); // Remove '#/'
      const parts = hash.split('/');
      const view = parts[0] || 'home';
      const param = parts[1];

      if (view === 'snippets' && param) {
        setRoute({ view: 'snippet', params: { id: param } });
      } else if (view === 'tags' && param) {
        setRoute({ view: 'tag', params: { name: param } });
      } else if (view === 'profiles' && param) {
        setRoute({ view: 'profile', params: { email: param } });
      } else {
        setRoute({ view: 'home', params: {} });
      }
      
      window.scrollTo(0, 0);
    };

    handleHashChange(); // Initial load
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  return route;
};