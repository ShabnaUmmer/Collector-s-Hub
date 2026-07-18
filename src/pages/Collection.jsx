import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import SearchBar from '../components/ui/SearchBar';
import EmptyState from '../components/ui/EmptyState';
import CollectionItem from '../components/collection/CollectionItem';
import { useDebounce } from '../hooks/useDebounce';
import { FiBox, FiHeart, FiDollarSign } from 'react-icons/fi';
import './Collection.css';

const TABS = [
  { key: 'owned', label: 'Owned', Icon: FiBox },
  { key: 'wishlist', label: 'Wishlist', Icon: FiHeart },
  { key: 'selling', label: 'Selling', Icon: FiDollarSign },
];

const SORT_OPTIONS = [
  { value: 'newest', label: 'Date Added' },
  { value: 'oldest', label: 'Oldest First' },
  { value: 'value_desc', label: 'Value: High to Low' },
  { value: 'value_asc', label: 'Value: Low to High' },
  { value: 'name', label: 'Name A–Z' },
];

export default function Collection() {
  const { collections, removeFromCollection, moveItem } = useApp();
  const [activeTab, setActiveTab] = useState('owned');
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('newest');
  const [categoryFilter, setCategoryFilter] = useState('All');

  const debouncedSearch = useDebounce(search, 300);
  const currentItems = collections[activeTab] || [];

  const categories = useMemo(() => {
    const cats = [...new Set(currentItems.map(i => i.category).filter(Boolean))];
    return ['All', ...cats];
  }, [currentItems]);

  const filtered = useMemo(() => {
    let items = [...currentItems];
    if (debouncedSearch) {
      const q = debouncedSearch.toLowerCase();
      items = items.filter(i =>
        i.title.toLowerCase().includes(q) || i.category?.toLowerCase().includes(q)
      );
    }
    if (categoryFilter !== 'All') items = items.filter(i => i.category === categoryFilter);

    if (sort === 'newest') items.sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded));
    else if (sort === 'oldest') items.sort((a, b) => new Date(a.dateAdded) - new Date(b.dateAdded));
    else if (sort === 'value_desc') items.sort((a, b) => (b.estimatedValue || 0) - (a.estimatedValue || 0));
    else if (sort === 'value_asc') items.sort((a, b) => (a.estimatedValue || 0) - (b.estimatedValue || 0));
    else if (sort === 'name') items.sort((a, b) => a.title.localeCompare(b.title));

    return items;
  }, [currentItems, debouncedSearch, categoryFilter, sort]);

  const totalValue = currentItems.reduce((sum, i) => sum + (i.estimatedValue || 0), 0);
  const otherTabs = TABS.filter(t => t.key !== activeTab);

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">My Collection</h1>
        <p className="page-subtitle">Manage your personal collectible lists</p>
      </div>

      <div className="collection-tabs">
        {TABS.map(tab => (
          <button
            key={tab.key}
            className={`collection-tab ${activeTab === tab.key ? 'active' : ''}`}
            onClick={() => { setActiveTab(tab.key); setSearch(''); setCategoryFilter('All'); }}
          >
            <tab.Icon size={15} className="tab-icon" />
            {tab.label}
            <span className="tab-count">{collections[tab.key]?.length || 0}</span>
          </button>
        ))}
      </div>

      {currentItems.length > 0 && (
        <div className="collection-summary">
          <div className="summary-stat">
            <span className="summary-value">{currentItems.length}</span>
            <span className="summary-label">items</span>
          </div>
          {activeTab !== 'wishlist' && (
            <div className="summary-stat">
              <span className="summary-value">${totalValue.toLocaleString()}</span>
              <span className="summary-label">est. value</span>
            </div>
          )}
        </div>
      )}

      {currentItems.length > 0 && (
        <div className="filter-bar">
          <SearchBar value={search} onChange={setSearch} placeholder={`Search ${activeTab}…`} />
          <div className="filter-controls">
            {categories.length > 2 && (
              <select className="filter-select" value={categoryFilter} onChange={e => setCategoryFilter(e.target.value)}>
                {categories.map(c => <option key={c}>{c}</option>)}
              </select>
            )}
            <select className="filter-select" value={sort} onChange={e => setSort(e.target.value)}>
              {SORT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          </div>
        </div>
      )}

      {currentItems.length === 0 ? (
        <EmptyState
          title={`Your ${activeTab} list is empty`}
          description={
            activeTab === 'owned' ? 'Add items from the Marketplace to start tracking your collection.'
            : activeTab === 'wishlist' ? 'Heart items in the Marketplace to save them here.'
            : 'Mark items as for sale to list them here.'
          }
          action={<Link to="/marketplace" className="btn-primary">Browse Marketplace</Link>}
        />
      ) : filtered.length === 0 ? (
        <EmptyState title="No items match" description="Try adjusting your search or filters." />
      ) : (
        <div className="collection-list">
          {filtered.map(item => (
            <CollectionItem
              key={item.id}
              item={item}
              collectionKey={activeTab}
              onRemove={() => removeFromCollection(item.id, activeTab)}
              moveTargets={otherTabs}
              onMove={(toKey) => moveItem(item.id, activeTab, toKey)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
