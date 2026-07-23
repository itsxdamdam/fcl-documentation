"use client";

import { MenuChild } from "@/Lib/menuData";

interface Props {
  data: MenuChild[];
}

interface CardItemProps {
  item: MenuChild;
  level?: number;
}

function CardItem({ item, level = 0 }: CardItemProps) {
  return (
    <div
      key={item.id}
      id={`card-${item.id}`}
      style={{
        marginBottom: "40px",
        paddingTop: "20px",
        scrollMarginTop: "80px",
      }}
    >
      <div
        id={item.id}
        style={{
          scrollMarginTop: "80px",
        }}
      >
        <h2
          style={{
            fontSize: level === 0 ? "20px" : "16px",
            fontWeight: 700,
            marginBottom: "8px",
          }}
        >
          {item.method && (
            <span
              style={{
                fontSize: "11px",
                fontWeight: 700,
                color: "#fff",
                backgroundColor: "#d97706",
                padding: "2px 6px",
                borderRadius: "4px",
                marginRight: "8px",
              }}
            >
              {item.method}
            </span>
          )}

          {item.title}
        </h2>

        {item.url && (
          <code
            style={{
              fontSize: "13px",
              color: "#666",
            }}
          >
            {item.url}
          </code>
        )}

        {item.content && (
          <p
            style={{
              fontSize: "14px",
              color: "#444",
              marginTop: "8px",
              marginBottom: "20px",
            }}
          >
            {item.content}
          </p>
        )}
      </div>

      {item.children && item.children.length > 0 && (
        <div
          style={{
            marginLeft: level === 0 ? "0px" : "20px",
            marginTop: "20px",
          }}
        >
          {item.children.map((child) => (
            <CardItem key={child.id} item={child} level={level + 1} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function Card({ data }: Props) {
  return (
    <div>
      {data.map((section) => (
        <CardItem key={section.id} item={section} level={0} />
      ))}
    </div>
  );
}
