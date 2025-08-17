"use client";

import Link from "next/link";

const dropdowns = [
  {
    title: "Brands",
    items: [
      { label: "Apple", href: "#brand1" },
      { label: "Samsung", href: "#brand2" },
      { label: "LG", href: "#brand5" },
      { label: "Tecno", href: "#brand3" },
      { label: "Infinix 4", href: "#brand4" },
    ],
  },
  {
    title: "Phones & Tablets",
    items: [
      { label: "iOS", href: "#phone1" },
      { label: "Androids", href: "#phone2" },
      { label: "Samsung", href: "#phone3" },
      { label: "Tablets", href: "#phone4" },
      { label: "Others", href: "#phone5" },
    ],
  },
  {
    title: "Desktops & Laptops",
    items: [
      { label: "Macbook", href: "#desktop1" },
      { label: "Laptop", href: "#desktop2" },
      { label: "Desktops", href: "#desktop3" },
      { label: "I/O Devices", href: "#desktop4" },
    ],
  },
  {
    title: "Accessories",
    items: [
      { label: "Mobile", href: "#accessory1" },
      { label: "Computing", href: "#accessory2" },
      { label: "Gaming", href: "#accessory3" },
      { label: "Home", href: "#accessory4" },
      { label: "Others", href: "#accessory5" },
    ],
  },
];

const CustomNavbar: React.FC = () => {
  return (
    <nav className="hidden lg:block bg-white rounded-full px-6 py-2 shadow-lg mx-auto max-w-fit z-10">
      <ul className="flex items-center gap-8">
        {dropdowns.map((dropdown) => (
          <li key={dropdown.title} className="relative group">
            <button
              className="font-semibold text-gray-700 hover:text-green-700 focus:outline-none"
              tabIndex={0}
            >
              {dropdown.title}
            </button>
            <ul className="absolute left-0 mt-2 bg-white rounded-lg shadow-lg opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition pointer-events-none group-hover:pointer-events-auto group-focus-within:pointer-events-auto min-w-[180px]">
              {dropdown.items.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="block px-4 py-2 text-gray-700 hover:bg-green-50 hover:text-green-700 transition rounded"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default CustomNavbar;
