# Tree-walking with remark directive implementation

`remark-directive` itself only **parses** the directive syntax (e.g., `:name`, `::name`, or `:::name`) into specific node types; it does not transform them into HTML on its own. To use them, you must "walk" the tree to find these nodes and define their behavior

