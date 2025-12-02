# Atomic design for components

Goal

- Organize components by Atomic Design: `atoms/`, `molecules/`, `organisms/`, `templates/`.
- Compatibility layer `components/ui` has been removed; import from atom barrels directly.

Current status

- `components/atoms/` contains core primitives (Button, Card, Input, Tabs).
- Previously a `components/ui/` compatibility layer re-exported atoms during migration; it is now removed. Prefer importing from atom barrels directly.
- `components/molecules/` and `components/organisms/` are scaffolded for migration.

Guidelines

- Atoms: single-purpose UI primitives (buttons, inputs, icons, labels).
- Molecules: simple composition of atoms (search bars, form groups, list items).
- Organisms: complex components combining molecules and atoms (headers, footers, hero sections).
  - Prefer exporting from the appropriate barrel: `import { Button } from '@/components/atoms'` during migration.

Next steps for migration

1. Move or copy higher-level components into `molecules/` or `organisms/`.
2. Update their imports to use atom barrels where appropriate.
3. Add tests/stories and document examples in the component doc.

Examples

- Import an atom (preferred):

  ```ts
  import { Button } from "@/components/atoms";
  ```

- Import a molecule:

  ```ts
  import SearchBar from "@/components/molecules/search-bar";
  ```

- Import an organism:

  ```ts
  import Header from "@/components/organisms/header";
  ```

Showcase

- Visit `http://localhost:3000/components-showcase` to preview the atoms visually.

Migration tips

- Keep the original file path as a re-export during migration to avoid breaking imports.
- Prefer small, incremental moves: copy a component into `molecules/` and update one consumer at a time.
- Add a short example and props section when migrating a component so other devs can reuse it easily.
