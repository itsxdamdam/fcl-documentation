"use client";

import { useEffect, useRef, useState } from "react";
import Sidebar from "../components/Sidebar";
import Card from "../components/card/Cardcomp";
import { MenuChild, menuData } from "../Lib/menuData";
import CodePart from "../components/card/codepart";

function getAllTrackableIds(items: MenuChild[] = menuData): string[] {
  const ids: string[] = [];

  items.forEach((item) => {
    ids.push(item.id);

    if (item.children?.length) {
      ids.push(...getAllTrackableIds(item.children));
    }
  });

  return ids;
}

export default function Home() {
  const [activeId, setActiveId] = useState<string | null>(
    menuData[0]?.id ?? null,
  );

  const isClickScrolling = useRef(false);

  const clickTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleContent = (id: string) => {
    const el = document.getElementById(`card-${id}`);

    if (el) {
      isClickScrolling.current = true;

      setActiveId(id);

      el.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });

      if (clickTimeout.current) {
        clearTimeout(clickTimeout.current);
      }

      clickTimeout.current = setTimeout(() => {
        isClickScrolling.current = false;
      }, 700);
    }
  };

  useEffect(() => {
    const ids = getAllTrackableIds();

    const elements = ids
      .map((id) => document.getElementById(`card-${id}`))
      .filter((el): el is HTMLElement => el !== null);

    const visibleMap = new Map<string, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        if (isClickScrolling.current) {
          return;
        }

        entries.forEach((entry) => {
          const id = entry.target.id.replace("card-", "");

          if (entry.isIntersecting) {
            visibleMap.set(id, entry.intersectionRatio);
          } else {
            visibleMap.delete(id);
          }
        });

        if (visibleMap.size > 0) {
          const topMostId = ids.find((id) => visibleMap.has(id));

          if (topMostId) {
            setActiveId((prev) => (prev === topMostId ? prev : topMostId));
          }
        }
      },
      {
        root: null,
        rootMargin: "-15% 0px -70% 0px",
        threshold: [0, 0.1, 0.5, 1],
      },
    );

    elements.forEach((el) => observer.observe(el));

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <main
      style={{
        display: "flex",
        minHeight: "100vh",
        paddingTop: "50px",
        backgroundColor: "#fff",
      }}
    >
      <Sidebar handleContent={handleContent} activeId={activeId} />

      <section
        style={{
          flex: 1,
          minWidth: 0,
          padding: "40px",
          maxWidth: "600px",
          boxSizing: "border-box",
        }}
      >
        <Card data={menuData} />
      </section>

      <aside
        style={{
          width: "50%",
          minWidth: "500px",
          position: "sticky",
          top: "50px",
          height: "calc(100vh - 50px)",
          overflow: "hidden",
          boxSizing: "border-box",
        }}
      >
        <CodePart activeId={activeId} />
      </aside>
    </main>
  );
}
