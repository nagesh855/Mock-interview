import { useEffect } from 'react';

export default function useTheme(name) {
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', name);
  }, [name]);
}