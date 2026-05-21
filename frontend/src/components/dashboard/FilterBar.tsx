interface Props {
  search: string;
  setSearch: (value: string) => void;

  filterType: string;
  setFilterType: (value: string) => void;

  filterCategory: string;
  setFilterCategory: (value: string) => void;

  categories: string[];
}

export default function FilterBar({
  search,
  setSearch,
  filterType,
  setFilterType,
  filterCategory,
  setFilterCategory,
  categories,
}: Props) {
  return (
    <div className="mt-8 grid gap-4 rounded-3xl border border-white/10 bg-white/5 p-6 md:grid-cols-3">
      <input
        placeholder="Search transaction..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="rounded-xl border border-white/10 bg-slate-900 p-3 text-white outline-none"
      />

      <select
        value={filterType}
        onChange={(e) => setFilterType(e.target.value)}
        className="rounded-xl border border-white/10 bg-slate-900 p-3 text-white outline-none"
      >
        <option value="">All Types</option>

        <option value="income">Income</option>

        <option value="expense">Expense</option>
      </select>

      <select
        value={filterCategory}
        onChange={(e) => setFilterCategory(e.target.value)}
        className="rounded-xl border border-white/10 bg-slate-900 p-3 text-white outline-none"
      >
        <option value="">All Categories</option>

        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  );
}
