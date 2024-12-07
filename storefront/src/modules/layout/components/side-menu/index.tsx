import { useState } from "react";
import { listCategories } from "@lib/data/categories";

export default function SideMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [categories, setCategories] = useState([]);

  // Laad categorieën bij openen van het menu
  const loadCategories = async () => {
    if (categories.length === 0) {
      try {
        const data = await listCategories();
        setCategories(data);
      } catch (error) {
        console.error("Failed to load categories", error);
      }
    }
  };

  return (
    <>
      {/* Hamburger knop */}
      <button
        onClick={() => {
          setIsOpen(!isOpen);
          loadCategories();
        }}
        className="p-2 text-gold md:hidden"
      >
        ☰
      </button>

      {/* Sidebar */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-dark-gray text-gold p-4 overflow-y-auto">
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-4 right-4 text-xl font-bold"
          >
            ✕
          </button>
          <h2 className="text-lg font-bold mb-4">Categorieën</h2>
          <ul>
            {categories.map((category) => (
              <li key={category.id} className="mb-2">
                <a href={`/category/${category.handle}`} className="hover:underline">
                  {category.name}
                </a>
                {category.category_children?.length > 0 && (
                  <ul className="ml-4">
                    {category.category_children.map((sub) => (
                      <li key={sub.id} className="hover:underline">
                        <a href={`/category/${sub.handle}`}>{sub.name}</a>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
          <div className="mt-4">
            <a href="/account" className="block hover:underline">
              Mijn Account
            </a>
            <a href="/cart" className="block hover:underline">
              Winkelmandje
            </a>
          </div>
        </div>
      )}
    </>
  );
}
