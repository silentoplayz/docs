import type { SidebarItem } from "@docusaurus/plugin-content-docs/src/sidebars/types";

// Helper function to get the label for sorting
function getSortLabel(item: SidebarItem): string {
  if (item.type === 'category') {
    return item.label ?? '';
  }
  if (item.type === 'doc') {
    // We can use the id for sorting, as it's always available
    return item.id;
  }
  // For other types, return an empty string
  return '';
}

// Custom sorting function for sidebar items
export function sortSidebarItems(items: SidebarItem[]): SidebarItem[] {
  // Sort items based on type (category first) and then alphabetically
  const sortedItems = [...items].sort((a, b) => {
    if (a.type === 'category' && b.type !== 'category') {
      return -1;
    }
    if (a.type !== 'category' && b.type === 'category') {
      return 1;
    }

    // If types are the same, sort alphabetically
    const aLabel = getSortLabel(a);
    const bLabel = getSortLabel(b);
    return aLabel.localeCompare(bLabel);
  });

  // Recursively sort items within categories
  return sortedItems.map((item) => {
    if (item.type === 'category' && item.items.length > 0) {
      return { ...item, items: sortSidebarItems(item.items) };
    }
    return item;
  });
}
