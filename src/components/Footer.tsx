// src/components/Footer.tsx

import React from 'react';

export function Footer() {
  return (
    <footer className="bg-purple-900 text-white py-6">
      <div className="container mx-auto text-center">
        <h4 className="text-2xl font-bold mb-2">Dream Travel</h4>
        <p className="text-lg mb-4">"Embark on Your Next Great Adventure with Us"</p>
        <p className="text-sm mb-2">© {new Date().getFullYear()} Dream Travel. All rights reserved.</p>
        <p className="text-xs">Created by Supratip</p>
      </div>
    </footer>
  );
}
