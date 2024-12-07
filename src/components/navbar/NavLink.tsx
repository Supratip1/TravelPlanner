import React from 'react';

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
}

export function NavLink({ href, children, onClick }: NavLinkProps) {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      if (onClick) onClick();
    }
  };

  return (
    <a 
      href={href} 
      onClick={handleClick}
      className="relative px-3 py-2 text-white/80 hover:text-white transition-colors group"
    >
      <span className="relative z-10">{children}</span>
      <span className="absolute inset-x-0 bottom-0 h-0.5 bg-purple-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
    </a>
  );
}