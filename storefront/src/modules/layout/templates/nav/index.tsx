"use client";

import SideMenu from "./side-menu";
import { useEffect, useState } from "react";
import { listCategories } from "@lib/data/categories";

export default function Nav() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function loadCategories() {
      try {
        const data = await listCategories();
        setCategories(data);
      } catch (error) {
        console.error("Failed to fetch categories", error);
      }
    }
    loadCategories();
  }, []);

  return (
    <header className="bg-dark-gray text-gold sticky top-0 z-50">
      <div className="flex items-center justify-between p-4">
        {/* Logo */}
        <a href="/" className="text-2xl font-bold">
          Frisianumismatica
        </a>

        {/* Zoekbalk (alleen desktop) */}
        <form action="/search" method="GET" className="hidden md:block flex-grow mx-4 max-w-lg">
          <input
            type="text"
            name="q"
            placeholder="Zoeken..."
            className="w-full px-3 py-2 border border-gold rounded-md bg-gray-800 text-gold"
          />
        </form>

        {/* Account en Winkelmandje */}
        <div className="flex items-center space-x-4">
          <a href="/account" className="hover:underline">
            Account
          </a>
          <a href="/cart" className="hover:underline">
            Winkelmandje
          </a>
        </div>

        {/* Hamburger menu (alleen mobiel) */}
        <div className="block md:hidden">
          <SideMenu />
        </div>
      </div>

      {/* Navigatiebalk (alleen desktop) */}
      <nav className="hidden md:block bg-gray-900 text-white">
        <ul className="flex space-x-4 p-4">
          {categories.map((category) => (
            <li key={category.id} className="group relative">
              <a
                href={`/category/${category.handle}`}
                className="hover:underline"
              >
                {category.name}
              </a>
              {category.category_children?.length > 0 && (
                <ul className="absolute left-0 mt-2 bg-white text-black shadow-lg hidden group-hover:block">
                  {category.category_children.map((sub) => (
                    <li key={sub.id} className="px-4 py-2 hover:bg-gray-200">
                      <a href={`/category/${sub.handle}`}>{sub.name}</a>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
