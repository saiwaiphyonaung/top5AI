
import { useEffect } from 'react';

interface SeoProps {
  title: string;
  description: string;
  canonical?: string;
  schemas?: object[];
}

const BASE_URL = window.location.origin + window.location.pathname;

export const useSeo = ({ title, description, canonical, schemas = [] }: SeoProps) => {
  useEffect(() => {
    document.title = title;

    const setMeta = (nameOrProperty: string, content: string) => {
        let element = document.querySelector(`meta[name="${nameOrProperty}"]`) || document.querySelector(`meta[property="${nameOrProperty}"]`);
        if (!element) {
            element = document.createElement('meta');
            if (nameOrProperty.startsWith('og:')) {
                element.setAttribute('property', nameOrProperty);
            } else {
                element.setAttribute('name', nameOrProperty);
            }
            document.head.appendChild(element);
        }
        element.setAttribute('content', content);
    };

    const setLink = (rel: string, href: string) => {
        let element = document.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
        if (!element) {
            element = document.createElement('link');
            element.rel = rel;
            document.head.appendChild(element);
        }
        element.href = href;
    };
    
    // Standard Meta
    setMeta('description', description);
    
    // Canonical URL
    const canonicalUrl = canonical ? `${BASE_URL}${canonical}` : BASE_URL;
    setLink('canonical', canonicalUrl);

    // Open Graph
    setMeta('og:title', title);
    setMeta('og:description', description);
    setMeta('og:url', canonicalUrl);
    setMeta('og:type', 'website');
    setMeta('og:image', 'https://picsum.photos/seed/top5ai-og/1200/630'); // Placeholder OG image

    // Twitter Card
    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:title', title);
    setMeta('twitter:description', description);
    setMeta('twitter:image', 'https://picsum.photos/seed/top5ai-twitter/1200/600'); // Placeholder Twitter image
    
    // JSON-LD Schema
    const scriptElements = document.querySelectorAll('script[type="application/ld+json"]');
    scriptElements.forEach(e => e.remove());

    schemas.forEach((schema, index) => {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.id = `schema-${index}`;
      script.innerHTML = JSON.stringify(schema);
      document.head.appendChild(script);
    });

    return () => {
      // Clean up schema scripts on component unmount
      schemas.forEach((_, index) => {
        const script = document.getElementById(`schema-${index}`);
        if(script) script.remove();
      });
    };
  }, [title, description, canonical, schemas]);
};
