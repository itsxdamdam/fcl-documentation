"use client";

import { useEffect, useRef, useState } from "react";
import Sidebar from "../components/Sidebar";
import Card from "../components/card/Cardcomp";
import { menuData } from "../Lib/menuData";

// Flatten every trackable id (sections, items, and nested children) in document order
function getAllTrackableIds(): string[] {
  const ids: string[] = [];
  for (const section of menuData) {
    ids.push(section.id);
    for (const item of section.children) {
      ids.push(item.id);
      if (item.children) {
        for (const child of item.children) {
          ids.push(child.id);
        }
      }
    }
  }
  return ids;
}

export default function Home() {
  const [activeId, setActiveId] = useState<string | null>(menuData[0]?.id ?? null);
  const isClickScrolling = useRef(false);
  const clickTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Click in sidebar -> smooth scroll content to that section
  const handleContent = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      isClickScrolling.current = true;
      setActiveId(id);
      el.scrollIntoView({ behavior: "smooth", block: "start" });

      // Re-enable scroll-spy tracking shortly after the smooth scroll settles
      if (clickTimeout.current) clearTimeout(clickTimeout.current);
      clickTimeout.current = setTimeout(() => {
        isClickScrolling.current = false;
      }, 700);
    }
  };

  // Scroll-spy: watch every section/item and update activeId as the user scrolls
  useEffect(() => {
    const ids = getAllTrackableIds();
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    const visibleMap = new Map<string, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        if (isClickScrolling.current) return;

        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            visibleMap.set(entry.target.id, entry.intersectionRatio);
          } else {
            visibleMap.delete(entry.target.id);
          }
        });

        if (visibleMap.size > 0) {
          // Pick whichever visible section appears first in document order,
          // so "next item" activates as soon as the previous one scrolls past.
          const topMostId = ids.find((id) => visibleMap.has(id));
          if (topMostId) {
            setActiveId((prev) => (prev === topMostId ? prev : topMostId));
          }
        }
      },
      {
        root: null,
        // Trigger when a section enters the upper portion of the viewport,
        // so it switches as soon as the previous section's content has scrolled past.
        rootMargin: "-15% 0px -70% 0px",
        threshold: [0, 0.1, 0.5, 1],
      }
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <main
      style={{
        display: "flex",
        minHeight: "100vh",
      }}
    >
      <Sidebar handleContent={handleContent} activeId={activeId} />

      <div
        style={{
          flex: 1,
          padding: "40px",
          maxWidth: "720px",
        }}
      >
        <Card data={menuData} />
      </div>

      <div
        style={{
          minHeight: "100vh",
          backgroundColor: "#159890",
          width: "500px",
          position: "sticky",
          top: 0,
        }}
      />
    </main>
  );
}
// export default function RootLayout({ children }) {
//   return (
//     <html lang="en">
//       <body className="pt-16"> {/* Matches the h-16 (64px) of your navbar */}
//         <Navbar />
//         <main className="container mx-auto px-4 py-8">
//           {children}
//         </main>
//       </body>
//     </html>
//   );
// }
