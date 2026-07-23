import { type MenuChild } from "@/Lib/menuData";
import { structuredMenu } from "./menuStructure";

// The source data contains duplicate `id` values (e.g. two `authentication-service`
// sections). Raw ids would collide as React keys and DOM ids and break scroll-spy,
// so every node gets a unique, path-derived `_key` used everywhere for identity.
export type AnnotatedNode = Omit<MenuChild, "children"> & {
  _key: string;
  children?: AnnotatedNode[];
};

function annotate(nodes: MenuChild[], prefix: string): AnnotatedNode[] {
  return nodes.map((node, index) => {
    const _key = prefix ? `${prefix}-${index}` : `${index}`;

    return {
      ...node,
      _key,
      children: node.children ? annotate(node.children, _key) : undefined,
    };
  });
}

export const annotatedMenu: AnnotatedNode[] = annotate(structuredMenu, "");

export function flatten(nodes: AnnotatedNode[] = annotatedMenu): AnnotatedNode[] {
  const out: AnnotatedNode[] = [];

  nodes.forEach((node) => {
    out.push(node);

    if (node.children?.length) {
      out.push(...flatten(node.children));
    }
  });

  return out;
}

export function findByKey(
  key: string,
  nodes: AnnotatedNode[] = annotatedMenu,
): AnnotatedNode | null {
  for (const node of nodes) {
    if (node._key === key) {
      return node;
    }

    if (node.children) {
      const found = findByKey(key, node.children);

      if (found) {
        return found;
      }
    }
  }

  return null;
}

export function findParentPath(
  targetKey: string,
  nodes: AnnotatedNode[] = annotatedMenu,
  parents: string[] = [],
): string[] | null {
  for (const node of nodes) {
    if (node._key === targetKey) {
      return parents;
    }

    if (node.children) {
      const result = findParentPath(targetKey, node.children, [
        ...parents,
        node._key,
      ]);

      if (result) {
        return result;
      }
    }
  }

  return null;
}
